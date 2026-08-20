(() => {
  'use strict';

  const rootElement = document.documentElement;
  const script = document.currentScript;
  const homeRoot = normalizeRoot(script?.dataset.homeRoot || '/');
  const transitionDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : 1450;

  let abortController;
  let mode = 'idle';
  let touchStartY = null;
  let gestureDistance = 0;
  let gestureResetTimer;
  let returnArmTimer;
  let returnArmed = false;
  let touchCanReturn = false;

  function normalizeRoot(value) {
    const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
    return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
  }

  function isIndexPage() {
    const path = window.location.pathname;
    if (!path.startsWith(homeRoot)) return false;

    const relativePath = path.slice(homeRoot.length);
    return relativePath === ''
      || relativePath === 'index.html'
      || /^page\/[1-9]\d*\/(?:index\.html)?$/.test(relativePath);
  }

  function elements() {
    return {
      header: document.querySelector('#page-header.full_page'),
      content: document.getElementById('content-inner'),
      footer: document.getElementById('footer')
    };
  }

  function setPageInert({ header = false, content = false }) {
    const page = elements();
    if (page.header) page.header.inert = header;
    if (page.content) page.content.inert = content;
    if (page.footer) page.footer.inert = content;
  }

  function releaseListeners() {
    window.clearTimeout(gestureResetTimer);
    window.clearTimeout(returnArmTimer);
    abortController?.abort();
    abortController = undefined;
    touchStartY = null;
    gestureDistance = 0;
    returnArmed = false;
    touchCanReturn = false;
  }

  function listenerOptions(extra = {}) {
    return { signal: abortController.signal, ...extra };
  }

  function resetGestureSoon() {
    window.clearTimeout(gestureResetTimer);
    gestureResetTimer = window.setTimeout(() => {
      gestureDistance = 0;
    }, 200);
  }

  function clearState() {
    releaseListeners();
    mode = 'idle';
    setPageInert({});
    rootElement.classList.remove(
      'home-welcome-active',
      'home-welcome-leaving',
      'home-welcome-reading',
      'home-welcome-returning',
      'home-welcome-returning-visible'
    );
  }

  function getContentTop() {
    return elements().content?.offsetTop || window.innerHeight;
  }

  function wheelDeltaInPixels(event) {
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
    return event.deltaY;
  }

  function holdAtContentTop() {
    const contentTop = getContentTop();
    if (Math.abs(window.scrollY - contentTop) > 0.5) {
      window.scrollTo({ top: contentTop, left: 0, behavior: 'auto' });
    }
  }

  function disarmReturn() {
    window.clearTimeout(returnArmTimer);
    returnArmTimer = undefined;
    returnArmed = false;
    gestureDistance = 0;
  }

  function scheduleReturnArm(delay = 480) {
    disarmReturn();
    returnArmTimer = window.setTimeout(() => {
      if (mode === 'reading' && window.scrollY <= getContentTop() + 2) {
        returnArmed = true;
      }
      returnArmTimer = undefined;
    }, delay);
  }

  function bindWelcomeInteractions() {
    releaseListeners();
    abortController = new AbortController();

    window.addEventListener('wheel', event => {
      event.preventDefault();
      if (mode !== 'welcome' || event.deltaY <= 0) return;

      gestureDistance += event.deltaY;
      resetGestureSoon();
      if (gestureDistance >= 56) enterContent();
    }, listenerOptions({ passive: false }));

    window.addEventListener('touchstart', event => {
      touchStartY = event.touches[0]?.clientY ?? null;
    }, listenerOptions({ passive: true }));

    window.addEventListener('touchmove', event => {
      if (touchStartY === null) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;

      event.preventDefault();
      if (touchStartY - currentY >= 60) enterContent();
    }, listenerOptions({ passive: false }));

    window.addEventListener('keydown', event => {
      if (!['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      event.preventDefault();
      enterContent();
    }, listenerOptions());

    document.getElementById('scroll-down')?.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      enterContent();
    }, listenerOptions({ capture: true }));
  }

  function finishEnterContent() {
    const page = elements();
    rootElement.classList.remove('home-welcome-active', 'home-welcome-leaving');
    rootElement.classList.add('home-welcome-reading');
    setPageInert({});

    window.scrollTo({
      top: page.content?.offsetTop || window.innerHeight,
      left: 0,
      behavior: 'auto'
    });

    mode = 'reading';
    bindReadingInteractions();
    scheduleReturnArm(600);
  }

  function enterContent() {
    if (mode !== 'welcome') return;

    mode = 'transition';
    releaseListeners();
    rootElement.classList.add('home-welcome-leaving');
    window.setTimeout(finishEnterContent, transitionDuration);
  }

  function bindReadingInteractions() {
    releaseListeners();
    abortController = new AbortController();

    window.addEventListener('wheel', event => {
      if (mode !== 'reading') return;
      if (event.deltaY >= 0) {
        if (window.scrollY > getContentTop() + 2) disarmReturn();
        return;
      }

      const contentTop = getContentTop();
      const deltaPixels = Math.abs(wheelDeltaInPixels(event));
      const boundaryLookAhead = Math.min(deltaPixels * 1.25, 80) + 2;
      if (window.scrollY > contentTop + boundaryLookAhead) return;

      event.preventDefault();
      holdAtContentTop();
      if (!returnArmed) {
        scheduleReturnArm();
        return;
      }

      gestureDistance += Math.abs(event.deltaY);
      resetGestureSoon();
      if (gestureDistance >= 80) returnToWelcome();
    }, listenerOptions({ passive: false }));

    window.addEventListener('touchstart', event => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchCanReturn = returnArmed && window.scrollY <= getContentTop() + 2;
    }, listenerOptions({ passive: true }));

    window.addEventListener('touchmove', event => {
      if (touchStartY === null) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined || currentY <= touchStartY) return;

      const dragDistance = currentY - touchStartY;
      if (window.scrollY > getContentTop() + dragDistance + 12) return;

      event.preventDefault();
      holdAtContentTop();
      if (touchCanReturn && dragDistance >= 72) returnToWelcome();
    }, listenerOptions({ passive: false }));

    window.addEventListener('touchend', () => {
      if (mode === 'reading' && window.scrollY <= getContentTop() + 2) {
        scheduleReturnArm(380);
      }
    }, listenerOptions({ passive: true }));

    window.addEventListener('keydown', event => {
      const atContentTop = window.scrollY <= getContentTop() + 2;
      const upwardAtTop = atContentTop && returnArmed && ['ArrowUp', 'PageUp'].includes(event.key);
      const moveToContentTop = event.key === 'Home';
      if (!upwardAtTop && !moveToContentTop) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      event.preventDefault();
      if (moveToContentTop) {
        window.scrollTo({ top: getContentTop(), left: 0, behavior: 'smooth' });
        scheduleReturnArm(700);
      } else {
        returnToWelcome();
      }
    }, listenerOptions());

    window.addEventListener('scroll', () => {
      if (mode !== 'reading') return;
      const contentTop = getContentTop();
      if (window.scrollY > contentTop + 2) {
        disarmReturn();
        return;
      }
      if (window.scrollY < contentTop - 2) {
        holdAtContentTop();
      }
      if (!returnArmed && !returnArmTimer) scheduleReturnArm();
    }, listenerOptions({ passive: true }));

    document.getElementById('go-up')?.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.scrollTo({ top: getContentTop(), left: 0, behavior: 'smooth' });
      scheduleReturnArm(700);
    }, listenerOptions({ capture: true }));
  }

  function finishReturnToWelcome() {
    rootElement.classList.remove(
      'home-welcome-returning',
      'home-welcome-returning-visible'
    );
    setPageInert({ content: true });
    mode = 'welcome';
    bindWelcomeInteractions();
  }

  function returnToWelcome() {
    if (mode !== 'reading') return;

    mode = 'transition';
    releaseListeners();
    rootElement.classList.remove('home-welcome-reading');
    rootElement.classList.add('home-welcome-active', 'home-welcome-returning');
    setPageInert({});
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        rootElement.classList.add('home-welcome-returning-visible');
      });
    });

    window.setTimeout(finishReturnToWelcome, transitionDuration + 34);
  }

  function initialize() {
    clearState();

    const page = elements();
    if (!isIndexPage() || !page.header || !page.content) return;

    const hasContentTarget = window.location.hash && window.location.hash !== '#';
    const restoredBelowWelcome = window.scrollY > Math.min(window.innerHeight / 3, 240);
    if (hasContentTarget || restoredBelowWelcome) {
      rootElement.classList.add('home-welcome-reading');
      mode = 'reading';
      bindReadingInteractions();
      if (window.scrollY <= getContentTop() + 2) scheduleReturnArm(600);
      if (window.location.hash === '#content-inner') {
        window.requestAnimationFrame(() => holdAtContentTop());
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    rootElement.classList.add('home-welcome-active');
    setPageInert({ content: true });
    mode = 'welcome';
    bindWelcomeInteractions();
  }

  document.addEventListener('pjax:send', clearState);
  document.addEventListener('pjax:complete', initialize);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();

(() => {
  'use strict';

  const rootElement = document.documentElement;
  const script = document.currentScript;
  const homeRoot = normalizeRoot(script?.dataset.homeRoot || '/');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionFallback = prefersReducedMotion ? 0 : 1450;
  const topTolerance = 1;
  const returnGateDelay = 140;
  const returnGestureGap = 140;
  const returnGestureBoost = 1.65;
  const returnGestureBoostFloor = 28;
  const welcomeSeenKey = 'harmonese-home-welcome-seen';

  let mode = 'idle';
  let interactionController;
  let welcomeLayer;
  let transitionCleanup;
  let movedNodes = [];
  let gestureDistance = 0;
  let gestureResetTimer;
  let topReady = false;
  let topReadyTimer;
  let topWheelPrimed = false;
  let lastTopWheelTime = 0;
  let lastTopWheelDelta = 0;
  let touchStartY = null;
  let touchStartedAtTop = false;
  let welcomeSeenInRuntime = false;

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

  function pageElements() {
    return {
      header: document.querySelector('#page-header.full_page'),
      nav: document.getElementById('nav'),
      siteInfo: document.getElementById('site-info'),
      scrollDown: document.getElementById('scroll-down'),
      content: document.getElementById('content-inner'),
      footer: document.getElementById('footer')
    };
  }

  function setMode(nextMode) {
    mode = nextMode;
    rootElement.dataset.homeWelcomeState = nextMode;
  }

  function setPageInert({ page = false, welcome = false } = {}) {
    const elements = pageElements();
    if (elements.nav) elements.nav.inert = page;
    if (elements.content) elements.content.inert = page;
    if (elements.footer) elements.footer.inert = page;
    if (welcomeLayer) welcomeLayer.inert = welcome;
  }

  function clearGestureTimers() {
    window.clearTimeout(gestureResetTimer);
    window.clearTimeout(topReadyTimer);
    gestureResetTimer = undefined;
    topReadyTimer = undefined;
  }

  function stopInteractions() {
    interactionController?.abort();
    interactionController = undefined;
    clearGestureTimers();
    gestureDistance = 0;
    touchStartY = null;
    touchStartedAtTop = false;
    topReady = false;
    topWheelPrimed = false;
    lastTopWheelTime = 0;
    lastTopWheelDelta = 0;
  }

  function listenerOptions(extra = {}) {
    return { signal: interactionController.signal, ...extra };
  }

  function resetGestureAfter(delay = 180) {
    window.clearTimeout(gestureResetTimer);
    gestureResetTimer = window.setTimeout(() => {
      gestureDistance = 0;
      gestureResetTimer = undefined;
    }, delay);
  }

  function wheelDeltaInPixels(event) {
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
    return event.deltaY;
  }

  function isAtDocumentTop() {
    return window.scrollY <= topTolerance;
  }

  function hasSeenWelcomeThisSession() {
    if (welcomeSeenInRuntime) return true;

    try {
      return window.sessionStorage.getItem(welcomeSeenKey) === '1';
    } catch {
      return false;
    }
  }

  function markWelcomeSeen() {
    welcomeSeenInRuntime = true;

    try {
      window.sessionStorage.setItem(welcomeSeenKey, '1');
    } catch {
      // Storage can be unavailable in some privacy modes; the welcome still works.
    }
  }

  function resetReturnGate() {
    window.clearTimeout(topReadyTimer);
    topReadyTimer = undefined;
    topReady = false;
    gestureDistance = 0;
    topWheelPrimed = false;
    lastTopWheelTime = 0;
    lastTopWheelDelta = 0;
  }

  function openReturnGateAfter(delay = 220) {
    window.clearTimeout(topReadyTimer);
    topReady = false;
    gestureDistance = 0;
    topWheelPrimed = false;
    lastTopWheelTime = 0;
    lastTopWheelDelta = 0;
    topReadyTimer = window.setTimeout(() => {
      if (mode === 'reading' && isAtDocumentTop()) topReady = true;
      topReadyTimer = undefined;
    }, delay);
  }

  function isFreshTopWheelGesture(deltaPixels) {
    const now = performance.now();
    const separatedFromPreviousGesture = now - lastTopWheelTime > returnGestureGap
      && deltaPixels >= returnGestureBoostFloor;
    const renewedAfterInertia = deltaPixels >= returnGestureBoostFloor
      && deltaPixels > lastTopWheelDelta * returnGestureBoost;

    lastTopWheelTime = now;
    lastTopWheelDelta = deltaPixels;

    if (!topWheelPrimed) {
      topWheelPrimed = true;
      return false;
    }

    return separatedFromPreviousGesture || renewedAfterInertia;
  }

  function moveIntoLayer(node) {
    if (!node || !welcomeLayer) return;
    movedNodes.push({ node, parent: node.parentNode, nextSibling: node.nextSibling });
    welcomeLayer.appendChild(node);
  }

  function restoreMovedNodes() {
    for (const placement of movedNodes.reverse()) {
      const { node, parent, nextSibling } = placement;
      if (!parent) continue;
      if (nextSibling?.parentNode === parent) parent.insertBefore(node, nextSibling);
      else parent.appendChild(node);
    }
    movedNodes = [];
  }

  function createWelcomeLayer(elements) {
    const layer = document.createElement('div');
    layer.id = 'home-welcome-layer';
    layer.setAttribute('aria-label', '欢迎页面');
    document.body.appendChild(layer);
    welcomeLayer = layer;
    moveIntoLayer(elements.siteInfo);
    moveIntoLayer(elements.scrollDown);
  }

  function cancelPendingTransition() {
    transitionCleanup?.();
    transitionCleanup = undefined;
  }

  function afterLayerTransition(callback) {
    cancelPendingTransition();
    if (!welcomeLayer || prefersReducedMotion) {
      window.requestAnimationFrame(callback);
      return;
    }

    let finished = false;
    let fallbackTimer;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackTimer);
      welcomeLayer?.removeEventListener('transitionend', onTransitionEnd);
      transitionCleanup = undefined;
      callback();
    };

    const onTransitionEnd = event => {
      if (event.target === welcomeLayer && event.propertyName === 'transform') finish();
    };

    welcomeLayer.addEventListener('transitionend', onTransitionEnd);
    fallbackTimer = window.setTimeout(finish, transitionFallback);
    transitionCleanup = () => {
      finished = true;
      window.clearTimeout(fallbackTimer);
      welcomeLayer?.removeEventListener('transitionend', onTransitionEnd);
    };
  }

  function clearState() {
    stopInteractions();
    cancelPendingTransition();
    setPageInert({});
    restoreMovedNodes();
    welcomeLayer?.remove();
    welcomeLayer = undefined;
    setMode('idle');
    delete rootElement.dataset.homeWelcomeState;
    rootElement.classList.remove(
      'home-welcome-pending',
      'home-welcome-ready',
      'home-welcome-active',
      'home-welcome-leaving',
      'home-welcome-reading',
      'home-welcome-returning',
      'home-welcome-returning-visible'
    );
  }

  function bindWelcomeInteractions() {
    stopInteractions();
    interactionController = new AbortController();

    welcomeLayer.addEventListener('wheel', event => {
      event.preventDefault();
      if (mode !== 'welcome' || event.deltaY <= 0) return;

      gestureDistance += Math.max(0, wheelDeltaInPixels(event));
      resetGestureAfter();
      if (gestureDistance >= 56) enterContent();
    }, listenerOptions({ passive: false }));

    welcomeLayer.addEventListener('touchstart', event => {
      touchStartY = event.touches[0]?.clientY ?? null;
    }, listenerOptions({ passive: true }));

    welcomeLayer.addEventListener('touchmove', event => {
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
    markWelcomeSeen();
    rootElement.classList.remove('home-welcome-active', 'home-welcome-leaving');
    rootElement.classList.add('home-welcome-reading');
    welcomeLayer?.setAttribute('aria-hidden', 'true');
    setPageInert({ welcome: true });
    setMode('reading');
    bindReadingInteractions();
    openReturnGateAfter(320);
  }

  function enterContent() {
    if (mode !== 'welcome') return;

    setMode('entering');
    stopInteractions();
    rootElement.classList.add('home-welcome-leaving');
    setPageInert({ page: true });
    afterLayerTransition(finishEnterContent);
  }

  function bindReadingInteractions() {
    stopInteractions();
    interactionController = new AbortController();

    window.addEventListener('wheel', event => {
      if (mode !== 'reading') return;
      if (!isAtDocumentTop()) {
        resetReturnGate();
        return;
      }

      if (event.deltaY >= 0) {
        resetReturnGate();
        return;
      }

      const deltaPixels = Math.abs(wheelDeltaInPixels(event));
      if (!topReady) {
        if (!topReadyTimer) openReturnGateAfter(returnGateDelay);
        return;
      }

      if (!isFreshTopWheelGesture(deltaPixels)) return;

      event.preventDefault();
      gestureDistance += deltaPixels;
      resetGestureAfter();
      if (gestureDistance >= 80) returnToWelcome();
    }, listenerOptions({ passive: false }));

    window.addEventListener('touchstart', event => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchStartedAtTop = topReady && isAtDocumentTop();
    }, listenerOptions({ passive: true }));

    window.addEventListener('touchmove', event => {
      if (!touchStartedAtTop || touchStartY === null) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined || currentY <= touchStartY) return;

      event.preventDefault();
      if (currentY - touchStartY >= 72) returnToWelcome();
    }, listenerOptions({ passive: false }));

    window.addEventListener('touchend', () => {
      if (!isAtDocumentTop()) {
        resetReturnGate();
        return;
      }
      if (!touchStartedAtTop && !topReadyTimer) openReturnGateAfter(120);
      touchStartY = null;
      touchStartedAtTop = false;
    }, listenerOptions({ passive: true }));

    window.addEventListener('keydown', event => {
      const upwardAtTop = topReady
        && isAtDocumentTop()
        && ['ArrowUp', 'PageUp'].includes(event.key);
      if (!upwardAtTop) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      event.preventDefault();
      returnToWelcome();
    }, listenerOptions());

    window.addEventListener('scroll', () => {
      if (mode !== 'reading') return;
      if (!isAtDocumentTop()) {
        resetReturnGate();
        return;
      }
      if (!topReady && !topReadyTimer) openReturnGateAfter(returnGateDelay);
    }, listenerOptions({ passive: true }));
  }

  function finishReturnToWelcome() {
    rootElement.classList.remove(
      'home-welcome-returning',
      'home-welcome-returning-visible'
    );
    setPageInert({ page: true });
    setMode('welcome');
    bindWelcomeInteractions();
  }

  function returnToWelcome() {
    if (mode !== 'reading' || !isAtDocumentTop()) return;

    setMode('returning');
    stopInteractions();
    document.activeElement?.blur?.();
    welcomeLayer?.removeAttribute('aria-hidden');
    setPageInert({ page: true });
    rootElement.classList.remove('home-welcome-reading');
    rootElement.classList.add('home-welcome-active', 'home-welcome-returning');

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        rootElement.classList.add('home-welcome-returning-visible');
        afterLayerTransition(finishReturnToWelcome);
      });
    });
  }

  function initialize() {
    clearState();

    const elements = pageElements();
    const hasRequiredStructure = isIndexPage()
      && elements.header
      && elements.nav
      && elements.siteInfo
      && elements.scrollDown
      && elements.content;

    if (!hasRequiredStructure) {
      rootElement.classList.remove('home-welcome-pending');
      return;
    }

    const hasContentTarget = window.location.hash && window.location.hash !== '#';
    const restoredBelowTop = window.scrollY > Math.min(window.innerHeight / 3, 240);
    const startInReadingMode = hasContentTarget || restoredBelowTop || hasSeenWelcomeThisSession();

    rootElement.classList.add('home-welcome-ready');
    rootElement.classList.add(startInReadingMode ? 'home-welcome-reading' : 'home-welcome-active');
    createWelcomeLayer(elements);
    rootElement.classList.remove('home-welcome-pending');

    if (startInReadingMode) {
      welcomeLayer.setAttribute('aria-hidden', 'true');
      setPageInert({ welcome: true });
      setMode('reading');
      bindReadingInteractions();
      if (isAtDocumentTop()) openReturnGateAfter(320);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setPageInert({ page: true });
    setMode('welcome');
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

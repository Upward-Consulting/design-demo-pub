async (page) => {
  const prep = (
async (page) => {
  /* Page preparation before a screenshot or a measurement (browser_run_code_unsafe file: one async function expression; the
   * file starts with the function on purpose, the notes sit inside it).
   *
   *   browser_navigate  <dev-server URL, workbench view or production preview>
   *   browser_run_code_unsafe  filename: <absolute path of this file>   (a relative path resolves against the browser server's
   *                                                                    working directory, not the repo)
   *   browser_take_screenshot / browser_evaluate ...                   (NO reload, NO navigate in between)
   *
   * Why: a classic scrollbar (about 15 px) steals layout width, so a 1440 viewport lays out at 1425 and every section, line
   * break and screenshot width is off. Devtools launchers (TanStack Query / Router devtools, a framework's dev indicator, chat
   * widgets) are painted over the page, and some are added a moment after load. Lazy modules, Suspense fallbacks and skeletons
   * change heights while they resolve, and an entrance animation still running puts every box mid-flight. This hides the
   * chrome that is not the app, waits for fonts, pending content and finite animations, and REPORTS the Vite error overlay
   * instead of hiding it: a page under that overlay is stale or broken and must not be measured.
   *
   * Does: injects one <style> (no scrollbar, known launchers hidden), hides other position:fixed children of <body> that are
   * not the app root or an open overlay (dialogs, menus, tooltips and toasts are kept), keeps watching <body> for fixed
   * children added later, dispatches a resize, waits for document.fonts.ready, for PENDING to match nothing, and for finite
   * animations to finish. Run it again after browser_resize or after any navigation; it is idempotent.
   *
   * Returns { ok, iw, cw, scrollbar, overlay, pending, running, loops, docHeight, hidden[] }
   *   ok        scrollbar === 0 && !overlay && pending === 0 && running === 0
   *   overlay   true when Vite's error overlay is up: read it (browser_snapshot), fix the error, reload
   *   pending   elements still matching PENDING after PENDING_MS      running  finite animations still running after SETTLE_ANIM_MS
   *   loops     infinite animations (spinners, marquees): they never finish; measure around them
   *   docHeight the full-page height to expect from a full-page screenshot; hidden lists what was hidden
   * Edit the settings block below for an app with other overlays (cookie banner, chat widget).
   */
  const cfg = {
    EXTRA_HIDE: [],                                            // extra CSS selectors to hide, e.g. '#cookie-banner', '.chat-launcher'
    APP_ROOTS: '#root, #ds-root, #__next, #app, [data-reactroot]', // the app's mount points: never hidden
    KEEP_FIXED: 'header, nav, [role="banner"], [role="dialog"], [role="alertdialog"], [aria-modal="true"], [role="menu"], [role="listbox"], [role="tooltip"], [role="status"], [aria-live], [data-radix-popper-content-wrapper], [data-keep-fixed]',
    HIDE_FIXED: true,                                          // hide other position:fixed children of <body>
    PENDING: '[data-ds-loading], [aria-busy="true"]',          // wait until nothing matches (workbench placeholders, busy regions)
    PENDING_MS: 8000,
    SETTLE_MS: 1000,                                           // wait for late-added launchers before looking
    SETTLE_ANIM_MS: 3000,                                      // longest wait for finite animations to finish
  };
  await page.waitForTimeout(cfg.SETTLE_MS);
  return await page.evaluate(async (cfg) => {
    const KNOWN = ['.tsqd-open-btn-container', '.tsqd-parent-container', '[class*="TanStackRouterDevtools"]', 'nextjs-portal',
      '#react-scan-root', '[data-react-grab]', ...cfg.EXTRA_HIDE];
    if (!document.getElementById('__rdsi_prep')) {
      const st = document.createElement('style');
      st.id = '__rdsi_prep';
      st.textContent = 'html{scrollbar-width:none} ::-webkit-scrollbar{display:none} ' + KNOWN.join(',') + '{display:none!important}';
      document.head.appendChild(st);
    }
    const hidden = [];
    const name = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : '');
    const hide = (el) => { if (el.style.display !== 'none') { el.style.setProperty('display', 'none', 'important'); hidden.push(name(el)); } };
    const isApp = (el) => el.matches(cfg.APP_ROOTS) || !!el.querySelector(cfg.APP_ROOTS) || el.tagName === 'VITE-ERROR-OVERLAY';
    const sweep = (el) => {
      if (!cfg.HIDE_FIXED || el.nodeType !== 1 || /^(SCRIPT|STYLE|LINK|NOSCRIPT|TEMPLATE)$/.test(el.tagName) || isApp(el)) return;
      if (el.matches(cfg.KEEP_FIXED) || el.querySelector(cfg.KEEP_FIXED)) return;
      if (getComputedStyle(el).position === 'fixed') hide(el);
    };
    KNOWN.forEach((sel) => { try { document.querySelectorAll(sel).forEach(hide); } catch (e) { /* invalid selector in EXTRA_HIDE */ } });
    [...document.body.children].forEach(sweep);
    if (!window.__rdsiPrepObserver) {
      window.__rdsiPrepObserver = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) setTimeout(() => sweep(n), 50); })));
      window.__rdsiPrepObserver.observe(document.body, { childList: true });
    }
    window.dispatchEvent(new Event('resize'));
    await document.fonts.ready;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let t = 0; t < cfg.PENDING_MS && document.querySelector(cfg.PENDING); t += 100) await sleep(100);
    await document.fonts.ready;                                  // lazily loaded modules can request more faces
    const finite = () => document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations !== Infinity);
    const anims = finite();
    if (anims.length) await Promise.race([Promise.allSettled(anims.map((a) => a.finished)), sleep(cfg.SETTLE_ANIM_MS)]);
    await sleep(300);
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    const overlay = !!document.querySelector('vite-error-overlay');
    const pending = document.querySelectorAll(cfg.PENDING).length;
    const running = finite().length;
    const loops = document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations === Infinity).length;
    return { ok: scrollbar === 0 && !overlay && pending === 0 && running === 0, iw: innerWidth, cw: document.documentElement.clientWidth,
      scrollbar, overlay, pending, running, loops, docHeight: document.documentElement.scrollHeight, hidden };
  }, cfg);
}

  );
  const prepRes = await prep(page);
  const lint = await page.evaluate(() => window.__craftLint());
  const font = await page.evaluate(() => window.__fontAudit());
  return { prep: prepRes, lint: { status: lint.status, viewport: lint.viewport, checked: lint.checked, counts: lint.counts, deferred: lint.deferred, manual: lint.manual, smallest: lint.smallest, n: lint.findings.length, findings: lint.findings.map((f) => [f.rule, f.el, f.text, f.container, f.top, f.msg, f.also]) }, font: { brand: font.brand, textElements: font.textElements, families: font.families, outsideCount: font.outsideCount, notLoaded: font.notLoaded, ok: font.ok, outside: font.outside.slice(0, 12), loadedFaces: font.loadedFaces } };
}

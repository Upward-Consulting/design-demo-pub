async (page) => {
  /* Motion trace: records the box of every element near the viewport on every animation frame while one interaction plays, and
   * reports what a before/after comparison cannot see (browser_run_code_unsafe file: one async function expression, as with
   * prep.run.js; edit the settings block in a copy, then run it with filename).
   *
   *   browser_navigate  <dev-server URL or workbench view>  →  prep.run.js  →  this file
   *
   * Why: hover-probe.js compares two endpoints. A one-frame jump, a neighbour shoved by an opening panel, a label replaced in
   * place, a hover that never returns to rest and content that is invisible until a script reveals it all pass that
   * comparison. The rules: references/craft-rules.md § 8. Adapted from the jump scan of stageshow
   * (github.com/benjitaylor/skills, MIT licence).
   *
   * ACTION
   *   'hover'   pointer at AWAY → hover TARGET → pointer back at AWAY; also reports whether everything returned to rest
   *   'click'   click TARGET (accordion summary, tab, toggle); CLICK_BACK clicks it again (close what opened) and checks rest
   *   'scroll'  wheel down SCROLL px in 100 px steps (sticky header, scroll-in reveals); boxes recorded in page coordinates
   *   'load'    reload and list content that is invisible (opacity under 0.05 or visibility hidden) at first paint and after
   *             WATCH_MS: it is blank in a full-page screenshot and missing for anyone the reveal never reaches. REDUCED: true
   *             emulates prefers-reduced-motion: reduce for the reload (reset afterwards); then nothing should be hidden.
   *             The reload undoes page prep: run prep.run.js again before measuring.
   *
   * Returns { action, status, coverage, findings[], returned?, firstPaint?, afterWatch?, manual[] }
   *   findings  candidates [{ rule, el, container, at, detail }]: look at each (slow it down, screenshot the step), then fix it
   *             or say in the motion doc why it is intended (an accordion that opens instantly can be the product's choice).
   *     jump          a box moved or resized more than 2 px in one frame while still the frame before and after (no
   *                   transition); boxes that moved with it are counted in the detail, not listed
   *     appears       shown at full opacity in one frame (no entrance)       vanishes   removed at full opacity in one frame
   *     swap          its text changed in one frame (a label replaced, not crossfaded or rolled); typing effects show here too
   *     not-returned  after the pointer left (or the second click) a box or the target's style is not back at rest
   *     hidden        load: content invisible at first paint (inView: true matters most; below the fold waits for a scroll)
   *   status    'inconclusive' when the recording is short or its frames are far apart (a busy page): run again with a
   *             smaller MAX. 'no-issues-detected' is not approval: geometry only. Watch the motion at speed as well.
   */
  const cfg = {
    ACTION: 'click',                          // 'hover' | 'click' | 'scroll' | 'load'
    TARGET: '.b-menu-btn',      // hover / click: the element acted on (first match), e.g. '[data-ds="variant S-14 C"] button'
    ROOT: 'main, #root, #ds-root, #__next',   // what is recorded: elements under it near the viewport, and the target's section
    WATCH_MS: 1000,                           // recording time after each step; longer than the slowest transition
    CLICK_BACK: false,                         // click: click the target again and check the page is back at rest
    SCROLL: 800,                              // scroll: px to wheel down
    REDUCED: false,                           // load: emulate prefers-reduced-motion: reduce
    AWAY: [1, 1],                             // where the pointer rests before and after a hover (viewport px)
    MAX: 600,                                 // most elements to record (fewer when frames come late)
  };

  const label = `(el) => { const c = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
    const t = (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 24); return el.tagName.toLowerCase() + c + (t ? ' "' + t + '"' : ''); }`;

  if (cfg.ACTION === 'load') {
    // Content (text, img, svg, video) with a layout box whose effective opacity is under 0.05 or that is visibility: hidden.
    const scan = ([root, labelSrc]) => {
      const label = new Function('return ' + labelSrc)();
      const alpha = new Map(), eff = (el) => { if (!el || el === document.documentElement) return 1; if (alpha.has(el)) return alpha.get(el); const v = +getComputedStyle(el).opacity * eff(el.parentElement); alpha.set(el, v); return v; };
      let roots = [...document.querySelectorAll(root)];
      roots = roots.filter((d) => !roots.some((o) => o !== d && o.contains(d)));
      const list = [];
      let content = 0;
      for (const r of roots) for (const el of r.querySelectorAll('*')) {
        if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) continue;
        if (!el.matches('img, svg, video') && ![...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) continue;
        const b = el.getBoundingClientRect();
        if (b.width < 2 || b.height < 2 || (el.checkVisibility && !el.checkVisibility({ visibilityProperty: false }))) continue;
        content++;
        if (getComputedStyle(el).visibility === 'hidden' || eff(el) < 0.05)
          list.push({ rule: 'hidden', el: label(el), container: ((el) => { const m = el.closest('[data-ds],[id],[data-testid],main,header,footer,nav,aside,section'); return !m ? null : m.dataset.ds ? m.dataset.ds : m.id ? '#' + m.id : m.dataset.testid ? '[data-testid=' + m.dataset.testid + ']' : m.tagName.toLowerCase(); })(el), top: Math.round(b.top + scrollY), inView: b.top < innerHeight && b.bottom > 0 });
      }
      return { content, hidden: list.length, inView: list.filter((x) => x.inView).length, list: list.sort((a, b) => b.inView - a.inView).slice(0, 40) };
    };
    if (cfg.REDUCED) await page.emulateMedia({ reducedMotion: 'reduce' });
    try {
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      const firstPaint = await page.evaluate(scan, [cfg.ROOT, label]);
      await page.waitForTimeout(cfg.WATCH_MS);
      const afterWatch = await page.evaluate(scan, [cfg.ROOT, label]);
      const findings = afterWatch.list.filter((x) => x.inView || cfg.REDUCED).map((x) => ({ ...x, detail: `still invisible ${cfg.WATCH_MS} ms after load${cfg.REDUCED ? ' with reduced motion' : ''}` }));
      return {
        action: 'load', reduced: cfg.REDUCED, status: !firstPaint.content ? 'inconclusive' : findings.length ? 'issues' : 'no-issues-detected',
        firstPaint: { content: firstPaint.content, hidden: firstPaint.hidden, inView: firstPaint.inView, list: firstPaint.list.slice(0, 15) },
        afterWatch: { hidden: afterWatch.hidden, inView: afterWatch.inView }, findings,
        manual: [`${afterWatch.hidden - afterWatch.inView} element(s) below the fold stay hidden until scrolled to: a full-page screenshot shows them blank`, 'page prep was undone by the reload'],
      };
    } finally { if (cfg.REDUCED) await page.emulateMedia({ reducedMotion: null }); }
  }

  const target = cfg.TARGET && cfg.ACTION !== 'scroll' ? page.locator(cfg.TARGET).first() : null;
  if (target) await target.scrollIntoViewIfNeeded();
  if (cfg.ACTION === 'hover') { await page.mouse.move(...cfg.AWAY); await page.waitForTimeout(500); }
  // The rest state must be at rest: wait (up to 3 s) for finite animations, such as a load fade, to finish first.
  await page.waitForFunction(() => !document.getAnimations().some((a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations !== Infinity), null, { timeout: 3000 }).catch(() => {});
  const styleOf = (el) => { const s = getComputedStyle(el); return [s.color, s.backgroundColor, s.borderColor, s.boxShadow, s.transform, s.opacity, s.outlineStyle].join(' | '); };
  const rest = target ? await target.evaluate(styleOf) : null;

  // Recorder: the boxes, effective opacity and own text of every recorded element, each animation frame.
  await page.evaluate(([c, labelSrc]) => {
    const label = new Function('return ' + labelSrc)();
    let roots = [...document.querySelectorAll(c.ROOT)];
    roots = roots.filter((d) => !roots.some((o) => o !== d && o.contains(d)));
    const tgt = c.TARGET && c.ACTION !== 'scroll' ? document.querySelector(c.TARGET) : null;
    const band = tgt && roots.map((r) => [...r.children].find((b) => b.contains(tgt))).find(Boolean);
    const lo = -200, hi = innerHeight + 200 + (c.ACTION === 'scroll' ? c.SCROLL : 0);
    const M = window.__mt = { els: [], idx: new Map(), pinned: [], parent: [], names: [], cont: [], frames: [], mark: '', marks: {}, t0: performance.now(), stop: false, errors: [] };
    const add = (el) => {
      if (M.els.length >= c.MAX || M.idx.has(el) || (el instanceof SVGElement && !(el instanceof SVGSVGElement))) return;
      M.idx.set(el, M.els.length); M.els.push(el); M.names.push(label(el)); M.cont.push(((el) => { const m = el.closest('[data-ds],[id],[data-testid],main,header,footer,nav,aside,section'); return !m ? null : m.dataset.ds ? m.dataset.ds : m.id ? '#' + m.id : m.dataset.testid ? '[data-testid=' + m.dataset.testid + ']' : m.tagName.toLowerCase(); })(el));
      let pin = false; for (let a = el; a && !pin; a = a.parentElement) pin = /fixed|sticky/.test(getComputedStyle(a).position);
      M.pinned.push(pin);
      let p = -1; for (let a = el.parentElement; a && p < 0; a = a.parentElement) if (M.idx.has(a)) p = M.idx.get(a);
      M.parent.push(p);
    };
    if (band) [band, ...band.querySelectorAll('*')].forEach(add);
    for (const r of roots) for (const el of [r, ...r.querySelectorAll('*')]) { const b = el.getBoundingClientRect(); if (b.width * b.height >= 16 && b.bottom > lo && b.top < hi) add(el); }
    M.obs = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) [n, ...n.querySelectorAll('*')].forEach(add); })));
    roots.forEach((r) => M.obs.observe(r, { childList: true, subtree: true }));
    M.setMark = (m) => { M.mark = m; M.marks[m] = performance.now() - M.t0; };
    const docCoords = c.ACTION === 'scroll';
    const tick = () => {
      if (M.stop) return;
      try {
        const alpha = new Map();
        const eff = (el) => { if (!el || el === document.documentElement) return 1; if (alpha.has(el)) return alpha.get(el); const v = +getComputedStyle(el).opacity * eff(el.parentElement); alpha.set(el, v); return v; };
        const items = M.els.map((el, i) => {
          if (!el.isConnected) return null;
          const r = el.getBoundingClientRect(), s = getComputedStyle(el);
          if (r.width * r.height < 16 || s.visibility === 'hidden' || (el.checkVisibility && !el.checkVisibility())) return null;
          const dx = docCoords && !M.pinned[i] ? scrollX : 0, dy = docCoords && !M.pinned[i] ? scrollY : 0;
          const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.nodeValue.trim()).map((n) => n.nodeValue.trim()).join(' ');
          return [r.left + dx, r.top + dy, r.width, r.height, eff(el), own || null];
        });
        M.frames.push({ t: performance.now() - M.t0, mark: M.mark, items });
      } catch (e) { M.errors.push(e.message); }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [cfg, label]);

  const mark = (m) => page.evaluate((x) => window.__mt.setMark(x), m);
  await page.waitForTimeout(200);                 // still frames first: the calm a jump is measured against
  if (cfg.ACTION === 'hover') {
    await mark('hover'); await target.hover(); await page.waitForTimeout(cfg.WATCH_MS);
    await mark('leave'); await page.mouse.move(...cfg.AWAY); await page.waitForTimeout(cfg.WATCH_MS);
  } else if (cfg.ACTION === 'click') {
    await mark('click'); await target.click(); await page.waitForTimeout(cfg.WATCH_MS);
    if (cfg.CLICK_BACK) { await mark('click back'); await target.click(); await page.waitForTimeout(cfg.WATCH_MS); }
  } else if (cfg.ACTION === 'scroll') {
    const vp = page.viewportSize();
    await page.mouse.move(vp.width / 2, vp.height / 2); await mark('scroll');
    for (let y = 0; y < cfg.SCROLL; y += 100) { await page.mouse.wheel(0, 100); await page.waitForTimeout(60); }
    await page.waitForTimeout(cfg.WATCH_MS);
  }
  const end = target ? await target.evaluate(styleOf) : null;
  const checkRest = cfg.ACTION === 'hover' || (cfg.ACTION === 'click' && cfg.CLICK_BACK);

  const result = await page.evaluate((checkRest) => {
    const M = window.__mt; M.stop = true; M.obs.disconnect();
    const F = M.frames, n = F.length, out = [];
    const dts = F.slice(1).map((f, i) => f.t - F[i].t).sort((a, b) => a - b);
    const frameMs = dts.length ? dts[Math.floor(dts.length / 2)] : 0;
    const late = (f) => f > 0 && F[f].t - F[f - 1].t > frameMs * 1.6;
    const at = (f) => F[f].mark ? `${((F[f].t - M.marks[F[f].mark]) / 1000).toFixed(2)} s after ${F[f].mark}` : `${(F[f].t / 1000).toFixed(2)} s`;
    const anc = (i, j) => { for (let p = M.parent[i]; p >= 0; p = M.parent[p]) if (p === j) return true; return false; };
    const outer = (ids) => ids.filter((i) => !ids.some((j) => j !== i && anc(i, j)));
    const item = (rule, i, f, detail) => ({ rule, el: M.names[i], container: M.cont[i], at: f == null ? null : at(f), detail });
    // Jumps, grouped by frame, axis and size: one cause, one line.
    const groups = new Map(), AX = ['x', 'y', 'width', 'height'];
    for (let f = 2; f < n - 1; f++) {
      if (late(f - 1) || late(f) || late(f + 1)) continue;
      const [A, B, C, D] = [F[f - 2].items, F[f - 1].items, F[f].items, F[f + 1].items];
      for (let i = 0; i < C.length; i++) {
        const a = A[i], b = B[i], c = C[i], d = D[i];
        if (!a || !b || !c || !d || c[4] < 0.05) continue;
        for (let k = 0; k < 4; k++) {
          const dv = c[k] - b[k], calm = Math.max(Math.abs(b[k] - a[k]), Math.abs(d[k] - c[k]), 0.4);
          if (Math.abs(dv) <= 2 || Math.abs(dv) <= 3 * calm) continue;
          const key = `${f}|${k}|${Math.round(dv)}`;
          (groups.get(key) || groups.set(key, { f, k, dv, ids: [] }).get(key)).ids.push(i);
        }
      }
    }
    const seen = new Map();
    for (const g of groups.values()) {
      const top = outer(g.ids), i = top[0], key = `${i}|${g.k}`;
      if (seen.has(key)) { seen.get(key).times++; continue; }
      const it = item('jump', i, g.f, `${AX[g.k]} ${g.dv > 0 ? '+' : ''}${g.dv.toFixed(1)} px in one frame${top.length > 1 ? `, ${top.length - 1} other box(es) with it` : ''}`);
      it.times = 1; seen.set(key, it); out.push(it);
    }
    for (const it of seen.values()) if (it.times > 1) it.detail += `, ${it.times} times`;
    // Appear and vanish without a transition; text swapped in place.
    const swapped = new Set();
    for (let f = 1; f < n; f++) {
      if (late(f)) continue;
      const B = F[f - 1].items, C = F[f].items, app = [], van = [];
      for (let i = 0; i < Math.max(B.length, C.length); i++) {
        const b = B[i], c = C[i], bOn = b && b[4] >= 0.05, cOn = c && c[4] >= 0.05;
        if (!bOn && cOn && c[4] >= 0.95) app.push(i);
        if (bOn && b[4] >= 0.95 && !cOn) van.push(i);
        if (b && c && b[5] != null && c[5] != null && b[5] !== c[5] && !swapped.has(i) && c[4] >= 0.95) {
          const resized = [2, 3].some((k) => Math.abs(b[k] - c[k]) >= 0.5);
          swapped.add(i); out.push(item('swap', i, f, `"${b[5].slice(0, 24)}" became "${c[5].slice(0, 24)}" in one frame${resized ? ', its box resizing with it' : ' in place'}`));
        }
      }
      for (const i of outer(app)) out.push(item('appears', i, f, 'shown at full opacity in one frame (no entrance)'));
      for (const i of outer(van)) out.push(item('vanishes', i, f, 'removed at full opacity in one frame (no exit)'));
    }
    // Back at rest: the last frame against the first.
    let returned = null;
    if (checkRest && n > 1) {
      const a0 = F[0].items, z = F[n - 1].items, off = [];
      for (let i = 0; i < a0.length; i++) {
        const a = a0[i], b = z[i];
        if ((!a || a[4] < 0.05) && (!b || b[4] < 0.05)) continue;
        if (!a || !b || [0, 1, 2, 3].some((k) => Math.abs(a[k] - b[k]) > 1) || Math.abs(a[4] - b[4]) > 0.05) off.push(i);
      }
      returned = off.length === 0;
      for (const i of outer(off).slice(0, 10)) out.push(item('not-returned', i, null, 'differs from its rest state at the end'));
    }
    const coverage = { frames: n, frameMs: +frameMs.toFixed(1), lateFrames: F.filter((_, f) => late(f)).length, elements: M.els.length, errors: M.errors.slice(0, 3) };
    return { coverage, findings: out, returned };
  }, checkRest);

  if (rest !== null && checkRest && rest !== end) {
    result.returned = false;
    result.findings.push({ rule: 'not-returned', el: cfg.TARGET, container: null, at: null, detail: `target style at rest "${rest}" is "${end}" at the end` });
  }
  const c = result.coverage;
  return {
    action: cfg.ACTION, target: cfg.TARGET,
    status: c.frames < 20 || c.frameMs > 40 || c.errors.length ? 'inconclusive' : result.findings.length ? 'issues' : 'no-issues-detected',
    ...result,
    manual: ['Geometry and opacity only: colour changes, easing quality and whether the motion is right are judged by watching it.'],
  };
}

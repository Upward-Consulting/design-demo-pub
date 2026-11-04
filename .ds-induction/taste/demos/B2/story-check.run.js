async (page) => {
  /* Story check: measures a story page (references/story-mode.md § 7) the way a seeked timeline can be measured, since every
   * chapter is a pure function of its progress p (browser_run_code_unsafe file: one async function expression, as with
   * prep.run.js). Copy it to a scratch file (in an induction, .ds-induction/taste/story/<family>/story-check.run.js),
   * fill the settings block from the family's story.json and the owner's profile (story-mode.md § 7), then run the copy
   * with filename. It complements taste/scripts/scenes.mjs,
   * which photographs every lock chapter: it turns what scenes.mjs leaves to the eye into findings, and covers sync
   * chapters and story runs too.
   *
   *   browser_navigate  <story route, or ds.html?view=variant&slot=S-nn&v=X, or ds.html?view=demo&d=<letter>&page=<key> for a demo's home>  →  this file
   *
   * Units: every [data-scene] chapter (the kit's StoryChapter, or any runtime that follows its contract: data-scene,
   * data-model lock|sync, data-hold, is-live|is-rest, optional data-rests / data-text-still JSON, optional data-rest-at)
   * and every [data-story-run] (a carrier layer over several chapters). Seeks are instant real scrolls; the check waits
   * until no [data-settling] is left (scroll weight), finishes clock-driven animations and only then reads.
   *
   * Page-level rules run on every page, chapters or not: audio before a gesture (watched on a fresh load and again over the
   * whole desktop pass), the page's own checks (pause button, focus, canvas, scramble, audio controls), native scroll, the
   * entrance tails, reduced motion. Story pages (pages with chapters) also get the first view and the early scroll lock on a
   * fresh visit (R6). The chapter rules need data-scene units; a page without one reports no-scenes and status 'inconclusive'.
   *
   * Rules, by BAKE brief § 4 (R-numbers are the brief's): every finding names its rule below.
   *   Chapter rules (units): no-scenes · not-live · nondeterministic · transition-on-scrub · dead-chapter · dead-stretch ·
   *     motion-floor · sticky-broken · too-many-words · read-window (words × READ_SECONDS_PER_WORD ÷ VIEWPORT_SECONDS
   *     screens visible and still) · text-moves-while-read · text-over-picture · text-clipped · img-no-alt · picture-floor ·
   *     provenance-unmarked · idle-motion (R8: the whole page is watched for IDLE_MS; a pause control must be a real button
   *     and, pressed, must stop the motion) · wheel-capture · hijack-unchecked · element-cap (a unit with more than
   *     MAX_ELEMENTS elements) · focus-obscured · focus-invisible · reduced-not-rest · reduced-hidden · phone-overflow ·
   *     reflow-320 · length · consecutive-locks · scene-cap · image-bytes
   *   R1 reduced motion: reduced-animating (FAIL: any animation still running REDUCED_WAIT_MS into prefers-reduced-motion,
   *     or running after a scroll stop or a wheel, read before anything is finished; colour-only transitions of COLOUR_MS
   *     or less allowed) · reduced-wheel (FAIL: a WHEEL px wheel under reduced motion has not landed WHEEL_SETTLE_SHARE
   *     of its travel within WHEEL_SETTLE_MS)
   *   R4 vestibular: vestibular (FAIL/WARN: a text-bearing element rotates past ROTATE_TEXT, FAIL when it covers
   *     ROTATE_TEXT_AREA; a picture, an element that holds one, or a large block covering PICTURE_AREA changes scale by more
   *     than SCALE_CHANGE_WARN (WARN) or SCALE_CHANGE_FAIL (FAIL) or rotates past ROTATE_PICTURE; a data-object turns past
   *     ROTATE_OBJECT_PER_SCREEN per screen whatever its rest: an end-frame rest exempts the reduced-motion path only) ·
   *     parallax (WARN: a picture's vertical translate range over its own height above PARALLAX_FG, or PARALLAX_BG for a
   *     full-bleed data-layer="background" (a narrower one is held to PARALLAX_FG), counted only over the states in which the
   *     picture is fully inside the viewport) · parallax-unmeasured (WARN: a picture that moves vertically but is fully inside
   *     in fewer than three states is not measured, and the WARN says so) · units[].unmeasured lists small moving blocks that
   *     are neither text nor pictures; they are listed, not judged
   *   R5 native scroll: native-scroll (FAIL: a story whose scroll height is NATIVE_VIEWPORTS viewports or fewer; FAIL when
   *     Space and PageDown both fail to move scrollY from the top; WARN when only one of them does)
   *   R6 first view (fresh load, story pages): first-view (WARN: no visible h1 in the first viewport by FIRST_VIEW_MS;
   *     FAIL at FIRST_VIEW_FAIL_MS) · early-scroll-lock (WARN: html or body overflow hidden at FIRST_VIEW_MS, or a
   *     WHEEL px wheel does not move the page at FIRST_VIEW_MS; FAIL when the wheel still does not move it at FIRST_VIEW_FAIL_MS)
   *   R7 entrance tails: entrance-tail (WARN: a finite animation outside live chapters still running TAIL_MS after a scroll stop)
   *   R10 focus: focus-hidden (FAIL: a focusable element inside aria-hidden, inert or visibility:hidden content; or inside
   *     a closed panel (an ancestor with aria-expanded="false") hidden by opacity under 0.05 or by a transform that moves it
   *     off screen)
   *   R11 canvas: canvas-alt (WARN: a canvas with no aria-hidden and no aria-label or role="img" with a label)
   *   R12 scramble: scramble (FAIL: a [data-scramble] label over SCRAMBLE_MAX characters, a glyph layer not aria-hidden, or
   *     a scramble on a p, li, blockquote or heading: labels only)
   *   R13 audio: audio-before-gesture (FAIL: audio starts with no trusted gesture before it, on the fresh load or during the
   *     desktop pass) · audio-control (FAIL: an audio element with no visible mute or pause control that started by itself
   *     and may run past AUDIO_LONG_MS; WARN: any other audio element with none). The checker's own keys and clicks are not
   *     gestures. An init script stays on the page after the run (Playwright cannot remove it); it does nothing unless the
   *     page makes sound.
   *   Not automated (human checks, listed in manual[]): flashing, frame-rate independence for non-kit runtimes, the feel
   *     of the trailing layer, the real phone, the director pass.
   *
   * Returns { status, fails, warns, findings[], probes, units[], totals, manual[] }
   *   probes   what each page-level rule measured: firstView, wheelFirst, audioEvents, dom (counts of what was checked), keys,
   *            reducedRunning, reducedWheel, tails. A clean result shows these ran; a null probe did not apply to the page.
   *   findings [{ level: 'FAIL'|'WARN', rule, unit, detail }], measured (M); the manual list is human (H).
   *   units    per unit: model, mode, screens, states, moving elements, contrast samples, wheel delta, phone mode, and
   *            curves (opacity, x, y, scale over the grid for its most-changing elements: read the shape of each move)
   *   status   'clean' | 'findings' | 'inconclusive' ('inconclusive': no data-scene chapter; the page-level rules still ran).
   *            'clean' is not approval: look at the scenes.mjs sheets, the seam shots and the curves, and run the director
   *            pass (references/story-mode.md § 8).
   */
  const cfg = {
    URL: null,                  // null = the page already open; or a URL to open first
    HIJACK: [],                 // unit ids where the owner ruled scroll capture (profile.story.hijack); else wheel capture FAILs
    STEPS: 12,                  // progress samples per unit (0 … 1); the determinism pass revisits them shuffled
    VIEWPORT_SECONDS: 2,        // scroll calibration: one screen of scroll ≈ this many seconds of attention (owner-ruled)
    READ_SECONDS_PER_WORD: 0.3, // a held line needs words × this many seconds visible and still
    WORD_CAP: 12,               // words a lock chapter may hold on its stage (longer copy belongs in flow)
    DEAD_SCREENS: 1.5,          // screens of a live unit with no change before it is a dead stretch (declared rests excepted)
    MOTION_FLOOR: 8,            // distinct elements that move across the story (taste's still-page floor)
    MAX_SCREENS: 14,            // story length budget, all chapters (owner-ruled)
    MAX_HOLD: 1,                // screens a lock chapter may hold: 3 for a text-led held stage; the owner's long-pin ruling for an object-led continuous scrub sets 4
    MAX_LOCK_RUN: 3,            // lock chapters in a row before a sync chapter or a rest
    IMAGE_KB: 350,              // transferred image bytes per chapter at desktop (owner-ruled)
    IDLE_MS: 5000,              // idle watch at each chapter's middle: any change with nobody scrolling is ambient motion
    SCENE_CAP: 3,               // lock chapters per page the owner ruled (taste's two or three scenes, unless raised)
    PICTURE_FLOOR: 4,           // real pictures a story page carries (taste's floor)
    GENERATED_COUNTS: 0,        // how many of the floor may be generated pictures (the owner's floor_share, 0-4)
    BLOCKOUT: false,            // true while pictures are placeholders: picture-floor is reported as a WARN, not a FAIL
    WHEEL: 400,                 // px of one wheel notch in the wheel tests
    WHEEL_TOLERANCE: 0.1,       // wheel-capture: the page may move this share off WHEEL before it FAILs
    // R4 vestibular and parallax (replaces the old 1.5x scale and 25% area ceilings)
    PICTURE_AREA: 0.25,         // a picture covering this share of the viewport takes the scale and rotation limits below
    SCALE_CHANGE_WARN: 0.10,    // scrubbed picture: a scale change within the chapter above this WARNs …
    SCALE_CHANGE_FAIL: 0.15,    // … and above this FAILs
    ROTATE_PICTURE: 12,         // degrees a scrubbed picture (PICTURE_AREA or more) may rotate; above this WARNs
    ROTATE_TEXT: 2,             // degrees a text-bearing element may rotate at all
    ROTATE_TEXT_AREA: 0.10,     // a text element rotating past ROTATE_TEXT FAILs when it covers this share, WARNs below it
    ROTATE_OBJECT_PER_SCREEN: 90, // degrees per screen a data-object may turn, unless its rest is its end frame (restAt 1)
    PARALLAX_FG: 0.08,          // a picture's vertical translate range over its own height: foreground layers …
    PARALLAX_BG: 0.10,          // … and data-layer="background" pictures
    // R1 reduced motion
    REDUCED_WAIT_MS: 1200,      // after the reduced-motion reload, the running animations are read after this wait
    WHEEL_SETTLE_MS: 150,       // a WHEEL px wheel under reduced motion has settled (no smoothing there) by this
    WHEEL_SETTLE_SHARE: 0.9,    // … the share of its travel that must have landed by WHEEL_SETTLE_MS
    COLOUR_MS: 200,             // colour-only transitions this long or shorter are allowed under reduced motion
    // R6 first view, R7 tails, R5 native scroll
    FIRST_VIEW_MS: 1500,        // the h1 is visible in the first viewport, and a wheel moves the page, by this (WARN if not)
    FIRST_VIEW_FAIL_MS: 2500,   // … still not, at this (FAIL)
    H1_OPACITY: 0.5,            // the h1 counts as visible at this opacity or more (the product up its ancestors)
    TAIL_MS: 1200,              // a finite animation outside live chapters still running this long after a scroll stop WARNs
    NATIVE_VIEWPORTS: 1.1,      // a story whose scroll height is this many viewports or fewer cannot scroll natively (FAIL)
    KEY_WAIT_MS: 600,           // time after Space or PageDown before scrollY is read
    // R12 scramble, R13 audio
    SCRAMBLE_MAX: 40,           // the longest label that may scramble (the kit's SCRAMBLE_MAX)
    AUDIO_WAIT_MS: 3000,        // a fresh load watches for audio this long
    AUDIO_LONG_MS: 3000,        // automatic audio longer than this (or of unknown length) needs a visible control (WCAG 1.4.2)
    // layout
    DESKTOP: { width: 1440, height: 900 },
    PHONE: { width: 390, height: 844 },
    SETTLE_MS: 80,
    MAX_ELEMENTS: 1000,         // elements measured per unit (and on the page for the idle watch); a unit over this WARNs (element-cap)
    SHOTS: '/home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/demos/B2/story-shots',                // a folder (absolute path) to save seam and peak frames for the stills board, or null
  };

  const findings = [];
  // What each page-level rule measured, returned as probes: a clean page shows its checks ran, not only that nothing fired.
  const probes = { firstView: null, wheelFirst: null, audioEvents: null, dom: null, keys: null, reducedRunning: null, reducedWheel: null, tails: { stops: 0, running: 0, seen: 0 } };
  const manual = [
    'Look at every scenes.mjs sheet (desktop, phone, reduced motion) and at the seam and peak shots.',
    'Director pass: one sentence per beat frame as a stranger would say it; cover the words and judge the pictures alone.',
    'Positive rubric (story-mode.md § 8): distinct from the category, one peak, a scale arc, two focal points per chapter, boundaries with causes, one signature chapter.',
    'Watch it at real speed on the dev server: does any move feel fast (vestibular), does any hold feel long?',
    'Flashing: no content flashes (a light/dark change) more than three times in any one second, at any scroll speed and at any time, ambient motion included (WCAG 2.3.1).',
    'Real phone (iOS Safari): held stages stay put when the toolbar shows and hides.',
    'Keyboard: a lock longer than two screens offers a skip or continue control (story-mode.md § 11).',
    'Not automated: frame-rate independence for non-kit runtimes (a 30 Hz and a 120 Hz screen must show the same frame at the same p).',
    'Not automated: the feel of the trailing layer (tau 0.13-0.16 s on story pages): does the lag read as weight, or as lag?',
  ];
  const add = (level, rule, unit, detail) => findings.push({ level, rule, unit, detail });
  const wait = (ms) => page.waitForTimeout(ms);
  // The checker's own keys and clicks are not a visitor's gesture: the audio watch forgets them straight after each one.
  const checkerInput = async (act) => { await act(); await page.evaluate(() => { window.__storyGesture2 = false; }).catch(() => undefined); };

  // R13: records audio that starts, and whether a user gesture had happened by then. Runs before any page script, on every
  // navigation from here on. Guarded: a second copy does nothing.
  const audioWatch = () => {
    if (window.__storyAudioWatch2) return;
    window.__storyAudioWatch2 = true;
    window.__storyAudio2 = [];
    // A gesture is a trusted press or key on this page. navigator.userActivation is not used: some browsers report it true
    // before any input, so it cannot tell whether a visitor has acted yet.
    window.__storyGesture2 = false;
    const gesture = (e) => { if (e.isTrusted) window.__storyGesture2 = true; };
    for (const type of ['pointerdown', 'keydown', 'touchend']) window.addEventListener(type, gesture, { capture: true, passive: true });
    const log = (kind) => window.__storyAudio2.push({ kind, t: Math.round(performance.now()), gesture: window.__storyGesture2 });
    const wrap = (proto, name, kind) => {
      const orig = proto && proto[name];
      if (typeof orig !== 'function') return;
      proto[name] = function (...args) { log(kind); return orig.apply(this, args); };
    };
    if (window.OscillatorNode) wrap(OscillatorNode.prototype, 'start', 'oscillator start');
    if (window.AudioBufferSourceNode) wrap(AudioBufferSourceNode.prototype, 'start', 'buffer source start');
    const Ctx = window.AudioContext;
    if (Ctx) {
      const Watched = function (...args) {
        const ctx = new Ctx(...args);
        if (ctx.state === 'running') log('audiocontext running');
        ctx.addEventListener('statechange', () => { if (ctx.state === 'running') log('audiocontext running'); });
        return ctx;
      };
      Watched.prototype = Ctx.prototype;
      window.AudioContext = Watched;
    }
    // A media element that plays with sound: its source, its length (null when unknown or streaming) and whether it loops,
    // so the audio-control rule can tell a short cue from audio that runs on.
    document.addEventListener('playing', (e) => {
      const m = e.target;
      if (!(m instanceof HTMLMediaElement) || m.muted || m.volume <= 0) return;
      const dur = Number.isFinite(m.duration) ? Math.round(m.duration * 1000) : null;
      window.__storyAudio2.push({ kind: `media playing (${m.tagName.toLowerCase()})`, t: Math.round(performance.now()), gesture: window.__storyGesture2, media: m.currentSrc || m.src || '', dur, loop: m.loop });
    }, true);
  };
  await page.addInitScript(audioWatch);

  // Instant scroll, two frames, scroll weight settled. Clock-driven animations outside live chapters (triggered reveals)
  // are finished so they cannot flake a reading; one running inside a live chapter is a scrubbed property lagging the
  // scroll, so it is left running and returned (transition-on-scrub). Scroll-driven animations are left alone. keep = true
  // leaves the clock animations running (the entrance-tail pass reads them first).
  const settle = (keep = false) => page.evaluate((keep) => new Promise((resolve) => {
    const t0 = performance.now();
    const done = () => {
      if (document.querySelector('[data-settling]') && performance.now() - t0 < 3000) return requestAnimationFrame(done);
      const lag = [];
      for (const a of document.getAnimations()) {
        if (!(a.timeline instanceof DocumentTimeline) || !a.effect || a.effect.getTiming().iterations === Infinity) continue;
        const t = a.effect.target;
        if (t && t.closest && t.closest('[data-scene].is-live, [data-story-carrier]') && a.playState === 'running') {
          const owner = t.closest('[data-scene]');
          const carrier = t.closest('[data-story-carrier]');
          lag.push({ unit: owner ? owner.getAttribute('data-scene') : carrier ? 'run:' + carrier.getAttribute('data-story-carrier') : null, name: `${t.tagName.toLowerCase()} ${a.transitionProperty || a.animationName || 'animation'}` });
          continue;
        }
        if (!keep) { try { a.finish(); } catch { /* ignore */ } }
      }
      requestAnimationFrame(() => resolve(lag));
    };
    requestAnimationFrame(() => requestAnimationFrame(done));
  }), keep);
  let lagged = [];
  const scrollTo = async (y) => { await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(y)); lagged = await settle(); await wait(cfg.SETTLE_MS); };

  const load = async (viewport, reduced, settleMs = 500) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    if (cfg.URL && !page.url().startsWith(cfg.URL)) await page.goto(cfg.URL); else await page.reload();
    await page.waitForLoadState('load');
    await page.evaluate(() => document.fonts && document.fonts.ready.then(() => true));
    await wait(settleMs);
  };

  const units = () => page.evaluate(() => {
    const vh = innerHeight;
    const out = [];
    for (const el of document.querySelectorAll('[data-scene], [data-story-run]')) {
      const run = el.hasAttribute('data-story-run');
      const r = el.getBoundingClientRect(); const top = r.top + scrollY; const h = el.offsetHeight;
      const model = run ? 'lock' : (el.getAttribute('data-model') || 'lock');
      const json = (a) => { try { return JSON.parse(el.getAttribute(a) || 'null'); } catch { return null; } };
      out.push({ id: run ? `run:${el.getAttribute('data-story-run')}` : (el.getAttribute('data-scene') || el.id), run, model,
        live: el.classList.contains('is-live'), hold: +(el.getAttribute('data-hold') || 0), phone: el.getAttribute('data-phone'),
        rests: json('data-rests') || [], textStill: json('data-text-still'), restAt: run ? null : +(el.getAttribute('data-rest-at') ?? 1),
        start: model === 'lock' ? top : top - vh, span: Math.max(1, model === 'lock' ? h - vh : h + vh), top, height: h });
    }
    return out;
  });

  // Fingerprint of a unit: motion-relevant computed style and box of every element (carrier layers count for runs).
  // kind: object (data-object) | text (has text, itself or inside) | picture (img, video, canvas, picture, svg, background-image)
  // | other. pic: the element is a picture or holds one, so a wrapper around an img is measured as a picture; txt: it reads
  // text. total: every element the unit has, so a unit over MAX_ELEMENTS can be reported (element-cap).
  const snapshotRaw = (u) => page.evaluate(({ id, run, max }) => {
    const root = run ? document.querySelector(`[data-story-run="${CSS.escape(id.slice(4))}"] > [data-story-carrier]`) : document.querySelector(`[data-scene="${CSS.escape(id)}"]`);
    if (!root) return null;
    const vw = innerWidth, vh = innerHeight;
    // Boxes relative to the unit's own stage: a sync chapter scrolls as a whole, and that is not motion of its parts.
    const frame = (run ? root : root.querySelector(':scope > .story-stage') || root).getBoundingClientRect();
    const all = [...root.querySelectorAll('*')];
    // Computed transforms are matrix() (2D) or matrix3d() (3D). For matrix3d the rotation is taken about the axis with the
    // largest sine (Z, then Y or X): exact for one axis, approximate for combined 3D rotations. The scale is the length of the
    // first column and the translation is the fourth column.
    const parse = (t) => {
      if (!t || t === 'none') return { x: 0, y: 0, s: 1, r: 0 };
      const m2 = t.match(/^matrix\(([^)]+)\)$/);
      if (m2) { const [a, b, , , e, f] = m2[1].split(',').map(Number); return { x: e, y: f, s: Math.hypot(a, b), r: Math.atan2(b, a) * 180 / Math.PI }; }
      const m3 = t.match(/^matrix3d\(([^)]+)\)$/);
      if (!m3) return { x: 0, y: 0, s: 1, r: 0 };
      const m = m3[1].split(',').map(Number);
      const axes = [[Math.abs(m[1]), Math.atan2(m[1], m[0])], [Math.abs(m[8]), Math.atan2(m[8], m[0])], [Math.abs(m[6]), Math.atan2(m[6], m[5])]];
      const [, ang] = axes.reduce((best, cur) => (cur[0] > best[0] ? cur : best));
      return { x: m[12], y: m[13], s: Math.hypot(m[0], m[1], m[2]), r: ang * 180 / Math.PI };
    };
    const PIC = /^(img|video|canvas|picture|svg)$/;
    const rows = all.slice(0, max).map((el) => {
      const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); const t = parse(cs.transform);
      // Words as read: aria-hidden copies (the split words of SplitWords) are left out, its hidden full text counts once.
      const read = () => { const c = el.cloneNode(true); c.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove()); return (c.textContent || '').trim(); };
      const text = /^(H[1-6]|P|BLOCKQUOTE|LI|FIGCAPTION)$/.test(el.tagName) ? read() : '';
      const txt = !!(el.textContent || '').trim();
      const pic = PIC.test(el.localName) || (cs.backgroundImage && cs.backgroundImage !== 'none') || !!el.querySelector('img, video, canvas, picture, svg');
      const kind = el.hasAttribute('data-object') ? 'object' : txt ? 'text' : pic ? 'picture' : 'other';
      const inside = b.top >= 0 && b.bottom <= vh && b.left >= 0 && b.right <= vw;
      return {
        k: [cs.transform, (+cs.opacity).toFixed(3), cs.clipPath, cs.filter, cs.visibility, cs.color, cs.fontSize, cs.backgroundPosition, cs.backgroundSize, cs.backgroundColor, cs.letterSpacing, cs.strokeDashoffset, Math.round(b.x - frame.x), Math.round(b.y - frame.y), Math.round(b.width), Math.round(b.height)].join('|'),
        name: `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''} "${(el.innerText || el.getAttribute('alt') || '').trim().slice(0, 36)}"`,
        words: text ? text.split(/\s+/).length : 0, op: +cs.opacity, tx: t.x, ty: t.y, sc: t.s, rot: t.r,
        area: (b.width * b.height) / (vw * vh), inside, wide: b.width >= vw * 0.98,
        // Visible: fully inside the viewport and shown (opacity and visibility), so a partly visible block is not read as still.
        visible: inside && +cs.opacity > 0.95 && cs.visibility !== 'hidden',
        kind, pic, txt, oh: el.offsetHeight, layer: el.getAttribute('data-layer') || '',
      };
    });
    return { rows, total: all.length };
  }, { id: u.id, run: u.run, max: cfg.MAX_ELEMENTS });
  // The unit being measured: the largest element total seen in the current pass (element-cap). Each snapshot returns its rows.
  let unitTotal = 0;
  const snapshot = async (u) => {
    const r = await snapshotRaw(u);
    if (!r) return null;
    unitTotal = Math.max(unitTotal, r.total);
    return r.rows;
  };
  // Whole-page motion, for the idle watch and the pause control: a signature of every element's motion-relevant style and box.
  const pageMotion = () => page.evaluate((max) => {
    const all = [...document.querySelectorAll('body *')];
    const sig = all.slice(0, max).map((el) => {
      const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
      return [cs.transform, cs.opacity, cs.filter, cs.clipPath, cs.backgroundPosition, cs.backgroundSize, cs.backgroundColor, cs.color, cs.letterSpacing, cs.fontSize, cs.strokeDashoffset, Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)].join('|');
    }).join('\n');
    return { sig, total: all.length, videos: [...document.querySelectorAll('video')].filter((v) => !v.paused).length, pause: !!document.querySelector('[data-story-pause]') };
  }, cfg.MAX_ELEMENTS);
  const capNoted = new Set();

  // ---------- a fresh visit: first view (R6), then the audio watch (R13), page-level checks, and the desktop pass ----------
  await page.setViewportSize(cfg.DESKTOP);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => { try { sessionStorage.clear(); } catch { /* no storage: nothing to clear */ } }).catch(() => undefined);
  if (cfg.URL && !page.url().startsWith(cfg.URL)) await page.goto(cfg.URL); else await page.reload();
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts && document.fonts.ready.then(() => true));
  await wait(500);
  // The workbench mounts its variant lazily (React.lazy): poll, at most 3 s, for the chapters before deciding what the page is.
  for (let i = 0; i < 30; i++) {
    if (await page.evaluate(() => !!document.querySelector('[data-scene], [data-story-run]'))) break;
    await wait(100);
  }
  let list = await units();
  const story = list.some((u) => !u.run);
  if (!story) add('FAIL', 'no-scenes', null, 'No data-scene chapter on this page. A story route needs its chapters marked (StoryChapter, or data-scene on each chapter) or neither this check nor scenes.mjs measures it.');

  // R6: a fresh visit. The h1 is visible in the first viewport by FIRST_VIEW_MS (WARN) and FIRST_VIEW_FAIL_MS (FAIL); a
  // wheel moves the page at both times; html or body overflow hidden at FIRST_VIEW_MS WARNs.
  if (story) {
    const at = async (ms) => { const now = await page.evaluate(() => performance.now()); if (now < ms) await wait(ms - now); };
    const firstView = () => page.evaluate(() => {
      const h = document.querySelector('h1');
      if (!h) return { found: false };
      const r = h.getBoundingClientRect();
      let o = 1;
      for (let n = h; n && n !== document.documentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (cs.visibility === 'hidden' || cs.display === 'none') { o = 0; break; }
        o *= +cs.opacity;
      }
      return { found: true, inView: r.top < innerHeight && r.bottom > 0 && r.width > 0, opacity: +o.toFixed(2), text: (h.innerText || '').trim().slice(0, 40) };
    });
    const firstOk = (v) => v.found && v.inView && v.opacity >= cfg.H1_OPACITY;
    const describe = (v) => (v.found ? `h1 "${v.text}" at opacity ${v.opacity}, ${v.inView ? 'in' : 'outside'} the first viewport` : 'no h1 in the DOM');
    const wheelMoves = async () => {
      const y0 = await page.evaluate(() => scrollY);
      await page.mouse.move(cfg.DESKTOP.width / 2, cfg.DESKTOP.height / 2);
      await page.mouse.wheel(0, cfg.WHEEL);
      await wait(300);
      const moved = (await page.evaluate(() => scrollY)) - y0 > 1;
      // A plain scroll back. scrollTo() would settle the page, finishing the entrances this check is measuring.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await wait(cfg.SETTLE_MS);
      return moved;
    };
    await at(cfg.FIRST_VIEW_MS);
    const v1 = await firstView();
    if (!firstOk(v1)) add('WARN', 'first-view', null, `By ${cfg.FIRST_VIEW_MS} ms the first view is not up: ${describe(v1)}. The headline is in the HTML from the first frame; a gate or intro may hold it, but not past ${cfg.FIRST_VIEW_MS} ms.`);
    const locked1 = await page.evaluate(() => [document.documentElement, document.body].some((el) => /hidden/.test(getComputedStyle(el).overflowY)));
    if (locked1) add('WARN', 'early-scroll-lock', null, `html or body has overflow hidden at ${cfg.FIRST_VIEW_MS} ms: the page holds its scroll during an intro. Leave the scroll free from the first frame.`);
    const wheel1 = await wheelMoves();
    probes.wheelFirst = { ms: cfg.FIRST_VIEW_MS, moved: wheel1 };
    if (!wheel1) add('WARN', 'early-scroll-lock', null, `A ${cfg.WHEEL}px wheel at ${cfg.FIRST_VIEW_MS} ms did not move the page.`);
    await at(cfg.FIRST_VIEW_FAIL_MS);
    const v2 = await firstView();
    probes.firstView = { v1, v2, locked1 };
    if (!firstOk(v2)) add('FAIL', 'first-view', null, `Still not up at ${cfg.FIRST_VIEW_FAIL_MS} ms: ${describe(v2)}.`);
    const wheel2 = await wheelMoves();
    probes.wheelFirst.atFail = wheel2;
    if (!wheel2) add('FAIL', 'early-scroll-lock', null, `A ${cfg.WHEEL}px wheel at ${cfg.FIRST_VIEW_FAIL_MS} ms still does not move the page: the scroll is held past the intro cap.`);
  }

  // R13: audio before a gesture. Nothing clicks on a fresh load, so audio that starts on it starts before any gesture.
  await load(cfg.DESKTOP, false);
  await wait(cfg.AUDIO_WAIT_MS);
  const audio = await page.evaluate(() => window.__storyAudio2 || []);
  probes.audioEvents = audio.map((e) => `${e.kind}${e.gesture ? ' (after a gesture)' : ' (no gesture)'}`);
  const early = audio.filter((e) => !e.gesture);
  if (early.length) add('FAIL', 'audio-before-gesture', null, `Audio started on a fresh load with no user gesture: ${[...new Set(early.map((e) => e.kind))].join('; ')} (${early.length} time(s) in ${cfg.AUDIO_WAIT_MS} ms). Start sound only after a click or key press on a visible control.`);
  list = await units();

  // Page-level DOM checks on this fresh document: the pause control is a button (R8), focus (R10), canvas (R11), scramble
  // (R12), audio controls (R13).
  const dom = await page.evaluate((max) => {
    const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[aria-hidden="true"]'); };
    const unitOf = (el) => (el.closest('[data-scene]') ? el.closest('[data-scene]').getAttribute('data-scene') : null);
    const out = { focus: [], canvas: [], scramble: [], pause: [], audio: [] };
    const focusable = 'a[href], area[href], button, input:not([type="hidden"]), select, textarea, iframe, summary, [tabindex], [contenteditable]:not([contenteditable="false"])';
    for (const el of document.querySelectorAll(focusable)) {
      if (el.disabled) continue;
      const name = `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || el.getAttribute('href') || '').trim().slice(0, 30)}"`;
      const why = el.closest('[aria-hidden="true"], [inert]') ? 'aria-hidden or inert content' : getComputedStyle(el).visibility === 'hidden' ? 'visibility: hidden content' : null;
      if (why) { out.focus.push({ name, why, unit: unitOf(el) }); continue; }
      // A closed panel hidden by opacity or a transform alone: only an ancestor with aria-expanded="false" counts (not the control itself).
      const closed = el.parentElement && el.parentElement.closest('[aria-expanded="false"]');
      if (!closed || el.getClientRects().length === 0) continue;
      let o = 1; for (let n = el; n && n !== document.documentElement; n = n.parentElement) o *= +getComputedStyle(n).opacity;
      const r = el.getBoundingClientRect();
      const off = r.right <= 0 || r.bottom <= 0 || r.left >= innerWidth || r.top >= innerHeight;
      if (o < 0.05 || off) out.focus.push({ name, why: o < 0.05 ? 'a closed panel hidden by opacity' : 'a closed panel hidden by a transform that moves it off screen', unit: unitOf(el) });
    }
    for (const c of document.querySelectorAll('canvas')) {
      const label = (c.getAttribute('aria-label') || '').trim();
      const labelled = !!label || (c.getAttribute('role') === 'img' && !!c.getAttribute('aria-labelledby'));
      if (c.closest('[aria-hidden="true"]') || labelled) continue;
      out.canvas.push({ unit: unitOf(c), name: c.id ? `canvas#${c.id}` : 'canvas' });
    }
    for (const el of document.querySelectorAll('[data-scramble]')) {
      const kids = [...el.children];
      const glyph = kids[kids.length - 1];
      const label = (kids.length > 1 ? kids[0].textContent : el.textContent || '').trim();
      const len = Array.from(label).length;
      const name = `"${label.slice(0, 30)}"`;
      if (/^(P|LI|BLOCKQUOTE|H[1-6])$/.test(el.tagName)) out.scramble.push({ kind: 'element', tag: el.tagName.toLowerCase(), len, name, unit: unitOf(el) });
      if (len > max) out.scramble.push({ kind: 'long', len, name, unit: unitOf(el) });
      if (!glyph || glyph.getAttribute('aria-hidden') !== 'true') out.scramble.push({ kind: 'glyph', len, name, unit: unitOf(el) });
    }
    for (const el of document.querySelectorAll('[data-story-pause]')) if (el.tagName !== 'BUTTON') out.pause.push(el.tagName.toLowerCase());
    for (const a of document.querySelectorAll('audio')) {
      const own = a.controls && visible(a);
      const named = [...document.querySelectorAll('button, [role="button"], input[type="checkbox"], input[type="button"]')].some((b) => !b.hasAttribute('data-story-pause') && visible(b) && /mute|sound|audio|volume|pause/i.test(b.getAttribute('aria-label') || b.getAttribute('title') || b.getAttribute('value') || b.textContent || ''));
      out.audio.push({ src: (a.currentSrc || a.src || '(no source)').slice(0, 48), full: a.currentSrc || a.src || '', control: !!(own || named) });
    }
    return out;
  }, cfg.SCRAMBLE_MAX);
  probes.dom = await page.evaluate(() => ({ focusable: document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]').length, canvas: document.querySelectorAll('canvas').length, scramble: document.querySelectorAll('[data-scramble]').length, audio: document.querySelectorAll('audio').length, pauseControls: document.querySelectorAll('[data-story-pause]').length }));
  Object.assign(probes.dom, { issues: { focusHidden: dom.focus.length, canvasUnlabelled: dom.canvas.length, scramble: dom.scramble.length, pauseNotButton: dom.pause.length, audioNoControl: dom.audio.filter((a) => !a.control).length } });
  for (const f of dom.focus) add('FAIL', 'focus-hidden', f.unit, `${f.name} can take focus inside ${f.why}: a closed menu or hidden panel is in the tab order. Make it inert or display: none while closed, or take the aria-hidden off what a keyboard can reach.`);
  for (const c of dom.canvas) add('WARN', 'canvas-alt', c.unit, `${c.name} has no text alternative: give it aria-label (or role="img" with a label), or aria-hidden="true" when it is decorative.`);
  for (const s of dom.scramble) add('FAIL', 'scramble', s.unit, s.kind === 'long' ? `${s.name} is ${s.len} characters (a scrambled label is ${cfg.SCRAMBLE_MAX} characters or fewer). Longer copy renders plain, not scrambled.` : s.kind === 'element' ? `${s.name} is on a <${s.tag}>: only labels scramble. Body text and headings render plain.` : `${s.name} has no aria-hidden glyph layer: a screen reader would read the shuffle. Keep the full label in a visually hidden copy and mark the glyph layer aria-hidden="true".`);
  for (const t of dom.pause) add('FAIL', 'idle-motion', null, `[data-story-pause] is a <${t}>, not a button: a pause control must be a real button (WCAG 2.2.2: reachable from the keyboard, named).`);

  // R5: native scroll. A story must be longer than NATIVE_VIEWPORTS viewports; from the top, Space and PageDown move the page.
  const scroll = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, view: innerHeight }));
  if (story && scroll.height / scroll.view <= cfg.NATIVE_VIEWPORTS) add('FAIL', 'native-scroll', null, `The page is ${(scroll.height / scroll.view).toFixed(2)} viewports tall (a story must be longer than ${cfg.NATIVE_VIEWPORTS} viewports to scroll natively): a fixed stage with nothing to scroll is not a story.`);
  if (scroll.height > scroll.view + 1) {
    const moved = {};
    for (const key of ['Space', 'PageDown']) {
      await scrollTo(0);
      await page.evaluate(() => { const a = document.activeElement; if (a && a !== document.body && typeof a.blur === 'function') a.blur(); });
      await checkerInput(() => page.keyboard.press(key));
      await wait(cfg.KEY_WAIT_MS);
      moved[key] = (await page.evaluate(() => scrollY)) > 1;
    }
    await scrollTo(0);
    probes.keys = { ...moved, maxScroll: scroll.height - scroll.view };
    if (!moved.Space && !moved.PageDown) add('FAIL', 'native-scroll', null, 'Space and PageDown do not move the page from the top: a key handler captures them, or the page is held in a fixed stage. Let the keyboard scroll the document.');
    else if (!moved.Space || !moved.PageDown) add('WARN', 'native-scroll', null, `Only ${moved.Space ? 'Space' : 'PageDown'} moves the page from the top; the other does not.`);
  }

  // R7: entrance tails. At each scroll stop (one screen apart) wait TAIL_MS, then read the finite clock animations outside
  // the live chapters that are still running. Each stop's animations are finished afterwards, so the stops do not carry.
  const span = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
  const tailStops = [];
  for (let y = 0; y < span; y += cfg.DESKTOP.height) tailStops.push(y);
  tailStops.push(span);
  const tailSeen = new Set();
  probes.tails.stops = tailStops.length;
  for (const y of tailStops) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(y));
    await settle(true);
    await wait(cfg.TAIL_MS);
    const tails = await page.evaluate(() => {
      const out = [];
      for (const a of document.getAnimations()) {
        const t = a.effect && a.effect.target;
        if (!t || !(a.timeline instanceof DocumentTimeline) || a.playState !== 'running' || a.effect.getTiming().iterations === Infinity) continue;
        if (t.closest && t.closest('[data-scene].is-live, [data-story-carrier]')) continue;
        out.push({ label: `${t.tagName.toLowerCase()} ${a.transitionProperty || a.animationName || 'animation'}`, left: Math.round(a.effect.getComputedTiming().endTime - (a.currentTime || 0)), unit: t.closest && t.closest('[data-scene]') ? t.closest('[data-scene]').getAttribute('data-scene') : null });
      }
      return out;
    });
    probes.tails.running += tails.length;
    for (const t of tails) {
      const key = `${t.unit}|${t.label}`;
      if (tailSeen.has(key)) continue;
      tailSeen.add(key);
      probes.tails.seen = tailSeen.size;
      add('WARN', 'entrance-tail', t.unit, `${t.label} is still running ${cfg.TAIL_MS} ms after the scroll stopped (${t.left} ms left). An entrance lands within ${cfg.TAIL_MS} ms: shorten its duration, or the stagger (index × --story-stagger).`);
    }
    await page.evaluate(() => {
      for (const a of document.getAnimations()) {
        const t = a.effect && a.effect.target;
        if (!t || !(a.timeline instanceof DocumentTimeline) || (t.closest && t.closest('[data-scene].is-live, [data-story-carrier]'))) continue;
        try { a.finish(); } catch { /* infinite, or already done */ }
      }
    });
  }
  await scrollTo(0);

  // ---------- desktop, motion allowed ----------
  const grid = Array.from({ length: cfg.STEPS + 1 }, (_, k) => +(k / cfg.STEPS).toFixed(4));
  const report = [];
  const movers = new Set();

  // Sticky: ancestors that break a held stage.
  const blockers = await page.evaluate(() => {
    const out = new Set();
    for (const el of document.querySelectorAll('.story-lock, .story-run')) {
      for (let n = el.parentElement; n && n !== document.documentElement.parentElement; n = n.parentElement) {
        const cs = getComputedStyle(n);
        const bad = [];
        if (/(hidden|auto|scroll)/.test(cs.overflowX + ' ' + cs.overflowY)) bad.push(`overflow ${cs.overflowX}/${cs.overflowY}`);
        if (cs.transform !== 'none') bad.push('transform');
        if (cs.filter !== 'none') bad.push('filter');
        if (cs.contain && cs.contain !== 'none') bad.push(`contain ${cs.contain}`);
        if (cs.contentVisibility && cs.contentVisibility !== 'visible') bad.push(`content-visibility ${cs.contentVisibility}`);
        if (bad.length) out.add(`${n.tagName.toLowerCase()}${n.id ? '#' + n.id : ''}${n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/)[0] : ''}: ${bad.join(', ')}`);
      }
    }
    return [...out];
  });

  let lockRun = 0, totalScreens = 0;
  for (const u of (story ? list : [])) {
    const s = { id: u.id, model: u.model, mode: u.live ? 'live' : 'rest', screens: +(u.height / cfg.DESKTOP.height).toFixed(1), states: 0, moving: 0, contrast: [], curves: [] };
    report.push(s);
    if (!u.run) {
      totalScreens += u.height / cfg.DESKTOP.height;
      if (u.model === 'lock') { lockRun++; if (lockRun > cfg.MAX_LOCK_RUN) add('WARN', 'consecutive-locks', u.id, `${lockRun} lock chapters in a row (at most ${cfg.MAX_LOCK_RUN}). Put a sync chapter between them, or place the story's one rest beat there.`); } else lockRun = 0;
      if (u.model === 'lock' && u.hold > cfg.MAX_HOLD) add('WARN', 'length', u.id, `Holds ${u.hold} screens (budget ${cfg.MAX_HOLD}: 3 for a text-led held stage; 4 only for an object-led continuous scrub the owner has ruled, long-pin). Otherwise cut the hold.`);
    }
    if (!u.live) {
      if (!u.run) add('FAIL', 'not-live', u.id, 'Rests on desktop with motion allowed, so it never runs: check its mode logic, the board attribute data-story-rest, words that do not fit one screen, or a script error.');
      continue;
    }
    // Pass 1 in order, pass 2 shuffled.
    const first = new Map();
    const lagging = new Set();
    unitTotal = 0;
    for (const p of grid) { await scrollTo(u.start + p * u.span); lagged.filter((l) => l.unit === u.id).forEach((l) => lagging.add(l.name)); first.set(p, await snapshot(u)); }
    if (unitTotal > cfg.MAX_ELEMENTS) add('WARN', 'element-cap', u.id, `${unitTotal} elements in this unit; only the first ${cfg.MAX_ELEMENTS} are measured for motion and text (MAX_ELEMENTS). Split the chapter, or raise MAX_ELEMENTS.`);
    if (lagging.size) add('FAIL', 'transition-on-scrub', u.id, `A CSS transition or clock animation runs on a scrubbed element (${[...lagging].slice(0, 3).join('; ')}): it lags the scroll and makes the same p look different by the way you got there. Inside a live chapter nothing transitions on its own (mark moved elements data-move).`);
    const order = grid.map((p, i) => ({ p, k: (i * 7919) % 101 })).sort((a, b) => a.k - b.k).map((x) => x.p);
    for (const p of order) {
      await scrollTo(u.start + p * u.span);
      const again = await snapshot(u); const before = first.get(p);
      if (!again || !before) continue;
      const i = before.findIndex((e, j) => !again[j] || e.k !== again[j].k);
      if (i !== -1 || before.length !== again.length) { add('FAIL', 'nondeterministic', u.id, `At p=${p} the state differs from the first visit (${before[i] ? before[i].name : 'element count'}). Derive every value from p: no clocks, no CSS transition on a scrubbed property, no state carried between frames.`); break; }
    }
    const states = grid.map((p) => first.get(p)).filter(Boolean);
    if (!states.length) continue;
    const sig = states.map((st) => st.map((e) => e.k).join('\n'));
    s.states = new Set(sig).size;
    // Sticky assertion: a held stage's top stays at 0 inside the hold.
    if (u.model === 'lock' && !u.run) {
      const tops = [];
      for (const p of [0.25, 0.5, 0.75]) { await scrollTo(u.start + p * u.span); tops.push(await page.evaluate((id) => { const st = document.querySelector(`[data-scene="${CSS.escape(id)}"] > .story-stage`); return st ? Math.round(st.getBoundingClientRect().top) : 0; }, u.id)); }
      if (tops.some((t) => Math.abs(t) > 1)) add('FAIL', 'sticky-broken', u.id, `The held stage moved (top ${tops.join(', ')}px at p=0.25/0.5/0.75): sticky is broken by an ancestor${blockers.length ? ': ' + blockers.slice(0, 3).join('; ') : ''}. Fix the app-level rule (use overflow: clip), not the kit.`);
    }
    // Change across the unit.
    const changed = [];
    states[0].forEach((e, j) => { const vals = states.map((st) => st[j]).filter(Boolean); if (vals.some((v) => v.k !== e.k)) changed.push(j); });
    s.moving = changed.length;
    changed.forEach((j) => movers.add(`${u.id}:${j}`));
    if (s.states <= 1) add('FAIL', 'dead-chapter', u.id, `Nothing changes across its ${Math.round(u.span)}px. A live unit carries motion, or it should not be live.`);
    else {
      const inRest = (p) => (u.rests || []).some(([a, b]) => p >= a && p <= b);
      let run = 0, worst = 0, at = 0;
      for (let i = 1; i < sig.length; i++) { if (sig[i] === sig[i - 1] && !inRest(grid[i])) { run++; if (run > worst) { worst = run; at = grid[i]; } } else run = 0; }
      const screens = (worst / cfg.STEPS) * (u.span / cfg.DESKTOP.height);
      if (screens > cfg.DEAD_SCREENS) add('WARN', 'dead-stretch', u.id, `${screens.toFixed(1)} screens (ending near p=${at}) show no change. Shorten the hold, give the stretch a beat, or declare it a rest (data-rests).`);
    }
    // Curves for the most-changing elements: the shape of each move.
    const spread = changed.map((j) => { const v = states.map((st) => st[j]); const rng = (f) => Math.max(...v.map(f)) - Math.min(...v.map(f)); return { j, score: rng((e) => e.op) * 100 + rng((e) => e.tx) / 10 + rng((e) => e.ty) / 10 + rng((e) => e.sc) * 50 }; }).sort((a, b) => b.score - a.score).slice(0, 4);
    s.curves = spread.map(({ j }) => ({ el: states[0][j].name, opacity: states.map((st) => +st[j].op.toFixed(2)), x: states.map((st) => Math.round(st[j].tx)), y: states.map((st) => Math.round(st[j].ty)), scale: states.map((st) => +st[j].sc.toFixed(3)) }));
    // R4 vestibular and parallax. Each moving element is measured by what it is: an object (its turn), a text-bearing element (its
    // rotation), a picture or an element that holds one, or a large block (scale, rotation and parallax). A small moving block
    // that is neither is listed in the unit's unmeasured list, not judged.
    const r3 = (x) => Math.round(x * 1000) / 1000;
    const turned = (vals) => vals.slice(1).reduce((n, x, i) => n + Math.abs(((x - vals[i] + 540) % 360) - 180), 0);
    s.unmeasured = [];
    for (const j of changed) {
      const v = states.map((st) => st[j]);
      const e0 = v[0];
      const big = Math.max(...v.map((e) => e.area));
      const rot = Math.max(...v.map((e) => Math.abs(e.rot)));
      if (e0.kind === 'object') {
        // No exemption on the desktop path: an end-frame rest (data-rest-at 1) exempts only the reduced-motion path.
        const perScreen = turned(v.map((e) => e.rot)) / Math.max(0.01, u.span / cfg.DESKTOP.height);
        if (perScreen > cfg.ROTATE_OBJECT_PER_SCREEN) add('WARN', 'vestibular', u.id, `${e0.name} is an object that turns ${Math.round(perScreen)}° per screen (ceiling ${cfg.ROTATE_OBJECT_PER_SCREEN}°). An end-frame rest (data-rest-at 1) exempts only the reduced-motion path, so this is judged on every visit; this chapter's rest is ${u.restAt === 1 ? 'an end frame' : 'not an end frame'} (data-rest-at ${u.restAt === null ? 'none: a carrier' : u.restAt}).`);
        continue;
      }
      if (e0.txt && rot > cfg.ROTATE_TEXT) add(big >= cfg.ROTATE_TEXT_AREA ? 'FAIL' : 'WARN', 'vestibular', u.id, `${e0.name} is text and rotates ${rot.toFixed(1)}° (ceiling ${cfg.ROTATE_TEXT}°) covering ${Math.round(big * 100)}% of the screen. Keep words still in rotation: move the picture, not the text.`);
      const picture = e0.pic || (!e0.txt && big >= cfg.PICTURE_AREA);
      if (!picture) { if (!e0.txt) s.unmeasured.push(e0.name); continue; }
      if (big >= cfg.PICTURE_AREA) {
        const change = r3(Math.max(...v.map((e) => e.sc)) - Math.min(...v.map((e) => e.sc)));
        if (change > cfg.SCALE_CHANGE_FAIL) add('FAIL', 'vestibular', u.id, `${e0.name} covers ${Math.round(big * 100)}% of the screen and changes scale by ${change.toFixed(2)} within the chapter (FAIL above ${cfg.SCALE_CHANGE_FAIL}, WARN above ${cfg.SCALE_CHANGE_WARN}).`);
        else if (change > cfg.SCALE_CHANGE_WARN) add('WARN', 'vestibular', u.id, `${e0.name} covers ${Math.round(big * 100)}% of the screen and changes scale by ${change.toFixed(2)} within the chapter (WARN above ${cfg.SCALE_CHANGE_WARN}).`);
        if (rot > cfg.ROTATE_PICTURE) add('WARN', 'vestibular', u.id, `${e0.name} covers ${Math.round(big * 100)}% of the screen and rotates ${rot.toFixed(1)}° (ceiling ${cfg.ROTATE_PICTURE}°).`);
      }
      // Parallax is the travel while the picture is on screen: only the states in which it is fully inside the viewport count, so a
      // picture taller than the viewport, or one that slides in from off screen, is not measured there (see parallax-unmeasured).
      const onScreen = v.filter((e) => e.inside);
      const bgLayer = e0.layer === 'background';
      if (bgLayer && !e0.wide) add('WARN', 'parallax', u.id, `${e0.name} is data-layer="background" but does not cover the viewport width. The 10% allowance is for a full-bleed background layer, so this one is held to ${(cfg.PARALLAX_FG * 100).toFixed(0)}%.`);
      const limit = bgLayer && e0.wide ? cfg.PARALLAX_BG : cfg.PARALLAX_FG;
      if (onScreen.length >= 3) {
        const range = r3((Math.max(...onScreen.map((e) => e.ty)) - Math.min(...onScreen.map((e) => e.ty))) / Math.max(1, e0.oh));
        if (range > limit) add('WARN', 'parallax', u.id, `${e0.name} translates ${(range * 100).toFixed(0)}% of its own height while fully on screen across the chapter (ceiling ${(limit * 100).toFixed(0)}%${bgLayer && e0.wide ? ', full-bleed background layer' : '; a full-bleed background may use data-layer="background" for ' + (cfg.PARALLAX_BG * 100).toFixed(0) + '%'}).`);
      } else {
        const travel = Math.max(...v.map((e) => e.ty)) - Math.min(...v.map((e) => e.ty));
        if (travel > 0.5) add('WARN', 'parallax-unmeasured', u.id, `${e0.name} moves ${Math.round(travel)} px vertically, but it is fully inside the viewport in only ${onScreen.length} of ${v.length} states (three are needed), so its parallax is not measured. Check its travel by hand against the ${(limit * 100).toFixed(0)}% limit.`);
      }
    }
    if (u.run) continue;
    // Words held on a lock stage, read windows, text still while read.
    const textIdx = states[0].map((e, j) => (e.words >= 1 ? j : -1)).filter((j) => j >= 0);
    if (u.model === 'lock') {
      const held = textIdx.reduce((n, j) => n + states[0][j].words, 0);
      if (held > cfg.WORD_CAP) add('WARN', 'too-many-words', u.id, `${held} words on a held stage (cap ${cfg.WORD_CAP}). Longer copy goes into normal flow beside or after the chapter.`);
    }
    // A declared reading window (data-text-still [from, to]): the text fully shown at `from` stays shown and still until
    // `to`. Without one, each text block holds still for as long as it is fully visible.
    const readWin = Array.isArray(u.textStill) && u.textStill.length === 2 ? u.textStill : null;
    const ia = readWin ? grid.findIndex((p) => p >= readWin[0] - 1e-6) : -1;
    const ib = readWin ? grid.reduce((k, p, i) => (p <= readWin[1] + 1e-6 ? i : k), -1) : -1;
    let landed = 0;
    for (const j of textIdx) {
      const vis = grid.map((p, i) => (states[i] && states[i][j] ? states[i][j].visible : false));
      const a = vis.indexOf(true), b = vis.lastIndexOf(true);
      if (a === -1) continue;
      let flagged = false;
      if (ia !== -1 && ib >= ia && vis[ia]) {
        landed++;
        const seg = grid.slice(ia, ib + 1).map((p, k) => states[ia + k] && states[ia + k][j]);
        if (seg.some((e) => !e || !e.visible) || new Set(seg.map((e) => e && e.k)).size > 1) {
          flagged = true;
          add('WARN', 'text-moves-while-read', u.id, `${states[0][j].name} moves or leaves inside the chapter's declared reading window (data-text-still, p=${readWin[0]}–${readWin[1]}). Hold it still until p=${readWin[1]}.`);
        }
      }
      const window = grid.slice(a, b + 1).map((p, k) => states[a + k][j].k);
      if (!flagged && new Set(window).size > 1) add('WARN', 'text-moves-while-read', u.id, `${states[0][j].name} changes while it is fully visible (p=${grid[a]}–${grid[b]}). Land it, hold it still, then exit; move pictures, not the words being read.`);
      const screens = ((grid[b] - grid[a]) * u.span) / cfg.DESKTOP.height;
      const need = (states[0][j].words * cfg.READ_SECONDS_PER_WORD) / cfg.VIEWPORT_SECONDS;
      if (u.model === 'lock' && screens + 1e-6 < need) add('WARN', 'read-window', u.id, `${states[0][j].name}: visible and still for ${screens.toFixed(2)} screens, needs ${need.toFixed(2)} (${states[0][j].words} words × ${cfg.READ_SECONDS_PER_WORD}s ÷ ${cfg.VIEWPORT_SECONDS}s per screen). Exit later or cut words.`);
    }
    if (ia !== -1 && textIdx.length && !landed) add('WARN', 'text-moves-while-read', u.id, `No text is fully shown at p=${readWin[0]}, the start of the chapter's declared reading window (data-text-still): land the words by then.`);
    // Text over pictures, at the middle and the end: contrast against the pixels behind each text box, text hidden.
    for (const p of [0.5, 1]) {
      await scrollTo(u.start + p * u.span);
      const boxes = await page.evaluate((id) => {
        const root = document.querySelector(`[data-scene="${CSS.escape(id)}"]`);
        const pics = [...root.querySelectorAll('img, video, canvas, picture, [style*="background-image"]')].map((el) => el.getBoundingClientRect()).filter((r) => r.width > 40 && r.height > 40);
        const out = [];
        for (const el of root.querySelectorAll('h1, h2, h3, h4, p, blockquote, figcaption, a, button, li')) {
          const cs = getComputedStyle(el);
          if (+cs.opacity < 0.5 || cs.visibility === 'hidden' || !(el.innerText || '').trim()) continue;
          const range = document.createRange(); range.selectNodeContents(el); const b = range.getBoundingClientRect();
          if (b.width < 8 || b.height < 8 || b.bottom < 0 || b.top > innerHeight) continue;
          if (!pics.some((r) => b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top)) continue;
          const size = parseFloat(cs.fontSize); const bold = +cs.fontWeight >= 700;
          el.setAttribute('data-story-check', String(out.length));
          out.push({ i: out.length, text: el.innerText.trim().slice(0, 40), color: cs.color, large: size >= 24 || (bold && size >= 18.66),
            clip: { x: Math.max(0, b.left), y: Math.max(0, b.top), width: Math.min(innerWidth, b.right) - Math.max(0, b.left), height: Math.min(innerHeight, b.bottom) - Math.max(0, b.top) } });
        }
        return out;
      }, u.id);
      for (const box of boxes.slice(0, 8)) {
        if (box.clip.width < 4 || box.clip.height < 4) continue;
        await page.addStyleTag({ content: `[data-story-check="${box.i}"], [data-story-check="${box.i}"] * { color: transparent !important; text-shadow: none !important; -webkit-text-stroke: 0 !important; }` }).then((h) => h.evaluate((n) => n.setAttribute('data-story-check-style', '')));
        await settle();
        const png = await page.screenshot({ clip: box.clip, type: 'png' });
        await page.evaluate(() => document.querySelectorAll('[data-story-check-style]').forEach((n) => n.remove()));
        const ratio = await page.evaluate(async ({ b64, color }) => {
          const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
          const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
          const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(img, 0, 0);
          const d = ctx.getImageData(0, 0, c.width, c.height).data;
          const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
          const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
          const step = Math.max(1, Math.floor(d.length / 4 / 6000));
          const ls = []; for (let i = 0; i < d.length; i += 4 * step) ls.push(lum(d[i], d[i + 1], d[i + 2]));
          ls.sort((a, b) => a - b);
          const m = color.match(/[\d.]+/g).map(Number); const t = lum(m[0], m[1], m[2]);
          const ratioTo = (l) => (Math.max(t, l) + 0.05) / (Math.min(t, l) + 0.05);
          return Math.min(ratioTo(ls[Math.floor(ls.length * 0.05)]), ratioTo(ls[Math.floor(ls.length * 0.95)]));
        }, { b64: png.toString('base64'), color: box.color });
        const need = box.large ? 3 : 4.5;
        s.contrast.push({ p, text: box.text, ratio: +ratio.toFixed(2), need });
        if (ratio < need) add('FAIL', 'text-over-picture', u.id, `"${box.text}" at p=${p}: ${ratio.toFixed(2)}:1 against the picture behind it (needs ${need}:1). Move it to a calm region, put a flat neutral scrim under it, or ask the shot card for a quiet zone there.`);
      }
      await page.evaluate(() => document.querySelectorAll('[data-story-check]').forEach((el) => el.removeAttribute('data-story-check')));
    }
    // Idle: nothing moves while nobody scrolls, measured over the whole page at the chapter's middle (the chapter's own motion and
    // anything else on the page that runs), unless a pause control exists (its pressed state is checked after the chapters).
    await scrollTo(u.start + 0.5 * u.span);
    const idleA = await pageMotion(); await wait(cfg.IDLE_MS); const idleB = await pageMotion();
    if (idleB.total > cfg.MAX_ELEMENTS && !capNoted.has(`idle|${u.id}`)) { capNoted.add(`idle|${u.id}`); add('WARN', 'element-cap', u.id, `The page has ${idleB.total} elements; the idle watch measures the first ${cfg.MAX_ELEMENTS}, so motion in the rest is not seen. Split the page, or raise MAX_ELEMENTS.`); }
    if ((idleA.sig !== idleB.sig || idleB.videos) && !idleB.pause) add('FAIL', 'idle-motion', u.id, `Something moves while nobody scrolls${idleB.videos ? ` (${idleB.videos} playing video)` : ''} and the page has no pause control ([data-story-pause]). Motion that runs past five seconds with nobody scrolling needs one (WCAG 2.2.2), or remove it.`);
    // Wheel.
    await scrollTo(u.start + 0.2 * u.span);
    const y0 = await page.evaluate(() => scrollY);
    await page.mouse.move(cfg.DESKTOP.width / 2, cfg.DESKTOP.height / 2);
    await page.mouse.wheel(0, cfg.WHEEL);
    // wait until the page stops moving (smoothing and a busy main thread both take time), at most 2.5 s
    let yPrev = -1, still = 0;
    for (let t = 0; t < 25 && still < 3; t++) { await wait(100); const y = await page.evaluate(() => scrollY); still = y === yPrev ? still + 1 : 0; yPrev = y; }
    s.wheel = (await page.evaluate(() => scrollY)) - y0;
    if (Math.abs(s.wheel - cfg.WHEEL) > cfg.WHEEL * cfg.WHEEL_TOLERANCE && !cfg.HIJACK.includes(u.id)) add('FAIL', 'wheel-capture', u.id, `A ${cfg.WHEEL}px wheel moved the page ${s.wheel}px: the wheel is captured or the scroll rate changed. That is the owner's hijack ruling for this chapter, or a bug (story-mode.md § 2).`);
    // The owner ruled scroll capture for this chapter. The check does not test the ruled conditions (story-mode.md § 2: fine
    // pointers only, a visible skip, a keyboard route, off under reduced motion), so a captured wheel is reported, not passed.
    if (Math.abs(s.wheel - cfg.WHEEL) > cfg.WHEEL * cfg.WHEEL_TOLERANCE && cfg.HIJACK.includes(u.id)) add('WARN', 'hijack-unchecked', u.id, `A ${cfg.WHEEL}px wheel moved the page ${s.wheel}px in a chapter the owner ruled as a hijack. Its conditions (story-mode.md § 2) are checked by hand, not by this check.`);
    // Seam and peak frames for the stills board.
    if (cfg.SHOTS) {
      for (const [label, y] of [['peak', u.start + 0.5 * u.span], ['seam-out', u.top + u.height - cfg.DESKTOP.height + 2]]) { await scrollTo(y); await page.screenshot({ path: `${cfg.SHOTS}/${u.id}-${label}.jpg`, quality: 75 }); }
    }
  }
  // Images in every unit, chapters and carriers alike (the whole page has been scrolled, so lazy images have loaded):
  // alternatives, bytes per unit, provenance for the floor.
  const imgs = await page.evaluate(() => {
    const res = new Map(performance.getEntriesByType('resource').map((e) => [e.name, e.transferSize || e.encodedBodySize || 0]));
    return [...document.querySelectorAll('img')].map((im) => {
      const sc = im.closest('[data-scene]'); const cr = im.closest('[data-story-carrier]');
      return { unit: sc ? sc.getAttribute('data-scene') : cr ? 'run:' + cr.getAttribute('data-story-carrier') : null, src: im.currentSrc || im.src, alt: im.getAttribute('alt'), hidden: im.closest('[aria-hidden="true"]') !== null, bytes: res.get(im.currentSrc || im.src) || 0, provenance: im.getAttribute('data-provenance') };
    }).filter((im) => im.unit !== null);
  });
  for (const im of imgs) {
    const carrier = im.unit.startsWith('run:');
    if (im.alt === null && (carrier || !im.hidden)) add('FAIL', 'img-no-alt', im.unit, carrier ? `A carrier image has no alt (${im.src.split('/').pop()}): carriers are decorative by contract, so give it alt="".` : `An image has no alt (${im.src.split('/').pop()}): describe it, or alt="" if purely decorative.`);
  }
  for (const s of report) {
    const mine = imgs.filter((im) => im.unit === s.id);
    const kb = mine.reduce((n, im) => n + im.bytes, 0) / 1024;
    s.imageKB = Math.round(kb);
    s.provenance = mine.reduce((m, im) => { m[im.provenance || 'unmarked'] = (m[im.provenance || 'unmarked'] || 0) + 1; return m; }, {});
    if (kb > cfg.IMAGE_KB) add('WARN', 'image-bytes', s.id, `${Math.round(kb)} KB of images transferred (budget ${cfg.IMAGE_KB} KB at desktop).`);
  }
  const locks = list.filter((u) => !u.run && u.model === 'lock').length;
  if (locks > cfg.SCENE_CAP) add('WARN', 'scene-cap', null, `${locks} lock chapters on the page (ruled cap ${cfg.SCENE_CAP}). Make some chapters sync, or record the owner's raised cap (many-scenes, scene-heavy allowances).`);
  const prov = imgs.reduce((m, im) => { m[im.provenance || 'unmarked'] = (m[im.provenance || 'unmarked'] || 0) + 1; return m; }, {});
  const real = (prov.own || 0) + (prov.found || 0);
  const counted = real + Math.min(prov.generated || 0, cfg.GENERATED_COUNTS);
  if (story && counted < cfg.PICTURE_FLOOR) add(cfg.BLOCKOUT ? 'WARN' : 'FAIL', 'picture-floor', null, `${real} own or found picture(s)${prov.generated ? ` and ${prov.generated} generated (${Math.min(prov.generated, cfg.GENERATED_COUNTS)} may count)` : ''}: below the floor of ${cfg.PICTURE_FLOOR}. Generated pictures count only up to the owner's floor_share (image-delegation.md § 7).${cfg.BLOCKOUT ? ' Blockout: the pictures are placeholders, so the floor is still owed.' : ''}`);
  if (prov.unmarked) add('WARN', 'provenance-unmarked', null, `${prov.unmarked} image(s) carry no data-provenance (own | found | generated): mark each, or the floor cannot be counted.`);
  if (story && movers.size < cfg.MOTION_FLOOR) add('FAIL', 'motion-floor', null, `Only ${movers.size} element(s) move across the story (floor ${cfg.MOTION_FLOOR}, taste's still-page rule measured where inspect cannot see CSS-variable motion).`);
  if (totalScreens > cfg.MAX_SCREENS) add('WARN', 'length', null, `The story runs ${totalScreens.toFixed(1)} screens (budget ${cfg.MAX_SCREENS}). Cut a chapter or shorten holds; pinned pages that run long read as a trap.`);

  // Focus: visible, unobscured, fully opaque, in reading order.
  await checkerInput(() => page.keyboard.press('Tab'));
  for (let i = 0; i < 40; i++) {
    const f = await page.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body) return null;
      const unit = el.closest('[data-scene]'); if (!unit) return { skip: true };
      let o = 1; for (let n = el; n && n !== document.documentElement; n = n.parentElement) o *= +getComputedStyle(n).opacity;
      const r = el.getBoundingClientRect(); let hits = 0;
      for (const fx of [0.2, 0.5, 0.8]) for (const fy of [0.2, 0.5, 0.8]) {
        const x = r.left + r.width * fx, y = r.top + r.height * fy;
        if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
        const hit = document.elementFromPoint(x, y); if (hit && (hit === el || el.contains(hit))) hits++;
      }
      const cs = getComputedStyle(el);
      return { unit: unit.getAttribute('data-scene'), name: `${el.tagName.toLowerCase()} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"`, opaque: o >= 0.99, hits, ring: cs.outlineStyle !== 'none' || cs.boxShadow !== 'none' };
    });
    if (f && !f.skip) {
      if (!f.opaque || f.hits === 0) add('WARN', 'focus-obscured', f.unit, `${f.name} takes focus while ${f.opaque ? 'covered or off screen' : 'faded'}. Keep controls clear of held layers and fully visible whenever they can be focused.`);
      if (!f.ring) add('WARN', 'focus-invisible', f.unit, `${f.name} shows no focus ring.`);
    }
    await checkerInput(() => page.keyboard.press('Tab'));
  }

  // Text clipped by a stage at 200% text size.
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await wait(300);
  await settle();
  list = await units();
  for (const u of list.filter((x) => !x.run && x.live && x.model === 'lock')) {
    await scrollTo(u.start + 0.5 * u.span);
    // Layout offsets, as the kit measures (transforms ignored), vertical only: text still moving into place, or laid
    // out along a horizontal track that a camera pan travels, is not clipping.
    const clipped = await page.evaluate((id) => {
      const st = document.querySelector(`[data-scene="${CSS.escape(id)}"] > .story-stage`); if (!st) return [];
      return [...st.querySelectorAll('h1, h2, h3, h4, p, li, blockquote, figcaption, a, button')].filter((t) => {
        let y = 0, n = t; while (n && n !== st) { y += n.offsetTop; n = n.offsetParent; }
        return n === st && t.offsetWidth > 0 && (y < -1 || y + t.offsetHeight > st.clientHeight + 1);
      }).map((t) => (t.innerText || '').trim().slice(0, 30));
    }, u.id);
    if (clipped.length) add('FAIL', 'text-clipped', u.id, `At 200% text size the held stage cuts off ${clipped.slice(0, 3).map((t) => `"${t}"`).join(', ')} (WCAG 1.4.4). The kit rests a lock chapter whose words do not fit one screen; check what keeps this one live.`);
  }

  // R8 pause control, pressed: a second later the page must stand still, measured over the whole page. A loop that ignores the
  // control shows here only where it changes computed style (a canvas or a script loop is not seen), so this is a floor.
  if (await page.locator('button[data-story-pause]').count()) {
    await scrollTo(0);
    await checkerInput(() => page.locator('button[data-story-pause]').first().click());
    await wait(1000);
    const paused1 = await pageMotion();
    await wait(1000);
    const paused2 = await pageMotion();
    if (paused1.sig !== paused2.sig) add('FAIL', 'idle-motion', null, `Pressing the pause control did not stop motion: the page still changes in the second after the first second, across ${paused2.total} elements. Every ambient loop, CSS or script, must read the pause state.`);
  }

  // R13 again over the whole desktop pass. Audio that a scroll, a timer or a chapter starts must come after a trusted gesture; the
  // first watch covered only the fresh load. The entries after it are the desktop pass's own.
  const audioAll = await page.evaluate(() => window.__storyAudio2 || []);
  probes.audioEvents = audioAll.map((e) => `${e.kind}${e.gesture ? ' (after a gesture)' : ' (no gesture)'}`);
  const lateEarly = audioAll.slice(audio.length).filter((e) => !e.gesture);
  if (lateEarly.length) add('FAIL', 'audio-before-gesture', null, `Audio started during the desktop pass with no user gesture before it: ${[...new Set(lateEarly.map((e) => e.kind))].join('; ')} (${lateEarly.length} time(s)). Start sound only after a click or key press on a visible control, not on a scroll.`);
  // R13 audio controls. An element with no visible control that started by itself and may run past AUDIO_LONG_MS is a FAIL (WCAG
  // 1.4.2); any other element with none is a WARN.
  for (const a of dom.audio) {
    if (a.control) continue;
    const auto = audioAll.some((e) => e.media === a.full && !e.gesture && (e.dur === null || e.dur > cfg.AUDIO_LONG_MS || e.loop));
    if (auto) add('FAIL', 'audio-control', null, `An audio element (${a.src}) started by itself with no user gesture and may run past ${cfg.AUDIO_LONG_MS / 1000} s, with no visible mute or pause control. WCAG 1.4.2: give it a visible pause or stop control, or start it only after the visitor acts.`);
    else add('WARN', 'audio-control', null, `An audio element (${a.src}) has no visible mute or pause control. Give it native controls, or a visible mute button.`);
  }

  // ---------- reduced motion ----------
  // Reads the animations as they are, nothing finished first. A colour-only transition of COLOUR_MS or less passes; any other
  // animation that runs is a FAIL under reduced motion (motion-standards § 4.14, R1: nothing runs but colour changes).
  const reducedRead = (colourMs) => {
    const COLOUR = /color|fill|stroke|caret/;
    const out = [];
    for (const a of document.getAnimations()) {
      if (a.playState !== 'running' || !a.effect || !a.effect.target) continue;
      const t = a.effect.target;
      const raw = a instanceof CSSTransition ? [a.transitionProperty] : (a.effect.getKeyframes() || []).flatMap((k) => Object.keys(k).filter((n) => !['offset', 'easing', 'composite', 'computedOffset'].includes(n)));
      const names = [...new Set(raw.map((n) => String(n).replace(/-/g, '').toLowerCase()))];
      const ms = a.effect.getTiming().duration;
      if (names.length > 0 && names.every((n) => COLOUR.test(n)) && typeof ms === 'number' && ms <= colourMs) continue;
      out.push({ label: `${t.tagName.toLowerCase()} ${names.join('/') || a.animationName || 'animation'}`, unit: t.closest && t.closest('[data-scene]') ? t.closest('[data-scene]').getAttribute('data-scene') : null });
    }
    return out;
  };
  const seenAnim = new Set();
  const reportReduced = (rows, when) => {
    for (const r of rows) {
      const key = `${r.unit}|${r.label}`;
      if (seenAnim.has(key)) continue;
      seenAnim.add(key);
      add('FAIL', 'reduced-animating', r.unit, `${r.label} ${when}. Under prefers-reduced-motion nothing runs but colour changes of ${cfg.COLOUR_MS} ms or less: gate it on (prefers-reduced-motion: no-preference), or stop it.`);
    }
  };
  // R1: the reduced-motion reload, then REDUCED_WAIT_MS before the animations are read.
  await load(cfg.DESKTOP, true, cfg.REDUCED_WAIT_MS);
  const runningAnims = await page.evaluate(reducedRead, cfg.COLOUR_MS);
  reportReduced(runningAnims, `is still running ${cfg.REDUCED_WAIT_MS} ms into prefers-reduced-motion`);
  probes.reducedRunning = { fail: runningAnims.length, sample: runningAnims.slice(0, 4).map((x) => x.label) };

  // R1: no smoothing under reduced motion. A WHEEL px wheel from the top must have landed WHEEL_SETTLE_SHARE of its travel within
  // WHEEL_SETTLE_MS. Times are read in the page, from the first wheel event. Animations the wheel starts are read WHEEL_SETTLE_MS
  // after it, before anything finishes them.
  await scrollTo(0);
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  if (maxScroll >= cfg.WHEEL) {
    await page.evaluate(() => {
      const w = (window.__storyWheel = { t0: null, samples: [] });
      const start = performance.now();
      window.addEventListener('wheel', () => { if (w.t0 === null) w.t0 = performance.now(); }, { once: true, passive: true });
      const tick = () => { if (w.t0 !== null) w.samples.push([performance.now() - w.t0, scrollY]); if (performance.now() - start < 4000) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    const y0 = await page.evaluate(() => scrollY);
    await page.mouse.move(cfg.DESKTOP.width / 2, cfg.DESKTOP.height / 2);
    await page.mouse.wheel(0, cfg.WHEEL);
    await wait(cfg.WHEEL_SETTLE_MS);
    reportReduced(await page.evaluate(reducedRead, cfg.COLOUR_MS), `is still running ${cfg.WHEEL_SETTLE_MS} ms after a wheel scroll under prefers-reduced-motion`);
    await wait(1500);
    const w = await page.evaluate(() => window.__storyWheel);
    const end = await page.evaluate(() => scrollY);
    const travelled = end - y0;
    const at = w.samples.find(([t]) => t >= cfg.WHEEL_SETTLE_MS) || w.samples[w.samples.length - 1];
    const landed = at ? at[1] - y0 : 0;
    probes.reducedWheel = { travelled: Math.round(travelled), landedAtSettle: Math.round(landed), samples: w.samples.length, settleMs: cfg.WHEEL_SETTLE_MS };
    if (!w.samples.length || travelled < cfg.WHEEL * 0.5) add('FAIL', 'reduced-wheel', null, `A ${cfg.WHEEL}px wheel under prefers-reduced-motion moved the page ${Math.round(travelled)}px: the wheel is captured. Let the browser scroll natively.`);
    else if (landed < cfg.WHEEL_SETTLE_SHARE * travelled) add('FAIL', 'reduced-wheel', null, `Under prefers-reduced-motion a ${cfg.WHEEL}px wheel had moved ${Math.round(landed)} of ${Math.round(travelled)}px ${cfg.WHEEL_SETTLE_MS} ms after it (needs ${Math.round(cfg.WHEEL_SETTLE_SHARE * 100)}%): the page eases the scroll under reduced motion. Smoothing is off there; scroll the browser's way.`);
  }
  list = await units();
  for (const u of list.filter((x) => !x.run)) {
    if (u.live) add('FAIL', 'reduced-not-rest', u.id, 'Under prefers-reduced-motion it still runs. It shows its finished composition, with no hold.');
    // The scroll stop is read before anything is finished: an animation a scroll starts must not run under reduced motion.
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(u.top));
    await settle(true);
    await wait(cfg.SETTLE_MS);
    reportReduced(await page.evaluate(reducedRead, cfg.COLOUR_MS), 'is running after a scroll stop');
    await scrollTo(u.top);
    const r = await page.evaluate((id) => {
      const root = document.querySelector(`[data-scene="${CSS.escape(id)}"]`); const hidden = [];
      for (const el of root.querySelectorAll('h1, h2, h3, h4, p, blockquote, figcaption, li')) {
        if (!(el.innerText || '').trim()) continue;
        let o = 1, gone = false; for (let n = el; n && n !== document.documentElement; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.visibility === 'hidden' || cs.display === 'none') { gone = true; break; } o *= +cs.opacity; }
        if (gone || o < 0.99) hidden.push(el.innerText.trim().slice(0, 40));
      }
      return { hidden };
    }, u.id);
    if (r.hidden.length) add('FAIL', 'reduced-hidden', u.id, `Text not fully shown under reduced motion: ${r.hidden.slice(0, 3).map((t) => `"${t}"`).join(', ')}. The finished composition shows every word at full strength.`);
  }

  // ---------- phone width, and reflow at 320 ----------
  await load(cfg.PHONE, false);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) add('FAIL', 'phone-overflow', null, `The page scrolls sideways by ${overflow}px at ${cfg.PHONE.width}px.`);
  const phone = await units();
  for (const s of report) { const p = phone.find((c) => c.id === s.id); s.phone = p ? (p.live ? 'live' : 'rest') : 'missing'; }
  await load({ width: 320, height: 640 }, false);
  const reflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (reflow > 1) add('FAIL', 'reflow-320', null, `At 320px the page scrolls sideways by ${reflow}px (WCAG 1.4.10).`);

  await load(cfg.DESKTOP, false);
  const fails = findings.filter((f) => f.level === 'FAIL').length;
  const provenance = report.reduce((m, s) => { for (const [k, v] of Object.entries(s.provenance || {})) m[k] = (m[k] || 0) + v; return m; }, {});
  return { status: story ? (findings.length ? 'findings' : 'clean') : 'inconclusive', fails, warns: findings.length - fails, findings, probes, units: report,
    totals: { screens: +totalScreens.toFixed(1), moving: movers.size, provenance, stickyBlockers: blockers }, manual };
}

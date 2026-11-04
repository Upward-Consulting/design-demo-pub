# Story kit — zero-dependency React primitives for story pages

The kit lives in `src/design-system/story/`. It adds no dependency. It is dev-lane code until its first promotion; after that it is production code (resource set 8.11), changed only under the owner's go-ahead. Do not recopy the kit. Each family's `story.json` is at `src/design-system/story/<family>/story.json`.

```
timeline.ts        interpolate (clamped), local, ease by role, spring (pure shape), stagger, seeded, follow (frame-rate-independent lag)
motion.ts          windowOpen, layer (8% total range; 10% with background), inkFill, fan, strokeDraw, frameIndex, framesAround,
                   cameraPan, pushLine, scaleTo, lockedPx (1:1 pixel lock)
chapter.ts         the progress engine (useScrollProgress), ChapterContext / RunContext, useChapterProgress,
                   useRunProgress, useChapterMode, PHONE_QUERY, REDUCED_QUERY, storyVhPx, the dev-only window.__story
StoryChapter.tsx   one chapter: lock (held) or sync (scrubbed in passing); live or rest
StoryRun.tsx       consecutive chapters sharing a carrier layer (an object that crosses the seams)
SplitWords.tsx     scrubbed type: words as spans, the text read once by screen readers
Reveal.tsx         triggered entrances, for motion outside held chapters: rise, fade, focus, wipe
scramble.ts        scrambleText (pure, seeded), scrambleDuration, SCRAMBLE_MAX, SCRAMBLE_SET
Scramble.tsx       a triggered scrambled label, in a label element (span, a, button, label, small, strong, em, abbr or div),
                   40 characters or fewer; owner-ruled, default off
loop.ts            useVisibleLoop(ref): a muted video or CSS loop that plays only while in view; useAmbientPaused() for a
                   canvas, WebGL or requestAnimationFrame loop
pause.ts           motionStopped(), isMotionPaused(): the pause rule for script loops (plain TypeScript, no React)
gate.ts            useStoryGate({ maxMs, ready }): the arrival gate, at most 1.5 s, open at once under reduced motion, skipped
                   on a repeat visit
AmbientPause.tsx   the pause control for ambient motion (a real button, aria-pressed, html.story-paused; filled when pressed)
story.css          held stages, rest stages, the carrier layer, the CSS tier's view timeline (--story-chapter), the
                   reveals, the gate, ambient pausing, visible loops
templates          chapter.template.tsx (a story variant to copy), story.example.json (the chapter table)
```

## API

Exports are named; components live in `.tsx` files and hooks and helpers in `.ts` files (the react-refresh lint rule).
The numbers are the induction skill's motion-standards reference, § 5, and the citations below name the section each
rule comes from.

**timeline.ts**
- `follow(tauMs) => (current, target, dtMs) => next`: frame-rate-independent lag, k = 1 - exp(-dt / tau). `tauMs` 0 (or
  less) returns the target. Pure: the caller keeps `current` between frames. The kit's own default is 0; a story's tau comes
  from `story.json` (0.14 s recommended, 130-160 ms).
- `interpolate(p, input, output, { easing, clamp })`, `local(p, a, b)`, `clamp01(x)`, `cubicBezier(x1, y1, x2, y2)`,
  `ease` (`linear`, `arrive`, `settle`, `move`, `exit`), `spring(t, { damping })`, `stagger(i, count, from, to, share)`,
  `seeded(seed)` (a deterministic generator; never `Math.random`).

**motion.ts** (every function is a pure function of p)
- `layer(p, { rate = 1, travel, background = false })` returns a translateY in % of the element's height. `travel` is
  the layer's total range over its own height: the cap is 8%, and `background: true` raises it to 10% for a full-bleed
  background layer, an owner-ruled allowance that is off until the project rules it (motion-standards.md § 5.1, § 9.3).
  So the value spans ±travel/2 from p 0 to
  p 1. `travel` defaults to the cap (±4%, or ±5% with background). The cap bounds the returned value whatever the rate.
- `lockedPx(p, holdScreens, vh)` returns a translateY in px: `-holdScreens * vh * p`, a slope of -1.00 px per scroll px
  inside a lock stage of `holdScreens` screens (the 1:1 glyph ring). `vh` is the viewport height in px.
- `windowOpen`, `inkFill`, `fan`, `strokeDraw`, `frameIndex`, `framesAround`, `cameraPan`, `pushLine`, `scaleTo`: as
  documented in the file.

**chapter.ts**
- `useScrollProgress(ref, { id, live, model, weight, restAt, hold, onProgress })`. `weight` is the trailing layer's tau in
  seconds. The kit's default is 0, locked to the scroll: no smoothing unless the story asks. A story's `story.json`
  carries its ruled weight (0.14 s recommended for story pages). It is ignored on a coarse pointer (touch keeps its native
  momentum) and under `prefers-reduced-motion`, where the progress is locked to the scroll.
- `storyVhPx()`: the held stage's height in px, from `var(--story-vh)`. A lock chapter's span and its text-fit test use it,
  not `window.innerHeight`.
- `useChapterProgress`, `useRunProgress`, `useChapterMode`, `PHONE_QUERY`, `REDUCED_QUERY` (the same query as pause.ts's
  `REDUCED_MOTION_QUERY`), `ChapterContext`, `RunContext`.

**Reveal.tsx**
- `<Reveal kind="rise" | "fade" | "focus" | "wipe" index as className style>`. `wipe` keeps the element at full strength
  and uncovers it from the top edge (`clip-path` inset(0 0 100% 0) to none, 500 ms, ease-in-out). Once only; reduced
  motion shows the element as is. Never on running body text. rise, fade and focus run 0.8 s; each `index` step delays the
  entrance by `--story-stagger` (90 ms by default). The entrance-tail rule in the story check below sets how far `index`
  may go.

**scramble.ts** (labels only; the induction skill's motion-standards reference, § 4 and § 5)
- `SCRAMBLE_MAX = 40`: the longest label that scrambles.
- `SCRAMBLE_SET = '_/|<>*'`: the default glyphs.
- `scrambleDuration(text)`: the effect's length in ms, 300 + 30 (n - 1) for n characters (three shuffles of 100 ms, then
  the characters lock in order, 30 ms apart).
- `scrambleText(text, t, { seed = 1, set = SCRAMBLE_SET })`: the label at progress `t` in [0, 1]. `t` 0 is all glyphs, `t`
  1 is the text exactly. Pure and deterministic for a seed; spaces never scramble; a locked character never unlocks.

**Scramble.tsx**
- `<Scramble text as="span" seed set className style />`. `as` is a `ScrambleTag`: `'span' | 'a' | 'button' | 'label' |
  'small' | 'strong' | 'em' | 'abbr' | 'div'`. A label is never a body element, so `p`, `li`, `blockquote` and `h1`-`h6` do not
  type-check; a plain-JavaScript caller that passes one still gets it rendered, with a development warning, once per tag.
- The full label is in a visually hidden copy (the accessible name); the glyph layer is `aria-hidden`; the root carries
  `data-scramble`. It resolves once, when it first enters view (threshold 0.15, bottom 12% trimmed, as Reveal). Reduced
  motion, no JavaScript and a label over 40 characters show the final text at once; over 40 characters it throws in
  development.

**loop.ts**
- `useVisibleLoop(ref)`: a video (forced muted and inline) or a CSS loop plays only while at least 15% of it is in view,
  with a 120 px head start. It pauses off-screen, when the tab is hidden, when `html.story-paused` is set, and always
  under reduced motion (its first frame stays). The element carries `data-visible-loop`, and `data-in-view` while it runs.
- `useAmbientPaused() => boolean`: true while ambient motion must stop (the visitor pressed the page's pause control, or
  reduced motion is on). It applies the rule in pause.ts and re-renders when either input changes. A canvas, WebGL or
  requestAnimationFrame loop cannot be reached by story.css: it reads this hook and stops while it is true. The class it
  reads is `html.story-paused`. `AMBIENT_PAUSED` is re-exported from here for AmbientPause.

**pause.ts** (plain TypeScript, no React: the rule for script loops, unit-testable on its own)
- `AMBIENT_PAUSED = 'story-paused'`, `REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'`.
- `motionStopped(pausedClass, reducedMotion)`: the rule, as a pure function. Motion stops when either is true.
- `isMotionPaused()`: the same rule read from the page now (html.story-paused, or prefers-reduced-motion). For a loop that
  checks each frame, or one started outside React. False where there is no page.

**gate.ts**
- `useStoryGate({ maxMs = 1500, ready = false }) => boolean`: opens at the earliest of `ready` (a boolean, or a promise
  that settles; a rejection opens it too), `maxMs` (1500 ms at most; a larger value is clamped) and reduced motion (open at
  once), and returns true then. It sets `html.story-js` and, when open, `html.story-ready`; story.css holds `[data-gate]`
  elements until then, under motion that is welcome. A repeat visit in the same session skips the wait (sessionStorage in
  try/catch). The headline is never gated.

**AmbientPause.tsx**
- `<AmbientPause label="Pause motion" className style />`: a `<button type="button" aria-pressed data-story-pause>` that
  toggles `html.story-paused`. The pressed state is read from that class, so two controls agree; pressed, the button is
  filled (story.css). Every `[data-ambient]` loop pauses under the class and under reduced motion (story.css).

**story.css hooks**
- `[data-reveal]`, `[data-gate]`, `[data-ambient]`, `[data-visible-loop]` with `[data-in-view]`, `[data-story-pause]`, and the
  html classes `story-js`, `story-ready`, `story-paused`.
- The ease roles: `--story-ease-arrive`, `--story-ease-settle`, `--story-ease-move`, `--story-ease-exit`.

## Wire it up

1. Import `story.css` once, after the token file, from the story's variant file (or the route, after promotion). A demo's home imports it from the demo's own `demo.tsx`, after its `demo.css`, because a demo never imports the token file.
2. The family's `story.json` lives at `src/design-system/story/<family>/story.json`. A demo's home keeps a provisional `story.json` at `src/design-system/demos/<letter>/story.json` until the story run, when it moves to `src/design-system/story/<family>/story.json`. Chapters take their props from it:
   id, label, model, hold, phone, restAt, rests, textStill, and the family's `smoothing.weight` (passed as `weight`, the tau in seconds).
3. Check that no ancestor of a chapter sets `overflow: hidden | auto | scroll`, a transform, a filter, `contain` or
   `content-visibility`: each one breaks sticky. The story check lists the ancestors that do (`sticky-broken`).
4. The production build must not contain `__story`, the dev hook. The build check greps for it (`templates/<family>-story.md`, § 6, step 7).

## The rules a chapter keeps

- Every value is a function of p. Write styles to refs inside `useChapterProgress`; no setState per frame, no clocks,
  `seeded()` instead of `Math.random`, no state carried between frames.
- Moved elements carry `data-move`, so a stray `transition` from the app's CSS cannot lag them.
- Text lands by the start of its reading window and stays still until it ends. Pictures move; the words being read do
  not.
- The finished composition at `restAt` is complete on its own: every word at full strength, every picture placed. It
  is what reduced motion, the phone rest plan and the board show.
- Big moves stay inside the vestibular ceilings (`templates/<family>-story.md`, § 5, step 11).
- Ambient life (`data-ambient`, or a visible loop that runs without a scroll) sits on a page that has an `AmbientPause`,
  and stops under reduced motion (the induction skill's motion-standards reference, § 4.9).
- A script loop (a canvas, WebGL or requestAnimationFrame loop) stops while `useAmbientPaused()` is true (or, in a loop
  that is not React, while `isMotionPaused()` from pause.ts is true), and paints its still composition once when it is
  stopped, so a paused or reduced-motion visitor does not see a blank canvas. The story check cannot see canvas pixels
  (it reads computed styles and boxes), so a person checks that each script loop pauses: press the pause control, then set
  reduced motion and check it stops.
- A scrambled label is a label element (`ScrambleTag`: span, a, button, label, small, strong, em or div) of 40 characters or
  fewer, with its glyph layer `aria-hidden`. Body text and headings never scramble. Scrambling is an owner-ruled allowance,
  off until the owner rules it on.
- A story exit uses `var(--story-ease-exit)`, the kit's exit curve (the same as `ease.exit` in timeline.ts). Utility pages
  (not story pages) keep taste's leave curve (motion-standards.md § 5.2).
- A one-shot full-screen intro (a loader, or an opener that fills the screen once and then leaves) scales from 0.90 by
  default. It scales from 0.7 only by the owner's ruling for that intro.
- A picture taller than the viewport that moves vertically is judged by a person against the parallax limit (8% of its own
  height, 10% for a full-bleed `data-layer="background"`): the story check cannot measure its travel (see the check below).
- A video or CSS loop plays only in view (`useVisibleLoop`); nothing else autoplays.

## First view

The arrival is capped at 1.5 s. A loader or intro (the gate, or a story's own intro) must not hold the headline past 1.5 s;
that is the design cap. `useStoryGate` holds data-gate elements for at most 1500 ms, and the headline is never gated.

The story check measures the first view on a fresh load of a story page, against the same 1.5 s and a second, later limit:

- The h1 must be in the first viewport at opacity 0.5 or more. By 1.5 s it is not, the check WARNs (`first-view`). By
  2.5 s it is not, the check FAILs. The 2.5 s FAIL leaves room for a dev server's cold compile; the cap is 1.5 s.
- A wheel must move the page at both times. html or body with `overflow: hidden` at 1.5 s WARNs (`early-scroll-lock`), and
  a 400 px wheel that does not move the page at 1.5 s WARNs; at 2.5 s the same wheel FAILs.

## What the story check measures for these pieces

`snippets/story-check.run.js` (in the induction skill) is the authority for the check's behaviour. The numbers below are its
settings, and the rules name what the check says. A FAIL or WARN is a finding; the check's manual list is for a person.

- **Scramble** (`scramble`, FAIL): a `[data-scramble]` label over 40 characters; a glyph layer that is not `aria-hidden`;
  a scramble on a p, li, blockquote or heading. The `as` type rules out the last of these at compile time.
- **Entrances** (`entrance-tail`, WARN): a finite animation outside the live chapters still running 1.2 s after a scroll
  stop. With the default stagger, `index` 4 at most (4 × 90 ms + 0.8 s = 1.16 s).
- **Reduced motion** (`reduced-animating`, `reduced-not-rest`, `reduced-hidden`, `reduced-wheel`, FAIL): an animation still
  running 1.2 s into reduced motion, or running after a scroll stop or a wheel, fails; colour-only transitions of 200 ms or
  less pass. A live chapter under reduced motion fails. Text not fully shown under reduced motion fails. A 400 px wheel
  under reduced motion must land 90% of its travel within 150 ms.
- **Idle motion and the pause control** (`idle-motion`, FAIL): motion that changes across the page over 5 s with nobody
  scrolling, on a page with no `[data-story-pause]`. The pause control must be a `<button>`; pressed, the page must stand
  still between one and two seconds after the press. The check reads computed styles and boxes only, so a canvas or script loop that ignores the
  pause is not seen (see the rules a chapter keeps).
- **Canvas** (`canvas-alt`, WARN): a canvas with no `aria-hidden` (on it or an ancestor), no non-empty `aria-label`, and
  not a `role="img"` with `aria-labelledby`.
- **Focus** (`focus-hidden`, FAIL): a focusable element inside `aria-hidden` or `inert` content, or inside
  `visibility: hidden`. Also a focusable element inside a closed panel (an ancestor with `aria-expanded="false"`) that is
  hidden by opacity under 0.05, or by a transform that moves its box entirely off screen. A closed panel must be `inert`
  or `display: none`.
- **Vestibular** (`vestibular`, WARN or FAIL): a `data-object` turning more than 90° per screen (a 3D turn such as
  `rotateY` is read from the computed `matrix3d`, exact for one axis). A text element rotating more than 2° (FAIL when it
  covers 10% of the screen or more, WARN below that). A picture covering 25% of the screen or more: a scale change over
  the chapter above 0.10 WARNs and above 0.15 FAILs; a rotation over 12° WARNs.
- **Parallax** (`parallax`, WARN; `parallax-unmeasured`, WARN): a picture's vertical travel over its own height above 8%
  (10% for a full-bleed `data-layer="background"`; a background that does not cover the viewport width is held to 8%). The
  travel is counted only in the states where the picture is fully inside the viewport. With fewer than three such states,
  the check WARNs `parallax-unmeasured` and reports the travel. That WARN stands: a picture taller than the viewport is
  judged by a person against the limit, by hand.
- **Text over pictures** (`text-over-picture`, FAIL): contrast below 4.5:1 (3:1 for large text) against the pixels behind
  it, at p 0.5 and p 1.
- **First view** (`first-view`, `early-scroll-lock`): see First view above.
- **Holds and words**: `too-many-words` (WARN above 12 words held on a lock stage); `read-window` (WARN when text is visible
  and still for less than its words × 0.3 s ÷ 2 s per screen); `text-moves-while-read` (WARN when a text block changes while
  it is fully visible, or inside a declared `textStill` window).
- **Locks and length**: `consecutive-locks` (WARN above 3 lock chapters in a row); `length` (WARN for a hold over 3 screens,
  or a story over 14 screens); `scene-cap` (WARN above 3 lock chapters on the page); `transition-on-scrub` (FAIL when a CSS
  transition or clock animation runs on a scrubbed element inside a live chapter).
- **Text clipped** (`text-clipped`, FAIL): at 200% text size, a lock chapter cuts off its text.
- **Pictures**: `img-no-alt` (FAIL); `picture-floor` (FAIL below 4 own or found pictures); `provenance-unmarked` (WARN);
  `image-bytes` (WARN above 350 KB of images per chapter at desktop).

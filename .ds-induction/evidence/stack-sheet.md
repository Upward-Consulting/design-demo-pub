# Stack sheet (written by the lead after the probe, 2026-11-04)

**What this repo is.** Vite 8.3.5 + React 19.3 + TypeScript 7 (strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUncheckedIndexedAccess`, `noUnusedLocals`). No router, no styling library, no UI library. Dependencies: react, react-dom, **gsap** (owner-approved, for the Home opener). Plain CSS: one `demo.css` per demo. No git.

**Where things live.** Workbench `ds.html` (dev only). A demo is `src/design-system/demos/<L>/demo.tsx` (+ `demo.css`, pages and parts in the same folder). View one page: `http://127.0.0.1:5201/ds.html?view=demo&d=<L>&page=<key>` (page keys: home, products, corrosion, contact). The dev server on **5201** is the lead's: never start or stop it.

**Probe results (proved on the running page).**
- A candidate font loads with `@import url('https://fonts.googleapis.com/css2?...')` as the first line of `demo.css`. Young Serif and Source Serif 4 both reported `loaded` after `document.fonts.ready`. Use `document.fonts.ready` and check `status` before you trust a measurement.
- Demo tokens on `:root:has([data-demo='<L>'])` as `--d<l>-*` resolve on `:root` and in the demo (`getComputedStyle(document.documentElement).getPropertyValue('--dP-accent')` returned the value).
- The workbench loads `src/index.css` globally: reset `body` on the demo's pages (`body:has([data-demo='<L>']) { display:block; margin:0; min-width:0; place-items:normal; background:none }`) as `demo.template.css` does. The demo's `:root:has(...)` also sets the `html` background.
- Hover: a `:hover` rule with `transition: transform 200ms` works. A `max-width: 599px` media query applies at 390.
- Inline SVG icons work (the repo has no icon library: write small inline SVGs).
- Playwright's Chrome shows a 15 px classic scrollbar: `innerWidth - documentElement.clientWidth` = 15. Run `snippets/prep.run.js` before measuring, and mind that the 1440 viewport has 1425 px of layout.
- **GSAP + the story kit.** `import { gsap } from 'gsap'` and `import { ScrollTrigger } from 'gsap/ScrollTrigger'` bundle and run. Pattern that works and is measured: inside a `<StoryChapter model="lock" hold={1} phone="rest">` child, `useChapterProgress((p) => tl.progress(p))` where `tl = gsap.timeline({ paused: true })...` is created lazily in the first callback. At scroll = 0.5 viewport, `--p` was 0.5006 and the GSAP-driven box sat at x = 150.17 of 300. `ScrollTrigger` is not needed to drive the chapter (the kit does it); use it only for triggered reveals outside the chapter, and mark scrubbed elements `data-move`. A `lock` chapter with `hold={1}` is 2 screens tall in the layout (one held, one of travel).
- The kit's `chapter.template.tsx` was moved to `.ds-induction/evidence/templates/` (it does not typecheck in `src/`).
- `npx tsc --noEmit` passes on the scaffold with the kit and a probe demo.
- **The taste gate runs on this machine** (Node 26.8.1, Chrome at /usr/bin/google-chrome): about 15 s per run, writes `.ds-induction/taste/inspect-demo-<L>-<page>-<scope>/` and `gate.json`. At `component` scope the probe passed with 0 FAIL, 0 WARN.

**Traps.** (1) A `:has()` selector needs Chrome 105+; the owner reviews in Chrome. (2) `import x from './file.webp'` returns a URL string (Vite). (3) A CSS-var `--p` is linear; use the kit's `interpolate` or GSAP for eases. (4) Do not put a `transition` on an element the chapter scrubs: mark it `data-move`. (5) Every `img` needs `width`, `height`, `alt`, `data-provenance="own"`.

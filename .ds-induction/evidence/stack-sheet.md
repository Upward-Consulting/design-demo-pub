# Stack sheet: bellis-design-v1

Written by the lead, 2026-11-04. Written for: the demo builders and the lead.

## Stack

| Item | Version or fact |
|---|---|
| Bundler | Vite 8.3.5 (`npm run dev` on port 5191, strict) |
| UI | React 19.3.1, react-dom 19.3.1 |
| Language | TypeScript (`npm run typecheck`, `tsc --noEmit`) |
| React plugin | @vitejs/plugin-react 6.2.1 |
| Styling | Plain CSS only. No Tailwind, no CSS Modules, no CSS-in-JS, no UI library |
| Icons | None installed. Use inline SVG or the client's tiles (300 × 300 PNG, show at 120 px or less) |
| Motion | CSS only. No motion library |
| Routing | None in production yet. Demo pages switch by query string in the workbench |
| Fonts | Google Fonts through `@import` at the top of a demo's own `demo.css` (workbench only) |

## Workbench

- `ds.html` at the project root is the dev-only entry. Vite builds only `index.html`, so the workbench never reaches the production bundle.
- `src/design-system/workbench/main.tsx` loads each demo lazily with `import.meta.glob('../demos/*/demo.tsx')`.
- URLs:
  - `/ds.html?view=demo&d=<letter>&page=<home|products|contact>`
  - `/ds.html?view=demos&page=<key>` (lead and owner only)
- The workbench loads `workbench.css` (furniture) and nothing global. A demo resets `body` on its own pages, under `body:has([data-demo='<letter>'])`.

## Traps and findings

- **Demo tokens.** `--d<letter>-*` values go on `:root:has([data-demo='<letter>'])`. `:has()` needs Chrome 105+, Safari 15.4+, Firefox 121+. Review browser: Chrome.
- **Image imports.** Pictures are imported in `src/design-system/content/demo-copy.ts` and shared by every demo. Give every `<img>` its `width`, `height` and `alt` from `pictures`.
- **Logo.** The client logo is 331 × 150 px WebP. Show it at 160 px wide or less (about 2x for a retina screen). A vector master is still needed from the client.
- **Probe.** The full probe (one variant per trap) was not run. This stack has no utility classes, CSS Modules or theme object, so the Tailwind and CSS-Module traps do not apply. The dev-versus-build CSS-order check is part of the lead's verification, not the demos.
- **Dev-only strings.** `[placeholder]` text is visible on purpose. The production build must not contain it.

## Checks

- Typecheck at the start: `npx tsc --noEmit` passes with no demos (exit 0).
- Dev server: `curl http://localhost:5191/ds.html` returns 200 (checked).
- Taste gate: `snippets/taste-gate.mjs` runs under `.ds-induction/taste/profile.json` (proposed, adopt all). Chrome at `/usr/bin/google-chrome`.

# Demo brief: Bellis Australia website, demo round

Written for: the three demo builders (A, B, C) and the lead. Lead-owned; do not edit.

## The job

Build one working demo site in the direction your sheet names. The owner will compare three demos on a desktop and a phone and approve one, or ask for changes. Each demo is a proposal, not the product: it is built fast, with its own tokens and no component contract. It must still be judged at full fidelity.

Your sheet is `.ds-induction/taste/demos/<letter>/direction.json`. It is authoritative for palette, type pair, composition, hero blueprint and the blueprints for the section roles on each page. Read it first. Write any deviation, and its reason, in your report.

## The client and the subject

- **Bellis Australia**: a Brisbane-headquartered industrial mechanical insulation distributor and fabricator. Five branches: Brisbane (head office, Coopers Plains), Gladstone, Melbourne (Epping), Darwin, Perth.
- It supplies thermal, cryogenic, acoustic and fire insulation materials; makes custom sheet-metal cladding, jackets and removable covers; and runs installation, shutdown and maintenance, corrosion-under-insulation (CUI) remediation, estimating, procurement and labour hire.
- Customers: oil and gas and LNG, power generation, mining and minerals, marine and defence, and commercial kitchens and plant.
- **Audience:** engineers and specifiers, maintenance and shutdown planners, procurement managers, site supervisors.
- **Their jobs:** find the right material for a temperature, corrosion, fire or noise problem; get a quote quickly; find a local branch; check safety and quality credentials.
- **The action:** "Talk to an expert". Phone 1300 740 564; email sales@bellis.com.au. The primary action must be the most visible thing on every screen.
- **Voice:** plain, technical, confident, safety first. Adjectives: practical, precise, dependable, candid. Never: flashy, playful, luxury, generic start-up, stock-photo corporate.
- **Brand:** the logo is a blue quarter-arc "b" beside a heavy black "Bellis" wordmark. The site's blues are about #2EA3F2 (bright), #036AAA (deep), #275787 (navy); its ink is #333333 and its grey #666666. The current face is Open Sans. The dossier advises keeping the logo's blue as the accent. Where the sheet's palette can carry that blue, use it as the action colour. Where it cannot, say so in your report; the owner decides.

## Pages (keys are fixed)

| Key | Route | What it must show |
|---|---|---|
| `home` | `?view=demo&d=<letter>&page=home` | Header with nav; hero (eyebrow, headline, lede, primary action, one hero picture); the five jobs (`copy.home.jobs`); the product ranges (`copy.productRanges`, with product pictures or tiles); the services (`copy.services`, with service pictures); named projects (`copy.home.proofGroups`); quality line (`copy.home.certBody`); closing call to action; footer |
| `products` | `?view=demo&d=<letter>&page=products` | The product range on dense real content: all 11 ranges with their lines and uses (`copy.productRanges`); "find by problem" (`copy.products.problems`); the stock placeholder; product pictures; a path to contact |
| `contact` | `?view=demo&d=<letter>&page=contact` | "Talk to an expert" (`copy.contactPage`): the form (name, company, email, phone, nearest branch, need, message) with validation and an error state, a success state that sends nothing; the five branches with addresses and `copy.contact.branchPhone` placeholders; the phone and email |

Every page: one `h1`, a header with `nav`, a `main`, a footer, and the same chrome (nav, mobile menu, footer). The chrome is demo-local.

## Copy and pictures

- Use only `src/design-system/content/demo-copy.ts` (`copy`, `pictures`). Import them; never edit them. If a word is missing, ask the lead in your report, or use the `[placeholder]` the deck already carries.
- Plain functional labels (Name, Email, Submit, Menu) are fine. No new numbers, claims, awards, testimonials or logos. Client names come only from `copy.home.proofGroups`.
- No sample details are needed for this site. Do not invent room names, prices or certificates.
- Pictures: use the `pictures` map. Each `<img>` has its `width`, `height` and `alt`. Wrap each picture in an element with `data-provenance="own"`. A picture you cannot use is a labelled `div` with `data-placeholder`, never an `img`.
- The tiles in `src/design-system/assets/own/tiles/` are 300 × 300 icons. Show them at 120 px or less.

## Technical rules

- **Your folder only:** `src/design-system/demos/<letter>/`. It holds `demo.tsx` (default export: `{ letter, name, pages: { home, products, contact } }`, typed with `DemoModule` from `../../workbench/main`), your pages and parts, and `demo.css`.
- Imports allowed: React, the copy deck, your own files. Do not import another demo, the workbench internals beyond the `DemoModule` type, or any production component. There is no token file and no production component yet.
- **Tokens:** every candidate token is `--d<letter>-*`, declared on `:root:has([data-demo='<letter>'])` in `demo.css`. No raw colour values in components except through those tokens.
- **Roots:** each page's root element is `<div data-demo="<letter>" data-ds="demo <letter> <key>">`.
- **Fonts:** load the sheet's faces with `@import url(...)` at the top of `demo.css`. Convert the sheet's `<link>` tags to that form.
- **No new dependencies.** No CSS framework. No install. The dev server is already running; do not start or stop it.
- **Responsive:** 1440, 820 and 390 px wide, with no sideways scroll at 390. The primary action is visible on the first screen at 1440 and 390.
- **Accessibility:** one `h1` per page; landmarks; alt text; visible `:focus-visible` on every control; body text at least 4.5:1 contrast, large text 3:1; the mobile menu opens and closes by keyboard, Escape closes it and returns focus to its trigger; closed links are not focusable.
- **Motion (CSS only):** hover 200 ms; entrances 600–800 ms, 12–24 px travel, once; the mobile menu 500–800 ms open and 250 ms close (`motion-standards.md` § 3). Reduced motion: no movement, colour changes kept. At most one moving picture per page. Motion must not hide above-the-fold content.
- **Links between pages:** `?view=demo&d=<letter>&page=<key>`.

## Checks before you report (demo-proposals.md § 6)

1. **Craft lint** on each page at 1440 and 390 (`taste/` lint and `snippets/craft-lint.js`, as in `references/craft-rules.md`).
2. **Taste gate** on each page, from the design-v1 folder:
   `node <skill>/snippets/taste-gate.mjs "http://localhost:5191/ds.html?view=demo&d=<letter>&page=<key>" --scope page --label demo-<letter>-<key>`
   The profile is `.ds-induction/taste/profile.json` (proposed, adopt all). Fix every FAIL. A WARN stays only with one sentence a designer would accept. Exit 3 means the profile is not adopted, so report it as not run.
3. **One look round** on each page's screenshots, using `taste/references/critique.md`. Fix the top three findings. Record the scores.
4. **Console clean** on each page. No sideways scroll at 390. Keyboard through the header, the mobile menu and the form.
5. **Screenshots**, full page, at 1440 and 390, into `.ds-induction/evidence/demos/<letter>/<key>-1440.png` and `<key>-390.png`.

## Reporting

Write `.ds-induction/evidence/reports/demos/<letter>.json` with:
- pages built, with their URLs;
- the gate result per page: exit code, FAIL and WARN counts, and rule ids;
- the look round: scores, and the top three fixes;
- the pictures used, by `pictures` key, and any placeholder slots;
- deviations from the sheet, each with its reason;
- what is still rough;
- console errors, if any;
- the screenshot paths.

Then reply to the lead in under 200 words: the pages, the gate result, the three biggest visual judgements, and any problem the lead must fix.

## Ports and sharing

- Dev server: `http://localhost:5191` (started by the lead).
- Playwright: builder A uses the `mcp__playwright-8931__*` tools, builder B the `mcp__playwright-8932__*` tools, builder C the `mcp__playwright__*` tools. Use only your own port.
- Do not open `?view=demos`. Do not edit another demo, `demo-copy.ts`, `workbench/`, `ds.html`, `package.json` or the profile. Ask the lead for a shared change.
- No git, no installs, no commits. Delete your scratch files when done.

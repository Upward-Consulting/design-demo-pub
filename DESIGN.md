# Bellis Australia: website design v6, "Operating range"

Written for: the owner and the design team, to review the concept and close the open items before build-out.

## The idea

Every Bellis job is defined by its operating range: the temperature the plant runs at, the corrosion it has to fight, the fire and noise it must hold, and the access it needs for inspection. The site is organised the same way.

- **Problem first, sector second.** The home page asks what the plant has to do (hold temperature, stop corrosion, hold back fire, bring noise down, open for access, keep people off hot surfaces) and only then names the sectors.
- **The temperature line.** One graphic device: a thin gradient from cold blue to ember. It sits under the header, closes the hero, marks the pipeline, and runs through every page footer. Colour carries meaning: blue is cold and cryogenic, ember is hot, red is fire, teal is acoustic, and graphite is everything else.
- **Drawing-sheet vocabulary.** Images carry registration-style corner ticks. Tables are hairline grids, not cards. Inner pages open with a short blue dash instead of an eyebrow label; the home page keeps its numbered eyebrows. The look is an engineering document, which is how the buyers read.
- **One supplier, one run.** The four-step pipeline (estimate, supply, fabricate, install and maintain) is drawn as one pipe run, to show the bundling that the company sells.

Audience: engineers and specifiers, maintenance and shutdown planners, procurement managers and site supervisors in heavy industry. Secondary: commercial kitchen and building contractors, and marine and defence buyers.

## Decisions taken without the owner (review these)

| # | Decision | Why | Easy to reverse? |
|---|---|---|---|
| 1 | The public site does not mention the SPI acquisition. | The profile says the bellis.com.au site does not mention it, and the announcement date and terms are unconfirmed. | Yes, one footer line. |
| 2 | Typeface changed from Open Sans to IBM Plex Sans, Sans Condensed and Mono. | The condensed display face and the mono labels suit the drawing-sheet idea. Open Sans is the current face. | Yes, tokens only. |
| 3 | The logo is used as supplied (331 × 150 WebP), not redrawn. | Redrawing a trademark is for the client. The profile asks for a vector master. | Replace the file when the master arrives. |
| 4 | Stock imagery is excluded: the globe-and-boxes procurement image, the seedling "environmental" image, the calculator icon and the 300 px circle tiles. | The first three read as generic stock. The tiles are 300 px and go soft at the sizes used here. | Yes. |
| 5 | Conflicting years are not shown. "35 years" and "30 years" are dropped. "Since 1981" is used. | The site says 35 years, 30 years and since 1981 on different pages, and the 35-year claim does not reconcile with 1981. The profile lists 1972 and 1982 in directories, unverified. | Confirm the founding date. |
| 6 | "Incitec Pivot" is spelled correctly. The site has "Incetec". | Typo on the live site. | Confirm the client's name. |
| 7 | Health and safety certification is a placeholder. Only ISO 9001:2015 is shown as stated. | The site cites OHSAS 18001:2007 and AS/NZS 4801:2001, which are superseded. Showing them as current would be wrong. | Needs the current certificate. |
| 8 | The enquiry form is visual only. It does not submit. | No enquiry handler exists in the repo. | Wire it before launch. |
| 9 | Branch direct lines and the Melbourne street address are placeholders. | Not in the profile. The profile says the contact page lists five city numbers, but the numbers themselves were not captured. | Needs the client. |
| 10 | Client names on the references page come from the site's public text. Logos are not used. | Logos are other companies' trademarks, and the profile excludes them. The names are on the public site, but permission to name them should be confirmed. | Confirm permission per client. |

## Placeholders to close before launch

Every item below is highlighted in yellow on the page where it appears.

- Direct line for each of the five branches; the Melbourne street address.
- Health and safety certified standard, and ISO 9001 certificate number and scope.
- Client permission to name each reference; one case study with scope, year, material and outcome (the template is on the References page).
- The full Quick Look index (about 90 lines). The product list in `src/content/products.ts` is a working sample of 61 lines.
- Social media URLs (Facebook, X).
- Vector logo master (SVG, AI or EPS).
- Licensed high-resolution photography. Several images are 980 px or smaller; `aspen-aerogel-pyrogel-hps.webp` is 400 px and `perlite` (320 px) and `marine-bulkhead-insulation` (240 px) were left out.
- Whether the public site should mention the SPI group, and whether SPI's brand rules apply.
- Enquiry handler for the contact form.

## Stack

- Vite 8, React 19, TypeScript 5 (strict), React Router 7. These are the only dependencies added, and they came from `npm install` in this folder.
- Plain CSS with custom properties in `src/styles/`. No Tailwind, no CSS-in-JS, no icon library (icons are inline SVG in `src/components/Icons.tsx`).
- Fonts load from Google Fonts with system fallbacks.
- Dev server: `npm run dev` on port 5181 (strict). Preview: port 5182.
- Scripts: `npm run typecheck`, `npm run build`.

## Tokens (`src/styles/tokens.css`)

- **Ink:** `--ink #0f1b26`, `--ink-2 #33414f`, `--ink-3 #56636f`.
- **Brand blue and navy:** `--blue #036aaa` (the brand's observed blue), `--blue-press #02568c`, `--navy #0b2a44` (the brand's #275787 taken darker), `--sky #2ea3f2`.
- **Signal colours:** `--ember #b8400a` (hot), `--red #a8271c` (fire), `--teal #0d6e67` (acoustic), `--graphite #414c57` (other). Each has a tint for tag backgrounds.
- **Paper:** `--paper #ffffff`, `--paper-2 #f2f5f7`, `--paper-3 #e3e9ee`, lines `--line #d3dbe2` and `--line-strong #8d9ba8`.
- **Highlight:** `--ph-tint #fff1b8` marks placeholders. `--hivis #f2b705` is the focus colour on dark surfaces.
- **Temperature line:** `--cold-grad` (horizontal) and `--cold-grad-v` (vertical).
- **Type:** condensed for display (`h1` at a fluid 44–88 px, `h2` at 34–54 px), sans for text at 17 px (16 px on phones), mono for labels, tags, phone numbers and data.
- **Space:** 4 px base scale, `--space-1` to `--space-9`.
- **Layout:** `--wrap` is min(1200 px, 100% − 32 px), which gives a 16 px gutter on phones. Radius is 2 px. Motion uses one ease curve and respects reduced motion.

Contrast: body and ink text on white are above 4.5:1. Blue, ember, red and teal text on white are each above 4.5:1 (checked by hand from the token values, not by a tool).

## Components (`src/components/`)

- `SiteHeader`: sticky, with the temperature line under it. Six links, phone and CTA on wide screens; a full-screen menu below 1180 px.
- `SiteFooter`: four columns (products, services, company, contact) and a base line with the prototype note.
- `primitives.tsx`: `TempLine`, `Dash` (blue rule that opens inner-page headings), `Eyebrow` (home page only), `ButtonLink` (primary, secondary, dark-ghost), `Tag` (cold, hot, fire, acoustic, other), `Figure` (with corner ticks), `Ph` (highlighted placeholder).
- `Icons.tsx`: 9 inline SVG icons.

## Pages (`src/pages/`)

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero; branch strip; six problem tiles; four-step pipeline; corrosion feature; four sector cards; product preview; navy contact band. |
| `/products` | Quick Look index | Problem filter chips, search (matches name, note, category and problem), colour key, 61-line working list. Filters are in the URL, so they can be shared. |
| `/services` | Services index | Five-stage job rail; nine service cards. |
| `/services/:slug` | Service detail | Offers checklist, callout, related product lines, other services. Nine slugs from `src/content/services.ts`. |
| `/fabrication` | Fabrication | Spec table of seven capabilities; workshops in Brisbane and Gladstone. |
| `/references` | References | Four sectors from the profile; a case-study template with highlighted fields. |
| `/about` | About | Mission, three commitments, six values, certification panel with placeholders. |
| `/contact` | Contact | Phone and email, a five-branch run diagram (ordered west to east), enquiry form (product prefill from `?product=`), branch cards. |
| `*` | Not found | |

## Verification (this session)

Checked on the running dev server, in Chromium through Playwright (desktop at 1440 × 900 on port 8933; mobile at 390 × 844 on port 8934):

- Typecheck (`tsc --noEmit`) passes. Production build (`vite build`) passes.
- Console: zero errors and zero warnings across all eleven routes, in both the desktop and the mobile session.
- Overflow: no page-level horizontal overflow on any of the eleven routes at 1440 px or at 390 px. One group sits past the phone edge by design: the filter chips on mobile `/products` are in their own horizontal scroll row.
- Tap targets: before the last change, 68 controls on mobile `/products` were under 44 px (Enquire buttons and chips). After raising them to 44 px, `/products` shows none. Every other route showed none before the change. Footer links are 36 px: WCAG 2.2 AA (24 px) is met, AAA (44 px) is not.
- IBM Plex faces load from Google Fonts.
- Mobile menu opens, sets `aria-expanded`, and its links are 56 px tall.
- Visual review: desktop full-page captures of home, products and the corrosion service were read. The mobile full-page capture was too small to judge detail, so the mobile layout rests on the measurements above and one viewport capture of the open menu.
- Screenshots are in `.ds-induction/evidence/shots/` (home-1440, home-390, products-1440, service-corrosion-1440, mobile-menu-390).

Not verified: the visual balance of every mobile page (the full-page phone capture was too small to judge detail, so spacing was checked by measurement, not by eye); a real keyboard walk-through; screen-reader output; any browser other than Chromium.

## What was not done

This design is a single direction, built from scratch as requested. It did not go through the full `react-design-system-induction` ceremony: no demo proposals with competing directions, no owner rulings on a taste profile, no taste gate or story mode, no image-worker pictures, and no UI skill. Those are the next steps if the owner wants the design turned into a maintained system.

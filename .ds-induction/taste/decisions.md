# Decisions (owner rulings, in their words)

## 2026-11-04, round 1
- **Brief:** "mostly correct, but the brand now needs a shake up, so we want to give them some refreshing design that are stunning". → Palette and type are reopened; the design may depart from the old blue-and-grey Divi look. The logo stays as supplied. Tone passed to the draw: `bold`.
- **Depth:** "demo now, once demo approved, we will move onto full site". → Phase 5 only now: demos built and reviewed; stop for the owner's ruling. Token file, components and routes wait for approval.
- **Taste rules:** "adopt necessary ones and ones that don't go against our initiative that is to create a stunning refreshed design". → `adopted: all`; a device a dealt direction needs is allowed provisionally per demo and listed in the review for the owner to rule on.
- **Page modes:** "Utility pages, Home takes a story opener". → `page`: home, products, corrosion-control, contact. Opener on Home only, one chapter, one screen at most, primary action visible at p = 0. Own pictures only (generated pictures not allowed, since the owner did not choose that option).

## 2026-11-04, round 2
- **Directions to build:** "Engineer's report (Recommended), Hi-vis poster (Recommended)". → Demo A = `editorial-report` (seed 103), Demo B = `loud-flat-poster` (seed 101). Dropped: borrowed-category, specimen-catalogue (not chosen), hero-object, pinned-poster, dense-tiles (dropped on evidence).
- **Count and pages:** "2 demos x 4 pages". → Home (with story opener), Products, Corrosion control, Contact; the same keys in both demos. Ports: A on 8931, B on 8932; the lead stays off both during the build.
- **Opener runtime:** "GSAP and ScrollTrigger". → New dependency `gsap` (includes ScrollTrigger), recorded as approved by this choice. The kit's markup contract still holds (`useChapterProgress` drives a paused GSAP timeline with `tl.progress(p)`), so the story check measures it. Round A2 defaults stand: scroll weight none, scene cap 3 (the opener is one), gallery devices banned unless a direction's allowance is shown at review, sound off.
- **Install:** "Yes, npm install (Recommended)". → react, react-dom, vite, @vitejs/plugin-react, typescript, @types/react, @types/react-dom, plus `gsap`. No router, motion or UI library.

## Standing items
- Working branch: there is no git repository here. Work in place; every file created is listed in `.ds-induction/evidence/file-list.md`.
- Open client questions (from the dossier): SPI ownership (not shown on the site); current certifications (OHSAS 18001 is superseded by ISO 45001); a vector logo; "since 1981" versus the "30" and "35 years" claims; named sites need the client's confirmation.

## 2026-11-04, after demo A was built
- **Demo A dropped:** "design A is shit, drop it, try the other". → Demo A (`editorial-report`) is `Not chosen (2026-11-04)`. Its folder (`src/design-system/demos/A/`), screenshots and report stay as evidence; deleting them is the owner's call at the handoff. The independent review of A was stopped. Demo B (`loud-flat-poster`) is the one that continues.
- **Builder agents:** "use haiku 5.5 xhigh as the builder agent". → From here every builder agent is spawned with model Haiku 5.5 at effort xhigh. Demo B's first build was already running on the session model when this ruling came, so it is finished, not discarded; every revision pass on B runs on Haiku 5.5 xhigh. Reviewers and verifiers are not builders and keep the session model.
- Pictures judged by the owner so far: the client's own (no generated, found or placeholder pictures).

## 2026-11-04, demo ruling (after the review sheet)
- **Demo B:** "Approve B as it is". → B is `Approved (2026-11-04)` and frozen: later changes go into the system, never back into the demo. No grafts. Pictures judged: the client's own.
- **Palette:** "Keep the dealt palette". → Candy chapters (yellow `#ffd249`, white, pink `#ffc4ef`, cyan `#a4f6f8`, orange `#f9a21f`, black `#0a0a0a`, magenta `#f53fd6` on buttons only) is the system palette. The narrow and reopen options were not chosen.
- **Opener:** "make a home v2 where this is addressed so I can compare side by side". → Home v2 is built as a revision, demo `B2` (a copy of B with only the Home opener changed; `B` stays untouched). The addressed warnings: the held stage's 30 words against the 12-word cap, and the 0.14-screen read windows. The owner compares B's Home and B2's Home in `?view=demos&page=home` and rules; until then the opener allowance question stays open.
- Builder model (standing): Haiku 5.5 at xhigh for all builders ([[feedback-bellis-builder-model]]).

## 2026-11-04, go-aheads for the full site (owner's answers)
- **Token file:** "Not yet". → `src/styles/tokens.css` is NOT written. The proposal stays at `.ds-induction/evidence/token-proposal.md`; the lift needs its own go-ahead later.
- **Real routes:** "not yet still waiting for client approval". → No production files: no routes, components, global CSS, `index.html` or app shell. Work stays in the dev lane (`src/design-system/`, `ds.html`, evidence). No standing approval is recorded.
- **Site scope (for when approval comes):** "Corporate site plus family pages" = 26 pages: Home, Products, Corrosion control, Contact, About, Oil gas and energy, Mining and resources, Marine and defence, Commercial, Sheet-metal fabrication, Manufactured products, Estimating and procurement, Maintenance and shutdowns, a Services index, a 404, and one page for each of the eleven product families. No Blog (no invented content).
- **Component depth (for when approval comes):** "Site first, docs later". → Clean components and the pages built from demo B; no Candidate Board variants and no UI skill unless the owner asks later.
- Open until the owner rules: Home v1 (B) or Home v2 (B2) for the system; the opener allowance question applies to v1 only.

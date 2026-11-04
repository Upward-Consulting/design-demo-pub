# Demo review sheet (2026-11-04)

Dev server (running, left up for your review): http://127.0.0.1:5201 . Open in Chrome (the demos use `:has()`, Chrome 105+). Phone: Chrome DevTools device mode at 390 × 844, or start the server with `--host` and use a phone on the same network.

| Demo | Direction | Status |
|---|---|---|
| A | editorial-report ("The printed annual") | **Not chosen (2026-11-04)**: owner: "design A is shit, drop it". Files kept as evidence until you decide. |
| **B** | loud-flat-poster ("Loud and flat") | **Proposed**, revision 1 (rebuilt by Haiku 5.5 xhigh after an independent review) |

## Demo B: the hi-vis poster

**Pages (live):**
- Home (opener live): http://127.0.0.1:5201/ds.html?view=demo&d=B&page=home  (finished composition: add `&still=1`)
- Products: http://127.0.0.1:5201/ds.html?view=demo&d=B&page=products
- Corrosion control: http://127.0.0.1:5201/ds.html?view=demo&d=B&page=corrosion
- Contact: http://127.0.0.1:5201/ds.html?view=demo&d=B&page=contact
- Comparison view (A is shown with its status): http://127.0.0.1:5201/ds.html?view=demos

**Idea, for this client:** the hi-vis vest every Bellis crew wears becomes the poster's ground: flat safety-yellow and black, blunt statements at full volume, product cut-outs stuck on at a tilt. Inventory items 9, 8, 4.

**What it does well:** the first screen. A lowercase Red Hat Display 900 headline at 11vw spans 80% of the width on two lines, the "Talk to an expert" button and phone number sit under it, a tilted crew photograph carries a Rockwool cut-out, and the five jobs ("too hot to touch" to "too wet to last") land one at a time as you scroll, with the headline and button held still. Inner pages carry the same language: huge lowercase headings, colour-field panels, bold black slips for materials and lines, a six-button job filter on Products, three step bands on Corrosion control, a validated enquiry form on Contact.

**Look-round scores (evidence, not a verdict).** Independent blind jurors on the first build: Home 5.8, Products 6.4, Corrosion 6.85, Contact 6.8 at 1440; about 5.2 at 390. The Haiku builder's own scores for the revision: Home 6.8, Products 6.9, Corrosion 7.15, Contact 6.2. **No page reaches 7.5 on those scores.** My own read of the screenshots: coherent and loud, clearly different from the old site, not yet "stunning" on every page: body text on the colour panels is small beside the huge headings, some panels are still more than half empty ground, and a few pictures sit on the wrong page (the valve photograph illustrates "paint").

**Checks I re-ran myself on the revision (not taken from the report):**
- Typecheck clean; console clean (0 errors, 0 warnings) on all four pages.
- Taste gate at page scope, 0 FAIL: Home 4 WARN (card-rows, size-count, no-footage, blank-gap), Products 4 (size-count, no-footage, lopsided, blank-gap), Corrosion 2, Contact 3, Home opener scope 2. Same numbers as the builder's report. The no-footage WARN is defended: the client has no footage and you ruled own pictures only.
- 16 page × width combinations (1440, 820, 390, 320): no sideways scroll, one h1, every image has alt, nothing below the fold loads eagerly.
- Home opener at seven viewports (1280×720 to 1920×1080, 820, 390, 320): the statements never touch the headline or the action.
- Keyboard: the open mobile menu keeps focus inside and Tab wraps; Escape returns focus to Menu; the closed menu's links are never tabbed into. Filter: each of the six jobs narrows the list and announces its count. Form: an empty submit moves focus to the error summary and marks six fields invalid. Reduced motion: no running animations, no blank sections.
- Story check (builder's run, not repeated): 7 FAIL + 8 WARN. The 7 FAILs are the check flagging the closed menu's links under `inert`; I confirmed by keyboard that focus cannot enter them, so they are a checker false positive. The WARNs are real owner questions (below).

**Rulings on skill conflicts I made so you do not have to:** the closed menu is hidden with `inert` plus `visibility`, not `display:none`, because the motion standard forbids `display:none` for navigation. The opener's JS budget is the profile's 60 KB gzip (the extra weight is GSAP, which you approved); no production build has been measured yet.

**What it costs to build as a full system:** two free Google faces (Red Hat Display and Red Hat Text, OFL licence; loaded from Google Fonts in the demo, a licence and hosting choice for production); GSAP for the opener only; cut-outs of three white-background product shots that the lead derived (a product-photo request to the client would be better); the client's photographs are small (the largest is 1920 px wide), so full-bleed pictures need originals.

**Still rough (builder and reviewers):** first-screen images about 1.33 MB before the cut-outs were re-encoded (they are now about 113 KB together, so re-measure at the next build); product pictures repeat on one page; Home blank-gap WARN at 768 and Products at 1440 not resolved; scene sheets, motion trace and hover probe were not re-run after the final changes; one look round only. The old "five branches, one phone number" line was a contradiction in the copy deck and is now "one main line".

**Client questions that block launch, not the design:** branch phone numbers, Melbourne street address, legal line and ABN, current certifications, a vector logo, confirmation of the named sites and of "since 1981" against the site's "30" and "35 years".

**Owner questions in this round:** the ruling on B; the opener's 30 words (the check's cap is 12); the candy palette against heavy-industry credibility.

## Home v2 (demo B2): the opener revision you asked for (2026-11-04)

**Compare side by side:** http://127.0.0.1:5201/ds.html?view=demos&page=home (B and B2 are shown with A, which is marked Not chosen). Live: B Home http://127.0.0.1:5201/ds.html?view=demo&d=B&page=home · B2 Home http://127.0.0.1:5201/ds.html?view=demo&d=B2&page=home (add `&still=1` for the finished composition). B2's other three pages are copies of B's and render the same.

**What changed (Home only):** the held opener now carries **4 words** (the headline) instead of 30, and **no text arrives while it is held**. Its motion is pictures only: the crew photograph rises, and five stickers land one per job, in order (Rockwool for temperature, already on the collage at the first frame; then Foamglas for cold, acoustic foam for noise, Pyrogel for fire, the rusted flange for corrosion). The five blunt statements ("too hot to touch" to "too wet to last") move out of the stage and follow as five flat colour fields with line-mask reveals, then the payoff.

| Measure | B Home | B2 Home |
|---|---|---|
| Words on the held stage | 30 (cap 12) | 4 |
| story check `too-many-words` | 1 WARN | 0 (builder's run) |
| story check `read-window` | 6 WARN | 0 (builder's run) |
| story check `text-moves-while-read` | 1 WARN | 0 (builder's run) |
| Words on stage, my own count at 7 viewports | n/a | 4 at every one |
| Opener images, desktop first screen (I measured with the cache off) | about 1,330 KiB before the pool fixes | 180 KiB (target 350: met) |
| Opener images through the held stage, desktop | n/a | about 360 KiB (target 350: over by about 10) |
| Opener images, phone first screen, finished composition | about 300 KiB | about 280 KiB (target 120: not met; photo plus five stickers is about 255 KiB) |
| Taste gate, page scope (my re-run) | 0 FAIL, 4 WARN | 0 FAIL, 4 WARN (card-rows, size-count, no-footage, blank-gap) |
| Look-round self-score (builder) | 6.8 | 6.9 |
| `focus-hidden` on the closed menu | 7 FAIL | 7 FAIL: the same checker false positive; the menu is untouched |

**My own checks on B2:** 7 viewports from 1280×720 to 1920×1080, 820, 390 and 320: no sideways scroll, headline and action visible and still at the first frame, nothing over the action. At 1920×1080 the crew photograph's top edge touches the descenders of "industry" (2 px of box overlap; a craft nit). Reduced motion: no running animations, no hidden text. No console errors or warnings on any B2 page. The Foamglas cut-out was re-cut (no shadow fringe) and all three cut-outs shrunk to display size.

**Honest verdict, v2 against B:** v2 is the better **sequence** (the statements read as poster fields instead of a stack of small lines, the stage obeys the word and reading-time rules, the first screen loads 180 KiB) and slightly worse on the **first frame**: B's first frame also showed "too hot to touch." at the lower left, while v2's lower left stays open until you scroll. v2's collage gets busy by the end of the hold. Neither passes the 120 KB phone image budget (a starting value in the profile, not a ruling); the phone finished composition shows the photograph and all five stickers.

**Your ruling still open:** Home v1 (B) or Home v2 (B2) for the system, and whether the phone image budget should be raised or the phone should show fewer stickers.

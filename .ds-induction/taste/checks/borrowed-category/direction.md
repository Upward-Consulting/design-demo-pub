# DIRECTION SHEET — Dressed as something else
seed 105 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | Dressed as something else |
| Hero | Single specimen with name list |
| Type | Barlow Condensed / Barlow |
| Colour | Grey, mint, orange |
| Sections | features (Comparison set as text) → showcase (Output slips along the edge) → how-it-works (Many into one) → proof (The printed guest list) → stats (Total and its receipt) → list (Object riding down the schedule) → contact (Clip-out coupon form) → cta (One word is the button) → footer (Contact as the headline) |
| Motion | Slow crossfade |
| Photographs | the "Objects" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Art-direct the subject as if it belonged to a different, more vivid category. A money app is sold like a streetwear drop. An industrial roaster is presented like a design object. Drilling hardware gets the calm of a watch brand. A parcel-locker service becomes a fairground of stickers. Choose the borrowed category by asking what feeling the audience is missing from this kind of product (swagger, calm, glamour, play) and which category owns that feeling. Then take its manners completely: its type, its pacing, its way of photographing things. The contrast between dull subject and vivid dress is what people remember.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Depends on the borrowed category, so decide it explicitly and write it in your notes. Fashion drop: one shouted condensed headline across the full width, a single cropped image under it, then product facts as a blunt list. Watch or perfume: a centred object on a dark field, a small serif name, very few words, long vertical pauses. Poster or zine: flat colour blocks, heavy type, tilted cut-out images. Museum: one item per screen on a plinth-like band of colour with a short label beside it. Whichever you choose, the page structure stays simple (four to six sections) and every section uses the borrowed manners, including pricing and the footer.

## 3. Type — Barlow Condensed / Barlow
Road-sign condensed type with squared curves, bold but not compressed into a wall, with its normal-width sibling for text. Suits logistics, motorsport, hardware and directories with many short titles.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Barlow:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Barlow Condensed** — weight 700 · tracking -0.02em · leading 0.9 · uppercase for statements, mixed case for item titles
- Text: **Barlow** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2.5rem, 1.2rem + 5vw, 5.5rem);
}
```
The borrowed category's type, fully committed: condensed and loud, or refined and small. No halfway.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Grey, mint, orange
```css
:root {
  --bg: #ffffff;
  --surface: #f5f5f5;
  --ink: #000000;
  --muted: #666666;
  --accent: #a7ff9c;
  --accent-ink: #000000;
  --field-1: #c5c5c5;  --field-1-ink: #000000;
  --field-2: #a7ff9c;  --field-2-ink: #000000;
  --field-3: #ff6831;  --field-3-ink: #000000;
  --field-4: #000000;  --field-4-ink: #ffffff;
}
```
Black on white to start, then whole sections flood with flat mid-grey, acid mint and orange in turn. Photographs inside a flooded section are shown in black-and-white, and mint is also the button colour on white and black.
The borrowed category's palette, which will be unlike the subject's sector norm. That mismatch is intended.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Photograph the subject the way the borrowed category would be photographed. With the dealt set, choose images for attitude, not literal relevance, and crop them hard.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/113/1600/1000` — Steam rising from a metal mug with blurred blue background · mid tone · steel blue, white, grey · calm area: top · native landscape · photo: Zugr
- `https://picsum.photos/id/23/1600/1000` — Close-up of metal fork tines against a dark blurred background · dark tone · charcoal, blue grey, silver · calm area: top · native portrait · photo: Alejandro Escamilla
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
- `https://picsum.photos/id/39/1600/1000` — Close-up of a turntable tonearm resting on a vinyl record · light tone · white, black, warm grey · calm area: top · native landscape · photo: Luke Chesser
- `https://picsum.photos/id/486/1600/1000` — Black vintage typewriter with blank paper seen from above on white · light tone · white, black · calm area: left · native portrait · photo: Florian Klauer
- `https://picsum.photos/id/687/1600/1000` — Coin-operated viewing binoculars facing a pale sea and sky · light tone · white, pale blue, silver grey · calm area: right · native landscape · photo: davide ragusa
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, plants-and-flowers, texture, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Single specimen with name list
Borrowed from a museum plinth. A calm light ground with roughly 70% left empty. The wordmark is set large for a logo, about 28% of the viewport wide (clamp(64px, 6vw, 92px), heavy serif or grotesk), top-left on a 56px margin; one sentence of description at 15px sits top-right on the same margin, its first line aligned to the top of the wordmark. Dead centre stands one specimen: a flat tile in a palette colour, 400px wide and 460px tall (columns 5-8) with a 16px radius, holding a single cut-out item at about 80% of the tile height, object-fit: contain. Left of the tile, in columns 2-4, a vertical list of item names is right-aligned towards it: the selected name in full ink at 20px, the names above and below stepping down in size and opacity (18, 16, 14px; 60, 35, 15%). Choosing a name swaps the item and the tile colour. Below the tile, centred: the item's one-line fact at 14px, then the single action, a filled rectangle 240px wide. Three text links sit bottom-left at 14px.

On a phone: The wordmark sits top-left at 11vw with the description sentence beneath it at 15px. The tile takes the full width inside 20px margins at 4:5, starting at 30% of the height. The name list becomes one horizontal row under the tile that scrolls sideways with scroll-snap, the selected name centred in full ink at 18px. The action sits full width at the bottom of the screen; the links move to the footer.
Headline: The name itself as an oversized wordmark, up to 10 characters on one line; there is no separate statement.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Barlow Condensed, text Barlow) and their settings; capitals only where the type system sets them.
- It crops letters along their top: the inspector fails that (jurors read it as broken). Crop at the bottom edge or a side instead.
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. features — Comparison set as text (table)
A comparison table with no lines and no tick marks. A CSS grid: capability names in columns 1–5 of 12 at 22–24px medium, then three answer columns of equal width (plans, methods, or this against the usual way). Every cell answers in words at 17px: 'Yes, unlimited', 'Up to five', 'Not yet', never a symbol. Seven to ten rows, each 64–72px tall, with every other row on a ground one tone darker so the eye tracks across; rows touch. The column that matters is one filled block in the accent or ink colour running the full height of the table behind its cells and rising 24px above the first row, with its text reversed. Column names sit in the top row at 17px bold. The heading, two to four words at 40–48px, hangs top-left above column 1 with 48px beneath.
On a phone: The table turns on its side: one block per capability. The name at 20px bold, then three lines beneath, each giving a column name and its answer at 16px; the featured column's line is set on the filled colour at full width. Blocks alternate the two ground tones.

### 2. showcase — Output slips along the edge (full-bleed)
For subjects whose result is a piece of text or paper: a receipt, a note, a ticket, a written line. A full-bleed photograph, 100vw by 96svh, sets the scene. In the upper centre, left-aligned in a column starting at 18% of the width, two short paragraphs in paper colour at 28–32px, the first opening with the heading's two to four words; a neutral scrim sits behind that column only. Along the bottom, six paper-coloured slips stand side by side across the full width with 12px gaps, each a filled rectangle of a different height (between 26 and 44svh), their lower ends cut off by the section's bottom edge. Two or three of the slips, not all, are tilted by 1–2 degrees. Each slip carries a sample of real output in the text face at 15px: a bold first line, a divider made of typed characters, then four to eight lines.
On a phone: The photograph is 100svh. The paragraphs sit in the top third at 22px. Only three slips show, each 30vw wide, standing along the bottom at different heights, and the row scrolls sideways to reveal the rest. Slip text stays at 14px; do not scale it down.

Adjusted for this page:
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 3. how-it-works — Many into one (band)
A diagram drawn with one repeated shape instead of arrows. The heading (two to four words on two lines at clamp(36px, 4vw, 60px)) and a short paragraph at 17px sit in columns 1–4. Beneath, a wide inline SVG spans columns 1–12 at about 4.5:1. It is built from 120–160 small filled squares (or the page's own motif), each 10–14px. In the left third they are scattered loosely in two pale tones. In the middle third they are pulled into a tight horizontal ribbon three squares high. In the right third they fan out again into neat, evenly spaced rows in the accent colour. The eye reads disorder, compression, order, from left to right. Under the diagram, three text columns aligned to its thirds: a bold one-word name at 20px and two lines at 16px each; the words carry the sequence ('Gather', 'Reduce', 'Release'). No connecting marks.
On a phone: The diagram turns to run top to bottom: a 3:4 SVG with the scatter at the top, the ribbon as a vertical band in the middle and the ordered rows at the bottom. The three names and their text sit to its right in a 38vw column, each level with its zone.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 4. proof — The printed guest list (stack)
Names are printed on a card, the way a programme lists its patrons or an invitation its hosts. On a contrasting flat ground, a paper-coloured panel about 56% of the viewport wide with 5:7 proportions sits centred and rotated by one or two degrees; the section is shorter than the card and clips it with `overflow: hidden`, so the card is cut by the bottom edge rather than framed whole. Inside, 56px padding. At the top, a centred heading of two to four words at 28px. Below it the names run as centred lines at 20–22px with leading 1.7, several names to a line, separated by middots with a non-breaking space either side. One photograph may be tipped in between the heading and the names: 16:9, the full inner width, square corners. The card is a plain filled shape with no outline.
On a phone: The card becomes 92% of the screen wide, keeps a one-degree tilt and is still cut off by the section's bottom edge. Heading at 22px, names at 17px with two names to a line. Padding drops to 28px, and the tipped-in photograph keeps the full inner width.

### 5. stats — Total and its receipt (split)
A total at giant size, and beside it the slip that adds up to it. Left, columns 1–6: at the top the heading, two to five words at 40–44px, with a two-line note at 16px; at the bottom-left, anchored to the section's lower edge, the total at clamp(160px, 18vw, 300px) with leading 0.8, and one caption line at 17px under it. The space between heading and total is left empty. Right, columns 8–11: a paper-coloured slip 380–440px wide on the section's contrasting ground, top-aligned with the heading, its bottom edge a zigzag made with clip-path. The slip lists eight to fourteen rows in the text face at 15–16px with tabular numerals, grouped under bold group names; each row has a description on the left, a right-aligned value, and a leader of round 4px dots between. The last row is inverted on a solid ink bar and repeats the total. The slip's values must truly sum to the figure.
On a phone: Heading and note come first. The total follows at 40vw, flush left, with its caption. The slip comes last at full width minus 16px margins with its zigzag edge, rows at 15px, and the inverted total row closing it.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 6. list — Object riding down the schedule (table)
A schedule of dated events (races, concerts, tastings, departures) with the subject's own object travelling down it. On a dark flat ground, on the page's own margins, the heading is one centred line of condensed capitals at clamp(40px, 3.6vw, 56px), split into its two words with a gap between them, and in the gap stands a cut-out photograph of the object seen from above or in profile, about 320px wide (22% of the width) and up to 64% of the viewport tall. Below come full-width rows 84px tall, each a two-part grid: the event's name at 26px in condensed capitals on the left with a one-line note at 16px in the soft ink under it, and the date and place right-aligned at 16px on the note's baseline. Rows alternate between the ground and a tone one step lighter instead of rules. As the page scrolls, the object leaves the heading and moves down the centre line over the rows (`position: sticky` in a centred column that spans the list, `pointer-events: none`), where it covers only the empty middle of each row and marks how far the reader has come. The row for the next event takes the accent colour across its whole band, with its name and date in the accent's ink. About ten rows fit on one screen; the list ends 120px under the last row.
On a phone: Rows stack at full width on 20px margins: the name at 22px on up to two lines, the note at 16px, the date under the note. The object shrinks to 40% of the width and stays in the heading; it does not travel, because on a phone it would cover the rows. The accent band stays on the next event.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Barlow Condensed, text Barlow) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 7. contact — Clip-out coupon form (split)
The form is a coupon to cut out. One filled card in a strong flat colour, about 2.2:1, spans columns 2–11 with a 14px radius, with 120px of ground above and below. Semicircular notches 28px across are cut into its top and bottom edges at the 46% mark with `clip-path` or an SVG `mask`, and a vertical row of round dots (a dotted `border-left` 5px thick in the ground colour) joins the two notches as the perforation. Left of the perforation, with 48px padding: a two-line heading of three to five words at clamp(28px, 3vw, 44px) in heavy capitals at the top, and one sentence at 16px at the bottom. Right of it: four inputs stacked with 10px gaps, each a filled block 52px tall in a lighter tone of the card with its placeholder at 16px, then a full-width solid submit bar 56px tall in the darkest ink. Inputs keep visually hidden `label` elements.
On a phone: The card turns upright and spans the width with 12px margins. The perforation becomes horizontal: notches on the left and right edges, dots across. Heading and sentence sit above it; the four inputs and the submit bar sit below, each 54px tall.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Barlow Condensed, text Barlow) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 8. cta — One word is the button (band)
The entire band is one link. A full-bleed field in the accent colour, about 60svh tall, contains a single verb of four to eight letters set at 24–30vw in the heaviest weight, tight tracking, sized with `clamp()` so it spans the content width on one line with its baseline 24px above the bottom edge. The `<a>` wraps the whole band; on hover and focus the field and the word swap colours instantly. In the top-left corner, at 20px, one sentence says what happens next; in the top-right, an arrow drawn as a simple inline SVG, 48px, points up and right. There is no other button anywhere in the section. In a page with a motif, the band's top corners take the motif's shape (a large radius, or a chamfer cut with `clip-path`). Keep the word honest: the action itself, not a slogan.
On a phone: The band is 46svh tall. The word is set at whatever size fills the width on one line; choose a shorter verb rather than going below 22vw. Sentence top-left at 17px across two lines, arrow top-right at 32px. The whole band stays tappable.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 9. footer — Contact as the headline (statement)
A full-bleed field in one saturated palette colour, at least 90svh tall. Top row, 40px from the edge: two or three short notes at 15px in columns 1–7 (address, hours, a one-line description) and a back-to-top text link at the right margin. Then a tall empty gap. In the lower half, the way to get in touch is the display line: the telephone number or the email address itself, set at 8–9vw, flush left, hard against the margin, as one link. An email address may break once, before the @, giving two lines. Size it with `clamp()` so the longest line fills at least 80% of the width. Under it, one row of small text at 14px spread across three positions: links at the left, credits in the centre, city and year at the right. The wordmark appears only small, in the top row.
On a phone: Notes stack at the top at 15px. The contact line sits in the lower half at 12vw; a telephone number stays on one line, an email breaks before the @ and is sized so each half fits the width. The meta row becomes three stacked lines at 13px.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Attitude. The page has a recognisable voice from another world, applied to a subject nobody expected it for.

## 11. How this direction goes wrong
Name the borrowed category in one word before you start, or the result is merely loud. The content must still be clear: what it is, what it costs, how to get it. Avoid borrowing from 'tech startup', which is the default you are escaping.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **CoffeeTech®** (Awwwards Site of the Day, studied score 7.1) `aww-coffeetech-r`
  Idea: Present an industrial roaster maker like a design brand: one enormous three-word statement on black, with the machine withheld until the first scroll, where it emerges from the dark.
  Hero: Near-black viewport with nothing but type. A centred three-line headline, one word per line, in Inter Medium at about 15vw with tight tracking; the first line starts a third of the way down and the last runs to within 35px of the bottom edge, its widest word spanning roughly 70% of the width. Cream letters; no subhead, no media, no hero button. Navigation is one quiet row: logo with a terracotta mark at left, four text links centred, then a filled terracotta 'Products' button with a grid icon, an outlined contact button and a language dropdown at right. The top third stays empty.
  Worth taking: Let a three-word headline at about 15vw be the entire first viewport and withhold the product until the first scroll.
- **Locker Land** (One Page Love, studied score 7.5) `opl-locker-land`
  Idea: A dry B2B parcel-locker pitch dressed as a fairground of die-cut stickers, where the main navigation is a fan of five tilted illustrated cards.
  Hero: Post-red field overlaid with a faint lighter-red square grid. Small white brand lock-up top-left; a white pill button with a hard dark-red offset shadow top-right. Top-centre, a two-line sticker-style logo (cream letters, thick cream outline, small locker drawing) about 20% of viewport width. Beneath it a two-line centred white sentence at 18px; no larger headline. The lower half is a fan of five portrait cards with thick coloured frames and rounded corners: centre card upright, neighbours rotated about 8 degrees, the outer pair about 18 degrees and cropped by the viewport edges, each with a label tab overlapping its bottom edge. A two-line caption sits centred below.
  Worth taking: Turn the primary navigation into a fan of tilted illustrated cards in the hero, centre card upright and the outer ones rotated and cropped by the viewport edges.
- **poetry camera** (One Page Love, studied score 7.7) `opl-poetry-camera`
  Idea: A camera that prints poems is sold through its own output: copy arrives as thermal-paper slips, and a soft-focus bitmap wordmark lies over handheld footage.
  Hero: Full-bleed handheld video of two hands holding the white-and-red camera against out-of-focus blossom. The product name is centred over it in two lines of white lowercase bitmap lettering about 10vw tall, deliberately blurred so the pixels bloom into soft blobs; the block spans 70% of the width, from 25% to 70% of the height, directly on top of the camera. One text link sits top-left and two social icons top-right, all white. A yellow pill button about 165px wide with black lowercase text is centred near the bottom edge and stays fixed for the whole page. No tagline and no scrim.
  Worth taking: Blur a bitmap wordmark until the pixels bloom, turning a hard retro face into something soft enough to sit on video without a scrim.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/borrowed-category/direction.json · reprint with `node draw.mjs --show`

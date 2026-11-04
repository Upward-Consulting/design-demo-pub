# DIRECTION SHEET — The printed annual
seed 103 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | The printed annual |
| Hero | Narrow talk, wide headline |
| Type | Young Serif / Source Serif 4 |
| Colour | Soot and lime |
| Sections | features (Comparison set as text) → showcase (Band of unequal panels) → how-it-works (Lines that step across) → proof (Plain names in columns) → stats (Column aligned on the decimal) → list (Cards that fold into spines) → contact (Sentence, portrait, two links) → cta (Three photographs, then a field) → footer (Name first, places under it) |
| Motion | Masked headline |
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
Lay the page out like a well-designed printed report or magazine feature: a masthead image, a tight oversized title, text held to a strict column line, and colour used in solid blocks the way a two-colour print job would. It gives weight and authority to subjects that are really about content: findings, a manifesto, a programme, a serious product. The reader should feel that someone edited this.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A fixed vertical axis at about 42% of the viewport width organises everything: headings begin on it, body columns hang from it, and the 0–42% zone holds small side notes, figures or stays empty. Masthead: a wide image band (photographic mosaic or a single crop) across the top 45% of the first screen; below it the title at 7–9vw starting on the axis, with a two-sentence standfirst at 20–24px. Sections alternate between text pages (title on the axis, body in one or two columns of 34–40ch to its right) and full-bleed colour pages carrying one large figure, quotation or image mosaic. Mosaics are gutterless: photographs and flat colour tiles butted together in a 4- or 6-cell grid. Page numbers, running heads and other print furniture are left out.

## 3. Type — Young Serif / Source Serif 4
A heavy, round old-style headline face with soft bracketed serifs over a clear transitional text serif. Suits essays, food, independent publishers and personal sites that want warmth with weight.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Young+Serif:wght@400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet">
```
- Display: **Young Serif** — weight 400 (single heavy cut) · tracking -0.02em · leading 0.95 · sentence case
- Text: **Source Serif 4** — 400 for body, 600 for emphasis, italic for quotations · leading 1.55 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A tight heavy grotesk or a sharp serif for titles; an excellent text face for reading at 18–20px with leading near 1.5. Headings in sentence case, tracked tight.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Soot and lime
```css
:root {
  --bg: #0f0f0f;
  --surface: #1a1a1a;
  --ink: #ffffff;
  --muted: #8f8f8f;
  --accent: #dafa9c;
  --accent-ink: #0f0f0f;
  --field-1: #ffffff;  --field-1-ink: #0f0f0f;
  --field-2: #dafa9c;  --field-2-ink: #0f0f0f;
}
```
A soot-black opening and close bracket white middle sections, all in black, white and grey. Pale lime is the single action colour: every button, and at most one headline set in it on the dark ground.
Paper, ink and two or three solid block colours. A colour page is a whole section in one flat colour.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Photographs used as blocks in mosaics alongside flat colour tiles; mixed subjects are fine if cropped tight and converted to one treatment.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: Give all photographs in a mosaic one treatment: greyscale via `filter: grayscale(1) contrast(1.05)`, or all full colour. Do not mix.
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/113/1600/1000` — Steam rising from a metal mug with blurred blue background · mid tone · steel blue, white, grey · calm area: top · native landscape · photo: Zugr
- `https://picsum.photos/id/23/1600/1000` — Close-up of metal fork tines against a dark blurred background · dark tone · charcoal, blue grey, silver · calm area: top · native portrait · photo: Alejandro Escamilla
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/24/1600/1000` — Open book lying on a wooden table in soft light · light tone · cream, warm brown · calm area: top · native landscape · photo: Alejandro Escamilla
- `https://picsum.photos/id/486/1600/1000` — Black vintage typewriter with blank paper seen from above on white · light tone · white, black · calm area: left · native portrait · photo: Florian Klauer
- `https://picsum.photos/id/175/1600/1000` — Close-up of an analogue clock face in black and white · mid tone · white, black, grey · black-and-white · native landscape · photo: petradr
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, plants-and-flowers, texture, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Narrow talk, wide headline
An asymmetric sheet on one flat paper-grey ground, divided at 34% of the width by alignment only. Left column (columns 1-4, 32px margin): the wordmark top-left; then, starting at 30% of the height, one supporting sentence at 22px with leading 1.35, max 24ch; under it the single action, a solid ink rectangle with square corners. The column's lower third is empty. Right column (columns 5-12): four text links at 15px on its top edge, the first aligned exactly to the 34% line. Beneath them the headline in a very heavy grotesk at clamp(88px, 9.8vw, 150px), two lines, line-height 0.82, tracking -0.04em, flush left on the 34% line and filling the column width. A square-cornered photograph the full width of the right column starts at 68% of the viewport height and is cropped by the bottom edge. A solid accent block 260px wide, carrying one real figure at 40px and one line of text, overlaps the photograph's top-left corner by half its own height using a negative top margin.

On a phone: One column on 20px margins. The wordmark and a menu word share the top row. The headline comes first at 15vw on two lines, heavy, line-height 0.85. The supporting sentence follows at 18px, then the action at full width. The photograph runs full bleed below at 4:3, with the accent block overlapping its top-left corner at 60% of the screen width.
Headline: A 2-4 word statement in the heaviest weight, at most 20 characters, one or two words per line.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Young Serif, text Source Serif 4) and their settings; capitals only where the type system sets them.
- It names colours (grey): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. features — Comparison set as text (table)
A comparison table with no lines and no tick marks. A CSS grid: capability names in columns 1–5 of 12 at 22–24px medium, then three answer columns of equal width (plans, methods, or this against the usual way). Every cell answers in words at 17px: 'Yes, unlimited', 'Up to five', 'Not yet', never a symbol. Seven to ten rows, each 64–72px tall, with every other row on a ground one tone darker so the eye tracks across; rows touch. The column that matters is one filled block in the accent or ink colour running the full height of the table behind its cells and rising 24px above the first row, with its text reversed. Column names sit in the top row at 17px bold. The heading, two to four words at 40–48px, hangs top-left above column 1 with 48px beneath.
On a phone: The table turns on its side: one block per capability. The name at 20px bold, then three lines beneath, each giving a column name and its answer at 16px; the featured column's line is set on the filled colour at full width. Blocks alternate the two ground tones.

### 2. showcase — Band of unequal panels (strip)
A modest heading, then one wide band of pictures. The heading, two to four words at 36–44px, starts at column 3, left of centre, with 64px beneath it. The band spans the full viewport width edge to edge and is 68svh tall: four photographs standing side by side with no gaps and deliberately unequal widths, a flex row with flex-grow values of 5, 2, 3 and 2. Each panel is cropped with object-fit: cover to a tall slice, so the band reads as one folded view. The first panel carries a two-line title at 28px in paper colour at its top-left, 24px in, over a neutral scrim that covers only that corner. Hovering a panel raises its flex-grow to 6 over 500ms while the others give way; without hover the widths simply stay. One caption line at 16px sits under the band at the left margin.
On a phone: The heading sits on the margin at 28px. The band becomes a two-by-two block with no gaps, 84svh tall in total: the first row split 64/36 and the second 36/64, so the slices stay unequal. The title stays on the first panel. No hover behaviour.

### 3. how-it-works — Lines that step across (statement)
The sequence is written, not counted. Four lines of display type, one stage per line, each a complete short clause that begins with its order word: 'First you send it.' 'Then we take it apart.' 'You choose one.' 'It ships on Friday.' Set at clamp(36px, 4.6vw, 76px), leading 1.0, one line each. The first line starts on column 1 and each following line starts two columns further right (grid-column-start 1, 3, 5, 7), so the block descends as a staircase and the eye follows the diagonal. Under each line, on that line's own left edge and 12px below, a sentence of up to 34ch at 17px in the soft ink. 56px between stages. The last line may take the accent colour as the single emphasis. The first line serves as the heading; there is no title above. Leave the columns to the left of the final stage empty.
On a phone: Lines drop to 8.4vw and may wrap onto a second line. The staircase becomes a smaller indent of 6vw per stage, so the fourth line starts 18vw in. Each sentence sits under its line at 16px on the same indent. 40px between stages.

### 4. proof — Plain names in columns (list)
A typographic list with no logos. The heading, two or three words at 28–32px, sits in columns 1–3 and stays top-aligned with the first row of names. Columns 5–12 hold the names in three or four text columns (`columns: 4; column-gap: 32px`), each name on its own line at 20–22px with leading 1.5, sentence case, in the full ink. Where names fall into kinds (clients, press, partners), each kind starts a new column and its first line names the kind in the softer ink at the same size, so no small labels are needed. Columns are of unequal length and are not balanced; ragged bottoms are intended. Twelve to thirty names work best. There are no boxes, bullets or separators: the column edges and the shared baseline do the organising. Leave 120px above and below.
On a phone: The heading leads at 26px. Names follow in two columns at 17px with a 20px gap; each kind begins after a 32px break with its name in the softer ink on the first line. Long names wrap inside their column rather than shrinking.

### 5. stats — Column aligned on the decimal (table)
A tall column of figures set like a ledger. Left, columns 1–5: the heading as a statement of up to five words on two lines at clamp(32px, 3.2vw, 52px), its first line in the soft ink and its second in full ink, placed at mid-height. Right, columns 7–12: four to six figures stacked, each at clamp(64px, 7vw, 112px), leading 1.0, in tabular lining numerals. They align on the decimal point: each row is a three-part grid in which the whole-number part is right-aligned in the first track, the point and decimals are left-aligned in the second, and a caption of one or two lines at 16px sits in the third, on the figure's baseline. Whole numbers simply leave the second track empty. Rows are separated by 20px of space only. Units are written in the captions, not attached to the figures, so the numerals form one clean vertical shape.
On a phone: The heading comes first at 28px. Figures drop to 15vw and keep the decimal alignment, with the split at 52% of the width. Each caption moves under its figure at 15px, starting from the left margin. 28px between rows.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 6. list — Cards that fold into spines (pinned)
For a journal, a run of notes or a list of chapters without pictures. A wrapper about 400svh tall holds a sticky stage of 100svh. The heading, two to four words at clamp(48px, 4.2vw, 64px), sits top-left on the 32px margin, 120px from the top. Under it a band 360px tall spans the content width and holds a horizontal deck of text cards, each about 620px wide, in three neighbouring flat tones of one hue taken in turn. On a card, with 32px padding: its title at 30px on up to two lines, leading 1.1; an excerpt of two lines at 16px; and along the bottom edge the date on the left and a text link to read it on the right, both at 16px. As the page scrolls, each step slides the next card in from the right edge and squeezes the earlier ones into slivers 120px wide stacked edge to edge at the left, like book spines, where only the first letters of their titles show, clipped by the sliver. Clicking a sliver brings its card back. 48px under the band, the number of entries and a link to the full list sit at 17px on the left margin, so the stage does not end on an empty floor.
On a phone: No pin and no slivers. The cards stack at full width with 12px gaps, each in its tone, the title at 24px, the excerpt at 16px, the date and link at the foot. The heading sits above them at 10vw.

Adjusted for this page:
- It pins something for three screens or more: hold a pin for two or three screens at most, give every screen under it its own content, and let nothing pass over the pinned words (the inspector checks all three).

### 7. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 8. cta — Three photographs, then a field (strip)
Two parts with no gap between them. First, a strip of three photographs butted edge to edge across the full viewport, each one third wide and 40svh tall, `object-fit: cover`, no gutters and no captions; give all three the same treatment. Directly beneath, a band in one flat palette colour, about 44svh tall. In the band, columns 1–7: the closing statement at 26–30px over three lines in the band's assigned ink, with exactly one phrase underlined by a 4px bar (`text-decoration-thickness: 4px; text-underline-offset: 6px`), and that phrase is the link; two lines at 16px follow 32px lower. In the lower-right corner, columns 11–12, a small portrait photograph (4:5, about 150px wide) sits 40px from the band's edges: the person who will answer. There is no button; the underlined phrase is the action.
On a phone: The strip becomes one full-width photograph at 4:3 with the other two side by side beneath it at half width each, still gutterless. The band follows: statement at 22px, the two small lines, and the portrait at 96px wide in the bottom-right corner.

Adjusted for this page:
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 9. footer — Name first, places under it (list)
The wordmark opens the footer instead of closing it. On a full-bleed field in the page's inverse or final chapter colour, the name spans the full content width as the first thing, its cap line pushed 8% above the footer's top edge so the tops of the letters are sliced off by the section (`overflow: hidden` and a negative top margin in `em`). 72px beneath, a two-part row: columns 1–5 list the places or ways to reach the studio (cities, or email and telephone), one per line at 32–36px in the accent ink, each a link; columns 7–12 hold three columns of small links at 15px, top-aligned with the first place. A final row 96px lower carries the legal line at the left and a back-to-top text link at the right, both 13px. The field is about 90svh tall, and nothing sits between the wordmark and the row but space.
On a phone: The sliced wordmark stays at the top, fitted to the width. Places follow as a list at 26px, then the link columns two across at 15px. Legal line and back-to-top link share the last row at 12px, at opposite margins.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It crops letters along their top: the inspector fails that (jurors read it as broken). Crop at the bottom edge or a side instead.

## 8. Motion — Masked headline
On load, each line of the headline rises from behind its own baseline, about 900ms with a strong ease-out, the second line 110ms after the first; the supporting sentence and the action then fade up together. Nothing else on the page performs. Because headlines are two lines at most, you author the line breaks and wrap each line yourself. Recipe: 'Masked line reveal' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The column line, the mosaics and whole pages of colour give structure and variety without ornaments.

## 11. How this direction goes wrong
The axis must be exact and reused everywhere or it reads as random indentation. Keep paragraphs to a real reading measure. On a phone the axis collapses to the left margin and side notes move inline above their paragraph.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Artem Taradash** (One Page Love, studied score 7.1) `opl-artem-taradash`
  Idea: A designer's CV compressed into one newspaper-like band at the top, after which oversized product renders and project artefacts speak at full scale.
  Hero: White page with 20px margins. Top-left are three small black rectangular tags with white text (name and two links). Below them a three-line statement at about 3vw in regular-weight grotesk fills the first third, left-aligned. To its right, starting at the very top edge, run two narrow columns of 12px text, then a third column listing clients one per line, and in the far top-right a circular portrait about 200px wide with a white hand-lettered word across the face. This text band ends by a quarter of the height. Below it a huge cut-out vehicle render bleeds off the bottom, with a project card at right.
  Worth taking: Put bio, client list and portrait in one compact multi-column band at the top so the first scroll is already work.
- **Ai in Design Report 2026** (Awwwards Site of the Day, studied score 8.4) `aww-ai-in-design-report-2026`
  Idea: A research report laid out like a colour-blocked print annual: a thermal-blurred video collage on top, an oversized tight grotesk title, and flat orange, lilac, sage and black blocks carrying stats, quotes and chapters.
  Hero: The top 53% is a full-width video band: blurred, heat-map-like abstract footage in orange, lilac and sage, overlaid with four or five hard-edged rectangles of the same footage in grey or green, two tagged with tiny mono labels in white boxes. The header sits flush on top: a black logo block at far left, an orange link tab running to 40% of the width, two plain links at right. Below the band, on white: a two-line deck at about 1.4vw on a 1% left margin, and from 42% across a two-line title at 8.3vw, medium weight, tracking -0.06em. Bottom row: mono credit left, scroll cue and arrow aligned to the title column.
  Worth taking: Start most headings and text at a fixed column line about 42% across, leaving the left for small decks, credits and chapter numbers.
- **USAvionix** (Awwwards Site of the Day, studied score 7.5) `aww-usavionix`
  Idea: A maker of autonomous jet drones explains its product as a single mission played out on scroll: one pinned WebGL camera flies from a lone drone over forested mountains to a swarm, to detection overlays and then to a dark tactical map, while a console readout runs at the edges and three status colours (observed, threat, secured) carry the plot.
  Hero: After a preloader that shows only the dimmed drone silhouette for over 4.5s, a full-bleed real-time scene: photoreal forested mountains seen from above with a matte black flying wing dead centre, wingspan about 560px (39% of the width). A three-line claim at 80px (5.6vw), Geist 600, -0.04em, leading 0.95, sits top-left at x=32, y 88-300; a three-line 29px lead is docked bottom-right (x 874-1384) over a translucent grey pill about 248x40 that prompts the scroll. A grey contact pill and a menu button are fixed top-right, and a one-word chapter code with sliding tick rails sits top-centre. The middle 60% belongs to the scene.
  Worth taking: Tell a product's capability as one pinned scene: about 4500px of scroll per chapter, the camera moving continuously and the text still, changing only by opacity (out over 250ms, in over 400ms after a 200ms delay).
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/editorial-report/direction.json · reprint with `node draw.mjs --show`

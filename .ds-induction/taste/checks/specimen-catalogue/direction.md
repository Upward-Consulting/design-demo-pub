# DIRECTION SHEET — The specimen catalogue
seed 102 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | The specimen catalogue |
| Hero | Anchored text, specimen half |
| Type | Chillax |
| Colour | Card pastels |
| Sections | features (Four cards dealt into a fan) → showcase (Object on a disc) → how-it-works (Tiles that grow) → proof (The printed guest list) → stats (Stepped figure tiles) → list (Object riding down the schedule) → contact (Photo strip, three-cell bar) → cta (The action tile) → footer (The back of the card) |
| Motion | Pinned story |
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
Present what is on offer the way a field guide presents birds: each item alone on a flat colour, same scale, same angle, named plainly. A bakery's pastries become specimens and the specimens become the menu. A furniture maker's chairs each get their own colour tile. The format flatters ordinary objects because it treats each as worth looking at, and it replaces both the feature grid and the product-card grid with something that has a point of view.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Hero: a left-aligned statement of what this is (5–7vw, upper-left) beside or above a tight cluster of four to seven specimen tiles of different sizes arranged as a loose mosaic that runs off the right edge. Each tile is a flat colour square or 4:5 rectangle with one photograph centred on it, no border, 8–12px gaps. The main section is the catalogue itself: a grid of tiles in which each item has its name and one fact set beneath the tile in the text face, aligned left to the tile edge. Tile colours rotate through three or four fields from the palette. One tile in every six or seven is double size. Supporting sections (about, how to order) are plain text on the ground colour, kept short.

## 3. Type — Chillax
A soft geometric sans with wide round letters and relaxed joins, warm at semibold and easy at text size. Suits consumer apps, community products, cafes and small friendly brands.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600&display=swap" rel="stylesheet">
```
- Display: **Chillax** — weight 600 · tracking -0.03em · leading 1.0 · sentence case
- Text: **Chillax** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
Friendly and plain. Item names at 18–22px in medium weight, facts beneath in the soft ink. One big statement in the hero; no other display type.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Card pastels
```css
:root {
  --bg: #f7f7f5;
  --surface: #ebebe8;
  --ink: #000000;
  --muted: #666662;
  --accent: #d0106f;
  --accent-ink: #ffffff;
  --field-1: #97aaf6;  --field-1-ink: #000000;
  --field-2: #bbf697;  --field-2-ink: #000000;
  --field-3: #fed878;  --field-3-ink: #000000;
  --field-4: #6ef8fb;  --field-4-ink: #000000;
}
```
Neutral paper ground and black type, with each card or tile given its own flat pastel (periwinkle, lime, amber or cyan), never two alike side by side. Magenta is reserved for the logo, the email address and text links.
The tiles are the colour: three or four flat fields from the palette, repeated in a steady rotation. Ground stays neutral.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Photographs of single items on plain backgrounds, all cropped to sit at the same apparent size within their tile. On light tiles, `mix-blend-mode: multiply` removes white studio backgrounds. If the subject's own item photographs are missing, use the dealt set and say so.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/23/1600/1000` — Close-up of metal fork tines against a dark blurred background · dark tone · charcoal, blue grey, silver · calm area: top · native portrait · photo: Alejandro Escamilla
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/113/1600/1000` — Steam rising from a metal mug with blurred blue background · mid tone · steel blue, white, grey · calm area: top · native landscape · photo: Zugr
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
- `https://picsum.photos/id/39/1600/1000` — Close-up of a turntable tonearm resting on a vinyl record · light tone · white, black, warm grey · calm area: top · native landscape · photo: Luke Chesser
- `https://picsum.photos/id/24/1600/1000` — Open book lying on a wooden table in soft light · light tone · cream, warm brown · calm area: top · native landscape · photo: Alejandro Escamilla
- `https://picsum.photos/id/486/1600/1000` — Black vintage typewriter with blank paper seen from above on white · light tone · white, black · calm area: left · native portrait · photo: Florian Klauer
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, plants-and-flowers, texture, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Anchored text, specimen half
The viewport is split exactly in half by two flat tones that meet at a clean vertical edge: the ground on the left, a palette colour on the right. Left half: the wordmark sits top-left on a 40px margin; the next two thirds of the height are empty; everything else is anchored bottom-left and ends 40px above the bottom edge: a headline on one or two lines at clamp(28px, 2.6vw, 40px), medium weight; one sentence at 18px in the soft ink, max 38ch; the single action as a solid rectangle. Right half: position: sticky; top: 0; height: 100svh. In its centre sits a square tile in a second palette colour, 450px wide (31vw) with a 24px radius, holding one cut-out item at 70% of the tile, object-fit: contain, mix-blend-mode: multiply on light fills. Under the tile's left corner the item's name and one fact sit at 15px. As the left column scrolls through the catalogue, the tile's item and colour swap to match the entry in view. One text link sits top-right on the colour field.

On a phone: The colour half comes first as a block 52svh tall holding the square tile at 62vw, centred, and stays sticky while the text slides over its lower edge. The text block follows on the ground: the headline at 7vw on two lines, the sentence at 16px, the action full width. The wordmark and one link sit on the top row over the colour.
Headline: A modest 3-6 word line at 28-40px, at most 40 characters; the object, not the type, carries the screen.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. features — Four cards dealt into a fan (pinned)
Four values, rules or features, each on a card dealt onto the table as the page scrolls. A wrapper about 400svh tall holds a sticky stage of 100svh on the page's darkest flat ground. Each card is a portrait panel of 340×400px with a 20px radius, filled with its own palette colour (four colours that differ clearly in lightness), no border, no shadow. On a card, with 28px padding: its name at 32px in heavy capitals on one or two lines at the top, a photograph or a single picture of the thing at 60% of the card's width in the middle, and one sentence at 16px at the foot. Card one lands alone at the centre; each further quarter of the wrapper deals the next from below the bottom edge, landing 250px to the right of the one before, rotated between -4 and 4 degrees and overlapping only its right 90px, until the four form a fan about 1,090px wide centred on the stage. Keep each card's name, picture and sentence inside its left 240px, so no card ever covers another's words. In the study the cards overlap by two thirds and bury the earlier titles; here nothing lies on top of text. The heading, two to four words at clamp(40px, 4vw, 60px), sits top-left on the stage on the 32px margin with one sentence at 17px under it. The stage releases after the fourth card has settled; under reduced motion the fan is simply there.
On a phone: No pin. The cards sit in one row that scrolls sideways with scroll-snap, each 82% of the width with the next peeking in at the right edge, all upright. The heading and sentence sit above the row.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Chillax, text Chillax) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.
- It mentions a shadow: only on something open above the page (a menu, a dialog), never on a resting element.
- It pins something for three screens or more: hold a pin for two or three screens at most, give every screen under it its own content, and let nothing pass over the pinned words (the inspector checks all three).

### 2. showcase — Object on a disc (index)
One section about a viewport tall on a plain ground. A flat filled disc 64vh across, in one palette colour, sits with its centre at 58% of the width; swap the disc for the subject's own shape if it has one. A cut-out object photograph stands in front of it, centred on it, about 78% of the disc's height and breaking the disc's outline at the top. Bottom-left, starting on the margin and ending level with the disc's lower edge: a vertical list of four to six item names at clamp(28px, 2.9vw, 44px), leading 1.15. The selected name is in full ink and the rest at 25%; choosing a name swaps the object (300ms crossfade) and the disc's colour. The heading, two to four words at the same size as the names but in the soft ink, is the first line of that list. One fact about the selected item sits at the disc's right edge at 17px.
On a phone: The disc comes first, 86vw across and centred, with the object in front. The names follow as a single sideways-scrolling line at 26px with 24px gaps, the selected one in full ink. The fact sits under the names at 16px.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 3. how-it-works — Tiles that grow (grid)
Order is carried by size. Three flat colour tiles stand in one row, bottom-aligned (align-items: end) with 10px gaps, each larger than the one before: columns 1–3 at 30vh tall, columns 4–7 at 44vh, columns 8–12 at 60vh. Each tile holds one photograph of the subject at that stage (raw, in progress, finished), centred and scaled so the object grows from tile to tile; on light tiles mix-blend-mode: multiply removes a white studio background. One palette colour per tile. Text sits under the tiles, outside them, aligned to each tile's left edge: a stage name at 20px medium whose wording carries the order ('Picked', 'Pressed', 'Poured') and two lines at 16px in the soft ink. The heading, two to four words at 40–52px, occupies the empty ground above the two smaller tiles, top-aligned with the tallest tile. A fourth stage is possible with spans of 2, 3, 3 and 4 columns.
On a phone: Tiles stack in order and grow in height instead: 34vw, 46vw and 62vw tall, each at full width. The name and text sit under each tile at 18px and 16px. The heading comes first at 30px. 28px between stages.

### 4. proof — The printed guest list (stack)
Names are printed on a card, the way a programme lists its patrons or an invitation its hosts. On a contrasting flat ground, a paper-coloured panel about 56% of the viewport wide with 5:7 proportions sits centred and rotated by one or two degrees; the section is shorter than the card and clips it with `overflow: hidden`, so the card is cut by the bottom edge rather than framed whole. Inside, 56px padding. At the top, a centred heading of two to four words at 28px. Below it the names run as centred lines at 20–22px with leading 1.7, several names to a line, separated by middots with a non-breaking space either side. One photograph may be tipped in between the heading and the names: 16:9, the full inner width, square corners. The card is a plain filled shape with no outline.
On a phone: The card becomes 92% of the screen wide, keeps a one-degree tilt and is still cut off by the section's bottom edge. Heading at 22px, names at 17px with two names to a line. Padding drops to 28px, and the tipped-in photograph keeps the full inner width.

### 5. stats — Stepped figure tiles (grid)
Three figures on three tiles that refuse to line up. A tall tile in the accent colour fills columns 1–6 and is 70vh high; it holds one figure at clamp(56px, 5.4vw, 92px) in its top-left corner, 28px in, and its caption at 17px in its bottom-left corner, with empty colour between. On the right, an ink-coloured tile in columns 7–9 starts 14vh lower and is 44vh high: a paper-coloured figure top-left, a caption along its bottom edge. A third tile in a mid tone takes columns 10–12, starts 26vh down and is 34vh high, with the same internal layout. Gaps are 8px. The unequal heights leave notches of bare ground above and below the right-hand tiles; the heading, two to four words at 28–36px, sits in the upper notch on column 7. If the page has a motif, cut one corner of each tile to its geometry with clip-path.
On a phone: The tall tile comes first, at full width and 56vw high, with its figure at 15vw. The two smaller tiles follow side by side with a 6px gap, the right one starting 32px lower than the left, each with its figure at 11vw and its caption at the bottom. The heading sits above at 26px.

### 6. list — Object riding down the schedule (table)
A schedule of dated events (races, concerts, tastings, departures) with the subject's own object travelling down it. On a dark flat ground, on the page's own margins, the heading is one centred line of condensed capitals at clamp(40px, 3.6vw, 56px), split into its two words with a gap between them, and in the gap stands a cut-out photograph of the object seen from above or in profile, about 320px wide (22% of the width) and up to 64% of the viewport tall. Below come full-width rows 84px tall, each a two-part grid: the event's name at 26px in condensed capitals on the left with a one-line note at 16px in the soft ink under it, and the date and place right-aligned at 16px on the note's baseline. Rows alternate between the ground and a tone one step lighter instead of rules. As the page scrolls, the object leaves the heading and moves down the centre line over the rows (`position: sticky` in a centred column that spans the list, `pointer-events: none`), where it covers only the empty middle of each row and marks how far the reader has come. The row for the next event takes the accent colour across its whole band, with its name and date in the accent's ink. About ten rows fit on one screen; the list ends 120px under the last row.
On a phone: Rows stack at full width on 20px margins: the name at 22px on up to two lines, the note at 16px, the date under the note. The object shrinks to 40% of the width and stays in the heading; it does not travel, because on a phone it would cover the rows. The accent band stays on the next event.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Chillax, text Chillax) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 7. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

### 8. cta — The action tile (grid)
The close is one row of the board. Three filled tiles sit side by side with 8–14px gaps, all 360px tall and sharing one radius: a wide centre tile spanning columns 3–10 in the accent colour, flanked by two narrow tiles (columns 1–2 and 11–12) that run off the left and right viewport edges, as if the row had been cropped from a longer one. The centre tile holds, left-aligned and vertically centred with 40px padding: a heading of three to five words at 40px, two lines at 17px, and the action. The action is either one rectangular button or an email field 420px wide in the paper colour with the submit button nested inside its right end. The flanking tiles hold no text: one is a photograph covering the tile, the other a flat palette colour. No shadows, no outlines.
On a phone: The accent tile runs full width, about 300px tall, heading at 28px, field and button stacked at full width. The two flanking tiles follow beneath as a pair, each half width and 120px tall, with the same gap and the same radius.

Adjusted for this page:
- It mentions a shadow: only on something open above the page (a menu, a dialog), never on a resting element.

### 9. footer — The back of the card (stack)
The footer is the reverse side of the page's artefact, laid out as the back of a postcard. A paper-coloured panel spans columns 2–11 on the contrasting ground, about 420px tall, its top edge cut into a row of twelve semicircular scallops (an inline SVG path or `clip-path`, each scallop about 100px wide). The panel is divided by space into two halves. Left half: a short sign-off of two to four words at 32px, then two or three lines at 16px, written like a message. Right half: the address block, four left-aligned lines at 18px with 12px between them, each line a link (email, telephone, street, social); above it in the top-right corner, a stamp: one small photograph, 3:4 and 88px wide, with a 6px paper-coloured margin. Along the panel's bottom edge, a single centred line at 12px gives the copyright like a printer's imprint.
On a phone: The panel runs full width with six scallops across its top edge. The stamp sits top-right at 64px wide; the sign-off and message come first, then the address lines at 17px beneath them, then the imprint line centred at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Pinned story
One element holds its place with `position: sticky` (a title, a frame, a product fragment) while the items that belong to it scroll past or swap inside it. The page's ordinary scrolling does the work; nothing is hijacked. Hold it for about one screen per step and three screens at most, two held stages per page at most, with a line of text on every held screen. Recipe: 'Pinned story' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Rhythm of colour tiles and the pleasure of comparing like with like.

## 11. How this direction goes wrong
It needs at least six items that can be shown as objects; with three it is a feature row. Keep labels outside the tiles. No shadows under the objects, no hover lift.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Noho** (Awwwards Site of the Day, studied score 8) `aww-noho`
  Idea: Furniture sold through people misusing it (wearing, balancing on, hiding behind chairs on flat colour backdrops) while the interface stays quiet beige.
  Hero: The viewport splits exactly 50/50 by tone alone: left half warm off-white, right half a slightly darker greige, no rule. Left: a small lowercase logo top-left at 30px margin, then a four-line bold headline at 60px (4.2vw), tracking -0.04em and leading near 1.0, top-left aligned and filling the upper 40%; the lower half is empty except for a one-line 18px tagline pinned bottom-left. Right: a staggered mosaic of seven portrait photos, each about 175 by 230px with 15px gaps, on a four-column, three-row grid with several cells left empty and the rightmost image cropped by the viewport edge. A white square menu button sits top-right.
  Worth taking: Split the hero 50/50 by background tone alone, park the headline top-left and one tagline bottom-left, and fill the other half with a staggered photo mosaic that leaves grid cells empty.
- **Smallbits** (One Page Love, studied score 7.2) `opl-smallbits`
  Idea: The icon set is the page: a full-viewport wall of the product with one docked card holding every word.
  Hero: The whole viewport is a black field tiled with white pixel icons, each drawn about 50px on a 112px pitch, nine rows deep; alternate rows shift half a cell so it reads as a brick pattern, and icons at the edges are cropped. There is no header. A white square-cornered card, 795×170px, is docked bottom-centre: a two-line 24px semibold sentence left, a black rectangular button right, a row of five grey links below. A third-party badge floats top-right. This single screen is the entire page.
  Worth taking: Make the product the wallpaper: tile the full viewport with the assets at large size and skip a hero image entirely.
- **Transport** (One Page Love, studied score 7.6) `opl-transport`
  Idea: Present a USB stick as a luxury object: one studio render on charcoal above a chrome custom wordmark, then let moody macro photography carry the rest.
  Hero: Flat charcoal field. Centred slightly above the midline, a cut-out render of the drive about 31% of viewport width with its steel arm swung up at 30 degrees. Under it a chrome, ultra-wide custom wordmark spans 72% of the width on one line yet is only 45px tall. Then a centred serif tagline at 2.6vw and a single row: mono spec, a dark pill showing price and sold-out state, mono spec. Logo top-left, a grey centred nav prompt, a small pill with a glowing dot top-right. Carousel chevrons sit at the far left and right edges at product height. The bottom fifth is empty.
  Worth taking: Pair one centred product cut-out with a very wide, very short metallic wordmark so the logo reads as an engraved nameplate.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/specimen-catalogue/direction.json · reprint with `node draw.mjs --show`

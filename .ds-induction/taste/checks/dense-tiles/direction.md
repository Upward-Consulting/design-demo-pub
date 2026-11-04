# DIRECTION SHEET — The well-kept board
seed 107 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | The well-kept board |
| Hero | Name band and rails |
| Type | Hanken Grotesk |
| Colour | Warm black, gold |
| Sections | features (Statement cell, dark rows) → showcase (One image across tiles) → how-it-works (Tiles that grow) → proof (Large marks on tiles) → stats (Photograph with figure tiles) → list (Giant word, filled bar rows) → contact (Photo strip, three-cell bar) → cta (The action tile) → footer (The mark, built large) |
| Motion | Edge-to-edge marquee |
| Photographs | the "Texture" set, as atmosphere |

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
The whole page is a board of tiles fitted edge to edge with narrow gaps, like a tidy desk seen from above. Each tile is one thing: the name, a statement, a photograph, a number, a link, a short list. There is no hero and no sequence of bands; the page is one continuous composition that the eye roams. It suits subjects with many small true things to show (a studio with work, writing, clients and news; a product with several distinct capabilities) and it replaces the generic bento by having real content in every tile and a strict system for sizes.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A 12-column grid with 8px gaps and 8–12px outer margins, filled completely, no empty cells. Tiles use only four sizes (for example 6×4, 6×2, 3×2, 3×4 in column × row units of about 90px). Every tile is a flat filled rectangle: ground colour one step from the page, or a palette colour, or a photograph covering it. One radius everywhere (0, or 6–10px). The first screen contains: a name tile (the name at display size, the largest type on the page) with the wordmark set large, a statement tile with the description at 28–40px, two or three image tiles and one action tile in the accent colour. Text inside tiles is top-left aligned with 20–24px padding and never centred. Below the first screen the board continues with the same sizes; the last row is the footer made of tiles.

## 3. Type — Hanken Grotesk
Medium-weight grotesk statements at one large size against caption-size text: a two-size system with no bold. Suits portfolios, agencies and tools that speak in short declarative lines.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Hanken Grotesk** — weight 500 · tracking -0.05em · leading 0.9 · sentence case; one statement size (about 6vw) used for every heading
- Text: **Hanken Grotesk** — 400 for body, 500 for emphasis · leading 1.45 · tracking -0.005em
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One grotesk in two weights. Inside tiles: a large size for single statements, a small size for lists. No uppercase labels in tile corners.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Warm black, gold
```css
:root {
  --bg: #0c0a08;
  --surface: #181512;
  --ink: #ffffff;
  --muted: #8f8a84;
  --accent: #c9a45a;
  --accent-ink: #0c0a08;
}
```
Warm near-black fills the page and photographs sit bright against it, with pure white small type; panels warm to a brown-black. Gold is for one text link or small button per screen, never a field.
Page ground, tile ground one step lighter or darker, and one or two palette colours on selected tiles. Photographs supply the rest.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Photographs fill whole tiles with `object-fit: cover`; choose images that crop well to both wide and tall tiles.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Texture" set (wood, stone, walls and abstract surfaces)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/1002/1600/1000` — Satellite view of turquoise water swirling against golden land · mid tone · turquoise, gold, deep navy · calm area: right · native landscape · photo: NASA
- `https://picsum.photos/id/564/1600/1000` — Curving orange sandstone walls of a narrow slot canyon · dark tone · burnt orange, rust, dark brown · native landscape · photo: Sebastian Boguszewicz
- `https://picsum.photos/id/115/1600/1000` — Raindrops scattered across a dark wet surface, close-up · dark tone · charcoal, blue grey · calm area: all · native landscape · photo: Christian Hebell
- `https://picsum.photos/id/796/1600/1000` — Dark pebbles scattered across smooth, wind-rippled peach sand · light tone · peach, sand, charcoal · calm area: top · native landscape · photo: Colton  Brown
- `https://picsum.photos/id/609/1600/1000` — Smooth grey pebbles on a beach with a blurred wave behind · mid tone · grey, teal, white · calm area: top · native landscape · photo: Jeremy Cai
- `https://picsum.photos/id/41/1600/1000` — Water droplets beading on a smooth surface in shallow focus · mid tone · blue grey, warm brown · calm area: top · native landscape · photo: Nithya Ramanujam
- `https://picsum.photos/id/210/1600/1000` — Old red brick wall with weathered mortar · mid tone · brick red, terracotta, grey · calm area: all · native landscape · photo: Martin Wessely
- `https://picsum.photos/id/766/1600/1000` — Roasted coffee beans filling the entire frame · dark tone · dark brown, espresso, chestnut · native landscape · photo: Padurariu Alexandru
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, plants-and-flowers, object-still, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Name band and rails
One viewport filled completely with tiles on 8px gaps and 8px margins. Across the top, a band tile 170px tall holds the name on one line at clamp(140px, 14.4vw, 220px), heavy, tracking -0.04em, centred and deliberately wider than the band so both ends are cropped by the tile's edges (overflow: hidden, white-space: nowrap). Under it a row of four equal tiles, 64px tall, each holding one text link at 16px, top-left aligned. The remaining 62% of the height is three columns. Left rail (columns 1-2): two stacked tiles, a portrait photograph above and a short list of five facts below. Centre (columns 3-10): one large photograph tile, object-fit: cover, with a statement tile in the ground tone laid along its bottom third holding one sentence at clamp(24px, 2.4vw, 36px), top-left aligned on 24px padding. Right rail (columns 11-12): a full-height stack of five flat colour tiles, a light-to-dark run from the palette; the lowest takes the accent colour and holds the single action, the others each carry one short fact at 15px.

On a phone: Tiles restack in two columns with 6px gaps. The name band stays full width: 26vw type cropped at both sides in a 110px band. The four link tiles become a two-by-two block. The large photograph tile follows at full width, 4:3, with the statement tile under it at 6vw. The colour rail becomes a horizontal row of five short tiles, the action tile last and twice as wide.
Headline: The name on one cropped line, any length, plus one sentence of up to 60 characters in the statement tile.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. features — Statement cell, dark rows (split)
Two halves butted together, each 50vw wide and at least 90svh tall, with no gap. Left half, in a pale tone: the heading in three short lines at clamp(36px, 4.2vw, 68px), its middle line pushed flush right while the first and third stay flush left (text-align set per line), so the block zigzags inside the cell. A two-sentence paragraph of 30ch sits at the bottom-left and the single action at the bottom-right on the same baseline. Right half, in the darkest tone: four or five rows of equal height filling it, told apart by alternating two near-black tones, not by lines. Each row is a three-part grid: a title at 28px (5 parts), a short paragraph at 16px (4 parts) and a plain list of three terms at 15px (3 parts), all top-aligned with 28px padding. No images anywhere in the section.
On a phone: The halves stack. The light cell comes first at 70svh with the zigzag heading at 10vw and the paragraph at its foot. The dark rows follow at full width; each row stacks its title and paragraph, and its three terms run inline as one sentence separated by commas. Rows keep the alternating tones.

Adjusted for this page:
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

### 2. showcase — One image across tiles (mosaic)
One photograph is cut across a board of tiles. A grid of six columns and four rows with 8px gaps spans the full width between 12px margins; every tile is square (aspect-ratio: 1). Each tile shows its own piece of the same image: set the photograph as every tile's background at background-size: 600% 400% and step background-position by column and row, so the picture reads whole through the gaps. Five of the twenty-four tiles are swapped for flat colour tiles from the palette, never two adjacent: one holds the heading (two to four words at 2.6vw, top-left, 16px padding), three hold one fact each at 18px, one holds the action. On hover a tile's piece scales to 108% inside its own clip. Choose a photograph with one clear subject, so the board is legible at a glance.
On a phone: Three columns by six rows with 6px gaps, the photograph re-cut at background-size 300% 600% from a portrait crop. Four colour tiles only; the heading tile spans two columns in the top row with the heading at 6vw. Facts drop to 15px.

### 3. how-it-works — Tiles that grow (grid)
Order is carried by size. Three flat colour tiles stand in one row, bottom-aligned (align-items: end) with 10px gaps, each larger than the one before: columns 1–3 at 30vh tall, columns 4–7 at 44vh, columns 8–12 at 60vh. Each tile holds one photograph of the subject at that stage (raw, in progress, finished), centred and scaled so the object grows from tile to tile; on light tiles mix-blend-mode: multiply removes a white studio background. One palette colour per tile. Text sits under the tiles, outside them, aligned to each tile's left edge: a stage name at 20px medium whose wording carries the order ('Picked', 'Pressed', 'Poured') and two lines at 16px in the soft ink. The heading, two to four words at 40–52px, occupies the empty ground above the two smaller tiles, top-aligned with the tallest tile. A fourth stage is possible with spans of 2, 3, 3 and 4 columns.
On a phone: Tiles stack in order and grow in height instead: 34vw, 46vw and 62vw tall, each at full width. The name and text sit under each tile at 18px and 16px. The heading comes first at 30px. 28px between stages.

### 4. proof — Large marks on tiles (grid)
A board of filled tiles, four across and two or three rows deep, with 8px gaps, spanning the full content width. Each tile is about 3:2, one step lighter or darker than the page ground, with no border. A tile holds one supplied logo, shown far larger than a usual logo strip: about 72px tall, centred, in the page ink as a single-colour SVG. When no logo files exist, the tile holds the name instead, set at 28–32px bold, top-left with 24px padding; never draw a mark. One tile, twice the width of the others and placed first, is in the accent colour and carries the heading: two to four words at about 3vw, top-left. Tile corners follow the page's one radius, or the page's motif shape if it has one. Tiles sit still; there is no hover lift.
On a phone: Two tiles per row with 6px gaps, logos at 44px tall. The heading tile runs full width first, about 120px tall. Show eight tiles at most so the board stays under one and a half screens. Names set in type drop to 20px.

### 5. stats — Photograph with figure tiles (mosaic)
A mosaic without gutters spanning the full width, about 66vw tall in total. A single photograph fills the left two-thirds at roughly 1:1 with object-fit: cover and square corners. The right third is split into two stacked flat colour tiles of equal height, in two palette colours that differ clearly in lightness as well as hue. Each tile carries one figure at clamp(56px, 5.6vw, 96px) in its top-left corner, 28px in from the edges, with a two-line caption at 17px directly beneath it; the rest of the tile is empty colour, which is the point. Photograph and tiles touch, with no gaps and no rounding. The heading, two to four words at 32–40px, sits above the mosaic's left edge with 40px beneath, or is left out when the section follows a text page whose title already introduces it. Never add a third tile; with three figures choose another layout.
On a phone: The photograph comes first, full-bleed at 4:3. The two colour tiles follow side by side as squares, each 50vw, with the figure at 13vw top-left and the caption at 15px beneath. No gaps between any of the three pieces.

### 6. list — Giant word, filled bar rows (stack)
Sized for a reading column 520–640px wide, or centred at that width on a full page. The heading is one word (menu, hours, prices) in tall condensed capitals, its `font-size` set in container units (around 46cqw for four letters, tuned per word) so the letters fill the column from edge to edge, leading 0.8. 20px below, a stack of full-width filled bars, each 56px tall with 6px gaps, in a flat tone one step from the ground, with square corners or a 6px radius. Each bar carries a category name at 16px in medium weight at the left with 18px padding and a plus sign at the right. A bar opens in place as a `details` element: it keeps its fill, and its panel lists items at 16px, name left and price right-aligned with tabular figures, 14px between items, 20px padding. Six to nine bars; the first is open by default.
On a phone: The column is the full width with 16px margins, so the one-word heading spans the screen. Bars are 54px tall with 6px gaps and open the same way. Item descriptions, if any, sit under the name at 14px in the soft ink.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Hanken Grotesk, text Hanken Grotesk) and their settings; capitals only where the type system sets them.

### 7. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

### 8. cta — The action tile (grid)
The close is one row of the board. Three filled tiles sit side by side with 8–14px gaps, all 360px tall and sharing one radius: a wide centre tile spanning columns 3–10 in the accent colour, flanked by two narrow tiles (columns 1–2 and 11–12) that run off the left and right viewport edges, as if the row had been cropped from a longer one. The centre tile holds, left-aligned and vertically centred with 40px padding: a heading of three to five words at 40px, two lines at 17px, and the action. The action is either one rectangular button or an email field 420px wide in the paper colour with the submit button nested inside its right end. The flanking tiles hold no text: one is a photograph covering the tile, the other a flat palette colour. No shadows, no outlines.
On a phone: The accent tile runs full width, about 300px tall, heading at 28px, field and button stacked at full width. The two flanking tiles follow beneath as a pair, each half width and 120px tall, with the same gap and the same radius.

Adjusted for this page:
- It mentions a shadow: only on something open above the page (a menu, a dialog), never on a resting element.

### 9. footer — The mark, built large (band)
On a flat colour field, the brand closes the page as a construction rather than as set type. Across the full content width and about 34svh tall, the wordmark is built from blocks: each letter is knocked out of its own solid rectangle in a palette colour, the rectangles differ in height (60–100% of the band) and butt together with 4px gaps, bottoms on one line. Where the project has a simple geometric mark or motif, enlarge that instead, drawn as inline SVG from flat rectangles, circles and quarter-arcs with the same 4px gaps. Below, 56px lower: four columns of plain links at 15px across columns 1–8, and two addresses or contact lines in columns 9–12. A last row carries the copyright at the left and one small filled button at the right. Space and the block construction do all the separating.
On a phone: The block wordmark spans the full width at about 22svh tall; a long name breaks into two rows of blocks. Link columns go two across at 15px, contact lines beneath at full width, then copyright and the small button on one row.

## 8. Motion — Edge-to-edge marquee
One line of very large type travels sideways across the full width at a slow constant speed, as a band between two sections or as the closing statement. Linear timing, duplicated content for a seamless loop, paused on hover and under reduced motion. One marquee per page, carrying real words (the name, the claim), never a list of buzzwords.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The fit. A full board with consistent gaps and varied tile contents is satisfying in the way a packed suitcase is.

## 11. How this direction goes wrong
Tiles are filled, never outlined, and never carry shadows. Do not put an icon and a two-line feature blurb in every tile; vary what tiles hold. Decide the phone layout as its own board: two columns, tiles re-ordered so the name and statement lead.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Justin Lerner** (One Page Love, studied score 6.8) `opl-justin-lerner`
  Idea: The portfolio is a hairline grid of square cells in which the letters of the owner's name are scattered among small animated project emblems, so name and work form one crossword-like board.
  Hero: White page divided by pale grey hairlines into five columns of exact squares (each 20vw), so three full rows and a sliver of a fourth show. No header, navigation or text block. Each cell holds one centred object about half the cell wide: either a single black slab-serif capital at 5.6vw (one in the top-left cell, one top-right, three more scattered through rows two and three) or a small project emblem such as a pixel speech bubble, a photographed bowl, a red robot arm, a wireframe figure, a logo badge or a line-drawn building. One cell holds only a soft blurred cloud. About 90% of the area is white.
  Worth taking: Spell the name by dropping its letters into scattered cells of a hairline grid and fill the remaining cells with project marks, so identity and index share one structure.
- **Oimachi** (Awwwards Site of the Day, studied score 7.1) `aww-oimachi`
  Idea: A studio homepage that behaves like a dense dashboard: work, posts, experiments and testimonials tiled edge to edge with 8px gutters instead of spaced-out sections.
  Hero: Charcoal ground (#181818) with only 8px side margins. Top-left: a round logo, then five tiny black rectangular chips with bold white 13px labels; top-right a contact chip and a theme toggle. The headline starts at the left margin about 160px down: two lines of light grotesk at 52px (3.6vw), tight tracking, with one word in italic serif. From 280px to the bottom edge runs a three-part row: two tall images butted together (each about 535x610px: a hand holding a phone on black, a man in a printed tee) and a 330px sidebar of blog posts, each a bold 14px title, two grey truncated lines and a small-radius thumbnail.
  Worth taking: Shrink page margins and gutters to 8px and tile media edge to edge so a portfolio reads as a working dashboard rather than a brochure.
- **Vero New-York** (Awwwards Site of the Day, studied score 8.1) `aww-vero-new-york`
  Idea: Treat a keepsake like couture: a slow close-up film opens, then a white 3D sculpture of a dress stays pinned at centre while one sentence in mixed capitals and italics passes over it.
  Hero: Full-bleed video with no scrim: an extreme close-up of a woman's profile against a burnt-orange wall, a blurred pale sculpture occupying the right 40% of the frame in the foreground. Exactly at centre sits the four-letter wordmark in white serif capitals, about 240px wide; 25px beneath it a one-line tagline at 20px alternates italic lowercase connectives with roman capitals. Two translucent frosted rectangles with square corners float 30px from the top corners: a 130px menu button left, a 250px commission button right, both in small capitals. A tiny chevron marks the bottom centre. Nothing else; the image carries the screen.
  Worth taking: Within one serif headline, set the nouns in roman capitals and the small connective words in lowercase italic at the same size.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/dense-tiles/direction.json · reprint with `node draw.mjs --show`

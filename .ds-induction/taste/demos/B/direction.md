# DIRECTION SHEET — Loud and flat
seed 101 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | Loud and flat |
| Hero | Shouted headline, rising photograph |
| Type | Red Hat Display / Red Hat Text |
| Colour | Candy chapters |
| Sections | features (Statements on colour fields) → showcase (Output slips along the edge) → how-it-works (Accordion of tinted panels) → proof (Large marks on tiles) → stats (One figure owns the screen) → list (Line-up at one type size) → contact (Photo strip, three-cell bar) → cta (The idea again, inverted) → footer (The mark, built large) |
| Motion | Masked headline |
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
A page with the directness of a street poster: flat saturated colour, the heaviest type you can find, short blunt statements, and photographs cut out and stuck on. It is for subjects with a voice. Write the page as things a person would actually say out loud, and let the design say them at full volume. The craft is in the control beneath the noise: a strict grid, two or three colours, and exact alignment keep it from becoming a mess.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Hero: a statement of three to six words in ultra-heavy type at 11–15vw, filling the width, lines stacked tight (leading 0.85), flush left with 20–28px margins, on a flat saturated ground. One cut-out or hard-cropped photograph overlaps the type from the right or bottom, tilted 3–6 degrees. A single chunky button in the contrasting flat colour. Sections are solid panels in alternating palette colours: one is a row of short statements each on its own panel of unequal width; one is a single photograph bleeding off two edges with a caption block set over a solid colour bar; one is a large plain list. Panels meet edge to edge. Corners are square or use one large radius (28–40px) consistently.

## 3. Type — Red Hat Display / Red Hat Text
A geometric black with round bowls and flat terminals, cleaner and more even than a grotesque at the same weight. Suits fintech, apps and portfolios that want heavy type with a tidy, technical finish.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@900&family=Red+Hat+Text:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Red Hat Display** — weight 900 · tracking -0.03em · leading 0.92 · uppercase; centred three-line stacks work well
- Text: **Red Hat Text** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2.5rem, 1.2rem + 5vw, 5.5rem);
}
```
The heaviest weight available, set tight, mostly lowercase or mostly uppercase (choose one). Body text is a plain grotesk at 18–20px.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Candy chapters
```css
:root {
  --bg: #ffd249;
  --surface: #f5c63c;
  --ink: #0a0a0a;
  --muted: #5e4a0a;
  --accent: #f53fd6;
  --accent-ink: #0a0a0a;
  --field-1: #ffd249;  --field-1-ink: #0a0a0a;
  --field-2: #ffffff;  --field-2-ink: #0a0a0a;
  --field-3: #ffc4ef;  --field-3-ink: #0a0a0a;
  --field-4: #a4f6f8;  --field-4-ink: #0a0a0a;
  --field-5: #f9a21f;  --field-5-ink: #0a0a0a;
}
```
Each section owns one flat candy colour: yellow first, then white, pink, cyan and orange, with all type in black. Magenta is kept for buttons alone.
Three or four flat colours at full strength including black or white. Each panel is one colour; text on it is one other.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Photographs with attitude, cropped hard or cut to a simple shape with `clip-path` (circle, arch, blunt polygon), slightly rotated, overlapping the type. Two or three on the page.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Texture" set (wood, stone, walls and abstract surfaces)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/115/1600/1000` — Raindrops scattered across a dark wet surface, close-up · dark tone · charcoal, blue grey · calm area: all · native landscape · photo: Christian Hebell
- `https://picsum.photos/id/210/1600/1000` — Old red brick wall with weathered mortar · mid tone · brick red, terracotta, grey · calm area: all · native landscape · photo: Martin Wessely
- `https://picsum.photos/id/796/1600/1000` — Dark pebbles scattered across smooth, wind-rippled peach sand · light tone · peach, sand, charcoal · calm area: top · native landscape · photo: Colton  Brown
- `https://picsum.photos/id/41/1600/1000` — Water droplets beading on a smooth surface in shallow focus · mid tone · blue grey, warm brown · calm area: top · native landscape · photo: Nithya Ramanujam
- `https://picsum.photos/id/1002/1600/1000` — Satellite view of turquoise water swirling against golden land · mid tone · turquoise, gold, deep navy · calm area: right · native landscape · photo: NASA
- `https://picsum.photos/id/609/1600/1000` — Smooth grey pebbles on a beach with a blurred wave behind · mid tone · grey, teal, white · calm area: top · native landscape · photo: Jeremy Cai
- `https://picsum.photos/id/564/1600/1000` — Curving orange sandstone walls of a narrow slot canyon · dark tone · burnt orange, rust, dark brown · native landscape · photo: Sebastian Boguszewicz
- `https://picsum.photos/id/766/1600/1000` — Roasted coffee beans filling the entire frame · dark tone · dark brown, espresso, chestnut · native landscape · photo: Padurariu Alexandru
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, plants-and-flowers, object-still, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Shouted headline, rising photograph
Borrowed from a fashion drop. A near-white or single flat colour field. Navigation is one compact line at the top on 24px margins: condensed wordmark left, three text links centred, the single action right. Directly beneath, a two-line uppercase headline in a bold condensed face at clamp(88px, 11.4vw, 176px), centred, leading 0.88, tracking -0.02em, about 60% of the viewport wide; it occupies the band from 12% to 43% of the height. Immediately under the second line, pulled up with a negative margin of -1.2vw so its top edge tucks behind the letters' baseline, a single portrait photograph rises: 27% of the viewport wide (columns 5-8), 3:4, square corners, object-fit: cover, cropped by the bottom edge so only its upper two thirds show. The photograph is the only colour on the screen. The flanks either side of it stay empty apart from one supporting sentence at 17px bottom-left in a 280px column, and the price or key fact at the same size bottom-right, both on a baseline 32px above the bottom edge.

On a phone: The headline sets at 17vw on two lines, flush to 16px margins and filling the width, in the top third of the screen. The photograph widens to 64% of the width, centred, 3:4, starting directly under the headline and running off the bottom. The supporting sentence and the key fact move below the fold. Navigation collapses to the wordmark and the action.
Headline: A blunt 2-4 word statement in condensed capitals, at most 22 characters, one or two words per line.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Red Hat Display, text Red Hat Text) and their settings; capitals only where the type system sets them.
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. features — Statements on colour fields (statement)
Three or four full-bleed flat colour fields, each 72–80svh tall, butted together with no gap. Each field holds one benefit and is almost empty. The benefit is a phrase of two to four words at clamp(56px, 9vw, 150px), heavy, leading 0.9, on two lines at most, hugging the bottom-left corner with 28px margins. Its explanation is three lines at 17–18px, 30ch wide, placed near the top at column 8, so the eye travels the diagonal from small text to big phrase. On alternate fields the arrangement mirrors: phrase bottom-right and right-aligned, paragraph top-left at column 2. Text on each field is ink or paper, whichever contrasts more. There is no separate section heading: the first field's phrase is the heading. Nothing else appears on the fields: no images, shapes or buttons.
On a phone: Fields are 64svh tall. The paragraph sits top-left at 16px across 80% of the width; the phrase sits bottom-left at 13vw on two lines. Mirroring is dropped; alternate fields right-align the paragraph only, keeping the phrase on the left margin.

### 2. showcase — Output slips along the edge (full-bleed)
For subjects whose result is a piece of text or paper: a receipt, a note, a ticket, a written line. A full-bleed photograph, 100vw by 96svh, sets the scene. In the upper centre, left-aligned in a column starting at 18% of the width, two short paragraphs in paper colour at 28–32px, the first opening with the heading's two to four words; a neutral scrim sits behind that column only. Along the bottom, six paper-coloured slips stand side by side across the full width with 12px gaps, each a filled rectangle of a different height (between 26 and 44svh), their lower ends cut off by the section's bottom edge. Two or three of the slips, not all, are tilted by 1–2 degrees. Each slip carries a sample of real output in the text face at 15px: a bold first line, a divider made of typed characters, then four to eight lines.
On a phone: The photograph is 100svh. The paragraphs sit in the top third at 22px. Only three slips show, each 30vw wide, standing along the bottom at different heights, and the row scrolls sideways to reveal the rest. Slip text stays at 14px; do not scale it down.

Adjusted for this page:
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 3. how-it-works — Accordion of tinted panels (strip)
A two-column introduction, then one horizontal accordion. Introduction: the heading, two to four words at clamp(36px, 4vw, 60px), in columns 1–5; one paragraph at 18px in columns 7–11. 64px below, a flex row across columns 1–12, 520px tall, of four to six panels with no gaps. The open stage is a panel taking about 58% of the width; the rest are vertical slivers sharing what remains. Order is carried by colour: the first stage is the darkest tone of one hue and each later stage is a lighter flat tint of it, so the row reads dark to light from left to right. A sliver shows only its stage name, rotated 90 degrees and reading upward, at 20px bold, anchored to its bottom-left. The open panel shows the name at 40px top-left, a 36ch paragraph at 18px bottom-left and, optionally, one photograph in its right half. Clicking a sliver opens it (flex-basis transition, 450ms).
On a phone: The accordion turns vertical: stages stack at full width as bars 64px tall in the same dark-to-light order, names set horizontally at 18px. The open stage expands to its content height with the paragraph at 17px. The first stage is open by default.

### 4. proof — Large marks on tiles (grid)
A board of filled tiles, four across and two or three rows deep, with 8px gaps, spanning the full content width. Each tile is about 3:2, one step lighter or darker than the page ground, with no border. A tile holds one supplied logo, shown far larger than a usual logo strip: about 72px tall, centred, in the page ink as a single-colour SVG. When no logo files exist, the tile holds the name instead, set at 28–32px bold, top-left with 24px padding; never draw a mark. One tile, twice the width of the others and placed first, is in the accent colour and carries the heading: two to four words at about 3vw, top-left. Tile corners follow the page's one radius, or the page's motif shape if it has one. Tiles sit still; there is no hover lift.
On a phone: Two tiles per row with 6px gaps, logos at 44px tall. The heading tile runs full width first, about 120px tall. Show eight tiles at most so the board stays under one and a half screens. Names set in type drop to 20px.

### 5. stats — One figure owns the screen (statement)
One number, one screen. A flat field at least 90svh tall. At the top-left, starting on the page's main axis, a one-line claim of two to five words at 36–44px: this is the heading. Then a long gap of 22–28vh. At the bottom-left on the same edge, a single figure at clamp(180px, 23vw, 380px), leading 0.8, tight tracking, with its unit (a percent sign, 'x', 'hrs') set as a superscript one third of the figure's size and aligned to the figure's cap height. Directly beneath, flush with the figure's left edge, a caption of three lines at 16–17px, 32ch wide, saying exactly what was measured and when. The right half of the field stays empty; resist filling it. The figure is static text in lining numerals and does not animate. A source line, if needed, sits at the bottom-right at 15px.
On a phone: The claim sits at the top at 28px. The figure is 46vw, flush left, with its superscript unit; if it has four characters or more, drop it to 34vw so it stays on one line. The caption follows at 16px across 80% of the width. Minimum height 80svh.

### 6. list — Line-up at one type size (table)
A full-bleed flat section. The programme is a four-column table spanning the full width between 24px margins, with every cell at one size, clamp(20px, 2.1vw, 30px), one weight, no bold: the act or session flush left, the format starting at 33%, the room or stage at 66%, and the time range right-aligned at the far edge with tabular figures. Rows are 1.5em tall and separated by nothing but that leading; the fixed column starts do the organising. Day or part headings are a single line at the same size in the accent ink with 72px above and 20px below, and may be `position: sticky; top: 0` on a strip of the section's ground colour so the current day stays in view. Breaks and changeovers are rows set in capitals in the soft ink. There is no other heading. Comfortably holds 12–40 rows; with fewer than eight, raise the size to 3vw.
On a phone: Each entry becomes two lines: the act at 22px on the first, then format, room and time on one line at 14px in the soft ink with the time right-aligned. 18px between entries. Day headings stay sticky at the top on the ground colour.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Red Hat Display, text Red Hat Text) and their settings; capitals only where the type system sets them.

### 7. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

### 8. cta — The idea again, inverted (statement)
The close flips the page's colours: ink becomes the ground and the ground becomes the ink, across a full-bleed field at least 90svh tall. The page's opening idea returns as a headline of three to five words at 9–11vw on two lines, leading 0.9, flush left, positioned in the upper two-thirds; it should echo the hero's wording, not repeat it. Along the bottom, on one shared baseline 40px above the edge: one supporting sentence at 20px in columns 1–5 and one rectangular button in the accent colour, right-aligned in columns 10–12, about 56px tall. Nothing else: no image, no second button, no logo. The field's top edge is a hard horizontal line where it meets the section above. If the footer follows on the same inverted field, leave 160px before it so the close still reads as its own screen.
On a phone: The same inverted field at 80svh. Headline at 15vw on two lines at the top. The sentence sits lower at 17px, and the button spans the full width at the bottom, 56px tall, with 20px margins. Nothing else is added.

### 9. footer — The mark, built large (band)
On a flat colour field, the brand closes the page as a construction rather than as set type. Across the full content width and about 34svh tall, the wordmark is built from blocks: each letter is knocked out of its own solid rectangle in a palette colour, the rectangles differ in height (60–100% of the band) and butt together with 4px gaps, bottoms on one line. Where the project has a simple geometric mark or motif, enlarge that instead, drawn as inline SVG from flat rectangles, circles and quarter-arcs with the same 4px gaps. Below, 56px lower: four columns of plain links at 15px across columns 1–8, and two addresses or contact lines in columns 9–12. A last row carries the copyright at the left and one small filled button at the right. Space and the block construction do all the separating.
On a phone: The block wordmark spans the full width at about 22svh tall; a long name breaks into two rows of blocks. Link columns go two across at 15px, contact lines beneath at full width, then copyright and the small button on one row.

## 8. Motion — Masked headline
On load, each line of the headline rises from behind its own baseline, about 900ms with a strong ease-out, the second line 110ms after the first; the supporting sentence and the action then fade up together. Nothing else on the page performs. Because headlines are two lines at most, you author the line breaks and wrap each line yourself. Recipe: 'Masked line reveal' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Colour mass, type mass, and overlap.

## 11. How this direction goes wrong
Headlines still obey the two-line rule: at 13vw that means very few words, which is correct for this voice. No outlines, no offset shadows, no sticker confetti. Rotation is for two or three images only, never for text blocks.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **UGLYCASH** (One Page Love, studied score 7.4) `opl-uglycash`
  Idea: A money app sold like streetwear: one shouted condensed headline over the phone, then sticker-covered 3D props where feature icons would normally go.
  Hero: Near-white page. A floating light-grey nav bar only 35% of the viewport wide sits centred 20px from the top: condensed wordmark left, two social icons in the middle, an app button with a glowing magenta outline right. Directly beneath, a two-line uppercase headline in bold condensed grotesque at 11.4vw, centred, leading under 0.9, about 60% of the width, with a faint cyan and magenta fringe on the letter edges; it fills the band from 12% to 43% of the height. A single phone mockup 27% of the viewport wide rises immediately under the headline, centred, cut off by the bottom edge. Its magenta screen glow is the only colour.
  Worth taking: Make the nav a short floating bar a third of the viewport wide so the headline can start almost at the top edge.
- **Trevor Noah** (Awwwards Site of the Day, studied score 7.8) `aww-trevor-noah`
  Idea: The comedian as a paper cut-out sticker: his head is torn open and the things he makes (stand-up, books, video) spill out and become the navigation.
  Hero: The desktop capture caught a blank navy frame before the canvas painted; the next frame and the mobile shot show the scene. A deep navy field. The name runs across the top in bold pink grotesk on one line, sized to nearly touch both edges. Centred below is a photographic cut-out of the face with a thick white sticker outline and a torn top edge, from which glossy 3D objects (microphone, book, video player, brain, heart) erupt. Circular arrow buttons sit at the left and right edges; a torn-paper white label beneath the face names the current category. A hairline, a text ticker and a pink pill close the bottom.
  Worth taking: Cut the subject out of a photo with a thick white sticker border and a torn edge so photography behaves like illustration.
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

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/loud-flat-poster/direction.json · reprint with `node draw.mjs --show`

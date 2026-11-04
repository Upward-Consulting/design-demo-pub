# DIRECTION SHEET — The object, large
seed 106 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | The object, large |
| Hero | Object cropped by three edges |
| Type | Panchang / Switzer |
| Colour | Newsprint and brass |
| Sections | features (One scene, stepping statements) → showcase (Two objects, two fields) → how-it-works (One verb at a time) → proof (Names running off the edges) → stats (Figure on the photograph's edge) → list (Object riding down the schedule) → contact (Visit card on a photograph) → cta (The object returns) → footer (The back of the card) |
| Motion | Shutter image |
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
Show the thing, bigger than seems reasonable. One photographed object fills the first screen, scaled until the viewport crops it, with the text small and tucked beside or behind it. The crop is the idea: a record whose edge leaves the top-right corner, a bottle whose shoulder runs off the bottom, a chair seen so close you read its grain. Being that close reads as confidence in the object. Everything else on the page serves it: details as tight close-ups, facts as short lines, one way to buy.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
First screen: the object occupies 55–75% of the viewport and breaks at least one edge. It sits on a flat field (ground colour or one bold colour), never in a box. The headline is short and either very large and partly hidden behind the object (10–13vw, the object overlapping two or three letters) or small (28–36px) in the opposite corner with a one-line description. No navigation bar beyond a wordmark and one action. Following sections: a row of three or four close-up details at different crop ratios (not equal tiles), a single wide photograph of the object in use, a plain list of facts set large (materials, size, price) aligned to one edge, then the purchase action. The object returns once at the end from a different angle.

## 3. Type — Panchang / Switzer
A flat-sided extended grotesk in heavy capitals, wide enough that two words fill the screen, with a neutral sans kept small. Suits portfolios, real estate, travel and brand sites that want a broad, confident wordmark.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=panchang@700&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap" rel="stylesheet">
```
- Display: **Panchang** — weight 700 · tracking -0.02em · leading 1.0 · uppercase; four words or fewer per line because the face is very wide
- Text: **Switzer** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
Either very large and structural or very small and precise; pick one for the headline and hold it. Facts are set in the text face at 22–28px, not in a table.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Newsprint and brass
```css
:root {
  --bg: #e8e8e3;
  --surface: #dcdcd6;
  --ink: #181715;
  --muted: #63625c;
  --accent: #bfb21a;
  --accent-ink: #181715;
  --field-1: #181715;  --field-1-ink: #e8e8e3;
}
```
Warm paper grey with near-black type holds the upper page, then whole sections flip to near-black with paper-grey type; no section is tinted. Brass yellow marks one small detail per screen, such as the button or a single word.
A flat field chosen to make the object's own colour sing (its complement, or a tone darker than its shadow side). One field for the whole page, or a second for the facts section.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

Use the product's own photographs if they exist. Otherwise use a still-life from the dealt set as a stand-in and say so. Prefer images with a plain background; use `mix-blend-mode: multiply` on light fields so a white studio background disappears into the page colour.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: Scale the main image well past its container (`width: 120–160%`) and let `overflow: hidden` on the section do the cropping.
- `https://picsum.photos/id/23/1600/1000` — Close-up of metal fork tines against a dark blurred background · dark tone · charcoal, blue grey, silver · calm area: top · native portrait · photo: Alejandro Escamilla
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/113/1600/1000` — Steam rising from a metal mug with blurred blue background · mid tone · steel blue, white, grey · calm area: top · native landscape · photo: Zugr
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
- `https://picsum.photos/id/39/1600/1000` — Close-up of a turntable tonearm resting on a vinyl record · light tone · white, black, warm grey · calm area: top · native landscape · photo: Luke Chesser
- `https://picsum.photos/id/687/1600/1000` — Coin-operated viewing binoculars facing a pale sea and sky · light tone · white, pale blue, silver grey · calm area: right · native landscape · photo: davide ragusa
- `https://picsum.photos/id/486/1600/1000` — Black vintage typewriter with blank paper seen from above on white · light tone · white, black · calm area: left · native portrait · photo: Florian Klauer
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, plants-and-flowers, texture, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Object cropped by three edges
A flat off-white or single bold colour field with no navigation bar: only a small wordmark top-right at 24px and the single action fixed bottom-right as a solid rectangular button. The left 60% of the screen is one object photographed on a plain background and scaled far past its container. Set the image to about 150% of the hero's height, rotate it 10 to 20 degrees and position it so the top, left and bottom edges of the viewport all crop it and only its right-hand third is fully inside; use `overflow: hidden` on the section and `mix-blend-mode: multiply` if the field is light. The headline fills the right half: two stacked lines of very bold lowercase at clamp(120px, 13vw, 210px), right-aligned 16px from the right edge, tracking -0.05em, line-height 0.86, vertically centred. It sits behind the object in the stacking order, so the object's right-hand contour tucks over the first one or two letters of each line. One supporting sentence at 18px, max 28ch, is right-aligned under the headline on columns 9–12. Nothing else is on the screen: no second image, no list.

On a phone: The object moves to the top: the image is 150vw wide, rotated, cropped by the top, left and right edges, and occupies the upper 52svh. The headline sits below it at 19vw on two lines, right-aligned at a 12px margin, its first line overlapped by the object's lower contour. The supporting sentence follows at 16px, right-aligned. The action button stays fixed bottom-right.
Headline: Two lines of one or two short words each, up to about 8 characters per line at 13vw, partly tucked behind the object.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. features — One scene, stepping statements (full-bleed)
A wrapper 350–450vh tall holds a sticky full-bleed photograph (100vw by 100svh) with a calm, symmetrical subject and a clear upper third; a neutral dark scrim covers only that upper third. At top centre, five or six short statements of two to five words are stacked at 18–20px with 10px between them; the first of them is the section's heading. One statement is at full white and the rest at 45% opacity; the active line steps down the stack as the reader scrolls (IntersectionObserver on invisible 70vh markers). For each statement, two small photographs with square corners, 160–240px wide and of different ratios, fade in left and right of the centre line at different heights, then leave when the next pair arrives. No other text. A low-key image on a deep ground works equally well.
On a phone: The photograph stays sticky at 100svh, cropped to its centre. The statement stack moves to the bottom third over a scrim, at 17px, left-aligned on the margin. Each statement brings one small photograph only, 44vw wide, placed in the top-right corner with a 16px margin.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

### 2. showcase — Two objects, two fields (split)
Two panels side by side, each 50vw wide and 92svh tall, in two different flat tones from the palette, meeting on a clean vertical edge with no gap. Each panel is dominated by one cut-out object photograph scaled to 130–150% of the panel's width and positioned so the panel's top edge crops it: the reader sees the lower two-thirds of the object, very close. On light panels use mix-blend-mode: multiply to lose a white studio background. Along the bottom of each panel, 28px in from the edges, one row: the name at 20px medium and a price or fact at 17px on the left; on the right, two small rectangular actions, one filled with ink and one with paper. Nothing sits in the middle of a panel. The heading, two to four words at 32–40px, is set at the top-left of the first panel only, in the empty corner beside the object.
On a phone: Panels stack, each 78svh tall, the object scaled to 150% of the width and cut by the top and right edges. The bottom row becomes two lines: name and fact, then the two actions side by side at full width. The heading sits top-left on the first panel at 26px.

### 3. how-it-works — One verb at a time (full-bleed)
Three to five full-bleed panels, each 100svh tall, stacked with no gap; each is one stage and holds one photograph covering it. In every panel a single word, the verb for that stage ('Cut', 'Fold', 'Stitch', 'Press'), is set at clamp(96px, 17vw, 300px), heavy and centred, inside a wrapper that is position: sticky; top: 50% and shifted up by half its own height. Because each word is sticky only within its own panel, it holds the centre of the screen while its photograph passes behind it, and is then pushed out by the next panel's verb. Use mix-blend-mode: difference in white, or one solid colour tested on every image. One sentence at 18px sits in the bottom-left corner of each panel over a neutral scrim limited to that corner. There is no separate heading: the verbs, read in order, are both the heading and the sequence.
On a phone: Panels stay 100svh, each photograph cropped to a vertical slice. The verb is 24vw, still sticky at the centre. The sentence sits along the bottom over a scrim at 16px, full width with 16px margins.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It blends text with `difference`: over anything but black, white or grey that gives random hues. Use a solid ink chosen for each ground instead.

### 4. proof — Names running off the edges (band)
A full-bleed band in a flat colour, about 34vh tall, holding a single line of names that is cropped by both viewport edges. The names are set at 8vw in the display weight, `white-space: nowrap`, separated by a solid round dot one third of the cap height, and the line moves slowly to the left (a CSS `translateX` animation over 40 seconds on a duplicated track, paused under `prefers-reduced-motion`). The band has no heading. Its meaning comes from one sentence at 18px set directly below the band at the left margin on the page ground, stating plainly who these names are. Supplied logos may replace names if all are available as single-colour SVGs at 0.8em height; do not mix logos and set names in one line. The band butts against the sections above and below with no gap.
On a phone: The band is 22vh tall with names at 15vw, still cropped at both edges and still moving. The explaining sentence sits under it at 16px with 20px margins. Do not add a second line running the opposite way; one line is the idea.

### 5. stats — Figure on the photograph's edge (full-bleed)
One full-bleed photograph, 100vw by 88svh, and one figure set on it the way a film title sits on a frame. The figure, with its unit, is at clamp(120px, 17vw, 280px), leading 0.8, in paper colour, hugging the bottom-left corner with 24px margins, its baseline nearly on the photograph's lower edge. A neutral dark scrim covers only the bottom 35% of the image for legibility. On the same baseline at the right margin, right-aligned, a sentence of up to 26ch at 18px explains the figure. At the top-left, small at 20–24px, sits the heading of two to four words; the middle of the photograph stays clear. Two smaller supporting figures may follow below the photograph, on the ground: each at 40px with a one-line caption beside it, starting at columns 1 and 7, 40px under the image. Choose a figure that belongs to the picture: a height, a distance, a temperature, a year.
On a phone: The photograph is 80svh, cropped to its subject. The figure sits bottom-left at 30vw; the sentence moves above it at 16px, left-aligned. Supporting figures stack under the photograph at 32px, each with its caption on the line beneath.

### 6. list — Object riding down the schedule (table)
A schedule of dated events (races, concerts, tastings, departures) with the subject's own object travelling down it. On a dark flat ground, on the page's own margins, the heading is one centred line of condensed capitals at clamp(40px, 3.6vw, 56px), split into its two words with a gap between them, and in the gap stands a cut-out photograph of the object seen from above or in profile, about 320px wide (22% of the width) and up to 64% of the viewport tall. Below come full-width rows 84px tall, each a two-part grid: the event's name at 26px in condensed capitals on the left with a one-line note at 16px in the soft ink under it, and the date and place right-aligned at 16px on the note's baseline. Rows alternate between the ground and a tone one step lighter instead of rules. As the page scrolls, the object leaves the heading and moves down the centre line over the rows (`position: sticky` in a centred column that spans the list, `pointer-events: none`), where it covers only the empty middle of each row and marks how far the reader has come. The row for the next event takes the accent colour across its whole band, with its name and date in the accent's ink. About ten rows fit on one screen; the list ends 120px under the last row.
On a phone: Rows stack at full width on 20px margins: the name at 22px on up to two lines, the note at 16px, the date under the note. The object shrinks to 40% of the width and stays in the heading; it does not travel, because on a phone it would cover the rows. The accent band stays on the next event.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Panchang, text Switzer) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 7. contact — Visit card on a photograph (full-bleed)
A full-bleed photograph of the place, 100vw by 100svh, carries one solid card and nothing else. The card is a filled panel in the paper colour, fully opaque, 380px wide with 8px corners and 32px padding, placed in the upper-right corner 60px from the top and right edges (or the upper-left: pick the corner where the photograph is calmest). It holds, top to bottom: a two- or three-word title at 28px in a light weight; the address on two lines at 16px; the opening hours as three rows with days at the left and times right-aligned in tabular figures; the phone number; then, flush with the card's bottom edge and spanning its width, a solid booking button 52px tall. The card may be `position: sticky; top: 60px` inside a taller section so it holds while the photograph scrolls beneath it. The photograph's focal point must stay clear of the card. No heading outside the card.
On a phone: The photograph is 100vw by 70svh. The card leaves the corner: it spans the width with 16px margins and overlaps the photograph's bottom edge by 80px, so image and card interlock. The booking button is full width, 56px tall, at the card's bottom.

### 8. cta — The object returns (split)
The thing shown in the hero comes back once, from another angle, to close the page. On one flat field 90svh tall, the object's photograph occupies columns 1–8, scaled to about 130% of that area and anchored so the section's bottom and left edges crop it (`overflow: hidden` on the section; on light fields `mix-blend-mode: multiply` removes a white studio background). The text sits small in columns 10–12, vertically centred: a closing line of three to five words at 32–40px, one sentence at 17px, the price or key fact on its own line at 22px, and one rectangular button. Nothing overlaps the object's focal area. Where the page's subject is a shape rather than a photograph, the page's motif takes the object's place at the same scale as a flat filled shape. The closing line is the only heading.
On a phone: The text block comes first: closing line at 28px, sentence, fact, full-width button. The object follows at 130% of the screen width, shifted so the right and bottom edges crop it, filling about 55svh on the same flat field.

### 9. footer — The back of the card (stack)
The footer is the reverse side of the page's artefact, laid out as the back of a postcard. A paper-coloured panel spans columns 2–11 on the contrasting ground, about 420px tall, its top edge cut into a row of twelve semicircular scallops (an inline SVG path or `clip-path`, each scallop about 100px wide). The panel is divided by space into two halves. Left half: a short sign-off of two to four words at 32px, then two or three lines at 16px, written like a message. Right half: the address block, four left-aligned lines at 18px with 12px between them, each line a link (email, telephone, street, social); above it in the top-right corner, a stamp: one small photograph, 3:4 and 88px wide, with a 6px paper-coloured margin. Along the panel's bottom edge, a single centred line at 12px gives the copyright like a printer's imprint.
On a phone: The panel runs full width with six scallops across its top edge. The stamp sits top-right at 64px wide; the sign-off and message come first, then the address lines at 17px beneath them, then the imprint line centred at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The object's surface at close range, and the tension of the crop.

## 11. How this direction goes wrong
A small centred product shot with space all round is a catalogue thumbnail, not this direction. If the image has a busy background it cannot sit on a field; crop tighter or change image. Keep text off the object's focal area.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **The Watch** (Awwwards Site of the Day, studied score 6.8) `aww-the-watch`
  Idea: A single 3D watch is the only actor: it holds centre stage and turns, flips and finally explodes into parts while giant product-name letters slide behind and in front of it.
  Hero: Light grey field with soft darker blurs toward the corners. A steel chronograph rendered in 3D stands upright at dead centre, about 80% of viewport height. Behind it the product name is set once across the full width in a wide, squared geometric sans at 24vw in mid-grey; the watch covers the middle character, so only two letters at the left edge and two at the right are readable. A thin circle about 700px across with faint radial spokes and one darker arc sits behind the watch like a dial diagram. No navigation, logo, body copy or button anywhere.
  Worth taking: Set the product name so large that the product itself replaces one of its characters, leaving the name half-hidden and the object as the missing letter.
- **ARCHIV** (One Page Love, studied score 7.2) `opl-archiv`
  Idea: A waitlist page as a museum plinth: one cut-out everyday object at a time, centred on off-white beneath a heavy serif wordmark.
  Hero: Off-white single screen with no scroll. A heavy high-contrast serif wordmark in black caps sits top-left at a 56px margin, about 410px wide (28% of the viewport) and 80px tall. Opposite, top-right at the same margin, one line of 14px sans description aligns with the wordmark's top. Dead centre, one photographed object (a painted wooden pepper mill about 140px wide and 440px tall) stands on a barely visible lighter rounded square with a soft contact shadow; other objects replace it in turn. Below, a centred 11px grey line, then a white rounded email field 236px wide with a circled arrow inside its right end. Roughly 80% is empty.
  Worth taking: Build a pre-launch page from four elements only (wordmark top-left, one-line description top-right, a single centred object, an email field) and leave the rest of the screen empty.
- **Noho** (Awwwards Site of the Day, studied score 8) `aww-noho`
  Idea: Furniture sold through people misusing it (wearing, balancing on, hiding behind chairs on flat colour backdrops) while the interface stays quiet beige.
  Hero: The viewport splits exactly 50/50 by tone alone: left half warm off-white, right half a slightly darker greige, no rule. Left: a small lowercase logo top-left at 30px margin, then a four-line bold headline at 60px (4.2vw), tracking -0.04em and leading near 1.0, top-left aligned and filling the upper 40%; the lower half is empty except for a one-line 18px tagline pinned bottom-left. Right: a staggered mosaic of seven portrait photos, each about 175 by 230px with 15px gaps, on a four-column, three-row grid with several cells left empty and the rightmost image cropped by the viewport edge. A white square menu button sits top-right.
  Worth taking: Split the hero 50/50 by background tone alone, park the headline top-left and one tagline bottom-left, and fill the other half with a staggered photo mosaic that leaves grid cells empty.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/hero-object/direction.json · reprint with `node draw.mjs --show`

# DIRECTION SHEET — The pinned poster
seed 104 · drawn 2026-11-04 · sector physical-product · tone bold
Brief: Bellis Australia: industrial mechanical insulation distributor, metal fabricator and installer serving LNG, power, mining, marine and defence plants

| | |
| --- | --- |
| Direction | The pinned poster |
| Hero | Window that opens to the edges |
| Type | Epilogue |
| Colour | Bubblegum and lime |
| Sections | features (Four cards dealt into a fan) → showcase (Cards crossing a held photograph) → how-it-works (One verb at a time) → proof (Names running off the edges) → stats (Figure on the photograph's edge) → list (Sticky photograph, active list) → contact (The email as display type) → cta (Last photograph, text beside) → footer (Invitation over a cropped name) |
| Motion | Pinned story |
| Photographs | the "Hands and making" set, as atmosphere |

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
Something stays put while everything else changes. A title holds its place across the viewport and the images beneath it swap; the name is split to two opposite corners and the page passes between the halves; a single frame stays centred while its contents change. Every scroll step is a new cover of the same magazine. The idea suits subjects that are a series (a book of portraits, a line-up, a collection, a set of projects): the fixed element says what the series is, the changing element shows its members.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A sticky layer holds the fixed element for the height of two to three viewports: usually the title at 10–14vw across the middle or top of the screen, or two words pinned to the top-left and bottom-right corners. Under it, a stack of full-height panels scrolls by, each a single large photograph (portrait 4:5, centred, 40–50% of the viewport wide) with one line of caption at the same small size everywhere. The title sits above the images in the stacking order and uses `mix-blend-mode: difference` or a solid colour that reads on every panel. When the pinned run ends, the page releases into ordinary flowing sections with a narrow measure. Build with `position: sticky`; never hijack the scroll.

## 3. Type — Epilogue
A broad black grotesque with a slightly uneven rhythm, at its best as a name set very large in mixed case. Suits entertainers, podcasts, consumer apps and blunt SaaS pages; emphasis comes from colour, not from a change of weight.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;900&display=swap" rel="stylesheet">
```
- Display: **Epilogue** — weight 900 · tracking -0.04em · leading 0.9 · sentence case or title case
- Text: **Epilogue** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2.5rem, 1.2rem + 5vw, 5.5rem);
}
```
The pinned title is the only large type on the page. Captions and body share one small size (15–17px). Tight tracking and solid weight so the title reads over photographs.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Bubblegum and lime
```css
:root {
  --bg: #ff87ab;
  --surface: #ff739d;
  --ink: #0a0a0a;
  --muted: #6b1f3a;
  --accent: #def915;
  --accent-ink: #0a0a0a;
  --field-1: #0a0a0a;  --field-1-ink: #ff87ab;
}
```
A flat bubblegum pink field with black type from top to bottom. Fluorescent lime is the action colour only: the menu button, one highlighter swipe behind a word and the main button.
One strong title colour against a pale or dark ground. Each panel may take its own flat ground colour sampled from its photograph.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node /home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/assets.mjs "physical product"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

A series of photographs with the same crop ratio and the same framing (all portraits, all objects, all rooms), so that swapping them reads as one image changing. Five to eight in the pinned run.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Hands and making" set (hands at work, craft and making)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/319/1600/1000` — Hands holding a vintage rangefinder camera against a denim jacket · mid tone · denim blue, mustard, silver · native landscape · photo: Kristian Karlsson
- `https://picsum.photos/id/1060/1600/1000` — Kettle pouring water over a pour-over coffee dripper on a dark counter · dark tone · dark teal, black, warm brown · native landscape · photo: Karl Fredrickson
- `https://picsum.photos/id/785/1600/1000` — Two cupped hands holding a pile of green spruce tips · mid tone · fresh green, dark green, warm skin · native landscape · photo: Jean Lakosnyk
- `https://picsum.photos/id/407/1600/1000` — Hands lighting a sparkler that throws bright sparks in the dark · dark tone · charcoal, warm white, amber · calm area: right · native landscape · photo: Kelley Bozarth
- `https://picsum.photos/id/674/1600/1000` — Cupped hands holding a heap of dark blue grapes · mid tone · pale blue, dark purple, tan · native landscape · photo: Maja Petric
- `https://picsum.photos/id/304/1600/1000` — Hand adjusting faders on an audio mixing console · mid tone · warm white, navy, amber · native landscape · photo: Drew Patrick Miller
- `https://picsum.photos/id/491/1600/1000` — Axe, hammer, pliers and leather gloves laid out on dark wood · dark tone · dark brown, tan, steel grey · native landscape · photo: Todd Quackenbush
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: plants-and-flowers, texture, object-still, coast — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Window that opens to the edges
A flat paper or pale ground, and one picture seen through a small window that becomes the whole screen as the page scrolls. The hero is a wrapper 200svh tall holding a stage with `position: sticky; top: 0; height: 100svh`. On the first frame the window is a 4:5 portrait opening 36% of the viewport wide (518×648px), centred, its top and bottom 126px from the edges, square corners; give it a shape from the subject if it has one (an arch, a rounded diamond, a lens). Build it as `clip-path: inset(126px 461px)` on a layer that is itself 100vw by 100svh, so the photograph or muted film inside is laid out full-bleed and never moves: only the opening grows. The headline sits left of the window on columns 1–3: two lines at clamp(44px, 4.4vw, 64px), leading 0.95, flush to the 32px margin, its last baseline level with the window's lower edge. Right of the window on columns 10–12, bottom-aligned to the same line: one supporting sentence at 18px, max 26ch, and the single action as a solid rectangular button. Wordmark top-left and three text links top-right at 15px on the same margin; nothing else sits on the ground. Over the first 100svh of scroll the inset runs to zero on a scroll-linked timeline while the text, which sits above the picture layer, rises and fades out before the opening reaches it; the picture then holds full-bleed for 50svh before the next section slides over it. Without scroll timelines, or under reduced motion, show the open picture with the headline over a neutral scrim in its bottom-left corner.

On a phone: The stage stays sticky. The window starts 78vw wide at 4:5, centred, its top at 30% of the height, leaving about a quarter of the screen below it. The headline sits above it at 10vw on two lines inside 20px margins, 72px down; the supporting sentence at 16px and a full-width action sit under the window. The opening reaches the edges within 70svh of scroll. The links fold behind a menu word.
Headline: Two short lines of up to about 9 characters each: the name with what it is, or a 2–4 word claim. It scrolls away as the picture takes the screen.

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
- It names a kind of typeface: use the dealt faces (display Epilogue, text Epilogue) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.
- It mentions a shadow: only on something open above the page (a menu, a dialog), never on a resting element.
- It pins something for three screens or more: hold a pin for two or three screens at most, give every screen under it its own content, and let nothing pass over the pinned words (the inspector checks all three).

### 2. showcase — Cards crossing a held photograph (carousel)
A wrapper about 350svh tall holds a sticky stage of 100svh. On the stage one full-bleed photograph of the subject's ground (a landscape, a material, an aerial texture) stays still, darkened evenly with `filter: brightness(0.6)`. Over it a track of four to six cards travels from right to left as the page scrolls (a `translateX` tied to the wrapper's scroll progress), so one card is always near the centre and the next shows about 300px at the right edge. Each card is 720×560px, square corners, vertically centred with 170px of photograph above and below it: its top 68% is a photograph of one item (a room, a building, a stop on the route), its lower 32% a flat panel in one earth tone from the palette, a different tone per card at a similar lightness, holding the item's name at clamp(32px, 3vw, 48px) bottom-left with 28px padding and a two-line description at 16px right-aligned beside it. Cards are 40px apart. The section heading, two to four words at clamp(40px, 4.4vw, 68px) in the paper colour, sits top-left on the stage over the photograph before the first card arrives and moves out ahead of it. Keep the run under three screens; at its end the stage releases into the next section.
On a phone: No pin and no sideways travel. The photograph runs full-bleed as a 4:5 band under the heading at 9vw, and the cards follow it at full width minus 16px margins, 24px apart, each a 4:3 photograph over its colour panel 140px tall, with the name at 26px and the description at 16px.

Adjusted for this page:
- It pins something for three screens or more: hold a pin for two or three screens at most, give every screen under it its own content, and let nothing pass over the pinned words (the inspector checks all three).

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

### 6. list — Sticky photograph, active list (split)
Two columns. The left, columns 1–5, is `position: sticky; top: 12vh` and holds one photograph or object at 4:5, 34vw wide, unframed on the ground. The right, columns 7–11, holds a vertical list of five to nine names (treatments, rooms, courses, services) at clamp(20px, 1.6vw, 24px), each row 58px tall with the name at the left and a price or duration right-aligned at 15px in the soft ink. The active row is full ink; the others rest at 40% opacity. Hovering, focusing or scrolling a row to the middle of the viewport makes it active, crossfades the left photograph to that item's image over 300ms, and opens a three-line description at 15px, 34ch wide, directly under the name, pushing later rows down. A heading of two or three words at clamp(32px, 3.4vw, 48px) sits above the list, aligned to its left edge, 48px above the first row.
On a phone: The photograph becomes a 4:3 band pinned to the top of the screen at 38svh while the list scrolls beneath it; the heading sits above the first row. Rows are 56px tall and the description opens on tap. The image changes with the row nearest the band.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 7. contact — The email as display type (statement)
The section is 100svh in the inverse of the page's colours. A single email address is set as one line of display type spanning the content width: the font-size is fitted so the address runs from margin to margin (about 7–9vw for 20 characters; break after the @ onto two lines if it is longer than 26), light or regular weight, tight tracking, sitting on a baseline 12vh above the bottom edge. It is a `mailto:` link; on hover the whole line takes the accent ink. In the top-left corner, a sentence of up to 12 words at 20–22px says what to write about. In the two bottom corners at 14px: phone and city at the left, two or three social links at the right. No heading and no form. For a pinned ending, make the section `position: sticky; bottom: 0` beneath the page so the previous section lifts off it.
On a phone: The address breaks after the @ onto two lines at 11.5vw, left-aligned, sitting at 55% of an 86svh screen. The sentence sits at the top-left at 18px. Phone, city and social links stack at the bottom-left at 15px with 12px between them.

### 8. cta — Last photograph, text beside (full-bleed)
A final full-bleed photograph, 100vw by 90svh, chosen so its subject sits in the left half and its right half is calm. All text is confined to the right half and never crosses the centre line: in columns 8–12, anchored to the lower third, a closing line of three to five words at about 3.4vw in a light weight, a paragraph of two or three lines at 17px, and one filled button in the paper colour with ink text, about 52px tall. If the image behind the text is not calm enough, darken the whole photograph slightly with `filter: brightness(0.8)` rather than laying a panel behind the words. The section butts directly against a footer in one solid colour, so the photograph's bottom edge is a hard line. No logo, no second action.
On a phone: The photograph is 100vw by 70svh, cropped to keep its subject. The text leaves the image and sits beneath it on the footer's solid colour: closing line at 28px, paragraph at 17px, full-width button. Image and colour meet at a hard edge.

### 9. footer — Invitation over a cropped name (statement)
Close and footer in one full-viewport field of the inverse colour. Upper third, columns 1–7: a two-line invitation at about 5vw, three to five words, with one filled rectangular button beneath it. At columns 10–12, top-aligned with the invitation, three or four social or contact links stacked at 16px. The wordmark fills the bottom of the screen at 26–30vw on one line, `white-space: nowrap`, heavier and larger than the viewport can hold: it is pushed down with `transform: translateY(30%)` so the bottom edge cuts through the letters, and a long name also runs off the right edge. `overflow: hidden` on the footer does the cropping. One row of credits and legal links at 13px sits directly above the wordmark's cap line, spread left and right. The cropped name must be recognisable from its upper two-thirds alone; test that it is.
On a phone: Invitation at 11vw on two lines at the top with a full-width button. Links follow as one row of words at 15px. The wordmark sits at 34vw at the bottom, cropped by both the bottom and the right edge, with the legal row above it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Pinned story
One element holds its place with `position: sticky` (a title, a frame, a product fragment) while the items that belong to it scroll past or swap inside it. The page's ordinary scrolling does the work; nothing is hijacked. Hold it for about one screen per step and three screens at most, two held stages per page at most, with a line of text on every held screen. Recipe: 'Pinned story' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Repetition with change. The fixed title makes each new photograph feel like an event, so the photographs must be good and consistent.

## 11. How this direction goes wrong
If the title is not legible over every panel, the idea fails: test each one. Keep the pinned run under six viewports or it feels like a trap. On a phone the title shrinks to 16–18vw and stays pinned at the top; panels become full-width. A pin longer than three screens, or one where the screens under it are nearly empty, read in blind tests as a stuck page. Every screen under the pin needs its own content, and nothing may pass over the pinned words.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **NORMAL IS BORING** (Awwwards Site of the Day, studied score 7.3) `aww-normal-is-boring`
  Idea: The brand name is split and half of it turned upside down: a plain sans first word top-left and a serif last word flipped 180 degrees bottom-right stay fixed while panels slide sideways between them.
  Hero: A white panel fills the left 80%; a full-height interior photo takes the right 20%. Top-left: the first word of the name in light geometric capitals, about 56px. Bottom-right of the white panel: an italic 'is' above the last word in bold didone, rotated 180 degrees so it reads upside down. Three small caps nav links run vertically up the panel's right edge. The 50px headline is broken into three two-line fragments on different columns and baselines: one at 21% from the left, one a line lower at 42%, one back at 21% whose last word turns bold italic didone. A seven-line 13px paragraph hangs beneath the middle fragment.
  Worth taking: Split a two-part brand name into opposite corners of the viewport and flip one half 180 degrees so the logo enacts the name.
- **City of Angels** (One Page Love, studied score 7.6) `opl-city-of-angels`
  Idea: A fixed poster: the book title stays pinned across the viewport while portraits and press quotes swap underneath it, so every scroll step is a new cover.
  Hero: Pale icy-blue page. The title runs as one line of extra-bold uppercase grotesk at 10vw, centred, spanning about 82% of the width in saturated cyan, 120px from the top. A single portrait photograph, 37% of the viewport wide and nearly full height, is centred beneath; the title crosses over its upper quarter, so the middle letters sit on the image. The author name sits top-centre in small bold caps, a two-bar menu icon top-right. Bottom-left, a 13-line bold paragraph in a narrow 340px column; bottom-right, a solid black five-point star about 70px wide.
  Worth taking: Pin one giant title across the viewport and let a single centred image change beneath it, with the type overprinting the photo's top quarter.
- **Ciao Energy** (Awwwards Site of the Day, studied score 7.6) `aww-ciao-energy-launch-website`
  Idea: The can is the whole website: one fixed real-time 3D studio scene in which the camera travels from a flavour carousel to extreme close-ups of the can's own label, where each claim is paired with the ingredient that was taken out, and the copy is a thin layer over the product.
  Hero: A fixed full-viewport 3D canvas on a dark grey studio floor fading to black over the top 40%. A metallic can stands dead centre (about 16% of the width, half the height), tilted about 10 degrees, between a chrome ring hovering above and a dark plinth below; six darker, smaller cans recede on a shallow arc behind it, the outer two cut by the viewport edges. The flavour name sits on the plinth in two lines of heavy italic uppercase at about 36px, over a 480px slider and a small scroll prompt; thin chevrons about 140px either side of the can change flavour. A centred logo about 125px wide at the top, a sound toggle left, a white contact pill right. No headline: the benefits arrive one scroll later.
  Worth taking: For a single physical product, keep one fixed full-viewport render and move the camera, never the layout: beats of about 1.25 viewports, each with its own angle, plus real DOM text so a slow GPU or a failed WebGL context still shows every claim.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/checks/pinned-poster/direction.json · reprint with `node draw.mjs --show`

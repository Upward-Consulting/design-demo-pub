# Token file proposal (lifted from approved demo B), for the owner's go-ahead

**Where it goes:** a new file `src/styles/tokens.css`, imported by one line at the top of `src/index.css` (the global stylesheet the app and the workbench both load). Nothing existing is renamed or removed (the scaffold has no tokens yet). **Prefix:** `--bl-` (Bellis). Names are lowercase, semantic by role; B's `--dB-*` values are copied exactly. After writing, every token is verified by computed style on `:root` (`token-audit.js`) and against matching elements of demo B at 1440, 820 and 390 (`measure-computed.js`), and `token-check.py` must report 0 errors.

**Source:** `src/design-system/demos/B/demo.css` (approved 2026-11-04). Colour, font, margin, button height, radius, the three text steps, the eases, the focus ring and the z-index layers are B's own declared values or literals, copied exactly; the display-size steps (`xl` to `s`) and the duration and border tokens name literals that the demo repeats, so the lift names them and each is checked against the demo's computed styles, dealt sheet `.ds-induction/taste/demos/B/direction.md` (seed 101). Palette kept as dealt (owner: "Keep the dealt palette").

## Colour (semantic; every ink on every field is `--bl-ink`, `#0a0a0a`)
| Token | Value | Role | B's name |
|---|---|---|---|
| `--bl-ground` | `#ffd249` | page ground, the hi-vis yellow voice | `--dB-bg` |
| `--bl-surface` | `#f5c63c` | tile one tone step off the ground | `--dB-tile` |
| `--bl-ink` | `#0a0a0a` | all text, black fields, borders | `--dB-ink` |
| `--bl-paper` | `#ffffff` | white fields, form fields | `--dB-paper` |
| `--bl-accent` | `#f53fd6` | magenta, **buttons only** | `--dB-accent` |
| `--bl-accent-hover` | `#e02cc0` | button hover (fine pointers) | `--dB-accent-hover` |
| `--bl-field-pink` | `#ffc4ef` | section field | `--dB-pink` |
| `--bl-field-cyan` | `#a4f6f8` | section field | `--dB-cyan` |
| `--bl-field-orange` | `#f9a21f` | section field | `--dB-orange` |
| `--bl-step-1` … `--bl-step-4` | `#e8730c` `#f49a1f` `#f9b84a` `#fcd58a` | the four-step tint ladder (accordion, bands) | `--dB-step-1..4` |

## Type
| Token | Value | Role |
|---|---|---|
| `--bl-font-display` | `'Red Hat Display', 'Arial Black', system-ui, sans-serif` | display: weight 900, lowercase, leading 0.9, tracking -0.03em |
| `--bl-font-text` | `'Red Hat Text', system-ui, sans-serif` | body 400, emphasis 500/700 |
| `--bl-t-small` | `1rem` | smallest text (16 px) |
| `--bl-t-body` | `clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)` | body (18–20 px) |
| `--bl-t-lead` | `clamp(1.25rem, 1.12rem + 0.5vw, 1.5rem)` | lead paragraph |
| `--bl-t-display-xl` | `10.6vw` | page h1 (the demo's hero) |
| `--bl-t-display-l` | `8.4vw` | section statements (job fields, band headings) |
| `--bl-t-display-m` | `7vw` | secondary statements |
| `--bl-t-display-s` | `clamp(1.75rem, 2.6vw, 2.75rem)` | card and slip headings |
The demo also sets a few one-off sizes (the 22vw footer wordmark, the 13vw stats figure, `min(…vw, …svh)` opener sizes). These are recorded as deliberate one-offs of their components, not tokens.

## Space, shape, control
| Token | Value | Role |
|---|---|---|
| `--bl-margin` | `24px` (`16px` at ≤ 599 px) | page margin, one pair for the whole site |
| `--bl-btn-h` | `56px` | button and field height |
| `--bl-radius` | `0px` | one corner radius: square |
| `--bl-border` / `--bl-border-strong` | `2px` / `3px` | header-button border / form-field border (the demo uses both) |
| `--bl-focus-ring` | `3px solid var(--bl-ink)`, offset `3px` (ground colour on black fields) | focus |
| `--bl-content` | `1392px` max content width at 1440 (`100% - 2 × margin`) | content width |

## Motion and layers
| Token | Value | Role |
|---|---|---|
| `--bl-ease-arrive` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrances |
| `--bl-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | transitions |
| `--bl-dur-hover` | `200ms` | hover colour (the demo's `background-color 200ms`; its press transform is `140ms`) |
| `--bl-dur-reveal` | `700ms` | entrances (the demo: transform `700ms` with a `70ms` stagger; the masked headline `800ms`) |
| `--bl-dur-menu-in` / `--bl-dur-menu-out` | `600ms` / `250ms` | full-screen menu open and close (as the demo) |
| `--bl-z-header` / `--bl-z-menu` | `20` / `100` | the demo's two layers (`60` for the pause control becomes `--bl-z-control`) |

## Breakpoints (listed once, used as literals in every media query)
`599px` (phone), `1039px` (tablet and below) / `1040px` (desktop), plus the verified widths 320, 390, 820, 1440.

## Not lifted
`--story-vh` stays in the story kit (it is the kit's). The demo's per-section picture and cut-out positions stay with their components.

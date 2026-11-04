// The Candidate Board's slots and statuses. Lead-owned: builders never edit this file.
// Statuses change only on the owner's verdicts (06-candidate-board.md §§ 8–10). Never renumber a slot; never delete one.
import type { Manifest } from './workbench/types';

export const manifest: Manifest = {
  title: 'Design System — Candidate Board',
  app: 'Bellis Australia website (design v5)',
  date: '2026-11-04',
  baseline: 'Approved demo B (loud-flat-poster, 2026-11-04). A not chosen. B2 is a Home-opener revision awaiting comparison.',
  legend: 'safe variants take the first letters, explorative the rest · chips: Proposed → Passed / Discarded → Final',
  contentWidth: '1312px',
  // Demo proposals (?view=demos), before the system exists. The same page keys in every demo; statuses change only on
  // the owner's ruling. Once a demo is approved, `baseline` names it and the board's slots start from its instances.
  demos: [
    {
      key: 'A', direction: 'editorial-report — The printed annual', status: 'Not chosen (2026-11-04)',
      note: "On this site, the engineer's job report becomes the page: the LNG carrier as masthead, a fixed column axis with the figures in the margin, solid colour blocks. Young Serif / Source Serif 4; soot, white, pale lime. Pictures: the client's own.",
      pages: [
        { key: 'home', label: 'Home', mode: 'page' },
        { key: 'products', label: 'Products', mode: 'page' },
        { key: 'corrosion', label: 'Corrosion control', mode: 'page' },
        { key: 'contact', label: 'Contact', mode: 'page' },
      ],
    },
    {
      key: 'B', direction: 'loud-flat-poster — Loud and flat', status: 'Approved (2026-11-04)',
      note: "On this site, the hi-vis vest every crew wears becomes the poster's ground: flat safety-yellow chapters, blunt statements at full volume, product cut-outs stuck on at a tilt. Red Hat Display 900 / Red Hat Text. Pictures: the client's own.",
      pages: [
        { key: 'home', label: 'Home', mode: 'page' },
        { key: 'products', label: 'Products', mode: 'page' },
        { key: 'corrosion', label: 'Corrosion control', mode: 'page' },
        { key: 'contact', label: 'Contact', mode: 'page' },
      ],
    },
    {
      key: 'B2', direction: 'loud-flat-poster — Loud and flat (Home v2)', status: 'Proposed (Home opener revision of B)',
      note: "Same as B on every page except Home: the held opener carries 12 words or fewer and nothing arrives as text while the stage is held; the five blunt statements follow as page content. For a side-by-side comparison of Home.",
      pages: [
        { key: 'home', label: 'Home', mode: 'page' },
        { key: 'products', label: 'Products', mode: 'page' },
        { key: 'corrosion', label: 'Corrosion control', mode: 'page' },
        { key: 'contact', label: 'Contact', mode: 'page' },
      ],
    },
  ],
  slots: [
    // {
    //   slot: 'S-14', entry: '5.54', name: 'Testimonial card',
    //   need: 'reviews on service screens', where: 'service §5, home', constraints: 'radius --np-radius-md, no shadow, quote type np-t-quote',
    //   ground: 'var(--np-ground-tint)', wave: 3, status: 'Proposed',
    //   variants: [
    //     { key: 'A', level: 'safe', status: 'Proposed' },
    //     { key: 'B', level: 'safe', status: 'Proposed' },
    //     { key: 'C', level: 'explorative', status: 'Proposed' },
    //   ],
    // },
  ],
};

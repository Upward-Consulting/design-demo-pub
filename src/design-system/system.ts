// The design system pages: chapters and entry sheets. Lead-owned (or one promoter at a time, handed over explicitly).
// Only promoted components and golden instances, through their example files (system-pages.md). The docs win:
// when a sheet and its doc disagree, fix this file from the doc.
import type { SystemPages } from './workbench/types';

export const system: SystemPages = {
  brand: '<Brand>',
  skill: '<app-slug>-ui-operations',
  updated: '<date>',
  chapters: [
    {
      id: '2',
      name: 'Foundations',
      intro: 'Tokens rendered live from the token file: palette, type ladder, spacing, radii, elevation.',
      specimens: [
        // { kind: 'color', label: 'Palette', tokens: ['--np-ink', '--np-action', '--np-ground', '--np-ground-tint'] },
        // { kind: 'type', label: 'Type ladder', classes: ['np-t-h1', 'np-t-h2', 'np-t-body', 'np-t-small'] },
        // { kind: 'size', label: 'Spacing', tokens: ['--np-space-1', '--np-space-2', '--np-space-4', '--np-space-8'] },
        // { kind: 'radius', label: 'Radii', tokens: ['--np-radius-sm', '--np-radius-md', '--np-radius-lg'] },
      ],
    },
    // {
    //   id: '5', name: 'Components', intro: 'Atoms: what every screen is built from.',
    //   entries: [{
    //     id: '5.54', name: 'Testimonial card', status: 'Final 2026-10-24',
    //     definition: 'A client quote with name and role, portrait by default, landscape on wide sections.',
    //     examples: ['5.54/portrait', '5.54/landscape'],
    //     states: [{ state: 'Focus (whole-card link)', example: '5.54/portrait-focus' }],
    //     usage: ['Service screens §5 and home; three per row on desktop.', 'Not for press quotes → 5.07 Blockquote.'],
    //     accessibility: ['<article> with the quote in <blockquote>; the name is text, not a heading.'],
    //     build: [
    //       { label: 'Import', value: "import { TestimonialCard } from '@/components/ui/TestimonialCard'" },
    //       { label: 'Doc', value: 'design-system/components/testimonial-card.md' },
    //       { label: 'Board', value: 'S-14 A2, C · decision 5 (2026-10-24)' },
    //     ],
    //   }],
    // },
  ],
};

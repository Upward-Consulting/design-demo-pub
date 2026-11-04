// Shapes of the workbench's two lead-owned data files (manifest.ts, system.ts) and of the lazily loaded modules.
import type { ComponentType } from 'react';

export type Level = 'safe' | 'explorative' | 'golden';

export interface ManifestVariant {
  /** Letter (A, B, A2, E…), 'Golden' or 'Probe'. The file is board/<slot without the dash>/<key>.tsx (S-14 C → board/S14/C.tsx). */
  key: string;
  level: Level;
  /** Proposed · Passed (<date>) · Discarded (<date>) · Superseded by A2 · Final (<date>) · Not in final set */
  status: string;
  /** Retry round (1 when absent); the board prints a round label where it changes. */
  round?: number;
}

export interface ManifestSlot {
  /** 'S-14' */
  slot: string;
  /** Catalogue entry id, '5.54' */
  entry: string;
  name: string;
  need: string;
  where: string;
  constraints: string;
  /** CSS background of the ground the entry lives on, e.g. 'var(--np-ground-tint)'. */
  ground?: string;
  /** True for blocks that span the viewport (heroes, full sections): no content-width wrapper, no frame padding. */
  fullBleed?: boolean;
  wave?: number;
  /** Proposed · Passed: A, C (<date>) · Retry: round 2 (<date>) · Final: A2, C (<date>) · Dropped by the owner (<date>) · Reopened (<date>) */
  status: string;
  variants: ManifestVariant[];
}

/** One page of a demo proposal. */
export interface ManifestDemoPage {
  /** The URL key: 'home', 'portfolio', 'about'. Every demo uses the same keys for the same pages. */
  key: string;
  label: string;
  /** The mode the owner ruled for the page's route family. */
  mode?: 'page' | 'story' | 'screen';
}

/** A demo proposal: a small working site in one dealt direction, built before the design system. */
export interface ManifestDemo {
  /** Letter: A, B, C; a revision is B2. The file is demos/<key>/demo.tsx. */
  key: string;
  /** The dealt direction: '<id> — <name>'. */
  direction: string;
  /** Proposed · Superseded by B2 · Approved (<date>) · Approved with grafts: <…> (<date>) · Not chosen (<date>) · Re-dealt (<date>) */
  status: string;
  pages: ManifestDemoPage[];
  /** One line for the owner: the idea sentence, what the pictures are. */
  note?: string;
}

export interface Manifest {
  title: string;
  app: string;
  /** Date of the current wave. */
  date: string;
  /** Golden routes, the micro-variant, or the approved demo. */
  baseline: string;
  legend?: string;
  /** The app's content width, e.g. 'var(--np-content)' or '1312px'. */
  contentWidth?: string;
  slots: ManifestSlot[];
  /** Demo proposals (?view=demos), before the system exists. */
  demos?: ManifestDemo[];
}

/** Props of a demo's default export (demos/<key>/demo.tsx): the page to show, and how to link to another page. */
export interface DemoProps {
  page: string;
  /** URL of another page of the same demo, for its own navigation: href('about'). */
  href: (page: string) => string;
}

/** A lazily loaded demo module. */
export interface DemoModule {
  default: ComponentType<DemoProps>;
}

/** `meta` of a board variant file (`Variant.meta = {…}` on the default export): the caption. */
export interface VariantMeta {
  name?: string;
  does?: string;
  note?: string;
}

/** `meta` of an example file (`Example.meta = {…}` on the default export). */
export interface ExampleMeta {
  entry?: string;
  name?: string;
  variant?: string;
  role?: string;
  ground?: string;
  fullBleed?: boolean;
  board?: string;
}

/** A lazily loaded file. Its caption is a property of the default export (`Variant.meta = {…}`), which keeps the file
 *  exporting components only (eslint-plugin-react-refresh); a named `export const meta` is read too, for repos without that rule. */
export interface LoadedModule<M> {
  default: ComponentType & { meta?: M };
  meta?: M;
}

export interface Specimen {
  kind: 'color' | 'type' | 'size' | 'radius' | 'shadow';
  label: string;
  /** Custom property names, '--np-ink' (color, size, radius, shadow). */
  tokens?: string[];
  /** Global class or utility names (type). CSS-Module or component type styles: show them through examples instead. */
  classes?: string[];
  sample?: string;
}

export interface EntrySheet {
  /** '5.54' */
  id: string;
  name: string;
  /** 'Final 2026-10-24' or 'Golden 2026-10-21' */
  status: string;
  definition: string;
  /** Example keys under examples/: '5.54/portrait' → examples/5.54/portrait.example.tsx */
  examples: string[];
  states?: { state: string; example?: string; note?: string }[];
  usage?: string[];
  accessibility?: string[];
  build?: { label: string; value: string }[];
}

export interface Chapter {
  /** Catalogue section number: '2', '4', '5' … */
  id: string;
  name: string;
  intro: string;
  /** Catalogue group when a chapter is split (?view=system&chapter=5&group=forms). */
  group?: string;
  specimens?: Specimen[];
  /** Plain text sections (Content chapter, Resource sets). */
  sections?: { heading: string; lines: string[] }[];
  entries?: EntrySheet[];
}

export interface SystemPages {
  brand: string;
  skill: string;
  updated: string;
  chapters: Chapter[];
}

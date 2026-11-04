/// <reference types="vite/client" />
// Lazy module maps for the board, the examples, the scratch views and the demo proposals (Vite's import.meta.glob).
// Every module becomes a React.lazy component, created once at module load: nothing is fetched until it renders,
// a file that fails to compile or throws only breaks its own frame (each sits in an error boundary), and a
// builder's single-variant view loads its one file and nothing else.
// Next.js / webpack: import.meta.glob does not exist — replace each glob with an explicit object of loaders,
// e.g. { '../board/S14/C.tsx': () => import('../board/S14/C') }, one line per file (README.md).
import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import type { DemoModule, DemoProps, ExampleMeta, LoadedModule, VariantMeta } from './types';

export interface FrameProps<M> {
  /** Receives the module's rendered default export and its `meta`, returns what the frame shows. */
  frame: (node: ReactNode, meta: M | undefined) => ReactNode;
}

type Framed<M> = LazyExoticComponent<ComponentType<FrameProps<M>>>;

function framed<M>(load: () => Promise<LoadedModule<M>>): Framed<M> {
  return lazy(async () => {
    const mod = await load();
    const Inner = mod.default;
    const meta = mod.meta ?? mod.default.meta;
    function Loaded({ frame }: FrameProps<M>) {
      return <>{frame(<Inner />, meta)}</>;
    }
    return { default: Loaded };
  });
}

function keyed<M>(
  files: Record<string, () => Promise<LoadedModule<M>>>,
  base: string,
  strip: RegExp,
  accept?: RegExp,
): Record<string, Framed<M>> {
  const out: Record<string, Framed<M>> = {};
  for (const [path, load] of Object.entries(files)) {
    const at = path.indexOf(base);
    if (at < 0) continue;
    const key = path.slice(at + base.length).replace(strip, '');
    if (accept && !accept.test(key)) continue;
    out[key] = framed(load);
  }
  return out;
}

/** 'S14/C' → board/S14/C.tsx. Only <slot>/<letter>.tsx files are variants: helpers go in a sub-folder or carry a dot (C.parts.tsx). */
export const variants = keyed(
  import.meta.glob<LoadedModule<VariantMeta>>('../board/*/*.tsx'),
  '/board/',
  /\.tsx$/,
  /^S\d+\/(Golden|Probe|[A-Z]\d*)$/,
);

/** '5.54/portrait' → examples/5.54/portrait.example.tsx; templates: 'templates/service' → examples/templates/service.example.tsx */
export const examples = keyed(
  import.meta.glob<LoadedModule<ExampleMeta>>('../examples/**/*.example.tsx'),
  '/examples/',
  /\.example\.tsx$/,
);

/** 'batch2/ServiceHero.verify' → scratch/batch2/ServiceHero.verify.tsx */
export const scratch = keyed(import.meta.glob<LoadedModule<Record<string, unknown>>>('../scratch/**/*.tsx'), '/scratch/', /\.tsx$/);

/** 'B' → demos/B/demo.tsx; a revision 'B2' → demos/B2/demo.tsx. Only <key>/demo.tsx is a demo: its pages, parts,
 *  styles and pictures live beside it in the same folder. */
export const demos: Record<string, LazyExoticComponent<ComponentType<DemoProps>>> = {};
for (const [path, load] of Object.entries(import.meta.glob<DemoModule>('../demos/*/demo.tsx'))) {
  const key = /\/demos\/([A-Z]\d*)\/demo\.tsx$/.exec(path)?.[1];
  if (key) demos[key] = lazy(load);
}
/** URL of one demo page; a demo's own links use the `href` prop, which calls this. */
export const demoHref = (d: string, page: string) => `?view=demo&d=${encodeURIComponent(d)}&page=${encodeURIComponent(page)}`;
/** URL of the comparison view, on one page. */
export const demosHref = (page?: string) => '?view=demos' + (page ? `&page=${encodeURIComponent(page)}` : '');

/** 'S-14' → 'S14' (the board folder) */
export const slotFolder = (slot: string) => slot.replace(/-/g, '');
/** 'S-14' → 's14' (the slot anchor; a variant is 's14-c') */
export const slotAnchor = (slot: string) => slotFolder(slot).toLowerCase();
/** '5.54' → 'e5-54' (the entry sheet anchor; an example is 'e5-54-<file name>') */
export const entryAnchor = (id: string) => 'e' + id.replace(/\./g, '-');
/** URL of a chapter view */
export const chapterHref = (id: string, group?: string) =>
  `?view=system&chapter=${encodeURIComponent(id)}` + (group ? `&group=${encodeURIComponent(group)}` : '');

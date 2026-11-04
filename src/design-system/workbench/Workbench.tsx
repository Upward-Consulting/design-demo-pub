// View switch. The URL decides the view once per load (links between views are plain <a href> navigations):
//   ?view=board[&wave=2][&slot=S-14]            the Candidate Board
//   ?view=variant&slot=S-14&v=C[&ground=<css>]  one variant alone, for its builder (story chapters run live)
//   ?view=variant&slot=S-14&v=C&still=1          the same, story chapters at rest: their finished composition
//   ?view=system[&chapter=5[&group=forms]]      the design system pages
//   ?view=scratch&file=<batch>/<Name>.verify     a Phase 8 composition from the docs
//   ?view=demo&d=B&page=about[&still=1]          one page of a demo proposal, alone (before the system exists)
//   ?view=demos[&page=home]                      every demo's same page side by side, for the owner's ruling
import { Suspense } from 'react';
import { manifest } from '../manifest';
import { system } from '../system';
import { Board, VariantSolo } from './Board';
import { DemoCompare, DemoView } from './Demos';
import { Boundary, ErrorFrame, Loading } from './parts';
import { scratch } from './registry';
import { ChapterPage, SystemIndex } from './SystemPages';

const params = new URLSearchParams(window.location.search);
const view = params.get('view') ?? 'board';
const optional = (name: string) => params.get(name) ?? undefined;
const wave = Number.parseInt(params.get('wave') ?? '', 10);

export function Workbench() {
  switch (view) {
    case 'variant':
      return <VariantSolo manifest={manifest} slot={params.get('slot') ?? ''} v={params.get('v') ?? ''} ground={optional('ground')} still={params.has('still')} />;
    case 'system': {
      const chapter = params.get('chapter');
      return chapter ? <ChapterPage system={system} id={chapter} group={optional('group')} /> : <SystemIndex system={system} />;
    }
    case 'scratch':
      return <ScratchView file={params.get('file') ?? ''} />;
    case 'demo':
      return <DemoView manifest={manifest} d={params.get('d') ?? ''} page={optional('page')} still={params.has('still')} />;
    case 'demos':
      return <DemoCompare manifest={manifest} page={optional('page')} />;
    default:
      return <Board manifest={manifest} wave={Number.isNaN(wave) ? undefined : wave} slot={optional('slot')} />;
  }
}

function ScratchView({ file }: { file: string }) {
  const Lazy = scratch[file];
  return (
    <main className="dsx-solo" data-ds={`scratch ${file}`}>
      {Lazy ? (
        <Boundary label={file}>
          <Suspense fallback={<Loading label={file} />}>
            <Lazy frame={(node) => node} />
          </Suspense>
        </Boundary>
      ) : (
        <ErrorFrame label={file} message={`no file src/design-system/scratch/${file}.tsx`} />
      )}
    </main>
  );
}

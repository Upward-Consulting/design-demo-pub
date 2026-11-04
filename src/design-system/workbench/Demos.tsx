// Demo proposals (the induction skill's demo-proposals reference): small working sites, one per dealt direction, built
// before the design system so the owner chooses a design language from pages that work rather than from a sheet.
//   ?view=demo&d=B&page=about   one demo page alone, no furniture: what its builder measures, the URL the gate opens
//   ?view=demo&d=B&page=home&still=1   the same, story chapters at rest: their finished compositions
//   ?view=demos[&page=home]     every demo's same page side by side, desktop and phone, with its status from manifest.ts
import { Suspense } from 'react';
import { useScrollToHash } from './hooks';
import { Boundary, Chip, ErrorFrame, Loading } from './parts';
import { demoHref, demos, demosHref } from './registry';
import type { Manifest, ManifestDemo } from './types';

/** One demo page. The demo renders the whole page (its header, main and footer), so this wrapper is not a landmark. */
export function DemoView({ manifest, d, page, still }: { manifest: Manifest; d: string; page?: string; still?: boolean }) {
  useScrollToHash();
  const entry = manifest.demos?.find((x) => x.key === d);
  const key = page ?? 'home'; // the docs always pass &page=; the gate labels a page-less URL 'home' too
  const label = `demo ${d} ${key}`;
  const Lazy = demos[d];
  if (!Lazy) return <ErrorFrame label={label} message={`no file src/design-system/demos/${d}/demo.tsx`} />;
  if (entry && !entry.pages.some((p) => p.key === key)) {
    return <ErrorFrame label={label} message={`manifest.ts lists no page "${key}" for demo ${d}`} />;
  }
  return (
    <div className="dsx-demo" data-ds={label} data-story-rest={still ? '' : undefined}>
      <Boundary label={label}>
        <Suspense fallback={<Loading label={label} />}>
          <Lazy page={key} href={(p) => demoHref(d, p)} />
        </Suspense>
      </Boundary>
    </div>
  );
}

/** The owner's comparison: the same page of every demo, at desktop and phone width, each in its own frame. */
export function DemoCompare({ manifest, page }: { manifest: Manifest; page?: string }) {
  const list = manifest.demos ?? [];
  const pages = [...new Map(list.flatMap((x) => x.pages).map((p) => [p.key, p])).values()];
  const current = page ?? pages[0]?.key ?? 'home';
  return (
    <main className="dsx-page" data-ds="demos">
      <div className="dsx-head" data-ds-furniture="">
        <p className="dsx-kicker">Demo proposals · dev only · never shipped</p>
        <p className="dsx-title">{manifest.app}: one page, every design language</p>
        <p className="dsx-meta">
          Same words and pictures in each; only the design differs. Open a demo to use it at full size, then rule.
        </p>
        {pages.length > 0 ? (
          <p className="dsx-toc">
            {pages.map((p) => (
              <a key={p.key} href={demosHref(p.key)} aria-current={p.key === current ? 'page' : undefined}>
                {p.label}
                {p.mode && p.mode !== 'page' ? ` (${p.mode})` : ''}
              </a>
            ))}
          </p>
        ) : (
          <p className="dsx-meta">No demos yet: add them to src/design-system/manifest.ts.</p>
        )}
      </div>
      <div className="dsx-demos">
        {list.map((x) => (
          <DemoColumn key={x.key} demo={x} page={current} />
        ))}
      </div>
    </main>
  );
}

function DemoColumn({ demo, page }: { demo: ManifestDemo; page: string }) {
  const has = demo.pages.some((p) => p.key === page);
  const src = demoHref(demo.key, page);
  return (
    <div className="dsx-demo-col" data-ds={`demo-column ${demo.key}`}>
      <div className="dsx-slot-head" data-ds-furniture="">
        <p className="dsx-kicker">
          Demo {demo.key} · {demo.direction} <Chip text={demo.status} />
        </p>
        {demo.note ? <p className="dsx-meta">{demo.note}</p> : null}
        <p className="dsx-meta">
          <a href={src}>Open {page} live</a>
        </p>
      </div>
      {has ? (
        <div className="dsx-demo-shots">
          <Frame src={src} width={1440} height={900} scale={0.25} title={`Demo ${demo.key}, ${page}, desktop`} />
          <Frame src={src} width={390} height={844} scale={0.3} title={`Demo ${demo.key}, ${page}, phone`} />
        </div>
      ) : (
        <p className="dsx-meta" data-ds-furniture="">
          No {page} page in this demo.
        </p>
      )}
    </div>
  );
}

/** A real viewport of the given size, scaled down: the demo's own media queries see 1440 or 390, not the column. */
function Frame({ src, width, height, scale, title }: { src: string; width: number; height: number; scale: number; title: string }) {
  return (
    <div className="dsx-frame" style={{ width: width * scale, height: height * scale }}>
      <iframe src={src} title={title} width={width} height={height} loading="lazy" style={{ transform: `scale(${scale})` }} />
    </div>
  );
}

// The design system pages: the index (?view=system) and a chapter (?view=system&chapter=5[&group=forms]#e5-54).
// Content comes from system.ts (lead-owned); examples are the promoted components rendered by examples/**/*.example.tsx.
import { Suspense } from 'react';
import { useScrollToHash } from './hooks';
import { Boundary, Chip, ErrorFrame, Ground, Loading } from './parts';
import { chapterHref, entryAnchor, examples } from './registry';
import type { Chapter, EntrySheet, Specimen, SystemPages } from './types';

export function SystemIndex({ system }: { system: SystemPages }) {
  return (
    <main className="dsx-page" data-ds="system index">
      <div className="dsx-head" data-ds-furniture="">
        <p className="dsx-title">
          {system.brand} design system — index (updated {system.updated})
        </p>
        <p className="dsx-meta">
          The final system, one chapter per tier. Agents build from the UI skill {system.skill}.
        </p>
      </div>
      <ul className="dsx-index" data-ds-furniture="">
        {system.chapters.map((c) => (
          <li key={`${c.id}/${c.group ?? ''}`}>
            <a href={chapterHref(c.id, c.group)}>
              {c.id} {c.name}
              {c.group ? ` — ${c.group}` : ''}
            </a>
            {c.entries?.length ? (
              <ul>
                {c.entries.map((e) => (
                  <li key={e.id}>
                    <a href={`${chapterHref(c.id, c.group)}#${entryAnchor(e.id)}`}>
                      {e.id} {e.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}

const label = (c: Chapter) => `${c.id} ${c.name}${c.group ? ` — ${c.group}` : ''}`;

export function ChapterPage({ system, id, group }: { system: SystemPages; id: string; group?: string }) {
  useScrollToHash();
  const list = system.chapters;
  const at = list.findIndex((c) => c.id === id && (group === undefined || c.group === group));
  const chapter = list[at];
  if (!chapter) {
    return (
      <main className="dsx-page" data-ds="system missing">
        <p className="dsx-meta" data-ds-furniture="">
          No chapter {id}
          {group ? ` / ${group}` : ''} in system.ts. <a href="?view=system">Index</a>
        </p>
      </main>
    );
  }
  const prev = list[at - 1];
  const next = list[at + 1];
  return (
    <main className="dsx-page" data-ds={`system chapter ${chapter.id}`}>
      <div className="dsx-head" data-ds-furniture="">
        <p className="dsx-kicker">
          <a href="?view=system">← Index</a>
        </p>
        <p className="dsx-title">
          {chapter.id} {chapter.name}
          {chapter.group ? ` — ${chapter.group}` : ''}
        </p>
        <p className="dsx-meta">{chapter.intro}</p>
        {chapter.entries?.length ? (
          <p className="dsx-toc">
            {chapter.entries.map((e) => (
              <a key={e.id} href={`#${entryAnchor(e.id)}`}>
                {e.id} {e.name}
              </a>
            ))}
          </p>
        ) : null}
      </div>
      {chapter.specimens?.map((s) => (
        <SpecimenView key={s.label} specimen={s} />
      ))}
      {chapter.sections?.map((s) => (
        <Lines key={s.heading} heading={s.heading} lines={s.lines} />
      ))}
      {chapter.entries?.map((e) => (
        <EntryView key={e.id} entry={e} />
      ))}
      <p className="dsx-foot" data-ds-furniture="">
        <a href="?view=system">Index</a>
        {prev ? <a href={chapterHref(prev.id, prev.group)}>← {label(prev)}</a> : null}
        {next ? <a href={chapterHref(next.id, next.group)}>{label(next)} →</a> : null}
      </p>
    </main>
  );
}

function EntryView({ entry }: { entry: EntrySheet }) {
  const anchor = entryAnchor(entry.id);
  return (
    <section id={anchor} className="dsx-sheet" data-ds={`entry ${entry.id}`}>
      <div className="dsx-slot-head" data-ds-furniture="">
        <p className="dsx-kicker">
          {entry.id} {entry.name} <Chip text={entry.status} />
        </p>
        <p className="dsx-meta">{entry.definition}</p>
      </div>
      <p className="dsx-label" data-ds-furniture="">
        Examples
      </p>
      {entry.examples.map((k) => (
        <ExampleView key={k} exampleKey={k} anchorBase={anchor} />
      ))}
      {entry.states?.length ? (
        <>
          <p className="dsx-label" data-ds-furniture="">
            States
          </p>
          {entry.states.map((st) =>
            st.example ? (
              <ExampleView key={st.state} exampleKey={st.example} anchorBase={anchor} caption={st.state} />
            ) : (
              <p key={st.state} className="dsx-meta" data-ds-furniture="">
                <b>{st.state}</b> {st.note ?? ''}
              </p>
            ),
          )}
        </>
      ) : null}
      <Lines heading="Usage" lines={entry.usage} />
      <Lines heading="Accessibility" lines={entry.accessibility} />
      {entry.build?.length ? (
        <dl className="dsx-build" data-ds-furniture="">
          {entry.build.map((b) => (
            <div key={b.label}>
              <dt>{b.label}</dt>
              <dd>{b.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

function ExampleView({ exampleKey, anchorBase, caption }: { exampleKey: string; anchorBase: string; caption?: string }) {
  const Lazy = examples[exampleKey];
  const file = exampleKey.split('/').pop() ?? exampleKey;
  const id = `${anchorBase}-${file.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <article id={id} className="dsx-example" data-ds={`example ${exampleKey}`}>
      {Lazy ? (
        <Boundary label={exampleKey}>
          <Suspense fallback={<Loading label={exampleKey} />}>
            <Lazy
              frame={(node, meta) => (
                <>
                  <p className="dsx-caption" data-ds-furniture="">
                    <b>{caption ?? [meta?.variant, meta?.role].filter(Boolean).join(' — ')}</b>
                    {meta?.board ? ` · board ${meta.board}` : ''}
                  </p>
                  <Ground ground={meta?.ground} fullBleed={meta?.fullBleed}>
                    {node}
                  </Ground>
                </>
              )}
            />
          </Suspense>
        </Boundary>
      ) : (
        <ErrorFrame label={exampleKey} message={`no file src/design-system/examples/${exampleKey}.example.tsx`} />
      )}
    </article>
  );
}

function Lines({ heading, lines }: { heading: string; lines?: string[] }) {
  if (!lines?.length) return null;
  return (
    <div className="dsx-lines" data-ds-furniture="">
      <p className="dsx-label">{heading}</p>
      <ul>
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

/** Writes the token's computed value at commit time (a ref callback), so the page shows what the app really serves. */
const showComputed = (token: string) => (el: HTMLElement | null) => {
  if (el) el.textContent = getComputedStyle(document.documentElement).getPropertyValue(token).trim() || 'undefined';
};

function SpecimenView({ specimen }: { specimen: Specimen }) {
  return (
    <section className="dsx-specimen" data-ds={`specimen ${specimen.label}`}>
      <p className="dsx-label" data-ds-furniture="">
        {specimen.label}
      </p>
      <div className={`dsx-specimen-grid dsx-kind-${specimen.kind}`}>
        {specimen.kind === 'type'
          ? (specimen.classes ?? []).map((c) => (
              <div key={c} className="dsx-type-row">
                <code className="dsx-meta" data-ds-furniture="">
                  {c}
                </code>
                <p className={c}>{specimen.sample ?? 'The quick brown fox jumps over the lazy dog 0123456789'}</p>
              </div>
            ))
          : (specimen.tokens ?? []).map((t) => <Swatch key={t} kind={specimen.kind} token={t} />)}
      </div>
    </section>
  );
}

function Swatch({ kind, token }: { kind: Specimen['kind']; token: string }) {
  const value = `var(${token})`;
  const style =
    kind === 'color'
      ? { background: value }
      : kind === 'radius'
        ? { borderRadius: value }
        : kind === 'shadow'
          ? { boxShadow: value }
          : { width: value };
  return (
    <figure className={`dsx-swatch dsx-swatch-${kind}`} data-ds={`token ${token}`} data-ds-furniture="">
      <div className="dsx-swatch-sample" style={style} />
      <figcaption className="dsx-meta" data-ds-furniture="">
        <code>{token}</code> <code ref={showComputed(token)} />
      </figcaption>
    </figure>
  );
}

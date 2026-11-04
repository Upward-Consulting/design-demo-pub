// The Candidate Board (?view=board) and the single-variant view (?view=variant&slot=S-14&v=C).
// Slots and statuses come from manifest.ts (lead-owned); captions come from each variant file's `meta`.
import { Fragment, Suspense } from 'react';
import { useScrollToHash } from './hooks';
import { Boundary, Chip, ErrorFrame, Ground, Loading } from './parts';
import { slotAnchor, slotFolder, variants } from './registry';
import type { Manifest, ManifestSlot, ManifestVariant } from './types';

export function Board({ manifest, wave, slot }: { manifest: Manifest; wave?: number; slot?: string }) {
  useScrollToHash();
  const slots = manifest.slots.filter(
    (s) => (wave === undefined || s.wave === wave) && (slot === undefined || s.slot === slot),
  );
  return (
    <main className="dsx-page" data-ds="board" data-story-rest="">
      <div className="dsx-head" data-ds-furniture="">
        <p className="dsx-kicker">Candidate Board · dev only · never shipped</p>
        <p className="dsx-title">{manifest.title}</p>
        <p className="dsx-meta">
          {manifest.app} · {manifest.date} · baseline: {manifest.baseline}
          {wave !== undefined ? ` · wave ${wave}` : ''}
        </p>
        {manifest.legend ? <p className="dsx-meta">{manifest.legend}</p> : null}
        {slots.length > 0 ? (
          <p className="dsx-toc">
            {slots.map((s) => (
              <a key={s.slot} href={`#${slotAnchor(s.slot)}`}>
                {s.slot} {s.entry} {s.name}
              </a>
            ))}
          </p>
        ) : (
          <p className="dsx-meta">No slots{wave !== undefined ? ` in wave ${wave}` : ''} yet: add them to src/design-system/manifest.ts.</p>
        )}
      </div>
      {slots.map((s) => (
        <SlotView key={s.slot} slot={s} contentWidth={manifest.contentWidth} />
      ))}
    </main>
  );
}

function SlotView({ slot, contentWidth }: { slot: ManifestSlot; contentWidth?: string }) {
  return (
    <section id={slotAnchor(slot.slot)} className="dsx-slot" data-ds={`slot ${slot.slot}`}>
      <div className="dsx-slot-head" data-ds-furniture="">
        <p className="dsx-kicker">
          {slot.slot} · {slot.entry} {slot.name} <Chip text={slot.status} />
        </p>
        <p className="dsx-meta">
          <b>Need</b> {slot.need} · <b>Used</b> {slot.where} · <b>Constraints</b> {slot.constraints}
        </p>
      </div>
      {slot.variants.map((v, i) => {
        const round = v.round ?? 1;
        const previous = i > 0 ? (slot.variants[i - 1]?.round ?? 1) : 1;
        return (
          <Fragment key={v.key}>
            {round !== previous ? (
              <p className="dsx-round" data-ds-furniture="">
                Round {round}
              </p>
            ) : null}
            <VariantView slot={slot} variant={v} contentWidth={contentWidth} />
          </Fragment>
        );
      })}
    </section>
  );
}

function VariantView({ slot, variant, contentWidth }: { slot: ManifestSlot; variant: ManifestVariant; contentWidth?: string }) {
  const key = `${slotFolder(slot.slot)}/${variant.key}`;
  const Lazy = variants[key];
  const label = `${slot.slot} ${variant.key}`;
  return (
    <article
      id={`${slotAnchor(slot.slot)}-${variant.key.toLowerCase()}`}
      className="dsx-variant"
      data-ds={`variant ${slot.slot} ${variant.key}`}
    >
      {Lazy ? (
        <Boundary label={label}>
          <Suspense fallback={<Loading label={key} />}>
            <Lazy
              frame={(node, meta) => (
                <>
                  <p className="dsx-caption" data-ds-furniture="">
                    <b>
                      {variant.key} · {variant.level}
                    </b>
                    {meta?.name ? ` — ${meta.name}` : ''}
                    {meta?.does ? `: ${meta.does}` : ''}
                    {meta?.note ? ` · ${meta.note}` : ''} <Chip text={variant.status} />
                  </p>
                  <Ground ground={slot.ground} contentWidth={contentWidth} fullBleed={slot.fullBleed}>
                    {node}
                  </Ground>
                </>
              )}
            />
          </Suspense>
        </Boundary>
      ) : (
        <ErrorFrame label={label} message={`no file src/design-system/board/${key}.tsx`} />
      )}
    </article>
  );
}

/** One variant alone, no furniture: what its builder measures and screenshots. Story chapters run live here. */
export function VariantSolo({
  manifest,
  slot,
  v,
  ground,
  still,
}: {
  manifest: Manifest;
  slot: string;
  v: string;
  ground?: string;
  /** Story chapters show their finished composition (the still) instead of running: ?still=1. */
  still?: boolean;
}) {
  const entry = manifest.slots.find((s) => s.slot === slot);
  const key = `${slotFolder(slot)}/${v}`;
  const Lazy = variants[key];
  return (
    <main className="dsx-solo" data-ds={`variant ${slot} ${v}`} data-story-rest={still ? '' : undefined}>
      {Lazy ? (
        <Boundary label={`${slot} ${v}`}>
          <Suspense fallback={<Loading label={key} />}>
            <Lazy
              frame={(node) => (
                <Ground
                  ground={ground ?? entry?.ground}
                  contentWidth={manifest.contentWidth}
                  fullBleed={entry?.fullBleed}
                >
                  {node}
                </Ground>
              )}
            />
          </Suspense>
        </Boundary>
      ) : (
        <ErrorFrame label={`${slot} ${v}`} message={`no file src/design-system/board/${key}.tsx`} />
      )}
    </main>
  );
}

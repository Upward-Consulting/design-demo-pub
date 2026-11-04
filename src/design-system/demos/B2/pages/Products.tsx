// Products: the hero, the live filter (six flat colour buttons, one field per job, aria-pressed, the count announced politely,
// an empty state) and the eleven families as poster panels. A family with no fitting picture is a full flat colour field
// with its name set huge, never an empty slot. Words from the copy deck, except the labels listed in copy_added.
import { useState } from 'react';
import type { DemoProps } from '../../../workbench/types';
import { jobLabels, products, site } from '../../../content/demo-copy';
import type { JobKey } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import { Btn, Img, Rv } from '../parts/primitives';

// A picture per family where the pool has one that fits the family. Tapes and mastics have none that fits their lines.
const FAMILY_PIC: Record<string, Pic | null> = {
  cold: pictures.foamglasCryo,
  hot: pictures.pyrogelXte,
  acoustic: pictures.acousticFoam,
  fire: pictures.rockwool,
  cladding: pictures.stainlessTanker,
  banding: pictures.banding,
  tapes: null,
  mastics: null,
  fabrics: pictures.removableCovers,
  supports: pictures.foamglas,
  specialty: null,
};

// One flat colour per job (the page's palette; pink and cyan used once each).
const JOB_COLOUR: Record<JobKey, string> = {
  hot: 'var(--dB2-orange)',
  cold: 'var(--dB2-cyan)',
  acoustic: 'var(--dB2-paper)',
  fire: 'var(--dB2-pink)',
  corrosion: 'var(--dB2-bg)',
  access: 'var(--dB2-step-4)',
};
const JOB_KEYS = Object.keys(jobLabels) as JobKey[];

export function ProductsPage({ href }: DemoProps) {
  const [job, setJob] = useState<JobKey | null>(null);
  const shown = products.families.filter((f) => job === null || (f.jobs as readonly string[]).includes(job));
  const total = products.families.length;
  const count = shown.length;
  const shownKeys = new Set(shown.map((f) => f.key));
  const status =
    count === 0
      ? products.empty
      : job === null
        ? `Showing all ${total} families.`
        : `Showing ${count} of ${total} families for ${jobLabels[job].toLowerCase()}.`;

  return (
    <>
      <section className="b-hero b-hero--ground" aria-labelledby="products-h">
        <div className="b-hero__copy">
          <Rv className="b-hero__h">
            <h1 id="products-h" className="b-display b-mask">
              <span className="b-mask__in">{products.h1}</span>
            </h1>
          </Rv>
          <Rv index={1} className="b-hero__lead">
            <p className="b-lead">{products.lead}</p>
          </Rv>
          <Rv index={2} className="b-hero__act">
            <Btn href={href('contact')}>{site.cta}</Btn>
            <a className="b-phone" href={site.phoneHref}>
              {site.phone}
            </a>
          </Rv>
        </div>
        <Rv index={2} className="b-hero__pic">
          <Img pic={pictures.cutFoamglas} eager className="b-hero__img" style={{ maxWidth: pictures.cutFoamglas.maxW }} />
        </Rv>
      </section>

      <section className="b-filter" aria-labelledby="filter-h">
        <div className="b-filter__head">
          <h2 id="filter-h" className="b-display b-filter__h">
            {products.filterLabel}
          </h2>
          {job !== null ? (
            <button type="button" className="b-link-btn" onClick={() => setJob(null)}>
              {products.all}
            </button>
          ) : null}
        </div>
        <div className="b-jobs" role="group" aria-labelledby="filter-h">
          {JOB_KEYS.map((k) => {
            const on = job === k;
            return (
              <button
                key={k}
                type="button"
                className="b-job"
                style={{ ['--c' as string]: JOB_COLOUR[k] }}
                aria-pressed={on}
                onClick={() => setJob(on ? null : k)}
              >
                {jobLabels[k]}
              </button>
            );
          })}
        </div>
        <p className="b-filter__status" role="status" aria-live="polite">
          {status}
        </p>
      </section>

      <ul className="b-fams">
        {products.families.map((f, i) => {
          const pic = FAMILY_PIC[f.key] ?? null;
          const tone = pic ? (i % 2 === 0 ? 'ground' : 'paper') : f.key === 'mastics' ? 'cyan' : 'pink';
          return (
            <li key={f.key} className={`b-fam b-fam--${tone}${pic ? '' : ' b-fam--field'}`} hidden={!shownKeys.has(f.key)}>
              <Rv className="b-fam__panel">
                <h3 className="b-display b-fam__h">{f.name}</h3>
                {pic ? (
                  <div className="b-fam__pic">
                    <Img pic={pic} className="b-fam__img" style={{ maxWidth: pic.maxW }} />
                  </div>
                ) : null}
                <p className="b-fam__use">{f.use}</p>
                <ul className="b-slips" aria-label="Lines">
                  {f.lines.map((l) => (
                    <li key={l} className="b-slip">
                      {l}
                    </li>
                  ))}
                </ul>
                <a className="b-link-text" href={href('contact')}>
                  {products.enquire}
                  <span className="b-sr">: {f.name}</span>
                </a>
              </Rv>
            </li>
          );
        })}
      </ul>

      <section className="b-close b-close--ink" aria-labelledby="fams-close-h">
        <Rv>
          <h2 id="fams-close-h" className="b-display b-mask">
            <span className="b-mask__in">{products.closing.heading}</span>
          </h2>
        </Rv>
        <Rv index={1} className="b-close__row">
          <p className="b-lead">{products.closing.body}</p>
          <div className="b-close__act">
            <Btn href={href('contact')}>{products.closing.cta}</Btn>
            <a className="b-close__phone" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </Rv>
      </section>
    </>
  );
}

// Products: the eleven families, filterable by the job they do. The filter is the page's live thing: a row of six flat
// colour buttons (plus All), aria-pressed, one at a time. The list narrows in place; the count is announced politely.
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { jobLabels, products } from '../../../content/demo-copy';
import type { JobKey } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import { Btn, Img, Reveal } from '../parts/primitives';

type Href = (p: string) => string;
type Filter = JobKey | 'all';

const jobOrder: JobKey[] = ['hot', 'cold', 'acoustic', 'fire', 'corrosion', 'access'];
const jobColour: Record<JobKey, string> = {
  hot: 'var(--dB-orange)',
  cold: 'var(--dB-cyan)',
  acoustic: 'var(--dB-pink)',
  fire: 'var(--dB-bg)',
  corrosion: 'var(--dB-pink-2)',
  access: 'var(--dB-step-4)',
};

const pool = pictures as Record<string, Pic>;
function pictureFor(key: string | null): Pic | undefined {
  return key ? pool[key] : undefined;
}

// The count sentence is written here: the deck has no count wording (listed as copy_added in the report).
function countLine(shown: number, total: number): string {
  return `Showing ${shown} of ${total} families.`;
}

export function ProductsPage({ href }: { href: Href }) {
  const [filter, setFilter] = useState<Filter>('all');
  const total = products.families.length;
  const shown = products.families.filter((f) => filter === 'all' || (f.jobs as readonly string[]).includes(filter)).length;

  return (
    <>
      <section className="b-page-hero" aria-labelledby="products-h1">
        <h1 id="products-h1">
          About 90{' '}
          <br />
          product lines.
        </h1>
        <Reveal index={1} className="b-page-hero__lead">
          <p className="b-lead">{products.lead}</p>
        </Reveal>
      </section>

      <section className="b-filter" aria-labelledby="filter-label">
        <p className="b-filter__label" id="filter-label">
          {products.filterLabel}
        </p>
        <div className="b-filter__buttons" role="group" aria-labelledby="filter-label">
          <button
            type="button"
            className="b-job-btn b-job-btn--all"
            style={{ ['--c' as string]: 'var(--dB-ink)', ['--ch' as string]: '#262626' } as CSSProperties}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            {products.all}
          </button>
          {jobOrder.map((j) => (
            <button
              key={j}
              type="button"
              className="b-job-btn"
              style={{ ['--c' as string]: jobColour[j], ['--ch' as string]: 'var(--dB-white)' } as CSSProperties}
              aria-pressed={filter === j}
              onClick={() => setFilter(j)}
            >
              {jobLabels[j]}
            </button>
          ))}
        </div>
        <p className="b-filter__status" role="status" aria-live="polite">
          {countLine(shown, total)}
        </p>
        {shown === 0 ? <p className="b-filter__empty">{products.empty}</p> : null}
      </section>

      <section className="b-families" aria-label="Product families">
        <ul>
          {products.families.map((f, i) => {
            const show = filter === 'all' || (f.jobs as readonly string[]).includes(filter);
            const pic = pictureFor(f.pic);
            const flip = i % 2 === 1;
            return (
              <li key={f.key}>
                <div className="b-family-wrap" data-show={show ? 'true' : 'false'} inert={!show}>
                  <div>
                    <article className={`b-family${flip ? ' b-family--flip' : ''}`}>
                      <Reveal className="b-family__left">
                        <h2 className="b-family__name">{f.name}</h2>
                        <p className="b-family__use">{f.use}</p>
                        <ul className="b-family__chips" aria-label="Jobs">
                          {f.jobs.map((j) => (
                            <li key={j} className="b-chip" style={{ ['--c' as string]: jobColour[j] } as CSSProperties}>
                              {jobLabels[j]}
                            </li>
                          ))}
                        </ul>
                        {pic ? (
                          <div className="b-family__pic">
                            <Img pic={pic} />
                          </div>
                        ) : null}
                      </Reveal>
                      <Reveal index={1} className="b-family__right">
                        <ul className="b-family__lines">
                          {f.lines.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                        <p className="b-family__enq">
                          <a className="b-link-text" href={href('contact')}>
                            {products.enquire}
                          </a>
                        </p>
                      </Reveal>
                    </article>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="b-closing b-on-ink b-closing--short" aria-labelledby="products-close">
        <Reveal>
          <h2 id="products-close">{products.closing.heading}</h2>
        </Reveal>
        <Reveal index={1} className="b-closing__foot">
          <p>{products.closing.body}</p>
          <Btn href={href('contact')}>{products.closing.cta}</Btn>
        </Reveal>
      </section>
    </>
  );
}

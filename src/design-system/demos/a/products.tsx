import { useState } from 'react';
import { copy, pictures } from '../../content/demo-copy';
import { PROBLEM_RANGES, RANGE_PIC } from './catalogue';
import { Bend, href, Pic, PageShell, Ring, stagger } from './parts';

const ALL = 'All';

function Hero() {
  return (
    <section className="a-hero a-hero--short" aria-labelledby="a-title">
      <div className="a-hero__copy">
        <h1 id="a-title" className="a-title">
          {copy.products.title}
        </h1>
        <p className="a-lead">{copy.products.lede}</p>
        <div className="a-hero__extra">
          <a className="a-btn a-btn--lg" href={href('contact')} data-primary>
            {copy.actions.talk}
          </a>
          <a className="a-link" href={copy.contact.phoneHref}>
            {copy.actions.call}
          </a>
        </div>
      </div>
      <Ring />
      <Pic p={pictures.prod.foamglasCryo} className="a-hero__photo a-pic--shot" pos="38% 70%" />
    </section>
  );
}

function Catalogue() {
  const [problem, setProblem] = useState<string>(ALL);
  const [changed, setChanged] = useState(false);
  const keys = problem === ALL ? null : new Set(PROBLEM_RANGES[problem] ?? []);
  const shown = copy.productRanges.filter((r) => !keys || keys.has(r.key));
  const choose = (p: string) => {
    setProblem(p);
    setChanged(true);
  };

  return (
    <section className="a-section" id="ranges" aria-labelledby="a-catalogue-title" style={{ paddingTop: 'clamp(64px, 8vw, 112px)' }}>
      <div className="a-filter" role="group" aria-labelledby="a-filter-label" data-reveal>
        <span id="a-filter-label" className="a-filter__label">
          By problem
        </span>
        {[ALL, ...copy.products.problems].map((p) => (
          <button key={p} type="button" className="a-chip" aria-pressed={problem === p} onClick={() => choose(p)}>
            {p}
          </button>
        ))}
      </div>

      <div className="a-catalogue-head">
        <h2 id="a-catalogue-title" className="a-h2" data-reveal>
          {problem === ALL ? 'All ranges' : problem}
        </h2>
        <p className="a-muted" aria-live="polite" data-reveal style={stagger(1)}>
          {shown.length === 1 ? '1 range' : `${shown.length} ranges`}
        </p>
      </div>
      <p className="a-note" style={{ marginTop: 12 }}>
        {copy.products.stockNote}
      </p>

      <div key={problem} className={`a-catalogue${changed ? ' a-catalogue--changed' : ''}`}>
        {shown.map((r, i) => {
          const pic = RANGE_PIC[r.key];
          return (
            <article key={r.key} id={`range-${r.key}`} className="a-item" data-reveal style={stagger(changed ? i : i % 2)}>
              {pic ? (
                <Pic p={pic.p} pos={pic.pos} className={pic.crop ? 'a-pic--crop' : ''} />
              ) : (
                <div className="a-pic a-placeholder" data-placeholder={`range-${r.key}`} style={{ aspectRatio: '4 / 3' }}>
                  [photo: {r.title.toLowerCase()}]
                </div>
              )}
              <div>
                <h3>{r.title}</h3>
                <p>{r.lines}</p>
                <p className="a-item__use">
                  <Bend />
                  <span>
                    <span className="a-item__label">Used for:</span> {r.use}
                  </span>
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <PageShell page="products">
      <Hero />
      <Catalogue />
    </PageShell>
  );
}

// Products: the catalogue by job. The live thing: pick a job and the families that do it stay, the table's column for that job
// turns lime, and the count is announced politely. Filter buttons are toggle buttons (aria-pressed), so the keyboard and touch work.
import { useMemo, useState } from 'react';
import { jobLabels, products, site } from '../../content/demo-copy';
import type { JobKey } from '../../content/demo-copy';
import { pictures } from '../../assets/own/pictures';
import { Arrow, Img, vars } from './parts';

type Href = (page: string) => string;
type JobPick = JobKey | 'all';

const JOB_ORDER: JobKey[] = ['hot', 'cold', 'acoustic', 'fire', 'corrosion', 'access'];

export function Products({ href }: { href: Href }) {
  const [job, setJob] = useState<JobPick>('all');
  const families = products.families;
  const shown = useMemo(
    () => families.filter((f) => job === 'all' || (f.jobs as readonly string[]).includes(job)),
    [families, job],
  );

  return (
    <>
      <section className="a-mosaic-wrap" aria-label="Product photographs">
        <div className="a-mosaic">
          <figure className="a-masthead-img">
            <Img pic={pictures.foamglasCryo} eager />
          </figure>
          <figure className="a-masthead-img">
            <Img pic={pictures.rockwool} eager />
          </figure>
          <figure className="a-masthead-img">
            <Img pic={pictures.interam} eager />
          </figure>
          <figure className="a-masthead-img">
            <Img pic={pictures.pyrogelXte} eager />
          </figure>
        </div>
      </section>

      <section className="a-section a-paper" aria-labelledby="h-products" style={{ paddingTop: 96 }}>
        <div className="a-axis">
          <div className="a-side">
            <p className="a-lead" data-a-reveal="">
              {products.lead}
            </p>
          </div>
          <div className="a-main">
            <h1 id="h-products" className="a-h1" data-a-reveal="">
              <span className="a-line">
                <span style={vars({ line: 0 })}>About 90</span>
              </span>
              <span className="a-line">
                <span style={vars({ line: 1 })}>product lines.</span>
              </span>
            </h1>

            <div className="a-filter">
              <p id="filter-label" className="a-filter-label">
                {products.filterLabel}
              </p>
              <div className="a-filter-buttons" role="group" aria-labelledby="filter-label">
                <button type="button" className="a-chip" aria-pressed={job === 'all'} onClick={() => setJob('all')}>
                  {products.all}
                </button>
                {JOB_ORDER.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="a-chip"
                    aria-pressed={job === key}
                    onClick={() => setJob(job === key ? 'all' : key)}
                  >
                    {jobLabels[key]}
                  </button>
                ))}
              </div>
              <p className="a-count" role="status" aria-live="polite">
                <span key={shown.length} className="a-count-text">{`Showing ${shown.length} of ${families.length} families.`}</span>
              </p>
            </div>

          </div>
        </div>
        <div className="a-table-full">
            {shown.length === 0 ? (
            <p className="a-empty">{products.empty}</p>
          ) : (
            <div className="a-table-wrap">
              <table className="a-table">
                <caption>Product families and the jobs they do</caption>
                <colgroup>
                  <col className="a-col-fam" />
                  <col className="a-col-lines" />
                  {JOB_ORDER.map((key) => (
                    <col key={key} className="a-job-col" />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">Family</th>
                    <th scope="col">Lines</th>
                    {JOB_ORDER.map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className={`a-job-col${job === key ? ' is-picked' : ''}`}
                      >
                        {jobLabels[key]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody key={job}>
                  {shown.map((f) => (
                    <tr key={f.key} data-a-reveal="">
                      <th scope="row" className="a-col-fam">
                        <span className="a-fam-name">{f.name}</span>
                        <span className="a-fam-use">{f.use}</span>
                        <a className="a-fam-enq" href={href('contact')}>
                          {products.enquire}
                        </a>
                      </th>
                      <td className="a-col-lines">
                        <ul className="a-lines">
                          {f.lines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </td>
                      {JOB_ORDER.map((key) => {
                        const yes = (f.jobs as readonly string[]).includes(key);
                        const picked = job === key;
                        const cls = ['a-job-col', picked ? 'is-picked' : '', yes ? 'is-yes' : ''].filter(Boolean).join(' ');
                        return (
                          <td key={key} className={cls}>
                            {yes ? <strong>Yes</strong> : 'No'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="a-section a-lime" aria-labelledby="h-closing">
        <div className="a-axis">
          <div className="a-side">
            <h2 id="h-closing" className="a-h2" data-a-reveal="">
              {products.closing.heading}
            </h2>
            <p className="a-body" style={{ marginTop: 28 }}>
              {products.closing.body}
            </p>
            <a className="a-btn a-btn--ink" href={href('contact')} style={{ marginTop: 32 }}>
              {products.closing.cta}
              <Arrow />
            </a>
            <p className="a-small" style={{ marginTop: 16 }}>
              <a className="a-ulink" href={site.phoneHref}>
                {site.phone}
              </a>
            </p>
          </div>
          <div className="a-main a-cutouts">
            <figure data-a-reveal="">
              <Img pic={pictures.cutRockwool} />
            </figure>
            <figure data-a-reveal="">
              <Img pic={pictures.cutRubber} />
            </figure>
            <figure data-a-reveal="">
              <Img pic={pictures.cutFoamglas} />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}

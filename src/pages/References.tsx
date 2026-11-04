import { references } from '../content/site';
import { ButtonLink, Dash, Ph, TempLine } from '../components/primitives';

export default function References() {
  return (
    <>
      <section className="page-head wrap">
        <Dash />
        <h1>Named references, by sector.</h1>
        <p className="lead">
          Operators and plants Bellis lists as past work. Each reference should carry its scope, year and outcome, shown
          in the case-study card below, once that is confirmed.
        </p>
        <p className="ph-note">
          <Ph>Confirm each client agrees to be named before launch</Ph>
        </p>
      </section>

      <section className="wrap" aria-label="References by sector">
        <ul className="ref-grid">
          {references.map((r) => (
            <li className="ref-block" key={r.sector}>
              <h2>{r.sector}</h2>
              <ul>
                {r.names.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--paper" aria-labelledby="case-title">
        <div className="wrap">
          <header className="section-head">
            <Dash />
            <h2 id="case-title">What each reference should say</h2>
          </header>
          <article className="case">
            <dl>
              <div>
                <dt>Project</dt>
                <dd>
                  <Ph>Name of plant or job</Ph>
                </dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>
                  <Ph>Year completed</Ph>
                </dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>
                  <Ph>Hot, cold, acoustic, fire, fabrication or shutdown work</Ph>
                </dd>
              </div>
              <div>
                <dt>Material</dt>
                <dd>
                  <Ph>Product lines used, from the index</Ph>
                </dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd>
                  <Ph>Result the client can verify</Ph>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className="wrap page-foot">
        <TempLine />
        <div className="page-foot__inner">
          <p>Working on a plant like one of these? Tell us the line and the temperature.</p>
          <ButtonLink to="/contact" variant="primary" arrow>
            Talk to an expert
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

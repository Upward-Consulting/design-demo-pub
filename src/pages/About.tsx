import { commitments, company } from '../content/site';
import { ButtonLink, Dash, Figure, Ph, TempLine } from '../components/primitives';

export default function About() {
  return (
    <>
      <section className="page-head wrap">
        <Dash />
        <h1>Engineering and supply, since 1981.</h1>
        <blockquote className="mission">
          <p>{company.mission}</p>
        </blockquote>
      </section>

      <section className="section section--paper" aria-labelledby="commit-title">
        <div className="wrap">
          <header className="section-head">
            <Dash />
            <h2 id="commit-title">Three commitments, in writing.</h2>
          </header>
          <ul className="commit-grid">
            {commitments.map((c, i) => (
              <li key={c.title}>
                <span className="commit-grid__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="wrap split">
          <div className="split__text">
            <Dash />
            <h2 id="values-title">Customer focus, honesty and availability, with quality at the centre.</h2>
            <ul className="values">
              {company.values.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <Figure
            src="/media/site-photo-2016.jpg"
            alt="Bellis premises with a branded sign and a service vehicle"
            caption={undefined}
            ratio="4 / 3"
          />
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="certs-title">
        <div className="wrap">
          <header className="section-head">
            <Dash />
            <h2 id="certs-title">Quality and safety, with the current standards shown.</h2>
          </header>
          <dl className="certs">
            <div>
              <dt>Quality management</dt>
              <dd>
                <strong>ISO 9001:2015</strong>
                <span>
                  Documented quality management and information system. <Ph>Certificate number and scope to confirm</Ph>
                </span>
              </dd>
            </div>
            <div>
              <dt>Health and safety management</dt>
              <dd>
                <strong>
                  <Ph>Current standard to confirm</Ph>
                </strong>
                <span>
                  The site cites OHSAS 18001:2007 and AS/NZS 4801:2001. OHSAS 18001 has been superseded by ISO 45001, so
                  the current certificate must be checked before it is shown.
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wrap page-foot">
        <TempLine />
        <div className="page-foot__inner">
          <p>Five branches, two workshops, one head office. Find the nearest one.</p>
          <ButtonLink to="/contact" variant="primary" arrow>
            Find a branch
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

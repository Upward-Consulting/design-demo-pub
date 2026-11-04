import { Link } from 'react-router';
import { services } from '../content/services';
import { pipeline } from '../content/site';
import { ButtonLink, Dash, TempLine } from '../components/primitives';
import { Icon } from '../components/Icons';

const lifecycle = [
  ...pipeline.slice(0, 1).map((s) => ({ ...s })),
  { n: '02', title: 'Procure', body: 'Materials bought on price, quality, availability and service.' },
  { n: '03', title: 'Fabricate', body: 'Sheet-metal and custom covers, made in our workshops.' },
  { n: '04', title: 'Install', body: 'Turnkey installation by our own crews.' },
  { n: '05', title: 'Maintain', body: 'Shutdown and maintenance programmes, and corrosion remediation.' },
];

export default function Services() {
  return (
    <>
      <section className="page-head wrap">
        <Dash />
        <h1>From estimate to shutdown, under one roof.</h1>
        <p className="lead">
          Materials, metalwork and labour come from one supplier, so one team can carry a job from the first estimate to
          the shutdown.
        </p>
      </section>

      <section className="wrap" aria-label="The job, in five stages">
        <ol className="rail rail--five">
          {lifecycle.map((s) => (
            <li className="rail__step" key={s.n}>
              <span className="rail__node" aria-hidden="true">
                {s.n}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="service-list">
        <div className="wrap">
          <h2 id="service-list" className="visually-hidden">
            Service families
          </h2>
          <ul className="card-grid card-grid--3">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link className="card" to={`/services/${s.slug}`}>
                  <div className="card__media" style={{ aspectRatio: '16 / 10' }}>
                    {s.image ? (
                      <img src={`/media/${s.image}`} alt="" loading="lazy" />
                    ) : (
                      <div className="card__index" aria-hidden="true">
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <TempLine />
                      </div>
                    )}
                  </div>
                  <p className="card__kicker">Service {String(i + 1).padStart(2, '0')}</p>
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <span className="text-link">
                    Read more <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap page-foot">
        <TempLine />
        <div className="page-foot__inner">
          <p>Need a fabricated part, a shutdown plan or a material check? Start with a conversation.</p>
          <ButtonLink to="/contact" variant="primary" arrow>
            Talk to an expert
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

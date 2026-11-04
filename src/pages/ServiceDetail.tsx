import { Link, useParams } from 'react-router';
import { services } from '../content/services';
import { categoryLabels, products } from '../content/products';
import { ButtonLink, Dash, Figure, TempLine } from '../components/primitives';
import { Icon } from '../components/Icons';
import NotFound from './NotFound';

// Which product families a service leans on, for the "related lines" links.
const relatedCats: Record<string, string[]> = {
  'oil-gas-energy': ['cold', 'hot', 'acoustic', 'fire'],
  'mining-resources': ['hot', 'cold', 'fire', 'fabrics'],
  'marine-defence': ['acoustic', 'fire', 'cold'],
  commercial: ['acoustic', 'fire', 'fabrics'],
  'corrosion-control': ['cold', 'accessories'],
  'sheet-metal-fabrication': ['cladding'],
  'manufactured-products': ['fabrics', 'hot'],
  'estimating-procurement': ['accessories', 'mastics'],
  'contracting-maintenance': ['cladding', 'fixings', 'mastics'],
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const index = services.findIndex((s) => s.slug === slug);
  if (index < 0) return <NotFound />;

  const service = services[index];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const cats = relatedCats[service.slug] ?? [];
  const related = products.filter((p) => p.cats.some((c) => cats.includes(c))).slice(0, 4);

  return (
    <>
      <section className="page-head wrap page-head--split">
        <div>
          <Dash />
          <h1>{service.name}</h1>
          <p className="lead">{service.lead}</p>
        </div>
        {service.image && (
          <Figure src={`/media/${service.image}`} alt={service.alt ?? ''} ratio="4 / 3" className="page-head__figure" />
        )}
      </section>

      <section className="wrap detail" aria-labelledby="offers-title">
        <div>
          <h2 id="offers-title">What Bellis offers</h2>
          <ul className="checklist">
            {service.offers.map((o) => (
              <li key={o}>
                <Icon name="check" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="callout" aria-labelledby="callout-title">
          <h2 id="callout-title">Talk to an expert about this work</h2>
          <p>Give us the plant, the operating temperature and the programme. We reply with a scope and a price path.</p>
          <div className="callout__actions">
            <ButtonLink to="/contact" variant="primary" arrow>
              Talk to an expert
            </ButtonLink>
            <a className="text-link" href="tel:1300740564">
              1300 740 564
            </a>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="section section--paper" aria-labelledby="related-products">
          <div className="wrap">
            <header className="section-head section-head--row">
              <div>
                <Dash />
                <h2 id="related-products">Products used on this work.</h2>
              </div>
              <Link className="text-link" to="/products">
                Full index <Icon name="arrow" />
              </Link>
            </header>
            <ul className="related-list">
              {related.map((p) => (
                <li key={p.name}>
                  <Link to={`/products?q=${encodeURIComponent(p.name)}`}>
                    <strong>{p.name}</strong>
                    <span>{p.cats.map((c) => categoryLabels[c]).join(', ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="others-title">
        <div className="wrap">
          <header className="section-head">
            <Dash />
            <h2 id="others-title">Part of the same job?</h2>
          </header>
          <ul className="card-grid card-grid--3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link className="card card--plain" to={`/services/${s.slug}`}>
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

      <div className="wrap page-foot">
        <TempLine />
      </div>
    </>
  );
}

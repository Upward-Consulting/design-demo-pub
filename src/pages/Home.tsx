import { Link } from 'react-router';
import { branches, company, pipeline, problems } from '../content/site';
import { products } from '../content/products';
import { services } from '../content/services';
import { ButtonLink, Eyebrow, Figure, Tag, TempLine } from '../components/primitives';
import { Icon } from '../components/Icons';
import { categoryLabels } from '../content/products';

const featuredServices = ['oil-gas-energy', 'mining-resources', 'marine-defence', 'commercial'].map(
  (slug) => services.find((s) => s.slug === slug)!,
);

const featuredProducts = products.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      {/* 1. Hero: the brief in one line, with the two calls to action */}
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__img" src="/media/banner-1.jpg" alt="" />
        <div className="wrap hero__content">
          <Eyebrow light>Industrial mechanical insulation, Brisbane</Eyebrow>
          <h1 id="hero-title">Insulation for plant that runs hot, runs cold, runs loud or sits near fire.</h1>
          <p className="lead hero__lead">
            Bellis supplies the materials, fabricates the metalwork and does the on-site work for heavy-industry plant,
            from estimate to shutdown.
          </p>
          <div className="hero__actions">
            <ButtonLink to="/contact" variant="primary" arrow>
              Talk to an expert
            </ButtonLink>
            <ButtonLink to="/products" variant="dark-ghost">
              Search the product index
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="branch-strip">
        <div className="wrap branch-strip__inner">
          <ul aria-label="Branches">
            {branches.map((b) => (
              <li key={b.city}>
                <strong>{b.city}</strong>
                <span>{b.state}</span>
              </li>
            ))}
          </ul>
          <p>5 branches, 2 fabrication workshops</p>
        </div>
      </div>

      {/* 2. Start from the problem, not the sector */}
      <section className="section" aria-labelledby="problems-title">
        <div className="wrap">
          <header className="section-head">
            <Eyebrow index="01">Start with the problem</Eyebrow>
            <h2 id="problems-title">Pick the problem. We will find the material and the crew.</h2>
          </header>
          <div className="problems">
            {problems.map((p) => (
              <article className="problem" key={p.key}>
                <p className="problem__n">
                  {p.n} <span>{p.label}</span>
                </p>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <Link className="text-link problem__link" to={p.to}>
                  {p.linkLabel}
                  <Icon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. One supplier, four steps on one run */}
      <section className="section section--paper" aria-labelledby="pipeline-title">
        <div className="wrap">
          <header className="section-head">
            <Eyebrow index="02">One supplier</Eyebrow>
            <h2 id="pipeline-title">Materials, metalwork and labour, from one supplier.</h2>
          </header>
          <ol className="rail">
            {pipeline.map((s) => (
              <li className="rail__step" key={s.n}>
                <span className="rail__node" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Corrosion under insulation: the strongest single service story */}
      <section className="section" aria-labelledby="cui-title">
        <div className="wrap split">
          <Figure
            src="/media/bellis-hard-hat.jpg"
            alt="Workers in hi-vis and hard hats on a plant roof"
            caption="Cladding crew on a plant roof."
            ratio="4 / 3"
          />
          <div className="split__text">
            <Eyebrow index="03">Corrosion under insulation</Eyebrow>
            <h2 id="cui-title">Corrosion under insulation is a shutdown cost. We open it, fix it and close it up.</h2>
            <p>
              Moisture trapped against steel is the problem. Our corrosion-control service removes and inspects the
              insulation, paints the pipework and reinstates it, with vapour barriers and closed-cell systems where
              needed.
            </p>
            <ButtonLink to="/services/corrosion-control" variant="secondary" arrow>
              Corrosion control service
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 5. Where we work */}
      <section className="section section--paper" aria-labelledby="sectors-title">
        <div className="wrap">
          <header className="section-head section-head--row">
            <div>
              <Eyebrow index="04">Where we work</Eyebrow>
              <h2 id="sectors-title">Heavy industry, from LNG to alumina.</h2>
            </div>
            <Link className="text-link" to="/services">
              All nine services <Icon name="arrow" />
            </Link>
          </header>
          <ul className="card-grid card-grid--4">
            {featuredServices.map((s) => (
              <li key={s.slug}>
                <Link className="card" to={`/services/${s.slug}`}>
                  {s.image && (
                    <div className="card__media" style={{ aspectRatio: '4 / 3' }}>
                      <img src={`/media/${s.image}`} alt="" loading="lazy" />
                    </div>
                  )}
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <span className="text-link">
                    Service <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Product index preview */}
      <section className="section" aria-labelledby="products-title">
        <div className="wrap">
          <header className="section-head section-head--row">
            <div>
              <Eyebrow index="05">Quick Look</Eyebrow>
              <h2 id="products-title">The product index, sorted by what it has to do.</h2>
            </div>
            <Link className="text-link" to="/products">
              Open the index <Icon name="arrow" />
            </Link>
          </header>
          <ul className="card-grid card-grid--4">
            {featuredProducts.map((p) => (
              <li key={p.name}>
                <Link className="card card--product" to={`/products?q=${encodeURIComponent(p.name)}`}>
                  <div className="card__media" style={{ aspectRatio: '4 / 3' }}>
                    {p.img && <img src={`/media/${p.img}`} alt="" loading="lazy" />}
                  </div>
                  <div className="card__tags">
                    {p.cats.slice(0, 2).map((c) => (
                      <Tag key={c} tone={c === 'cold' ? 'cold' : c === 'hot' ? 'hot' : c === 'fire' ? 'fire' : 'other'}>
                        {categoryLabels[c]}
                      </Tag>
                    ))}
                  </div>
                  <h3>{p.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Talk to an expert: the conversion point, on navy */}
      <section className="section section--navy" aria-labelledby="contact-title">
        <div className="wrap contact-band">
          <div>
            <Eyebrow index="06" light>
              Talk to an expert
            </Eyebrow>
            <h2 id="contact-title">Tell us the line, the temperature and the programme.</h2>
            <p className="lead">
              Send the drawing, the line size, the operating temperature and the shutdown dates. We come back with the
              material, the estimate or the plan.
            </p>
            <div className="hero__actions">
              <ButtonLink to="/contact" variant="primary" arrow>
                Talk to an expert
              </ButtonLink>
              <ButtonLink href={company.phoneHref} variant="dark-ghost">
                {company.phone}
              </ButtonLink>
            </div>
          </div>
          <ul className="contact-band__branches">
            {branches.map((b) => (
              <li key={b.city}>
                <strong>
                  {b.city}, {b.state}
                </strong>
                <span>{b.address}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TempLine />
    </>
  );
}

// Corrosion control (service detail): the client's own rusted-flange picture as the masthead, the three steps as report
// sections (titles in the side notes, bodies on the axis), the prevention list, and the closing action.
import { corrosion, site } from '../../content/demo-copy';
import { pictures } from '../../assets/own/pictures';
import { Arrow, Img } from './parts';

type Href = (page: string) => string;

export function Corrosion({ href }: { href: Href }) {
  return (
    <>
      <section className="a-section a-dark" style={{ paddingTop: 56, paddingBottom: 0 }} aria-label="Corrosion under insulation">
        <div className="a-axis">
          <div className="a-side a-side--after">
            <p className="a-lead" data-a-reveal="">
              {corrosion.lead}
            </p>
            <p className="a-small a-muted" style={{ marginTop: 24 }}>
              {corrosion.cost}
            </p>
          </div>
          <div className="a-main">
            <h1 className="a-h1" data-a-reveal="">
              Corrosion under insulation.
            </h1>
          </div>
        </div>
        <div className="a-axis" style={{ marginTop: 72, paddingBottom: 128 }}>
          <div className="a-side" />
          <div className="a-main">
            <figure className="a-pic a-masthead-img" style={{ height: 'clamp(180px, 16vw, 240px)' }}>
              <Img pic={pictures.rustedFlange} eager />
            </figure>
          </div>
        </div>
      </section>

      <section className="a-section a-paper" aria-labelledby="h-steps-corr" style={{ paddingTop: 112 }}>
        <div className="a-axis">
          <div className="a-side" />
          <div className="a-main">
            <h2 id="h-steps-corr" className="a-h2" data-a-reveal="">
              {corrosion.stepsHeading}
            </h2>
          </div>
        </div>
        <ol style={{ marginTop: 64 }}>
          {corrosion.steps.map((s) => (
            <li key={s.n} className="a-rust-step" data-a-reveal="">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="a-section a-dark" aria-labelledby="h-prev" style={{ paddingBottom: 0 }}>
        <div className="a-axis">
          <div className="a-side">
            <figure className="a-pic" style={{ aspectRatio: '4 / 5', width: '100%' }}>
              <Img pic={pictures.foamglasCryo} />
            </figure>
          </div>
          <div className="a-main">
            <h2 id="h-prev" className="a-h2" data-a-reveal="">
              {corrosion.preventionHeading}
            </h2>
            <dl className="a-prevent" style={{ marginTop: 56 }}>
              {corrosion.prevention.map((item) => (
                <div key={item.name} data-a-reveal="">
                  <dt>{item.name}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
            <p className="a-small a-muted" style={{ marginTop: 56, maxWidth: '52ch' }}>
              {corrosion.note}
            </p>
          </div>
        </div>
        <div className="a-pair" style={{ marginTop: 112 }}>
          <figure>
            <Img pic={pictures.valvePipework} />
          </figure>
          <figure>
            <Img pic={pictures.removableCovers} />
          </figure>
        </div>
      </section>

      <section className="a-section a-dark" aria-labelledby="h-rust-cta">
        <div className="a-axis">
          <div className="a-side">
            <figure className="a-pic" style={{ aspectRatio: '4 / 3' }}>
              <Img pic={pictures.operator} />
            </figure>
          </div>
          <div className="a-main">
            <h2 id="h-rust-cta" className="a-h2" data-a-reveal="">
              {corrosion.closing.heading}
            </h2>
            <p className="a-lead" style={{ marginTop: 28, maxWidth: '34ch' }}>
              {corrosion.closing.body}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginTop: 40 }}>
              <a className="a-btn" href={href('contact')}>
                {corrosion.closing.cta}
                <Arrow />
              </a>
              <a className="a-phone" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

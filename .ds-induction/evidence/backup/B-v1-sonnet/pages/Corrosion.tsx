// Corrosion control (a service page): the client's rusted-flange picture, the three steps as three colour bands of
// unequal width, the prevention list at one type size, and the close.
import { corrosion, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import { Btn, Img, Reveal } from '../parts/primitives';

type Href = (p: string) => string;

const stepColours = ['var(--dB-cyan)', 'var(--dB-orange)', 'var(--dB-white)'] as const;

export function CorrosionPage({ href }: { href: Href }) {
  return (
    <>
      <section className="b-page-hero b-corr-hero" aria-labelledby="corr-h1">
        <h1 id="corr-h1">
          Corrosion under{' '}
          <br />
          insulation.
        </h1>
        <Reveal className="b-corr-hero__lead">
          <p className="b-lead">{corrosion.lead}</p>
        </Reveal>
        <Reveal index={1} className="b-corr-hero__pic">
          <div className="b-pic b-corr-pic">
            <Img pic={pictures.rustedFlange} eager />
          </div>
          <p className="b-caption b-small b-ink-muted">{corrosion.cost}</p>
        </Reveal>
      </section>

      <section className="b-corr-steps" aria-labelledby="steps-h">
        <h2 id="steps-h" className="b-corr-steps__title">
          {corrosion.stepsHeading}
        </h2>
        <ol className="b-corr-bands">
          {corrosion.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal index={i} className={`b-corr-band b-corr-band--${i + 1}`} >
                <div className="b-corr-band__inner" style={{ background: stepColours[i] }}>
                  <div className="b-corr-band__copy">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                  {i === 0 ? (
                    <div className="b-corr-band__pic">
                      <Img pic={pictures.valvePipework} />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="b-prevent" aria-labelledby="prevent-h">
        <div className="b-prevent__head">
          <Reveal>
            <h2 id="prevent-h">{corrosion.preventionHeading}</h2>
          </Reveal>
          <Reveal index={1}>
            <p className="b-body">{corrosion.note}</p>
          </Reveal>
          <Reveal index={2} className="b-prevent__cut">
            <Img pic={pictures.cutFoamglas} />
          </Reveal>
        </div>
        <Reveal index={2} className="b-prevent__pic">
          <div className="b-pic">
            <Img pic={pictures.interam} />
          </div>
        </Reveal>
        <Reveal index={3} className="b-prevent__thermo">
          <Img pic={pictures.thermobreak} />
        </Reveal>
        <ul className="b-lineup">
          {corrosion.prevention.map((p) => (
            <li key={p.name}>
              <span>{p.name}</span>
              <span>{p.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="b-closing b-on-ink b-closing--short" aria-labelledby="corr-close">
        <Reveal>
          <h2 id="corr-close">{corrosion.closing.heading}</h2>
        </Reveal>
        <Reveal index={1} className="b-closing__foot">
          <p>{corrosion.closing.body}</p>
          <Btn href={href('contact')}>{site.cta}</Btn>
        </Reveal>
      </section>
    </>
  );
}

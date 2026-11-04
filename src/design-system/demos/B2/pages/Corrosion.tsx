// Corrosion control: the rusted flange at poster scale, the three steps as three colour bands with the step name set huge
// (a real ordered list), the prevention list as bold slips, and the inverted close. The deck's cost sentence ("The client
// calls it ...") is a third-person note about the client, so it is not shown (the deck allows "as a caption or not at all").
import type { DemoProps } from '../../../workbench/types';
import { corrosion, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import { Btn, Img, Rv } from '../parts/primitives';

// One picture per step band: the step's own subject, from the pool.
const STEP_PIC: Array<{ pic: Pic; tilt: string }> = [
  { pic: pictures.marinePipe, tilt: '-2deg' },
  { pic: pictures.valvePipework, tilt: '2deg' },
  { pic: pictures.thermobreak, tilt: '-2deg' },
];
const STEP_TONE = ['ink', 'paper', 'orange'] as const;

// The deck's heading, split at the comma-and-verb so each line reads as a phrase (the break is the copy's words).
const stepsHead = corrosion.stepsHeading;
const stepsSplit = stepsHead.indexOf('treat');
const stepsLines = stepsSplit > 0 ? [stepsHead.slice(0, stepsSplit).trim(), stepsHead.slice(stepsSplit).trim()] : [stepsHead];

export function CorrosionPage({ href }: DemoProps) {
  return (
    <>
      <section className="b-hero b-hero--ground b-corr-hero" aria-labelledby="corr-h">
        <div className="b-hero__copy">
          <Rv className="b-hero__h">
            <h1 id="corr-h" className="b-display b-mask">
              <span className="b-mask__in">{corrosion.h1}</span>
            </h1>
          </Rv>
          <Rv index={1} className="b-hero__lead">
            <p className="b-lead">{corrosion.lead}</p>
          </Rv>
          <Rv index={2} className="b-hero__act">
            <Btn href={href('contact')}>{site.cta}</Btn>
            <a className="b-phone" href={site.phoneHref}>
              {site.phone}
            </a>
          </Rv>
        </div>
        <Rv index={2} className="b-corr-hero__pic" style={{ ['--tilt' as string]: '-2deg' }}>
          <Img pic={pictures.rustedFlange} eager className="b-corr-hero__img" style={{ maxWidth: pictures.rustedFlange.maxW }} />
        </Rv>
      </section>

      <section className="b-steps-corr" aria-labelledby="corr-steps-h">
        <Rv>
          <h2 id="corr-steps-h" className="b-display b-mask b-steps-corr__h">
            {stepsLines.map((line, i) => (
              <span key={line} className="b-mask__in b-steps-corr__line">
                {line}
                {i < stepsLines.length - 1 ? ' ' : null}
              </span>
            ))}
          </h2>
        </Rv>
        <ol className="b-bands">
          {corrosion.steps.map((s, i) => {
            const pic = STEP_PIC[i];
            return (
              <Rv key={s.title} as="li" index={i} className={`b-band b-band--${STEP_TONE[i] ?? 'paper'}`}>
                <h3 className="b-display b-band__h">{s.title}</h3>
                <p className="b-band__body">{s.body}</p>
                {pic ? (
                  <div className="b-band__pic" style={{ ['--tilt' as string]: pic.tilt }}>
                    <Img pic={pic.pic} className="b-band__img" style={{ maxWidth: pic.pic.maxW }} />
                  </div>
                ) : null}
              </Rv>
            );
          })}
        </ol>
      </section>

      <section className="b-prev" aria-labelledby="prev-h">
        <Rv>
          <h2 id="prev-h" className="b-display b-mask">
            <span className="b-mask__in">{corrosion.preventionHeading}</span>
          </h2>
        </Rv>
        <Rv index={1}>
          <p className="b-lead">{corrosion.note}</p>
        </Rv>
        <ul className="b-prev__slips">
          {corrosion.prevention.map((p, i) => (
            <Rv key={p.name} as="li" index={i} className="b-out b-out--slip">
              <h3 className="b-out__h">{p.name}</h3>
              <p className="b-out__body">{p.body}</p>
            </Rv>
          ))}
        </ul>
      </section>

      <section className="b-close b-close--ink" aria-labelledby="corr-close-h">
        <Rv>
          <h2 id="corr-close-h" className="b-display b-mask b-close__h">
            <span className="b-mask__in">{corrosion.closing.heading}</span>
          </h2>
        </Rv>
        <Rv index={1} className="b-close__row">
          <p className="b-lead">{corrosion.closing.body}</p>
          <div className="b-close__act">
            <Btn href={href('contact')}>{corrosion.closing.cta}</Btn>
            <a className="b-close__phone" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </Rv>
      </section>
    </>
  );
}

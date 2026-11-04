// Home: the story opener (one lock chapter, one screen held, driven by a paused GSAP timeline through the story kit's
// progress) and the utility sections after it. Copy from the shared deck only; pictures from the client's own pool.
import { useRef } from 'react';
import { gsap } from 'gsap';
import { StoryChapter } from '../../story/StoryChapter';
import { useChapterProgress } from '../../story/chapter';
import { home, site } from '../../content/demo-copy';
import { pictures } from '../../assets/own/pictures';
import { Arrow, Img, vars } from './parts';

type Href = (page: string) => string;

interface Scene {
  statements: (HTMLSpanElement | null)[];
  payoff: HTMLSpanElement | null;
  picture: HTMLImageElement | null;
  accent: HTMLDivElement | null;
  hint: HTMLParagraphElement | null;
}

/** Drives the opener from the chapter's progress. It must sit inside the chapter (the kit's context), so it is rendered as
 *  a child of StoryChapter. p runs 0 to 1 over the held screen; the paused timeline is only ever seeked (tl.progress(p)):
 *  no clocks, so the same p always shows the same frame. Statement 0 is in place from p 0, so the first screen is not empty. */
function OpenerScene({ scene }: { scene: { current: Scene } }) {
  const timeline = useRef<gsap.core.Timeline | null>(null);
  useChapterProgress((p) => {
    if (!timeline.current) {
      const { statements, payoff, picture, accent, hint } = scene.current;
      // Built only once every target has registered its ref (the callback can run before the siblings' refs attach).
      if (statements.length < home.opener.statements.length || !payoff || !picture || !accent || !hint || statements.some((s) => !s)) return;
      const t = gsap.timeline({ paused: true });
      statements.forEach((el, i) => {
        if (!el || i === 0) return;
        t.fromTo(el, { yPercent: 105 }, { yPercent: 0, duration: 0.04, ease: 'power3.out' }, i * 0.04);
      });
      if (payoff) t.fromTo(payoff, { yPercent: 105 }, { yPercent: 0, duration: 0.05, ease: 'power3.out' }, 0.2);
      if (picture) t.fromTo(picture, { scale: 1 }, { scale: 1.05, duration: 1, ease: 'none' }, 0);
      // the accent block rises into place while the statements land; the scroll cue brightens as the reader starts
      t.fromTo(accent, { yPercent: -50, y: 36 }, { yPercent: -50, y: 0, duration: 0.3, ease: 'power3.out' }, 0);
      t.fromTo(hint, { opacity: 0.25 }, { opacity: 1, duration: 0.15, ease: 'none' }, 0);
      timeline.current = t;
    }
    timeline.current.progress(p);
  });
  return null;
}

/** The opener: the five blunt statements land one after another as p runs; the payoff follows; the picture settles. */
function Opener({ href }: { href: Href }) {
  const scene = useRef<Scene>({ statements: [], payoff: null, picture: null, accent: null, hint: null });

  return (
    <StoryChapter
      id="opener"
      label={`${site.name}: ${home.hero.h1}`}
      model="lock"
      hold={1}
      phone="rest"
      restAt={1}
      weight={0}
      className="a-opener"
    >
      <div className="a-op">
        <h1 className="a-op-h1">
          <span className="a-line">
            <span style={vars({ line: 0 })}>Insulation for</span>
          </span>
          <span className="a-line">
            <span style={vars({ line: 1 })}>heavy industry.</span>
          </span>
        </h1>
        <p className="a-op-lead">{home.hero.clientLine}</p>
        <div className="a-op-act">
          <a className="a-btn" href={href('contact')}>
            {home.hero.cta}
            <Arrow />
          </a>
          <p className="a-small">
            <a className="a-phone" href={site.phoneHref}>
              {home.hero.ctaNote}
            </a>
          </p>
        </div>
        <ul className="a-op-statements">
          {home.opener.statements.map((s, i) => (
            <li key={s} className="a-op-statement">
              <span ref={(el) => void (scene.current.statements[i] = el)} data-move="">
                {s}
              </span>
            </li>
          ))}
        </ul>
        <p className="a-op-payoff">
          <span ref={(el) => void (scene.current.payoff = el)} data-move="">
            {home.opener.payoff}
          </span>
        </p>
        <figure className="a-op-pic">
          <img
            ref={(el) => void (scene.current.picture = el)}
            src={pictures.lngCarrier.src}
            width={pictures.lngCarrier.w}
            height={pictures.lngCarrier.h}
            alt="An LNG carrier with domed tanks alongside a coastal terminal"
            data-provenance="own"
            loading="eager"
            decoding="async"
            data-move=""
          />
        </figure>
        <div className="a-op-accent" ref={(el) => void (scene.current.accent = el)}>
          <span className="a-op-accent-fig">5</span>
          <span className="a-op-accent-line">branches, one phone number.</span>
        </div>
        <p className="a-op-scroll" aria-hidden="true" ref={(el) => void (scene.current.hint = el)} data-move="">
          {home.opener.scrollHint}
          <Arrow />
        </p>
      </div>
      <OpenerScene scene={scene} />
    </StoryChapter>
  );
}

function Jobs() {
  return (
    <section className="a-section a-paper" aria-labelledby="h-jobs">
      <div className="a-axis">
        <div className="a-side">
          <p className="a-lead" data-a-reveal="">
            {home.jobs.lead}
          </p>
        </div>
        <div className="a-main">
          <h2 id="h-jobs" className="a-h2" data-a-reveal="">
            {home.jobs.heading}
          </h2>
          <div className="a-jobs">
            <div className="a-jobs-head" aria-hidden="true">
              <span>Job</span>
              <span>What it does</span>
              <span>Materials</span>
            </div>
            {home.jobs.items.map((job, i) => (
              <div className="a-job" key={job.key} data-a-reveal="" style={vars({ i })}>
                <h3 className="a-job-name">{job.title}</h3>
                <p className="a-job-body">{job.body}</p>
                <p className="a-job-mat">{job.materials}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Workshop() {
  const [cladding, covers, joints] = home.workshop.items;
  return (
    <section className="a-section a-dark" aria-labelledby="h-work" style={{ paddingBottom: 0 }}>
      <div className="a-axis">
        <div className="a-side">
          <p className="a-lead" data-a-reveal="">
            {home.workshop.lead}
          </p>
        </div>
        <div className="a-main">
          <h2 id="h-work" className="a-h2" data-a-reveal="">
            {home.workshop.heading}
          </h2>
          <ul className="a-caps">
            {home.workshop.capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="a-band">
        <figure className="a-panel">
          <Img pic={pictures.stainlessTanker} />
          <figcaption className="a-panel-title">{cladding?.title}</figcaption>
        </figure>
        <figure className="a-panel">
          <Img pic={pictures.removableCovers} />
          <figcaption className="a-panel-title">{covers?.title}</figcaption>
        </figure>
        <figure className="a-panel">
          <Img pic={pictures.expansionJoint} />
          <figcaption className="a-panel-title">{joints?.title}</figcaption>
        </figure>
        <figure className="a-panel">
          <Img pic={pictures.sheetMetalRolling} />
        </figure>
      </div>
      <div className="a-band-caps">
        {home.workshop.items.map((item) => (
          <p key={item.key}>{item.body}</p>
        ))}
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="a-section a-paper" aria-labelledby="h-steps">
      <div className="a-axis">
        <div className="a-side">
          <p className="a-lead" data-a-reveal="">
            {home.steps.lead}
          </p>
        </div>
        <div className="a-main">
          <h2 id="h-steps" className="a-h2" data-a-reveal="">
            {home.steps.heading}
          </h2>
        </div>
      </div>
      <ol className="a-steps" style={{ marginTop: 112 }}>
        {home.steps.items.map((s, i) => (
          <li key={s.n} className="a-step" style={vars({ start: 1 + 2 * i })} data-a-reveal="">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Sites() {
  return (
    <section className="a-section a-dark" aria-labelledby="h-sites">
      <div className="a-axis">
        <div className="a-side a-side--after">
          <p className="a-lead" data-a-reveal="">
            {home.sites.lead}
          </p>
        </div>
        <div className="a-main">
          <h2 id="h-sites" className="a-h2" data-a-reveal="">
            {home.sites.heading}
          </h2>
          <div className="a-sites" style={{ marginTop: 64 }} data-a-reveal="">
            {home.sites.groups.map((g) => (
              <div key={g.sector}>
                <h3>{g.sector}</h3>
                <ul>
                  {g.names.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="a-sites-cert">{home.sites.certsPlaceholder}</p>
        </div>
      </div>
    </section>
  );
}

function Figures() {
  return (
    <section className="a-section a-lime" aria-labelledby="h-figs">
      <div className="a-axis">
        <div className="a-side">
          <h2 id="h-figs" className="a-statement-2" data-a-reveal="">
            <span>Bellis in</span>
            <span>figures.</span>
          </h2>
        </div>
        <div className="a-main">
          <ul className="a-fig-list">
            {[home.figures.items[0], home.figures.items[1], home.figures.items[3], home.figures.items[2]].map((f) => (
              <li key={f.label} className="a-fig" data-a-reveal="">
                <span className="a-fig-value">{f.value}</span>
                <span className="a-fig-point" aria-hidden="true" />
                <p className="a-fig-cap">
                  <strong>{f.label}</strong>
                  {f.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Closing({ href }: { href: Href }) {
  return (
    <section aria-labelledby="h-cta">
      <div className="a-strip">
        <figure>
          <Img pic={pictures.removableCovers} />
        </figure>
        <figure>
          <Img pic={pictures.valvePipework} />
        </figure>
        <figure>
          <Img pic={pictures.crewRoof} />
        </figure>
      </div>
      <div className="a-field">
        <div className="a-field-text" data-a-reveal="">
          <p>{home.closing.body}</p>
          <h2 id="h-cta">
            <a href={href('contact')} className="a-ulink">
              {home.closing.heading}
            </a>
          </h2>
          <p className="a-field-note">
            <a className="a-phone" href={site.phoneHref}>
              {home.hero.ctaNote}
            </a>
          </p>
        </div>
        <figure className="a-field-pic">
          <Img pic={pictures.branchBuilding} />
        </figure>
      </div>
    </section>
  );
}

export function Home({ href }: { href: Href }) {
  return (
    <>
      <Opener href={href} />
      <Jobs />
      <Workshop />
      <Steps />
      <Sites />
      <Figures />
      <Closing href={href} />
    </>
  );
}

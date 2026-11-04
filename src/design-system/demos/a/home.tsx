import { Fragment, type ReactNode } from 'react';
import { copy, pictures } from '../../content/demo-copy';
import { RANGE_PIC, RANGE_TILE, SERVICE_PIC } from './catalogue';
import { Bend, href, Pic, PageShell, Ring, stagger, type Picture } from './parts';

/** Splits a deck string at a phrase, so the deck's own words can be set on two lines. */
function splitAt(text: string, at: string): [string, string] {
  const i = text.indexOf(at);
  return i > 0 ? [text.slice(0, i).trim(), text.slice(i).trim()] : [text, ''];
}

function Thumb({ p, pos, extra }: { p: Picture; pos?: string; extra?: boolean }) {
  return <Pic p={p} pos={pos} decorative className={`a-thumb${extra ? ' a-thumb--extra' : ''}`} />;
}

/** The lede as a statement, with a framed picture after each thing it names (the frames take the bend). */
function Statement() {
  const lede: string = copy.home.lede;
  const marks: { word: string; p: Picture; pos?: string; extra?: boolean }[] = [
    { word: 'Materials', p: pictures.prod.pyrogelCut },
    { word: 'fabrication', p: pictures.svc.sheetMetal, pos: '60% 50%' },
    { word: 'installation', p: pictures.svc.marineBulkhead },
    { word: 'maintenance', p: pictures.svc.contract, extra: true },
  ];
  const [lead, tail] = splitAt(lede, 'from branches');
  const parts: ReactNode[] = [];
  let rest = lead;
  marks.forEach((m, n) => {
    const i = rest.indexOf(m.word);
    if (i < 0) return;
    const before = rest.slice(0, i);
    const end = i + m.word.length;
    const punct = rest[end] === ',' ? ',' : '';
    parts.push(
      <Fragment key={n}>
        {before}
        <span style={{ whiteSpace: 'nowrap' }}>
          <span>{m.word}</span>
          <Thumb p={m.p} pos={m.pos} extra={m.extra} />
          {punct}
        </span>
      </Fragment>,
    );
    rest = rest.slice(end + punct.length);
  });
  parts.push(rest);
  return (
    <p className="a-statement" data-reveal>
      {parts} {tail && <span className="a-muted">{tail}</span>}
    </p>
  );
}

function Hero() {
  const [line1, line2] = splitAt(copy.home.eyebrow, 'for ');
  return (
    <section className="a-hero" aria-labelledby="a-title">
      <div className="a-hero__copy">
        <h1 id="a-title" className="a-display">
          <span className="a-line">{line1}</span> <span className="a-line">{line2}</span>
        </h1>
        <p className="a-lead">{copy.home.headline}</p>
        <a className="a-btn a-btn--lg" href={href('contact')} data-primary>
          {copy.actions.talk}
        </a>
      </div>
      <Ring />
      <Pic p={pictures.heroCrew} className="a-hero__photo" pos="58% 40%" />
    </section>
  );
}

function Jobs() {
  const jobs = copy.home.jobs;
  return (
    <section className="a-jobs" aria-labelledby="a-jobs-title">
      <div className="a-jobs__pic a-quadrant a-shutter" data-reveal>
        <Pic p={pictures.svc.oilGas} className="a-quadrant a-pic--deep" pos="70% 45%" />
      </div>
      <div className="a-jobs__body">
        <h2 id="a-jobs-title" className="a-h2" data-reveal>
          {copy.home.jobsTitle}
        </h2>
        <ul className="a-points">
          {jobs.map((j, i) => (
            <li key={j.title} className={`a-point${i === jobs.length - 1 ? ' a-point--lead' : ''}`} data-reveal style={stagger(i)}>
              <h3>
                <Bend />
                {j.title}
              </h3>
              <p>{j.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Ranges() {
  return (
    <section className="a-section" id="products" aria-labelledby="a-ranges-title">
      <div className="a-head">
        <div>
          <h2 id="a-ranges-title" className="a-h2" data-reveal>
            {copy.home.productsTitle}
          </h2>
          <p className="a-head__lede" data-reveal style={stagger(1)}>
            {copy.home.productsLede}
          </p>
        </div>
        <a className="a-link" href={href('products')} data-reveal style={stagger(2)}>
          {copy.actions.browse}
        </a>
      </div>
      <ul className="a-ranges">
        {copy.productRanges.map((r, i) => {
          const pic = RANGE_PIC[r.key];
          const tile = RANGE_TILE[r.key];
          return (
            <li key={r.key} data-reveal style={stagger(i % 2)}>
              <a className="a-range" href={href('products', `range-${r.key}`)}>
                {pic ? (
                  <Pic p={pic.p} pos={pic.pos} className={`a-quadrant${pic.crop ? ' a-pic--crop' : ''}`} />
                ) : tile ? (
                  <Pic p={tile} className="a-quadrant a-pic--tile" />
                ) : null}
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.lines}</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Services() {
  return (
    <section className="a-section a-fill a-services" id="services" aria-labelledby="a-services-title">
      <div className="a-head">
        <h2 id="a-services-title" className="a-h2" data-reveal>
          {copy.home.servicesTitle}
        </h2>
        <p className="a-head__lede a-lead" data-reveal style={stagger(1)}>
          {copy.home.servicesLede}
        </p>
      </div>
      <ul className="a-services__grid">
        {copy.services.map((s, i) => {
          const pic = SERVICE_PIC[s.key];
          return (
            <li key={s.key} id={`service-${s.key}`} className="a-folder" data-reveal style={stagger(i % 3)}>
              <h3>{s.title}</h3>
              <Pic p={pic.p} pos={pic.pos} />
              <p>{s.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Projects() {
  const groups = copy.home.proofGroups;
  return (
    <section className="a-section" id="projects" aria-labelledby="a-proof-title">
      <ul className="a-board">
        <li className="a-tile a-tile--head" data-reveal>
          <h2 id="a-proof-title" className="a-h2">
            {copy.home.proofTitle}
          </h2>
          <p>{copy.home.proofLede}</p>
        </li>
        {groups.map((g, i) => (
          <li key={g.label} className="a-tile" data-reveal style={stagger(i < 2 ? i + 1 : i - 2)}>
            <h3>{g.label}</h3>
            <ul>
              {g.items.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </li>
        ))}
        <li className="a-tile a-tile--wide" id="quality" data-reveal style={stagger(2)}>
          <h3>{copy.home.certTitle}</h3>
          <p className="a-cert">{copy.home.certBody}</p>
        </li>
      </ul>
    </section>
  );
}

export default function HomePage() {
  return (
    <PageShell page="home">
      <Hero />
      <section className="a-intro" aria-label={copy.brand.descriptor}>
        <Statement />
      </section>
      <Jobs />
      <Ranges />
      <Services />
      <Projects />
    </PageShell>
  );
}

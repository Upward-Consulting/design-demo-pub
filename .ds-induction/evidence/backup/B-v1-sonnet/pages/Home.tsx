// Home: the story opener, then the five jobs (statements on colour fields), the four steps (a horizontal accordion), the
// workshop (three cut photographs and the capabilities as output slips), the sites (named by sector, as text), the four
// figures (one owns the screen), the photograph strip with the three-cell bar, and the inverted close.
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { contact, home, site, branchPhonePlaceholder } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import { AmbientPause } from '../../../story/AmbientPause';
import { Btn, Img, Reveal } from '../parts/primitives';
import { Opener } from './Opener';

type Href = (p: string) => string;

const fieldClass = ['white', 'pink', 'cyan', 'orange', 'white'] as const;
const jobPics: Array<{ pic: Pic; tilt: number }> = [
  { pic: pictures.cutRockwool, tilt: -4 },
  { pic: pictures.marinePipe, tilt: 3 },
  { pic: pictures.acousticFoam, tilt: -3 },
  { pic: pictures.pyrogelHps, tilt: 4 },
  { pic: pictures.cutFoamglas, tilt: -4 },
];

function Jobs() {
  return (
    <section className="b-jobs-sec" aria-labelledby="jobs-h">
      <div className="b-jobs__head">
        <h2 id="jobs-h">{home.jobs.heading}</h2>
        <p className="b-lead">{home.jobs.lead}</p>
      </div>
      <ul>
        {home.jobs.items.map((it, i) => {
          const flip = i % 2 === 1;
          const pic = jobPics[i];
          return (
            <li key={it.key} className={`b-field b-field--${fieldClass[i] ?? 'white'}${flip ? ' b-field--flip' : ''}`}>
              <Reveal className="b-field__title">
                <h3>{it.title}</h3>
              </Reveal>
              <Reveal index={1} className="b-field__copy">
                <p className="b-body">{it.body}</p>
                <p className="b-field__mat">
                  <span>Materials: </span>
                  {it.materials}
                </p>
              </Reveal>
              {pic ? (
                <Reveal index={2} className="b-field__pic">
                  <div className="b-pic" style={{ transform: `rotate(${pic.tilt}deg)` }}>
                    <Img pic={pic.pic} />
                  </div>
                </Reveal>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const stepTints = ['var(--dB-step-1)', 'var(--dB-step-2)', 'var(--dB-step-3)', 'var(--dB-step-4)'];
const stepPics: Array<Pic | undefined> = [undefined, pictures.foamglasCryo, pictures.sheetMetalRolling, pictures.operator];

function Steps() {
  const [open, setOpen] = useState(0);
  return (
    <section className="b-steps" aria-labelledby="steps-h">
      <div className="b-steps__intro">
        <h2 id="steps-h">{home.steps.heading}</h2>
        <p className="b-lead">{home.steps.lead}</p>
      </div>
      <div className="b-accordion">
        {home.steps.items.map((s, i) => {
          const isOpen = open === i;
          const panelId = `b-step-panel-${i}`;
          const pic = stepPics[i];
          return (
            <div
              key={s.title}
              className="b-acc"
              data-open={isOpen ? 'true' : 'false'}
              style={{ ['--tint' as string]: stepTints[i] } as CSSProperties}
            >
              <h3 className="b-acc__h">
                <button type="button" className="b-acc__tab" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(i)}>
                  <span className="b-acc__tab-text">{s.title}</span>
                </button>
              </h3>
              <div id={panelId} className="b-acc__panel" inert={!isOpen}>
                <div className="b-acc__copy">
                  <p className="b-acc__big" aria-hidden="true">
                    {s.title}
                  </p>
                  <p>{s.body}</p>
                </div>
                {pic ? (
                  <div className="b-acc__pic">
                    <Img pic={pic} alt="" />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const workshopShapes = ['b-shape-slant', 'b-shape-blunt', ''] as const;

function Workshop() {
  return (
    <section className="b-workshop" aria-labelledby="ws-h">
      <div className="b-workshop__grid">
        <div className="b-workshop__head">
          <Reveal>
            <h2 id="ws-h">{home.workshop.heading}</h2>
          </Reveal>
          <Reveal index={1}>
            <p className="b-lead">{home.workshop.lead}</p>
          </Reveal>
          <Reveal index={4} className="b-slips-wrap">
            <ul className="b-slips" aria-label={home.workshop.heading}>
              {home.workshop.capabilities.map((c) => (
                <li key={c} className="b-slip">
                  <strong>{c}</strong>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="b-workshop__shapes">
          {home.workshop.items.map((w, i) => {
            const pic = pictures[w.pic as keyof typeof pictures] as Pic;
            return (
              <Reveal key={w.key} index={i + 1} className={`b-ws-item b-ws-item--${i + 1}`}>
                <figure className="b-pic">
                  <div className={`b-ws-frame ${workshopShapes[i] ?? ''}`}>
                    <Img pic={pic} />
                  </div>
                  <figcaption className="b-fig-cap">
                    <h3>{w.title}</h3>
                    <p className="b-small">{w.body}</p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Sites() {
  return (
    <section className="b-sites" aria-labelledby="sites-h">
      <div className="b-sites__head">
        <h2 id="sites-h">{home.sites.heading}</h2>
        <p className="b-lead">{home.sites.lead}</p>
      </div>
      {home.sites.groups.map((g, gi) => (
        <div key={g.sector} className="b-sector">
          <Reveal index={gi}>
            <h3>{g.sector}</h3>
            <ul className="b-tiles">
              {g.names.map((n) => (
                <li key={n} className="b-tile">
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      ))}
      <div className="b-sites__cert">
        <div className="b-tile b-tile--cert">
          <span>{home.sites.certsPlaceholder}</span>
        </div>
      </div>
    </section>
  );
}

function Figures() {
  const owner = home.figures.items.find((f) => f.value === '1981') ?? home.figures.items[0];
  const rest = home.figures.items.filter((f) => f !== owner);
  return (
    <section className="b-stats" aria-labelledby="stats-h">
      <h2 id="stats-h" className="b-stats__claim">
        Five branches, one phone number.
      </h2>
      {owner ? (
        <Reveal className="b-stats__figure">
          <p className="b-figure">
            <span>{owner.value}</span>
          </p>
          <p className="b-figure-label">{owner.label}</p>
          <p className="b-stats__caption">{owner.detail}</p>
        </Reveal>
      ) : null}
      <Reveal className="b-stats__row">
        {rest.map((f) => (
          <div key={f.label}>
            <strong>{f.value}</strong>
            <span className="b-stats__sub">{f.label}</span>
            <p>{f.detail}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

const stripPics: Pic[] = [
  pictures.lngCarrier,
  pictures.crewSign,
  pictures.miningPlant,
  pictures.branchBuilding,
  pictures.rustedFlange,
  pictures.thermobreak,
  pictures.versiFoam,
  pictures.operator,
  pictures.valvePipework,
  pictures.rubber,
];

function Strip({ href }: { href: Href }) {
  // Pictures are drawn at the same 150 px height, at their own widths, and repeated once so the marquee loops.
  return (
    <section className="b-strip-sec" aria-labelledby="branches-h">
      <div className="b-pause-row">
        <AmbientPause label="Pause motion" className="b-pause" />
      </div>
      <div className="b-strip" aria-hidden="true">
        <div className="b-strip__track" data-ambient="">
          {[0, 1].map((rep) =>
            stripPics.map((pic, i) => (
              <img
                key={`${rep}-${pic.id}`}
                src={pic.src}
                width={pic.w}
                height={pic.h}
                alt=""
                data-provenance="own"
                loading="eager"
                decoding="async"
                style={{ width: `${Math.round(150 * (pic.w / pic.h))}px`, height: 150 }}
                data-n={i}
              />
            )),
          )}
        </div>
      </div>
      <div className="b-strip-sec__body">
        <div className="b-strip-sec__head">
          <Reveal>
            <h2 id="branches-h">{contact.branchesHeading}</h2>
          </Reveal>
        </div>
        <div className="b-bar">
          <div>
            <a className="b-bar__cell" href={site.phoneHref}>
              <small>{contact.phoneLabel}</small>
              {site.phone}
            </a>
            <p className="b-bar__small">{contact.branchesNote}</p>
          </div>
          <div>
            <a className="b-bar__cell" href={site.emailHref}>
              <small>{contact.emailLabel}</small>
              {site.email}
            </a>
            <p className="b-bar__small">{branchPhonePlaceholder}</p>
          </div>
          <div>
            <a className="b-bar__cell b-bar__cell--ink" href={href('contact')}>
              {site.cta}
            </a>
            <p className="b-bar__small">{contact.lead}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing({ href }: { href: Href }) {
  return (
    <section className="b-closing b-on-ink" aria-labelledby="close-h">
      <h2 id="close-h">{home.closing.heading}</h2>
      <div className="b-closing__foot">
        <p>{home.closing.body}</p>
        <Btn href={href('contact')}>{home.closing.cta}</Btn>
      </div>
    </section>
  );
}

export function HomePage({ href }: { href: Href }) {
  return (
    <>
      <Opener href={href} />
      <Jobs />
      <Steps />
      <Workshop />
      <Sites />
      <Figures />
      <Strip href={href} />
      <Closing href={href} />
    </>
  );
}

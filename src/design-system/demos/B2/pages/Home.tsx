// Home: the story opener, then the poster sections. Each section is its own composition: statement fields (the five jobs),
// an accordion of tinted stages (the four steps), a workshop field with output slips along its edge, proof tiles (the named
// sites), one figure that owns a field (since 1981, with the other three figures beneath it), the five branches with the
// three-cell bar, and the inverted close. Every word is from the copy deck, except the three labels listed in copy_added.
import { useState } from 'react';
import type { DemoProps } from '../../../workbench/types';
import { branches, contact, home, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import { Btn, Img, Rv } from '../parts/primitives';
import { Opener } from './Opener';
import { Statements } from './Statements';

// The five jobs: each field's picture is its own (no picture repeats on this page, and none is one of the stage's stickers:
// the stickers are the cut-outs and tiles of the opener). Its colour is one of the page's.
const JOB_PICS: Record<string, Pic> = {
  temperature: pictures.pyrogelXte,
  people: pictures.valvePipework,
  noise: pictures.operator,
  fire: pictures.pyrogelHps,
  corrosion: pictures.thermobreak,
};
const JOB_TONE: Record<string, 'ink' | 'paper' | 'ground'> = {
  temperature: 'ink',
  people: 'ground',
  noise: 'paper',
  fire: 'ink',
  corrosion: 'ground',
};
const JOB_TILT: Record<string, number> = { temperature: -3, people: 2, noise: -2, fire: 3, corrosion: -2 };

// The four steps: a single hue, darkest first, each stage a lighter flat tint of it (the sheet's accordion).
const STEP_PICS: Array<Pic | null> = [pictures.branchBuilding, pictures.foamglasCryo, pictures.sheetMetalRolling, pictures.removableCovers];
const BRANCH_ALT = 'A Bellis branch building with the Bellis sign at the gate';
const STEP_TINT = ['var(--dB2-step-1)', 'var(--dB2-step-2)', 'var(--dB2-step-3)', 'var(--dB2-step-4)'];

function JobField({ id, title, body, materials, flip, tone }: { id: string; title: string; body: string; materials: string; flip: boolean; tone: 'ink' | 'paper' | 'ground' }) {
  const pic = JOB_PICS[id];
  const slips = materials.split(', ');
  return (
    <section className={`b-field b-field--${tone}${flip ? ' b-field--flip' : ''}`} aria-labelledby={`job-${id}`}>
      <Rv className="b-field__body">
        <p>{body}</p>
      </Rv>
      <h2 id={`job-${id}`} className="b-display b-mask b-field__h">
        <span className="b-mask__in">{title}</span>
      </h2>
      {pic ? (
        <Rv className="b-field__pic" style={{ ['--tilt' as string]: `${JOB_TILT[id] ?? 0}deg` }}>
          <Img pic={pic} className="b-field__img" style={{ maxWidth: pic.maxW }} />
        </Rv>
      ) : null}
      <Rv className="b-field__slips" index={1}>
        <ul className="b-slips" aria-label="Materials">
          {slips.map((s) => (
            <li key={s} className="b-slip">
              {s}
            </li>
          ))}
        </ul>
      </Rv>
    </section>
  );
}

function Steps() {
  const [open, setOpen] = useState(0);
  return (
    <section className="b-steps" aria-labelledby="steps-h">
      <div className="b-steps__intro">
        <Rv className="b-steps__hd">
          <h2 id="steps-h" className="b-display b-mask b-steps__h">
            <span className="b-mask__in">{home.steps.heading}</span>
          </h2>
        </Rv>
        <Rv index={1} className="b-steps__ld">
          <p className="b-lead">{home.steps.lead}</p>
        </Rv>
      </div>
      <div className="b-acc">
        {home.steps.items.map((s, i) => {
          const isOpen = open === i;
          const pic = STEP_PICS[i] ?? null;
          return (
            <div key={s.title} className="b-acc__stage" data-open={isOpen ? 'true' : 'false'} style={{ ['--tint' as string]: STEP_TINT[i] }}>
              <h3 className="b-acc__name">
                <button type="button" className="b-acc__btn" aria-expanded={isOpen} aria-controls={`step-${i}`} onClick={() => setOpen(i)}>
                  {s.title}
                </button>
              </h3>
              <div id={`step-${i}`} className="b-acc__body" hidden={!isOpen}>
                <p className="b-acc__text">{s.body}</p>
                {pic ? <Img pic={pic} className="b-acc__img" alt={pic === pictures.branchBuilding ? BRANCH_ALT : undefined} style={{ maxWidth: pic.maxW }} /> : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Workshop() {
  const items = home.workshop.items;
  return (
    <section className="b-workshop" aria-labelledby="workshop-h">
      <div className="b-workshop__top">
        <Rv className="b-workshop__hd">
          <h2 id="workshop-h" className="b-display b-mask">
            <span className="b-mask__in">{home.workshop.heading}</span>
          </h2>
        </Rv>
        <Rv className="b-workshop__copy">
          <p className="b-lead">{home.workshop.lead}</p>
          <ul className="b-caps" aria-label="Capabilities">
            {home.workshop.capabilities.map((c) => (
              <li key={c} className="b-slip b-slip--paper">
                {c}
              </li>
            ))}
          </ul>
        </Rv>
        <Rv className="b-workshop__pic" style={{ ['--tilt' as string]: '-3deg' }}>
          <Img pic={pictures.stainlessTanker} className="b-workshop__img" style={{ maxWidth: pictures.stainlessTanker.maxW }} />
        </Rv>
      </div>
      <div className="b-workshop__slips">
        {items.map((it, i) => (
          <Rv key={it.key} index={i} as="li" className="b-out" style={{ ['--tilt' as string]: i === 1 ? '1deg' : i === 2 ? '-1deg' : '0deg' }}>
            <h3 className="b-out__h">{it.title}</h3>
            <p className="b-out__body">{it.body}</p>
          </Rv>
        ))}
      </div>
    </section>
  );
}

function Sites() {
  return (
    <section className="b-proof" aria-labelledby="sites-h">
      <Rv className="b-proof__head">
        <h2 id="sites-h" className="b-display b-mask">
          <span className="b-mask__in">{home.sites.heading}</span>
        </h2>
        <p className="b-lead">{home.sites.lead}</p>
      </Rv>
      <div className="b-proof__board">
        {home.sites.groups.map((g, i) => (
          <Rv key={g.sector} index={i} as="div" className="b-tile">
            <h3 className="b-tile__h">{g.sector}</h3>
            <ul className="b-tile__names">
              {g.names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Rv>
        ))}
      </div>
      <p className="b-proof__cert">{home.sites.certsPlaceholder}</p>
    </section>
  );
}

function Figures() {
  const lead = home.figures.items.find((f) => f.value === '1981');
  const rest = home.figures.items.filter((f) => f.value !== '1981');
  return (
    <section className="b-stats" aria-labelledby="stats-h">
      <h2 id="stats-h" className="b-display b-mask b-stats__h">
        <span className="b-mask__in">Bellis in numbers.</span>
      </h2>
      <Rv className="b-stats__lead">
        <p className="b-figure b-figure--lead">
          <span className="b-figure__unit">since</span>
          {lead?.value}
        </p>
        <p className="b-stats__cap">{lead?.detail}</p>
      </Rv>
      <Rv index={1} className="b-stats__row">
        {rest.map((f) => (
          <div key={f.label} className="b-stats__item">
            <p className="b-figure">{f.value}</p>
            <p className="b-stats__label">{f.label}</p>
            {f.label !== 'product lines, about' ? <p className="b-stats__detail">{f.detail}</p> : null}
          </div>
        ))}
      </Rv>
    </section>
  );
}

function Branches({ href }: { href: (p: string) => string }) {
  return (
    <section className="b-branches" aria-labelledby="branches-h">
      <Rv>
        <h2 id="branches-h" className="b-display b-mask">
          <span className="b-mask__in">{contact.branchesHeading}</span>
        </h2>
      </Rv>
      <ol className="b-branch-list">
        {branches.map((b, i) => (
          <Rv key={b.id} index={i} as="li" className="b-branch">
            <h3 className="b-branch__city">{b.city}</h3>
            <p className="b-branch__addr">
              {b.address}, {b.state} {b.postcode}
            </p>
            <p className="b-branch__note">{b.note}</p>
          </Rv>
        ))}
      </ol>
      <Rv className="b-bar" index={1}>
        <div className="b-bar__cell b-bar__cell--paper">
          <p className="b-bar__label">{contact.phoneLabel}</p>
          <a className="b-bar__value" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
        <div className="b-bar__cell b-bar__cell--paper">
          <p className="b-bar__label">{contact.emailLabel}</p>
          <a className="b-bar__value" href={site.emailHref}>
            {site.email}
          </a>
        </div>
        <div className="b-bar__cell b-bar__cell--ink">
          <p className="b-bar__label">{site.cta}</p>
          <Btn href={href('contact')}>{site.cta}</Btn>
        </div>
      </Rv>
    </section>
  );
}

function Closing({ href }: { href: (p: string) => string }) {
  return (
    <section className="b-close" aria-labelledby="close-h">
      <Rv>
        <h2 id="close-h" className="b-display b-mask b-close__h">
          <span className="b-mask__in">{home.closing.heading}</span>
        </h2>
      </Rv>
      <Rv index={1} className="b-close__row">
        <p className="b-lead">{home.closing.body}</p>
        <div className="b-close__act">
          <Btn href={href('contact')}>{home.closing.cta}</Btn>
          <a className="b-close__phone" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
      </Rv>
    </section>
  );
}

export function HomePage({ href }: DemoProps) {
  const jobs = home.jobs.items;
  return (
    <>
      <Opener href={href} />
      <Statements />
      <section className="b-jobs-intro" aria-labelledby="jobs-h">
        <Rv>
          <h2 id="jobs-h" className="b-display b-mask">
            <span className="b-mask__in">{home.jobs.heading}</span>
          </h2>
        </Rv>
        <Rv index={1}>
          <p className="b-lead">{home.jobs.lead}</p>
        </Rv>
      </section>
      {jobs.map((j, i) => (
        <JobField key={j.key} id={j.key} title={j.title} body={j.body} materials={j.materials} flip={i % 2 === 1} tone={JOB_TONE[j.key] ?? 'paper'} />
      ))}
      <Steps />
      <Workshop />
      <Sites />
      <Figures />
      <Branches href={href} />
      <Closing href={href} />
    </>
  );
}

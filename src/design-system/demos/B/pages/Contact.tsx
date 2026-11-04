// Contact: the hero (the team photograph once), one cyan field holding the photo strip (a slow marquee with a pause control),
// the five branches with the branch-phone placeholder where a branch number belongs, the three-cell bar, and the enquiry
// form: native fields with labels, client-side validation with the deck's error text, aria-invalid and aria-describedby,
// an error summary that takes focus on a failed submit, and a local success state (no network call).
import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import type { DemoProps } from '../../../workbench/types';
import { branchPhonePlaceholder, branches, contact, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import { Btn, Img, Rv } from '../parts/primitives';

const STRIP: Pic[] = [
  pictures.marinePipe,
  pictures.pyrogelHps,
  pictures.banding,
  pictures.needleFelt,
  pictures.rockwool,
  pictures.operator,
  pictures.rubber,
  pictures.versiFoam,
  pictures.interam,
  pictures.foamglas,
  pictures.expansionJoint,
  pictures.miningPlant,
  pictures.pyrogelCut,
  pictures.sheetMetalRolling,
  pictures.acousticFoam,
  pictures.perlite,
];

const COPY = {
  call: 'Call',
  stripHeading: 'Photographs of Bellis work',
  pause: 'Pause the photographs',
  play: 'Play the photographs',
};

type Values = { name: string; company: string; email: string; phone: string; branch: string; job: string; message: string };
const EMPTY: Values = { name: '', company: '', email: '', phone: '', branch: '', job: '', message: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const f = contact.form.fields;
  const e: Partial<Record<keyof Values, string>> = {};
  if (!v.name.trim()) e.name = f.name.error;
  if (!v.company.trim()) e.company = f.company.error;
  if (!v.email.trim()) e.email = f.email.error;
  else if (!EMAIL.test(v.email.trim())) e.email = f.email.errorFormat;
  if (!v.branch) e.branch = f.branch.error;
  if (!v.job) e.job = f.job.error;
  if (!v.message.trim()) e.message = f.message.error;
  return e;
}

// The enquiry form's field order (the summary lists errors in this order too).
const ORDER: Array<keyof Values> = ['name', 'company', 'email', 'branch', 'job', 'message'];

function Strip() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="b-strip" aria-labelledby="strip-h">
      <h2 id="strip-h" className="b-sr">
        {COPY.stripHeading}
      </h2>
      <div className="b-strip__track" data-paused={paused ? 'true' : 'false'}>
        {[0, 1].map((rep) => (
          <div key={rep} className="b-strip__set" aria-hidden={rep === 1 ? 'true' : undefined}>
            {STRIP.map((p) => (
              <Img key={`${rep}-${p.id}`} pic={p} alt={rep === 0 ? p.alt : ''} className="b-strip__img" />
            ))}
          </div>
        ))}
      </div>
      <button type="button" className="b-strip__pause" aria-pressed={paused} onClick={() => setPaused((x) => !x)}>
        {paused ? COPY.play : COPY.pause}
      </button>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className={`b-field-row${error ? ' is-error' : ''}`}>
      <label htmlFor={id} className="b-field-label">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="b-field-hint">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-err`} className="b-field-err">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactPage(_props: DemoProps) {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const success = useRef<HTMLHeadingElement>(null);
  const f = contact.form.fields;
  const errKeys = ORDER.filter((k) => errors[k]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((x) => ({ ...x, [k]: e.target.value }));
  const describedBy = (k: keyof Values, hint?: boolean) => {
    const parts: string[] = [];
    if (hint) parts.push(`${k}-hint`);
    if (errors[k]) parts.push(`${k}-err`);
    return parts.length ? parts.join(' ') : undefined;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(v);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setSent(true);
    requestAnimationFrame(() => success.current?.focus());
  };

  return (
    <>
      <section className="b-hero b-hero--ground" aria-labelledby="contact-h">
        <div className="b-hero__copy">
          <Rv className="b-hero__h">
            <h1 id="contact-h" className="b-display b-mask">
              <span className="b-mask__in">{contact.h1}</span>
            </h1>
          </Rv>
          <Rv index={1} className="b-hero__lead">
            <p className="b-lead">{contact.lead}</p>
          </Rv>
          <Rv index={2} className="b-hero__act">
            <Btn href={site.phoneHref}>
              {COPY.call} {site.phone}
            </Btn>
          </Rv>
        </div>
        <Rv index={2} className="b-contact-hero__pic">
          <Img pic={pictures.crewSign} eager alt="Six workers in yellow hi-vis beside a Bellis sign on a stand and insulated pipework" className="b-contact-hero__img" style={{ maxWidth: pictures.crewSign.maxW }} />
        </Rv>
      </section>

      <div className="b-cfield">
        <Strip />

        <section className="b-cbranches" aria-labelledby="branches-h">
          <Rv>
            <h2 id="branches-h" className="b-display b-mask">
              <span className="b-mask__in">{contact.branchesHeading}</span>
            </h2>
          </Rv>
          <Rv index={1}>
            <p className="b-lead">{contact.branchesNote}</p>
          </Rv>
          <ul className="b-crows">
            {branches.map((b, i) => (
              <Rv key={b.id} index={i} as="li" className="b-crow">
                <h3 className="b-crow__city">{b.city}</h3>
                <p className="b-crow__addr">
                  {b.address}, {b.state} {b.postcode}
                </p>
                <p className="b-crow__note">{b.note}</p>
                <p className="b-crow__phone">{branchPhonePlaceholder}</p>
              </Rv>
            ))}
          </ul>
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
              <a className="b-bar__go" href="#enquiry">
                {contact.form.submit}
              </a>
            </div>
          </Rv>
        </section>

        <section id="enquiry" className="b-enquiry" aria-labelledby="enquiry-h">
          <div className="b-enquiry__intro">
            <Rv className="b-enquiry__hd">
              <h2 id="enquiry-h" className="b-display b-mask">
                <span className="b-mask__in">{contact.form.heading}</span>
              </h2>
            </Rv>
            <Rv index={1} className="b-enquiry__pic">
              <Img pic={pictures.branchBuilding} alt="A Bellis branch building with the Bellis sign at the gate" className="b-enquiry__img" style={{ maxWidth: pictures.branchBuilding.maxW }} />
            </Rv>
          </div>

          {sent ? (
            <div className="b-success" role="group" aria-label={contact.form.successTitle}>
              <h3 ref={success} tabIndex={-1} className="b-display b-success__h">
                {contact.form.successTitle}
              </h3>
              <p className="b-lead">{contact.form.successBody}</p>
              <a className="b-phone" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
          ) : (
            <form className="b-form" noValidate onSubmit={onSubmit} aria-describedby={errKeys.length ? 'err-summary' : undefined}>
              {errKeys.length > 0 ? (
                <div id="err-summary" ref={summary} tabIndex={-1} className="b-summary" role="alert">
                  <p className="b-summary__head">{contact.form.errorSummary}</p>
                  <ul>
                    {errKeys.map((k) => (
                      <li key={k}>
                        <a href={`#f-${k}`} className="b-summary__link">
                          {errors[k]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Field id="f-name" label={f.name.label} error={errors.name}>
                <input id="f-name" name="name" type="text" autoComplete="name" value={v.name} onChange={set('name')} aria-required="true" aria-invalid={errors.name ? 'true' : undefined} aria-describedby={describedBy('name')} />
              </Field>
              <Field id="f-company" label={f.company.label} error={errors.company}>
                <input id="f-company" name="company" type="text" autoComplete="organization" value={v.company} onChange={set('company')} aria-required="true" aria-invalid={errors.company ? 'true' : undefined} aria-describedby={describedBy('company')} />
              </Field>
              <Field id="f-email" label={f.email.label} error={errors.email}>
                <input id="f-email" name="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} aria-required="true" aria-invalid={errors.email ? 'true' : undefined} aria-describedby={describedBy('email')} />
              </Field>
              <Field id="f-phone" label={f.phone.label} hint={f.phone.hint}>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} aria-describedby={describedBy('phone', true)} />
              </Field>
              <Field id="f-branch" label={f.branch.label} error={errors.branch}>
                <select id="f-branch" name="branch" value={v.branch} onChange={set('branch')} aria-required="true" aria-invalid={errors.branch ? 'true' : undefined} aria-describedby={describedBy('branch')}>
                  <option value="">{f.branch.placeholder}</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.city}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-job" label={f.job.label} error={errors.job}>
                <select id="f-job" name="job" value={v.job} onChange={set('job')} aria-required="true" aria-invalid={errors.job ? 'true' : undefined} aria-describedby={describedBy('job')}>
                  <option value="">{f.job.placeholder}</option>
                  {f.job.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-message" label={f.message.label} hint={f.message.hint} error={errors.message}>
                <textarea id="f-message" name="message" rows={5} value={v.message} onChange={set('message')} aria-required="true" aria-invalid={errors.message ? 'true' : undefined} aria-describedby={describedBy('message', true)} />
              </Field>
              <div className="b-form__act">
                <button type="submit" className="b-btn b-btn--submit">
                  {contact.form.submit}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </>
  );
}

// Contact: the main line and the sales email, the five branches as a line-up, and the enquiry form. The form validates on
// submit with the deck's own error text, marks each invalid field (aria-invalid, aria-describedby), moves focus to the
// error summary on a failed submit, and shows a local success state (no network call).
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { branches, branchPhonePlaceholder, contact, home, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import { Btn, Img, Reveal } from '../parts/primitives';

type Href = (p: string) => string;

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  branch: string;
  job: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = { name: '', company: '', email: '', phone: '', branch: '', job: '', message: '' };
const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const order: Array<keyof Values> = ['name', 'company', 'email', 'phone', 'branch', 'job', 'message'];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = contact.form.fields.name.error;
  if (!v.company.trim()) e.company = contact.form.fields.company.error;
  if (!v.email.trim()) e.email = contact.form.fields.email.error;
  else if (!emailShape.test(v.email.trim())) e.email = contact.form.fields.email.errorFormat;
  if (!v.branch) e.branch = contact.form.fields.branch.error;
  if (!v.job) e.job = contact.form.fields.job.error;
  if (!v.message.trim()) e.message = contact.form.fields.message.error;
  return e;
}

export function ContactPage(_props: { href: Href }) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const f = contact.form.fields;

  const set = (k: keyof Values, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    setSubmitted(true);
    if (Object.keys(e).length > 0) {
      window.setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setSent(true);
    window.setTimeout(() => success.current?.focus(), 0);
  };

  const invalid = (k: keyof Values) => (errors[k] ? 'true' : undefined);
  const describe = (k: keyof Values, extra?: string) => [errors[k] ? `${k}-error` : null, extra ?? null].filter(Boolean).join(' ') || undefined;
  const failed = order.filter((k) => errors[k]);

  return (
    <>
      <section className="b-page-hero b-contact-hero" aria-labelledby="contact-h1">
        <h1 id="contact-h1">
          Talk to an{' '}
          <br />
          expert.
        </h1>
        <p className="b-lead">{contact.lead}</p>
        <Reveal index={1} className="b-contact-hero__pic">
          <div className="b-pic">
            <Img pic={pictures.crewSign} />
          </div>
        </Reveal>
        <Reveal index={2} className="b-contact-cells">
          <a className="b-bar__cell" href={site.phoneHref}>
            <small>{contact.phoneLabel}</small>
            {site.phone}
          </a>
          <a className="b-bar__cell b-bar__cell--ink" href={site.emailHref}>
            <small>{contact.emailLabel}</small>
            {site.email}
          </a>
        </Reveal>
      </section>

      <section className="b-photo-row" aria-label="Bellis at work">
        {[pictures.branchBuilding, pictures.operator, pictures.sheetMetalRolling].map((pic, i) => (
          <Reveal key={pic.id} index={i} className={`b-photo-row__item b-photo-row__item--${i + 1}`}>
            <div className="b-pic">
              <Img pic={pic} />
            </div>
          </Reveal>
        ))}
      </section>

      <section className="b-cbranches" aria-labelledby="branches-h">
        <div className="b-cbranches__head">
          <Reveal className="b-cbranches__title">
            <h2 id="branches-h">{contact.branchesHeading}</h2>
          </Reveal>
          <Reveal index={1} className="b-cbranches__note">
            <p>{contact.branchesNote}</p>
          </Reveal>
        </div>
        <ol className="b-lineup-branch">
          {branches.map((b) => (
            <li key={b.id} className="b-lineup-branch__row">
              <div className="b-lineup-branch__row-inner">
                <h3>{b.city}</h3>
                <p className="b-lineup-branch__note">{b.note}</p>
                <p>
                  {b.address} {b.state} {b.postcode}
                </p>
                <p className="b-branch__phone">{branchPhonePlaceholder}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="b-cform" aria-labelledby="form-h">
        <div className="b-cform__intro">
          <Reveal>
            <div className="b-pic b-pic--a">
              <Img pic={pictures.crewSign} />
            </div>
          </Reveal>
          <Reveal index={1}>
            <p className="b-body">{home.closing.body}</p>
          </Reveal>
        </div>

        <Reveal index={2} className="b-cform__body">
          {sent ? (
            <div ref={success} className="b-success" tabIndex={-1} role="status" aria-labelledby="sent-h">
              <h2 id="sent-h">{contact.form.successTitle}</h2>
              <p>{contact.form.successBody}</p>
              <Btn href={site.phoneHref} tone="ink">
                {site.phone}
              </Btn>
            </div>
          ) : (
            <>
              <h2 id="form-h">{contact.form.heading}</h2>
              <form className="b-form" noValidate onSubmit={onSubmit}>
                {failed.length > 0 ? (
                  <div ref={summary} className="b-summary" tabIndex={-1} id="form-summary" role="alert">
                    <h2 id="summary-h">{contact.form.errorSummary}</h2>
                    <ul>
                      {failed.map((k) => (
                        <li key={k}>
                          <a href={`#f-${k}`}>{errors[k]}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="b-field-group">
                  <label htmlFor="f-name">{f.name.label}</label>
                  <input
                    id="f-name"
                    className="b-input"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    aria-invalid={invalid('name')}
                    aria-describedby={describe('name')}
                    onChange={(e) => set('name', e.target.value)}
                  />
                  {errors.name ? (
                    <p id="name-error" className="b-error">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="b-field-group">
                  <label htmlFor="f-company">{f.company.label}</label>
                  <input
                    id="f-company"
                    className="b-input"
                    name="company"
                    autoComplete="organization"
                    value={values.company}
                    aria-invalid={invalid('company')}
                    aria-describedby={describe('company')}
                    onChange={(e) => set('company', e.target.value)}
                  />
                  {errors.company ? (
                    <p id="company-error" className="b-error">
                      {errors.company}
                    </p>
                  ) : null}
                </div>

                <div className="b-field-group">
                  <label htmlFor="f-email">{f.email.label}</label>
                  <input
                    id="f-email"
                    className="b-input"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    aria-invalid={invalid('email')}
                    aria-describedby={describe('email')}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  {errors.email ? (
                    <p id="email-error" className="b-error">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="b-field-group">
                  <label htmlFor="f-phone">{f.phone.label}</label>
                  <input
                    id="f-phone"
                    className="b-input"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    aria-describedby="phone-hint"
                    onChange={(e) => set('phone', e.target.value)}
                  />
                  <p id="phone-hint" className="b-hint">
                    {f.phone.hint}
                  </p>
                </div>

                <div className="b-field-group">
                  <label htmlFor="f-branch">{f.branch.label}</label>
                  <select
                    id="f-branch"
                    className="b-select"
                    name="branch"
                    value={values.branch}
                    aria-invalid={invalid('branch')}
                    aria-describedby={describe('branch')}
                    onChange={(e) => set('branch', e.target.value)}
                  >
                    <option value="">{f.branch.placeholder}</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.city}, {b.note}
                      </option>
                    ))}
                  </select>
                  {errors.branch ? (
                    <p id="branch-error" className="b-error">
                      {errors.branch}
                    </p>
                  ) : null}
                </div>

                <div className="b-field-group">
                  <label htmlFor="f-job">{f.job.label}</label>
                  <select
                    id="f-job"
                    className="b-select"
                    name="job"
                    value={values.job}
                    aria-invalid={invalid('job')}
                    aria-describedby={describe('job')}
                    onChange={(e) => set('job', e.target.value)}
                  >
                    <option value="">{f.job.placeholder}</option>
                    {f.job.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {errors.job ? (
                    <p id="job-error" className="b-error">
                      {errors.job}
                    </p>
                  ) : null}
                </div>

                <div className="b-field-group b-field-group--wide">
                  <label htmlFor="f-message">{f.message.label}</label>
                  <textarea
                    id="f-message"
                    className="b-textarea"
                    name="message"
                    value={values.message}
                    aria-invalid={invalid('message')}
                    aria-describedby={describe('message', 'message-hint')}
                    onChange={(e) => set('message', e.target.value)}
                  />
                  <p id="message-hint" className="b-hint">
                    {f.message.hint}
                  </p>
                  {errors.message ? (
                    <p id="message-error" className="b-error">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="b-form__actions">
                  <button type="submit" className="b-btn b-btn--primary">
                    {contact.form.submit}
                  </button>
                </div>
              </form>
            </>
          )}
        </Reveal>
      </section>
    </>
  );
}

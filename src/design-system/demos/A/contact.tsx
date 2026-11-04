// Contact: the number first, the five branches as a distribution list, and the enquiry form with client-side validation.
// The form does no network call: a valid submit shows the success state, locally. Error text, the summary and the
// aria wiring follow the deck's words exactly.
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { branchPhonePlaceholder, branches, contact, site } from '../../content/demo-copy';
import { pictures } from '../../assets/own/pictures';
import { Arrow, Img } from './parts';

type FieldKey = 'name' | 'company' | 'email' | 'phone' | 'branch' | 'job' | 'message';
type Values = Record<FieldKey, string>;
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: Values = { name: '', company: '', email: '', phone: '', branch: '', job: '', message: '' };
const ORDER: FieldKey[] = ['name', 'company', 'email', 'branch', 'job', 'message'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  const f = contact.form.fields;
  if (!v.name.trim()) e.name = f.name.error;
  if (!v.company.trim()) e.company = f.company.error;
  if (!v.email.trim()) e.email = f.email.error;
  else if (!EMAIL.test(v.email.trim())) e.email = f.email.errorFormat;
  if (!v.branch) e.branch = f.branch.error;
  if (!v.job) e.job = f.job.error;
  if (!v.message.trim()) e.message = f.message.error;
  return e;
}

export function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'editing' | 'failed' | 'sent'>('editing');
  const summary = useRef<HTMLDivElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const f = contact.form.fields;

  const set = (key: FieldKey) => (value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setState('failed');
      // Focus the summary: a screen reader announces it, and the keyboard user is at the top of the problem.
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setErrors({});
    setState('sent');
    requestAnimationFrame(() => success.current?.focus());
  };

  const describedBy = (key: FieldKey, hint?: string) =>
    [hint ? `hint-${key}` : '', errors[key] ? `err-${key}` : ''].filter(Boolean).join(' ') || undefined;

  const invalid = (key: FieldKey) => (errors[key] ? true : undefined);

  return (
    <>
      <section className="a-section a-dark" aria-labelledby="h-contact" style={{ paddingBottom: 96 }}>
        <div className="a-axis">
          <div className="a-side a-side--after">
            <a className="a-contact-phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <p className="a-small a-muted" style={{ marginTop: 10 }}>
              {contact.phoneLabel}
            </p>
            <a className="a-contact-email a-ulink" href={site.emailHref} style={{ marginTop: 48 }}>
              {site.email}
            </a>
            <p className="a-small a-muted" style={{ marginTop: 10 }}>
              {contact.emailLabel}
            </p>
          </div>
          <div className="a-main">
            <h1 id="h-contact" className="a-h1" data-a-reveal="">
              {contact.h1}
            </h1>
            <p className="a-lead" style={{ marginTop: 32, maxWidth: '30ch' }}>
              {contact.lead}
            </p>
          </div>
        </div>
        <div className="a-axis" style={{ marginTop: 72 }}>
          <div className="a-side" />
          <div className="a-main">
            <figure className="a-pic a-masthead-img" style={{ aspectRatio: '16 / 9' }}>
              <Img pic={pictures.branchBuilding} eager />
            </figure>
          </div>
        </div>
      </section>

      <section className="a-section a-paper" aria-labelledby="h-branches">
        <div className="a-axis">
          <div className="a-side">
            <p className="a-lead">{contact.branchesNote}</p>
          </div>
          <div className="a-main">
            <h2 id="h-branches" className="a-h2">
              {contact.branchesHeading}
            </h2>
          </div>
        </div>
        <ul className="a-branch-list" style={{ marginTop: 64 }}>
          {branches.map((b) => (
            <li key={b.id} id={`branch-${b.id}`} className="a-branch" data-a-reveal="">
              <p className="a-branch-city">
                {b.city}
                <small>{b.note}</small>
              </p>
              <p className="a-branch-addr">
                <span>{b.address}</span>
                <span>
                  {b.state} {b.postcode}
                </span>
                <span className="a-phone-placeholder">{branchPhonePlaceholder}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="a-strip" data-a-reveal="">
        <figure>
          <Img pic={pictures.expansionJoint} />
        </figure>
        <figure>
          <Img pic={pictures.valvePipework} />
        </figure>
        <figure>
          <Img pic={pictures.operator} />
        </figure>
      </div>

      <section className="a-section a-dark" aria-labelledby="h-form">
        <div className="a-axis">
          <div className="a-side">
            <figure className="a-pic" style={{ aspectRatio: '4 / 3' }}>
              <Img pic={pictures.crewSign} />
            </figure>
          </div>
          <div className="a-main a-form-wrap">
            <h2 id="h-form" className="a-h2">
              {contact.form.heading}
            </h2>

            {state === 'sent' ? (
              <div ref={success} className="a-success" role="status" tabIndex={-1}>
                <h3>{contact.form.successTitle}</h3>
                <p>{contact.form.successBody}</p>
              </div>
            ) : (
              <form className="a-form" noValidate onSubmit={onSubmit} aria-label={contact.form.heading}>
                {state === 'failed' ? (
                  <div ref={summary} className="a-summary a-wide" role="alert" tabIndex={-1}>
                    <p style={{ fontWeight: 600 }}>{contact.form.errorSummary}</p>
                    <ul>
                      {ORDER.filter((k) => errors[k]).map((k) => (
                        <li key={k}>
                          <a href={`#f-${k}`}>{errors[k]}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="a-field-group" data-a-reveal="">
                  <label className="a-label" htmlFor="f-name">
                    {f.name.label}
                  </label>
                  <input
                    id="f-name"
                    className="a-input"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set('name')(e.target.value)}
                    aria-invalid={invalid('name')}
                    aria-describedby={describedBy('name')}
                  />
                  {errors.name ? (
                    <p id="err-name" className="a-error">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="a-field-group" data-a-reveal="">
                  <label className="a-label" htmlFor="f-company">
                    {f.company.label}
                  </label>
                  <input
                    id="f-company"
                    className="a-input"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => set('company')(e.target.value)}
                    aria-invalid={invalid('company')}
                    aria-describedby={describedBy('company')}
                  />
                  {errors.company ? (
                    <p id="err-company" className="a-error">
                      {errors.company}
                    </p>
                  ) : null}
                </div>

                <div className="a-field-group" data-a-reveal="">
                  <label className="a-label" htmlFor="f-email">
                    {f.email.label}
                  </label>
                  <input
                    id="f-email"
                    className="a-input"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => set('email')(e.target.value)}
                    aria-invalid={invalid('email')}
                    aria-describedby={describedBy('email')}
                  />
                  {errors.email ? (
                    <p id="err-email" className="a-error">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="a-field-group" data-a-reveal="">
                  <label className="a-label" htmlFor="f-phone">
                    {f.phone.label}
                  </label>
                  <input
                    id="f-phone"
                    className="a-input"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => set('phone')(e.target.value)}
                    aria-describedby="hint-phone"
                  />
                  <p id="hint-phone" className="a-hint">
                    {f.phone.hint}
                  </p>
                </div>

                <div className="a-field-group" data-a-reveal="">
                  <label className="a-label" htmlFor="f-branch">
                    {f.branch.label}
                  </label>
                  <select
                    id="f-branch"
                    className="a-select"
                    value={values.branch}
                    onChange={(e) => set('branch')(e.target.value)}
                    aria-invalid={invalid('branch')}
                    aria-describedby={describedBy('branch')}
                  >
                    <option value="">{f.branch.placeholder}</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.city}>
                        {b.city}
                      </option>
                    ))}
                  </select>
                  {errors.branch ? (
                    <p id="err-branch" className="a-error">
                      {errors.branch}
                    </p>
                  ) : null}
                </div>

                <div className="a-field-group" data-a-reveal="">
                  <label className="a-label" htmlFor="f-job">
                    {f.job.label}
                  </label>
                  <select
                    id="f-job"
                    className="a-select"
                    value={values.job}
                    onChange={(e) => set('job')(e.target.value)}
                    aria-invalid={invalid('job')}
                    aria-describedby={describedBy('job')}
                  >
                    <option value="">{f.job.placeholder}</option>
                    {f.job.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {errors.job ? (
                    <p id="err-job" className="a-error">
                      {errors.job}
                    </p>
                  ) : null}
                </div>

                <div className="a-field-group a-wide" data-a-reveal="">
                  <label className="a-label" htmlFor="f-message">
                    {f.message.label}
                  </label>
                  <p id="hint-message" className="a-hint">
                    {f.message.hint}
                  </p>
                  <textarea
                    id="f-message"
                    className="a-textarea"
                    value={values.message}
                    onChange={(e) => set('message')(e.target.value)}
                    aria-invalid={invalid('message')}
                    aria-describedby={describedBy('message', f.message.hint)}
                  />
                  {errors.message ? (
                    <p id="err-message" className="a-error">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="a-form-actions">
                  <button type="submit" className="a-btn">
                    {contact.form.submit}
                    <Arrow />
                  </button>
                  <p className="a-small">
                    {contact.phoneLabel}: <a className="a-phone" href={site.phoneHref}>{site.phone}</a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

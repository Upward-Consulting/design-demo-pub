import { useRef, useState, type FormEvent } from 'react';
import { copy, pictures } from '../../content/demo-copy';
import { NEED_PIC } from './catalogue';
import { Bend, Pic, PageShell, Ring, stagger } from './parts';

type Field = 'name' | 'company' | 'email' | 'phone' | 'branch' | 'need' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: '', company: '', email: '', phone: '', branch: '', need: '', message: '' };
const ORDER: Field[] = ['need', 'name', 'company', 'email', 'phone', 'branch', 'message'];
const f = copy.contactPage.fields;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Enter your name';
  if (!v.email.trim()) e.email = 'Enter an email address';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter an email address like name@company.com.au';
  if (v.phone.trim() && v.phone.replace(/\D/g, '').length < 8) e.phone = 'Enter a phone number with at least 8 digits';
  if (!v.branch) e.branch = 'Choose your nearest branch';
  if (!v.need) e.need = 'Choose what you need';
  if (!v.message.trim()) e.message = 'Describe the job';
  return e;
}

function Err({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p className="a-err" id={id}>
      <Bend />
      {text}
    </p>
  );
}

function Hero() {
  const [l1, l2] = ['Talk to', 'an expert'];
  const whole = copy.contactPage.title;
  return (
    <section className="a-hero a-hero--short" aria-labelledby="a-title">
      <div className="a-hero__copy">
        <h1 id="a-title" className="a-title">
          {whole === `${l1} ${l2}` ? (
            <>
              <span className="a-line">{l1}</span> <span className="a-line">{l2}</span>
            </>
          ) : (
            whole
          )}
        </h1>
        <p className="a-lead">{copy.contactPage.lede}</p>
        <div className="a-hero__extra">
          <a className="a-btn a-btn--lg" href={copy.contact.phoneHref} data-primary>
            {copy.actions.call}
          </a>
          <a className="a-link" href={copy.contact.emailHref}>
            {copy.contact.email}
          </a>
        </div>
      </div>
      <Ring />
      <Pic p={pictures.svc.technical} className="a-hero__photo" pos="46% 30%" />
    </section>
  );
}

function Enquiry() {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const set = (k: Field, value: string) => {
    setV((old) => ({ ...old, [k]: value }));
    if (tried) setErrors((old) => ({ ...old, [k]: validate({ ...v, [k]: value })[k] }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    setTried(true);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(first === 'need' ? 'input[name="need"]' : `#a-f-${first}`);
      el?.focus();
      return;
    }
    setSent(true);
    window.setTimeout(() => doneRef.current?.focus(), 30);
  };

  const count = Object.values(errors).filter(Boolean).length;
  const describe = (k: Field) => (errors[k] ? `a-e-${k}` : undefined);

  const needs = (
    <fieldset className="a-needs" aria-invalid={errors.need ? true : undefined} aria-describedby={describe('need')}>
      <legend>{f.need}</legend>
      <div className="a-needs__grid">
        {copy.contactPage.needs.map((n, i) => {
          const pic = NEED_PIC[n];
          const id = `a-f-need-${i}`;
          return (
            <div key={n} className="a-need" data-reveal style={stagger(i)}>
              <input id={id} type="radio" name="need" value={n} checked={v.need === n} onChange={() => set('need', n)} />
              <label htmlFor={id}>
                {pic && <Pic p={pic.p} pos={pic.pos} />}
                <span className="a-need__text">
                  <Bend />
                  {n}
                </span>
              </label>
            </div>
          );
        })}
      </div>
      <Err id="a-e-need" text={errors.need} />
    </fieldset>
  );

  return (
    <section className="a-coupon a-fill" id="enquiry" aria-labelledby="a-enquiry-title" data-primary>
      <form
        ref={formRef}
        className="a-coupon__form"
        noValidate
        onSubmit={submit}
        aria-labelledby="a-enquiry-title"
        aria-describedby={count ? 'a-form-summary' : undefined}
      >
        <div className="a-coupon__stub">
          <div data-reveal>
            <h2 id="a-enquiry-title">{copy.home.closingTitle}</h2>
            <p style={{ marginTop: 18 }}>{copy.home.closingBody}</p>
          </div>
          {sent ? (
            <p className="a-coupon__chosen">
              <Bend />
              {v.need}
            </p>
          ) : (
            needs
          )}
        </div>

        {sent ? (
          <div className="a-success" role="status">
            <h3 ref={doneRef} tabIndex={-1}>
              Thank you, {v.name.trim().split(' ')[0]}.
            </h3>
            <p>
              This demo sends nothing. On the live site your enquiry would go to the {v.branch} branch, and a technical
              contact would reply to the details you give.
            </p>
            <button type="button" className="a-btn a-btn--inverse" onClick={() => setSent(false)}>
              Edit enquiry
            </button>
          </div>
        ) : (
          <div className="a-form">
          {count > 0 && (
            <p className="a-form__summary" id="a-form-summary" role="alert">
              <Bend />
              {count === 1 ? 'Check the field marked below.' : `Check the ${count} fields marked below.`}
            </p>
          )}
          <div className="a-ctl" data-reveal style={stagger(0)}>
            <label htmlFor="a-f-name">{f.name}</label>
            <input
              id="a-f-name"
              name="name"
              autoComplete="name"
              value={v.name}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describe('name')}
              required
            />
            <Err id="a-e-name" text={errors.name} />
          </div>
          <div className="a-ctl" data-reveal style={stagger(1)}>
            <label htmlFor="a-f-company">{f.company}</label>
            <input id="a-f-company" name="company" autoComplete="organization" value={v.company} onChange={(e) => set('company', e.target.value)} />
          </div>
          <div className="a-ctl" data-reveal style={stagger(0)}>
            <label htmlFor="a-f-email">{f.email}</label>
            <input
              id="a-f-email"
              name="email"
              type="email"
              autoComplete="email"
              value={v.email}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describe('email')}
              required
            />
            <Err id="a-e-email" text={errors.email} />
          </div>
          <div className="a-ctl" data-reveal style={stagger(1)}>
            <label htmlFor="a-f-phone">{f.phone}</label>
            <input
              id="a-f-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={v.phone}
              onChange={(e) => set('phone', e.target.value)}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describe('phone')}
            />
            <Err id="a-e-phone" text={errors.phone} />
          </div>
          <div className="a-ctl a-ctl--full" data-reveal style={stagger(0)}>
            <label htmlFor="a-f-branch">{f.branch}</label>
            <div className="a-select">
              <select
                id="a-f-branch"
                name="branch"
                value={v.branch}
                onChange={(e) => set('branch', e.target.value)}
                aria-invalid={errors.branch ? true : undefined}
                aria-describedby={describe('branch')}
                required
              >
                <option value="">Choose a branch</option>
                {copy.contactPage.branches.map((b) => (
                  <option key={b.city} value={b.city}>
                    {b.city}
                  </option>
                ))}
              </select>
            </div>
            <Err id="a-e-branch" text={errors.branch} />
          </div>
          <div className="a-ctl a-ctl--full" data-reveal style={stagger(1)}>
            <label htmlFor="a-f-message">{f.message}</label>
            <textarea
              id="a-f-message"
              name="message"
              rows={4}
              value={v.message}
              onChange={(e) => set('message', e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describe('message')}
              required
            />
            <Err id="a-e-message" text={errors.message} />
          </div>
          <button type="submit" className="a-btn a-btn--inverse a-submit">
            {copy.actions.send}
          </button>
          </div>
        )}
      </form>
    </section>
  );
}

function Branches() {
  const p = copy.contactPage;
  return (
    <section className="a-section" aria-labelledby="a-branches-title">
      <h2 id="a-branches-title" className="a-h2" data-reveal>
        {p.branchesTitle}
      </h2>
      <ul className="a-branches">
        {p.branches.map((b, i) => (
          <li key={b.city} className="a-branch" data-reveal style={stagger(i)}>
            <h3>
              <Bend />
              {b.city}
            </h3>
            <p>{b.address}</p>
            <p className="a-muted">{copy.contact.branchPhone}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ContactPage() {
  return (
    <PageShell page="contact" closing={false}>
      <Hero />
      <Enquiry />
      <Branches />
    </PageShell>
  );
}

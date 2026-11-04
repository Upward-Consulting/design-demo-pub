import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { branches, company } from '../content/site';
import { Dash, Ph, TempLine } from '../components/primitives';
import { Icon } from '../components/Icons';

const enquiryTypes = [
  'Product question',
  'Cost estimate',
  'Maintenance or shutdown',
  'Fabrication or covers',
  'Corrosion under insulation',
  'Something else',
];

export default function Contact() {
  const [params] = useSearchParams();
  const product = params.get('product') ?? '';
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // The enquiry handler is not connected in this design prototype.
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-head wrap">
        <Dash />
        <h1>Talk to an expert.</h1>
        <p className="lead">
          Send the line, the operating temperature and the programme. We reply with the material, the estimate or the
          shutdown plan.
        </p>
      </section>

      <section className="wrap contact-grid">
        <div className="contact-info">
          <a className="contact-info__phone" href={company.phoneHref}>
            <Icon name="phone" />
            <span>
              <small>Main line</small>
              {company.phone}
            </span>
          </a>
          <a className="contact-info__mail" href={company.email_href}>
            <Icon name="mail" />
            <span>
              <small>Sales</small>
              {company.email}
            </span>
          </a>
          <p className="contact-info__hq">
            <Icon name="pin" />
            <span>
              <small>Head office</small>
              {company.hq}
            </span>
          </p>

          <div className="run" aria-label="Five branches on one run, west to east">
            <ol className="run__list">
              {['Perth', 'Darwin', 'Melbourne', 'Gladstone', 'Brisbane'].map((city) => (
                <li key={city}>
                  <span className="run__node" aria-hidden="true" />
                  <span>{city}</span>
                </li>
              ))}
            </ol>
            <TempLine className="run__line" />
          </div>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <fieldset>
            <legend>Your enquiry</legend>

            <div className="form__row">
              <div className="field">
                <label htmlFor="name">
                  Name <span className="req">required</span>
                </label>
                <input id="name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" autoComplete="organization" />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="email">
                  Email <span className="req">required</span>
                </label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="type">Enquiry type</label>
                <select id="type" name="type" defaultValue={product ? 'Product question' : enquiryTypes[0]}>
                  {enquiryTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="branch">Nearest branch</label>
                <select id="branch" name="branch" defaultValue="">
                  <option value="">Not sure</option>
                  {branches.map((b) => (
                    <option key={b.city} value={b.city}>
                      {b.city}, {b.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="details">
                Details <span className="req">required</span>
              </label>
              <textarea
                id="details"
                name="details"
                rows={6}
                required
                defaultValue={product ? `Enquiry about: ${product}\n\n` : ''}
                placeholder="Line size, operating temperature, drawing reference, programme or shutdown dates"
              />
            </div>

            <div className="form__actions">
              <button type="submit" className="btn btn--primary">
                <span>Send enquiry</span>
                <Icon name="arrow" />
              </button>
              <p className="form__status" role="status">
                {submitted ? (
                  <>
                    Prototype only: this form is not connected. <Ph>Wire to the enquiry handler before launch</Ph>
                  </>
                ) : (
                  ''
                )}
              </p>
            </div>
          </fieldset>
        </form>
      </section>

      <section className="section section--paper" aria-labelledby="branches-title">
        <div className="wrap">
          <header className="section-head">
            <Dash />
            <h2 id="branches-title">Five branches, two of them workshops.</h2>
          </header>
          <ul className="branch-list">
            {branches.map((b) => (
              <li className="branch" key={b.city}>
                <div className="branch__head">
                  <h3>{b.city}</h3>
                  <span className="branch__state">{b.state}</span>
                </div>
                <p>{b.address}</p>
                <p className="branch__role">{b.role}</p>
                <p className="branch__phone">
                  <Ph>Direct line to confirm</Ph>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router';
import { branches, company, nav } from '../content/site';
import { categoryLabels } from '../content/products';
import { services } from '../content/services';
import { Ph } from './primitives';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <section aria-labelledby="foot-products">
          <h2 id="foot-products">Products</h2>
          <ul>
            <li>
              <Link to="/products">Quick Look index</Link>
            </li>
            {(['cold', 'hot', 'acoustic', 'fire'] as const).map((c) => (
              <li key={c}>
                <Link to={`/products?q=${encodeURIComponent(categoryLabels[c])}`}>{categoryLabels[c]}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="foot-services">
          <h2 id="foot-services">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="foot-company">
          <h2 id="foot-company">Company</h2>
          <ul>
            {nav
              .filter((n) => n.to !== '/products' && n.to !== '/services')
              .map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
          </ul>
        </section>

        <section aria-labelledby="foot-contact">
          <h2 id="foot-contact">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <a href={company.email_href}>{company.email}</a>
            </li>
            <li>{company.hq}</li>
          </ul>
          <h3 className="site-footer__sub">Branches</h3>
          <ul>
            {branches.map((b) => (
              <li key={b.city}>
                {b.city}, {b.state}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="wrap site-footer__base">
        <p>© Bellis Australia. Social links: Facebook and X (Twitter) <Ph>URLs to confirm</Ph>.</p>
        <p>
          Design prototype. Text comes from the company profile. Highlighted brackets are facts to confirm before launch.
        </p>
      </div>
    </footer>
  );
}

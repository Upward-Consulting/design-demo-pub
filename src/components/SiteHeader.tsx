import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { company, nav } from '../content/site';
import { ButtonLink, TempLine } from './primitives';
import { Icon } from './Icons';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <Link to="/" className="logo" aria-label="Bellis Australia, home">
          <img src="/media/bellis-logo-horizontal.webp" alt="" width={331} height={150} />
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="phone" href={company.phoneHref}>
            <Icon name="phone" />
            <span>{company.phone}</span>
          </a>
          <ButtonLink to="/contact" variant="primary" className="header-cta">
            Talk to an expert
          </ButtonLink>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>
      <TempLine className="site-header__line" />

      {open && (
        <div id="mobile-nav" className="mobile-panel">
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a className="mobile-panel__phone" href={company.phoneHref}>
            <Icon name="phone" />
            <span>{company.phone}</span>
          </a>
          <ButtonLink to="/contact" variant="primary" arrow className="mobile-panel__cta">
            Talk to an expert
          </ButtonLink>
        </div>
      )}
    </header>
  );
}

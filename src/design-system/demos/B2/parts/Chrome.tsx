// The demo's chrome (demo-local, disposable): the header (logo, four page links, the primary action, the phone number),
// the full-screen mobile menu (a focus container: Tab and Shift+Tab wrap, Escape closes and returns focus to its button,
// the page behind is inert and does not scroll), and the footer (the block wordmark, the five branches, the main line).
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../../workbench/types';
import { branches, contact, footer, pages, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import { Btn, MenuGlyph } from './primitives';

const COPY = {
  menu: 'Menu',
  close: 'Close',
  menuLabel: 'Site menu',
  pagesLabel: 'Pages',
  mainNav: 'Main',
  homeLabel: 'Bellis Australia, home',
  footerRegion: 'Footer',
  top: 'Back to top',
};

const FOCUSABLE = 'a[href], button:not([disabled])';

export function Header({ page, href }: DemoProps) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);

  useEffect(() => {
    const m = menu.current;
    const root = m?.parentElement;
    if (!m || !root) return;
    const siblings = Array.from(root.children).filter((c): c is HTMLElement => c instanceof HTMLElement && c !== m);
    if (!open) {
      siblings.forEach((c) => c.removeAttribute('inert'));
      document.documentElement.style.overflow = '';
      if (returnFocus.current) {
        returnFocus.current = false;
        toggle.current?.focus();
      }
      return;
    }
    // Everything else on the page is inert while the menu is open: no focus, no clicks, no reading behind it.
    siblings.forEach((c) => c.setAttribute('inert', ''));
    document.documentElement.style.overflow = 'hidden';
    m.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        returnFocus.current = true;
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = Array.from(m.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !m.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !m.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      siblings.forEach((c) => c.removeAttribute('inert'));
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    returnFocus.current = true;
    setOpen(false);
  };

  return (
    <>
      <header className="b-header">
        <div className="b-header__bar">
          <a href={href('home')} className="b-brand" aria-label={COPY.homeLabel}>
            <img src={pictures.logo.src} width={pictures.logo.w} height={pictures.logo.h} alt="" data-provenance="own" className="b-brand__img" />
          </a>
          <nav className="b-nav" aria-label={COPY.mainNav}>
            {pages.map((p) => (
              <a key={p.key} href={href(p.key)} className="b-nav__link" aria-current={p.key === page ? 'page' : undefined}>
                {p.label}
              </a>
            ))}
          </nav>
          <div className="b-header__act">
            <a className="b-phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <Btn href={href('contact')}>{site.cta}</Btn>
          </div>
          <div className="b-header__mob">
            <a className="b-phone" href={site.phoneHref}>
              {site.phone}
            </a>
            <button
              ref={toggle}
              type="button"
              className="b-menu-btn"
              aria-expanded={open}
              aria-controls="b-menu"
              onClick={() => (open ? close() : setOpen(true))}
            >
              <MenuGlyph />
              <span>{COPY.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="b-menu" ref={menu} className="b-menu" data-open={open ? 'true' : 'false'} inert={!open} role="dialog" aria-modal="true" aria-label={COPY.menuLabel}>
        <div className="b-menu__top">
          <img src={pictures.logo.src} width={pictures.logo.w} height={pictures.logo.h} alt="" data-provenance="own" className="b-menu__logo" />
          <button type="button" className="b-menu__close" onClick={close}>
            {COPY.close}
          </button>
        </div>
        <nav className="b-menu__nav" aria-label={COPY.pagesLabel}>
          {pages.map((p) => (
            <a key={p.key} href={href(p.key)} className="b-menu__link" aria-current={p.key === page ? 'page' : undefined} onClick={close}>
              {p.label}
            </a>
          ))}
        </nav>
        <div className="b-menu__foot">
          <a className="b-phone b-phone--big" href={site.phoneHref}>
            {site.phone}
          </a>
          <Btn href={href('contact')} onClick={close}>
            {site.cta}
          </Btn>
        </div>
      </div>
    </>
  );
}

// The block wordmark: each letter knocked out of its own solid block, heights 60-100% of the band, butted with 4 px gaps.
// The first block is cyan, not ink, so it never merges with the black band above the footer.
const WORDMARK = [
  { l: 'b', h: 100, c: 'var(--dB2-cyan)', t: 'var(--dB2-ink)' },
  { l: 'e', h: 74, c: 'var(--dB2-ink)', t: 'var(--dB2-bg)' },
  { l: 'l', h: 88, c: 'var(--dB2-paper)', t: 'var(--dB2-ink)' },
  { l: 'l', h: 62, c: 'var(--dB2-ink)', t: 'var(--dB2-bg)' },
  { l: 'i', h: 96, c: 'var(--dB2-orange)', t: 'var(--dB2-ink)' },
  { l: 's', h: 80, c: 'var(--dB2-ink)', t: 'var(--dB2-bg)' },
] as const;

export function Footer({ href }: DemoProps) {
  return (
    <footer id="b-footer" className="b-footer" aria-label={COPY.footerRegion}>
      <div className="b-footer__top">
        <p className="b-footer__blurb">{footer.blurb}</p>
        <a href="#b-main" className="b-footer__top-link">
          {COPY.top}
        </a>
      </div>
      <div className="b-wm" role="img" aria-label="Bellis">
        {WORDMARK.map((b, i) => (
          <span key={i} className="b-wm__block" style={{ ['--h' as string]: `${b.h}%`, ['--bc' as string]: b.c, ['--lc' as string]: b.t }} aria-hidden="true">
            {b.l}
          </span>
        ))}
      </div>
      <div className="b-footer__grid">
        {footer.columns.map((col, i) => (
          <div key={col.heading} className="b-footer__col">
            <h2 className="b-footer__h">
              {i === 0 ? <a href={href('products')}>{col.heading}</a> : i === 1 ? <a href={href('corrosion')}>{col.heading}</a> : col.heading}
            </h2>
            <ul>
              {col.links.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="b-footer__col">
          <h2 className="b-footer__h">{contact.branchesHeading}</h2>
          <ul>
            {branches.map((b) => (
              <li key={b.id}>
                <span className="b-footer__city">{b.city}</span> {b.address}
              </li>
            ))}
          </ul>
          <p className="b-footer__main">
            {contact.phoneLabel}{' '}
            <a href={site.phoneHref} className="b-footer__link">
              {site.phone}
            </a>
          </p>
          <p>
            <a href={site.emailHref} className="b-footer__link">
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <p className="b-footer__legal">{footer.small}</p>
    </footer>
  );
}

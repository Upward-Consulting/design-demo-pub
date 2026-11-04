// The demo's chrome (demo-local, disposable): the header with the four page links, the primary action and the phone
// number; the mobile menu (full screen, Escape closes and returns focus to its button); the footer with the block
// wordmark, the five branches and the main line.
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../../workbench/types';
import { branches, contact, footer, pages, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import { Btn, Img, MenuIcon } from './primitives';

const COPY = {
  menu: 'Menu',
  close: 'Close',
  menuLabel: 'Site menu',
  footerRegion: 'Footer',
};

// The menu has four states: closed (not rendered, so nothing inside it can take focus), opening (rendered, shut, one frame),
// open, and closing (the 250 ms close wipe, then closed again).
type MenuState = 'closed' | 'opening' | 'open' | 'closing';

export function Header({ page, href }: DemoProps) {
  const [menu, setMenu] = useState<MenuState>('closed');
  const open = menu === 'open' || menu === 'opening';
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (menu === 'opening') {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setMenu('open')));
      return () => cancelAnimationFrame(id);
    }
    if (menu === 'closing') {
      const id = window.setTimeout(() => setMenu('closed'), 260);
      return () => window.clearTimeout(id);
    }
  }, [menu]);

  useEffect(() => {
    const main = document.getElementById('b-main');
    const foot = document.getElementById('b-footer');
    if (open) {
      main?.setAttribute('inert', '');
      foot?.setAttribute('inert', '');
    } else {
      main?.removeAttribute('inert');
      foot?.removeAttribute('inert');
    }
    if (menu === 'opening') firstLink.current?.focus();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenu('closing');
        menuBtn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, menu]);

  const close = () => {
    setMenu('closing');
    menuBtn.current?.focus();
  };
  const toggle = () => setMenu(open ? 'closing' : 'opening');

  return (
    <header className="b-header">
      <div className="b-header__bar">
        <a className="b-brand" href={href('home')} aria-label={`${site.name}, home`}>
          <Img pic={pictures.logo} alt="" eager />
        </a>
        <nav className="b-nav" aria-label="Main">
          <ul>
            {pages.map((p) => (
              <li key={p.key}>
                <a href={href(p.key)} aria-current={p.key === page ? 'page' : undefined}>
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="b-tools">
          <a className="b-tools__phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <Btn href={href('contact')}>{site.cta}</Btn>
          <button
            ref={menuBtn}
            type="button"
            className="b-menu-btn"
            aria-expanded={open}
            aria-controls="b-menu"
            onClick={toggle}
          >
            <MenuIcon />
            <span>{COPY.menu}</span>
          </button>
        </div>
      </div>

      <div id="b-menu" className="b-menu" data-state={menu} aria-label={COPY.menuLabel} role="region">
        <div className="b-menu__top">
          <span className="b-brand">
            <Img pic={pictures.logo} alt="" />
          </span>
          <button type="button" className="b-menu__close" onClick={close}>
            {COPY.close}
          </button>
        </div>
        <nav aria-label={COPY.menuLabel}>
          <ul className="b-menu__links">
            {pages.map((p, i) => (
              <li key={p.key}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={href(p.key)}
                  aria-current={p.key === page ? 'page' : undefined}
                  style={{ ['--i' as string]: i }}
                  onClick={() => setMenu('closing')}
                 
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="b-menu__foot">
          <a className="b-menu__phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <Btn href={href('contact')}>{site.cta}</Btn>
        </div>
      </div>
    </header>
  );
}

const wordBlocks = [
  { l: 'B', h: 100, c: 'var(--dB-ink)', ci: 'var(--dB-bg)' },
  { l: 'E', h: 70, c: 'var(--dB-white)', ci: 'var(--dB-ink)' },
  { l: 'L', h: 88, c: 'var(--dB-pink)', ci: 'var(--dB-ink)' },
  { l: 'L', h: 60, c: 'var(--dB-cyan)', ci: 'var(--dB-ink)' },
  { l: 'I', h: 100, c: 'var(--dB-orange)', ci: 'var(--dB-ink)' },
  { l: 'S', h: 80, c: 'var(--dB-ink)', ci: 'var(--dB-bg)' },
];

export function Footer({ href }: { href: (p: string) => string }) {
  return (
    <footer className="b-footer" id="b-footer" aria-label={COPY.footerRegion}>
      <p className="b-sr">{site.name}</p>
      <div className="b-wordmark" role="img" aria-label={site.name}>
        {wordBlocks.map((b, i) => (
          <span
            key={i}
            className="b-wordmark__block"
            style={{ ['--h' as string]: `${b.h}%`, ['--hk' as string]: b.h / 100, ['--c' as string]: b.c, ['--ci' as string]: b.ci }}
          >
            {b.l}
          </span>
        ))}
      </div>
      <p className="b-footer__blurb">{footer.blurb}</p>
      <div className="b-footer__grid">
        <div className="b-footer__cols">
          {footer.columns.map((col, ci) => (
            <div className="b-footer__col" key={col.heading}>
              <h2>{col.heading}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    {ci === 0 ? (
                      <a href={href('products')}>{l}</a>
                    ) : l === 'Corrosion control' ? (
                      <a href={href('corrosion')}>{l}</a>
                    ) : (
                      <span>{l}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="b-footer__col">
            <h2>{contact.branchesHeading}</h2>
            <ul>
              {branches.map((b) => (
                <li key={b.id}>
                  {b.city}, {b.note}
                  <br />
                  {b.address} {b.state} {b.postcode}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="b-footer__contact">
          <h2 className="b-footer__ch">{contact.phoneLabel}</h2>
          <a className="b-footer__big" href={site.phoneHref}>
            {site.phone}
          </a>
          <p>{contact.emailLabel}</p>
          <a href={site.emailHref}>{site.email}</a>
        </div>
        <div className="b-footer__last">
          <p className="b-footer__legal">{footer.small}</p>
          <Btn href={href('contact')} tone="ink">
            {site.cta}
          </Btn>
        </div>
      </div>
    </footer>
  );
}

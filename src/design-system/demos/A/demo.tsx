// Demo A, "The printed annual" (editorial-report). The whole page for one key: the chrome (skip link, header with a
// mobile menu, footer) and the page. Pages and parts live beside this file. Imports nothing from another demo.
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import type { DemoProps } from '../../workbench/types';
import { branches, footer, pages, site } from '../../content/demo-copy';
import { pictures } from '../../assets/own/pictures';
import { Arrow, Img, REVEAL } from './parts';
import { Home } from './home';
import { Products } from './products';
import { Corrosion } from './corrosion';
import { Contact } from './contact';
import './demo.css';
// The story kit's stylesheet: after the demo's own, as the kit's README asks (the story stage rules are scoped to the opener).
import '../../story/story.css';

/** Reveal the elements that enter on scroll. Once per element; reduced motion and no-JS show everything (demo.css). */
function useReveal(root: RefObject<HTMLDivElement | null>, page: string) {
  useEffect(() => {
    document.documentElement.classList.add('a-js');
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(`[${REVEAL}]`));
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (const item of items) item.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );
    for (const item of items) io.observe(item);
    return () => io.disconnect();
  }, [root, page]);
}

function Header({ page, href }: DemoProps) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Escape closes the menu and returns focus to its button. Opening moves focus to the first link.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Closing by the button: focus stays on the button. Only a real change of state moves focus.
  useEffect(() => {
    if (wasOpen.current && !open && document.activeElement && menu.current?.contains(document.activeElement)) {
      button.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const link = (key: string) => (
    <a href={href(key)} aria-current={key === page ? 'page' : undefined}>
      {pages.find((p) => p.key === key)?.label}
    </a>
  );

  return (
    <header className="a-header">
      <a className="a-brand" href={href('home')} aria-label={`${site.name}, home`}>
        <Img pic={pictures.logo} eager />
      </a>
      <div className="a-header-inner">
        <nav aria-label="Main" className="a-nav">
          {pages.map((p) => (
            <span key={p.key}>{link(p.key)}</span>
          ))}
        </nav>
        <div className="a-header-call">
          <a className="a-btn" href={href('contact')}>
            {site.cta}
          </a>
          <a className="a-phone" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
        <button
          ref={button}
          type="button"
          className="a-menu-button"
          aria-expanded={open}
          aria-controls="a-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span key={open ? 'close' : 'menu'} className="a-fade-label">
            {open ? 'Close' : 'Menu'}
          </span>
        </button>
      </div>
      <div id="a-menu" ref={menu} className="a-menu" data-open={open ? 'true' : 'false'} role="region" aria-label="Menu">
        <nav aria-label="Main, small screens">
          {pages.map((p, i) => (
            <a
              key={p.key}
              href={href(p.key)}
              aria-current={p.key === page ? 'page' : undefined}
              style={{ ['--i' as string]: i } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              {p.label}
            </a>
          ))}
        </nav>
        <a className="a-btn" href={href('contact')} onClick={() => setOpen(false)}>
          {site.cta}
          <Arrow />
        </a>
        <a className="a-phone" href={site.phoneHref}>
          {site.phone}
        </a>
      </div>
    </header>
  );
}

function Footer({ href }: Pick<DemoProps, 'href'>) {
  return (
    <footer className="a-footer">
      <p className="a-footer-name" aria-hidden="true">
        Bellis
      </p>
      <div className="a-footer-row">
        <div className="a-places">
          <h2 className="a-small a-muted" style={{ marginBottom: 14 }}>
            {/* the deck's heading for the branch list */}
            Five branches
          </h2>
          {branches.map((b) => (
            <a key={b.id} href={`${href('contact')}#branch-${b.id}`}>
              {b.city}
            </a>
          ))}
          <a className="a-main-line a-phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <a className="a-small" href={site.emailHref}>
            {site.email}
          </a>
        </div>
        <div className="a-foot-cols">
          {footer.columns.map((col, ci) => (
            <div key={col.heading}>
              <h2>{col.heading}</h2>
              <ul>
                {col.links.map((label) => (
                  <li key={label}>
                    {ci === 0 ? (
                      <a href={href('products')}>{label}</a>
                    ) : label === 'Corrosion control' ? (
                      <a href={href('corrosion')}>{label}</a>
                    ) : (
                      label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="a-foot-legal">
        <p>{footer.small}</p>
        <a href="#a-top">Back to top</a>
      </div>
    </footer>
  );
}

export default function Demo({ page, href }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, page);

  const body =
    page === 'home' ? (
      <Home href={href} />
    ) : page === 'products' ? (
      <Products href={href} />
    ) : page === 'corrosion' ? (
      <Corrosion href={href} />
    ) : page === 'contact' ? (
      <Contact />
    ) : (
      <div className="a-section a-dark">
        <p role="alert" className="a-axis">
          No page &quot;{page}&quot; in this demo.
        </p>
      </div>
    );

  return (
    <div className="a-root" data-demo="A" id="a-top" ref={root}>
      <a className="a-skip" href="#a-main">
        {site.skip}
      </a>
      <Header page={page} href={href} />
      <main id="a-main" tabIndex={-1} className={page === 'home' ? 'is-home' : undefined}>
        {body}
      </main>
      <Footer href={href} />
    </div>
  );
}

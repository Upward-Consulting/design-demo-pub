// Demo A chrome and shared parts: header with mobile menu, closing band, footer, pictures, the bend mark.
// The one motif is the quarter-arc of the Bellis "b" (a lagged 90-degree pipe elbow).
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { copy, pictures } from '../../content/demo-copy';

export type Key = 'home' | 'products' | 'contact';

export const href = (page: Key, hash?: string) => `?view=demo&d=a&page=${page}${hash ? `#${hash}` : ''}`;

export type Picture = { readonly src: string; readonly w: number; readonly h: number; readonly alt: string };

export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;

/** A photograph inside the motif: square corners, one full-radius bend at the top right. */
export function Pic({ p, className = '', pos, decorative }: { p: Picture; className?: string; pos?: string; decorative?: boolean }) {
  return (
    <span className={`a-pic ${className}`} data-provenance="own" aria-hidden={decorative || undefined}>
      <img src={p.src} width={p.w} height={p.h} alt={p.alt} decoding="async" style={pos ? { objectPosition: pos } : undefined} />
    </span>
  );
}

/** The bend mark: the logo's quarter-ring at text size. */
export function Bend({ className = '' }: { className?: string }) {
  return (
    <svg className={`a-bend-mark ${className}`} viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path d="M0 0A10 10 0 0 1 10 10H6.4A6.4 6.4 0 0 0 0 3.6Z" />
    </svg>
  );
}

/** The giant ring of each hero: the same quarter-ring, drawn as one thick stroke so it can bend into place. */
export function Ring() {
  return (
    <svg className="a-ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d="M0 18A82 82 0 0 1 82 100" pathLength={100} />
    </svg>
  );
}

/** Scroll entrances: parts below the first screen rise once as their top passes 88% of the viewport. */
function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const vh = window.innerHeight;
    const items = [...el.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
      (n) => !n.classList.contains('a-in') && n.getBoundingClientRect().top > vh * 0.9,
    );
    items.forEach((n) => n.classList.add('a-armed'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add('a-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [root]);
}

/** The header's action stays hidden while the page's own primary action is on screen, so it shows exactly once. */
function usePrimaryInView(root: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const targets = [...el.querySelectorAll('[data-primary]')];
    if (!targets.length) {
      setInView(false);
      return;
    }
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        }
        setInView(seen.size > 0);
      },
      { rootMargin: '-80px 0px 0px 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [root]);
  return inView;
}

const NAV: { key: Key; label: string; hash?: string }[] = [
  { key: 'products', label: copy.nav.products },
  { key: 'home', label: copy.nav.services, hash: 'services' },
  { key: 'contact', label: copy.nav.contact },
];

function Header({ page, primaryIn }: { page: Key; primaryIn: boolean }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const actionHref = page === 'contact' ? '#enquiry' : href('contact');

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const root = panelRef.current?.closest('[data-demo]');
    root?.querySelectorAll('main, footer').forEach((n) => n.toggleAttribute('inert', open));
    if (!open) return;
    const panel = panelRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const f = [...panel.querySelectorAll<HTMLElement>('a[href], button')];
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    const t = window.setTimeout(() => panel?.querySelector<HTMLElement>('.a-menu__close')?.focus(), 40);
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t);
      html.style.overflow = '';
    };
  }, [open, close]);

  return (
    <header className="a-header" data-primary-in={primaryIn ? 'true' : 'false'}>
      <a className="a-brand" href={href('home')} aria-label={`${copy.brand.name}, home`}>
        <span data-provenance="own">
          <img src={pictures.logo.src} width={pictures.logo.w} height={pictures.logo.h} alt={pictures.logo.alt} />
        </span>
      </a>
      <nav className="a-nav" aria-label="Main">
        <ul>
          {NAV.map((n) => (
            <li key={n.label}>
              <a href={href(n.key, n.hash)} aria-current={!n.hash && n.key === page ? 'page' : undefined}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="a-phone" href={copy.contact.phoneHref}>
          {copy.contact.phone}
        </a>
        <a className="a-btn a-header__action" href={actionHref} aria-hidden={primaryIn || undefined} tabIndex={primaryIn ? -1 : undefined}>
          {copy.actions.talk}
        </a>
      </nav>
      <button
        ref={toggleRef}
        type="button"
        className="a-menu-toggle"
        aria-expanded={open}
        aria-controls="a-menu"
        onClick={() => setOpen(true)}
      >
        {copy.actions.menu}
        <Bend />
      </button>
      <div
        id="a-menu"
        ref={panelRef}
        className="a-menu"
        data-open={open ? 'true' : 'false'}
        role="dialog"
        aria-modal="true"
        aria-label={copy.actions.menu}
        aria-hidden={!open || undefined}
      >
        <div className="a-menu__top">
          <button type="button" className="a-menu__close" onClick={close}>
            {copy.actions.close}
          </button>
        </div>
        <nav aria-label="Menu">
          <ul className="a-menu__links">
            {[{ key: 'home' as Key, label: 'Home' }, ...NAV].map((n, i) => (
              <li key={n.label} className="a-menu__stagger" style={stagger(i)}>
                <a
                  href={href(n.key, 'hash' in n ? n.hash : undefined)}
                  aria-current={!('hash' in n && n.hash) && n.key === page ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="a-menu__foot a-menu__stagger" style={stagger(5)}>
          <a className="a-btn a-btn--inverse" href={actionHref} onClick={() => setOpen(false)}>
            {copy.actions.talk}
          </a>
          <a className="a-link" href={copy.contact.phoneHref}>
            {copy.contact.phone}
          </a>
          <a className="a-link" href={copy.contact.emailHref}>
            {copy.contact.email}
          </a>
        </div>
      </div>
    </header>
  );
}

/** The closing band. The whole band is one link; one word is the button. */
export function CtaBand() {
  return (
    <section className="a-cta a-fill" aria-labelledby="a-cta-title">
      <div className="a-cta__top">
        <div className="a-cta__text" data-reveal>
          <h2 id="a-cta-title">{copy.home.closingTitle}</h2>
          <p>{copy.home.closingBody}</p>
        </div>
        <svg className="a-cta__arrow" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <path d="M9 44V27A17 17 0 0 1 26 10H40" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M32 2.5L40 10L32 17.5" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
      <a
        className="a-cta__word"
        href={href('contact')}
        aria-label={`${copy.actions.enquire.split(' ')[0]}: ${copy.actions.talk.toLowerCase()}`}
        data-reveal
      >
        <span>{copy.actions.enquire.split(' ')[0]}</span>
      </a>
    </section>
  );
}

const MARK: { ch: string; h: number }[] = [
  { ch: 'B', h: 100 },
  { ch: 'e', h: 70 },
  { ch: 'l', h: 90 },
  { ch: 'l', h: 78 },
  { ch: 'i', h: 84 },
  { ch: 's', h: 64 },
];

function Footer() {
  return (
    <footer className="a-footer a-fill">
      <div className="a-mark" aria-hidden="true">
        {MARK.map((m, i) => (
          <span key={i} style={{ '--h': `${m.h}%`, ...stagger(i) } as CSSProperties} data-reveal>
            {m.ch}
          </span>
        ))}
      </div>
      <div className="a-footer__grid">
        <div className="a-footer__col">
          <h2>{copy.brand.name}</h2>
          <ul>
            <li>
              <a href={href('home')}>Home</a>
            </li>
            <li>
              <a href={href('products')}>{copy.products.title}</a>
            </li>
            <li>
              <a href={href('home', 'services')}>{copy.home.servicesTitle}</a>
            </li>
            <li>
              <a href={href('home', 'projects')}>{copy.home.proofTitle}</a>
            </li>
            <li>
              <a href={href('contact')}>{copy.actions.talk}</a>
            </li>
          </ul>
        </div>
        <div className="a-footer__col a-footer__col--wide">
          <h2>{copy.nav.products}</h2>
          <ul>
            {copy.productRanges.map((r) => (
              <li key={r.key}>
                <a href={href('products', `range-${r.key}`)}>{r.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="a-footer__col">
          <h2>{copy.nav.services}</h2>
          <ul>
            {copy.services.map((s) => (
              <li key={s.key}>
                <a href={href('home', `service-${s.key}`)}>{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="a-footer__contact">
          <h2>{copy.contactPage.branches[0].city}</h2>
          <p>{copy.contactPage.branches[0].address}</p>
          <p>
            <a href={copy.contact.phoneHref}>{copy.contact.phone}</a>
            <br />
            <a href={copy.contact.emailHref}>{copy.contact.email}</a>
          </p>
          <p>{copy.footer.tagline}</p>
        </div>
      </div>
      <div className="a-footer__base">
        <p>{copy.footer.legal}</p>
        <a className="a-btn a-btn--inverse a-btn--small" href={href('contact')}>
          {copy.actions.talk}
        </a>
      </div>
    </footer>
  );
}

/** One page of the demo: the root the workbench and the gate look for, the chrome, and the motion hooks. */
export function PageShell({ page, children, closing = true }: { page: Key; children: ReactNode; closing?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const primaryIn = usePrimaryInView(rootRef);
  useReveal(rootRef);
  useEffect(() => {
    document.title = copy.pageTitles[page];
  }, [page]);
  return (
    <div ref={rootRef} className="a-root" data-demo="a" data-ds={`demo a ${page}`}>
      <a className="a-skip" href="#a-main">
        Skip to content
      </a>
      <Header page={page} primaryIn={primaryIn} />
      <main id="a-main" tabIndex={-1}>
        {children}
        {closing && <CtaBand />}
      </main>
      <Footer />
    </div>
  );
}

// Demo B, "Loud and flat": the hi-vis poster. The whole page (skip link, header, main, footer) for one page key of the four.
// Chrome is demo-local and disposable. Nothing here imports another demo, the token file or a production component.
//
// Motion on this root: utility reveals (data-b-reveal) are armed only when motion is welcome (not reduced motion, not the
// finished-composition view `?still=1`, and an IntersectionObserver exists). Armed, a reveal waits for its element to enter
// the viewport (triggered when its top is inside the bottom 88% of the screen) and then plays once. Disarmed, every element
// is simply shown, so the finished composition never has a blank band.
import { useEffect, useLayoutEffect } from 'react';
import type { DemoProps } from '../../workbench/types';
import { contact, corrosion, home, products, site } from '../../content/demo-copy';
import { Footer, Header } from './parts/Chrome';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { CorrosionPage } from './pages/Corrosion';
import { ContactPage } from './pages/Contact';
import './demo.css';
import '../../story/story.css';

const titles: Record<string, string> = {
  home: home.title,
  products: products.title,
  corrosion: corrosion.title,
  contact: contact.title,
};

export default function Demo({ page, href }: DemoProps) {
  // The html element carries the demo's language and the JS flag for the whole time this demo is shown.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prevLang = root.lang;
    root.lang = site.lang;
    root.classList.add('b-js');
    return () => {
      root.classList.remove('b-js');
      root.lang = prevLang;
    };
  }, []);

  // Arm the reveals (only when motion is welcome) and disarm them when the page changes or the demo unmounts.
  useLayoutEffect(() => {
    const rootEl = document.querySelector<HTMLElement>('.b-root');
    if (!rootEl || typeof IntersectionObserver === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const still = document.querySelector('[data-story-rest]') !== null;
    if (reduced || still) return;
    rootEl.classList.add('b-armed');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    rootEl.querySelectorAll<HTMLElement>('[data-b-reveal]').forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      rootEl.classList.remove('b-armed');
    };
  }, [page]);

  useEffect(() => {
    const t = titles[page];
    if (t) document.title = t;
  }, [page]);

  const body =
    page === 'home' ? (
      <HomePage page={page} href={href} />
    ) : page === 'products' ? (
      <ProductsPage page={page} href={href} />
    ) : page === 'corrosion' ? (
      <CorrosionPage page={page} href={href} />
    ) : page === 'contact' ? (
      <ContactPage page={page} href={href} />
    ) : (
      <p role="alert">No page &quot;{page}&quot; in this demo.</p>
    );

  return (
    <div className="b-root" data-demo="B">
      <a className="b-skip" href="#b-main">
        {site.skip}
      </a>
      <Header page={page} href={href} />
      <main id="b-main" className="b-main" tabIndex={-1}>
        {body}
      </main>
      <Footer page={page} href={href} />
    </div>
  );
}

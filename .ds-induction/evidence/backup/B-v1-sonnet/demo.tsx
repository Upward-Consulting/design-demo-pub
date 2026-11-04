// Demo B, "Loud and flat": the hi-vis poster. The whole page (header, main, footer) for one page key of the four.
// Chrome is demo-local and disposable. Nothing here imports another demo, the token file or a production component.
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
  useLayoutEffect(() => {
    document.documentElement.classList.add('b-js');
    return () => document.documentElement.classList.remove('b-js');
  }, []);

  useEffect(() => {
    const t = titles[page];
    if (t) document.title = t;
  }, [page]);

  const body =
    page === 'home' ? (
      <HomePage href={href} />
    ) : page === 'products' ? (
      <ProductsPage href={href} />
    ) : page === 'corrosion' ? (
      <CorrosionPage href={href} />
    ) : page === 'contact' ? (
      <ContactPage href={href} />
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
      <Footer href={href} />
    </div>
  );
}

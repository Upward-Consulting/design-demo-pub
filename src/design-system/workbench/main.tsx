// Dev-only workbench (ds.html). Never imported by the production app.
// Views:
//   ?view=demo&d=<letter>&page=<home|products|contact>   one demo page, nothing around it
//   ?view=demos&page=<key>                                the same page of every demo, side by side
//   (no view)                                             index of demos and pages
import { Component, StrictMode, useEffect, useState, type ComponentType, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './workbench.css';

export type PageKey = 'home' | 'products' | 'contact';

export interface DemoModule {
  letter: string;
  name: string;
  pages: Partial<Record<PageKey, ComponentType>>;
}

const PAGE_KEYS: PageKey[] = ['home', 'products', 'contact'];
const loaders = import.meta.glob<{ default: DemoModule }>('../demos/*/demo.tsx');

function lettersFound(): string[] {
  return Object.keys(loaders)
    .map((path) => path.split('/').at(-2) ?? '')
    .filter(Boolean)
    .sort();
}

function Notice({ children }: { children: ReactNode }) {
  return <div data-ds-furniture className="ds-notice">{children}</div>;
}

class Boundary extends Component<{ children: ReactNode }, { error?: Error }> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }
  render() {
    if (this.state.error) return <Notice>{this.state.error.message}</Notice>;
    return this.props.children;
  }
}

function DemoPage({ letter, page }: { letter: string; page: PageKey }) {
  const [state, setState] = useState<{ demo?: DemoModule; error?: string }>({});

  useEffect(() => {
    let alive = true;
    const load = loaders[`../demos/${letter}/demo.tsx`];
    if (!load) {
      setState({ error: `No demo at src/design-system/demos/${letter}/demo.tsx` });
      return;
    }
    load()
      .then((m) => alive && setState({ demo: m.default }))
      .catch((e: unknown) => alive && setState({ error: String(e) }));
    return () => {
      alive = false;
    };
  }, [letter]);

  if (state.error) return <Notice>{state.error}</Notice>;
  if (!state.demo) return <Notice>Loading demo {letter}…</Notice>;
  const Page = state.demo.pages[page];
  if (!Page) return <Notice>Demo {letter} has no "{page}" page yet.</Notice>;
  return (
    <Boundary>
      <Page />
    </Boundary>
  );
}

function pageParam(search: URLSearchParams): PageKey {
  const p = search.get('page') as PageKey | null;
  return p && PAGE_KEYS.includes(p) ? p : 'home';
}

function Index() {
  const letters = lettersFound();
  return (
    <main data-ds-furniture className="ds-index">
      <h1>Bellis website design: demo workbench</h1>
      <p>Dev only. Each demo is one dealt direction, built as a working site.</p>
      {letters.length === 0 && <p>No demos yet.</p>}
      <ul>
        {letters.map((l) => (
          <li key={l}>
            Demo {l.toUpperCase()}:{' '}
            {PAGE_KEYS.map((p) => (
              <a key={p} href={`?view=demo&d=${l}&page=${p}`}>
                {p}
              </a>
            ))}
          </li>
        ))}
      </ul>
      <p>
        Side by side: <a href="?view=demos&page=home">home</a> · <a href="?view=demos&page=products">products</a> ·{' '}
        <a href="?view=demos&page=contact">contact</a>
      </p>
    </main>
  );
}

function Compare({ page }: { page: PageKey }) {
  const letters = lettersFound();
  return (
    <div data-ds-furniture className="ds-compare">
      {letters.map((l) => (
        <section key={l} className="ds-compare-demo">
          <h2>Demo {l.toUpperCase()}: {page}</h2>
          <div className="ds-compare-row">
            <figure>
              <figcaption>1440 × 900</figcaption>
              <iframe title={`Demo ${l} ${page} desktop`} src={`?view=demo&d=${l}&page=${page}`} width={1440} height={900} />
            </figure>
            <figure>
              <figcaption>390 × 844</figcaption>
              <iframe title={`Demo ${l} ${page} phone`} src={`?view=demo&d=${l}&page=${page}`} width={390} height={844} />
            </figure>
          </div>
        </section>
      ))}
    </div>
  );
}

function Router() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  if (view === 'demo') {
    const letter = (params.get('d') ?? '').toLowerCase();
    return <DemoPage letter={letter} page={pageParam(params)} />;
  }
  if (view === 'demos') return <Compare page={pageParam(params)} />;
  return <Index />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);

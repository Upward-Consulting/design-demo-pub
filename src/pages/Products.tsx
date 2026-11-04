import { useSearchParams } from 'react-router';
import {
  categoryLabels,
  problemLabels,
  problemOrder,
  products,
  type Cat,
  type Problem,
  type Product,
} from '../content/products';
import { ButtonLink, Dash, Tag, TempLine, type Tone } from '../components/primitives';
import { Icon } from '../components/Icons';

const toneFor = (c: Cat): Tone => (c === 'cold' ? 'cold' : c === 'hot' ? 'hot' : c === 'fire' ? 'fire' : c === 'acoustic' ? 'acoustic' : 'other');

const legend: { tone: Tone; label: string }[] = [
  { tone: 'cold', label: 'Cold and cryogenic' },
  { tone: 'hot', label: 'Hot and high-temperature' },
  { tone: 'fire', label: 'Fire' },
  { tone: 'acoustic', label: 'Acoustic' },
  { tone: 'other', label: 'Other' },
];

function matches(p: Product, query: string): boolean {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [p.name, p.note ?? '', ...p.cats.map((c) => categoryLabels[c]), ...p.problems.map((x) => problemLabels[x])]
    .join(' ')
    .toLowerCase();
  return terms.every((t) => haystack.includes(t));
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const problemParam = params.get('problem') ?? 'all';
  const problem: Problem | 'all' = (problemOrder as string[]).includes(problemParam) ? (problemParam as Problem) : 'all';
  const query = params.get('q') ?? '';

  // Each product keeps its place in the full list, so the numbers stay stable while filtering.
  const rows = products
    .map((p, i) => ({ p, no: i + 1 }))
    .filter(({ p }) => (problem === 'all' || p.problems.includes(problem)) && matches(p, query));

  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  return (
    <>
      <section className="page-head wrap">
        <Dash />
        <h1>Find the material by the problem it solves.</h1>
        <p className="lead">
          Choose the problem first: temperature, corrosion, fire, noise or access. Search by product name when you know
          it. Each line shows its category, and every line can go straight to an enquiry.
        </p>
        <ul className="legend" aria-label="Colour key">
          {legend.map((l) => (
            <li key={l.tone}>
              <Tag tone={l.tone}>{l.label}</Tag>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap catalogue-tools" aria-label="Filter the index">
        <label className="search">
          <span className="visually-hidden">Search the index</span>
          <Icon name="search" />
          <input
            type="search"
            placeholder="Search, for example Pyrogel, banding or Foamglas"
            value={query}
            onChange={(e) => update('q', e.target.value)}
          />
        </label>

        <div className="chips" role="group" aria-label="Filter by problem">
          <button type="button" className="chip" aria-pressed={problem === 'all'} onClick={() => update('problem', 'all')}>
            All problems
          </button>
          {problemOrder.map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              aria-pressed={problem === k}
              onClick={() => update('problem', k)}
            >
              {problemLabels[k]}
            </button>
          ))}
        </div>
      </section>

      <section className="wrap catalogue" aria-label="Product lines">
        <p className="catalogue__count" aria-live="polite">
          {rows.length} {rows.length === 1 ? 'line' : 'lines'}
          {problem !== 'all' ? ` for ${problemLabels[problem].toLowerCase()}` : ''}
          {query ? ` matching "${query}"` : ''}
        </p>

        {rows.length === 0 ? (
          <div className="empty">
            <p>No lines match that search.</p>
            <button type="button" className="text-link text-link--button" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="catalogue__list">
            <li className="catalogue__head" aria-hidden="true">
              <span>No.</span>
              <span>Product</span>
              <span>Category</span>
              <span>Solves</span>
              <span />
            </li>
            {rows.map(({ p, no }) => (
              <li className="cat-row" key={p.name}>
                <span className="cat-row__no">{String(no).padStart(3, '0')}</span>
                <span className="cat-row__name">
                  {p.img && (
                    <span className="cat-row__thumb">
                      <img src={`/media/${p.img}`} alt="" loading="lazy" />
                    </span>
                  )}
                  <span>
                    <strong>{p.name}</strong>
                    {p.note && <small>{p.note}</small>}
                  </span>
                </span>
                <span className="cat-row__cats">
                  {p.cats.map((c) => (
                    <Tag key={c} tone={toneFor(c)}>
                      {categoryLabels[c]}
                    </Tag>
                  ))}
                </span>
                <span className="cat-row__problems">
                  {p.problems.length ? p.problems.map((x) => problemLabels[x]).join(', ') : 'Specialty'}
                </span>
                <span className="cat-row__action">
                  <ButtonLink to={`/contact?product=${encodeURIComponent(p.name)}`} variant="secondary" className="btn--small">
                    Enquire
                  </ButtonLink>
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="catalogue__note">
          This is a working sample built from the company profile. The full Quick Look index has about 90 lines, and it
          replaces this list before launch.
        </p>
      </section>

      <section className="wrap page-foot">
        <TempLine />
        <div className="page-foot__inner">
          <p>Not sure which line fits? Describe the line and the temperature to a Bellis expert.</p>
          <ButtonLink to="/contact" variant="primary" arrow>
            Talk to an expert
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

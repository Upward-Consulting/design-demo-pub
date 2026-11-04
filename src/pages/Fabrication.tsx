import { ButtonLink, Dash, Figure, TempLine } from '../components/primitives';

const capabilities = [
  {
    made: 'Cladding and jackets',
    process: 'Sheet metal in aluminium, galvanised steel, stainless or Colorbond',
    use: 'Weatherproof jackets over insulation',
  },
  {
    made: 'Valve and flange boxes',
    process: 'Cut, formed and welded sheet',
    use: 'Covering valves and flanges',
  },
  {
    made: 'Lobster-back bends and T-joints',
    process: 'Formed sections, rolled and welded',
    use: 'Covering bends and branches in jacketed runs',
  },
  {
    made: 'Custom guards',
    process: 'Expanded steel or mesh',
    use: 'Guarding around plant',
  },
  {
    made: 'Removable covers and mats',
    process: 'Custom-made covers, fitted to the plant',
    use: 'Access for inspection and maintenance',
  },
  {
    made: 'Fabric expansion joints and bellows',
    process: 'Custom-made fabric joints and bellows',
    use: 'Absorbing thermal movement',
  },
  {
    made: 'Pre-insulated pipe supports',
    process: 'Polyurethane, Foamglas or Cryogel Z',
    use: 'Supports in cryogenic and hot lines',
  },
];

export default function Fabrication() {
  return (
    <>
      <section className="page-head wrap page-head--split">
        <div>
          <Dash />
          <h1>Sheet metal and custom insulation products, cut in our own workshops.</h1>
          <p className="lead">
            CNC sheet-metal and CNC plasma cutting, then rolling, punching, welding and bending. Cladding, covers, expansion
            joints and pipe supports are made to the job.
          </p>
          <div className="hero__actions hero__actions--ink">
            <ButtonLink to="/contact" variant="primary" arrow>
              Send a drawing
            </ButtonLink>
          </div>
        </div>
        <Figure
          src="/media/sheet-metal-fabrication.webp"
          alt="Metal sheet being rolled on a forming machine"
          caption="Sheet-metal forming."
          ratio="4 / 3"
          className="page-head__figure"
        />
      </section>

      <section className="wrap" aria-labelledby="cap-title">
        <header className="section-head">
          <h2 id="cap-title">What we make, and where it goes</h2>
        </header>
        <div className="table-wrap">
          <table className="spec">
            <caption className="visually-hidden">Fabrication capabilities</caption>
            <thead>
              <tr>
                <th scope="col">Made as</th>
                <th scope="col">Process and material</th>
                <th scope="col">Used for</th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map((c) => (
                <tr key={c.made}>
                  <th scope="row">{c.made}</th>
                  <td>{c.process}</td>
                  <td>{c.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="workshops-title">
        <div className="wrap split">
          <Figure
            src="/media/custom-metal-jobs.webp"
            alt="Stainless steel tank trailer in a yard"
            caption="Custom metal jobs, large or small."
            ratio="4 / 3"
          />
          <div className="split__text">
            <Dash />
            <h2 id="workshops-title">Two workshops, both in Queensland.</h2>
            <p>
              Brisbane and Gladstone run the sheet-metal fabrication. Send a drawing or the site measurements, and we
              quote the job and the lead time for it.
            </p>
            <ul className="workshop-list">
              <li>
                <strong>Brisbane</strong>
                <span>171 Musgrave Rd, Coopers Plains, QLD 4108</span>
              </li>
              <li>
                <strong>Gladstone</strong>
                <span>1 Boowan Crt, Callemondah, QLD 4680</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap page-foot">
        <TempLine />
        <div className="page-foot__inner">
          <p>Covers, jackets or expansion joints? Send the drawing and we will come back with a price path.</p>
          <ButtonLink to="/contact" variant="primary" arrow>
            Talk to an expert
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

import { ButtonLink, Dash, TempLine } from '../components/primitives';

export default function NotFound() {
  return (
    <section className="page-head wrap not-found">
      <Dash />
      <h1>This line goes nowhere.</h1>
      <p className="lead">The page you asked for is not on the site. Start again from the index, or call us.</p>
      <div className="hero__actions hero__actions--ink">
        <ButtonLink to="/" variant="primary">
          Back to home
        </ButtonLink>
        <ButtonLink to="/products" variant="secondary">
          Quick Look index
        </ButtonLink>
      </div>
      <TempLine className="not-found__line" />
    </section>
  );
}

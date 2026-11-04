// Shared workbench parts: error boundary, loading placeholder, status chip, ground frame.
// Furniture (every text element the workbench itself prints) carries data-ds-furniture, so the craft lint and the
// font audit skip it. Furniture uses <p>/<div>, never headings, so a variant's heading outline stays its own.
import { Component } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface BoundaryProps {
  label: string;
  children: ReactNode;
}

interface BoundaryState {
  error: Error | null;
}

/** One per variant, example or scratch view: a file that throws shows a red frame and leaves the page standing. */
export class Boundary extends Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  override render() {
    if (this.state.error) return <ErrorFrame label={this.props.label} message={this.state.error.message} />;
    return this.props.children;
  }
}

export function ErrorFrame({ label, message }: { label: string; message: string }) {
  return (
    <div className="dsx-error" data-ds-furniture="" data-ds-error={label} role="alert">
      {label}: {message}
    </div>
  );
}

/** Placeholder while a lazy module loads; page prep waits until no [data-ds-loading] is left. */
export function Loading({ label }: { label: string }) {
  return (
    <div className="dsx-loading" data-ds-loading="" data-ds-furniture="">
      Loading {label}…
    </div>
  );
}

const tone = (status: string) =>
  /^(final|approved)/i.test(status)
    ? 'final'
    : /^(discarded|dropped|not in final|not chosen|re-dealt)/i.test(status)
      ? 'out'
      : /^passed/i.test(status)
        ? 'passed'
        : /^superseded/i.test(status)
          ? 'muted'
          : 'open';

export function Chip({ text }: { text: string }) {
  return (
    <span className="dsx-chip" data-tone={tone(text)} data-ds-furniture="">
      {text}
    </span>
  );
}

/** The ground an entry lives on, at the app's content width (or full bleed). */
export function Ground({
  ground,
  contentWidth,
  fullBleed,
  children,
}: {
  ground?: string;
  contentWidth?: string;
  fullBleed?: boolean;
  children: ReactNode;
}) {
  const outer: CSSProperties = { background: ground ?? 'transparent' };
  const inner: CSSProperties = fullBleed ? {} : { maxWidth: contentWidth ?? 'none' };
  return (
    <div className="dsx-ground" style={outer} data-full-bleed={fullBleed ? '' : undefined}>
      <div className="dsx-content" style={inner}>
        {children}
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Icon } from './Icons';

// The one graphic device: a thin thermal scale, cold blue to ember.
export function TempLine({ className = '' }: { className?: string }) {
  return <div className={`temp-line ${className}`} aria-hidden="true" />;
}

// Short blue dash that opens inner-page headings and sections, in place of an eyebrow label.
export function Dash() {
  return <span className="dash" aria-hidden="true" />;
}

export function Eyebrow({ index, children, light = false }: { index?: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>
      {index && <span className="eyebrow__index">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

export type ButtonVariant = 'primary' | 'secondary' | 'dark-ghost';

export function ButtonLink({
  to,
  href,
  variant = 'primary',
  arrow = false,
  children,
  className = '',
}: {
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = `btn btn--${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow" />}
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} to={to ?? '/'}>
      {inner}
    </Link>
  );
}

export type Tone = 'cold' | 'hot' | 'fire' | 'acoustic' | 'other';

export function Tag({ tone = 'other', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

export function Figure({
  src,
  alt,
  caption,
  ratio = '4 / 3',
  fit = 'cover',
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  fit?: 'cover' | 'contain';
  className?: string;
}) {
  return (
    <figure className={`figure ${className}`}>
      <div className="figure__frame" style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} loading="lazy" style={{ objectFit: fit }} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// Bracketed text the client still has to supply. Highlighted so nothing slips to launch.
export function Ph({ children }: { children: ReactNode }) {
  return <span className="ph">[{children}]</span>;
}

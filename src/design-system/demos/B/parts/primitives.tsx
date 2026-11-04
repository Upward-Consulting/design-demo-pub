// Shared parts of demo B: client pictures (provenance "own", width and height set, `loading` set by the caller), the one
// button, and the reveal hook. Reveals are disarmed by the root (demo.tsx): content is visible unless motion is on, so the
// finished composition (still=1, reduced motion, print, no IntersectionObserver) never shows a blank band.
import type { CSSProperties, ReactNode } from 'react';
import type { Pic } from '../../../assets/own/pictures';

/** A client picture. `alt` may be overridden (empty for a decorative repeat). Only first-screen pictures are `eager`. */
export function Img({
  pic,
  eager = false,
  alt,
  className,
  style,
}: {
  pic: Pic;
  eager?: boolean;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={pic.src}
      width={pic.w}
      height={pic.h}
      alt={alt ?? pic.alt}
      data-provenance="own"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}

/** The one button shape: square, 56 px tall, magenta. The primary action only (the house's accent rule). */
export function Btn({ href, children, className = '', onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <a href={href} className={`b-btn ${className}`.trim()} onClick={onClick}>
      {children}
    </a>
  );
}

/** Inline SVG glyphs. One stroke-free shape language: filled bars only. */
export function MenuGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="b-glyph">
      <rect x="3" y="6" width="18" height="3" fill="currentColor" />
      <rect x="3" y="11" width="18" height="3" fill="currentColor" />
      <rect x="3" y="16" width="18" height="3" fill="currentColor" />
    </svg>
  );
}

/** A reveal wrapper. The root arms the reveals; until then (and without motion) the element is simply shown. */
export function Rv({
  index = 0,
  as = 'div',
  className = '',
  style,
  children,
}: {
  index?: number;
  as?: 'div' | 'section' | 'li' | 'figure' | 'ul' | 'ol';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag data-b-reveal="" className={className} style={{ ['--i' as string]: index, ...style }}>
      {children}
    </Tag>
  );
}

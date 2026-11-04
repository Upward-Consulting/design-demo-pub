// Shared parts of demo A: a picture from the client's own pool, the arrow, the custom-property helper and the
// triggered entrances (utility track: 600-800 ms, 12-24 px, once, when the top is 88% down the viewport).
import type { CSSProperties } from 'react';
import type { Pic } from '../../assets/own/pictures';

/** An own picture. Every img carries width, height, alt, data-provenance="own" and lazy loading unless it is in the first screen. */
export function Img({ pic, eager = false, alt, className, style, move = false }: { pic: Pic; eager?: boolean; alt?: string; className?: string; style?: CSSProperties; move?: boolean }) {
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
      data-move={move ? '' : undefined}
    />
  );
}

/** A custom property on an inline style (for --i, --line, --start and the like). */
export function vars(values: Record<string, string | number>): CSSProperties {
  const out: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(values)) out[`--${k}`] = v;
  return out as CSSProperties;
}

export function Arrow() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" focusable="false">
      <path d="M0 7h16M10 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

/** Marks the elements that enter on scroll (the page root reads this list once per page, see demo.tsx). */
export const REVEAL = 'data-a-reveal';

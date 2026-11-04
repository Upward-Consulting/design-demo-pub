// Shared parts of demo B: the client's pictures (provenance "own", width and height set, alt from the pool), a utility
// entrance that runs once when a part enters the viewport (triggered at about 90% of the viewport), and the one button.
import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { Pic as PicType } from '../../../assets/own/pictures';

/** A client picture. `alt` may be overridden (empty for a decorative repeat); `eager` only for the first screen. */
export function Img({
  pic,
  eager = false,
  alt,
  className,
  style,
}: {
  pic: PicType;
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

/** A wrapper that rises once into place when it enters the viewport. Content is never hidden without the script. */
export function Reveal({ index = 0, className, children }: { index?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-in', '');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.setAttribute('data-in', '');
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal="" className={className} style={{ ['--i' as string]: index }}>
      {children}
    </div>
  );
}

/** The one button shape: square, 56 px, magenta. `tone` "ink" is the secondary fill; the page keeps one primary per screen. */
export function Btn({
  href,
  children,
  tone = 'primary',
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: 'primary' | 'ink';
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} className={`b-btn b-btn--${tone} ${className}`.trim()} onClick={onClick}>
      {children}
    </a>
  );
}

/** Inline SVG icons: hand-written, one stroke width, filled shapes only (no icon set in the repo). */
export function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="3" fill="currentColor" />
      <rect x="3" y="11" width="18" height="3" fill="currentColor" />
      <rect x="3" y="16" width="18" height="3" fill="currentColor" />
    </svg>
  );
}

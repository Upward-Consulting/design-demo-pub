// A triggered entrance: plays once when the element enters view, then stays. For motion OUTSIDE held chapters (an
// opener's caption, a utility page's story opener, a closing line). Inside a held chapter, motion is scrubbed from
// progress instead (useChapterProgress / --p): a CSS transition on a scrubbed property lags the scroll and breaks
// reversibility (the induction skill's story-mode reference, § 4).
//
// Content is visible without JavaScript and under prefers-reduced-motion: the hidden start state exists only inside
// @media (prefers-reduced-motion: no-preference) and only once the kit has marked <html class="story-js"> (story.css).
import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

export interface RevealProps {
  /**
   * rise (default: up 24px with opacity), fade, focus (blur to sharp; never on running body text), or wipe (a block
   * wipe: the element is uncovered from its top edge, 500 ms, ease-in-out; for a band, a rule or a picture's frame, never
   * running text; the induction skill's motion-standards reference, § 5).
   */
  kind?: 'rise' | 'fade' | 'focus' | 'wipe';
  /** Position in a stagger: each step delays the entrance by --story-stagger (90ms by default). */
  index?: number;
  /** The element to render, default div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * A wipe starts with its element clipped to nothing, and an IntersectionObserver reads a clipped element as out of view
 * (its visual box is empty), so a wipe is timed by its layout box instead. It is in view once 15% of the box lies above
 * the 88% line of the viewport, the same trigger the observer uses for the other kinds.
 */
function watchLayoutBox(el: HTMLElement): () => void {
  function stop() {
    window.removeEventListener('scroll', check);
    window.removeEventListener('resize', check);
  }
  function check() {
    const r = el.getBoundingClientRect();
    if (r.height <= 0) return;
    const visible = Math.min(r.bottom, window.innerHeight * 0.88) - Math.max(r.top, 0);
    if (visible >= 0.15 * r.height) {
      el.setAttribute('data-in', '');
      stop();
    }
  }
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  check();
  return stop;
}

export function Reveal({ kind = 'rise', index = 0, as = 'div', className, style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add('story-js');
    if (kind === 'wipe') return watchLayoutBox(el);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-in', '');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [kind]);
  const Tag = as;
  return (
    <Tag ref={ref} className={className} data-reveal={kind} style={{ ...style, ['--i' as string]: String(index) }}>
      {children}
    </Tag>
  );
}

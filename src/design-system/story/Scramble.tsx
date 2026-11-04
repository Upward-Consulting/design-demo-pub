// A scrambled label: its glyphs shuffle once and resolve into the text when the label first enters view (the induction
// skill's motion-standards reference, § 4.6; an owner-ruled allowance, default off, for labels of 40 characters or
// fewer). The accessible name is the full label, read once from a visually hidden copy; the glyph layer is aria-hidden,
// so a screen reader never hears the shuffle. Reduced motion, no JavaScript, and a label that is not a label (over 40
// characters) show the final text at once.
//
// The text is the first render, so a page without JavaScript shows the finished label. The layout effect swaps in the
// first shuffle before paint, so the visitor never sees the final text flash before the shuffle.
import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { REDUCED_QUERY } from './chapter';
import { SCRAMBLE_MAX, SCRAMBLE_SET, scrambleDuration, scrambleText } from './scramble';

/**
 * The elements a label may render as: label-sized and inline (or a plain block for a label). Body text and headings are not
 * on the list at all, so the type refuses them; the story check FAILs a scramble on a p, li, blockquote or h1-h6.
 */
export type ScrambleTag = 'span' | 'a' | 'button' | 'label' | 'small' | 'strong' | 'em' | 'abbr' | 'div';

export interface ScrambleProps {
  /** The label, 40 characters or fewer. The full text is what assistive technology reads. */
  text: string;
  /** The label element to render, default span (see ScrambleTag). */
  as?: ScrambleTag;
  /** Which shuffle the glyphs come from (default 1). The same seed resolves the same way every time. */
  seed?: number;
  /** The glyphs the shuffle draws from (default '_/|<>*'). */
  set?: string;
  className?: string;
  style?: CSSProperties;
}

// Visually hidden, as in SplitWords: the full label stays in the accessible tree and out of the layout.
const visuallyHidden: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
};

// The trigger, as Reveal: once, when the label is well inside the viewport.
const TRIGGER = { rootMargin: '0px 0px -12% 0px', threshold: 0.15 };

// Labels only (motion-standards.md § 4.6): the element list is ScrambleTag. A caller that is not typed (plain JavaScript)
// can still pass another tag, so in development that warns, once per tag, and the element renders as asked.
const LABEL_TAGS: ReadonlySet<string> = new Set<string>(['span', 'a', 'button', 'label', 'small', 'strong', 'em', 'abbr', 'div']);
const warnedTags = new Set<string>();

export function Scramble({ text, as = 'span', seed = 1, set = SCRAMBLE_SET, className, style }: ScrambleProps) {
  const glyphs = useRef<HTMLSpanElement>(null);
  if (import.meta.env.DEV && !LABEL_TAGS.has(as) && !warnedTags.has(as)) {
    warnedTags.add(as);
    console.warn(`Scramble: <${as}> is not a label element; scramble labels only (${[...LABEL_TAGS].join(', ')}). Body text and headings never scramble (motion-standards.md § 4.6).`);
  }
  const tooLong = Array.from(text).length > SCRAMBLE_MAX;

  useLayoutEffect(() => {
    const el = glyphs.current;
    if (!el || tooLong || text === '') return;
    // The glyph layer's text is React's own text node; only its value changes, so React's later updates still land.
    const show = (value: string) => {
      const node = el.firstChild;
      if (node) node.nodeValue = value;
      else el.textContent = value;
    };
    const reduced = window.matchMedia(REDUCED_QUERY);
    const duration = scrambleDuration(text);
    let frame = 0;
    let started: number | null = null;
    let io: IntersectionObserver | null = null;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      io?.disconnect();
      io = null;
    };
    const run = (now: number) => {
      if (started === null) started = now;
      const t = (now - started) / duration;
      show(scrambleText(text, t, { seed, set })); // at t >= 1 this is the text itself
      if (t < 1) frame = requestAnimationFrame(run);
    };
    const onReduced = () => {
      if (!reduced.matches) return;
      stop();
      show(text);
    };

    if (reduced.matches) return;
    reduced.addEventListener('change', onReduced);
    show(scrambleText(text, 0, { seed, set }));
    io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io?.disconnect();
      io = null;
      if (!reduced.matches) frame = requestAnimationFrame(run);
    }, TRIGGER);
    io.observe(el);
    return () => {
      reduced.removeEventListener('change', onReduced);
      stop();
    };
  }, [text, seed, set, tooLong]);

  const Tag = as;
  if (tooLong) {
    // Over 40 characters the label is copy: it renders as plain text and is never scrambled.
    if (import.meta.env.DEV) throw new Error(`Scramble: "${text.slice(0, 24)}…" is over ${SCRAMBLE_MAX} characters; use plain text`);
    return <Tag className={className} style={style}>{text}</Tag>;
  }
  return (
    <Tag data-scramble="" className={className} style={style}>
      <span style={visuallyHidden}>{text}</span>
      <span ref={glyphs} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}

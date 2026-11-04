// Scrubbed type: a line of text split into words that a chapter can move one by one (a word-by-word fill, a stagger, a
// mask rise). Screen readers read the original text once, from a visually hidden copy; the split words are aria-hidden.
// Each word is an inline-block span with --w (its index) and data-word, separated by real spaces so the line still
// wraps. Words, not lines: line breaks depend on the width, so a line split would have to be redone on every resize
// (the induction skill's story-mode reference, § 4).
import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ElementType } from 'react';

export interface SplitWordsProps {
  text: string;
  /** Element to render, default span (use h1-h3 or p for headings and statements). */
  as?: ElementType;
  /** Receives every word element once mounted, in order, for a chapter to drive in useChapterProgress. */
  onWords?: (words: HTMLElement[]) => void;
  className?: string;
  style?: CSSProperties;
}

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

export function SplitWords({ text, as = 'span', onWords, className, style }: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (onWords && ref.current) onWords([...ref.current.querySelectorAll<HTMLElement>('[data-word]')]);
  }, [onWords, text]);
  const Tag = as;
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag ref={ref} className={className} style={style}>
      <span style={visuallyHidden}>{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={`${i}-${w}`}>
            <span data-word={i} style={{ display: 'inline-block', ['--w' as string]: String(i) }}>
              {w}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

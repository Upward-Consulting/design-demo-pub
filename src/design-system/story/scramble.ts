// Scrambled type: a label resolves from random glyphs into its own text (the induction skill's motion-standards reference,
// § 4.6 and § 5.1). scrambleText is pure: the same label, progress t and seed always give the same string, so a test can seek
// any t and a scroll-scrubbed label can take t from its chapter's p. No clocks, no Math.random (the timeline's rules).
//
// Scrambling is for labels only: SCRAMBLE_MAX characters or fewer. Longer text is copy, and copy does not move. The
// glyph layer is decorative and is hidden from assistive technology by the Scramble component; the full label is read
// from a visually hidden copy. Timing (an owner-ruled allowance, default off): three shuffles of 100 ms, then the
// characters lock in order, 30 ms apart, so a label of n characters resolves in 300 + 30 (n - 1) ms. Spaces never
// scramble, so the word shapes hold.
import { clamp01, seeded } from './timeline';

/** The longest label that scrambles. Longer text renders plain (and throws in development: see Scramble.tsx). */
export const SCRAMBLE_MAX = 40;
/** The glyphs a shuffle draws from. */
export const SCRAMBLE_SET = '_/|<>*';

const SHUFFLE_COUNT = 3;
const SHUFFLE_STEP_MS = 100;
const CHAR_STEP_MS = 30;
const SHUFFLE_MS = SHUFFLE_COUNT * SHUFFLE_STEP_MS;

export interface ScrambleOptions {
  /** Which shuffle the glyphs come from: the same seed gives the same glyphs at every t (default 1). */
  seed?: number;
  /** The glyphs to draw from (default SCRAMBLE_SET). An empty set returns the text. */
  set?: string;
}

/** The time the whole effect takes for `text`, in ms: the last character locks at this time. 0 for an empty label. */
export function scrambleDuration(text: string): number {
  const n = Array.from(text).length;
  return n === 0 ? 0 : SHUFFLE_MS + CHAR_STEP_MS * (n - 1);
}

/**
 * The label at progress t in [0, 1] of its effect: t 0 is all glyphs, t 1 is the text exactly. Each character locks once
 * t passes its slot (in order, left to right) and never unlocks as t grows. Characters are code points, so an emoji is
 * one character.
 */
export function scrambleText(text: string, t: number, { seed = 1, set = SCRAMBLE_SET }: ScrambleOptions = {}): string {
  const chars = Array.from(text);
  const glyphs = Array.from(set);
  if (chars.length === 0 || glyphs.length === 0) return text;
  const p = clamp01(t);
  if (p >= 1) return text;
  const ms = p * scrambleDuration(text);
  const shuffle = Math.floor(ms / SHUFFLE_STEP_MS);
  let out = '';
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i] ?? '';
    if (/\s/.test(c) || ms >= SHUFFLE_MS + CHAR_STEP_MS * i) {
      out += c;
      continue;
    }
    const r = seeded(Math.imul(seed | 0, 0x9e3779b1) ^ Math.imul(shuffle + 1, 0x85ebca77) ^ Math.imul(i + 1, 0xc2b2ae3d))();
    out += glyphs[Math.min(glyphs.length - 1, Math.floor(r * glyphs.length))] ?? '_';
  }
  return out;
}

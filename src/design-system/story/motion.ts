// Motion functions: the engine knowledge a story chapter is built from, never a look (the induction skill's story-mode
// reference, § 5, the catalogue). Each is a pure function of progress p in [0, 1] that returns a style value, so a
// chapter composes them inside useChapterProgress and writes the result to a ref. Same p, same value: the story check
// can seek and compare.
import { clamp01, ease, interpolate, local, stagger } from './timeline';
import type { Easing } from './timeline';

/**
 * Opening window: a picture shown as an inset window opens to full bleed over [from, to] of p.
 * inset is the starting inset in percent of each side (vertical, horizontal); radius the starting corner in px.
 */
export function windowOpen(
  p: number,
  { from = 0.15, to = 0.75, inset = [22, 30] as const, radius = 12, easing = ease.move }: {
    from?: number; to?: number; inset?: readonly [number, number]; radius?: number; easing?: Easing;
  } = {},
): string {
  const k = 1 - easing(local(p, from, to));
  return `inset(${(inset[0] * k).toFixed(2)}% ${(inset[1] * k).toFixed(2)}% round ${(radius * k).toFixed(1)}px)`;
}

/**
 * Depth layers: a layer travels `rate` times as far as the stage over the chapter, as a share of its own height.
 * `travel` is the layer's total range over its own height, so the value spans ±travel/2 from p 0 to p 1. It defaults to the
 * cap (±4% for a foreground layer, ±5% with background).
 * The house limit for parallax is 8% of the element in total for a foreground layer (motion-standards.md § 5.1). A
 * full-bleed background layer may go to 10% in total, an owner-ruled allowance (motion-standards.md § 9.3) that is off
 * until the project rules it: pass { background: true } (±5%). The cap bounds the returned value, whatever the rate, so
 * no call can exceed ±cap/2.
 * Returns a translateY in percent of the element's own height (use with translate3d(0, X%, 0)).
 */
export function layer(
  p: number,
  { rate = 1, travel, background = false }: { rate?: number; travel?: number; background?: boolean } = {},
): number {
  const cap = background ? 10 : 8; // the total range over the element's own height, in %
  const want = travel ?? cap;
  const t = Math.min(Math.abs(want), cap) * Math.sign(want || 1);
  const value = (0.5 - clamp01(p)) * t * rate;
  const half = cap / 2;
  return +Math.max(-half, Math.min(half, value)).toFixed(3);
}

/**
 * Pixel lock: an element that moves 1:1 with the scroll inside a lock stage (the induction skill's motion-standards
 * reference, § 4.2; the 1:1 glyph ring of the neue study). A lock chapter scrolls holdScreens * vh px across p 0 → 1, so
 * the element translates -holdScreens * vh * p px: a slope of -1.00 px per scroll px, the same at any frame rate, because
 * it is a function of p and not of time. vh is the viewport height in px (the stage's height in the kit's lock model).
 * Returns a translateY in px (use with translate3d(0, Ypx, 0)).
 */
export function lockedPx(p: number, holdScreens: number, vh: number): number {
  const span = holdScreens * vh;
  if (!Number.isFinite(span)) return 0;
  return +(-clamp01(p) * span).toFixed(3);
}

/**
 * Ink fill: line i of `count` fills from a resting ink share to full ink across [from, to], in order.
 * Opacity never overshoots, so the easing is a settle, not a spring.
 */
export function inkFill(
  p: number,
  i: number,
  count: number,
  { from = 0.08, to = 0.55, floor = 0.22, share = 0.5 }: { from?: number; to?: number; floor?: number; share?: number } = {},
): number {
  const [a, b] = stagger(i, count, from, to, share);
  return +interpolate(p, [a, b], [floor, 1], { easing: ease.settle }).toFixed(4);
}

/**
 * Fan: card i of `count` travels from a pile to a row across [from, to]. spread is the full row width in vw, rotate
 * the outermost card's final angle in degrees, pile the small angle each card has in the pile. With the defaults the
 * outermost card ends at 2 degrees and the pile angle stays within 2 degrees for up to nine cards: the vestibular
 * ceiling for elements over 10% of the screen. Larger angles, or bigger fans, are for small cards only.
 * Returns the transform to append after the card's own centring (e.g. translate(-50%, -50%)).
 */
export function fan(
  p: number,
  i: number,
  count: number,
  { from = 0.12, to = 0.6, spread = 48, rotate = 2, pile = 0.5, easing = ease.move }: {
    from?: number; to?: number; spread?: number; rotate?: number; pile?: number; easing?: Easing;
  } = {},
): string {
  const f = easing(local(p, from, to));
  const offset = count > 1 ? (i / (count - 1)) * 2 - 1 : 0; // -1 … 1
  const x = (offset * spread) / 2;
  const r = offset * rotate * f + (i - (count - 1) / 2) * pile * (1 - f);
  return `translateX(${(x * f).toFixed(2)}vw) rotate(${r.toFixed(2)}deg)`;
}

/** Stroke draw: the dash offset that draws a path of `length` px from nothing to whole across [from, to]. */
export function strokeDraw(p: number, length: number, { from = 0, to = 1, easing = ease.move }: { from?: number; to?: number; easing?: Easing } = {}): number {
  return +(length * (1 - easing(local(p, from, to)))).toFixed(2);
}

/** Frame scrub: the index of the frame to show from a set of n (an image sequence from the image worker's frame set). */
export function frameIndex(p: number, n: number): number {
  if (n <= 1) return 0;
  return Math.round(clamp01(p) * (n - 1));
}

/** Frames to preload around the current one, nearest first (decode a window, not the whole set). */
export function framesAround(index: number, n: number, radius = 6): number[] {
  const out = [index];
  for (let d = 1; d <= radius; d++) {
    if (index + d < n) out.push(index + d);
    if (index - d >= 0) out.push(index - d);
  }
  return out;
}

export interface CameraStop {
  /** Where on p the camera rests at this stop. */
  at: number;
  /** World-space position of the stop's centre, in px of the world canvas, and the zoom. */
  x: number;
  y: number;
  scale?: number;
}

/**
 * Camera pan over a world-space canvas: one transform on the world wrapper moves the view between stops, each held where
 * p equals its `at`. Pans between stops ease in-out (a camera move). Returns the world wrapper's transform for a stage of
 * the given size (the stop's centre lands in the middle of the stage).
 */
export function cameraPan(p: number, stops: readonly CameraStop[], stage: { width: number; height: number }, easing = ease.move): string {
  if (!stops.length) return 'none';
  const at = stops.map((s) => s.at);
  const pick = (f: (s: CameraStop) => number) =>
    stops.length === 1 ? f(stops[0] as CameraStop) : interpolate(p, at, stops.map(f), { easing });
  const scale = pick((s) => s.scale ?? 1);
  const x = pick((s) => s.x);
  const y = pick((s) => s.y);
  const tx = stage.width / 2 - x * scale;
  const ty = stage.height / 2 - y * scale;
  return `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
}

/** Pushed line: a line of large type pushed sideways by the scroll, `travel` in vw from right to left across the hold. */
export function pushLine(p: number, travel = 30): number {
  return +((0.5 - clamp01(p)) * travel).toFixed(3);
}

/**
 * Scale between two sizes across [from, to] (a picture settling, a wordmark receding). A scrubbed picture changes scale
 * by 0.10 at most and stays within 0.90-1.10 (motion-standards.md § 5.1). The story check's R4 rule measures the change.
 */
export function scaleTo(p: number, a: number, b: number, { from = 0, to = 1, easing = ease.arrive }: { from?: number; to?: number; easing?: Easing } = {}): number {
  return +interpolate(p, [from, to], [a, b], { easing }).toFixed(4);
}

// Story timeline maths. Every visual in a story chapter is a pure function of one number, the chapter's progress p in
// [0, 1] (the induction skill's story-mode reference, § 4): the same p always gives the same picture, whichever way the
// visitor scrolled there, so a test can seek any p and screenshot it. No clocks, no Math.random, no state carried
// between frames.
//
// interpolate() follows Remotion's signature (input range, output range, easing) but clamps by default: scroll progress
// overshoots at section edges (overscroll, resize, a refresh mid-scroll), and an unclamped value flies off the stage.

export type Easing = (t: number) => number;

/** Clamp to [0, 1]. NaN (a zero-length hold, a missing measurement) becomes 0, so it never reaches a style. */
export const clamp01 = (x: number): number => (!Number.isFinite(x) ? (x === Infinity ? 1 : 0) : x < 0 ? 0 : x > 1 ? 1 : x);

/** Progress inside the window [a, b] of p, clamped to [0, 1]: a chapter's band, a line's slot in a stagger. */
export function local(p: number, a: number, b: number): number {
  if (b <= a) return p >= b ? 1 : 0;
  return clamp01((p - a) / (b - a));
}

/** A CSS-style cubic-bezier easing (the same curve as cubic-bezier(x1, y1, x2, y2) in CSS). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): Easing {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-6) return t;
      const d = slopeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    for (let i = 0; i < 40; i++) {
      const v = sampleX(t);
      if (Math.abs(v - x) < 1e-6) return t;
      if (v < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return t;
  };
  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveT(x)));
}

/**
 * Eases by role, not by taste. On a scroll page a visitor can stop mid-move, so arrivals have long tails: a move that
 * stops at 70% still looks deliberate. Opacity and colour never use an easing that overshoots.
 */
export const ease = {
  linear: (t: number) => t,
  /** Arrivals: long-tailed ease-out, lands and rests. */
  arrive: cubicBezier(0.16, 1, 0.3, 1),
  /** Text settling into place: a gentler ease-out. */
  settle: cubicBezier(0.22, 1, 0.36, 1),
  /** Camera moves, colour floods, things travelling between two places. */
  move: cubicBezier(0.65, 0, 0.35, 1),
  /** Exits and zooms through: accelerating. A code value, not a studied one: motion-standards.md § 5.2 names taste's leaving curve, which differs. */
  exit: cubicBezier(0.7, 0, 0.84, 0),
} satisfies Record<string, Easing>;

export interface InterpolateOptions {
  /** One easing for every segment, or one per segment (input.length - 1 of them). Default linear. */
  easing?: Easing | readonly Easing[];
  /** Clamp outside the input range (default true). With false, the first and last segments extend linearly. */
  clamp?: boolean;
}

/**
 * Map p through keyframes: interpolate(p, [0, 0.3, 1], [40, 0, 0]) rises 40px over the first 30% and holds.
 * input must be increasing and the same length as output (two or more points).
 */
export function interpolate(
  p: number,
  input: readonly number[],
  output: readonly number[],
  options: InterpolateOptions = {},
): number {
  const n = input.length;
  if (n < 2 || output.length !== n) throw new Error('interpolate: input and output need the same length, two or more points');
  for (let i = 1; i < n; i++) {
    if ((input[i] as number) <= (input[i - 1] as number)) throw new Error('interpolate: input must be strictly increasing');
  }
  const { easing = ease.linear, clamp = true } = options;
  if (!Number.isFinite(p)) p = p === Infinity ? Infinity : -Infinity; // NaN reads as the start, never as NaN
  const easeFor = (i: number): Easing => (typeof easing === 'function' ? easing : (easing[i] ?? ease.linear));
  const first = input[0] as number;
  const last = input[n - 1] as number;
  if (p <= first || p >= last) {
    const atStart = p <= first;
    if (clamp) return (atStart ? output[0] : output[n - 1]) as number;
    const i = atStart ? 0 : n - 2;
    const x0 = input[i] as number;
    const x1 = input[i + 1] as number;
    const y0 = output[i] as number;
    const y1 = output[i + 1] as number;
    return y0 + ((y1 - y0) * (p - x0)) / (x1 - x0);
  }
  let i = 0;
  while (i < n - 2 && p >= (input[i + 1] as number)) i++;
  const x0 = input[i] as number;
  const x1 = input[i + 1] as number;
  const y0 = output[i] as number;
  const y1 = output[i + 1] as number;
  return y0 + (y1 - y0) * easeFor(i)((p - x0) / (x1 - x0));
}

/**
 * A spring as a pure function of t in [0, 1] (no simulation, no state): starts at 0, settles at 1 by t = 1.
 * damping is the damping ratio: 1 never overshoots, 0.7-0.85 reads premium, 0.4-0.6 playful, under 0.3 cartoon.
 * Overshoots above 1 when damping < 1, so use it for position and scale, never for opacity or colour.
 */
export function spring(t: number, { damping = 0.8 }: { damping?: number } = {}): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  if (damping >= 1) {
    const w = 6.6; // the envelope reaches about 1% at t = 1
    return 1 - Math.exp(-w * t) * (1 + w * t);
  }
  const zeta = Math.max(0.05, damping);
  const w = 4.6 / zeta; // decay envelope e^(-zeta * w * t) reaches 1% at t = 1
  const wd = w * Math.sqrt(1 - zeta * zeta);
  return 1 - Math.exp(-zeta * w * t) * (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t));
}

/**
 * The window [a, b] of item i in a stagger of `count` items spread over [from, to], each lasting `share` of the span:
 * stagger(i, 5, 0, 0.3) gives five overlapping slots across the first 30%. Item i + 1 starts when item i is
 * (1 - share) / ((count - 1) * share) done: 37.5% for five items at the default share of 0.4, 100% (no overlap) when
 * share = 1 / count.
 */
export function stagger(i: number, count: number, from: number, to: number, share = 0.4): [number, number] {
  if (count <= 1) return [from, to];
  const span = to - from;
  const len = span * share;
  const step = (span - len) / (count - 1);
  const a = from + step * i;
  return [a, a + len];
}

/**
 * Frame-rate-independent lag: follow(tauMs) returns the step that moves `current` toward `target` over `dtMs`, with
 * k = 1 - exp(-dt / tau). Two half-frames land where one whole frame does, so the settle time is the same at 30 Hz and
 * 120 Hz (the induction skill's motion-standards reference, § 4.3). tau 0 (or less) means no lag: the step returns
 * the target. The step is pure: the caller keeps the value between frames, as the kit's rule requires.
 * The kit's own default is 0. A story's trailing layer takes its tau from story.json (0.14 s recommended; 130-160 ms).
 */
export function follow(tauMs: number): (current: number, target: number, dtMs: number) => number {
  const tau = tauMs > 0 ? tauMs : 0;
  return (current, target, dtMs) => {
    if (tau === 0) return target;
    if (!(dtMs > 0)) return current;
    return current + (target - current) * (1 - Math.exp(-dtMs / tau));
  };
}

/** A deterministic random generator (mulberry32): seeded(7)() gives the same sequence every run, every frame. */
export function seeded(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

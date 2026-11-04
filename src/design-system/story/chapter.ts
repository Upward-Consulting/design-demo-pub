// The story kit's non-component exports: the progress contexts, the hooks that read them, and the shared
// scroll-progress engine (kept apart from the .tsx files so those export only components, as React Fast Refresh
// requires). The induction skill's story-mode reference, § 4.
import { createContext, useContext, useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { clamp01, follow } from './timeline';
import { REDUCED_MOTION_QUERY } from './pause';

export type Mode = 'live' | 'rest';
export type Model = 'lock' | 'sync';
export type Listener = (p: number) => void;

export interface ProgressApi {
  subscribe: (fn: Listener) => () => void;
  mode: Mode;
}

/** The chapter a component sits in. */
export const ChapterContext = createContext<ProgressApi | null>(null);
/** The story run (several chapters sharing a carrier layer) a component sits in. */
export const RunContext = createContext<ProgressApi | null>(null);

/** One phone rule for the kit and the story check: narrow screens and coarse pointers. */
export const PHONE_QUERY = '(max-width: 599px), (pointer: coarse)';
export const REDUCED_QUERY = REDUCED_MOTION_QUERY;
/** A touch screen or other coarse pointer: its scroll keeps native momentum, so the progress is not lagged there. */
const COARSE_QUERY = '(pointer: coarse)';

/**
 * The held stage's height in px: var(--story-vh), measured from a probe. A lock chapter's span and its text-fit test use
 * this, not window.innerHeight: innerHeight changes as the browser's toolbars move on a phone, and the stage's svh height
 * does not. Falls back to innerHeight where the variable is not defined.
 */
export function storyVhPx(): number {
  const probe = document.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:var(--story-vh);visibility:hidden;pointer-events:none;';
  document.body.appendChild(probe);
  const px = probe.offsetHeight;
  probe.remove();
  return px > 0 ? px : window.innerHeight;
}

function useProgressFrom(api: ProgressApi | null, callback: Listener): void {
  const latest = useRef(callback);
  useLayoutEffect(() => {
    latest.current = callback;
  });
  useLayoutEffect(() => {
    if (!api) {
      latest.current(1);
      return;
    }
    return api.subscribe((p) => latest.current(p));
  }, [api]);
}

/**
 * Subscribe to the chapter's progress. The callback runs at once with the current p and then on every change; write
 * styles to refs inside it (no setState per frame). Outside a chapter it is called once with 1 (the finished state).
 */
export function useChapterProgress(callback: Listener): void {
  useProgressFrom(useContext(ChapterContext), callback);
}

/** Subscribe to the story run's progress (a carrier crossing several chapters). Same contract as useChapterProgress. */
export function useRunProgress(callback: Listener): void {
  useProgressFrom(useContext(RunContext), callback);
}

/** Whether the surrounding chapter runs live or shows its finished composition. */
export function useChapterMode(): Mode {
  return useContext(ChapterContext)?.mode ?? 'rest';
}

export interface ScrollProgressOptions {
  /** id for the dev seek hook and the story check. */
  id: string;
  /** Is the element running (live)? At rest, onProgress is called once with restAt. */
  live: boolean;
  /** lock: held, p runs while the element's top is at the viewport top until its bottom reaches the viewport bottom.
   *  sync: not held, p runs from the element's top entering at the viewport bottom to its bottom leaving at the top. */
  model: Model;
  /**
   * The trailing layer's time constant tau, in seconds: the displayed progress covers about 63% of the gap to the scroll
   * per `weight`. The kit's default is 0, locked to the scroll: no smoothing unless the story asks. A story's story.json
   * carries its ruled weight; 0.14 is the recommended start for story pages (the induction skill's motion-standards
   * reference, § 4.3: 130-160 ms). Ignored on a coarse pointer (touch keeps its native momentum) and under
   * prefers-reduced-motion, where the progress is locked to the scroll.
   */
  weight: number;
  restAt: number;
  hold: number;
  onProgress: Listener;
}

interface RegistryEntry {
  id: string;
  hold: number;
  model: Model;
  live: () => boolean;
  range: () => { start: number; span: number; height: number };
}

declare global {
  interface Window {
    /** Dev only. The chapters on the page, and seek(id, p): an instant real scroll to that progress, resolved once the
     *  displayed progress has settled (with weight). The story check works without it, from the DOM. */
    __story?: {
      entries: Map<string, RegistryEntry>;
      chapters: () => Array<{ id: string; hold: number; model: Model; live: boolean; start: number; span: number; height: number }>;
      seek: (id: string, p: number) => Promise<void>;
    };
  }
}

function registry() {
  if (!import.meta.env.DEV) return null;
  if (!window.__story) {
    const entries = new Map<string, RegistryEntry>();
    window.__story = {
      entries,
      chapters: () => [...entries.values()].map((e) => ({ id: e.id, hold: e.hold, model: e.model, live: e.live(), ...e.range() })),
      seek: (id, p) => {
        const e = entries.get(id);
        if (!e) return Promise.reject(new Error(`no story chapter "${id}"`));
        const { start, span } = e.range();
        window.scrollTo({ top: Math.round(start + clamp01(p) * span), behavior: 'instant' });
        return new Promise((resolve) => {
          const done = () => (document.querySelector('[data-settling]') ? requestAnimationFrame(done) : resolve());
          requestAnimationFrame(() => requestAnimationFrame(done));
        });
      },
    };
  }
  return window.__story;
}

/**
 * The scroll-progress engine shared by StoryChapter and StoryRun. Geometry is cached (measured on mount, resize, font
 * load and any size change of the page or the element) and never read inside the scroll handler; one passive scroll
 * listener per element, coalesced to one computation per animation frame. Out-of-view elements sit at p = 0 or 1, so
 * they write nothing while another chapter plays.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, opts: ScrollProgressOptions): void {
  const { id, live, model, weight, restAt, hold, onProgress } = opts;
  const emitRef = useRef(onProgress);
  useLayoutEffect(() => {
    emitRef.current = onProgress;
  });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    let span = 1;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (model === 'lock') {
        // A held chapter scrolls its hold in stage heights: its span is the chapter less one stage, not less the window.
        start = top;
        span = Math.max(1, el.offsetHeight - storyVhPx());
      } else {
        const vh = window.innerHeight;
        start = top - vh;
        span = Math.max(1, el.offsetHeight + vh);
      }
    };
    const reg = registry();
    if (!live) {
      // At rest the chapter is still listed (so the checks see it), with its range measured when asked.
      reg?.entries.set(id, {
        id,
        hold,
        model,
        live: () => false,
        range: () => {
          measure();
          return { start, span, height: el.offsetHeight };
        },
      });
      emitRef.current(clamp01(restAt));
      return () => {
        reg?.entries.delete(id);
      };
    }
    let displayed = -1;
    let target = 0;
    let frame = 0;
    let last = 0;
    const coarse = window.matchMedia(COARSE_QUERY);
    const reduced = window.matchMedia(REDUCED_QUERY);
    const lag = follow(weight * 1000);
    const step = (now: number) => {
      frame = 0;
      target = clamp01((window.scrollY - start) / span);
      if (displayed < 0 || weight <= 0 || coarse.matches || reduced.matches) displayed = target;
      else {
        // dt is clamped to 100 ms, so a long gap (a background tab) takes one bounded step, not an instant jump. The step
        // still closes about 54% of the gap at a 130 ms tau (1 - e^(-100/130)): the clamp shrinks the jump, it does not
        // remove it.
        displayed = lag(displayed, target, Math.min(100, now - (last || now)));
        if (Math.abs(target - displayed) < 5e-4) displayed = target;
      }
      last = now;
      emitRef.current(displayed);
      if (displayed !== target) {
        el.setAttribute('data-settling', '');
        frame = requestAnimationFrame(step);
      } else el.removeAttribute('data-settling');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const remeasure = () => {
      measure();
      onScroll();
    };
    measure();
    step(performance.now());
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure);
    const sizes = new ResizeObserver(remeasure);
    sizes.observe(document.documentElement);
    sizes.observe(el);
    void document.fonts?.ready.then(remeasure);
    reg?.entries.set(id, { id, hold, model, live: () => true, range: () => ({ start, span, height: el.offsetHeight }) });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeAttribute('data-settling');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', remeasure);
      sizes.disconnect();
      reg?.entries.delete(id);
    };
  }, [ref, id, live, model, weight, restAt, hold]);
}

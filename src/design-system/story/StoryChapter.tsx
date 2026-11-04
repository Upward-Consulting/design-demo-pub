// One story chapter (the induction skill's story-mode reference, § 4): the React port of the taste stage contract
// (taste's assets/scenes/stage.js needs GSAP and Lenis as browser globals from a CDN, which a bundled app cannot use
// without new dependencies). Same markup, same --p, same live/rest meaning, so taste's scenes.mjs, the gate's scroll film
// and the story check (design-system/assets/snippets/story-check.run.js) measure it unchanged:
//
//   <section class="scene story-chapter is-live|is-rest" data-scene="…" data-model="lock" data-hold="2" …>
//
// lock: held for `hold` screens while p runs 0 → 1 with native scroll (the page appears to stop; the wheel is never
//       captured). It is a taste scene (class "scene") and counts against the scene cap the owner ruled.
// sync: not held; p runs while the chapter passes through the viewport. Not a scene (no "scene" class).
//
// Progress is written to the section as --p (CSS calc can map it linearly) and sent to useChapterProgress subscribers,
// which compute eased values and write them to refs. The first render is always at rest (server markup equals the first
// client render); a layout effect makes it live unless prefers-reduced-motion, the phone plan, the board
// ([data-story-rest]) or, for a lock chapter, words that reach below one screen (200% text, a short window) say rest;
// it decides again on resize, a media change and any size change of the stage's text. At rest p = restAt, the finished
// composition, one screen tall.
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ChapterContext, PHONE_QUERY, REDUCED_QUERY, storyVhPx, useScrollProgress } from './chapter';
import type { Listener, Mode, Model, ProgressApi } from './chapter';

export interface StoryChapterProps {
  /** data-scene and the element id: the name story.json, the checks and the review sheet use. */
  id: string;
  /** Accessible name of the chapter region. */
  label: string;
  /** lock (held) or sync (scrubbed in passing). Default lock. */
  model?: Model;
  /** lock: screens held, 1-3 for a text-led held stage (4 only for an object-led continuous scrub the owner has ruled, long-pin). sync: ignored. */
  hold?: number;
  /** The phone plan the owner ruled for this chapter: run live, or show the finished composition. */
  phone: Mode;
  /** The progress whose state is the finished composition (default 1). */
  restAt?: number;
  /**
   * The trailing layer's tau in seconds: how long the progress takes to catch the scroll. The kit's default is 0, locked to
   * the scrollbar (no smoothing unless the story asks). A story's story.json carries its ruled weight; 0.14 s is the
   * recommended start for story pages.
   */
  weight?: number;
  /** Progress windows where nothing changes on purpose (declared rests), from story.json. */
  rests?: ReadonlyArray<readonly [number, number]>;
  /** The reading window: text has landed by its start and stays still until its end, from story.json. */
  textStill?: readonly [number, number];
  /** A different finished composition, if rendering the children at restAt is not it. */
  rest?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const TEXT = 'h1, h2, h3, h4, p, li, blockquote, figcaption, a, button';

/** Whether any text in the stage lies outside one screen, from layout offsets (transforms ignored). */
function textOverflows(stage: HTMLElement): boolean {
  const vh = storyVhPx(); // the held stage's height, not the window's: the stage clips at var(--story-vh)
  for (const t of stage.querySelectorAll<HTMLElement>(TEXT)) {
    let y = 0;
    let n: HTMLElement | null = t;
    while (n && n !== stage) {
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    if (n !== stage) continue; // not displayed, or fixed: not part of the held composition
    if (y < -1 || y + t.offsetHeight > vh + 1) return true;
  }
  return false;
}

function validate({ id, model = 'lock', hold = 2, restAt = 1, weight = 0 }: StoryChapterProps): void {
  if (!id) throw new Error('StoryChapter: id is required');
  if (model === 'lock' && !(hold >= 1)) throw new Error(`StoryChapter ${id}: a lock chapter holds 1 screen or more`);
  if (!(restAt >= 0 && restAt <= 1)) throw new Error(`StoryChapter ${id}: restAt must lie in [0, 1]`);
  if (!(weight >= 0)) throw new Error(`StoryChapter ${id}: weight must be 0 or more`);
}

export function StoryChapter(props: StoryChapterProps) {
  validate(props);
  const { id, label, model = 'lock', hold = 2, phone, restAt = 1, weight = 0, rests, textStill, rest, className, style, children } = props;
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('rest');
  const [error, setError] = useState<Error | null>(null);
  if (error) throw error;
  const listeners = useRef(new Set<Listener>());
  const progress = useRef(restAt);
  const tall = useRef(false);
  const hasRest = rest !== undefined;

  const subscribe = useCallback((fn: Listener) => {
    listeners.current.add(fn);
    fn(progress.current);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);
  const api = useMemo<ProgressApi>(() => ({ subscribe, mode }), [subscribe, mode]);

  // Mode: decided on the client and kept in step with the media queries, the window size and the content.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add('story-js');
    const decide = (): Mode => {
      if (el.closest('[data-story-rest]')) return 'rest';
      if (window.matchMedia(REDUCED_QUERY).matches) return 'rest';
      if (phone === 'rest' && window.matchMedia(PHONE_QUERY).matches) return 'rest';
      // A lock chapter whose words do not fit one screen cannot be held without clipping them (200% text, a short
      // window), so it rests. Measured live or at rest, from layout offsets: transforms are ignored, so a title that
      // slides in from below, or a picture scaled past the stage, is not mistaken for overflow. Only text counts. While
      // a separate `rest` composition is shown the live one is not mounted, so the last verdict stands.
      const stage = stageRef.current;
      if (model !== 'lock') tall.current = false;
      else if (stage && (!hasRest || el.classList.contains('is-live'))) tall.current = textOverflows(stage);
      return tall.current ? 'rest' : 'live';
    };
    const update = () => setMode(decide());
    update();
    const queries = [window.matchMedia(REDUCED_QUERY), window.matchMedia(PHONE_QUERY)];
    for (const q of queries) q.addEventListener('change', update);
    window.addEventListener('resize', update);
    // A text-size change fires no resize event: watch the text itself (re-attached when the mode changes the
    // stage's content), one decision per frame.
    let frame = 0;
    const sizes = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    });
    if (model === 'lock' && stageRef.current) for (const t of stageRef.current.querySelectorAll(TEXT)) sizes.observe(t);
    return () => {
      for (const q of queries) q.removeEventListener('change', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(frame);
      sizes.disconnect();
    };
  }, [phone, model, hasRest, mode]);

  const onProgress = useCallback((p: number) => {
    const el = ref.current;
    if (!el) return;
    if (Math.abs(p - progress.current) < 1e-4 && el.style.getPropertyValue('--p') !== '') return;
    progress.current = p;
    el.style.setProperty('--p', p.toFixed(4));
    try {
      for (const fn of listeners.current) fn(p);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e))); // shown by the workbench's error boundary
    }
  }, []);

  const live = mode === 'live';
  useScrollProgress(ref, { id, live, model, weight, restAt, hold, onProgress });

  return (
    <ChapterContext.Provider value={api}>
      <section
        ref={ref}
        id={id}
        data-scene={id}
        data-model={model}
        data-hold={model === 'lock' ? hold : 0}
        data-phone={phone}
        data-rest-at={restAt}
        data-rests={rests ? JSON.stringify(rests) : undefined}
        data-text-still={textStill ? JSON.stringify(textStill) : undefined}
        aria-label={label}
        className={[model === 'lock' ? 'scene' : null, 'story-chapter', `story-${model}`, live ? 'is-live' : 'is-rest', className]
          .filter(Boolean)
          .join(' ')}
        style={{ ...style, ['--hold' as string]: String(model === 'lock' ? hold : 0) }}
      >
        <div ref={stageRef} className="story-stage">
          {!live && rest !== undefined ? rest : children}
        </div>
      </section>
    </ChapterContext.Provider>
  );
}

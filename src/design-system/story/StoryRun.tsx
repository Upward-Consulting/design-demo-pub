// A story run: consecutive chapters that share a carrier layer (the induction skill's story-mode reference, § 4). A
// chapter's own stage scrolls away with its section, so nothing on it can cross into the next chapter. A run puts one
// sticky layer over its chapters, full-screen and click-through, whose state is a function of the run's progress: the
// object the eye follows across the seams (a word, a shape, a picture that travels).
//
// The carrier is decorative by contract (aria-hidden): meaning never lives only in it. At rest (reduced motion, phone,
// the board) it is not rendered; the chapters' finished compositions carry the story on their own.
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { PHONE_QUERY, REDUCED_QUERY, RunContext, useScrollProgress } from './chapter';
import type { Listener, Mode, ProgressApi } from './chapter';

export interface StoryRunProps {
  id: string;
  /** The carrier layer's content; it reads the run's progress with useRunProgress. */
  carrier: ReactNode;
  /** Run the carrier on phones (default no: a phone gets the chapters' own compositions). */
  phone?: Mode;
  /** The trailing layer's tau in seconds; 0 (the default) locks the run to the scrollbar, as for a chapter. */
  weight?: number;
  children: ReactNode;
}

export function StoryRun({ id, carrier, phone = 'rest', weight = 0, children }: StoryRunProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('rest');
  const [error, setError] = useState<Error | null>(null);
  if (error) throw error;
  const listeners = useRef(new Set<Listener>());
  const progress = useRef(0);
  const subscribe = useCallback((fn: Listener) => {
    listeners.current.add(fn);
    fn(progress.current);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);
  const api = useMemo<ProgressApi>(() => ({ subscribe, mode }), [subscribe, mode]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setMode(
        el.closest('[data-story-rest]') ||
          window.matchMedia(REDUCED_QUERY).matches ||
          (phone === 'rest' && window.matchMedia(PHONE_QUERY).matches)
          ? 'rest'
          : 'live',
      );
    update();
    const queries = [window.matchMedia(REDUCED_QUERY), window.matchMedia(PHONE_QUERY)];
    for (const q of queries) q.addEventListener('change', update);
    return () => {
      for (const q of queries) q.removeEventListener('change', update);
    };
  }, [phone]);

  const onProgress = useCallback((p: number) => {
    const el = ref.current;
    if (!el) return;
    if (Math.abs(p - progress.current) < 1e-4 && el.style.getPropertyValue('--run-p') !== '') return;
    progress.current = p;
    el.style.setProperty('--run-p', p.toFixed(4));
    try {
      for (const fn of listeners.current) fn(p);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e))); // shown by the workbench's error boundary
    }
  }, []);
  const live = mode === 'live';
  useScrollProgress(ref, { id: `run:${id}`, live, model: 'lock', weight, restAt: 1, hold: 0, onProgress });

  return (
    <RunContext.Provider value={api}>
      <div ref={ref} className={`story-run ${live ? 'is-live' : 'is-rest'}`} data-story-run={id}>
        {live ? (
          <div className="story-carrier" data-story-carrier={id} aria-hidden="true">
            {carrier}
          </div>
        ) : null}
        {children}
      </div>
    </RunContext.Provider>
  );
}

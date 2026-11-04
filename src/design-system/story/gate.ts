// The arrival gate: a page's first motion waits for its assets, for at most a short cap (the induction skill's
// motion-standards reference, § 4.11 and § 5.1: a loader of 1.5 s or less, never blocking first paint). The headline is in
// the HTML from the first frame and is never gated: the gate only stages what arrives after it (elements marked data-gate).
//
// The gate opens at the earliest of: the assets being ready, the cap (maxMs, never more than 1.5 s), and reduced motion
// (nothing waits for a visitor who asked for less motion). It sets html.story-ready (story.css holds the data-gate
// elements until then, and only under motion that is welcome). A repeat visit in the same session skips it, so a visitor
// who has seen the arrival is not made to wait for it again (sessionStorage, inside try/catch: a private window simply
// does not remember).
import { useEffect, useLayoutEffect, useState } from 'react';
import { REDUCED_QUERY } from './chapter';

export interface StoryGateOptions {
  /** The longest the gate holds the arrival, in ms: 1500 at most (the default; a larger value is clamped to it). */
  maxMs?: number;
  /**
   * true when the assets the arrival needs are ready, or a promise that settles when they are (a rejection opens the gate
   * too: a failed asset must not hold the page). A promise that changes on a later render is watched from then on; the
   * cap timer is not restarted by a re-render.
   */
  ready?: boolean | PromiseLike<unknown>;
}

const SEEN_KEY = 'story-gate-seen';
/** The hard cap on the arrival, in ms: the gate never holds longer, whatever the caller asks (motion-standards.md § 4.11). */
const CAP_MS = 1500;

function seenThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false; // no storage (private window, blocked site data, server render): the gate runs
  }
}

function reducedMotion(): boolean {
  try {
    return window.matchMedia(REDUCED_QUERY).matches;
  } catch {
    return false; // no media queries (server render): the gate runs as it would without the check
  }
}

/**
 * Returns true once the gate is open. Until then, html.story-js is set and html.story-ready is not, so the data-gate
 * elements wait; the first call of a session (or a page that never mounts the hook) is the only one that waits.
 */
export function useStoryGate({ maxMs = CAP_MS, ready = false }: StoryGateOptions = {}): boolean {
  const [settled, setSettled] = useState(() => seenThisSession() || reducedMotion());
  const open = settled || ready === true;
  const cap = Number.isFinite(maxMs) ? Math.min(Math.max(maxMs, 0), CAP_MS) : CAP_MS;

  // The timer and the promise only ever set state from a callback, never during the effect itself. The timer starts on
  // mount and depends only on whether the gate is open and on the cap, so a re-render cannot stretch the wait past it.
  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => setSettled(true), cap);
    return () => window.clearTimeout(timer);
  }, [open, cap]);

  // A promise is watched once per identity. One that a later render supersedes no longer opens the gate.
  useEffect(() => {
    if (typeof ready !== 'object' || ready === null) return;
    let current = true;
    const release = () => {
      if (current) setSettled(true);
    };
    ready.then(release, release);
    return () => {
      current = false;
    };
  }, [ready]);

  // A visitor who turns reduced motion on while the gate waits is not made to wait any longer.
  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    const onChange = () => {
      if (query.matches) setSettled(true);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('story-js');
    if (!open) return;
    root.classList.add('story-ready');
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // not remembered: the next page in this session waits again, which is the safe side
    }
  }, [open]);

  return open;
}

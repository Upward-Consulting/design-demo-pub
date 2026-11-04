// Media that plays only while it is in view: a muted video, or any element with a CSS loop (the induction skill's
// motion-standards reference, § 4.9). It plays when at least 15% of it is in view, with a 120 px head start so a
// video is already moving as it arrives; it pauses when it leaves, when the tab is hidden, when the page's ambient
// motion is paused (AmbientPause), and always under reduced motion, where it stays on its first frame (the poster).
//
// Mechanism: the hook marks the element data-visible-loop, and data-in-view while it should run. A CSS loop runs only
// while data-in-view is set (story.css). A video also plays and pauses by its own API. A canvas, WebGL or
// requestAnimationFrame loop cannot be reached by CSS: it reads useAmbientPaused() and stops while that is true.
import { useEffect, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
import { REDUCED_QUERY } from './chapter';
import { AMBIENT_PAUSED, motionStopped } from './pause';

// The pause class is defined in pause.ts (the plain-TypeScript home of the pause rule); re-exported here for the components
// that already import it from this file (AmbientPause).
export { AMBIENT_PAUSED };

/** The share of the element that must be in view before it plays (the induction skill's motion-standards reference, § 4.9). */
const THRESHOLD = 0.15;
/** How far outside the viewport it starts playing, so a video is already moving when it arrives. */
const MARGIN = '120px';

/** Subscribe to the pause class and to reduced motion: the two things that stop an ambient loop. */
export function subscribeAmbient(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  const reduced = window.matchMedia(REDUCED_QUERY);
  reduced.addEventListener('change', onChange);
  return () => {
    observer.disconnect();
    reduced.removeEventListener('change', onChange);
  };
}

const ambientStopped = (): boolean =>
  motionStopped(document.documentElement.classList.contains(AMBIENT_PAUSED), window.matchMedia(REDUCED_QUERY).matches);
const notStopped = (): boolean => false; // the server render: nothing is stopped before the page has run

/**
 * True while ambient motion must stop: the visitor pressed the page's pause control, or reduced motion is on. For a loop
 * that is not CSS or a video (a canvas, WebGL or requestAnimationFrame loop), which story.css cannot reach: read it, stop
 * the loop while it is true, and start it again when it is false.
 */
export function useAmbientPaused(): boolean {
  return useSyncExternalStore(subscribeAmbient, ambientStopped, notStopped);
}

/** A video, forced muted and inline (a looping video is never heard unasked); null for any other element. */
function videoOf(el: HTMLElement): HTMLVideoElement | null {
  if (!(el instanceof HTMLVideoElement)) return null;
  el.muted = true;
  el.playsInline = true;
  return el;
}

/**
 * Plays the element at `ref` only while it is in view. A video is forced muted and inline; a CSS loop is paused by
 * story.css until the hook marks it. Call it once per element; it cleans up on unmount.
 */
export function useVisibleLoop(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const video = videoOf(el);
    el.setAttribute('data-visible-loop', '');
    const reduced = window.matchMedia(REDUCED_QUERY);
    const root = document.documentElement;
    let inView = false;

    const sync = () => {
      const run = inView && !reduced.matches && document.visibilityState === 'visible' && !root.classList.contains(AMBIENT_PAUSED);
      if (run) el.setAttribute('data-in-view', '');
      else el.removeAttribute('data-in-view');
      if (!video) return;
      if (run) {
        void video.play().catch(() => undefined); // a blocked autoplay leaves the poster; nothing else is needed
      } else {
        video.pause();
        if (reduced.matches && video.currentTime > 0) video.currentTime = 0; // the first frame, under reduced motion
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        // The threshold is part of the rule, not only of when the callback fires: a sliver inside the head start,
        // with less than 15% of the element in the (expanded) root, does not count as in view.
        const last = entries[entries.length - 1];
        if (last) inView = last.isIntersecting && last.intersectionRatio >= THRESHOLD;
        sync();
      },
      { threshold: THRESHOLD, rootMargin: MARGIN },
    );
    const mutations = new MutationObserver(sync);
    mutations.observe(root, { attributes: true, attributeFilter: ['class'] });
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    io.observe(el);
    sync();
    return () => {
      io.disconnect();
      mutations.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      el.removeAttribute('data-in-view');
      el.removeAttribute('data-visible-loop');
      video?.pause();
    };
  }, [ref]);
}

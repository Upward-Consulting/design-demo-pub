// The page's motion pause, for loops that CSS cannot reach: a canvas, WebGL or requestAnimationFrame loop (the induction
// skill's motion-standards reference, § 4.9). A CSS loop or a visible video is paused by story.css and useVisibleLoop; a
// script loop reads this and stops while it is true. Two things stop ambient motion: the visitor pressed the page's pause
// control (AmbientPause sets html.story-paused), and reduced motion is on (always, with no control to press).
//
// The rule is one pure function, motionStopped, so it can be tested without a browser. isMotionPaused reads the page now.
// The React hook useAmbientPaused (loop.ts) applies the same rule and re-renders when either input changes.
// No React here: this file is plain TypeScript, so the kit's unit checks can compile it on its own.

/** The html class AmbientPause sets to pause ambient motion. story.css pauses the CSS loops under it. */
export const AMBIENT_PAUSED = 'story-paused';

/** prefers-reduced-motion: reduce. The same query the kit's components and the story check read. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * The rule as a pure function: motion stops when the page's pause class is set or reduced motion is on. A script loop
 * stops while this is true and starts again when it is false.
 */
export function motionStopped(pausedClass: boolean, reducedMotion: boolean): boolean {
  return pausedClass || reducedMotion;
}

/**
 * True while a script loop must stop, read from the page now: html.story-paused, or prefers-reduced-motion. For a loop
 * that checks each frame, or one started by something that is not React. False where there is no page (a server render),
 * because nothing is paused before the page has run. If media queries are unavailable the loop runs, as it would without
 * the check.
 */
export function isMotionPaused(): boolean {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  return motionStopped(document.documentElement.classList.contains(AMBIENT_PAUSED), reducedMotionOn());
}

/** prefers-reduced-motion from the page; false when media queries are unavailable (the loop runs, as without the check). */
function reducedMotionOn(): boolean {
  try {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  } catch {
    return false;
  }
}

// The pause control for ambient motion: a loop that runs with no scroll and no visitor action (data-ambient). Every page
// with ambient life has one (the induction skill's motion-standards reference, § 4.9: WCAG 2.2.2). The button is a real
// <button> with aria-pressed; pressing it toggles html.story-paused, and story.css pauses every [data-ambient] under that
// class (and under reduced motion, always). Visible loops (useVisibleLoop) and any loop that reads useAmbientPaused read
// the same class.
//
// The pressed state is read from the page's class, not kept in this component, so two controls on one page agree. The
// label does not change when pressed: aria-pressed carries the state, and story.css fills the button while it is pressed.
import { useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import { AMBIENT_PAUSED, subscribeAmbient } from './loop';

export interface AmbientPauseProps {
  /** The visible label and accessible name (default 'Pause motion'). It stays the same when pressed: aria-pressed says the state. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const isPaused = (): boolean => document.documentElement.classList.contains(AMBIENT_PAUSED);
const notPaused = (): boolean => false; // the server render: nothing is paused before the page has run

export function AmbientPause({ label = 'Pause motion', className, style }: AmbientPauseProps) {
  const paused = useSyncExternalStore(subscribeAmbient, isPaused, notPaused);
  return (
    <button
      type="button"
      aria-pressed={paused}
      data-story-pause=""
      className={className}
      style={style}
      onClick={() => {
        document.documentElement.classList.toggle(AMBIENT_PAUSED);
      }}
    >
      {label}
    </button>
  );
}

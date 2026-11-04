// Home's one story opener: a lock chapter on the story kit, held for one screen. Everything here is a function of p: a
// paused GSAP timeline is seeked with tl.progress(p). Nothing moves on a clock. The h1 and the primary action stand still
// from p = 0. The five statements of home.opener replace one another in one slot (each masked up from behind its line),
// the cut-out that belongs to a statement tilts in with it, and the payoff lands last; then the stage rests (rests and
// textStill in story.json). Under reduced motion, on the phone plan, and when the text does not fit one screen, the chapter
// shows its finished composition: the payoff (the timeline's last state), with the h1 and the action as always.
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { StoryChapter } from '../../../story/StoryChapter';
import { useChapterProgress } from '../../../story/chapter';
import { home, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import story from '../story.json';
import { Btn, Img } from '../parts/primitives';

const found = story.chapters.find((c) => c.id === 'opener');
if (!found) throw new Error('story.json has no chapter "opener"');
const chapter: NonNullable<typeof found> = found;

// The cut-out that belongs to each of the first three statements (the cut-outs replace one another in one slot too).
const CUTS: Array<{ pic: Pic; tilt: number }> = [
  { pic: pictures.cutRockwool, tilt: -4 },
  { pic: pictures.cutFoamglas, tilt: 5 },
  { pic: pictures.cutRubber, tilt: -3 },
];

// The deck's h1, split once at its second line (the break is the copy's, not a typed string).
const h1 = home.hero.h1;
const breakAt = h1.indexOf('heavy');
const h1Lines = breakAt > 0 ? [h1.slice(0, breakAt).trim(), h1.slice(breakAt).trim()] : [h1];

function OpenerBody({ href }: { href: (p: string) => string }) {
  const stmEls = useRef<Array<HTMLParagraphElement | null>>([]);
  const payoffEl = useRef<HTMLParagraphElement | null>(null);
  const cutEls = useRef<Array<HTMLDivElement | null>>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Kill the paused timeline on unmount (StrictMode mounts twice; the progress callback rebuilds it lazily).
  useLayoutEffect(() => {
    return () => {
      timeline.current?.kill();
      timeline.current = null;
    };
  }, []);

  useChapterProgress((p) => {
    if (!timeline.current) {
      const w = chapter.statementWindows;
      const payoffAt = chapter.payoffWindow;
      const t = gsap.timeline({ paused: true });
      const statements = home.opener.statements;

      statements.forEach((_, i) => {
        const el = stmEls.current[i];
        if (!el) return;
        const at = w[i] ?? 0;
        if (i === 0) {
          // the first statement is on the first screen at p = 0
          t.set(el, { yPercent: 0, opacity: 1, visibility: 'visible' }, 0);
        } else {
          t.fromTo(el, { yPercent: 100, opacity: 0, visibility: 'hidden' }, { yPercent: 0, opacity: 1, visibility: 'visible', duration: 0.05, ease: 'none' }, at);
        }
        // it leaves when the next statement (or the payoff) takes the slot
        const leaves = w[i + 1] ?? payoffAt;
        t.set(el, { opacity: 0, visibility: 'hidden' }, leaves);
      });

      CUTS.forEach((c, i) => {
        const el = cutEls.current[i];
        if (!el) return;
        const at = w[i] ?? 0;
        if (i === 0) {
          t.set(el, { opacity: 1, yPercent: 0, rotation: c.tilt, visibility: 'visible' }, 0);
        } else {
          t.fromTo(el, { opacity: 0, yPercent: 6, rotation: c.tilt - 6, visibility: 'hidden' }, { opacity: 1, yPercent: 0, rotation: c.tilt, visibility: 'visible', duration: 0.05, ease: 'none' }, at);
        }
        const leaves = w[i + 1] ?? payoffAt;
        t.set(el, { opacity: 0, visibility: 'hidden' }, leaves);
      });

      if (payoffEl.current) {
        t.fromTo(payoffEl.current, { yPercent: 100, opacity: 0, visibility: 'hidden' }, { yPercent: 0, opacity: 1, visibility: 'visible', duration: 0.05, ease: 'none' }, payoffAt);
      }
      // pin the timeline's end to p = 1
      t.to({}, { duration: 0 }, 1);
      timeline.current = t;
    }
    timeline.current.progress(p);
  });

  return (
    <div className="b-opener">
      <h1 className="b-opener__h1">
        {h1Lines.map((line, i) => (
          <span key={line} className="b-opener__line">
            {line}
            {i < h1Lines.length - 1 ? ' ' : null}
          </span>
        ))}
      </h1>

      <div className="b-opener__act">
        <Btn href={href('contact')}>{site.cta}</Btn>
        <a className="b-opener__phone" href={site.phoneHref}>
          {home.hero.ctaNote}
        </a>
      </div>

      <div className="b-opener__media">
        <Img pic={pictures.crewRoof} eager className="b-opener__photo" />
        {CUTS.map((c, i) => (
          <div
            key={c.pic.id}
            className="b-opener__cut"
            ref={(el) => {
              cutEls.current[i] = el;
            }}
          >
            <Img pic={c.pic} alt="" />
          </div>
        ))}
      </div>

      <div className="b-opener__slot">
        {home.opener.statements.map((s, i) => (
          <p
            key={s}
            className="b-opener__stm"
            ref={(el) => {
              stmEls.current[i] = el;
            }}
          >
            {s}
          </p>
        ))}
        <p
          className="b-opener__stm b-opener__stm--payoff"
          ref={(el) => {
            payoffEl.current = el;
          }}
        >
          {home.opener.payoff}
        </p>
      </div>
    </div>
  );
}

export function Opener({ href }: { href: (p: string) => string }) {
  return (
    <StoryChapter
      id={chapter.id}
      label={chapter.label}
      model="lock"
      hold={chapter.hold}
      phone="rest"
      restAt={chapter.restAt}
      weight={story.smoothing.weight}
      rests={chapter.rests as unknown as ReadonlyArray<readonly [number, number]>}
      textStill={chapter.textStill as unknown as readonly [number, number]}
    >
      <OpenerBody href={href} />
    </StoryChapter>
  );
}

// Home's one story opener: a lock chapter on the story kit, held for one screen. The h1 and the primary action are
// readable at p = 0. As p runs, a paused GSAP timeline lands the five statements from home.opener one after another,
// then the payoff. Each statement lands by the start of its reading window and then stays still. On a phone, under
// reduced motion and when the words do not fit one screen at 200% text, the chapter shows its finished composition.
import { useRef } from 'react';
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

// The motion reads the chapter's progress, so it lives in a child rendered inside StoryChapter (the hook needs the
// chapter's context; called outside it, the hook only reports the finished state).
function OpenerBody({ href }: { href: (p: string) => string }) {
  const statementEls = useRef<Array<HTMLParagraphElement | null>>([]);
  const payoffEl = useRef<HTMLParagraphElement | null>(null);
  const cutEls = useRef<Array<HTMLDivElement | null>>([]);
  const photoEl = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useChapterProgress((p) => {
    if (!timeline.current) {
      // One unit of progress, built once: each statement lands at its window and holds; the last zero-length tween
      // pins the timeline's end to p = 1.
      const t = gsap.timeline({ paused: true });
      home.opener.statements.forEach((_, i) => {
        const el = statementEls.current[i];
        const at = chapter.statementWindows[i] ?? 0;
        const cut = cutEls.current[i];
        const tilt = cutTilts[i] ?? 0;
        // the first statement and its cut-out are already in place at p 0: the opener says what it is on the first screen
        if (i === 0) {
          if (el) t.set(el, { opacity: 1, y: 0 }, 0);
          if (cut) t.set(cut, { opacity: 1, y: 0, rotation: tilt }, 0);
          return;
        }
        if (el) t.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.02, ease: 'none' }, at);
        if (cut) t.fromTo(cut, { opacity: 0, y: 8, rotation: tilt - 3 }, { opacity: 1, y: 0, rotation: tilt, duration: 0.03, ease: 'none' }, at);
      });
      if (payoffEl.current) {
        t.fromTo(payoffEl.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.02, ease: 'none' }, chapter.payoffWindow);
      }
      // the photograph rises into its place over the first quarter of the hold, then stands still
      if (photoEl.current) t.fromTo(photoEl.current, { yPercent: 7.5, rotation: 10 }, { yPercent: 0, rotation: 4, duration: 0.25, ease: 'none' }, 0);
      t.to({}, { duration: 0 }, 1);
      timeline.current = t;
    }
    timeline.current.progress(p);
  });

  return (
    <div className="b-opener">
      <h1 className="b-opener__h1">
        <span className="b-mask">
          <span className="b-mask__line">Insulation for</span>
        </span>{' '}
        <span className="b-mask">
          <span className="b-mask__line b-mask__line--2">heavy industry.</span>
        </span>
      </h1>

      <div className="b-opener__after">
        <Btn href={href('contact')}>{site.cta}</Btn>
        <a className="b-opener__phone" href={site.phoneHref}>
          {home.hero.ctaNote}
        </a>
      </div>

      <div
        className="b-opener__photo"
        data-move=""
        ref={(el) => {
          photoEl.current = el;
        }}
      >
        <Img pic={pictures.crewRoof} eager />
      </div>

      {cutOuts.map((c, i) => (
        <div
          key={c.id}
          data-move=""
          className={`b-opener__cut b-opener__cut--${i + 1}`}
          ref={(el) => {
            cutEls.current[i] = el;
          }}
        >
          <Img pic={c.pic} eager />
        </div>
      ))}

      <div className="b-opener__statements">
        {home.opener.statements.map((s, i) => (
          <p
            key={s}
            data-move=""
            className="b-opener__statement"
            ref={(el) => {
              statementEls.current[i] = el;
            }}
          >
            {s}
          </p>
        ))}
        <p
          data-move=""
          className="b-opener__payoff"
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

const cutOuts: Array<{ id: string; pic: Pic }> = [
  { id: 'cut-temperature', pic: pictures.cutRockwool },
  { id: 'cut-cold', pic: pictures.cutFoamglas },
  { id: 'cut-noise', pic: pictures.cutRubber },
];
const cutTilts = [-5, 4, -3];

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

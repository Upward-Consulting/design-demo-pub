// Home's one story opener: a lock chapter on the story kit, held for one screen. The stage carries four words of text (the
// h1) and the primary action; everything else on it is pictures. Everything here is a function of p: a paused GSAP timeline
// is seeked with tl.progress(p). Nothing moves on a clock. The h1 and the action stand still from p = 0 and never move. As p
// runs, the crew photograph rises (7.5% of its height) and settles its tilt, and five stickers land on its collage one per
// job, in order: temperature, cold, noise, fire, corrosion. Under reduced motion, on the phone plan, and when the text does
// not fit one screen, the chapter shows its finished composition (p = 1: every sticker in place). The five statements are
// not on this stage: they follow it as ordinary poster fields (pages/Statements.tsx).
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { StoryChapter } from '../../../story/StoryChapter';
import { useChapterProgress } from '../../../story/chapter';
import { home, site } from '../../../content/demo-copy';
import { pictures } from '../../../assets/own/pictures';
import type { Pic } from '../../../assets/own/pictures';
import story from '../story.json';
import { Btn } from '../parts/primitives';

// A sticker's file is requested only when its arrival is near (LOAD_LEAD of progress before it starts), so the first screen
// carries the photograph alone on a desktop. At rest (the phone plan, reduced motion, still=1) p = 1 and every file loads.
const LOAD_LEAD = 0.04;

const found = story.chapters.find((c) => c.id === 'opener');
if (!found) throw new Error('story.json has no chapter "opener"');
const chapter: NonNullable<typeof found> = found;

// The stickers, in the order of their jobs. The timing (from, to, tilt) is in story.json; the place on the collage is layout,
// set in percent of the photograph's own box (never fixed pixels), so the collage holds at every width.
type Sticker = { pic: Pic; x: number; y: number; w: number; picture: 'cut' | 'tile' };
const STICKERS: Sticker[] = [
  { pic: pictures.cutRockwool, x: -10, y: 62, w: 40, picture: 'cut' }, // temperature
  { pic: pictures.cutFoamglas, x: 64, y: 2, w: 44, picture: 'cut' }, // cold
  { pic: pictures.acousticFoamSmall, x: -4, y: 6, w: 30, picture: 'tile' }, // noise (640 px file: shows at 400 px or less)
  { pic: pictures.pyrogelCutSmall, x: 72, y: 56, w: 30, picture: 'tile' }, // fire (640 px file)
  { pic: pictures.rustedFlange, x: 24, y: 84, w: 46, picture: 'tile' }, // corrosion
];

// The deck's h1, split once at its second line (the break is the copy's, not a typed string).
const h1 = home.hero.h1;
const breakAt = h1.indexOf('heavy');
const h1Lines = breakAt > 0 ? [h1.slice(0, breakAt).trim(), h1.slice(breakAt).trim()] : [h1];

if (chapter.stickers.length !== STICKERS.length) throw new Error('story.json stickers must match the sticker list');

function OpenerBody({ href }: { href: (p: string) => string }) {
  const frameEl = useRef<HTMLDivElement | null>(null);
  const photoEl = useRef<HTMLImageElement | null>(null);
  const stickerEls = useRef<Array<HTMLDivElement | null>>([]);
  const stickerImgs = useRef<Array<HTMLImageElement | null>>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const lastP = useRef(0);
  const loadFrame = useRef(0);

  // Kill the paused timeline and any pending sticker load on unmount (StrictMode mounts twice; the progress callback rebuilds
  // the timeline lazily).
  useLayoutEffect(() => {
    return () => {
      timeline.current?.kill();
      timeline.current = null;
      if (loadFrame.current) cancelAnimationFrame(loadFrame.current);
      loadFrame.current = 0;
    };
  }, []);

  // Sticker files are set on the next frame from the latest progress, so the first subscription (p = restAt) cannot load them
  // before the live progress arrives.
  const loadStickers = () => {
    loadFrame.current = 0;
    const p = lastP.current;
    chapter.stickers.forEach((s, i) => {
      const img = stickerImgs.current[i];
      const pic = STICKERS[i]?.pic;
      if (img && pic && !img.getAttribute('src') && p >= s.from - LOAD_LEAD) img.src = pic.src;
    });
  };

  useChapterProgress((p) => {
    if (!timeline.current) {
      const t = gsap.timeline({ paused: true });
      const ph = chapter.photo;

      // The crew photograph rises by its own rise share (about 7.5% of its height) and settles its tilt.
      if (frameEl.current) t.fromTo(frameEl.current, { yPercent: ph.rise }, { yPercent: 0, duration: ph.to - ph.from, ease: 'none' }, ph.from);
      if (photoEl.current) t.fromTo(photoEl.current, { rotation: ph.tiltFrom }, { rotation: ph.tiltTo, duration: ph.to - ph.from, ease: 'none' }, ph.from);

      // Five stickers, one after another. Each lands from below and settles its tilt (the picture turns, the text never does).
      chapter.stickers.forEach((s, i) => {
        const wrap = stickerEls.current[i];
        const img = stickerImgs.current[i];
        if (!wrap || !img) return;
        const dur = s.to - s.from;
        // A sticker with no arrival (from = to = 0) is on the collage at p = 0: placed, never moving.
        if (dur <= 0) {
          t.set(wrap, { autoAlpha: 1, yPercent: 0 }, 0);
          t.set(img, { rotation: s.tilt }, 0);
          return;
        }
        t.set(wrap, { autoAlpha: 0, yPercent: chapter.stickerRise }, 0);
        t.set(img, { rotation: s.tilt + 5 }, 0);
        t.to(wrap, { autoAlpha: 1, yPercent: 0, duration: dur, ease: 'power2.out' }, s.from);
        t.to(img, { rotation: s.tilt, duration: dur, ease: 'power2.out' }, s.from);
      });

      // pin the timeline's end to p = 1
      t.to({}, { duration: 0 }, 1);
      timeline.current = t;
    }
    timeline.current.progress(p);
    lastP.current = p;
    if (!loadFrame.current) loadFrame.current = requestAnimationFrame(loadStickers);
  });

  // The stage photograph: the 640 px file at 599 px and below (the phone plan), the 1100 px file above.
  const crew = pictures.crewRoofSmall;
  const crewPhone = pictures.crewRoofPhone;
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
        <div className="b-opener__frame" data-move="" ref={frameEl}>
          <picture>
            <source media="(max-width: 599px)" srcSet={crewPhone.src} />
            <img
              ref={photoEl}
              className="b-opener__photo"
              data-move=""
              src={crew.src}
              width={crew.w}
              height={crew.h}
              alt={crew.alt}
              data-provenance="own"
              loading="eager"
              decoding="async"
            />
          </picture>
          {STICKERS.map((s, i) => (
            <div
              key={s.pic.id}
              className={`b-opener__cut b-opener__cut--${s.picture}`}
              data-move=""
              data-job={chapter.stickers[i]?.job}
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%` }}
              ref={(el) => {
                stickerEls.current[i] = el;
              }}
            >
              <img
                className="b-opener__cutimg"
                data-move=""
                width={s.pic.w}
                height={s.pic.h}
                alt={s.pic.alt}
                data-provenance="own"
                loading="lazy"
                decoding="async"
                ref={(el) => {
                  stickerImgs.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>
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

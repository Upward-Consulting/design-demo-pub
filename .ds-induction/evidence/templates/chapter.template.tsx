// Copy to src/design-system/board/S<nn>/<letter>.tsx for a story family's slot (the induction skill's story-mode
// reference, § 6). One variant renders the whole story: its chapters in order, their props from the family's
// story.json.
import { useRef } from 'react';
import { StoryChapter } from '../../story/StoryChapter';
import { useChapterProgress } from '../../story/chapter';
import { ease, interpolate } from '../../story/timeline';
import { windowOpen } from '../../story/motion';
import story from '../../story/<family>/story.json';
import '../../story/story.css';

const chapter = (id: string) => {
  const c = story.chapters.find((x) => x.id === id);
  if (!c) throw new Error(`story.json has no chapter "${id}"`);
  return c;
};

/** An opening window: the inset picture opens to full bleed; the title is readable at p = 0 and never moves. */
function Opener() {
  const frame = useRef<HTMLDivElement>(null);
  const picture = useRef<HTMLImageElement>(null);
  useChapterProgress((p) => {
    if (frame.current) frame.current.style.clipPath = windowOpen(p);
    if (picture.current) picture.current.style.transform = `scale(${interpolate(p, [0.15, 0.75], [1.08, 1], { easing: ease.arrive }).toFixed(4)})`;
  });
  return (
    <div className="story-opener">
      <div ref={frame} data-move="" className="story-opener__frame">
        {/* Until the image worker delivers: a labelled placeholder at the slot's ratio, never an <img>. */}
        <div data-placeholder="opener-plate" className="story-opener__placeholder">opener-plate · 16:9 · quiet zone lower left</div>
        {/* When the file is delivered, replace the placeholder with:
            <img ref={picture} data-move="" data-provenance="generated" src={plate} alt="<from the manifest>" /> */}
      </div>
      <h1 className="story-opener__title">[Title from the content file]</h1>
    </div>
  );
}

export default function Variant() {
  const opener = chapter('opener');
  return (
    <>
      <StoryChapter
        id={opener.id}
        label="[Accessible name of the chapter]"
        model={opener.model as 'lock' | 'sync'}
        hold={opener.hold}
        phone={opener.phone as 'live' | 'rest'}
        restAt={opener.restAt}
        weight={story.smoothing.weight}
        rests={opener.rests as Array<[number, number]>}
        textStill={opener.textStill as [number, number]}
      >
        <Opener />
      </StoryChapter>
      {/* …the other chapters, in story.json order */}
    </>
  );
}

Variant.meta = { name: '<storyline name>', does: '<the arc in one line>', note: 'storyline <n> of 3; pictures: placeholders' };

// The five blunt statements, moved out of the held stage (B2): ordinary section content after the opener, one line per flat
// colour field, stacked, with the payoff as the last field. Each line is a line mask that rises from behind its own edge when
// the field reaches 88% of the screen (the root's reveal observer, 700 ms, 70 ms stagger). Reduced motion and the finished
// view (still=1) show the fields at once: the reveal layer is not armed there. Colours never repeat on two neighbouring fields.
import { home } from '../../../content/demo-copy';
import { Rv } from '../parts/primitives';

type Tone = 'ink' | 'paper' | 'cyan' | 'pink' | 'orange';

// One row per statement, then the payoff. Size in vw (7 to 9 vw, the display face, lowercase as the rest of the page).
const FIELDS: Array<{ tone: Tone; size: string }> = [
  { tone: 'ink', size: '9vw' },
  { tone: 'paper', size: '9vw' },
  { tone: 'cyan', size: '7vw' },
  { tone: 'pink', size: '8.6vw' },
  { tone: 'orange', size: '9vw' },
  { tone: 'ink', size: '7vw' }, // the payoff
];

// A visually hidden heading for the block (the page's sections each carry one).
const HEADING = 'The five problems insulation solves.';

export function Statements() {
  const lines = [...home.opener.statements, home.opener.payoff];
  return (
    <section className="b-stms" aria-labelledby="stms-h">
      <h2 id="stms-h" className="b-sr">
        {HEADING}
      </h2>
      <ol className="b-stms__list">
        {lines.map((s, i) => {
          const f = FIELDS[i] ?? { tone: 'ink' as Tone, size: '9vw' };
          const payoff = i === lines.length - 1;
          return (
            <Rv
              key={s}
              as="li"
              index={i}
              className={`b-stm b-stm--${f.tone}${payoff ? ' b-stm--payoff' : ''}${i % 2 === 1 ? ' b-stm--flip' : ''}`}
              style={{ ['--fs' as string]: f.size }}
            >
              <p className="b-stm__line b-mask">
                <span className="b-mask__in">{s}</span>
              </p>
            </Rv>
          );
        })}
      </ol>
    </section>
  );
}

// Demo B: full-page evidence screenshots at 1440 and 390 (scrolled through first so reveals and lazy images show).
import { Browser } from '/home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/lib/cdp.mjs';
const EV = '/home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/evidence/demos/B';
const scrollAll = async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(1100);
  const H = document.documentElement.scrollHeight;
  for (let y = 0; y < H; y += 450) { window.scrollTo(0, y); await sleep(70); }
  window.scrollTo(0, document.documentElement.scrollHeight); await sleep(350);
  window.scrollTo(0, 0); await sleep(350);
  const t0 = Date.now();
  while ([...document.images].some((i) => !i.complete) && Date.now() - t0 < 8000) await sleep(100);
  return { h: document.documentElement.scrollHeight, bad: [...document.images].filter((i) => i.naturalWidth === 0).length };
};
const browser = await Browser.launch();
const out = [];
for (const pg of ['home', 'products', 'corrosion', 'contact']) {
  for (const w of [1440, 390]) {
    const p = await browser.newPage({ width: w, height: w === 1440 ? 900 : 844, mobile: w < 600 });
    await p.goto(`http://127.0.0.1:5201/ds.html?view=demo&d=B&page=${pg}`, { settleMs: 1200 });
    const r = await p.eval(scrollAll);
    await p.screenshot({ path: `${EV}/${pg}-${w}.png`, format: 'png', fullPage: true });
    out.push(`${pg} ${w}: height ${r.h}, images not loaded ${r.bad}`);
    await p.send('Target.closeTarget', { targetId: p.targetId }).catch(() => {});
  }
}
console.log(out.join('\n'));
await browser.close();

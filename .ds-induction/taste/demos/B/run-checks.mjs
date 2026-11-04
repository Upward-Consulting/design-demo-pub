// Demo B: craft lint and font audit at 1440 and 390 on each page, through the taste toolkit's Chrome client (no snippet
// text enters an agent's context). Writes lint-<page>-<width>.json and fa-<page>-<width>.json beside this file.
import { Browser } from '/home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/taste/scripts/lib/cdp.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const SKILL = '/home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction';
const HERE = '/home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/demos/B';
const lint = readFileSync(`${SKILL}/snippets/craft-lint.js`, 'utf8');
const fa = readFileSync(`${HERE}/font-audit.js`, 'utf8');
const pages = (process.argv[2] || 'home,products,corrosion,contact').split(',');
const widths = [1440, 390];
const browser = await Browser.launch();
const summary = [];
for (const pg of pages) {
  for (const w of widths) {
    const h = w === 1440 ? 900 : 844;
    const p = await browser.newPage({ width: w, height: h, dsf: 1, mobile: w < 600 });
    await p.goto(`http://127.0.0.1:5201/ds.html?view=demo&d=B&page=${pg}`, { settleMs: 2500 });
    await p.eval('document.fonts.ready.then(() => true)');
    await p.eval('new Promise((r) => setTimeout(r, 900))');
    const res = await p.eval(`(${lint})()`);
    const faRes = await p.eval(`(${fa})()`);
    writeFileSync(`${HERE}/lint-${pg}-${w}.json`, JSON.stringify(res, null, 1));
    writeFileSync(`${HERE}/fa-${pg}-${w}.json`, JSON.stringify(faRes, null, 1));
    const counts = res && res.counts ? Object.entries(res.counts).filter(([, v]) => v).map(([k, v]) => `${k}:${v}`).join(' ') : '';
    summary.push(`${pg} ${w}: lint=${res && res.status} [${counts}] | font outside=${faRes && faRes.outsideCount} notLoaded=${faRes && faRes.notLoaded} ok=${faRes && faRes.ok}`);
    await p.send('Target.closeTarget', { targetId: p.targetId }).catch(() => {});
  }
}
console.log(summary.join('\n'));
await browser.close();

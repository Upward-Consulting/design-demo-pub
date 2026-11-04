async (page) => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('/home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/demos/B/font-audit.js', 'utf8');
  const res = await page.evaluate(src);
  fs.writeFileSync('/home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/demos/B/fa-last.json', JSON.stringify(res, null, 1));
  return { ok: res && res.ok, outsideCount: res && res.outsideCount, notLoaded: res && res.notLoaded, families: res && res.families };
}

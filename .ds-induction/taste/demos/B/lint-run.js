async (page) => {
  const fs = await import('node:fs');
  const src = fs.readFileSync('/home/james/Desktop/Workspace/design-systems/.claude/skills/react-design-system-induction/snippets/craft-lint.js', 'utf8');
  const res = await page.evaluate(src);
  fs.writeFileSync('/home/james/Desktop/Workspace/design-systems/bellis-new/design-v5/.ds-induction/taste/demos/B/lint-last.json', JSON.stringify(res, null, 1));
  return { status: res && res.status, counts: res && res.counts, n: res && res.findings ? res.findings.length : null };
}

/* Font audit: every visible text element must render in the brand family (browser_evaluate function: one arrow function).
 *
 *   1. edit BRAND on the first line of the body (a RegExp tested against the FIRST family name of the computed font-family)
 *   2. browser_evaluate  function: <this file>       at each viewport you check (after snippets/prep.run.js)
 *
 * Why: a label outside its type class inherits whatever its parent sets; <button>, <input> and <select> do not inherit
 * font-family unless the reset says so; a portal renders at the end of <body>, outside the themed root; @fontsource ships
 * only the weights that were imported, and a missing weight is synthesised. Nothing in the build log says so: only a
 * computed-style scan of the rendered page finds them. Workbench furniture ([data-ds-furniture]) is skipped.
 *
 * Returns { brand, textElements, families, outsideCount, outside[], notLoaded, loadedFaces[], ok }
 *   families      { "<first family>": { count, weights[] } } for all audited text elements
 *   outside[]     every audited element whose first family does not match BRAND (and is not an icon font), capped at LIMIT:
 *                 { tag, text, family, stack, fs, fw, container (the nearest marker: data-ds, id, data-testid or landmark), top }
 *   notLoaded     brand-matching elements whose declared face is not loaded (fallback glyphs would be drawn)
 *   loadedFaces   "<family> <weight> <style>" of the faces that are loaded
 *   ok            outsideCount === 0 && notLoaded === 0
 * Visible = has a layout box and is not visibility:hidden. Closed accordion panels, inactive tabs and a closed mobile menu
 * have no box: open them first, or set INCLUDE_HIDDEN to true, or the audit says nothing about them.
 */
() => {
  const BRAND = /^(Young Serif|Source Serif 4)$/i;                                  // EDIT: the brand family, e.g. /^(Manrope|Playfair Display)$/i
  const ICON = /awesome|eicons|dashicons|material (icons|symbols)|icomoon/i;   // icon fonts are not text faces
  const INCLUDE_HIDDEN = false;                                // true: audit elements without a box too
  const LIMIT = 100;
  const SKIP = /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|HEAD|TITLE|META|LINK)$/;
  const SKIP_SEL = '[data-ds-furniture], vite-error-overlay';   // subtrees that are not the app (workbench furniture)
  const marker = (el) => { const m = el.closest('[data-ds],[id],[data-testid],main,header,footer,nav,aside,section'); return !m ? null : m.dataset.ds ? m.dataset.ds : m.id ? '#' + m.id : m.dataset.testid ? '[data-testid=' + m.dataset.testid + ']' : m.tagName.toLowerCase(); };
  const first = (ff) => ff.split(',')[0].trim().replace(/^["']|["']$/g, '');
  const seen = new Set(), families = {}, outside = [];
  let textElements = 0, outsideCount = 0, notLoaded = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    if (!el || seen.has(el) || SKIP.test(el.tagName) || !n.nodeValue.trim() || el.closest(SKIP_SEL)) continue;
    seen.add(el);
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const visible = el.getClientRects().length > 0 && r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
    if (!visible && !INCLUDE_HIDDEN) continue;
    textElements++;
    const fam = first(cs.fontFamily);
    const f = (families[fam] = families[fam] || { count: 0, weights: [] });
    f.count++;
    if (!f.weights.includes(cs.fontWeight)) f.weights.push(cs.fontWeight);
    if (BRAND.test(fam)) {
      if (!document.fonts.check(`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} "${fam}"`)) notLoaded++;
      continue;
    }
    if (ICON.test(fam)) continue;
    outsideCount++;
    if (outside.length < LIMIT) {
      outside.push({
        tag: el.tagName.toLowerCase(), text: n.nodeValue.trim().replace(/\s+/g, ' ').slice(0, 40), family: fam,
        stack: cs.fontFamily.slice(0, 80), fs: cs.fontSize, fw: cs.fontWeight, container: marker(el),
        top: Math.round(r.top + scrollY),
      });
    }
  }
  Object.values(families).forEach((f) => f.weights.sort());
  const loadedFaces = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`))].sort();
  return { brand: String(BRAND), textElements, families, outsideCount, outside, notLoaded, loadedFaces, ok: outsideCount === 0 && notLoaded === 0 };
}

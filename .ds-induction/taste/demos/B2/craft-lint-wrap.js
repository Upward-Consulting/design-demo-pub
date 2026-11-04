async (page) => {
  const fn = /* Craft lint: box-fit and spacing faults that a diff against a target cannot see (browser_evaluate function: one arrow function).
 *
 *   browser_evaluate  function: <this file>       at each viewport (after snippets/prep.run.js; nothing hovered, nothing moving)
 *
 * Why: Phase 8 finds where a build differs from its golden route or reference. On the Candidate Board and in Compose there is
 * no target, and a section that matches its slice at 1440 can still break at 390. These faults are cheap to find by geometry and
 * slow to find by eye. The rules behind each check: references/craft-rules.md. Adapted from the layout and film checks of
 * stageshow (github.com/benjitaylor/skills, MIT licence).
 *
 * Returns { status, checked{}, counts{}, findings[], deferred[], smallest, manual[] }
 *   status    'issues' | 'no-issues-detected' | 'inconclusive' (nothing was checked, or geometry was still moving: let it settle
 *             and run again). 'no-issues-detected' is not approval: the lint knows boxes, not optical centring or hierarchy.
 *   findings  [{ rule, el, text, container, top, msg, also[] }], capped at LIMIT; container = the nearest marker (data-ds,
 *             id, data-testid or landmark), top = px from the page top, also = containers with the identical fault (one
 *             component or class, many uses).
 *             counts{} has the uncapped number per rule.
 *   smallest  the smallest rendered text { px, el, text }
 * Each finding is a candidate: look at it, then fix it or write down why it stands. Never clear one by hiding the element.
 *   control-fit    a button or link-button whose line box, padding and border need more height than it has
 *   control-inset  a control whose content sits against one edge (about 0 padding) with real padding on the other
 *   bottom-inset   a padded container whose last child runs into its bottom padding (a fixed height or grid row too small)
 *   overflow       text running past its own box (a long word or a fixed width at a narrow viewport)
 *   spills         a control running 3 px or more past the parent it was laid out in
 *   touching       text within 5 px of a neighbouring box on the same line, with no gap set
 *   near-tangent   two separate painted boxes whose parallel edges are 1 to 3 px apart (align them, or part them by 8 px+)
 *   corner         a box flush in a rounded parent's corner: its square corner pokes past the round one, or two radii clip
 *   stat-wrap      a short display string with a digit (a number and its unit) broken over two lines
 *   squeezed       a small fixed box (icon, well, chip, badge) shrunk by its flex row: give it flex-shrink: 0
 *   mixed-icons    filled and outline glyphs in one group of three or more
 *   clipped-glyph  an svg drawing past its own viewBox
 *   emoji-icon     an emoji in an icon's seat beside words
 *   small-text     text rendered under MIN_TEXT px
 */
() => {
  const ROOT = 'main, #root, #ds-root, #__next';   // EDIT: what to lint (every outermost match), e.g. '[data-ds="variant S-14 C"]'
  const SKIP = '[data-ds-furniture], vite-error-overlay'; // EDIT: subtrees to leave out (workbench furniture is skipped by default)
  const MIN_TEXT = 12;                             // px; captions under it are findings too, decide per site
  const LIMIT = 80;

  const marker = (el) => { const m = el.closest('[data-ds],[id],[data-testid],main,header,footer,nav,aside,section'); return !m ? null : m.dataset.ds ? m.dataset.ds : m.id ? '#' + m.id : m.dataset.testid ? '[data-testid=' + m.dataset.testid + ']' : m.tagName.toLowerCase(); };
  const px = (v) => parseFloat(v) || 0, r1 = (v) => Math.round(v * 10) / 10;
  const cache = new Map(), cs = (el) => { let s = cache.get(el); if (!s) cache.set(el, (s = getComputedStyle(el))); return s; };
  const name = (el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
  const textOf = (el) => (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
  const findings = [], counts = {}, deferred = [], manual = [];
  const checked = { controls: 0, containers: 0, texts: 0, surfaces: 0, svgs: 0 };
  const add = (rule, el, msg) => {
    counts[rule] = (counts[rule] || 0) + 1;
    const container = marker(el), same = findings.find((f) => f.rule === rule && f.msg === msg);
    if (same) { same.also.push(container); return; }   // one line per repeated fault (eleven buttons built from one class)
    if (findings.length < LIMIT) findings.push({ rule, el: name(el), text: textOf(el), container, top: Math.round(el.getBoundingClientRect().top + scrollY), msg, also: [] });
  };

  let roots = [...document.querySelectorAll(ROOT)];
  roots = roots.filter((d) => !roots.some((o) => o !== d && o.contains(d)));
  const els = roots.flatMap((r) => [r, ...r.querySelectorAll('*')])
    .filter((el) => !(el instanceof SVGElement && !(el instanceof SVGSVGElement)) && !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|BR)$/.test(el.tagName) && !el.closest(SKIP));

  // Geometry still moving (a transition or animation on the box or an ancestor) is not judged. Infinite loops (a marquee,
  // a spinner) are skipped and named; finite ones make the run inconclusive.
  const GEO = /^(transform|translate|rotate|scale|width|height|top|left|right|bottom|margin|padding|gap|inset|max|min|flex|grid)/i;
  const movers = [];
  for (const a of document.getAnimations()) {
    const t = a.effect && a.effect.target;
    if (a.playState !== 'running' || !(t instanceof Element) || !a.effect.getKeyframes().some((k) => Object.keys(k).some((p) => GEO.test(p)))) continue;
    movers.push(t);
    (a.effect.getComputedTiming().iterations === Infinity ? manual : deferred).push(`${name(t)}: ${a.effect.getComputedTiming().iterations === Infinity ? 'runs an infinite animation, not linted' : 'was moving; run again when it settles'}`);
  }
  const moving = (el) => movers.some((t) => t === el || t.contains(el));

  const veiledMap = new Map();
  const veiled = (el) => {
    if (!el || el === document.documentElement) return false;
    if (veiledMap.has(el)) return veiledMap.get(el);
    const s = cs(el), v = s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.05 || veiled(el.parentElement);
    veiledMap.set(el, v);
    return v;
  };
  // checkVisibility also hides the content of a closed <details> (a native accordion), which keeps a layout box.
  const shown = (el) => { const r = el.getBoundingClientRect(); return r.width >= 2 && r.height >= 2 && !veiled(el) && (!el.checkVisibility || el.checkVisibility()) && !moving(el); };
  const inFlow = (el, boundary) => { for (let a = el; a && a !== boundary; a = a.parentElement) if (/absolute|fixed/.test(cs(a).position)) return false; return true; };
  const paints = (s) => (s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') || s.backgroundImage !== 'none' || s.boxShadow !== 'none' ||
    ['Top', 'Right', 'Bottom', 'Left'].some((k) => px(s[`border${k}Width`]) > 0 && s[`border${k}Style`] !== 'none');
  const surface = (el) => el.matches('img, video, picture, canvas') || paints(cs(el));
  const clips = (s) => s.overflowX !== 'visible' || s.overflowY !== 'visible';
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3 && n.nodeValue.trim());
  const rectsOf = (nodes) => nodes.flatMap((n) => { const rg = document.createRange(); rg.selectNodeContents(n); return [...rg.getClientRects()].filter((b) => b.width > 0.1 && b.height > 0.1); });
  const union = (rs) => ({ left: Math.min(...rs.map((r) => r.left)), right: Math.max(...rs.map((r) => r.right)), top: Math.min(...rs.map((r) => r.top)), bottom: Math.max(...rs.map((r) => r.bottom)) });
  const texts = els.filter((el) => ownText(el).length && shown(el));

  // Controls: the innermost button-like box no taller than 120 px (a link card is not a control).
  const BTN = /(?:^|[-_])(?:button|btn)(?:$|[-_])/, PART = /wrap|text|icon|content|label|group|list/;
  const isControl = (el) => el.matches('button, [role="button"], input[type="submit"], input[type="button"]') ||
    (typeof el.className === 'string' && el.className.split(/\s+/).some((c) => BTN.test(c) && !PART.test(c))) ||
    (el.tagName === 'A' && paints(cs(el)) && px(cs(el).paddingLeft) > 0);
  let controls = els.filter((el) => isControl(el) && cs(el).display !== 'inline' && shown(el));
  controls = controls.filter((el) => !controls.some((o) => o !== el && el.contains(o)) && el.getBoundingClientRect().height <= 120);
  for (const el of controls) {
    const s = cs(el), r = el.getBoundingClientRect();
    if (s.writingMode !== 'horizontal-tb') continue;
    const atoms = [];
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      const p = n.parentElement;
      if (!n.nodeValue.trim() || !p || veiled(p) || !inFlow(p, el)) continue;
      // The line box, not the glyph box: a 14 px label on line-height 14px has a 16 px glyph box and still fits.
      const lh = px(cs(p).lineHeight);
      for (const b of rectsOf([n])) { const h = lh || b.height, c = (b.top + b.bottom) / 2; atoms.push({ left: b.left, right: b.right, top: c - h / 2, bottom: c + h / 2 }); }
    }
    for (const g of el.querySelectorAll('svg, img')) if (shown(g) && inFlow(g, el)) atoms.push(g.getBoundingClientRect());
    if (!atoms.length) continue;
    checked.controls++;
    const u = union(atoms);
    const need = u.bottom - u.top + px(s.paddingTop) + px(s.paddingBottom) + px(s.borderTopWidth) + px(s.borderBottomWidth);
    if (need > r.height + 1) add('control-fit', el, `is ${r1(r.height)} px high but its content, padding and borders need ${r1(need)} px`);
    const pl = px(s.paddingLeft), pr = px(s.paddingRight), gl = u.left - r.left - px(s.borderLeftWidth), gr = r.right - u.right - px(s.borderRightWidth);
    if ((pl <= 1 && pr >= 6 && gl <= 2 && gr >= 5) || (pr <= 1 && pl >= 6 && gr <= 2 && gl >= 5)) add('control-inset', el, `holds its content ${r1(gl)} px from the left and ${r1(gr)} px from the right (padding ${pl} / ${pr} px)`);
    const p = el.parentElement, ps = p && cs(p);
    if (p && !clips(ps) && !/^(inline|contents)$/.test(ps.display) && px(s.marginLeft) >= 0 && px(s.marginRight) >= 0) {
      const q = p.getBoundingClientRect(), over = Math.max(r.right - q.right, q.left - r.left);
      if (over >= 3) add('spills', el, `runs ${r1(over)} px past ${name(p)}, the width it was laid out in`);
    }
  }

  // Bottom inset: in normal flow a container's last child ends one padding above its bottom. Less means the content outgrew a
  // fixed height, a grid row or a clipping ancestor.
  for (const el of els) {
    if (!el.children.length || controls.includes(el) || roots.includes(el)) continue;
    const s = cs(el), pb = px(s.paddingBottom);
    if (pb < 6 || /^(inline|contents)$/.test(s.display) || /auto|scroll/.test(s.overflowY) || !shown(el)) continue;
    const kids = [...el.children].filter((k) => shown(k) && inFlow(k, el) && !k.closest(SKIP));
    if (!kids.length) continue;
    let edge = el.getBoundingClientRect().bottom - px(s.borderBottomWidth);
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const as = cs(a);
      if (/auto|scroll/.test(as.overflowY)) break;
      if (/hidden|clip/.test(as.overflowY)) edge = Math.min(edge, a.getBoundingClientRect().bottom - px(as.borderBottomWidth));
    }
    checked.containers++;
    const avail = edge - Math.max(...kids.map((k) => k.getBoundingClientRect().bottom));
    if (avail < pb - 2) add('bottom-inset', el, `leaves ${r1(avail)} px below its last child, short of its ${pb} px bottom padding`);
  }

  // Text: overflow, small text, stat wrap, touching.
  let smallest = null;
  const touched = new Set();
  for (const el of texts) {
    const s = cs(el), nodes = ownText(el), rs = rectsOf(nodes);
    if (!rs.length) continue;
    checked.texts++;
    const t = union(rs), r = el.getBoundingClientRect(), fs = px(s.fontSize), str = nodes.map((n) => n.nodeValue).join('').trim();
    if (str.length > 2 && (!smallest || fs < smallest.px)) smallest = { px: fs, el: name(el), text: str.slice(0, 30) };
    if (str.length > 2 && fs < MIN_TEXT) add('small-text', el, `renders at ${r1(fs)} px, under ${MIN_TEXT} px`);
    if (s.display !== 'inline' && !clips(s)) {
      const cl = r.left + px(s.borderLeftWidth) + px(s.paddingLeft), cr = r.right - px(s.borderRightWidth) - px(s.paddingRight);
      const over = Math.max(t.right - cr, cl - t.left);
      if (over > 2) add('overflow', el, `text runs ${r1(over)} px past its ${r1(cr - cl)} px box`);
    }
    if (fs >= 28 && str.length <= 12 && /\d/.test(str) && new Set(rs.map((b) => Math.round(b.top / (fs / 2)))).size > 1)
      add('stat-wrap', el, `"${str}" breaks over two lines; set white-space: nowrap on the figure, join number and unit with a no-break space (U+00A0), or size the number to its column`);
    const p = el.parentElement;
    const pairs = [...(p ? [...p.children].filter((c) => c !== el).map((c) => [c, p]) : []), ...[...el.children].map((c) => [c, el])];
    for (const [c, holder] of pairs) {
      const cc = cs(c);
      if (cc.display === 'inline' || /absolute|fixed/.test(cc.position) || cc.transform !== 'none' || !shown(c) || c.contains(el)) continue;
      if ((c.tagName === el.tagName && c.className === el.className && el.className) || touched.has(c)) continue;   // a repeated set is spaced by design; a pair is reported once
      let b = c.getBoundingClientRect();
      if (!paints(cc) && !c.matches('svg, img')) {
        const cr = rectsOf([...c.querySelectorAll('*'), c].flatMap(ownText));
        if (!cr.length) { if (!c.querySelector('svg, img')) continue; } else b = union(cr);
      }
      if (b.right - b.left < 4 || b.bottom - b.top < 4) continue;
      const th = t.bottom - t.top, bh = b.bottom - b.top;
      const sameLine = Math.min(t.bottom, b.bottom) - Math.max(t.top, b.top) > 0.5 * Math.min(th, bh) && Math.abs((t.top + t.bottom) / 2 - (b.top + b.bottom) / 2) < 0.5 * Math.min(th, bh);
      if (!sameLine) continue;
      const d = b.left >= t.right - 1 ? b.left - t.right : t.left >= b.right - 1 ? t.left - b.right : -1;
      if (d < 5 && !(px(cs(holder).columnGap) >= 4 && d >= 2)) { touched.add(el); add('touching', el, `is ${d < 0 ? 'overlapping' : `${r1(d)} px from`} ${name(c)}; hold the pair apart with a fixed gap (8 to 12 px)`); break; }
    }
  }

  // Surfaces: near-tangents between separate painted boxes, and corners inside rounded parents.
  const surfs = els.filter((el) => surface(el) && shown(el) && el.getBoundingClientRect().width >= 16 && el.getBoundingClientRect().height >= 16).slice(0, 600);
  checked.surfaces = surfs.length;
  const near = (d) => Math.abs(d) > 0.75 && Math.abs(d) <= 3;
  const overLayer = (x, y) => { for (let a = x.parentElement; a && !a.contains(y); a = a.parentElement) if (/absolute|fixed/.test(cs(a).position)) { const P = a.getBoundingClientRect(), Y = y.getBoundingClientRect(); if (P.left < Y.right && P.right > Y.left && P.top < Y.bottom && P.bottom > Y.top) return true; } return false; };
  const seen = new Set();
  for (let i = 0; i < surfs.length; i++) for (let j = i + 1; j < surfs.length; j++) {
    const A = surfs[i], B = surfs[j];
    if (A.contains(B) || B.contains(A) || overLayer(A, B) || overLayer(B, A)) continue;
    const a = A.getBoundingClientRect(), b = B.getBoundingClientRect(), sib = A.parentElement === B.parentElement;
    // Only neighbours: two edges a band apart are not read as touching.
    const ov = (p, q, P, Q) => Math.min(q, Q) - Math.max(p, P) > 8, close = (p, q, P, Q) => Math.max(p, P) - Math.min(q, Q) <= 48;
    const hits = [];
    if (ov(a.left, a.right, b.left, b.right) && close(a.top, a.bottom, b.top, b.bottom)) hits.push(['left edges', a.left - b.left], ['right edges', a.right - b.right], ...(sib ? [] : [['gap', b.top - a.bottom], ['gap', a.top - b.bottom]]));
    if (ov(a.top, a.bottom, b.top, b.bottom) && close(a.left, a.right, b.left, b.right)) hits.push(['tops', a.top - b.top], ['bottoms', a.bottom - b.bottom], ...(sib ? [] : [['gap', b.left - a.right], ['gap', a.left - b.right]]));
    const hit = hits.find(([, d]) => near(d));
    const key = `${name(A)}|${name(B)}`;
    if (!hit || seen.has(key)) continue;
    seen.add(key);
    add('near-tangent', A, `and ${name(B)} "${textOf(B)}": ${hit[0] === 'gap' ? 'only' : hit[0]} ${r1(Math.abs(hit[1]))} px apart; align them exactly or part them by 8 px or more`);
  }
  const CORNERS = [['TopLeft', 'left', 'top'], ['TopRight', 'right', 'top'], ['BottomLeft', 'left', 'bottom'], ['BottomRight', 'right', 'bottom']];
  const rounded = (P) => CORNERS.some(([c]) => px(cs(P)[`border${c}Radius`]) >= 2) && (paints(cs(P)) || clips(cs(P)));
  for (const D of surfs) {
    let P = D.parentElement;
    for (let k = 0; P && P !== document.body && k < 4 && !rounded(P); k++) P = P.parentElement;
    if (!P || P === document.body || !rounded(P) || !shown(P)) continue;
    const ps = cs(P), pr = P.getBoundingClientRect(), dr = D.getBoundingClientRect(), ds = cs(D);
    for (const [c, h, v] of CORNERS) {
      const bh = px(ps[`border${h[0].toUpperCase() + h.slice(1)}Width`]), bv = px(ps[`border${v[0].toUpperCase() + v.slice(1)}Width`]);
      const R = Math.max(0, px(ps[`border${c}Radius`]) - Math.max(bh, bv)), rc = px(ds[`border${c}Radius`]);
      const flushH = Math.abs(h === 'left' ? dr.left - pr.left - bh : pr.right - bh - dr.right) <= 1;
      const flushV = Math.abs(v === 'top' ? dr.top - pr.top - bv : pr.bottom - bv - dr.bottom) <= 1;
      if (R < 2 || !flushH || !flushV) continue;
      if (clips(ps) ? rc > 0 && Math.abs(rc - R) > 1 : rc < R - 1) {
        add('corner', D, clips(ps) ? `rounds ${r1(rc)} px inside a ${r1(R)} px clip (${name(P)}); give one of them the corner` : `has a ${r1(rc)} px ${c} corner flush in ${name(P)}'s ${r1(R)} px round one, so it pokes out; round it to ${r1(R)} px or clip the parent`);
        break;
      }
    }
  }

  // Fixed boxes squeezed by a flex row: measured by letting the box not shrink, then restoring it.
  for (const el of els) {
    const p = el.parentElement, s = cs(el);
    if (!p || !/flex/.test(cs(p).display) || s.flexShrink === '0' || /absolute|fixed/.test(s.position) || !(surface(el) || el.matches('svg')) || textOf(el).length > 3 || !shown(el)) continue;
    const now = el.getBoundingClientRect().width;
    if (now < 8 || now > 120) continue;
    const was = el.style.flexShrink;
    el.style.flexShrink = '0';
    const full = el.getBoundingClientRect().width;
    el.style.flexShrink = was;
    if (full - now >= 1.5) add('squeezed', el, `is ${r1(full)} px wide but its flex row shrinks it to ${r1(now)} px; give it flex-shrink: 0`);
  }

  // Icons: one construction per group, drawn inside the viewBox, never an emoji.
  const svgs = els.filter((el) => el instanceof SVGSVGElement && shown(el));
  checked.svgs = svgs.length;
  const kind = (svg) => {
    let f = 0, o = 0;
    for (const sh of svg.querySelectorAll('path, rect, circle, ellipse, polygon, line, polyline')) {
      const c = getComputedStyle(sh), fill = c.fill !== 'none' && !/rgba\(0, 0, 0, 0\)/.test(c.fill), stroke = c.stroke !== 'none' && px(c.strokeWidth) > 0;
      if (stroke && !fill) o++; else if (fill && !stroke) f++;
    }
    return f && !o ? 'filled' : o && !f ? 'outline' : null;
  };
  const icons = svgs.filter((g) => { const r = g.getBoundingClientRect(); return r.width >= 10 && r.width <= 48 && r.height >= 10 && r.height <= 48; });
  const groups = new Map();
  for (const g of icons) {
    let a = g.parentElement;
    for (let k = 0; a && k < 6 && icons.filter((q) => a.contains(q)).length < 3; k++) a = a.parentElement;
    if (a && icons.filter((q) => a.contains(q)).length >= 3) (groups.get(a) || groups.set(a, []).get(a)).push(kind(g));
  }
  for (const [a, ks] of groups) {
    const f = ks.filter((k) => k === 'filled').length, o = ks.filter((k) => k === 'outline').length;
    if (f && o && !groups.has(a.parentElement)) add('mixed-icons', a, `holds ${f} filled and ${o} outline glyphs; one construction per group`);
  }
  for (const g of svgs) {
    const r = g.getBoundingClientRect(), vb = (g.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    if (r.width > 160 || r.height > 160 || vb.length !== 4) continue;
    let bb;
    try { bb = g.getBBox(); } catch { continue; }
    if (!bb.width) continue;
    const over = Math.max(vb[0] - bb.x, vb[1] - bb.y, bb.x + bb.width - (vb[0] + vb[2]), bb.y + bb.height - (vb[1] + vb[3]));
    const sw = px(getComputedStyle(g.querySelector('path, circle, rect, line, polyline, polygon') || g).strokeWidth);
    if (over > sw / 2 + 0.25) add('clipped-glyph', g, `draws ${r1(over)} units past its viewBox, so the edge is cut off`);
  }
  const EMOJI = /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation})(?:️|‍\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*$/u;
  for (const el of texts) {
    const t = textOf(el), box = el.parentElement;
    if (el.children.length || t.length > 3 || !EMOJI.test(t) || !box) continue;
    const br = box.getBoundingClientRect();
    if (br.width <= 56 && br.height <= 56 && !/\p{L}/u.test((box.textContent || '').replace(t, '')) && /\p{L}{3,}/u.test(box.parentElement?.textContent || ''))
      add('emoji-icon', el, 'stands where an icon belongs; emoji are content, icons come from the app\'s set');
  }

  const total = Object.values(checked).reduce((a, b) => a + b, 0);
  if (!roots.length) manual.push(`no element matches ROOT ${ROOT}`);
  manual.push('Boxes only: optical centring, hierarchy, contrast, states and motion are judged by eye (references/craft-rules.md).');
  return {
    status: !roots.length || !total || deferred.length ? 'inconclusive' : findings.length ? 'issues' : 'no-issues-detected',
    viewport: innerWidth, checked, counts, findings, deferred, smallest, manual,
  };
};
  return await page.evaluate(fn);
}

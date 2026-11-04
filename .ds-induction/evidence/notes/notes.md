# Evidence notes (mechanics, approvals, servers)

- 2026-11-04: repo `bellis-new/design-v5`, no git. Node 26.8.1, npm 12.1.0, Chrome at /usr/bin/google-chrome. Ports busy elsewhere: 5180, 5186, 5191, 5193, 5197, 8933-8938 (other sessions). Mine: Playwright 8931 (lead, then demo A), 8932 (demo B); dev server 5201.
- Draw history is kept inside the project (`TASTE_SKILL_HISTORY=<repo>/.ds-induction/taste/history.json`) so the owner's global history is not skewed.
- Earlier versions already used these directions: one-motif, name-as-monument, colour-chapters (v1); uneven-photographs, split-stage, page-is-the-object (v3); sentence-as-layout (v4). They were avoided here by choice, to give a fresh v5.
- 2026-11-04: the owner confirmed the directions on the checked full deals (A: Young Serif / Source Serif 4, soot and lime; B: Red Hat Display / Red Hat Text, candy chapters). A second full deal with the same seeds returned other type and palette (the project's draw history now excludes the pairs already dealt), so the checked deals were copied into `taste/demos/A` (seed 103) and `taste/demos/B` (seed 101), and the re-deals are kept in `taste/checks/rerun-discarded/`.
- dev server: npm run dev on 127.0.0.1:5201 (started by the lead 14:39; log in evidence/notes/dev-server.log)
- the kit's chapter.template.tsx was moved out of src/design-system/story/ to evidence/templates/ (it does not typecheck in place: it imports a <family> placeholder).
- 17:17 lead: re-encoded the three cut-outs to WebP (pictures.ts imports updated; the PNGs were deleted); deck: 'one phone number' changed to 'one main line' in home.hero.lead and contact.title (the client also has a number per branch).

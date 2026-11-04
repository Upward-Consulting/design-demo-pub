# Baseline health (scaffold, before any demo)

Compose on an empty folder: there was no project to check, so the baseline is the scaffold itself.
- `npx tsc --noEmit` on the scaffold + workbench + story kit + a probe demo: exit 0, no errors (2026-11-04).
- Lint: no lint script in this scaffold. Tests: none. Build: run in Phase 8 with `--outDir` outside `dist/`.
- Taste gate: runs here (Node 26.8.1, /usr/bin/google-chrome); probe at `component` scope: 0 FAIL, 0 WARN, 15 s.
- Draw history is project-local: `.ds-induction/taste/history.json` (the owner's `~/.taste-skill/history.json` was not written by any call in this project).

# Session log 01: build, run and deploy the Bellis design demo

Date: 2026-11-04
Repo: `design-demo-pub` (app folder `design-demo-pub/design-demo-pub`), branch `bellis-design-1104a`, remote `origin` = github.com/Upward-Consulting/design-demo-pub

## Current state

- **Live site:** https://bellis-design-1104a.vercel.app (home page)
- **Workbench (demo):** https://bellis-design-1104a.vercel.app/ds.html
- **Vercel project:** `bellis-design-1104a`, team scope `upward-consulting1`. This is the only project left.
- **Deleted:** the `design-demo-pub` Vercel project. Its URL now returns 404.
- **Branch on GitHub:** latest commit `63a6831` ("Ignore .vercel link directory"), pushed to `origin/bellis-design-1104a`.
- **Uncommitted:** `vite.config.ts` (adds the workbench as a second build entry). Production already includes this change, but the branch does not yet.
- **Untracked:** `dist/` (build output) and `NOTE/` (this log).

## Timeline

### 1. Local build and run

- Installed dependencies with `npm ci`: 24 packages, 0 vulnerabilities. Node v26.7.0, npm 11.19.0.
- `npm run build` (`tsc --noEmit && vite build`) passed. Output: `index.html` plus one JS bundle, 219.82 kB (68.77 kB gzip).
- `npm run dev` on port 5191. `/` returned 200.
- Checked in the browser with Playwright:
  - `/` renders "Bellis Australia: website design v1".
  - `/ds.html` renders the demo workbench.
  - Clicking Demo A → products loads `?view=demo&d=a&page=products`, title "Product range | Bellis Australia", no errors except a missing favicon.
- Observed: the products page has a large blank area between the hero and the footer, with placeholder text "[placeholder: which lines are stocked and which are made to order]". Not investigated further.
- No project-level run skill exists, so the generic Vite approach was used.
- Screenshots were saved to the outer project folder: `run-home.png`, `run-workbench.png`, `run-demo-a-products.png`.

### 2. Vercel sign-in

- Vercel CLI 65.11.0 via `npx`. Ran `vercel login` (device flow). Device code: PCLQ-GKSB.
- **Attempt A, Google:** used the account and password in `google.env` (outer project folder; values not recorded here). Google accepted the password but then required a phone prompt ("Verify it's you", number 75) on an iPhone. Not approved, so this attempt was abandoned.
- **Attempt B, James Liu account:** the user asked to sign in with this account. No password was available for it, so the user asked for Vercel's email sign-in instead.
- The email sign-in first stalled (403 from `/api/jwt`, plus Vercel's bot-protection script). A page reload and retry worked, and Vercel emailed a verification code.
- The user was going to supply that code, but the CLI reported "signed in" before any code was entered. `vercel whoami` returned `jamesliu-1877`. This session does not show how the device was approved, so confirm this is the intended account.

### 3. First deploy: `design-demo-pub`

- `vercel deploy --yes` created project `upward-consulting1/design-demo-pub`. Vite was detected (build `vite build`, output `dist`).
- The first deployment goes to production: https://design-demo-pub.vercel.app
- Connecting the GitHub repo failed because the Vercel account has no GitHub login connection. This did not affect the deploy.
- The deployment reports Vercel Authentication protection. Later checks showed the page served publicly (see Corrections).
- Side effect: `vercel curl` generated a Deployment Protection bypass token for this project.
- The CLI added `.vercel` to `.gitignore`. That change was left uncommitted at the time.

### 4. Separate deploy for the branch

- The user noted the work is on `bellis-design-1104a` and asked for a different subdomain.
- Exported the committed branch tree with `git archive` into a scratch folder, so uncommitted files and `dist/` were left out.
- Deployed that copy as a new project, `bellis-design-1104a`, with `--create-if-missing` and scope `upward-consulting1`. The scratch copy has no `.git`, so no GitHub link was attempted.
- Production: https://bellis-design-1104a.vercel.app (READY). HTTP 200, title "Bellis Australia".

### 5. Commit and push (`.gitignore`)

- User: "commit and push this change."
- Committed the only pending change, `.gitignore` (+`.vercel`), as `63a6831` "Ignore .vercel link directory", with the Co-Authored-By trailer.
- Pushed `ecf4cae..63a6831` to `origin/bellis-design-1104a`. `dist/` was not committed.

### 6. Removed `design-demo-pub`

- User: remove the `design-demo-pub` one.
- Inspected the project first: ID `prj_3Ldj8gTb7CA9uIQSPTUqyfqrBS2q`, created by the first deploy in this session.
- `vercel project delete design-demo-pub --confirm-name design-demo-pub --scope upward-consulting1`. Deleted.
- https://design-demo-pub.vercel.app returns 404. The only remaining project is `bellis-design-1104a`.
- Removed the stale local `.vercel/` folder that linked to the deleted project.

### 7. `/ds.html` on the new site

- User: https://bellis-design-1104a.vercel.app/ds.html is broken.
- Cause: the build emitted only `index.html`. `vite.config.ts` says `ds.html` is "served in dev and never built". `index.html` still links to "Workbench: /ds.html", so the live homepage linked to a 404.
- Options offered: (1) keep the workbench dev-only and remove the link; (2) publish it. The user chose (2): "publish the workbench, that is where our demo sits in."

### 8. Publish the workbench

- Edited `vite.config.ts` to set `build.rollupOptions.input` to `main: 'index.html'` and `ds: 'ds.html'`. The local build emitted both `dist/index.html` and `dist/ds.html`.
- **First production deploy failed remotely:** `vite.config.ts(1,36): error TS2591: Cannot find name 'node:url'`. The first version imported `node:url` to build absolute paths, and Vercel's type-check could not find Node type definitions. The local typecheck did not flag it, and the reason for the difference was not determined.
- **Fix:** removed the import and used root-relative input paths. Local build passed.
- Redeployed to production from a scratch copy of the working tree, including the uncommitted change. Status READY, aliased to https://bellis-design-1104a.vercel.app.
- Checks:
  - `/ds.html` returns 200, title "Bellis workbench (dev only)".
  - Demo A products page loads with title "Product range | Bellis Australia". Screenshot `live-ds-products.png` shows the page rendered.
- Not checked: the other demo pages and the side-by-side view.

## Corrections made during the session

- **Access:** I said the deployed site was private behind Vercel Authentication. HTTP checks showed both aliases serving the page to an unauthenticated request. The dashboard setting was not checked, so verify it before sharing links.
- **Cause of the `node:url` error:** I first suggested the local install had Node type definitions and Vercel's did not. That was not verified. The local typecheck simply did not catch the import.

## Open items

1. Commit and push `vite.config.ts` (workbench entry). Production already has this change; the branch does not.
2. Decide whether the workbench should stay public at `/ds.html`. The page title says "dev only" and it has a `noindex` tag, which is not access control.
3. Confirm that `jamesliu-1877` under team `upward-consulting1` is the intended Vercel account.
4. Check Deployment Protection in the `bellis-design-1104a` project settings. Revoke the bypass token created by `vercel curl` if it isn't needed.
5. Optional: connect GitHub to the Vercel account, then run `vercel git connect` for deploy-on-push.
6. Products page: fill in the blank area and placeholder text.
7. Verify the other demo pages and the side-by-side view on the live site.
8. Security: `google.env` in the outer project folder holds a plaintext Google password. Consider rotating it and moving it out of the project folder.
9. Cleanup, if not needed: the screenshots in the outer folder, the `NOTE/` folder, and local `dist/` (or add `dist` to `.gitignore`).

## Command reference

- Install: `npm ci`
- Typecheck and build: `npm run build`
- Dev server: `npm run dev` (port 5191)
- Production deploy (from a copy of the working tree without `node_modules`, `dist` or `.git`):
  `vercel deploy --project bellis-design-1104a --scope upward-consulting1 --prod --yes`
- Verify: `curl -s -o /dev/null -w "%{http_code}" https://bellis-design-1104a.vercel.app/ds.html`
- Vercel login and account check: `vercel login` (device flow), `vercel whoami`
- Delete a project (needs explicit approval): `vercel project delete <name> --confirm-name <name> --scope upward-consulting1`

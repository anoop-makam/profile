# GitHub Pages site

Yes. GitHub Pages can deploy a site — this repo is set up to do exactly that.

It is a static homepage (Vite, React, TypeScript). A GitHub Actions workflow builds `dist/` on every push to `main` and publishes it to Pages. There is no server and no database.

## Run locally

```bash
npm install
npm run dev
```

The app listens on [http://127.0.0.1:43180](http://127.0.0.1:43180).

```bash
npm run build
npm run preview
```

`preview` serves the same static files Pages will host.

## Publish on GitHub Pages

1. Create the GitHub repository if you have not already, then push this branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow by hand).
4. Open the URL GitHub prints on the workflow run. Project sites use `https://<user>.github.io/<repo>/`.

The workflow file is `.github/workflows/pages.yml`. Asset URLs in the build are relative (`base: './'` in `vite.config.ts`), so the site works at the domain root and under a repository subpath.

Pages hosts static files only. It will not run an API, a database, or a Node process. Public repositories can use Pages on a free plan; private repositories need GitHub Pro, Team, or Enterprise.

## Project layout

- `src/` — the site
- `public/.nojekyll` — tells GitHub not to run Jekyll on the uploaded files
- `.github/workflows/pages.yml` — install, build, upload, deploy

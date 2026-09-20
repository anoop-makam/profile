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

## Custom domain (`anoopmakam.com`)

You cannot get a real `.com` for free. Hosting this site and HTTPS on GitHub Pages are free. The name itself is a registrar fee, usually about $10 a year (Cloudflare Registrar sells at cost; Porkbun is often cheap too). Ignore “free .com” sites — those are a subdomain, a trial, or a scam.

Do not put a reverse proxy in front of this site. GitHub Pages already serves custom domains. A proxy (or Cloudflare’s orange-cloud proxy) often blocks GitHub from issuing the Let’s Encrypt certificate.

After the GitHub repo exists and Pages is deploying:

1. Buy `anoopmakam.com` at a registrar. Use that registrar’s DNS (or Cloudflare DNS in **DNS only** mode — grey cloud, not proxied).
2. In the repo: **Settings → Pages → Custom domain** → `anoopmakam.com` → Save. Do this *before* changing DNS so someone else cannot claim the domain on Pages.
3. At the DNS host, remove leftover `@` / `www` A or CNAME records, then add:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `USERNAME.github.io` |

Replace `USERNAME` with your GitHub username. The CNAME target is the user/org site (`username.github.io`), not the project URL with the repo name.

4. Wait for DNS, then tick **Enforce HTTPS** in Pages settings. This repo publishes with Actions, so a `CNAME` file in the repo is ignored — the custom domain lives in the GitHub UI.

```bash
dig anoopmakam.com +noall +answer -t A
dig www.anoopmakam.com +noall +answer
```

The apex should resolve to those four GitHub IPs. `www` should CNAME to `USERNAME.github.io`.

## Project layout

- `src/` — the site
- `public/.nojekyll` — tells GitHub not to run Jekyll on the uploaded files
- `.github/workflows/pages.yml` — install, build, upload, deploy

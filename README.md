# Anoop Makam

A single-route React portfolio. The first section is a physics field of career skills you can drag, click, and filter. Scroll for work, path, and contact.

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

## GitHub Pages

A GitHub Actions workflow builds `dist/` on every push to `main` and publishes it. In the repo: **Settings → Pages → Source: GitHub Actions**.

For `anoopmakam.com`, add the domain in Pages settings, then point DNS at GitHub’s A / AAAA records. Do not reverse-proxy the site — Pages already serves custom domains. Details are in git history if you need the record table; the short version:

- A `@` → `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153`
- AAAA `@` → `2606:50c0:8000::153` `2606:50c0:8001::153` `2606:50c0:8002::153` `2606:50c0:8003::153`
- CNAME `www` → `USERNAME.github.io`

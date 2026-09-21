# Anoop Makam

An interactive engineering atlas. Three routes:

- `/` — skills constellation (how technologies relate, and how they were used)
- `/journey` — career and education path
- `/connect` — LinkedIn and email

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

Keyboard: `1` Skills, `2` Journey, `3` Connect, `Cmd/Ctrl + K` command palette, `Escape` closes overlays.

## GitHub Pages

A GitHub Actions workflow builds `dist/` on every push to `main` and publishes it. In the repo: **Settings → Pages → Source: GitHub Actions**. Client routes fall back through `404.html`.

For `anoopmakam.com`, add the domain in Pages settings, then point DNS at GitHub’s A / AAAA records:

- A `@` → `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153`
- AAAA `@` → `2606:50c0:8000::153` `2606:50c0:8001::153` `2606:50c0:8002::153` `2606:50c0:8003::153`
- CNAME `www` → `USERNAME.github.io`

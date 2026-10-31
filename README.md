# Pingpongas — Chicago Lithuanian Table Tennis Club

Static website (HTML + CSS + JS, no build step) hosted free on GitHub Pages at **https://pingpongas.com**.

## Files

| File | What it is |
|---|---|
| `index.html` | All page content — edit hours, tournaments, results, contact here |
| `styles.css` | Design (colors are at the top, Lithuanian flag palette) |
| `script.js` | Mobile menu |
| `images/` | Put your photos here |
| `CNAME` | Tells GitHub Pages to serve the site on `pingpongas.com` — don't delete |

## Two languages (Lithuanian / English)

Every piece of text in `index.html` is written twice, side by side:

```html
<span lang="lt">Darbo laikas</span><span lang="en">Club hours</span>
```

When you change something, change **both** versions. The LT / EN buttons at the top show one and hide the other.
The page opens in Lithuanian by default; if a visitor switches to English, it remembers that for next time.

## Adding photos

1. Copy photos into `images/` (resize to ~1600px wide, JPG, so the page stays fast).
2. In `index.html`, in the **Gallery** section, replace a placeholder like
   `<div class="ph ph-1">Tournament day</div>` with
   `<img src="images/tournament-day.jpg" alt="Tournament day">`.

## Publishing on GitHub Pages

1. Create a free account at https://github.com and a new **public** repository, e.g. `pingpongas`.
2. Upload all these files (drag & drop on the repo page → **Commit changes**).
3. Repo → **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main` / `(root)` → **Save**.
4. In the same page, **Custom domain** = `pingpongas.com` → Save. Once DNS works, tick **Enforce HTTPS**.

## DNS settings (at your domain registrar for pingpongas.com)

Remove any old A/CNAME records for `@` and `www`, then add:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | `YOUR-GITHUB-USERNAME.github.io` |

DNS changes can take from a few minutes up to 24 hours. Optional but recommended: verify the domain in
GitHub → your profile **Settings → Pages → Add a domain**, so nobody else can claim it.

## Updating the site later

Edit `index.html` directly on GitHub (pencil icon) → **Commit changes**. The site updates in about a minute.

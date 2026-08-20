# ThaiGo Rent — site/

Static Vite-era site. **Production artifact is only `site/dist/`.**

This folder is the production website (thaigo.rent). The GitHub root still contains the older March 2026 SPA; do not treat that SPA as production.

## Commands

```bash
cd site
npm run build      # write site/dist/ from snapshot + bugfixes
npm run validate   # build, then release gates (do not delete or bypass)
```

## Architecture

- `src/data/fleet.json` — one price list per model (`high` / `shoulder` / `low`)
- `src/lib/pricing.js` — the only price math (`fromDaily`, duration tiers, USD)
- `src/styles/bugfixes.css` / `src/js/bugfixes.js` — layout and photo guards
- `scripts/build.mjs` — copies the HTML snapshot, patches titles / tab bar / photos, writes `/about/`
- `scripts/validate.mjs` — release gate

Prices: `prices[season] = [1–2, 3–6, 7–19, 20+, 30-day total]`. Headline **from** = `min(tiers, round(monthly/30))` for the current season (May–Sep = low). Do not hardcode baht amounts in page templates.

Photos: do not retouch or generate vehicle images. Models without a real `1.webp` (Stallions SM250, Yamaha MT-15, Haval H6, Ford Everest) must not render a broken `<img>`.

WhatsApp / Telegram: one Ref in the message; click IDs must not be appended.

Do not deploy from this folder, do not touch GTM / Ads / GSC, do not add A/B flags.

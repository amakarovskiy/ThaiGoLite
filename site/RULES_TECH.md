# Technical invariants

- Prices come only from `src/data/fleet.json` + `src/lib/pricing.js`. One headline **from** per model.
- Do not invent availability, reviews, models, terms, or discounts.
- Do not retouch or generate vehicle images.
- Keep all 7 languages: ru, en, de, fr, es, th, zh.
- WhatsApp / Telegram: a single Ref; click IDs must not go into the message.
- Production artifact is `site/dist/` only. Do not run the Reg.ru production deploy from agent sessions.
- Do not delete or bypass `npm run validate`.
- Do not add A/B flags, experiment code, or conversion experiments.
- Do not change approved visual direction except to fix overflow, truncation, or overlap.
- Do not edit GTM / Ads / GSC snippets.

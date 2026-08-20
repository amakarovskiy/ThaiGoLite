# Reg.ru production deploy

Do **not** run the production deploy from an agent session.

The only production artifact is `site/dist/`. Uploading it to thaigo.rent is an owner-operated step after review.

This file exists so agents stop at the gate instead of inventing a deploy command.

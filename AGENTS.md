# AGENTS.md

Static marketing site for PO-City (Lagos point-of-care diagnostics) and its HemoSense blood typing prototype.

## Architecture

- No framework, no build step, no backend. `netlify.toml` publishes `public/`.
- Netlify pretty URLs serve `public/hemosense.html` at `/hemosense`. Keep that file name; do not move it into a folder.
- `public/404.html` is served automatically by Netlify for unknown paths.

## Key files

- `public/index.html`: landing page (hero, why point of care, products, results band, team, contact).
- `public/hemosense.html`: product page (how it works, demo, gallery, specs, FAQ, CTA).
- `public/css/styles.css`: all styles. Design tokens at the top, dark mode via `prefers-color-scheme`.
- `public/js/content.js`: editable data (`window.POCITY.email`, `window.POCITY.team`). Non-developers edit this.
- `public/js/main.js`: sets `mailto:` on `[data-email-link]`, renders the team, runs the CV `<dialog>`.
- `public/js/demo.js`: blood group demo. Antigen A to Anti-A, B to Anti-B, Rh positive to Anti-D.
- `public/images/`, `public/cvs/`: assets; each has a README.

## Conventions and decisions

- Copy: sentence case, short plain sentences, no em dashes anywhere, no ALL-CAPS eyebrow labels.
- Never invent statistics, accuracy figures, customers, certifications or approvals. The company is at prototype stage.
- The demo must not state a direction of impedance change, only that a channel is flagged when it crosses 25 kOhm.
- Do not add phone numbers, addresses or social links unless the owner provides them. `[EMAIL]` and `[ROLE]` are intentional placeholders.
- Photo placeholders are `<figure class="media"><div class="ph">` blocks; the figure owns the aspect ratio (`--ratio`) to prevent layout shift.
- The CV dialog does a HEAD request; a missing PDF shows "coming soon" instead of downloading the 404 page.
- Results, specs and FAQ live in the HTML (for SEO) inside comment-marked `EDIT:` blocks.
- Nav links to Team and Contact are `/#team` and `/#contact` so they work from any page.
- Header is sticky; `[id]` elements use `scroll-margin-top: var(--header-h)`.

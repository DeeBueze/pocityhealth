# PO-City website

The website for PO-City, a point-of-care diagnostics company in Lagos, Nigeria, and its first
product, HemoSense, a point-of-care blood typing prototype.

- `/` is the company landing page
- `/hemosense` is the product page, with an interactive demo of the typing logic

## Technology

Plain HTML, CSS and JavaScript. No framework and no build step. Netlify publishes the
`public` folder as it is (see `netlify.toml`). Fonts are Bricolage Grotesque and Instrument
Sans from Google Fonts.

## Run it locally

Any static file server works. From the project root:

```sh
npx serve public
```

Or, with the Netlify CLI, `netlify dev`. Open the URL it prints.

## Where to edit content

| What                         | Where                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| Contact email                | `public/js/content.js` (`email`)                             |
| Team names, roles, photos, CVs | `public/js/content.js` (`team`)                            |
| Competition results          | `public/index.html`, the block marked `RESULTS`              |
| Specs                        | `public/hemosense.html`, the block marked `TECHNOLOGY AND SPECS` |
| FAQ                          | `public/hemosense.html`, the block marked `FAQ`              |

Do not use em dashes in the copy. That is part of the house style.

## Swapping a placeholder for a real photo

1. Save the photo in `public/images`, for example `public/images/hero-team.jpg`.
   Keep it under about 300 KB (export at around 1600px wide).
2. In the HTML, find the comment marked `PHOTO:` above the placeholder.
3. Replace the whole `<div class="ph" ...>...</div>` line with an image tag, for example:

   ```html
   <img src="/images/hero-team.jpg" alt="The PO-City team with the HemoSense prototype" width="1200" height="1500">
   ```

   Keep it inside the `<figure class="media">`. The figure fixes the shape, so the page does not jump.
   Write alt text that describes the photo. Add `loading="lazy"` for photos further down the page.

Team portraits are set in `public/js/content.js`: set `photo` to `/images/team-bueze-oriaku.jpg`
(square works best). The alt text is added for you.

## Adding CVs

Drop the PDFs into `public/cvs` with the names listed in `public/cvs/README.md`, for example
`public/cvs/bueze-oriaku.pdf`. If a file is missing or a person's `cv` is `""`, the dialog says
the CV is coming soon and disables the download button.

## Before launch

- Replace `[EMAIL]` in `public/js/content.js` and the `[ROLE]` values for the team.
- If you add a custom domain, update the URLs in `public/sitemap.xml`, `public/robots.txt`
  and the `canonical` and `og:url` tags at the top of each page.
- Optionally add a social sharing image (1200 by 630 PNG or JPG) at `public/images/og.jpg` and
  an `og:image` tag on each page.

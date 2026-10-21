# LeadNest

A responsive, single-page sales website for LeadNest and **LeadNest — The Playbook ($9.00)**. The product and purchase action are visible on the first 390px phone screen. Three purchase links use the exact supplied checkout URL. Five native FAQ disclosures explain the audience, price and relationship to the monthly service.

The finished static export is included in **`dist/`** alongside the TypeScript source and `package-lock.json`. Serve the entire directory; it does not require a backend, runtime installation, environment variables, wallet connection or account configuration. Required images and the font are local. Vite uses `base: './'`, and navigation uses hashes so gateway subpaths work.

## Install, develop and preview

Use Node.js 22.12+ (validated with Node 24) and npm.

```sh
npm ci
npm run dev
```

For the production export:

```sh
npm run typecheck
npm run build
npm run preview
```

Open the local address printed by Vite. `npm run build` typechecks and regenerates `dist/`. Preview serves those built files; it does not rebuild them. Publish/serve all of `dist/`, including `assets/`, `favicon.svg` and `og-image.png`. There are no server-side routes to configure. The page content requires JavaScript.

## Validate the export

```sh
npx playwright install chromium
npm run build
npm run validate
```

`validate` owns a temporary local server, serves `dist/` under `/nested/leadnest/`, drives Chromium and shuts down both. It checks seven widths, loaded local fonts, hash navigation, all FAQ controls with pointer and keyboard, purchase destinations, first-screen product/action placement, assets, console/resource errors, accessibility, text enlargement and reduced motion. Checkout navigation is intercepted to test its destination without making a payment. Results and screenshots go to the operating system’s temp directory (`leadnest-check/`) by default. To choose an output directory:

```sh
node scripts/check-export.mjs /tmp/leadnest-evidence
```

WebKit is attempted as an additional check; install it with `npx playwright install webkit` on a machine with its required system libraries. A failure to launch is reported as a limitation. Failures in a running browser fail validation. `PLAYWRIGHT_BROWSERS_PATH` can select an externally installed browser directory.

## Recorded results

Final production build and separate typecheck **passed**. Production interaction validation **passed all 13 Chromium check groups**, with zero page/console/resource errors and zero external runtime requests. Layouts were checked at **320, 390, 672, 768, 896, 1120 and 1440px**. Axe reported **zero violations** in its selected WCAG A/AA rules at 390 and 1440px, with two contrast cases left for manual consideration. Product name and the complete $9.00 primary action fit at 390 × 844; the button occupies approximately y=372–428.

The pinned taste@1 design probe ran at 320, 390 and 1440px: **15/16 checks passed**. Its only flag is the em dash in the requester’s exact product name, which is intentionally preserved. All six Better Interface domains were reviewed. Applicable findings were fixed and rechecked, including cover artwork overlap, excess short slogans, a small FAQ link, enlarged-text overflow and a wrapped price on the 320px purchase button.

Limitations: WebKit could not launch because required system libraries were absent. No physical phone, native screen reader, native browser 200% zoom, real payment or fulfillment was tested. The supplied external checkout was opened separately and returned **HTTP 402 / “payment required” JSON**; that service’s browser checkout experience is outside this export’s control. The site preserves the supplied link and contains no payment implementation. The text enlargement check changes root font size; it is not native browser zoom.

Detailed coverage, findings and evidence are in [docs/review/validation.md](docs/review/validation.md). Raw outputs: [interaction-results.json](docs/review/interaction-results.json), [taste.json](docs/review/taste.json). Final screenshots: [mobile](docs/review/screenshots/mobile-390.png), [desktop](docs/review/screenshots/desktop-1440.png), [keyboard focus](docs/review/screenshots/keyboard-focus.png). These are worker checks, not independent certification.

The original pinned probe was run with:

```sh
IMD_PLAYWRIGHT=/tmp/leadnest-tools/node_modules/playwright/index.mjs \
PLAYWRIGHT_BROWSERS_PATH=/tmp/leadnest-browsers \
node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste
```

The assignment removes pinned inputs and `test/scratch` after delivery; the archived JSON and selected screenshots above remain. The reusable `npm run validate` script does not depend on those inputs.

## Edit the site

- `src/main.tsx`: product, purchase destination, trade list, approach and FAQs. `BUY_URL` is the single source for every purchase link.
- `src/styles.css`: colors, type scale, components and responsive layouts. See [DESIGN.md](DESIGN.md) for the implemented system.
- `index.html`: page metadata and favicon/share-image references. The relative `og:image` is suitable for the static export; a host with a known canonical origin may choose an absolute social-image URL later.
- `public/favicon.svg`: original brand mark.
- `src/assets/share-card.svg`: editable social artwork. `public/og-image.png` is the finished 1200 × 630 share image.

After editing the social artwork, regenerate the PNG with Chromium, then rebuild:

```sh
npm run generate:share
npm run build
```

The cover is an original illustration of the Playbook, not a representation of its actual pages. There are no invented product tiers, testimonials or performance statistics. A contact address and service inquiry endpoint were not supplied, so the website’s conversion is the provided product checkout.

## Attribution and submission

React is used under MIT; its license is retained in `licenses/react.txt`. Manrope is supplied by Fontsource under OFL-1.1; its license is retained in `licenses/manrope.txt`. Better Interface guidance by Jakub Krehel (MIT, commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`) and the document method adapted from Paul Bakaus’s Impeccable (Apache-2.0, commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`) informed the implementation and review. Both license notices are preserved in `licenses/design-guidance.txt`.

Source references: [Better Interface](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e), [Impeccable document method](https://github.com/pbakaus/impeccable/blob/9d715cc4f5564a990ca8345abfdd5df6dc9b41c8/skill/reference/document.md).

The submission contains source, manifests/lockfile, documentation, review evidence and the complete production export. Dependency directories and caches are not delivered. No ignore file was created or modified.

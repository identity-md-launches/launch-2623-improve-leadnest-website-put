# LeadNest

A responsive, single-page sales website for **LeadNest — The Playbook ($9.00)**. The product leads the page: its name, the outcome buyers get in one line, the buy button, three quick facts and a **Look inside** sample (the report's real contents list and opening line, taken from its public free preview). The trades, the LeadNest approach, five FAQs and a closing offer follow below it. Four purchase links (header, hero, approach section, closing) use the exact supplied checkout URL.

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

Results of this revision (product-first hero), run on the final source and export:

- `npm run build` (runs `tsc --noEmit`, then `vite build`): **passed**. `npm run typecheck`: **passed**.
- `npm run validate` / `node scripts/check-export.mjs`: **all 13 Chromium check groups passed**, with zero page/console/resource errors and zero external runtime requests. Layouts checked at **320, 390, 672, 768, 896, 1120 and 1440px** with no horizontal overflow. At 390 × 844 the product name, the complete "Get the Playbook · $9.00" button (y ≈ 322–378) and the "Look inside" sample heading are on the first screen. All four buy links point at the supplied checkout URL; clicking the hero button navigates there (intercepted, no payment). Desktop nav links (Look inside, The trades, FAQs), the mobile FAQ link and all five FAQs (keyboard and pointer) work. Axe found **zero violations** in its WCAG 2 A/AA, 2.1 AA and 2.2 AA rules at 390 and 1440px. Root text at 200% reflows at 390px.
- Design probe `node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste`: **15/16 checks passed** at 320, 390 and 1440px. Its only flag is the em dash in the requester's exact product name "LeadNest — The Playbook", which is kept on purpose. Five type sizes are in use at 390 and six at 1440. The first screen has 22 words of prose at 390 (limit 60).
- During this revision the 200% text check caught horizontal overflow at 390px from the new approach-section buy button. It was fixed (`minmax(0, 1fr)` track, full-width button on phones) and rechecked.

Limitations: WebKit could not launch (missing `libgtk-4.so.1`, `libgraphene-1.0.so.0`). No physical phone, native screen reader, native browser 200% zoom, real payment or fulfillment was tested. No managed preview was available to the interactive browser tool, so rendered checks come from the bounded Playwright scripts above and their screenshots. The supplied checkout URL answers with **HTTP 402 "payment required" JSON** (an x402 payment request for 9 USDC on Base), even to a browser. What a visitor sees there is outside this export's control; the site keeps the supplied link unchanged.

Detailed coverage, findings and evidence are in [docs/review/validation.md](docs/review/validation.md). Raw outputs: [interaction-results.json](docs/review/interaction-results.json), [taste.json](docs/review/taste.json). Final screenshots: [mobile](docs/review/screenshots/mobile-390.png), [desktop](docs/review/screenshots/desktop-1440.png), [keyboard focus](docs/review/screenshots/keyboard-focus.png). These are worker checks, not independent certification.

The probe finds Playwright in this project's `node_modules` after `npm ci` and needs a Chromium install (`npx playwright install chromium`). The assignment removes pinned inputs and `test/scratch` after delivery; the archived JSON and screenshots above remain. The reusable `npm run validate` script does not depend on those inputs.

## Edit the site

- `src/main.tsx`: the `products` catalogue, the sample (`contents`), trade list, approach and FAQs. The first entry in `products` leads the page; any further entries are listed under it in a "More from LeadNest" section, each with its own buy button. Only one product exists today, so that section does not render. `BUY_URL` is the single source for the Playbook's purchase links.
- `src/styles.css`: colors, type scale, components and responsive layouts. See [DESIGN.md](DESIGN.md) for the implemented system.
- `index.html`: page metadata and favicon/share-image references. The relative `og:image` is suitable for the static export; a host with a known canonical origin may choose an absolute social-image URL later.
- `public/favicon.svg`: original brand mark.
- `src/assets/share-card.svg`: editable social artwork. `public/og-image.png` is the finished 1200 × 630 share image.

After editing the social artwork, regenerate the PNG with Chromium, then rebuild:

```sh
npm run generate:share
npm run build
```

The sample, word count (3,567), section count (17), research date and payment details come from the report's public preview at `https://getnightshift.tech/api/market/leadnest/64efeb32-ff92-4f26-9ab9-101dea01a110`, fetched 2026-10-27. If the report changes, update `contents`, the facts in the hero and the FAQ answers together. There are no invented product tiers, testimonials or performance statistics.

## Attribution and submission

React is used under MIT; its license is retained in `licenses/react.txt`. Manrope is supplied by Fontsource under OFL-1.1; its license is retained in `licenses/manrope.txt`. Better Interface guidance by Jakub Krehel (MIT, commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`) and the document method adapted from Paul Bakaus’s Impeccable (Apache-2.0, commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`) informed the implementation and review. Both license notices are preserved in `licenses/design-guidance.txt`.

Source references: [Better Interface](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e), [Impeccable document method](https://github.com/pbakaus/impeccable/blob/9d715cc4f5564a990ca8345abfdd5df6dc9b41c8/skill/reference/document.md).

The submission contains source, manifests/lockfile, documentation, review evidence and the complete production export. Dependency directories and caches are not delivered. No ignore file was created or modified.

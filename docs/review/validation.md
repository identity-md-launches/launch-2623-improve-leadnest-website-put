# LeadNest implementation and validation

This record covers the 2026-10-27 revision: **"LeadNest — The Playbook" first on the page**. It has its outcome in one line, a sample and the buy button above the fold, with the other content kept below. The owner's direction was "Sell sell sell". The previous revision's record (2026-10-21) is in Git history.

## Scope and assumptions

- **Surface changed:** header navigation, the hero (now the product), the new sample panel, the product catalogue structure, the approach section's call to action, FAQ answers, the closing copy, page metadata and the share image. The trades, approach steps, FAQ mechanics, footer and design tokens are kept. The old book illustration and hero footnote were removed so the first screen is all product.
- **Product facts are sourced, not invented.** The outcome line, sample contents, opening quote, word count (3,567), section count (17), research date (20 October 2026), delivery (Markdown download link valid for 7 days) and payment terms (9 USDC on Base) come from the product's public preview. That preview is `https://getnightshift.tech/api/market/leadnest/64efeb32-ff92-4f26-9ab9-101dea01a110`, together with the checkout's own 402 response, both fetched 2026-10-27.
- **Outcome line:** "Launch an AI lead-capture service for contractors and get your first client live in 7 days." This follows the report's opening ("Getting started with an AI lead-capture and follow-up service for … contractors") and its chapter 5 title ("Build checklist: first client live in 7 days"). The earlier FAQ described the Playbook vaguely as an "introductory guide to our approach" and said results "depend on your business". It was rewritten to match what the report actually covers.
- **"Keep the other products below it":** the catalogue holds one product, so there is no other product to list. `products` in `src/main.tsx` renders every entry after the first in a "More from LeadNest" list under the hero; it stays hidden while empty. No product was invented. All other existing content stays below the product.
- **"Sell sell sell":** four buy buttons (header, hero, approach section, closing), the price on every full button, a purchase note, scannable facts and a real sample. There is no fake urgency, no counters and no testimonials.
- Static React/TypeScript/Vite export in `dist/`, `base: './'`, hash navigation. No wallet, backend or tracking.

## Better Interface coverage

| Domain | Status | What was checked |
| --- | --- | --- |
| Accessibility | Checked | One H1 (the product name) and labelled sections (`aria-labelledby`); the sample is an `ol` plus a `blockquote`; facts are a labelled list; native anchors and `details`. Keyboard: skip link, then focus goes to `main`, then the hero buy button with its 3px ring (scripted, plus a screenshot). Axe has 0 violations at 390 and 1440px with every FAQ open. Root text at 200% reflows at 390px. Reduced motion removes transitions and smooth scrolling. Targets are at least 44px. **Unperformed:** native screen reader, native browser zoom, physical device. |
| Layout | Checked | Order by importance: product, outcome, action, facts, then sample. Shared `.wrap` edges. Two-column hero above 42rem, one column below. No overflow at 320, 390, 672, 768, 896, 1120 and 1440px. 390 and 1440 screenshots and the full-page 390 render were viewed. |
| Writing | Checked | Same action label "Get the Playbook" everywhere. The outcome is one plain sentence. The H1 is the product name (4 words). Directions sit beside controls. Copy claims only what the preview supports, and the FAQ says the numbers aren't guaranteed and are marked [verify] in the report. |
| Typography | Checked | One family and three weights; 5 sizes at 390 and 6 at 1440 (probe). Tabular numerals in the facts and sample. Balanced headings and no ellipsis. |
| Colors | Checked | Existing tokens reused; orange is reserved for buy actions plus one decorative quote rule. Token contrast ratios are calculated in `DESIGN.md`. The probe's contrast check and axe color-contrast both passed on the render. |
| UI | Checked | Flat surfaces with no border+shadow combinations. Button hover, press and focus states are unchanged from the system. Transitions name their properties. The unused `--navy-800` token was removed with the book art. |

## Findings, fixes and rechecks

| # | Severity | Location | Evidence | Fix | Recheck |
| --- | --- | --- | --- | --- | --- |
| 1 | HIGH | `src/main.tsx` hero (previous revision) | The brief asks for the product first. Previously the H1 was a slogan ("More jobs. Less chasing."), the product was a 20px H2 under it, and there was no sample. | The H1 is now the product name, followed by the outcome line, buy button, facts and the `Sample` panel. | 390 × 844: the product, the button (y ≈ 322–378) and the "Look inside" heading are on the first screen (asserted in `check-export.mjs`; screenshot `screenshots/mobile-390.png`). |
| 2 | HIGH | `src/main.tsx:81` FAQ (previous revision) | The FAQ text didn't describe what the $9 report contains, how it is delivered or how it is paid for. | Answers rewritten from the preview: contents, Markdown download, 7-day link, USDC on Base, research date and [verify] caveat. | Text reviewed against the preview JSON. |
| 3 | MEDIUM | `src/styles.css` `.approach-layout` at 42rem | The 200% text check failed: `scrollWidth` 459 at 390px, caused by the new approach buy button widening a `1fr` track. | Track changed to `minmax(0, 1fr)`; `.approach-buy` is full width on phones. | Overflow scan returns `scrollWidth` 390; the validate step passes. |
| 4 | LOW | `index.html`, `src/assets/share-card.svg` | The title, description, og:title and share image still carried the old slogan. | Metadata and share card now lead with the product and its outcome; PNG regenerated at 1200 × 630. | Share image viewed; probe `share` passed; validate decodes 1200 × 630. |
| 5 | Accepted | `src/main.tsx:104` H1 | The probe's `glyphs` check flags the em dash in "LeadNest — The Playbook". | Not changed: it is the requester's exact product name. | Only remaining probe flag. |

## Executed verification

All runs were against the final source and the final `dist/`:

- `npm ci`: installed 75 packages.
- `npm run build` (`tsc --noEmit && vite build`): **passed**. JS 203.12 kB (63.98 kB gzip), CSS 14.53 kB.
- `npm run generate:share`: regenerated `public/og-image.png` (1200 × 630) and viewed it.
- `node scripts/check-export.mjs test/scratch/check`: **13 PASS, 0 failures**. It serves `dist/` under `/nested/leadnest/` and checks seven widths, the local font, four exact checkout URLs, first-screen product/action/sample at 390 × 844, three desktop nav links, mobile FAQ link, five FAQs by keyboard and pointer, axe at 390/1440, skip link and focus ring, favicon and og:image from a subpath, 200% root text, RTL mirror, reduced motion, an intercepted checkout navigation, and zero console/resource errors or external requests. Raw output: `interaction-results.json`.
- `node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste`: **15/16 passed**. Only `glyphs` failed (finding 5). First-screen prose was 22 words at 390 and 60 at 1440. Raw output: `taste.json`. The probe's 390 and 1440 screenshots were viewed; `screenshots/desktop-1440.png` is its 1440 shot.
- Screenshots: `screenshots/mobile-390.png`, `screenshots/desktop-1440.png`, `screenshots/keyboard-focus.png`.

## Remaining limits

- WebKit could not launch on this machine (missing `libgtk-4.so.1`, `libgraphene-1.0.so.0`), so there was no Safari-engine run.
- The interactive browser tool had no managed preview in this session. Rendered evidence comes from the bounded Playwright scripts and their screenshots, not from an interactive browser session.
- There was no physical phone, native screen reader, native 200% zoom, real payment or fulfillment test.
- The supplied checkout URL returns HTTP 402 JSON (an x402 payment request), even to a browser user agent. Whether that is a usable checkout for a visitor without an x402 client is up to the checkout service, not this export. The link is kept exactly as supplied.

**Completion:** complete for the stated scope, with the limitations above.

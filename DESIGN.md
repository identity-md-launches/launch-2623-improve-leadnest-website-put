# LeadNest design system

## Overview

LeadNest is a one-page sales site whose first job is to sell **LeadNest — The Playbook** ($9.00). The hero is the product. It shows the exact product name as the H1, the outcome buyers get in one line, the buy button with its price, three facts (3,567 words, 17 sections, 7-day launch checklist) and a **Look inside** sample panel. The trades, the LeadNest approach, FAQs and a closing offer sit below it. A buy button appears four times: in the header, the hero, the navy approach section and the closing section. The visual idea is a contractor's field guide: warm paper, dark navy, a repeating roof/nest mark and one orange purchase action.

The implementation lives in `src/main.tsx` and `src/styles.css`. The sample panel uses the report's real outline and opening line, from its public free preview, quoted rather than paraphrased. No photography, customer logos, invented testimonials, live activity or sales counters are used.

## Colors

Canonical primitives and semantic mappings are in `src/styles.css:8`. Components use semantic tokens.

| Semantic token | Value | Role |
| --- | --- | --- |
| `--color-bg` | `#f7f7f0` | Main paper background |
| `--color-surface` | `#efefe5` | Sample panel and trade section |
| `--color-line` | `#deded2` | Structural dividers, sample rows, facts rule |
| `--color-text` | `#14282d` | Primary text, button labels, brand, fact numbers |
| `--color-text-secondary` | `#5d6468` | Supporting copy, "LeadNest —" line of the H1, sample numbers |
| `--color-text-inverse` | `#f7f7f0` | Text on navy |
| `--color-text-inverse-secondary` | `#c7d0ce` | Supporting text on navy |
| `--color-bg-inverse` | `#14282d` | Approach section |
| `--color-inverse-line` | `#334447` | Dividers on navy |
| `--color-accent` | `#ff834a` | Purchase button background; sample quote rule |
| `--color-accent-hover` | `#ff925f` | Purchase hover background |
| `--color-accent-active` | `#ed7139` | Purchase pressed background |
| `--color-art` | `#ffb08a` | Text selection |
| `--color-focus` | `#086c95` | Focus perimeter on paper |
| `--color-focus-inverse` | `#ff925f` | Focus perimeter on navy |

There is one light theme with one navy section, and no theme switch or status palette. Orange fills always mean "buy". The only other orange is the 3px rule beside the sample quote, which is decorative.

Contrast ratios, calculated with the WCAG formula from the token hex values: primary text/paper **14.23:1**, primary text/surface **13.24:1**, secondary text/paper **5.60:1**, secondary text/surface **5.20:1**, primary text/orange **6.27:1**, hover **6.95:1**, pressed **5.12:1**, inverse secondary/navy **9.73:1**, focus ring/paper **5.44:1**, inverse focus ring/navy **6.95:1**. In the rendered export, the taste@1 probe's contrast check and axe's color-contrast rule both passed at 390 and 1440px. These are calculations and automated checks, not a pixel-level analysis.

## Typography

One self-hosted family: `Manrope Variable`, with Arial and sans-serif fallbacks. `@font-face` loads the Latin WOFF2 from `@fontsource-variable/manrope` through Vite, with `font-display: swap`. The interface uses only weights **400, 600 and 700**. The delivered font is about 25 kB. Its license is in `licenses/manrope.txt`.

| Token | Desktop | Role |
| --- | --- | --- |
| `--text-small` | 14px / .875rem | Navigation, notes, fact labels, sample caption |
| `--text-body` | 16px / 1rem | Body, buttons, FAQ controls, sample rows |
| `--text-lead` | 20px / 1.25rem | Hero outcome line, fact numbers, item headings |
| `--text-title` | 28px / 1.75rem | Brand, "Look inside" and smaller section headings |
| `--text-section` | 40px / 2.5rem | Main section headings |
| `--text-display` | 80px / 5rem | H1 (product name) |

Display size becomes 64px at 70rem and 48px at 56rem. Section size becomes 28px at 42rem. The hero outcome drops to 16px at 56rem. Sample rows are 14px between 42rem and 56rem, where the panel is narrow. The probe measured 5 sizes at 390px (14, 16, 20, 28, 48) and 6 at 1440px (14, 16, 20, 28, 40, 80).

The H1 is two lines: "LeadNest —" in secondary color (a block `span`), then "The Playbook" in primary color. It uses line-height 1.04 and tracking −.065em. H2 uses 1.2 and −.045em, with component overrides for smaller headings. H3 uses 1.4 and −.025em. Body uses 1.6, and buttons, summaries and sample rows use 1.5. Numbers in the facts and sample use `tabular-nums`. Headings balance, paragraphs use pretty wrapping, and no text is ellipsized. The outcome line is capped at 34ch.

## Layout

`.wrap` is the shared alignment primitive: maximum 1248px, with 48px side allowances on wide screens, 32px below 70rem and 20px below 42rem. Properties use logical block/inline directions.

Spacing tokens `--space-1` through `--space-7` are **8, 16, 24, 32, 48, 64 and 96px**. The hero uses 64px top and 96px bottom padding on desktop. Wide sections use 96px block padding and phone sections use 48px. Sample rows use 10px block padding with thin rules. Trade items are open columns, not cards.

| Breakpoint | Implemented behavior |
| --- | --- |
| Above 70rem | Hero in two columns (copy 1.1fr, sample 1fr, 64px gap); four trade columns; two-column approach/FAQ; full navigation and outlined header buy button |
| At 70rem (1120px) | Display 64px, 32px margins, 48px hero gap, sample padding 32px |
| At 56rem (896px) | Nav links hide (header buy button stays); display 48px; outcome 16px; sample padding 24px with 14px rows; trades in two columns |
| At 42rem (672px) | Everything single column. Header shows the brand and a 44px FAQ link. The hero and approach buy buttons span the content width, the facts spread across one row, and the sample follows the facts |

On phones the reading order is product name, outcome, buy button, purchase note, facts, then the sample. At 390 × 844 the buy button sits at about y=322–378 and the "Look inside" heading is also on the first screen. Grid tracks use `minmax(0, 1fr)` so long buttons and enlarged text shrink instead of overflowing; this was verified with root text at 200%. There is no sticky overlay, carousel or horizontal scrolling surface.

## Elevation & Depth

The interface is flat: no shadows. Rules provide structure, and the surface panel, navy section and paper separate the sections. No surface combines border and shadow, and no text uses gradients.

## Shapes

Controls use `--radius-control: .375rem` (6px). The sample panel uses a 2px radius. The nest mark is three stacked chevrons, also used as the favicon. Icons are original 24px inline SVG with `currentColor`, 1.75px strokes and rounded caps; trade icons render at 32px. Decorative SVGs are `aria-hidden`.

## Components

- **`products` catalogue** (`src/main.tsx:29`): name, price, buy URL and one-line outcome. The first entry (`featured`) drives the hero. Any further entries render under the hero in a "More from LeadNest" list (`src/main.tsx:117`), each with its own `BuyLink`. There is one product today, so that list does not render.
- **`BuyLink`** (`src/main.tsx:34`): a native anchor to the product's checkout. The default is orange, at least 56px tall, with label, price and arrow. `compact` gives the 46px outlined header variant without price. Hover lightens the fill and pressing darkens it. The focus outline is 3px, offset 5px. On phones the hero and approach instances are full width.
- **Hero** (`src/main.tsx:102`): the H1 product name, the outcome line (`featured.outcome`), the buy button, a purchase note with a check icon ("One-time $9.00. Download right after payment."), and a facts list (`ul` with `aria-label="What you get"`).
- **`Sample`** (`src/main.tsx:55`): a labelled `section#sample` on the surface color. It holds an `ol` of the report's numbered chapters 01–09, plus one indented, unnumbered subsection in secondary color. Below that is a `blockquote` of the report's opening line with an orange rule, and a note with the section count and research date.
- **Brand / `NestMark`** (`src/main.tsx:22`): an unboxed home link with an accessible name; the mark is hidden from assistive technology.
- **Trade list**: a semantic list with icon, title and description; four, two or auto-fit columns.
- **Approach steps**: an ordered list numbered 01–03 on navy, followed by a buy button.
- **FAQ disclosure** (`src/main.tsx:138`): native `details`/`summary`, five items. Pointer, Enter and Space toggle them, and several can stay open. The plus icon rotates 45° when open.
- **Navigation / skip link** (`src/main.tsx:91`): hash anchors (`#sample`, `#trades`, `#faq`) that work on static subpaths. "Skip to content" is the first keyboard stop; the next Tab lands on the hero buy button.

There are no forms, dialogs, wallet controls, disabled states or backend-dependent states. Checkout and fulfillment belong to the external service. Transitions cover only background color and transform, at 150ms `cubic-bezier(.2, 0, 0, 1)`, and only under `prefers-reduced-motion: no-preference`. Pressing scales to .96. Hover styles need a real hover device. In forced-colors mode, focus uses the system Highlight color and the buy button gets a ButtonText border.

## Do's and Don'ts

Keep the featured product, its outcome and its buy button first in the phone reading order. Reuse `BuyLink` so URL and price stay consistent, and add any new product to `products` with its real name, price, outcome and checkout URL. Keep the sample quoted from the actual report, and update `contents`, the facts and the FAQ answers together if the report changes. Preserve the exact product name, including its em dash.

Don't add extra font families, decorative badges, claim counters, fake urgency, sticky bars over content or wallet infrastructure. Don't paraphrase the sample as if it were a quote. Validate the rebuilt `dist/` at a nested path (`npm run validate`) after changing components.

Design guidance: Jakub Krehel's Better Interface, MIT, pinned commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`. Documentation method: Paul Bakaus's Impeccable, Apache-2.0, pinned commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`. Preserved notices and licenses: `licenses/design-guidance.txt`. Review evidence and limits: `docs/review/validation.md`.

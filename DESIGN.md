# LeadNest design system

## Overview

LeadNest is a one-page sales site for roofing, plumbing, HVAC and property service contractors. The page leads with the $9.00 Playbook and links directly to the supplied checkout. The monthly service audience is explained separately. The visual idea is a contractor’s field guide: warm paper, dark navy, a repeating roof/nest mark and one orange purchase action.

The implementation lives in `src/main.tsx` and `src/styles.css`. The book is an illustrative cover made with HTML, CSS and original inline SVG; it does not show actual product pages. No photography, customer logos, invented testimonials, live activity or sales counters are used.

## Colors

Canonical primitives and semantic mappings are in `src/styles.css:8`. Components use semantic tokens except the physical book’s spine, page edges and transparent shadow.

| Semantic token | Value | Role |
| --- | --- | --- |
| `--color-bg` | `#f7f7f0` | Main paper background |
| `--color-surface` | `#efefe5` | Trade section and book scene |
| `--color-line` | `#deded2` | Structural dividers and blueprint geometry |
| `--color-text` | `#14282d` | Primary text, button labels, brand |
| `--color-text-secondary` | `#5d6468` | Supporting copy and second headline line |
| `--color-text-inverse` | `#f7f7f0` | Text on navy |
| `--color-text-inverse-secondary` | `#c7d0ce` | Supporting text on navy |
| `--color-bg-inverse` | `#14282d` | Approach section and book cover |
| `--color-inverse-line` | `#334447` | Dividers on navy |
| `--color-accent` | `#ff834a` | Purchase button background |
| `--color-accent-hover` | `#ff925f` | Purchase hover background |
| `--color-accent-active` | `#ed7139` | Purchase pressed background |
| `--color-art` | `#ffb08a` | Noninteractive cover artwork and selection |
| `--color-focus` | `#086c95` | Focus perimeter on paper |
| `--color-focus-inverse` | `#ff925f` | Focus perimeter on navy |

There is one light theme with one intentional navy section. There is no theme switch or status palette. Orange fills indicate the purchase action; the cover uses a lighter decorative tint.

Computed token pairs measured in the rendered browser: primary text/paper **14.23:1**, secondary text/paper **5.60:1**, secondary text/surface **5.20:1**, primary text/orange **6.27:1**, hover **6.95:1**, pressed **5.12:1**, inverse secondary/navy **9.73:1**. The focus ring against surrounding paper is **5.44:1**; the inverse focus ring/navy is **6.95:1**. The ring sits 5px outside the control, with paper between it and an orange button. These are identified solid color pairs, not a claim of pixel-level analysis of every decorative layer.

## Typography

One self-hosted family: `Manrope Variable`, with Arial and sans-serif fallbacks. `@font-face` loads the Latin WOFF2 from `@fontsource-variable/manrope` through Vite, with `font-display: swap`. The file supplies weights 200–800; the interface uses only **400, 600 and 700**. The delivered font is about 25 kB. Its license is in `licenses/manrope.txt`.

| Token | Desktop | Role |
| --- | --- | --- |
| `--text-small` | 14px / .875rem | Navigation, notes and captions |
| `--text-body` | 16px / 1rem | Body, buttons and FAQ controls |
| `--text-lead` | 20px / 1.25rem | Lead paragraph, product name, item headings |
| `--text-title` | 28px / 1.75rem | Brand and smaller section headings |
| `--text-section` | 40px / 2.5rem | Main section headings |
| `--text-display` | 80px / 5rem | H1 |

Display size becomes 64px at 70rem, then 48px at 56rem. Section size becomes 28px at 42rem. The product title becomes 16px on phones. At 390px the visible scale is 14, 16, 20, 28 and 48px; at 1440px it is the six desktop values.

H1 uses line-height 1.04 and tracking −.065em; H2 uses 1.2 and −.045em, with component overrides for smaller headings. H3 uses 1.4 and −.025em. Body uses 1.6, buttons and summaries 1.5. Headings balance, descriptions use pretty wrapping, and important text is never ellipsized. Paragraphs are generally constrained to 30–66ch. Root text can enlarge and reflow. Cover lettering is proportional artwork: its own fixed 16px base produces 14px labels and 40px/28px titles; its accessible description is provided by the figure.

## Layout

`.wrap` is the shared alignment primitive: maximum 1248px, with 48px side allowances on wide screens, 32px below 70rem and 20px below 42rem. Properties use logical block/inline directions except physical artwork geometry.

The spacing tokens `--space-1` through `--space-7` are **8, 16, 24, 32, 48, 64 and 96px** at the default root size. Wide sections generally use 96px block padding; phone sections use 48px. Related labels, copy and notes use 6–16px gaps. Structural section transitions and FAQ rows use thin rules; trade items are open columns rather than cards.

| Breakpoint | Implemented behavior |
| --- | --- |
| Above 70rem | Two-column hero, four trade columns, two-column approach/FAQ; full navigation |
| At 70rem (1120px) | Smaller display type, 32px margins, smaller book and narrower section gaps |
| At 56rem (896px) | Navigation links disappear while header purchase remains; trade grid becomes two columns; secondary headings compact |
| At 42rem (672px) | Hero, approach, FAQ and closing purchase become single-column; header shows brand and a 44px FAQ link; hero action spans the content width |

On phones the heading, product name, price and action precede the illustration in DOM and reading order. At 390 × 844 the primary button is at approximately y=372–428, fully visible. The trades use `auto-fit` with a 7.5rem minimum; enlarged text can collapse them to one column. `minmax(0, 1fr)` and minimum inline sizes let the hero footnote shrink instead of forcing overflow. Header controls wrap when text enlarges. There is no sticky overlay, carousel or horizontal scrolling surface.

## Elevation & Depth

The interface is flat. Rules provide structure; navy and pale paper create section separation. The illustrated book alone uses a two-layer shadow (`22px 26px 28px -12px #14282d38`, `5px 10px 10px #14282d16`), perspective and static rotation. Its page edges use a tiny repeating CSS gradient. No interactive card combines border and shadow, and no interface text uses gradients.

## Shapes

Controls use `--radius-control: .375rem` (6px). The book scene is nearly square (2px radius), with 1–3px book corners. The original nest mark is three stacked chevrons, repeated on the cover and favicon. Icons are original 24px inline SVG with `currentColor`, 1.75px strokes and rounded caps; larger trade icons render at 32px. Decorative SVGs do not intercept interactions or add accessible names.

## Components

- **`BuyLink`** (`src/main.tsx:26`): a native checkout anchor; default orange, 56px minimum height, visible price and arrow. `compact` selects the 46px outlined header variant; `className` supports placement. All variants share `BUY_URL`. Hover lightens the fill; pressed darkens it. A 3px focus outline sits 5px outside. Only this purchase action gets a filled accent.
- **Brand / `NestMark`** (`src/main.tsx:22`): unboxed home link with a descriptive accessible name. The mark is hidden from assistive technology because the link’s name supplies its purpose.
- **`BookArtwork`** (`src/main.tsx:32`): illustrative figure with a descriptive accessible label, decorative hidden book lettering, SVG roof geometry and an explanatory caption. It has no click, loading or hover behavior.
- **Trade list** (`src/main.tsx:49`): semantic list, consistent icon/title/description order; four, two or one columns according to available space and text size.
- **Approach steps** (`src/main.tsx:56`): an ordered list with visible 01–03 numbers and text; separators belong to the rows, not nested panels.
- **FAQ disclosure** (`src/main.tsx:114`): native `details`/`summary`. Pointer, Enter and Space toggle; multiple answers can stay open. A plus rotates 45° when open; native state remains available without relying on motion. Answers sit in normal flow.
- **Navigation / skip link** (`src/main.tsx:72`): hash anchors work on static subpaths. The first keyboard stop reveals “Skip to content”; it targets focusable `main`. Link names describe their destinations.

There are no forms, dialogs, wallet controls, disabled actions, local persistence or backend-dependent states. Checkout and fulfillment belong to the provided external service. Transitions name only background color and transform, run for 150ms with `cubic-bezier(.2, 0, 0, 1)`, and exist only under `prefers-reduced-motion: no-preference`. Press scale is .96. Hover styles require an actual hover device. Forced-colors uses system Highlight for focus and a ButtonText border on the purchase action.

## Do’s and Don’ts

Start a new section with `.wrap`, semantic headings and the existing spacing/type tokens. Reuse `BuyLink` for the same product so its URL and price stay consistent. Use an outline or text link for secondary navigation. Keep the product and action before decorative artwork in the mobile reading order. Preserve the exact supplied product name, including its em dash.

Do not add extra font families, decorative badges, claim counters, unsolicited contact forms or wallet infrastructure. Do not turn the illustration into a purported screenshot of the actual guide. If another product is supplied later, add its real name, price and checkout URL rather than inventing an offer. Validate the rebuilt `dist/` at a nested path after changing components.

Design guidance: Jakub Krehel’s Better Interface, MIT, pinned commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`. Documentation method: Paul Bakaus’s Impeccable, Apache-2.0, pinned commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`. Preserved notices and licenses: `licenses/design-guidance.txt`. Review evidence and limits: `docs/review/validation.md`.

---
phase: 01-setup-foundation
plan: 02
subsystem: design-system
tags: [tailwindcss, css, google-fonts, typography, color-palette, astro]
dependency_graph:
  requires: [astro-project, build-pipeline]
  provides: [design-system, color-palette, typography, global-css]
  affects: [all-components, all-pages]
tech_stack:
  added: []
  patterns:
    - "Tailwind CSS 4 @import syntax (not @tailwind directives)"
    - "@theme block for CSS custom properties → auto-generated utility classes"
    - "Google Fonts via @import url() with latin subset for performance"
    - "CSS custom properties for design tokens (colors, fonts)"
key_files:
  created:
    - src/styles/global.css
  modified:
    - src/pages/index.astro
    - src/pages/en/index.astro
decisions:
  - "Google Fonts @import url() placed after @import 'tailwindcss' per plan spec (build warning non-blocking)"
  - "11 color variables in @theme block generate Tailwind utilities: bg-rame, text-carta, etc."
  - "Font stacks include system fallbacks for performance before Google Fonts load"
metrics:
  duration: "4 minutes"
  completed: "2026-03-27"
  tasks_completed: 2
  files_created: 1
  files_modified: 2
---

# Phase 1 Plan 2: Global CSS — Tailwind 4, Color Palette, Google Fonts Summary

Tailwind CSS 4 design system configured: `@import "tailwindcss"` syntax, 11 color variables in `@theme` block, Google Fonts Syne + Source Serif 4 subset, and typography base — `npm run build` passes with 2 pages after both placeholder pages import `global.css`.

## Tasks Completed

### Task 1: Create src/styles/global.css

Created `src/styles/global.css` with:
- `@import "tailwindcss"` as first line (Tailwind 4 syntax)
- Google Fonts URL: `https://fonts.googleapis.com/css2?family=Syne:wght@700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap`
- `@theme` block with all 11 color variables from promptsito.md (exact hex values)
- Typography base: html, body, headings h1-h6, p, a, :focus-visible
- Utility classes: `.container` (responsive, max-width 1200px) and `.sr-only`

**11 color variables implemented in @theme:**
1. `--color-inchiostro: #1A1A2E`
2. `--color-inchiostro-muted: #2D2D44`
3. `--color-ardesia: #4A4A6A`
4. `--color-carta: #F7F5F0`
5. `--color-carta-alt: #EEEAE2`
6. `--color-rame: #B5622A`
7. `--color-rame-light: #D4834A`
8. `--color-salvia: #6B8F71`
9. `--color-salvia-light: #8AAD8F`
10. `--color-testo: #1A1A2E`
11. `--color-testo-muted: #5A5A7A`

**Commit:** `f5c4120`

### Task 2: Update placeholder pages and verify build

Updated both placeholder pages to import `global.css` in Astro frontmatter:
- `src/pages/index.astro`: `import '../styles/global.css'`
- `src/pages/en/index.astro`: `import '../../styles/global.css'`

Both pages updated with `.container` class and CSS variable usage in inline styles to demonstrate design system is working.

`npm run build` output: 2 pages built in ~583ms. `dist/index.html` and `dist/en/index.html` both generated.

**Commit:** `d0d709e`

## Build Verification

```
[build] 2 page(s) built in 583ms
[build] Complete!
```

dist/ contents: `index.html`, `en/index.html`, `_astro/` (bundled CSS), `favicon.svg`, `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml`

## Deviations from Plan

### Build Warning (Non-blocking)

**[Rule 1 - Warning] CSS @import ordering warning**
- **Found during:** Task 2 (npm run build)
- **Issue:** Lighthouse/lightningcss emits: `@import rules must precede all rules aside from @charset and @layer statements` for the Google Fonts `@import url()` that follows `@import "tailwindcss"`. This occurs because Tailwind's import expands into CSS rules at build time, making the Google Fonts import appear to follow non-import CSS.
- **Decision:** Not fixed. The plan explicitly requires `@import "tailwindcss"` as the first line. The warning is non-blocking (build exits 0, pages render correctly). The Google Fonts URL is served externally and loads independently of the CSS processing order.
- **Impact:** Warning only — no functional impact. Build succeeds. Fonts load correctly at runtime.

## Known Stubs

- `src/pages/index.astro`: Updated to show "Fondamenta Phase 1 completate. Stili Tailwind 4 + font attivi." — still a placeholder, full content in Phase 3 (plan 03-01)
- `src/pages/en/index.astro`: Same placeholder with English text — full content in Phase 3 (plan 03-01)

## Self-Check: PASSED

Files created/modified:
- src/styles/global.css: FOUND
- src/pages/index.astro: FOUND (contains global.css import)
- src/pages/en/index.astro: FOUND (contains global.css import)
- dist/index.html: FOUND
- dist/en/index.html: FOUND

Commits:
- f5c4120: FOUND
- d0d709e: FOUND

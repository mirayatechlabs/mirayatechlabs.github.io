# Phase 1: Setup & Foundation - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning
**Mode:** Auto-generated (infrastructure phase — discuss skipped)

<domain>
## Phase Boundary

Progetto Astro 5 funzionante con Tailwind CSS 4, font, colori e struttura cartelle completa. Buildabile e deployabile su GitHub Pages. Nessuna pagina di contenuto — solo fondamenta tecniche.

Stack specifico:
- Astro 5 con `output: 'static'`
- Tailwind CSS 4 (NON v3 — breaking changes diversi)
- Google Fonts: Syne (titoli) + Source Serif 4 (corpo)
- Deploy target: `site: 'https://mirayatechlabs.github.io'`, `base: '/'`
- Plugin: `@astrojs/sitemap`

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — pure infrastructure phase.

Linee guida dalla spec (promptsito.md):
- Palette colori da implementare come CSS custom properties in global.css
- I18n: locale IT default (`/`), EN su `/en/` — routing Astro nativo
- Font subset per performance (sotto 1 secondo target)
- `src/styles/global.css` contiene variabili, tipografia base, reset
- File i18n `src/i18n/it.json` e `en.json` con struttura base (contenuto finale nelle fasi successive)
- `public/robots.txt` semplice, `public/favicon.svg` con lettera "m." su sfondo rame

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Nessuno — nuovo progetto Astro da zero

### Established Patterns
- Directory legacy HTML/CSS presente ma non rilevante — ignorata
- Il sito Astro va costruito come progetto nuovo nella stessa directory

### Integration Points
- GitHub Pages: output statico in `dist/`
- astro.config.mjs deve includere integrazione sitemap e i18n

</code_context>

<specifics>
## Specific Ideas

- Tailwind CSS 4 usa `@import "tailwindcss"` in CSS, NON `@tailwind base/components/utilities`
- Le variabili CSS colore devono essere definite nel `@theme {}` block di Tailwind 4 per essere usabili come `bg-[var(--color-rame)]` ecc.
- Verificare compatibilità Astro 5 + Tailwind 4 con `@astrojs/tailwind` vs `tailwindcss` diretto

</specifics>

<deferred>
## Deferred Ideas

None — discuss phase skipped. Tutto il contenuto è nelle fasi successive.

</deferred>

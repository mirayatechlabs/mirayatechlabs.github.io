# mirayatechlabs.github.io

## What This Is

Sito statico Astro 5 — fronte commerciale di Tatiana Camillucci, AI consultant che vende servizi di automazione e presenza digitale a PMI italiane (10-200 dipendenti, prevalentemente nelle Marche). Il sito deve sembrare costruito da una persona con gusto, non generato: tono diretto, competente, umano. NON corporate.

## Core Value

Un visitatore PMI capisce in 10 secondi cosa offre Tatiana, quanto costa, e come contattarla — senza marketing bullshit.

## Requirements

### Validated

(Nessuno ancora — da validare con la build)

### Active

- [ ] Setup progetto Astro 5 + Tailwind CSS 4 deployabile su GitHub Pages
- [ ] Componenti condivisi: Navbar, Footer, SEO, layout base
- [ ] Homepage IT/EN con hero, chi c'è dietro, servizi preview, prezzi rapidi
- [ ] Pagina Servizi IT/EN con 4 livelli + metodologia
- [ ] Configuratore IT/EN: form multi-step con mailto (4 step, JS vanilla)
- [ ] Pagina Contatti IT/EN — solo email diretta, no form
- [ ] i18n Astro nativo — IT default, EN su /en/
- [ ] SEO: title/meta unici per pagina, sitemap XML, robots.txt, OG tags
- [ ] Design system: palette rame/carta/inchiostro, Syne + Source Serif 4

### Out of Scope

- Backend / server-side — sito completamente statico, mailto per il form
- Immagini AI-generated — solo div placeholder colorati
- JS frameworks (React, Vue) — solo Astro components + JS vanilla
- Analytics, CMS, auth — fuori scope v1
- Il vecchio sito HTML/CSS legacy — ignorato, non migrato

## Context

- **Stack**: Astro 5 (SSG, output: static), Tailwind CSS 4, Google Fonts (Syne + Source Serif 4)
- **Deploy**: GitHub Pages — `site: 'https://mirayatechlabs.github.io'`, `base: '/'`
- **Directory**: contiene HTML/CSS legacy — non da migrare, ignorato durante la build Astro
- **Spec completa**: `promptsito.md` nella root del progetto — fonte primaria di tutti i requisiti
- **Tatiana Camillucci**: ex ostetrica, antropologa, developer/AI consultant — il background è il posizionamento
- **Target**: PMI italiane 10-200 dipendenti, Marche e dintorni

## Constraints

- **Tech Stack**: Astro 5 + Tailwind 4 — versioni specifiche, non downgrade
- **Deploy**: GitHub Pages SSG — nessun server-side rendering
- **Font**: Syne (titoli) + Source Serif 4 (corpo) via Google Fonts
- **Lingua**: IT default (`/`), EN su `/en/` — routing Astro i18n nativo
- **Form**: mailto: only — zero backend
- **Performance**: sotto 1 secondo su connessione media, font subset
- **Accessibilità**: WCAG AA contrasto, alt text, navigazione tastiera
- **Tono**: ZERO AI slop — lista parole vietate in promptsito.md

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro 5 SSG | GitHub Pages richiede output statico, nessun server | — Pending |
| Tailwind CSS 4 | Versione moderna, CSS custom properties native | — Pending |
| mailto: per il form | Zero infrastruttura backend richiesta | — Pending |
| Legacy HTML ignorato | Non è una migrazione — è un nuovo progetto parallelo | — Pending |

---
*Last updated: 2026-03-26 — project initialization*

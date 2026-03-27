# Roadmap: mirayatechlabs.github.io

## Overview

Costruzione di un sito statico Astro 5 per mirayatechlabs.github.io — fronte commerciale di Tatiana Camillucci, AI consultant per PMI italiane. 4 fasi: setup tecnico → componenti → pagine → configuratore+deploy.

## Phases

- [x] **Phase 1: Setup & Foundation** - Progetto Astro 5 + Tailwind 4 buildabile e deployabile (completed 2026-03-27)
- [ ] **Phase 2: Layout & Componenti** - Tutti i componenti condivisi + i18n IT/EN
- [ ] **Phase 3: Homepage & Servizi** - Pagine principali complete in IT e EN
- [ ] **Phase 4: Configuratore, Contatti, SEO & Deploy** - Form multi-step, contatti, SEO, deploy GitHub Pages

## Phase Details

### Phase 1: Setup & Foundation
**Goal**: Progetto Astro 5 funzionante con Tailwind CSS 4, font, colori e struttura cartelle completa. Buildabile e deployabile su GitHub Pages.
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, SETUP-06
**Success Criteria** (what must be TRUE):
  1. `npm run build` completa senza errori con output statico
  2. `npm run dev` serve il sito su localhost
  3. I font Syne e Source Serif 4 sono caricati
  4. Le CSS custom properties (--color-rame, --color-carta, ecc.) sono definite e accessibili
  5. La struttura cartelle src/pages, src/components, src/layouts, src/i18n, src/styles esiste
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Inizializzazione Astro 5 + Tailwind CSS 4 + struttura cartelle + public assets
- [x] 01-02-PLAN.md — global.css con Tailwind 4, palette colori @theme, Google Fonts, import nelle pagine

### Phase 2: Layout & Componenti
**Goal**: Tutti i componenti riusabili pronti: Navbar, Footer, SEO, BaseLayout, ServiceCard, PricingCard, Hero. Sistema i18n IT/EN funzionante.
**Depends on**: Phase 1
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, I18N-01, I18N-02, I18N-03, I18N-04
**Success Criteria** (what must be TRUE):
  1. Navbar si renderizza correttamente su mobile e desktop con hamburger JS vanilla
  2. Toggle IT/EN porta alla versione corretta della pagina corrente
  3. ServiceCard mostra hover lift + border rame on hover
  4. Footer ha sfondo inchiostro, testo carta
  5. SEO component inietta title e meta description corretti per ogni pagina
**Plans**: TBD

Plans:
- [ ] 02-01: BaseLayout + Navbar + Footer + SEO component
- [ ] 02-02: Hero + ServiceCard + PricingCard components + i18n it.json/en.json

### Phase 3: Homepage & Servizi
**Goal**: Le due pagine principali — homepage e servizi — complete in IT e EN, con tutti i contenuti della spec, passando per i18n.
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06
**Success Criteria** (what must be TRUE):
  1. Homepage IT mostra hero con H1, 3 card servizi, 2 pricing card, sezione Tatiana con placeholder foto
  2. Homepage EN raggiungibile su /en/ con stessi contenuti in inglese
  3. Pagina Servizi mostra 4 livelli come percorso progressivo + 4 step "Come lavoro"
  4. Nessun testo AI slop (no "nel panorama odierno", "su misura", "a 360 gradi", ecc.)
  5. Tutte le CTA linkano alle pagine corrette (/configuratore, /servizi, /contatti)
**Plans**: TBD

Plans:
- [ ] 03-01: Homepage IT + EN (index.astro + en/index.astro)
- [ ] 03-02: Pagina Servizi IT + EN (servizi.astro + en/services.astro)

### Phase 4: Configuratore, Contatti, SEO & Deploy
**Goal**: Configuratore multi-step con mailto, pagina contatti, SEO completo per tutte le pagine, sitemap, deploy verificato su GitHub Pages.
**Depends on**: Phase 3
**Requirements**: CONF-01..09, CONT-01..06, SEO-01..05
**Success Criteria** (what must be TRUE):
  1. Configuratore mostra progress 1/4 → 4/4, navigazione avanti/indietro JS vanilla funziona
  2. Submit genera mailto: precompilato con tutti i campi, messaggio conferma visibile
  3. Pagina contatti ha email cliccabile, LinkedIn e Calendly placeholder
  4. Ogni pagina ha title e meta description unici (8 pagine = 8 set)
  5. Sitemap.xml generata correttamente da @astrojs/sitemap
  6. `npm run build` + `npm run preview` mostra sito completo funzionante
**Plans**: TBD

Plans:
- [ ] 04-01: Configuratore IT + EN (configuratore.astro + en/configurator.astro) con JS vanilla
- [ ] 04-02: Contatti IT + EN + SEO completo + sitemap + robots.txt + favicon

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Setup & Foundation | 2/2 | Complete   | 2026-03-27 |
| 2. Layout & Componenti | 0/2 | Not started | - |
| 3. Homepage & Servizi | 0/2 | Not started | - |
| 4. Configuratore, Contatti, SEO & Deploy | 0/2 | Not started | - |

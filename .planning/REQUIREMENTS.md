# Requirements: mirayatechlabs.github.io

**Defined:** 2026-03-26
**Core Value:** Un visitatore PMI capisce in 10 secondi cosa offre Tatiana, quanto costa, e come contattarla — senza marketing bullshit.

## v1 Requirements

### Setup

- [x] **SETUP-01**: Progetto Astro 5 inizializzato con `output: 'static'` e config GitHub Pages
- [ ] **SETUP-02**: Tailwind CSS 4 configurato con custom properties palette colori
- [ ] **SETUP-03**: Google Fonts integrati (Syne + Source Serif 4) con font subsetting
- [ ] **SETUP-04**: Global CSS con variabili colore e tipografia base
- [x] **SETUP-05**: `public/robots.txt` e `public/favicon.svg` (lettera "m." su sfondo rame)
- [x] **SETUP-06**: Struttura cartelle completa come da spec

### Componenti

- [ ] **COMP-01**: `Navbar.astro` — logo "mirayatechlabs.", nav links IT, toggle IT/EN, hamburger mobile
- [ ] **COMP-02**: `Footer.astro` — copyright, email, LinkedIn, sfondo inchiostro
- [ ] **COMP-03**: `SEO.astro` — title, meta description, OG tags — parametrizzati per pagina
- [ ] **COMP-04**: `BaseLayout.astro` — layout condiviso con Navbar, Footer, SEO, font
- [ ] **COMP-05**: `ServiceCard.astro` — card con hover lift, border rame on hover
- [ ] **COMP-06**: `PricingCard.astro` — card prezzi con CTA al configuratore
- [ ] **COMP-07**: `Hero.astro` — hero homepage con titolo, sottotitolo, 2 CTA

### i18n

- [ ] **I18N-01**: File `src/i18n/it.json` con tutte le stringhe UI e testi pagine IT
- [ ] **I18N-02**: File `src/i18n/en.json` con traduzioni EN naturali (non letterali)
- [ ] **I18N-03**: Routing `/` → IT, `/en/` → EN configurato in `astro.config.mjs`
- [ ] **I18N-04**: Toggle navbar mantiene la pagina corrente cambiando lingua

### Homepage

- [ ] **HOME-01**: Hero — titolo, sottotitolo, 2 CTA (configuratore + servizi)
- [ ] **HOME-02**: Sezione "Chi c'è dietro" — testo Tatiana + foto placeholder div 280×280
- [ ] **HOME-03**: Sezione "Cosa puoi ottenere" — 3 card orizzontali
- [ ] **HOME-04**: Sezione prezzi rapida — 2 card (Base 800€ + Pro 1200€) con CTA configuratore
- [ ] **HOME-05**: CTA finale → /contatti
- [ ] **HOME-06**: Homepage EN `/en/` con stessi contenuti in inglese

### Servizi

- [ ] **SERV-01**: Intro testuale + 4 livelli di servizio come percorso progressivo
- [ ] **SERV-02**: Livello 1 Presenza (da 800€), Livello 2 Comunicazione (+200-300€/anno)
- [ ] **SERV-03**: Livello 3 Processi (da 100€/mese), Livello 4 AI sul dato (preventivo)
- [ ] **SERV-04**: Sezione "Come lavoro" — 4 step testuali semplici
- [ ] **SERV-05**: CTA → /configuratore
- [ ] **SERV-06**: Pagina EN `/en/services`

### Configuratore

- [ ] **CONF-01**: Progress bar step 1/4 → 4/4 visibile
- [ ] **CONF-02**: Step 1 — Nome azienda, Settore (select 8 opzioni), Dipendenti (select 4 fasce)
- [ ] **CONF-03**: Step 2 — Textarea "cosa ti fa perdere tempo", radio "hai un sito?"
- [ ] **CONF-04**: Step 3 — Selezione visuale Base (800€+350€/anno) vs Pro (1200€+600€/anno) + checkbox consulenza
- [ ] **CONF-05**: Step 4 — Nome, Email (required), Telefono (optional), preferenza contatto (radio)
- [ ] **CONF-06**: Submit con `mailto:` precompilato con tutti i dati del form
- [ ] **CONF-07**: Navigazione avanti/indietro JS vanilla, tutto su una pagina
- [ ] **CONF-08**: Messaggio conferma post-submit: "Ricevuto. Ti rispondo entro 24 ore — di solito prima."
- [ ] **CONF-09**: Pagina EN `/en/configurator`

### Contatti

- [ ] **CONT-01**: Testo, email in chiaro `ciao@mirayatechlabs.it` (mailto link)
- [ ] **CONT-02**: LinkedIn placeholder link
- [ ] **CONT-03**: Messaggio "Rispondo entro 24 ore nei giorni lavorativi. Spesso prima."
- [ ] **CONT-04**: Sezione "Preferisci una call?" con Calendly placeholder
- [ ] **CONT-05**: NO form — solo contatto diretto
- [ ] **CONT-06**: Pagina EN `/en/contact`

### SEO & Deploy

- [ ] **SEO-01**: Title e meta description unici per ogni pagina (IT + EN = 8 set)
- [ ] **SEO-02**: Un solo H1 per pagina
- [ ] **SEO-03**: Sitemap XML automatica (integrazione `@astrojs/sitemap`)
- [ ] **SEO-04**: Open Graph tags per ogni pagina
- [ ] **SEO-05**: `astro.config.mjs` con `site: 'https://mirayatechlabs.github.io'`

## v2 Requirements

### Futuri

- **V2-01**: Form con backend reale (Netlify Forms, Formspree o simile)
- **V2-02**: Blog / articoli (Astro content collections)
- **V2-03**: Terza lingua (es. rumeno)
- **V2-04**: Portfolio casi studio
- **V2-05**: Analytics privacy-first (Plausible)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend server-side | GitHub Pages statico, no server |
| Immagini AI-generated | Spec esplicita: solo div placeholder |
| React/Vue | Spec esplicita: solo Astro + JS vanilla |
| Migrazione HTML legacy | Nuovo progetto parallelo, non migrazione |
| CMS | Fuori scope v1 |
| Auth | Nessun account utente necessario |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01..06 | Phase 1 | Pending |
| COMP-01..07 | Phase 2 | Pending |
| I18N-01..04 | Phase 2 | Pending |
| HOME-01..06 | Phase 3 | Pending |
| SERV-01..06 | Phase 3 | Pending |
| CONF-01..09 | Phase 4 | Pending |
| CONT-01..06 | Phase 4 | Pending |
| SEO-01..05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 47 total
- Mapped to phases: 47
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 — initial definition*

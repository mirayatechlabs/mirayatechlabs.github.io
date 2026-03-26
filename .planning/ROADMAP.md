# Roadmap: mirayatechlabs.github.io

**Created:** 2026-03-26
**Milestone:** v1.0 — Sito commerciale live su GitHub Pages

---

## Phase 1 — Project Setup & Foundation

**Goal:** Progetto Astro 5 funzionante con Tailwind CSS 4, font, colori e struttura cartelle completa. Buildabile e deployabile su GitHub Pages.

**Covers:** SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, SETUP-06

**Deliverables:**
- `package.json` con dipendenze Astro 5 + Tailwind 4 + sitemap plugin
- `astro.config.mjs` con SSG + GitHub Pages config + i18n routing
- `tailwind.config.mjs` con custom properties palette colori
- `src/styles/global.css` con variabili, tipografia, reset
- `public/robots.txt` + `public/favicon.svg`
- File `src/i18n/it.json` e `en.json` (struttura, non contenuto finale)
- Build `npm run build` passa senza errori

**UAT:**
- `npm run build` completa senza errori
- `npm run dev` serve su localhost
- I font Syne e Source Serif 4 sono caricati
- I colori custom (rame, carta, inchiostro) sono accessibili come CSS variables

---

## Phase 2 — Layout & Componenti Condivisi

**Goal:** Tutti i componenti riusabili pronti: Navbar, Footer, SEO, BaseLayout, ServiceCard, PricingCard, Hero.

**Covers:** COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, I18N-01, I18N-02, I18N-03, I18N-04

**Deliverables:**
- `src/layouts/BaseLayout.astro` — layout condiviso
- `src/components/Navbar.astro` — con hamburger mobile + toggle lingua
- `src/components/Footer.astro`
- `src/components/SEO.astro`
- `src/components/Hero.astro`
- `src/components/ServiceCard.astro`
- `src/components/PricingCard.astro`
- `src/i18n/it.json` e `en.json` — tutte le stringhe compilate
- Toggle lingua funzionante IT ↔ EN

**UAT:**
- Navbar si renderizza correttamente su mobile e desktop
- Hamburger apre/chiude il menu su mobile (JS vanilla)
- Toggle IT/EN porta alla versione corretta della pagina corrente
- ServiceCard mostra hover lift + border rame
- Footer ha sfondo inchiostro, testo carta
- SEO inietta title e meta description corretti

---

## Phase 3 — Homepage & Pagina Servizi

**Goal:** Le due pagine principali — homepage e servizi — complete in IT e EN, con tutti i contenuti della spec.

**Covers:** HOME-01..06, SERV-01..06

**Deliverables:**
- `src/pages/index.astro` — homepage IT completa
- `src/pages/servizi.astro` — servizi IT completa
- `src/pages/en/index.astro` — homepage EN
- `src/pages/en/services.astro` — servizi EN
- Tutti i contenuti passano per i18n (nessun testo hardcoded)

**UAT:**
- Hero ha titolo H1, sottotitolo, 2 CTA funzionanti (link corretti)
- Sezione "Chi c'è dietro" ha div placeholder 280×280 sfondo rame
- 3 card "Cosa puoi ottenere" visibili e responsive
- 2 PricingCard (Base + Pro) con CTA → /configuratore
- CTA finale → /contatti funziona
- Pagina Servizi mostra 4 livelli come percorso progressivo
- 4 step "Come lavoro" visibili
- Nessun testo AI slop (verificare lista parole vietate)

---

## Phase 4 — Configuratore, Contatti, SEO & Deploy

**Goal:** Configuratore multi-step funzionante con mailto, pagina contatti, SEO completo per tutte le pagine, sitemap, deploy su GitHub Pages verificato.

**Covers:** CONF-01..09, CONT-01..06, SEO-01..05

**Deliverables:**
- `src/pages/configuratore.astro` — form 4 step con JS vanilla
- `src/pages/en/configurator.astro` — versione EN
- `src/pages/contatti.astro` — pagina contatti IT
- `src/pages/en/contact.astro` — pagina contatti EN
- SEO completo per tutte le 8 pagine (4 IT + 4 EN)
- Sitemap XML automatica generata da `@astrojs/sitemap`
- GitHub Actions workflow per deploy automatico (opzionale)

**UAT:**
- Configuratore mostra progress 1/4 → 4/4
- Navigazione avanti/indietro tra step funziona senza JS framework
- Submit genera `mailto:` con tutti i campi precompilati
- Messaggio conferma visibile dopo submit
- Pagina contatti ha email cliccabile, LinkedIn placeholder, Calendly placeholder
- Ogni pagina ha title e meta description unici
- Sitemap.xml generata correttamente
- `npm run build` + `npm run preview` mostra sito completo funzionante
- Il sito è accessibile via HTTPS su mirayatechlabs.github.io

---

## Milestone v1.0 Completion Criteria

- [ ] Tutte le 8 pagine (4 IT + 4 EN) renderizzate correttamente
- [ ] Build statica passa senza errori o warning critici
- [ ] Performance: Lighthouse score ≥ 90 su mobile
- [ ] Accessibilità: nessun errore critico WCAG AA
- [ ] Nessun testo AI slop nei contenuti
- [ ] Form configuratore funziona con mailto su browser reale
- [ ] Toggle lingua funziona su tutte le pagine
- [ ] Deploy su GitHub Pages live

---
*Roadmap created: 2026-03-26*
*4 phases → Milestone v1.0*

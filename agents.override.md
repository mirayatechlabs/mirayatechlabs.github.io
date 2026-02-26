# AGENTS.override.md — Regole per Miraya Tech Labs Website (portfolio)

## Obiettivo
Ristrutturare e mantenere il sito portfolio-first (Home, Progetti, Lab/Metodo, Manifesto, Contatti) senza alterare lo stile visuale esistente.

## Vincoli NON negoziabili
- NON modificare `style.css` e NON alterare animazioni (blob, bollicine) o effetti grafici.
- NON rinominare classi CSS esistenti.
- NON introdurre librerie/framework o build step nuovi.
- Consentito: modificare testi, link/href, creare nuove pagine HTML riusando header/footer e classi già presenti.

## Architettura target
- `index.html`
- `progetti.html`
- `lab.html`
- `manifesto.html`
- `contatti.html`

## Regole operative per agenti (GSD-friendly)
1) Prima: scansiona file e link esistenti (no modifiche).
2) Poi: scrivi una mini-SPEC con checklist verificabile.
3) Poi: implementa in piccoli passi (minimal diff).
4) Infine: verifica link e coerenza nav su tutte le pagine.

## Definition of Done (DoD)
- Tutte e 5 le pagine esistono e sono raggiungibili dalla navbar.
- Nessun link rimanda a vecchie pagine “giochi/agenti” rimosse.
- `style.css` invariato (diff vuoto).
- Nessun link rotto in home/nav/footer.
- Output finale: lista file modificati/creati/eliminati + TODO (email, progetti da inserire).

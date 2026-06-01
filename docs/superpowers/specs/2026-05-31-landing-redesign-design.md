# Landing page Miraya Tech Labs — riscrittura copy + form funzionante

Data: 2026-05-31

## Obiettivo

Trasformare la home in una landing page **chiara**: deve far capire in pochi secondi
cosa offre Miraya Tech Labs — **Web Design, Automazioni AI, Software su misura per
l'ottimizzazione del lavoro** — mantenendo lo stile elegante e la visione antropocentrica
attuali. Rendere il form di contatto realmente funzionante (invio email) e creare la
versione inglese gemella della landing.

## Decisioni prese con l'utente

1. **Ambito ristretto alla landing.** Le pagine interne (Servizi, Contatti, Configuratore,
   IT/EN) NON vengono toccate: verranno rifatte o eliminate in un secondo momento.
2. **Stile invariato.** Si mantiene l'aspetto chiaro/elegante della home attuale.
3. **Versione EN gemella.** `en/index.astro` viene sostituita: oggi è la vecchia versione
   a tema scuro, diventa la traduzione inglese della landing chiara.
4. **Niente link a pagine esterne.** La landing è autonoma. Si rimuovono i link morti
   (Privacy/Cookie `#`, logo `#`) e si aggiunge solo uno switch IT/EN.
5. **Form via Web3Forms.** L'utente ha già creato la chiave. La chiave è pubblica per
   definizione e va nel sorgente (in `.env` romperebbe il build CI).

## Architettura

Per tenere IT ed EN sempre allineate senza duplicare ~580 righe di CSS:

- `src/i18n/landing.ts` — tutti i testi delle due lingue (`it` ed `en`) + tipo `LandingContent`.
- `src/layouts/LandingLayout.astro` — documento HTML completo: markup + `<style>` scoped +
  script del form. Riceve `lang` e l'oggetto contenuti come props.
- `src/pages/index.astro` — wrapper sottile: passa i contenuti IT.
- `src/pages/en/index.astro` — wrapper sottile: passa i contenuti EN (sostituisce la versione scura).
- `public/script.js` — rimossa la chiamata a `lucide` (non più caricato).

## Copy (i tre pilastri resi espliciti)

- **Hero**: titolo concreto ("Sito, automazioni e software che lavorano per te") + sottotitolo
  che nomina i tre servizi e il beneficio.
- **Sezione servizi**: 3 card → Web Design / Automazioni AI / Software su misura, ognuna con
  titolo concreto e descrizione di cosa fa e che risultato dà.
- **Visione**: mantenuta la filosofia antropocentrica; **rimosse le statistiche inventate**
  (es. "fino al 60%"), sostituite con benefici onesti.
- **Contatto**: invito chiaro a scrivere, email `mirayatechlabs@gmail.com`, sede Milano, form.

## Form

Form di contatto (Nome, Azienda, Email, Messaggio) collegato a Web3Forms:

- POST AJAX a `https://api.web3forms.com/submit` con `access_key`.
- Campo honeypot `botcheck` nascosto (anti-spam).
- Messaggio di conferma inline al successo, messaggio d'errore in caso di fallimento.
- L'email viene recapitata a `mirayatechlabs@gmail.com` (gestito dalla chiave).

## Sicurezza

- `.gitignore` già completo: `dist/`, `node_modules/`, `.astro/`, `.claude/`, `.env*`. Nessun segreto nel repo.
- Chiave Web3Forms: pubblica per design, sicura nel sorgente.
- Versioni librerie CDN bloccate (AOS pinnato a 2.3.4); **Lucide rimosso** (caricato ma inutilizzato, gli SVG sono già inline).
- Honeypot anti-spam sul form.
- Nessun backend, nessun dato salvato lato sito: superficie d'attacco minima.

## Fuori ambito

- Pagine interne IT/EN (Servizi, Contatti, Configuratore).
- File leftover nella root del repo (`index.html`, `indexandy.html`, `nuovohtml.md`).
- Configurazione DNS del dominio (non di proprietà dell'utente).

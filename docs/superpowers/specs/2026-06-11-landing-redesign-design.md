# Redesign landing page — "Manufatto del futuro"

Data: 2026-06-11 · Stato: approvata dall'utente in sessione

## Obiettivo

La landing attuale sembra un template generico (palette crema/prugna, Playfair
Display, carosello di foto stock). Per un'agenzia che vende web design il sito è
il portfolio: deve dimostrare competenza a colpo d'occhio e comunicare la vision
di Miraya Tech Labs — **AI e tech in chiave antropologica: la tecnologia
potenzia capacità e creatività umane, non le sostituisce**.

Riferimenti artistici indicati dall'utente: Alex Grey, geometrie sacre,
terracotta, manufatti, spiritualità orientale — il tutto in chiave tech.
Registro scelto: **geometrie sacre tech** (contemplativo ma preciso,
"manufatto del futuro"), scartati il minimalismo svizzero freddo e il registro
illustrato giocoso.

## Fondamenta visive

| Ruolo | Colore | Uso |
|---|---|---|
| Carta | `#F6EFE3` | sfondo dominante, con grain leggerissimo via CSS |
| Inchiostro | `#221A12` | testo, blocco scuro contatti |
| Terracotta | `#C0532F` | accento principale: CTA, parole chiave, hover |
| Ocra oro | `#D9A441` | linee ornamentali, dettagli geometrici |
| Salvia | `#6E7F5C` | tocchi secondari (glifi, tag) |

- Font: **Fraunces** per i titoli (serif caldo umanistico), **Inter** per il
  corpo. Hero ~5–6rem, tracking stretto.
- Linguaggio grafico ricorrente: cerchi concentrici e linee radiali sottili in
  ocra, separatori a linea fine con rombo/punto centrale (frontespizio di libro
  antico), numerali romani, spazi in proporzione aurea.

## Sezioni

### Hero
- Via il carosello Unsplash. Testo a sinistra: eyebrow maiuscolo terracotta,
  titolo Fraunces gigante con parola chiave in terracotta corsivo, sottotitolo
  con il messaggio AI-umanistica, CTA terracotta pieno.
- A destra (dietro al testo su mobile): **mandala geometrico in Three.js** —
  anelli concentrici di geometria sacra (fiore della vita / solidi platonici
  annidati) in linee sottili inchiostro con vertici terracotta e oro; ruota
  lentamente, "respira", segue il mouse con dolcezza. Effetto astrolabio
  digitale. Fallback statico (ornamento SVG/CSS) se WebGL non disponibile.
- Reveal del titolo riga per riga all'apertura.

### Servizi
Righe editoriali numerate `I / II / III` full-width: numero romano, titolo
Fraunces, descrizione, freccia. Bordo superiore fine, hover terracotta.
Niente card con ombre. Resta il link alla pagina `/web-design` sulla prima.

### Vision
Via l'immagine loremflickr. Grande claim in Fraunces + i 3 benefit come lista
con piccoli glifi geometrici (cerchio, triangolo, spirale) al posto delle
spunte. Ornamento radiale ocra in sfondo.

### Contatti
Unico blocco scuro della pagina: fondo inchiostro `#221A12`, testo carta, form
con campi a filo, bottone terracotta. Recapiti a sinistra in stile colophon.
Form Web3Forms invariato (access key, honeypot, gestione esiti).

### Nav / Footer / Chatbot
Nav e footer minimali su carta, logo "Miraya Tech Labs·" con punto terracotta,
nav fissa con blur allo scroll. Footer con piccolo ornamento centrale. Chatbot
ristilizzato su inchiostro + terracotta (logica invariata).

### Animazioni
Reveal sobri allo scroll con IntersectionObserver. Niente GSAP.

## Contenuti (i18n)

Ritocchi a `src/i18n/landing.ts` (IT + EN allineati): hero e vision aggiornate
al messaggio umanistico ("l'AI che potenzia, non sostituisce"), struttura
`LandingContent` invariata salvo necessità del nuovo layout.

## Tecnica

- File toccati: `src/layouts/LandingLayout.astro` (markup + stili),
  `src/i18n/landing.ts` (testi), nuovo script client per la scena Three.js.
- Dipendenza `three` da npm, caricata solo client-side.
- Vincoli: sito statico su GitHub Pages, build `astro build`, niente backend.
- Fuori scope: la pagina `/web-design` (andrà allineata in seguito, vedi
  memoria "pagine interne da rifare").

## Criteri di successo

1. `npm run build` passa; nessuna immagine stock esterna nella landing.
2. IT ed EN renderizzano lo stesso layout con i nuovi testi.
3. Il mandala 3D gira fluido e la pagina resta usabile senza WebGL/JS.
4. Form di contatto funzionante come prima (Web3Forms, honeypot, messaggi esito).

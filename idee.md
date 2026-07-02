# Idee — Miraya Tech Labs

Parcheggio delle idee per il sito. Qui annotiamo tutto ciò che viene in mente,
anche se non è ancora deciso o pianificato. Quando un'idea passa "in produzione"
finisce in uno spec in `docs/superpowers/specs/`.

Legenda stato: 💭 da valutare · ✅ approvata · 🚧 in lavorazione · 📦 fatta · ❄️ accantonata

---

## 1. 💭 Form interattivo "Che stile preferisci?" (pagina /web-design)

**Cosa**: nella pagina `/web-design`, un piccolo quiz/configuratore interattivo che chiede
al cliente *"Che stile preferisci per il tuo sito?"* e mostra delle opzioni con mockup di esempio.
Serve a coinvolgere il visitatore, capire i suoi gusti e portarlo al contatto già "scaldato".

**Opzioni di stile (3+):**
1. **Classico / elegante** — mostra 3 mockup esempio (es. editoriale serif, corporate pulito,
   lusso minimal). Il pubblico che vuole sobrietà e fiducia.
2. **Contemporaneo / whimsy** — qualcosa di kawaii, giocoso, "roba strana": forme morbide,
   mascotte/illustrazioni, micro-interazioni buffe, colori vivaci. Per brand che vogliono
   personalità e distinguersi.
3. **Terza opzione** — da definire. Candidati:
   - **Geometrie sacre / tech** (lo stile del sito Miraya stesso: artigianale, antropologico).
   - **Brutalist / editoriale spinto** (tipografia grande, griglie nude, b/n + 1 accento).
   - **"Sorprendimi"** → lascia decidere a noi in base al settore.

**Come potrebbe funzionare:**
- Card cliccabili, ognuna con un mockup di anteprima (immagine o mini-componente animato).
- Alla selezione: piccola animazione + breve descrizione dello stile e "a chi si adatta".
- CTA finale che porta al form di contatto **pre-compilando** il messaggio con lo stile scelto
  (es. "Mi interessa un sito in stile contemporaneo/whimsy") → ottimo per la qualificazione lead.
- Tutto client-side, statico (nessun backend), coerente con l'architettura GitHub Pages.

**Aperti / da decidere:**
- I mockup: immagini statiche curate o mini-render dal vivo? (statiche = più semplici e leggere)
- Quante opzioni: 3 o 4?
- Qual è la terza (o quarta) opzione definitiva?
- Si integra nel redesign /web-design attuale o è una fase successiva?

---

## 2. 💭 Chatbot vero sulla pagina Consulenze AI

**Cosa**: nella pagina dedicata alle consulenze AI, un chatbot **funzionante** (non finto) con
tante risposte sensate già pronte alle domande tipiche dei clienti (cosa fai, quanto costa,
tempi, esempi, come iniziare, privacy dei dati, ecc.).

**Come potrebbe funzionare (statico, GitHub Pages):**
- Base a "intent" predefiniti: un set di domande/risposte curate + matching su parole chiave,
  con bottoni di domande suggerite per guidare la conversazione. Tutto client-side, nessun backend.
- Opzionale evoluzione: collegarlo a un vero modello AI via API (richiederebbe un endpoint/serverless,
  fuori dall'attuale architettura statica) — da valutare se serve davvero.
- Tono on-brand: caldo, umano, niente "assistente robotico".
- È anche una **demo vivente** della competenza: "ti sto mostrando ciò che so costruire".

**Aperti**: quante domande coprire? Solo risposte pronte o anche AI vera? Dove porta la conversazione
(contatto/preventivo)?

---

## 3. 💭 Tutorial visivo "prima → dopo" sulla pagina Consulenze AI

**Cosa**: una sezione che mostra con esempi concreti **come ottimizzo il lavoro in azienda** con la
consulenza. Formato "prima → dopo" o piccola animazione/step.

**Esempi da raccontare:**
- Un **file Excel** che diventa un **programmino** dedicato.
- **Estrazione di dati importanti** da documenti PDF di centinaia di pagine.
- (collegato all'idea 6) estrazione di **domande a risposta multipla** da un manuale PDF di 400 pagine
  con immagini.

**Come**: card/step con icona, mini-animazione o GIF/loop, una frase di problema e una di risultato.
Coerente col design system del brand. Serve a rendere tangibile un servizio astratto.

---

## 4. 💭 Opzioni di sito sulla pagina Web Design

**Cosa**: presentare i tipi di sito che offro come opzioni chiare, così il cliente si riconosce subito.
Possibili tipologie:
- **Sito velocissimo e personalizzato** (performance + su misura).
- **Sito interattivo** (animazioni, 3D, esperienze — come la home Miraya).
- **Sito con prenotazioni** (booking/calendario).
- _(spazio per altre: e-commerce, one-page, portfolio…)_

**Nota**: si lega bene all'idea 1 (il configuratore "che stile preferisci"): lì si sceglie lo *stile*,
qui la *tipologia/funzione*. Valutare se unirle in un unico flusso o tenerle separate.

---

## 5. 💭 Portfolio / lavori fatti

**Cosa**: una sezione "lavori" o "portfolio" con i progetti reali, per dare prova concreta.

**Da includere:**
- Siti **WordPress** performanti: **performarti.it** e **https://educ-art.com/**.
- Progetto AI: **estrazione di domande a risposta multipla da un manuale PDF di 400 pagine con immagini**
  (ottimo case study, si lega all'idea 3).

**Aperti**: dove vive il portfolio? (home, /web-design, o pagina dedicata). Servono screenshot/anteprime
dei siti WordPress. Per educ-art.com e performarti.it: chiedere conferma che si possano mostrare pubblicamente.

---

## 6. ✅ Generatore di mockup per clienti (approvato, da costruire dopo /web-design)

**Cosa**: pagina `/mockup` dove un cliente genera bozze di landing page HTML su misura
(settore, stile, colori) usando l'AI. Accesso controllato: prima mi scrive via form,
io rispondo con un **codice d'accesso personale** (es. `MIRAYA-A7F3`).

**Architettura** (vincolo: GitHub Pages è statico → la API key NON può stare nel frontend):
- **Cloudflare Worker** (tier free, 100k req/giorno) custodisce la API key Anthropic.
- Il Worker valida il codice (lista in KV gestita da me), chiama Claude, restituisce
  un **mockup HTML navigabile** mostrato in iframe con watermark.
- Ogni codice ha un cap (es. 3 generazioni) → danno massimo da abuso: centesimi.
- Serve: account Cloudflare gratuito + API key Anthropic. Claude prepara worker + pagina,
  deploy con `wrangler`.

**Analisi costi/benefici (2026-07-02):**
- Costi: infrastruttura €0; ~€0,05–0,25 a generazione (Haiku/Sonnet);
  scenario 10 lead/mese × 3 gen ≈ **€1,50–7,50/mese**. Il denaro non è il problema.
- Conversione, onestamente: come esca sul form può dare un lift relativo (+20–50% su base
  1–3%), ma **con poco traffico il collo di bottiglia è il traffico, non il tool**.
  Il valore vero è (1) nel **closing**: rispondere a un prospect con bozze già generate è
  memorabile e quasi nessun competitor lo fa; (2) come **demo vivente** di ciò che vendo
  (automazioni AI su misura) — vale come pezzo da portfolio anche con pochi utenti.
- **Decisione**: si fa, ma DOPO /web-design + portfolio (prima la fiducia, poi il differenziatore).
  Unica ragione per anticiparlo: usarlo in trattative già in corso.

---

## Altre idee

_(spazio per le prossime — aggiungiamo qui mano a mano)_

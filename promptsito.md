# Prompt per Claude Code — Sito mirayatechlabs.github.io

## Cosa devi costruire

Un sito statico con Astro 5 deployabile su GitHub Pages. Il sito è il fronte commerciale di una AI consultant che vende servizi di automazione e presenza digitale a PMI italiane (10-200 dipendenti, prevalentemente nelle Marche).

Il tono è: diretto, competente, umano. NON corporate. NON AI slop. NON "soluzioni su misura", NON "a 360 gradi", NON "nel panorama odierno". Scrivi come una persona vera che sa quello che fa e non ha bisogno di gonfiare il petto.

La consultant si chiama Tatiana Camillucci. Background: ostetrica per 10 anni, studentessa di antropologia culturale, developer e AI consultant. Questo background non è una curiosità — è il posizionamento. Chi ha accompagnato nascite sa ascoltare, sa quando intervenire e quando no, sa che la tecnologia migliore è quella che non si mette al centro.

---

## Stack tecnico

- **Framework**: Astro 5 (SSG mode, output: static)
- **Styling**: Tailwind CSS 4
- **Font**: Syne (titoli, carattere geometrico con personalità) + Source Serif 4 (corpo testo, leggibile e umano) — via Google Fonts
- **Deploy**: GitHub Pages — configura `astro.config.mjs` con `site: 'https://mirayatechlabs.github.io'` e `base: '/'`
- **i18n**: Astro i18n nativo — italiano (default) + inglese
- **No JS frameworks**: solo Astro components + JS vanilla dove strettamente necessario

---

## Palette colori

```css
--color-inchiostro: #1A1A2E;        /* sfondo dark sections, testo principale */
--color-inchiostro-muted: #2D2D44;  /* card backgrounds dark */
--color-ardesia: #4A4A6A;           /* testo secondario, bordi */
--color-carta: #F7F5F0;             /* sfondo principale (caldo, non bianco freddo) */
--color-carta-alt: #EEEAE2;         /* sezioni alternate */
--color-rame: #B5622A;              /* accent primario — caldo, artigianale */
--color-rame-light: #D4834A;        /* hover states */
--color-salvia: #6B8F71;            /* accent secondario — naturale */
--color-salvia-light: #8AAD8F;      /* elementi decorativi */
--color-testo: #1A1A2E;
--color-testo-muted: #5A5A7A;
```

Logica: sfondo carta calda (non bianco freddo), accenti rame (artigianale, caldo, non corporate), salvia come respiro naturale. Sezioni dark in inchiostro per stacchi visivi forti. Il risultato deve sembrare tech ma non freddo — come uno studio di progettazione, non una startup di Silicon Valley.

---

## Struttura pagine (4 pagine + i18n)

### 1. Homepage (`/` e `/en/`)

**Hero:**
- Titolo grande: "Automazione AI per le PMI che non vogliono perdere tempo."
- Sottotitolo (2 righe): "Sito web, chatbot, automazioni. Costruiamo insieme quello che serve — senza fumo, senza contratti incomprensibili."
- Due CTA: "Scegli il tuo pacchetto" → /configuratore | "Come funziona" → /servizi
- NO statistiche inventate. NO badge "100+ clienti soddisfatti". NO loghi aziende cliente finti.

**Sezione "Chi c'è dietro"** (breve, 3-4 righe):
"Mi chiamo Tatiana. Ho fatto l'ostetrica per dieci anni, poi ho iniziato a studiare antropologia, poi ho imparato a programmare. Oggi aiuto le aziende a usare l'AI senza perdere la testa — e senza perdere di vista le persone."
Foto placeholder: div 280x280px con sfondo `--color-rame` e testo "foto" centrato.

**Sezione "Cosa puoi ottenere"** — 3 card orizzontali:
- "Il tuo sito risponde ai clienti anche di notte" — chatbot AI sul sito
- "Smetti di fare le stesse cose a mano ogni settimana" — automazioni processi
- "I tuoi dati ti dicono qualcosa di utile" — AI sul dato aziendale

**Sezione prezzi rapida** — 2 card (Base e Pro) con prezzo e CTA "Configura →" che porta al configuratore. Non serve tutto il dettaglio — quello sta nel configuratore.

**CTA finale**: "Hai un progetto in testa? Parliamone." → /contatti

---

### 2. Servizi (`/servizi` e `/en/services`)

**Intro**: "Non vendo lo stesso pacchetto a tutti. Ma parto sempre dagli stessi mattoni."

**I 4 livelli di servizio** — presentati come percorso progressivo, non come lista:

**Livello 1 — Presenza** (da 800€)
"Il tuo sito esiste, è professionale, e risponde ai clienti anche quando sei occupato. Landing page + chatbot AI addestrato sui tuoi dati. Consegna in una settimana."

**Livello 2 — Comunicazione automatica** (+200-300€/anno al canone)
"Le email ripetitive, i reminder, le risposte alle domande frequenti — le gestisce il sistema, non tu. Integrazione con Gmail o Outlook tramite automazioni."

**Livello 3 — Processi interni** (da 100€/mese)
"Preventivi, appuntamenti, notifiche, sincronizzazione con il gestionale. Quello che fai a mano ogni settimana — smetti di farlo."

**Livello 4 — AI sul dato** (consulenza, preventivo su richiesta)
"Hai dati ma non sai cosa ti dicono. Ti costruiamo un sistema che risponde a domande concrete: quali clienti non comprano da 3 mesi, dove perdi tempo, cosa funziona davvero."

**Sezione "Come lavoro"** — 4 step testuali semplici (NO timeline grafica elaborata):
1. Ascolto — "Parto da cosa fai davvero, non da cosa l'AI potrebbe fare in teoria."
2. Proposta — "Ti dico cosa ha senso, cosa no, e quanto costa. Senza vendere fumo."
3. Costruzione — "Lavoro con il tuo team, testo, itero finché funziona."
4. Autonomia — "L'obiettivo è che tu non abbia bisogno di me a lungo."

CTA: "Iniziamo dal configuratore" → /configuratore

---

### 3. Configuratore (`/configuratore` e `/en/configurator`)

**Intro**: "Dicci qualcosa sulla tua azienda — ti rispondiamo entro 24 ore con una proposta su misura."

**Form** (NO action backend — usa `mailto:ciao@mirayatechlabs.it`):

Step 1 — L'azienda:
- Nome azienda (input text, required)
- Settore (select: Commercio, Artigianato, Professioni sanitarie, Studi professionali, Ristorazione, Turismo, Manifattura, Altro)
- Numero dipendenti (select: 1-5, 6-20, 21-50, 51-200)

Step 2 — Il problema:
- "Qual è la cosa che ti fa perdere più tempo ogni settimana?" (textarea, required)
- "Hai già un sito web?" (radio: Sì / No / Sì ma va rifatto)

Step 3 — Il pacchetto:
- Selezione visuale tra Pacchetto Base (800€ + 350€/anno) e Pacchetto Pro (1.200€ + 600€/anno) con feature list sintetica per ciascuno
- Checkbox "Non sono sicuro — voglio una consulenza gratuita prima"

Step 4 — Contatto:
- Nome (input text, required)
- Email (input email, required)
- Telefono (input tel, optional)
- "Come preferisci essere contattato?" (radio: Email / WhatsApp / Chiamata)

**Submit**: bottone "Invia richiesta" con `mailto:` che precompila oggetto e corpo con i dati inseriti.

**Dopo il submit**: messaggio di conferma visibile "Ricevuto. Ti rispondo entro 24 ore — di solito prima."

**Design form**: step visibili come progress (1/4, 2/4 ecc.), navigazione avanti/indietro con JS vanilla, tutto su una pagina (no redirect tra step).

---

### 4. Contatti (`/contatti` e `/en/contact`)

- Testo: "Hai una domanda, un progetto, o vuoi solo capire se posso esserti utile. Scrivimi — non mordo."
- Email in chiaro: ciao@mirayatechlabs.it (link mailto)
- LinkedIn: placeholder link
- "Rispondo entro 24 ore nei giorni lavorativi. Spesso prima."
- NO form. Solo email diretta.
- Piccola sezione: "Preferisci una call?" con link Calendly placeholder

---

## Layout e componenti

### Navbar
- Logo: "mirayatechlabs." in Syne bold — tutto minuscolo, punto finale incluso
- Link: Home, Servizi, Configuratore, Contatti
- Link lingua: IT / EN toggle semplice
- Mobile: hamburger JS vanilla
- Sfondo: carta con border-bottom sottile ardesia al scroll

### Footer
- "© 2026 mirayatechlabs. — Tatiana Camillucci"
- Link: Privacy (placeholder), ciao@mirayatechlabs.it, LinkedIn
- Sfondo inchiostro, testo carta

### Card servizi
- Border radius 10px
- Border 1px solid `--color-ardesia` con opacità 30%
- Hover: border rame, leggero lift (transform translateY -2px, transition 200ms)

### Bottoni
- Primario: sfondo rame, testo carta, hover rame-light
- Secondario: outline rame, hover fill leggero
- Border radius 6px, padding generoso

### Elementi decorativi
- Nessuna immagine AI-generated
- Separatori: linea sottile rame oppure SVG minimale (linea ondulata organica)
- Spazi generosi — il sito deve respirare
- Microinterazioni: hover delicato, transizioni 150-200ms ease

---

## i18n

Struttura cartelle:
```
/src/i18n/
  it.json   ← testi italiani
  en.json   ← testi inglesi
```

Tutte le stringhe UI e i testi delle pagine passano per i18n. I testi inglesi devono suonare naturali — non traduzione letterale. Stessa voce, stesso tono, adattato alla lingua.

Routing:
- `/` → italiano (default)
- `/en/` → inglese
- Toggle navbar cambia lingua mantenendo la pagina corrente

---

## SEO

- Tag title e meta description unici per ogni pagina (IT e EN)
- Un solo h1 per pagina
- Sitemap XML automatica (integrazione Astro)
- robots.txt
- Open Graph tags
- URL puliti: `/servizi`, `/configuratore`, `/contatti`

---

## File structure attesa

```
/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── favicon.svg          ← semplice: "m." in Syne su sfondo rame
│   └── robots.txt
├── src/
│   ├── i18n/
│   │   ├── it.json
│   │   └── en.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   ├── PricingCard.astro
│   │   └── SEO.astro
│   ├── pages/
│   │   ├── index.astro          ← IT homepage
│   │   ├── servizi.astro
│   │   ├── configuratore.astro
│   │   ├── contatti.astro
│   │   └── en/
│   │       ├── index.astro      ← EN homepage
│   │       ├── services.astro
│   │       ├── configurator.astro
│   │       └── contact.astro
│   └── styles/
│       └── global.css
```

---

## Vincoli

- Mobile-first responsive
- Performance: sotto 1 secondo su connessione media (niente immagini pesanti, font subset)
- Accessibilità: contrasto WCAG AA, alt text, navigazione da tastiera
- ZERO testo AI slop: niente "nel panorama odierno", "in un mondo sempre più", "a 360 gradi", "su misura", "cutting-edge", "sinergie", "ecosistema", "value proposition"
- Le immagini placeholder sono div colorati con testo, non broken image links
- Il form configuratore funziona con mailto: — nessun backend necessario
- Tutto il codice commentato in italiano

---

## Nota finale

Questo sito deve sembrare costruito da una persona con gusto, non generato. Ogni scelta di design — spaziatura, tipografia, colore — deve essere intenzionale. Se qualcosa sembra un template, rifallo.
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

## Altre idee

_(spazio per le prossime — aggiungiamo qui mano a mano)_

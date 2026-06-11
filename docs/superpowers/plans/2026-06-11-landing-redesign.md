# Landing Redesign "Manufatto del futuro" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ridisegnare la landing IT/EN con l'estetica "geometrie sacre tech" (carta, terracotta, Fraunces, mandala Three.js) secondo la spec `docs/superpowers/specs/2026-06-11-landing-redesign-design.md`.

**Architecture:** Tutto lo stile resta inline in `LandingLayout.astro` (pattern esistente). La scena 3D è uno `<script>` Astro bundled che importa `three`; fallback statico SVG sempre presente, il canvas lo copre quando WebGL parte. `public/script.js` perde il carosello e guadagna i reveal IntersectionObserver. `public/style.css` (Tailwind dump) resta solo per `web-design.astro`.

**Tech Stack:** Astro 5, Three.js (npm), Google Fonts (Fraunces + Inter), Web3Forms (invariato).

**Nota build:** il progetto non ha test automatici; la verifica è `npm run build` + ispezione `npx astro preview`.

---

### Task 1: Dipendenza three + pulizia script.js

**Files:**
- Modify: `package.json` (via npm)
- Modify: `public/script.js`

- [ ] **Step 1:** `npm install three` — Expected: aggiunto a dependencies, build invariata.
- [ ] **Step 2:** In `public/script.js` rimuovere il blocco "Carousel Logic" (il carosello sparisce dal markup) e aggiungere in coda al DOMContentLoaded i reveal:

```js
// Scroll reveal: elementi .reveal entrano quando visibili
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
```

- [ ] **Step 3:** Commit `chore: add three dependency, swap carousel for scroll reveals`.

### Task 2: Testi i18n (hero + vision, IT/EN)

**Files:**
- Modify: `src/i18n/landing.ts`

- [ ] **Step 1:** Aggiornare `it.hero`: eyebrow `'Web · AI · Software — dal volto umano'`; title `'Tecnologia a <em>misura d\'anima</em>.'`; text sul messaggio "AI che potenzia capacità e creatività umane, non le sostituisce"; cta `'Parliamone'`; imageAlt descrive il mandala.
- [ ] **Step 2:** Aggiornare `it.vision`: heading `'L\'AI che <em>potenzia</em>, non sostituisce'`; text con claim umanistico; benefits riscritti su tempo/artigianalità/crescita.
- [ ] **Step 3:** Allineare `en.hero` ed `en.vision` con le traduzioni equivalenti. Interfaccia `LandingContent` invariata.
- [ ] **Step 4:** Commit `feat: rewrite hero/vision copy around humanistic AI message`.

### Task 3: Restyle completo LandingLayout.astro

**Files:**
- Modify: `src/layouts/LandingLayout.astro` (markup + `<style>` completo)

Design tokens (CSS custom properties su `:root`):

```css
--paper: #f6efe3; --ink: #221a12; --terracotta: #c0532f;
--ochre: #d9a441; --sage: #6e7f5c;
--serif: 'Fraunces', Georgia, serif; --sans: 'Inter', Arial, sans-serif;
```

- [ ] **Step 1:** Head: sostituire il link Google Fonts con Fraunces (400/500/600 + italic) e Inter (300/400/500); rimuovere `<link rel="stylesheet" href="/style.css" />`.
- [ ] **Step 2:** Base: body carta/inchiostro con grain leggero (radial-gradient ripetuti a bassissima opacità), scrollbar inchiostro, classi `.reveal`/`.is-visible` (opacity+translateY, transition ~0.8s, rispetta `prefers-reduced-motion`), ornamento separatore `.ornament` (linea—rombo—linea in ocra).
- [ ] **Step 3:** Nav: carta con blur allo scroll, logo Fraunces con punto terracotta, CTA pillola inchiostro→terracotta.
- [ ] **Step 4:** Hero: rimuovere il carosello; grid 2 colonne (testo | figura). Figura = `<div class="mandala">` con SVG statico di cerchi concentrici (fallback) + `<canvas id="mandala-canvas">` sovrapposto. Titolo con reveal riga per riga (animazione CSS al load). `em` in terracotta corsivo Fraunces.
- [ ] **Step 5:** Servizi: da grid di card a righe editoriali `I / II / III` (numero romano ocra in Fraunces, titolo, testo, freccia →; `border-top: 1px solid` inchiostro al 15%; hover: titolo terracotta, freccia trasla). Mantenere il link `/web-design` sulla prima riga.
- [ ] **Step 6:** Vision: eliminare `<img loremflickr>`; claim grande Fraunces + benefit con glifi geometrici SVG (cerchio/triangolo/spirale in salvia); ornamento radiale ocra assoluto in sfondo.
- [ ] **Step 7:** Contatti: fondo `--ink`, testo carta, form a filo (bordi carta al 25%, focus terracotta), bottone terracotta, recapiti colophon. Form/Web3Forms e script submit INVARIATI.
- [ ] **Step 8:** Footer + chatbot: footer carta con ornament centrale; chatbot toggle inchiostro, header inchiostro, accenti terracotta.
- [ ] **Step 9:** Responsive: breakpoint 1100px (hero 1 colonna, mandala sotto/ridotto) e 768px come ora.
- [ ] **Step 10:** Commit `feat: redesign landing with sacred-geometry editorial style`.

### Task 4: Scena mandala Three.js

**Files:**
- Modify: `src/layouts/LandingLayout.astro` (nuovo `<script>` bundled prima di chiusura body)

- [ ] **Step 1:** Aggiungere script (Astro lo bundla, import npm):

```ts
import * as THREE from 'three';
// canvas presente solo nella landing; guardia + reduced motion
// — vedi implementazione completa nel layout: gruppo con anelli LineLoop
// concentrici, icosaedro+ottaedro wireframe annidati (EdgesGeometry),
// Points oro/terracotta sui vertici, rotazione lenta + "respiro" sin(t),
// parallasse mouse con lerp, resize handler, pixelRatio max 2.
// Su errore WebGL: il canvas resta trasparente e si vede l'SVG statico.
```

- [ ] **Step 2:** `npm run build` — Expected: build ok, chunk three generato.
- [ ] **Step 3:** Commit `feat: add three.js sacred-geometry mandala to hero`.

### Task 5: Verifica finale

- [ ] **Step 1:** `npm run build` pulito; grep che in `dist/index.html` e `dist/en/index.html` non compaiano `unsplash` né `loremflickr`.
- [ ] **Step 2:** `npx astro preview` + screenshot/ispezione manuale IT e EN (hero, servizi, vision, contatti, chatbot, mobile).
- [ ] **Step 3:** Commit finale ed eventuale merge su main.

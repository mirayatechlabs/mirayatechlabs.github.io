# Redesign sito Miraya Tech Labs — 3D fatto bene + scroll events (giugno 2026)

Data: 2026-06-28
Stato: approvato in brainstorming
Riferimenti brand: `docs/superpowers/specs/2026-06-11-landing-redesign-design.md`,
memory `landing-design-2026`, `landing-architecture`, `pagine-interne-da-rifare`.

## Obiettivo

Portare il sito (Astro statico, GitHub Pages, landing IT/EN + `/web-design`) a un livello
"agenzia di web design contemporanea": animazioni 3D curate, eventi allo scroll fluidi e
intenzionali, coerenza assoluta col brand. Il sito **non deve sembrare casalingo**.

Principio guida: il look di fascia alta nasce dal **rigore e dalla coerenza**, non dalla
quantità di effetti. Poche animazioni, ben fatte, on-brand.

## Decisioni prese (brainstorming)

- **Identità visiva**: "geometrie sacre tech in chiave antropologica" (brand originale).
  Palette terracotta/ocra/salvia + carta/inchiostro. **Niente neon, niente teal, niente Playfair.**
- **Scope**: landing (IT/EN) **+** `/web-design`.
- **Approccio**: A — "restauro + coreografia" (NON l'esperienza scroll-driven totale B).
- **Refactor**: sì, condividere design system / nav / footer tra le pagine.
- **Marquee**: tenuto, ma ridisegnato con copy on-brand (niente "WEB 3.0"/buzzword).
- **Chatbot finto**: rimosso.
- **Presenza 3D**: mandala protagonista a lato del testo nella hero (rifinito, non full-bleed).
- **Concept 3D = laser draw-on**: un fascio luminoso *disegna* la geometria sacra all'ingresso
  (build-in), poi la geometria prende vita reagendo a scroll e mouse.
- **Colore laser**: caldo on-brand — fascio incandescente terracotta/ocra ("oro fuso / brace"),
  NON neon cyber. Coerente con la palette.
- **Sfondo 3D**: "nicchia" scura dietro al solo mandala (resto della hero/sito su carta chiara),
  così il glow del laser risalta davvero. Manufatto luminoso in una teca scura.
- **Deploy rotto da risolvere**: gli ultimi 3 deploy su GitHub Actions sono falliti per l'import
  inesistente; il sito live è fermo al 2026-06-11. Rimuovere l'import ripristina il deploy.

## Stack tecnico (nessuna nuova dipendenza)

Già installato e confermato come scelta corretta:
- **TresJS** (`@tresjs/core` + `@tresjs/cientos`) → Three.js dichiarativo in Vue per il mandala.
- **GSAP + ScrollTrigger** → animazioni ed eventi allo scroll.
- **Lenis** → smooth scroll inerziale (unico owner dello smooth scroll).

Si aggiungono solo, internamente: file CSS/JS/componenti estratti e condivisi.

## Stato attuale e problemi da correggere

Build/conflitti:
1. 🔴 `LandingLayout.astro` importa `../components/SacredGeometry.jsx` — **file inesistente**,
   React non è in dipendenze (residuo esperimento React). Probabile **build rotto**. Va rimosso.
2. 🟠 Doppio smooth-scroll/reveal in conflitto: `public/script.js` (`scrollIntoView` smooth +
   IntersectionObserver) vs script inline (Lenis + GSAP ScrollTrigger).
3. 🟠 CSS duplicato/contraddittorio: `.hero` e `.hero-figure` definiti due volte.
4. 🟠 `cursor: none` globale + cursore custom → fragile su touch/accessibilità.

Deriva di brand da sanare:
5. Colori 3D neon (`#b026ff`, `#ff0055`, `#00d2ff`) in `SacredGeometryTres.vue` → on-brand.
6. Marquee con buzzword generiche → copy on-brand.
7. Finto chatbot non funzionante → rimosso.
8. `/web-design` usa una terza palette (teal/prugna/Playfair) e `public/style.css` legacy → riallineata.

## Architettura target

```
src/
  styles/
    theme.css            # NUOVO: token (palette, font), base, componenti condivisi
                         # (ornament, eyebrow, reveal, container, nav, footer, marquee, cursor)
  components/
    Nav.astro            # NUOVO: nav condivisa (estratta dalla landing)
    Footer.astro         # NUOVO: footer condiviso
    Marquee.astro        # NUOVO: marquee on-brand riusabile
    SacredGeometryTres.vue  # mandala 3D, recolor + coreografia
  scripts/
    site.ts              # NUOVO: modulo condiviso (Lenis, cursore magnetico, GSAP scroll,
                         #        marquee velocity-skew). Unico owner di smooth scroll + reveal.
  layouts/
    LandingLayout.astro  # snellito: usa theme.css + Nav/Footer/Marquee + importa site.ts
  pages/
    index.astro, en/index.astro   # invariati (wrapper)
    web-design.astro     # ricostruita sul design system condiviso
  i18n/
    landing.ts           # fonte dei testi (invariata, eventuale copy marquee aggiunto)
```

`public/script.js` e `public/style.css` vengono **dismessi** una volta migrati i loro compiti
in `site.ts` / `theme.css` (verificare che nessun'altra pagina li referenzi prima di rimuoverli).

### Confini delle unità

- **`theme.css`**: sa di stili, non di logica. Token + classi riusabili. Una sola fonte di verità per palette/font.
- **`site.ts`**: sa di interazione (smooth scroll, reveal, cursore, marquee). Idempotente, guardato da
  `prefers-reduced-motion` e da `matchMedia('(pointer: fine)')`. Nessun accoppiamento col markup specifico
  oltre a selettori/`data-` attributi documentati (`.reveal`, `.reveal-text > div`, `[data-magnetic]`, `.marquee-content`).
- **`SacredGeometryTres.vue`**: sa solo di rendering 3D. Espone una scena autonoma; legge lo scroll da
  `window.scrollY` (smussato con lerp). Fallback indipendente.
- **`Nav/Footer/Marquee.astro`**: presentazione pura, ricevono eventuali props di contenuto.

## Comportamenti chiave

### Mandala 3D (`SacredGeometryTres.vue`)
- Primitive mantenute: anelli concentrici / Seme della Vita, icosaedro + ottaedro wireframe annidati,
  punti-vertice luminosi, "polvere" stellare.
- **Laser draw-on (fase 1 — costruzione)**: all'ingresso un fascio caldo *disegna* progressivamente le
  linee della geometria. Tecnica: linee come geometrie con `drawRange` animato (o dash offset) per far
  "scrivere" il tracciato; punto/glow di testa del laser che segue il tracciato. Durata breve e ben ritmata.
- **Vita (fase 2 — animazione)**: completato il disegno, la geometria reagisce a **scroll** (sboccia +
  rotazione X controllata, bloom/scala morbidi via lerp) e a **mouse** (tilt/parallax del gruppo).
- **Colore on-brand caldo**: laser e linee in terracotta/ocra incandescente ("oro fuso/brace") con bagliore;
  punti-vertice luminosi caldi; polvere stellare ocra tenue e rada. Niente neon cyber.
- **Nicchia scura**: il canvas vive su un fondo scuro localizzato (dietro al solo mandala) perché il glow
  caldo risalti; il resto della hero resta carta chiara. Da realizzare con sfondo/alone nel contenitore
  `.hero-figure`, non cambiando il tema della pagina.
- **Qualità/perf**: DPR limitato (≤2), antialias, render in pausa quando il canvas è fuori viewport.
- **Fallback**: SVG mandala statico (già "disegnato") se WebGL assente; con `prefers-reduced-motion` si salta
  la costruzione laser e si mostra la geometria completa statica.

### Eventi allo scroll (GSAP ScrollTrigger, in `site.ts`)
- Hero: reveal del titolo a maschera riga-per-riga (rifinito).
- Servizi: righe in stagger all'ingresso + linea-ornamento che "si disegna".
- Vision: anelli ocra in rotazione **scrub** legata allo scroll.
- Marquee: scorrimento continuo + **velocity-skew** sobrio (accelera con la velocità di scroll).
- Un solo sistema di reveal: GSAP. Fallback `noscript`/`prefers-reduced-motion` mostra tutto statico.

### Marquee on-brand (copy)
Sostituisce "FUTURE PROOF / WEB 3.0 / DIGITAL TRANSFORMATION" con parole del brand, es.:
*"Su misura · Con cura · Attorno alle persone · Tecnologia dal volto umano"* (IT) e equivalente EN.
Copy in `landing.ts` per restare localizzato e allineato IT/EN.

### Cursore magnetico
- Attivo **solo** con `pointer: fine` (desktop). Su touch: cursore di sistema normale, niente `cursor:none`.
- Inerzia morbida via GSAP ticker; stato `hovered` su `a, button, [data-magnetic]`.

### `/web-design`
- Ricostruita su `theme.css` + `Nav.astro`/`Footer.astro` condivisi (palette/font del brand).
- Contenuti mantenuti (pitch "web design premium"), stessi reveal allo scroll, accento geometrico coerente.
- Dismette `public/style.css` e il font Playfair.

## Accessibilità e robustezza

- `prefers-reduced-motion`: mandala statico, marquee fermo, reveal istantanei, nessun parallax.
- WebGL assente → fallback SVG statico.
- Cursore custom non interferisce con touch/tastiera; focus states preservati.
- Il sito resta funzionante senza JS per i contenuti (reveal a `opacity:1` via `noscript`).

## Fuori scope (YAGNI)

- Esperienza scroll-driven totale con pinning multi-sezione (approccio B).
- Chatbot (rimosso, non sostituito).
- Nuove pagine/sezioni o nuovi contenuti oltre a quelli esistenti.
- CMS, i18n runtime, backend (resta statico + Web3Forms).

## Criteri di successo

1. `npm run build` verde (import rotto rimosso) → **deploy GitHub Actions di nuovo riuscito**, sito live aggiornato.
2. Nessuna palette fuori-brand residua (neon/teal/Playfair eliminati ovunque).
3. Mandala 3D con **laser draw-on caldo** su nicchia scura, poi coreografia scroll fluida e parallax mouse;
   fallback funzionante.
4. Scroll events coerenti su hero/servizi/vision/marquee, senza conflitti di smooth scroll/reveal.
5. `/web-design` visivamente coerente con la landing (stesso design system, nav, footer).
6. `prefers-reduced-motion` e touch gestiti correttamente.
7. Niente chatbot; CSS senza duplicati `.hero`/`.hero-figure`.

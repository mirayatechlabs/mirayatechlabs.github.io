# Phase 2: Layout & Componenti - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Mode:** Auto-generated (autonomous mode — spec covers all design decisions)

<domain>
## Phase Boundary

Tutti i componenti Astro riusabili: BaseLayout, Navbar, Footer, SEO, ServiceCard, PricingCard, Hero.
Sistema i18n IT/EN funzionante con file JSON e routing Astro nativo.
Nessuna pagina di contenuto finale — solo componenti pronti per essere usati nelle fasi successive.

</domain>

<decisions>
## Implementation Decisions

### Navbar
- Logo: "mirayatechlabs." in Syne bold — tutto minuscolo, punto finale incluso — link a /
- Nav links: Home (/), Servizi (/servizi), Configuratore (/configuratore), Contatti (/contatti)
- Toggle lingua: link "IT" / "EN" semplice — porta alla versione EN della pagina corrente
- Mobile: hamburger JS vanilla (toggle class `nav-open` su `<nav>`) — breakpoint md (768px)
- Sfondo: `--color-carta` senza border-bottom di default; border-bottom 1px `--color-ardesia` opacity-30 sempre visibile (semplifica implementazione — sticky con JS è Phase 3+)
- File: `src/components/Navbar.astro`

### Footer
- Testo: "© 2026 mirayatechlabs. — Tatiana Camillucci"
- Links: Privacy (# placeholder), mailto:ciao@mirayatechlabs.it, LinkedIn (#placeholder)
- Sfondo: `--color-inchiostro`, testo: `--color-carta`
- File: `src/components/Footer.astro`

### SEO Component
- Props: `title` (string, required), `description` (string, required), `ogTitle?` (default: title), `ogDescription?` (default: description), `ogImage?` (default: /og-default.png placeholder)
- Inietta: `<title>`, `<meta name="description">`, OG tags (og:title, og:description, og:image, og:type)
- Nessun canonical per ora — sitemap gestisce SEO url
- File: `src/components/SEO.astro`

### BaseLayout
- Props: `title` (string), `description` (string)
- Slot: default per contenuto pagina
- Include: SEO component, Navbar, slot, Footer, import global.css
- `lang` attribute dall'i18n corrente (IT: "it", EN: "en")
- File: `src/layouts/BaseLayout.astro`

### ServiceCard
- Props: `title` (string), `description` (string), `icon?` (string emoji o testo semplice)
- Stile: border-radius 10px, border 1px solid `--color-ardesia` opacity-30
- Hover: border-color `--color-rame`, transform translateY(-2px), transition 200ms ease
- Padding: 1.5rem
- File: `src/components/ServiceCard.astro`

### PricingCard
- Props: `name` (string), `price` (string), `priceAnnual?` (string), `features` (string[]), `ctaText` (string), `ctaHref` (string), `highlighted?` (boolean — bordo rame più spesso)
- CTA link a /configuratore
- File: `src/components/PricingCard.astro`

### Hero
- Props: `title` (string), `subtitle` (string), `cta1Text` (string), `cta1Href` (string), `cta2Text` (string), `cta2Href` (string)
- Sfondo: sezione con `--color-inchiostro`, testo `--color-carta`
- Due bottoni: primario (sfondo rame) + secondario (outline rame)
- File: `src/components/Hero.astro`

### i18n Structure
- File: `src/i18n/it.json` e `src/i18n/en.json`
- Struttura flat per namespace: `{ "nav": {...}, "footer": {...}, "hero": {...}, ... }`
- Helper: `src/i18n/utils.ts` con funzione `useTranslations(lang)` che ritorna le stringhe
- Contenuto: stringhe UI (nav, footer, bottoni) + placeholder per testo pagine (Phase 3 riempirà)
- Routing i18n già configurato in Phase 1 — non toccare astro.config.mjs

### Bottoni (classi Tailwind custom in global.css)
- `.btn-primary`: bg `--color-rame`, text `--color-carta`, hover bg `--color-rame-light`, rounded-md, padding generoso
- `.btn-secondary`: outline 2px `--color-rame`, text `--color-rame`, hover bg con opacity leggera
- Da aggiungere in global.css nella sezione `@layer components`

### Claude's Discretion
- Struttura HTML esatta dei componenti (headings, aria labels, etc.)
- Ordine degli import in BaseLayout
- Eventuali classi di utilità aggiuntive

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/styles/global.css` — Tailwind 4, palette colori @theme, Google Fonts già importati
- `astro.config.mjs` — i18n configurato: IT default su /, EN su /en/
- `src/pages/index.astro` e `src/pages/en/index.astro` — placeholder pages da aggiornare con BaseLayout

### Established Patterns
- Tailwind CSS 4: usare classi generate da `@theme` (es. `bg-[var(--color-rame)]` o utility custom)
- Astro components: frontmatter `---` per props e import, template HTML sotto
- JS vanilla: no framework, solo addEventListener e classList
- Tutti i commenti in italiano (constraint da promptsito.md)

### Integration Points
- BaseLayout sostituisce il placeholder attuale in index.astro
- i18n utils.ts viene usato da tutti i componenti per le stringhe
- Componenti verranno importati nelle pagine in Phase 3

</code_context>

<specifics>
## Specific Ideas

- Il toggle IT/EN deve portare alla pagina corrente nell'altra lingua: se sono su `/servizi` → `/en/services`, se su `/` → `/en/`. Implementare con `Astro.url.pathname` e mapping manuale delle route.
- La Navbar hamburger deve essere accessibile: `aria-expanded`, `aria-label="Menu"` sul bottone
- ServiceCard hover deve essere CSS-only (transition) — niente JS
- PricingCard `highlighted: true` → bordo rame 2px + leggero box-shadow rame

</specifics>

<deferred>
## Deferred Ideas

- Sticky navbar con border-bottom al scroll (JS scroll listener) — Phase 3 se necessario
- Animazioni di entrata componenti — out of scope v1
- Dark mode toggle — out of scope v1

</deferred>

# TODO: Animazioni 3D Reattive (Geometria Sacra / LED)

## Stato Attuale
- **React integrato:** Aggiunto `@astrojs/react` al progetto.
- **Librerie 3D installate:** `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, e `@react-three/postprocessing` per gli effetti visivi.
- **Bozza Componente:** Creato `src/components/SacredGeometry.jsx` che contiene una Merkabah (stella tetraedrica) all'interno di un icosaedro, con wireframe ed effetto Neon LED (grazie al Bloom).

## Concept Scelto
**Geometria Sacra (Tech + LED)**
L'idea è di usare forme astratte ed eleganti in stile wireframe che emettono luce propria, dando un senso di altissima tecnologia e calcolo.

## Strategia di Posizionamento & Performance
Visto che c'è già un oggetto 3D pesante che fa da Hero, abbiamo deciso di evitare un `<Canvas>` 3D fisso in background per non sovraccaricare la GPU (specialmente su mobile).

**Soluzione adottata per il prosieguo:**
1. **Blocco Dedicato (es. "Le Nostre Tecnologie" o "Approccio"):** Inserire la geometria 3D in un blocco specifico della pagina (es. 50vh - 80vh). 
2. **Auto-pausa:** Sfruttando la natura di React Three Fiber, quando l'utente scorre via e la sezione esce dallo schermo, il render 3D va in pausa azzerando il consumo di risorse.
3. **Scroll-Driven Animation:** L'oggetto non ruoterà nel tempo (frame continui) ma **solo in base allo scroll**. Quando si scorre col mouse, i componenti della geometria si aprono/ruotano. Se l'utente si ferma, l'animazione si congela, salvando batteria e performance per il resto della pagina.

## Prossimi Passi (Domani)
- [ ] Modificare `SacredGeometry.jsx` per rimuovere il fixed background e renderlo un blocco `inline`/`relative` integrabile in layout standard (Grid/Flex).
- [ ] Rimuovere l'animazione di base nel `useFrame` e legare l'intera rotazione/esplosione dei poligoni *esclusivamente* allo scorrimento (usando Intersection Observer o ScrollTrigger).
- [ ] Inserire il blocco nella pagina principale (`index.astro`) in una sezione specifica (es. sotto l'Hero e il testo introduttivo).
- [ ] Calibrare l'intensità del Bloom LED in base ai colori della palette del sito.

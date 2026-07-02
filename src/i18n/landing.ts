// Contenuti della landing page — IT ed EN tenuti adiacenti per restare allineati.
// I campi che contengono markup (es. <em>, <br>) vengono renderizzati con set:html
// nel LandingLayout: sono stringhe statiche e fidate.

export interface LandingCard {
  tag: string;
  title: string;
  text: string;
  href?: string;
}

export interface LandingContent {
  lang: 'it' | 'en';
  altLang: { label: string; href: string };
  meta: { title: string; description: string };
  nav: { services: string; manifesto: string; contact: string };
  marquee: string[];
  reel: { caption: string; video?: string }[];
  hero: {
    eyebrow: string;
    titlePart1: string;
    titleHighlight: string; // riga in corsivo serif (accento viola)
    titlePart2: string; // riga con sottolineatura annotata
    subtitle: string;
    cta: string;
    note: string; // nota a margine in mono
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    heading: string; // HTML (con <em>)
    cards: [LandingCard, LandingCard, LandingCard];
  };
  manifesto: {
    eyebrow: string;
    heading: string; // HTML (con <em>)
    items: string[]; // articoli del manifesto, HTML (con <em>/<strong>)
  };
  contact: {
    heading: string; // HTML (con <br>)
    text: string;
    emailLabel: string;
    email: string;
    locationLabel: string;
    location: string;
    form: {
      subject: string;
      name: string;
      namePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  footer: { copyright: string; tagline: string };
}

export const it: LandingContent = {
  lang: 'it',
  altLang: { label: 'EN', href: '/en/' },
  meta: {
    title: 'Miraya Tech Labs — Siti web, automazioni AI e software dalla parte delle persone',
    description:
      'Studio indipendente a Milano: siti web, automazioni AI e software costruiti come manufatti. Tecnologia che amplifica le capacità umane, non le sostituisce.',
  },
  nav: { services: 'Cosa faccio', manifesto: 'Manifesto', contact: 'Parliamone' },
  marquee: [
    'Dalla parte delle persone',
    'AI come leva, non come protesi',
    'Niente template travestiti',
    'Fatto a mano a Milano',
  ],
  // Showreel dei lavori reali. Aggiungi il video in public/showreel/ e metti il
  // percorso in `video` (es. '/showreel/excel.mp4'): apparirà al posto del placeholder.
  reel: [
    { caption: 'Un Excel che diventa un programma' },
    { caption: 'Dati estratti da PDF di 400 pagine' },
    { caption: 'Email e preventivi in automatico' },
    { caption: 'Siti web cuciti a mano' },
  ],
  hero: {
    eyebrow: 'Studio indipendente · Web · AI · Software',
    titlePart1: 'Tecnologia',
    titleHighlight: 'che amplifica',
    titlePart2: 'l’umano',
    subtitle:
      'Miraya è uno studio indipendente: siti, automazioni AI e software costruiti come manufatti — su misura, con cura, dalla parte di chi li usa.',
    cta: 'Parliamone',
    note: '* nessun tracker su questo sito.\nSolo geometria sacra e codice.',
    imageAlt:
      'Geometria sacra disegnata da fasci di luce: cerchi concentrici e solidi platonici',
  },
  services: {
    eyebrow: 'Cosa faccio',
    heading: 'Tre mestieri, <em>una direzione</em>',
    cards: [
      {
        tag: 'Web design',
        title: 'Siti che parlano come te',
        text:
          'Veloci, accessibili, disegnati a mano attorno al tuo progetto. Niente template travestiti da design.',
        href: '/web-design',
      },
      {
        tag: 'Automazioni AI',
        title: 'Il lavoro noioso, via',
        text:
          'Email, preventivi, documenti infiniti: automatizzo il ripetitivo perché il tuo tempo torni alle cose vive.',
      },
      {
        tag: 'Software su misura',
        title: 'Strumenti con la tua forma',
        text:
          'Un Excel che diventa un’app. Un archivio di PDF che risponde alle domande. Software piccolo, preciso, tuo.',
      },
    ],
  },
  manifesto: {
    eyebrow: 'Manifesto',
    heading: 'La tecnologia non è neutra. <em>Sceglie sempre una parte.</em>',
    items: [
      'L’AI qui lavora <em>per</em> te — mai al posto tuo. Amplifica capacità e creatività, e ti lascia il controllo.',
      'Credo in una tecnologia <strong>femminista e inclusiva</strong>: che redistribuisce possibilità invece di concentrarle.',
      'Ogni strumento è cucito su chi lo usa. Le persone non si adattano ai software: è il contrario.',
      'Il tempo liberato dalle macchine torna a chi crea, cura, immagina. Non a un altro foglio Excel.',
    ],
  },
  contact: {
    heading: 'Raccontami il<br />tuo progetto.',
    text:
      'Scrivimi cosa vorresti costruire, migliorare o automatizzare. Ti rispondo entro 24 ore, con una proposta concreta e senza impegno.',
    emailLabel: 'Email',
    email: 'mirayatechlabs@gmail.com',
    locationLabel: 'Base',
    location: 'Milano, IT',
    form: {
      subject: 'Nuova richiesta dal sito Miraya Tech Labs',
      name: 'Nome',
      namePlaceholder: 'Il tuo nome',
      company: 'Progetto / azienda',
      companyPlaceholder: 'Facoltativo',
      email: 'Email',
      emailPlaceholder: 'nome@esempio.it',
      message: 'Di cosa hai bisogno?',
      messagePlaceholder: 'Racconta pure con parole tue…',
      submit: 'Invia',
      success: 'Ricevuto! Ti rispondo entro 24 ore.',
      error: 'Qualcosa è andato storto. Scrivimi direttamente a mirayatechlabs@gmail.com.',
    },
  },
  footer: {
    copyright: '© 2026 Miraya Tech Labs',
    tagline: 'Fatto a mano a Milano. Niente cookie, niente tracker.',
  },
};

export const en: LandingContent = {
  lang: 'en',
  altLang: { label: 'IT', href: '/' },
  meta: {
    title: 'Miraya Tech Labs — Websites, AI automation & software on the human side',
    description:
      'Independent studio in Milan: websites, AI automations and custom software built like artifacts. Technology that amplifies human abilities — it never replaces them.',
  },
  nav: { services: 'What I do', manifesto: 'Manifesto', contact: "Let's talk" },
  marquee: [
    'On the human side',
    'AI as a lever, not a prosthesis',
    'No templates in disguise',
    'Handmade in Milan',
  ],
  reel: [
    { caption: 'An Excel file becomes an app' },
    { caption: 'Data pulled from 400-page PDFs' },
    { caption: 'Emails and quotes on autopilot' },
    { caption: 'Hand-stitched websites' },
  ],
  hero: {
    eyebrow: 'Independent studio · Web · AI · Software',
    titlePart1: 'Technology',
    titleHighlight: 'that amplifies',
    titlePart2: 'the human',
    subtitle:
      'Miraya is an independent studio: websites, AI automations and software built like artifacts — tailored, with care, on the side of the people who use them.',
    cta: "Let's talk",
    note: '* no trackers on this site.\nJust sacred geometry and code.',
    imageAlt: 'Sacred geometry drawn by beams of light: concentric circles and platonic solids',
  },
  services: {
    eyebrow: 'What I do',
    heading: 'Three crafts, <em>one direction</em>',
    cards: [
      {
        tag: 'Web design',
        title: 'Websites that sound like you',
        text:
          'Fast, accessible, hand-drawn around your project. No templates dressed up as design.',
        href: '/web-design',
      },
      {
        tag: 'AI automation',
        title: 'Boring work, gone',
        text:
          'Emails, quotes, endless documents: I automate the repetitive so your time goes back to the living parts of your work.',
      },
      {
        tag: 'Custom software',
        title: 'Tools shaped like you',
        text:
          'An Excel file becomes an app. A pile of PDFs starts answering questions. Small, precise software — yours.',
      },
    ],
  },
  manifesto: {
    eyebrow: 'Manifesto',
    heading: 'Technology is never neutral. <em>It always picks a side.</em>',
    items: [
      'Here, AI works <em>for</em> you — never instead of you. It amplifies skill and creativity, and leaves you in control.',
      'I believe in <strong>feminist, inclusive technology</strong>: one that redistributes possibilities instead of concentrating them.',
      'Every tool is stitched around the person who uses it. People don’t adapt to software: it’s the other way round.',
      'The time machines free up goes back to those who create, care, imagine. Not to another spreadsheet.',
    ],
  },
  contact: {
    heading: 'Tell me about<br />your project.',
    text:
      "Write me what you'd like to build, improve or automate. I reply within 24 hours with a concrete proposal — no strings attached.",
    emailLabel: 'Email',
    email: 'mirayatechlabs@gmail.com',
    locationLabel: 'Base',
    location: 'Milan, IT',
    form: {
      subject: 'New enquiry from the Miraya Tech Labs website',
      name: 'Name',
      namePlaceholder: 'Your name',
      company: 'Project / company',
      companyPlaceholder: 'Optional',
      email: 'Email',
      emailPlaceholder: 'name@example.com',
      message: 'What do you need?',
      messagePlaceholder: 'Tell me in your own words…',
      submit: 'Send',
      success: "Got it! I'll reply within 24 hours.",
      error: 'Something went wrong. Email me directly at mirayatechlabs@gmail.com.',
    },
  },
  footer: {
    copyright: '© 2026 Miraya Tech Labs',
    tagline: 'Handmade in Milan. No cookies, no trackers.',
  },
};

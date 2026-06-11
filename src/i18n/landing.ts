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
  nav: { services: string; vision: string; contact: string };
  hero: {
    eyebrow: string;
    title: string; // HTML (con <em>)
    text: string;
    cta: string;
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    cards: [LandingCard, LandingCard, LandingCard];
  };
  vision: {
    eyebrow: string;
    heading: string; // HTML (con <em>)
    text: string; // HTML (con <strong>)
    benefits: [string, string, string];
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
  footer: { copyright: string };
}

export const it: LandingContent = {
  lang: 'it',
  altLang: { label: 'EN', href: '/en/' },
  meta: {
    title: 'Miraya Tech Labs — Web Design, Automazioni AI e Software su misura',
    description:
      "Siti web professionali, automazioni con l'AI e software su misura per eliminare il lavoro ripetitivo e ottimizzare la tua azienda.",
  },
  nav: { services: 'Servizi', vision: 'Visione', contact: 'Parliamo' },
  hero: {
    eyebrow: 'Web Design Premium · Automazioni AI · Crescita',
    title: 'Sistemi digitali creati per <em>farti scalare</em>.',
    text: "Trasformiamo la tua presenza online con siti web magnetici e liberiamo il tuo tempo grazie ad automazioni intelligenti. Più clienti, zero stress. Il tuo business, al livello successivo.",
    cta: 'Inizia il tuo progetto',
    imageAlt: 'Sviluppo web e innovazione digitale',
  },
  services: {
    eyebrow: 'I Nostri Servizi',
    heading: 'Soluzioni pensate per farti vendere',
    cards: [
      {
        tag: 'Web Design',
        title: 'Siti web ad alta conversione',
        text:
          'Non solo belli da vedere. Costruiamo esperienze digitali veloci, curate e ottimizzate per trasformare i visitatori in clienti fidelizzati.',
        href: '/web-design',
      },
      {
        tag: 'Automazioni AI',
        title: 'Lavora meno, produci di più',
        text:
          "Delega all'Intelligenza Artificiale email, preventivi e task ripetitivi. Riprenditi il tuo tempo e concentrati su ciò che conta davvero.",
      },
      {
        tag: 'Software Su Misura',
        title: 'Strumenti che si adattano a te',
        text:
          'Sviluppiamo soluzioni software personalizzate che snelliscono i tuoi processi aziendali, rendendoli più rapidi ed efficienti.',
      },
    ],
  },
  vision: {
    eyebrow: "Innovazione dal volto umano",
    heading: "Tecnologia che <em>potenzia il tuo talento</em>",
    text:
      "Crediamo che l'AI debba <strong>amplificare le tue capacità</strong>, non sostituirle. Costruiamo strumenti che si occupano della burocrazia e delle operazioni ripetitive, permettendoti di focalizzarti su creatività, relazioni e strategia.",
    benefits: [
      'Elimina le ore perse in attività manuali e ridondanti.',
      'Interfacce intuitive e premium, dal design impeccabile.',
      'Soluzioni scalabili che crescono insieme al tuo brand.',
    ],
  },
  contact: {
    heading: 'Parliamo del tuo <br /> progetto.',
    text:
      'Raccontami cosa vorresti migliorare o automatizzare. Ti rispondo entro 24 ore con una proposta concreta — senza impegno.',
    emailLabel: 'Email',
    email: 'mirayatechlabs@gmail.com',
    locationLabel: 'Sede',
    location: 'Milano, IT',
    form: {
      subject: 'Nuova richiesta dal sito Miraya Tech Labs',
      name: 'Nome',
      namePlaceholder: 'Mario Rossi',
      company: 'Azienda',
      companyPlaceholder: 'Nome azienda',
      email: 'Email',
      emailPlaceholder: 'mario@azienda.it',
      message: 'Come posso aiutarti?',
      messagePlaceholder: 'Descrivi cosa vorresti migliorare o automatizzare…',
      submit: 'Invia richiesta',
      success: 'Ricevuto! Ti rispondo entro 24 ore.',
      error: "Qualcosa è andato storto. Scrivimi pure direttamente a mirayatechlabs@gmail.com.",
    },
  },
  footer: { copyright: '© 2026 Miraya Tech Labs. Tutti i diritti riservati.' },
};

export const en: LandingContent = {
  lang: 'en',
  altLang: { label: 'IT', href: '/' },
  meta: {
    title: 'Miraya Tech Labs — Web Design, AI Automation & Custom Software',
    description:
      'Professional websites, AI automations and custom software to remove repetitive work and optimize your business.',
  },
  nav: { services: 'Services', vision: 'Vision', contact: "Let's talk" },
  hero: {
    eyebrow: 'Web Design · AI Automation · Custom Software',
    title: 'A site, automations and software that <em>work for you</em>.',
    text:
      'I design professional websites, AI-powered automations and custom software to remove repetitive work and make your business run better. Crafted style, concrete results.',
    cta: "Let's talk about your project",
    imageAlt: 'Cozy home workspace with a laptop, plants and framed children’s drawings on the wall',
  },
  services: {
    eyebrow: 'What I do',
    heading: 'Three ways to make your work simpler',
    cards: [
      {
        tag: 'Web Design',
        title: 'Professional websites',
        text:
          'Websites and landing pages built around you — fast, polished and designed to turn visitors into clients, not just to look good.',
        href: '/web-design',
      },
      {
        tag: 'AI Automation',
        title: 'Less repetitive work',
        text:
          'I automate emails, replies, quotes and the tasks you do by hand every day, using AI where it actually helps. Time goes back to you and your team.',
      },
      {
        tag: 'Custom Software',
        title: 'Tools made for you',
        text:
          'I build custom software that fits your real processes and makes them simpler, faster and tidier.',
      },
    ],
  },
  vision: {
    eyebrow: 'Technology built around people',
    heading: 'Technology that <em>adapts to people</em>',
    text:
      'I believe AI should <strong>empower people</strong>, not replace them. I build tools that take care of the boring, repetitive part, so you can focus on what really matters: creativity, relationships and strategy.',
    benefits: [
      'Less time lost on manual, repetitive tasks.',
      'Simple interfaces you can use without a manual.',
      'Solutions that grow with your business.',
    ],
  },
  contact: {
    heading: "Let's talk about <br /> your project.",
    text:
      "Tell me what you'd like to improve or automate. I'll reply within 24 hours with a concrete proposal — no strings attached.",
    emailLabel: 'Email',
    email: 'mirayatechlabs@gmail.com',
    locationLabel: 'Location',
    location: 'Milan, IT',
    form: {
      subject: 'New enquiry from the Miraya Tech Labs website',
      name: 'Name',
      namePlaceholder: 'John Smith',
      company: 'Company',
      companyPlaceholder: 'Company name',
      email: 'Email',
      emailPlaceholder: 'john@company.com',
      message: 'How can I help?',
      messagePlaceholder: "Describe what you'd like to improve or automate…",
      submit: 'Send request',
      success: "Got it! I'll reply within 24 hours.",
      error: 'Something went wrong. Feel free to email me directly at mirayatechlabs@gmail.com.',
    },
  },
  footer: { copyright: '© 2026 Miraya Tech Labs. All rights reserved.' },
};

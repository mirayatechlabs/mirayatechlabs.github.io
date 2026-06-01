// Contenuti della landing page — IT ed EN tenuti adiacenti per restare allineati.
// I campi che contengono markup (es. <em>, <br>) vengono renderizzati con set:html
// nel LandingLayout: sono stringhe statiche e fidate.

export interface LandingCard {
  tag: string;
  title: string;
  text: string;
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
    eyebrow: 'Web Design · Automazioni AI · Software su misura',
    title: 'Sito, automazioni e software che <em>lavorano per te</em>.',
    text:
      "Progetto siti web professionali, automazioni con l'intelligenza artificiale e software su misura per eliminare il lavoro ripetitivo e far girare meglio la tua azienda. Stile curato, risultati concreti.",
    cta: 'Parliamo del tuo progetto',
    imageAlt: 'Postazione di lavoro accogliente con laptop, piante e disegni dei bambini incorniciati alla parete',
  },
  services: {
    eyebrow: 'Cosa faccio',
    heading: 'Tre modi per semplificarti il lavoro',
    cards: [
      {
        tag: 'Web Design',
        title: 'Siti web professionali',
        text:
          'Siti e landing page costruiti su misura — veloci, curati e pensati per trasformare i visitatori in clienti, non solo per fare bella figura.',
      },
      {
        tag: 'Automazioni AI',
        title: 'Meno lavoro ripetitivo',
        text:
          "Automatizzo email, risposte, preventivi e le attività che fai a mano ogni giorno, usando l'AI dove serve davvero. Il tempo torna a te e al tuo team.",
      },
      {
        tag: 'Software su misura',
        title: 'Strumenti fatti per te',
        text:
          'Sviluppo software personalizzati che si adattano ai tuoi processi reali e li rendono più semplici, veloci e ordinati.',
      },
    ],
  },
  vision: {
    eyebrow: "Tecnologia su misura dell'uomo",
    heading: "Tecnologia che <em>si adatta all'uomo</em>",
    text:
      "Credo che l'AI debba <strong>potenziare le persone</strong>, non sostituirle. Costruisco strumenti che tolgono di mezzo la parte noiosa e ripetitiva, così puoi concentrarti su ciò che conta davvero: creatività, relazioni e strategia.",
    benefits: [
      'Meno tempo perso in attività manuali e ripetitive.',
      'Interfacce semplici, da usare senza bisogno di un manuale.',
      'Soluzioni che crescono insieme alla tua attività.',
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

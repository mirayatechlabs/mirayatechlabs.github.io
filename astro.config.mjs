// Configurazione Astro 5 — mirayatechlabs.github.io
// Deploy: GitHub Pages statico | i18n: IT default, EN su /en/
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  site: 'https://mirayatechlabs.github.io',
  base: '/',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'it',
      locales: {
        it: 'it-IT',
        en: 'en-US',
      },
    },
  }), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['@astrojs/prism']
    },
    plugins: [tailwindcss()]
  },

  site: 'https://yoonfoo.netlify.app',
  integrations: [sanity({
    projectId: 'zexp7hco',
    dataset: 'blog-posts',
    useCdn: true,
    studioBasePath: '/admin',
    stega: {
      studioUrl: '/admin',
    }
  }), react()],
  output: 'server',
  adapter: vercel(),
});
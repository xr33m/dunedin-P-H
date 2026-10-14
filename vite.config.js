import { defineConfig } from 'vite';

// The site is plain multi-page HTML — Vite just serves it.
// appType 'mpa' makes /services/<slug>/ resolve to its own index.html and
// unknown paths 404 instead of falling back to the homepage.
export default defineConfig({
  appType: 'mpa',
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});

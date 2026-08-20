import { defineConfig } from 'vite';

/** Serves the already-built site/dist/ for local demo. Does not deploy. */
export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
});

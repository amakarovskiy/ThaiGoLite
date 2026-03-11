import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/ThaiGoLite/' : '/',
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});

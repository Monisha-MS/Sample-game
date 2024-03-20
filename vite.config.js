import { defineConfig } from 'vite';
export default defineConfig({
    base: './',
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 10000
    }
});

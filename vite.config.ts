import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Both pages are production entries: index.html (the site) and ds.html (the demo workbench, at /ds.html).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        ds: 'ds.html',
      },
    },
  },
});

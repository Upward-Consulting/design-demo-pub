import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev-only workbench (ds.html) is served by `vite` in dev and is never listed in build.rollupOptions.input.
export default defineConfig({
  plugins: [react()],
});

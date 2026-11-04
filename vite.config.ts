import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Only index.html is a production entry. ds.html (the dev workbench) is served in dev and never built.
export default defineConfig({
  plugins: [react()],
});

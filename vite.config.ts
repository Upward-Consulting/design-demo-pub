import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev and preview ports are fixed so the Playwright sessions can reach them.
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5181, strictPort: true },
  preview: { host: '127.0.0.1', port: 5182, strictPort: true },
});

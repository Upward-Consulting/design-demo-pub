/// <reference types="vite/client" />
// Entry of the dev-only workbench (ds.html). Never imported by the app; never listed in build.rollupOptions.input.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// EDIT 1 — the app's global styles, in the same order as the app's own entry (src/main.tsx): reset, token file, globals.
// A component that looks right here and wrong in the app is almost always a stylesheet imported in a different order.
import '../../index.css';

import './furniture.css';
import { Providers } from './providers';
import { Workbench } from './Workbench';

if (import.meta.env.PROD) {
  throw new Error('The design-system workbench is dev-only and must never be built.');
}

const root = document.getElementById('ds-root');
if (!root) throw new Error('#ds-root is missing from ds.html');

createRoot(root).render(
  <StrictMode>
    <Providers>
      <Workbench />
    </Providers>
  </StrictMode>,
);

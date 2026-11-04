import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Placeholder app: the real routes are built from the approved demo's system (Phase 6+).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <p>Bellis design v5: the demo proposals live in the dev workbench (ds.html).</p>
  </StrictMode>,
);

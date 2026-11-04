import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Production entry. The site is not built yet: the owner rules on the demo proposals first.
// Design workbench (dev only): /ds.html
function Placeholder() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Bellis Australia: website design v1</h1>
      <p>The production site is built after the owner approves a demo proposal. Workbench: /ds.html</p>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Placeholder />
  </StrictMode>,
);

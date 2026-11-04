// Hooks shared by the workbench views (kept apart from parts.tsx so that file exports components only).
import { useEffect } from 'react';

/** Lazy modules render after the browser's own jump to #hash, so jump again once nothing is loading. */
export function useScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const target = document.getElementById(id);
      if (target && !document.querySelector('[data-ds-loading]')) {
        target.scrollIntoView({ block: 'start' });
        window.clearInterval(timer);
      } else if (tries > 100) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, []);
}

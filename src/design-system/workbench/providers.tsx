// EDIT 2 — wrap the workbench in the same providers the app root uses, so every variant and example renders as it
// would in the app: a router (MemoryRouter, so links render without navigating away), the theme provider,
// MotionConfig, an i18n provider, a query client with no network. Keep the order the app uses.
//
//   import { MemoryRouter } from 'react-router-dom';
//   import { MotionConfig } from 'motion/react';
//   export function Providers({ children }: { children: ReactNode }) {
//     return (
//       <MemoryRouter initialEntries={['/']}>
//         <MotionConfig reducedMotion="user">{children}</MotionConfig>
//       </MemoryRouter>
//     );
//   }
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

"use client";

import { CookieConsentProvider } from "./CookieConsentProvider";
import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesPanel } from "./CookiePreferencesPanel";

interface CookieConsentWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that provides cookie consent functionality to the app.
 * 
 * Usage in layout.tsx:
 * 
 * ```tsx
 * import { CookieConsentWrapper } from "@/components/cookies";
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="fr">
 *       <body>
 *         <CookieConsentWrapper>
 *           <Header />
 *           <main>{children}</main>
 *           <Footer />
 *         </CookieConsentWrapper>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function CookieConsentWrapper({ children }: CookieConsentWrapperProps) {
  return (
    <CookieConsentProvider>
      {children}
      <CookieBanner />
      <CookiePreferencesPanel />
    </CookieConsentProvider>
  );
}
"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCookieConsent, CookiePreferences, CookieCategory } from "@/lib/useCookieConsent";

interface CookieConsentContextType {
  preferences: CookiePreferences;
  isLoaded: boolean;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptEssentialOnly: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isAllowed: (category: CookieCategory) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const cookieConsent = useCookieConsent();

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const context = useContext(CookieConsentContext);
  
  if (!context) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }
  
  return context;
}
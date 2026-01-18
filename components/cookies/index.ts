// Main wrapper (use in layout.tsx)
export { CookieConsentWrapper } from "./CookieConsentWrapper";

// Individual components
export { CookieConsentProvider, useCookieConsentContext } from "./CookieConsentProvider";
export { CookieBanner } from "./CookieBanner";
export { CookiePreferencesPanel } from "./CookiePreferencesPanel";
export { CookieSettingsButton } from "./CookieSettingsButton";

// Hook and types (from lib)
export { useCookieConsent } from "@/lib/useCookieConsent";
export type { CookiePreferences, CookieCategory } from "@/lib/useCookieConsent";
"use client";

import { useState, useEffect, useCallback } from "react";

// Types de cookies
export type CookieCategory = "essential" | "analytics" | "marketing" | "preferences";

export interface CookiePreferences {
  essential: boolean; // Toujours true, ne peut pas être désactivé
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
}

// Version actuelle de la politique de cookies
// Incrémenter cette version force les utilisateurs à redonner leur consentement
const COOKIE_POLICY_VERSION = "1.0.0";
const COOKIE_STORAGE_KEY = "js_property_cookie_consent";

// Préférences par défaut (tout refusé sauf essentiels)
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: 0,
  version: COOKIE_POLICY_VERSION,
};

// Préférences si tout accepté
const ACCEPT_ALL_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  preferences: true,
  timestamp: Date.now(),
  version: COOKIE_POLICY_VERSION,
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Charger les préférences depuis localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        
        // Vérifier si la version a changé
        if (parsed.version !== COOKIE_POLICY_VERSION) {
          // Nouvelle version de la politique, redemander le consentement
          setShowBanner(true);
          setPreferences(DEFAULT_PREFERENCES);
        } else {
          setPreferences(parsed);
          setShowBanner(false);
        }
      } else {
        // Pas de consentement enregistré
        setShowBanner(true);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des préférences cookies:", error);
      setShowBanner(true);
    }
    
    setIsLoaded(true);
  }, []);

  // Sauvegarder les préférences
  const savePreferences = useCallback((newPreferences: Partial<CookiePreferences>) => {
    const updated: CookiePreferences = {
      ...preferences,
      ...newPreferences,
      essential: true, // Toujours actif
      timestamp: Date.now(),
      version: COOKIE_POLICY_VERSION,
    };

    setPreferences(updated);
    setShowBanner(false);
    setShowPreferences(false);

    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(updated));
      
      // Déclencher un événement custom pour que d'autres scripts puissent réagir
      window.dispatchEvent(new CustomEvent("cookieConsentUpdated", { detail: updated }));
      
      // Appliquer les préférences (activer/désactiver les scripts)
      applyCookiePreferences(updated);
    }
  }, [preferences]);

  // Accepter tous les cookies
  const acceptAll = useCallback(() => {
    savePreferences(ACCEPT_ALL_PREFERENCES);
  }, [savePreferences]);

  // Refuser tous les cookies (sauf essentiels)
  const rejectAll = useCallback(() => {
    savePreferences({
      analytics: false,
      marketing: false,
      preferences: false,
    });
  }, [savePreferences]);

  // Accepter uniquement les essentiels
  const acceptEssentialOnly = useCallback(() => {
    rejectAll();
  }, [rejectAll]);

  // Ouvrir le panneau de préférences
  const openPreferences = useCallback(() => {
    setShowPreferences(true);
  }, []);

  // Fermer le panneau de préférences
  const closePreferences = useCallback(() => {
    setShowPreferences(false);
  }, []);

  // Vérifier si un type de cookie est autorisé
  const isAllowed = useCallback((category: CookieCategory): boolean => {
    return preferences[category] ?? false;
  }, [preferences]);

  return {
    preferences,
    isLoaded,
    showBanner,
    showPreferences,
    acceptAll,
    rejectAll,
    acceptEssentialOnly,
    savePreferences,
    openPreferences,
    closePreferences,
    isAllowed,
  };
}

// Fonction pour appliquer les préférences (activer/désactiver les scripts tiers)
function applyCookiePreferences(preferences: CookiePreferences) {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (preferences.analytics) {
    enableGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }

  // Marketing (Facebook Pixel, etc.)
  if (preferences.marketing) {
    enableMarketingScripts();
  } else {
    disableMarketingScripts();
  }

  // Préférences (langue, thème, etc.)
  if (preferences.preferences) {
    enablePreferencesCookies();
  }
}

// Fonctions d'activation/désactivation des scripts
// À adapter selon vos besoins

function enableGoogleAnalytics() {
  // Exemple pour Google Analytics 4
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
  
  // Ou charger le script dynamiquement si pas encore chargé
  // loadScript('https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX');
}

function disableGoogleAnalytics() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }
  
  // Supprimer les cookies GA existants
  deleteCookiesStartingWith("_ga");
}

function enableMarketingScripts() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      ad_storage: "granted",
      ad_personalization: "granted",
      ad_user_data: "granted",
    });
  }
}

function disableMarketingScripts() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      ad_storage: "denied",
      ad_personalization: "denied",
      ad_user_data: "denied",
    });
  }
  
  // Supprimer les cookies marketing
  deleteCookiesStartingWith("_fb");
}

function enablePreferencesCookies() {
  // Activer les cookies de préférences utilisateur
  // (langue, thème sombre, etc.)
}

// Utilitaire pour supprimer les cookies
function deleteCookiesStartingWith(prefix: string) {
  if (typeof document === "undefined") return;
  
  const cookies = document.cookie.split(";");
  
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    const trimmedName = name.trim();
    
    if (trimmedName.startsWith(prefix)) {
      document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    }
  }
}

// Export des utilitaires
export { deleteCookiesStartingWith, applyCookiePreferences };
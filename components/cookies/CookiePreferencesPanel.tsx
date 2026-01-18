"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, Shield, BarChart3, Megaphone, Settings, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCookieConsentContext } from "./CookieConsentProvider";
import { CookieCategory } from "@/lib/useCookieConsent";
import { cn } from "@/lib/utils";

interface CookieCategoryConfig {
  id: CookieCategory;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  required: boolean;
  cookies: {
    name: string;
    provider: string;
    purpose: string;
    duration: string;
  }[];
}

const cookieCategories: CookieCategoryConfig[] = [
  {
    id: "essential",
    name: "Cookies essentiels",
    description:
      "Ces cookies sont nécessaires au fonctionnement du site. Ils permettent d'utiliser les fonctionnalités de base comme la navigation et l'accès aux zones sécurisées. Le site ne peut pas fonctionner correctement sans ces cookies.",
    icon: Shield,
    required: true,
    cookies: [
      {
        name: "js_property_cookie_consent",
        provider: "JS Property",
        purpose: "Stocke vos préférences de consentement aux cookies",
        duration: "1 an",
      },
      {
        name: "session_id",
        provider: "JS Property",
        purpose: "Identifiant de session pour la navigation",
        duration: "Session",
      },
    ],
  },
  {
    id: "analytics",
    name: "Cookies analytiques",
    description:
      "Ces cookies nous permettent de mesurer l'audience de notre site, de comprendre comment les visiteurs naviguent et d'améliorer nos services. Toutes les données sont anonymisées.",
    icon: BarChart3,
    required: false,
    cookies: [
      {
        name: "_ga",
        provider: "Google Analytics",
        purpose: "Distingue les utilisateurs uniques",
        duration: "2 ans",
      },
      {
        name: "_ga_*",
        provider: "Google Analytics",
        purpose: "Maintient l'état de la session",
        duration: "2 ans",
      },
      {
        name: "_gid",
        provider: "Google Analytics",
        purpose: "Distingue les utilisateurs",
        duration: "24 heures",
      },
    ],
  },
  {
    id: "marketing",
    name: "Cookies marketing",
    description:
      "Ces cookies sont utilisés pour vous montrer des publicités pertinentes. Ils permettent de mesurer l'efficacité de nos campagnes et de limiter le nombre de fois où vous voyez une publicité.",
    icon: Megaphone,
    required: false,
    cookies: [
      {
        name: "_fbp",
        provider: "Facebook",
        purpose: "Suivi des conversions publicitaires",
        duration: "3 mois",
      },
      {
        name: "fr",
        provider: "Facebook",
        purpose: "Ciblage publicitaire",
        duration: "3 mois",
      },
    ],
  },
  {
    id: "preferences",
    name: "Cookies de préférences",
    description:
      "Ces cookies permettent au site de se souvenir de vos choix (comme votre langue préférée) et d'offrir des fonctionnalités améliorées et personnalisées.",
    icon: Settings,
    required: false,
    cookies: [
      {
        name: "locale",
        provider: "JS Property",
        purpose: "Mémorise votre langue préférée",
        duration: "1 an",
      },
      {
        name: "theme",
        provider: "JS Property",
        purpose: "Mémorise vos préférences d'affichage",
        duration: "1 an",
      },
    ],
  },
];

export function CookiePreferencesPanel() {
  const {
    preferences,
    showPreferences,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useCookieConsentContext();

  const [localPreferences, setLocalPreferences] = useState({
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    preferences: preferences.preferences,
  });

  const [expandedCategory, setExpandedCategory] = useState<CookieCategory | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync local state with context
  useEffect(() => {
    setLocalPreferences({
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      preferences: preferences.preferences,
    });
  }, [preferences]);

  // Animation
  useEffect(() => {
    if (showPreferences) {
      setIsAnimating(true);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreferences]);

  const handleToggle = (category: CookieCategory) => {
    if (category === "essential") return; // Cannot toggle essential

    setLocalPreferences((prev) => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev],
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
  };

  const toggleExpanded = (category: CookieCategory) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  if (!showPreferences) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-noir/80 backdrop-blur-sm z-[9998] transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={closePreferences}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xl bg-noir-elegant border-l border-or/20 z-[9999]",
          "flex flex-col transition-transform duration-500 ease-out",
          isAnimating ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-white/10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-or/30 flex items-center justify-center">
                <Cookie size={20} className="text-or" />
              </div>
              <div>
                <h2 className="font-serif text-xl text-ivoire">
                  Préférences cookies
                </h2>
                <p className="font-sans text-xs text-gris-noble mt-0.5">
                  Gérez vos paramètres de confidentialité
                </p>
              </div>
            </div>
            <button
              onClick={closePreferences}
              className="w-10 h-10 flex items-center justify-center text-gris-noble hover:text-ivoire hover:bg-white/5 transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Introduction */}
            <p className="font-sans text-sm font-light text-gris-clair leading-relaxed mb-8">
              Personnalisez vos préférences de cookies. Les cookies essentiels sont 
              nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
              {" "}
              <Link
                href="/confidentialite#cookies"
                className="text-or hover:text-or-clair underline underline-offset-2"
                onClick={closePreferences}
              >
                Politique de cookies
              </Link>
            </p>

            {/* Categories */}
            <div className="space-y-4">
              {cookieCategories.map((category) => {
                const Icon = category.icon;
                const isEnabled =
                  category.id === "essential"
                    ? true
                    : localPreferences[category.id as keyof typeof localPreferences];
                const isExpanded = expandedCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className={cn(
                      "border transition-colors duration-300",
                      isEnabled ? "border-or/30 bg-or/5" : "border-white/10"
                    )}
                  >
                    {/* Category Header */}
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors",
                            isEnabled
                              ? "bg-or/20 text-or"
                              : "bg-white/5 text-gris-noble"
                          )}
                        >
                          <Icon size={18} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-sans text-sm font-medium text-ivoire">
                                {category.name}
                              </h3>
                              {category.required && (
                                <span className="px-2 py-0.5 bg-or/10 text-or text-[10px] uppercase tracking-wider">
                                  Requis
                                </span>
                              )}
                            </div>

                            {/* Toggle */}
                            <button
                              onClick={() => handleToggle(category.id)}
                              disabled={category.required}
                              className={cn(
                                "relative w-12 h-6 rounded-full transition-colors duration-300",
                                isEnabled ? "bg-or" : "bg-white/20",
                                category.required && "cursor-not-allowed opacity-70"
                              )}
                              aria-label={`${isEnabled ? "Désactiver" : "Activer"} ${category.name}`}
                            >
                              <span
                                className={cn(
                                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300",
                                  isEnabled ? "left-7" : "left-1"
                                )}
                              />
                            </button>
                          </div>

                          <p className="font-sans text-xs font-light text-gris-noble leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Expand button */}
                      <button
                        onClick={() => toggleExpanded(category.id)}
                        className="flex items-center gap-2 mt-4 ml-14 text-xs text-gris-noble hover:text-or transition-colors"
                      >
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-300",
                            isExpanded && "rotate-180"
                          )}
                        />
                        Voir les {category.cookies.length} cookie{category.cookies.length > 1 ? "s" : ""}
                      </button>
                    </div>

                    {/* Cookie Details */}
                    {isExpanded && (
                      <div className="border-t border-white/5 bg-noir/30 p-4">
                        <div className="ml-14 space-y-3">
                          {category.cookies.map((cookie) => (
                            <div
                              key={cookie.name}
                              className="p-3 bg-noir-surface border border-white/5 text-xs"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-or">{cookie.name}</span>
                                <span className="text-gris-noble">{cookie.duration}</span>
                              </div>
                              <p className="text-gris-noble mb-1">
                                <span className="text-ivoire">Fournisseur :</span> {cookie.provider}
                              </p>
                              <p className="text-gris-noble">
                                <span className="text-ivoire">Utilisation :</span> {cookie.purpose}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-white/10 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={rejectAll}
              className="flex-1"
            >
              Tout refuser
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={acceptAll}
              className="flex-1"
            >
              Tout accepter
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              className="flex-1"
            >
              <Check size={16} className="mr-2" />
              Enregistrer
            </Button>
          </div>

          <p className="font-sans text-[10px] text-center text-gris-noble mt-4">
            Vos préférences seront conservées pendant 1 an.
          </p>
        </div>
      </div>
    </>
  );
}
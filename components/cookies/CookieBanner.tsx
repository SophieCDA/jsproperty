"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Cookie, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCookieConsentContext } from "./CookieConsentProvider";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const {
    showBanner,
    acceptAll,
    rejectAll,
    openPreferences,
    isLoaded,
  } = useCookieConsentContext();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation d'entrée
  useEffect(() => {
    if (isLoaded && showBanner) {
      // Petit délai pour l'animation
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Attendre la fin de l'animation avant de cacher
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, showBanner]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-noir/60 backdrop-blur-sm z-[9998] transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={openPreferences}
      />

      {/* Banner */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-500 ease-out",
          isAnimating ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="bg-noir-elegant border-t border-or/20">
          {/* Decorative top line */}
          <div className="h-px bg-gradient-to-r from-transparent via-or/50 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 py-8 lg:py-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Icon & Text */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-12 h-12 flex-shrink-0 border border-or/30 items-center justify-center">
                    <Cookie size={24} className="text-or" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-ivoire mb-3">
                      Nous respectons votre vie privée
                    </h3>
                    <p className="font-sans text-sm font-light text-gris-clair leading-relaxed max-w-2xl">
                      Nous utilisons des cookies pour améliorer votre expérience de navigation, 
                      analyser le trafic de notre site et personnaliser le contenu. 
                      Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.
                      {" "}
                      <Link
                        href="/confidentialite#cookies"
                        className="text-or hover:text-or-clair underline underline-offset-2"
                      >
                        En savoir plus
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openPreferences}
                  className="order-3 sm:order-1"
                >
                  <Settings size={16} className="mr-2" />
                  Personnaliser
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={rejectAll}
                  className="order-2"
                >
                  Refuser
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={acceptAll}
                  className="order-1 sm:order-3"
                >
                  <Shield size={16} className="mr-2" />
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
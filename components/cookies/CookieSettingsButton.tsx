"use client";

import { Cookie } from "lucide-react";
import { useCookieConsentContext } from "./CookieConsentProvider";
import { cn } from "@/lib/utils";

interface CookieSettingsButtonProps {
  className?: string;
  variant?: "text" | "icon" | "full";
}

export function CookieSettingsButton({
  className,
  variant = "text",
}: CookieSettingsButtonProps) {
  const { openPreferences } = useCookieConsentContext();

  if (variant === "icon") {
    return (
      <button
        onClick={openPreferences}
        className={cn(
          "w-10 h-10 flex items-center justify-center",
          "border border-white/10 hover:border-or/30 hover:bg-or/5",
          "transition-all duration-300 group",
          className
        )}
        aria-label="Gérer les cookies"
        title="Gérer les cookies"
      >
        <Cookie
          size={18}
          className="text-gris-noble group-hover:text-or transition-colors"
        />
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        onClick={openPreferences}
        className={cn(
          "flex items-center gap-3 px-4 py-3",
          "border border-white/10 hover:border-or/30 hover:bg-or/5",
          "transition-all duration-300 group",
          className
        )}
      >
        <Cookie
          size={18}
          className="text-gris-noble group-hover:text-or transition-colors"
        />
        <span className="font-sans text-sm text-gris-noble group-hover:text-ivoire transition-colors">
          Gérer les cookies
        </span>
      </button>
    );
  }

  // Default: text variant (for footer)
  return (
    <button
      onClick={openPreferences}
      className={cn(
        "font-sans text-xs font-light text-gris-noble hover:text-or transition-colors",
        className
      )}
    >
      Gérer les cookies
    </button>
  );
}
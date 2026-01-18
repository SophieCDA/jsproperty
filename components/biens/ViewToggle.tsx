"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, List, Map } from "lucide-react";

export type ViewMode = "grid" | "list" | "map";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({
  viewMode,
  onViewModeChange,
  className,
}: ViewToggleProps) {
  const views: { mode: ViewMode; icon: React.ElementType; label: string }[] = [
    { mode: "grid", icon: LayoutGrid, label: "Grille" },
    { mode: "list", icon: List, label: "Liste" },
    { mode: "map", icon: Map, label: "Carte" },
  ];

  return (
    <div className={cn("flex items-center gap-1 p-1 bg-noir-surface border border-white/10", className)}>
      {views.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewModeChange(mode)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300",
            viewMode === mode
              ? "bg-or text-noir"
              : "text-gris-noble hover:text-ivoire"
          )}
          aria-label={label}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { 
  MapPin, 
  Euro, 
  Maximize, 
  BedDouble, 
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  CheckCircle,
  Tag
} from "lucide-react";
import { PropertyFilters as FilterType, Property, PropertyAvailability } from "@/types";

interface RealisationsFiltersProps {
  filters: FilterType & { status?: "all" | "vendu" | "disponible" };
  onFiltersChange: (filters: FilterType & { status?: "all" | "vendu" | "disponible" }) => void;
  resultsCount: number;
  properties: Property[];
  className?: string;
}

// Composant Select personnalisé
function FilterSelect({
  icon: Icon,
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div ref={ref} className="relative">
      <label className="block font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-gris-noble mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 bg-noir-surface border transition-all duration-300",
          isOpen ? "border-or" : "border-white/10 hover:border-or/50",
          value ? "text-ivoire" : "text-gris-noble"
        )}
      >
        <Icon size={16} className="text-or flex-shrink-0" />
        <span className="flex-1 text-left font-sans text-sm truncate">
          {selectedLabel}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-gris-noble transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 mt-1 bg-noir-surface border border-or/20 z-50 overflow-hidden transition-all duration-300 origin-top",
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="max-h-60 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={cn(
              "w-full px-4 py-3 text-left font-sans text-sm transition-colors",
              !value
                ? "bg-or/10 text-or"
                : "text-gris-noble hover:bg-white/5 hover:text-ivoire"
            )}
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left font-sans text-sm transition-colors",
                value === option.value
                  ? "bg-or/10 text-or"
                  : "text-gris-clair hover:bg-white/5 hover:text-ivoire"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Toggle pour le statut (Tous / Vendus / Disponibles)
function StatusToggle({
  value,
  onChange,
  counts,
}: {
  value: "all" | "vendu" | "disponible";
  onChange: (value: "all" | "vendu" | "disponible") => void;
  counts: { all: number; vendu: number; disponible: number };
}) {
  const options: { value: "all" | "vendu" | "disponible"; label: string }[] = [
    { value: "all", label: `Tous (${counts.all})` },
    { value: "vendu", label: `Vendus (${counts.vendu})` },
    { value: "disponible", label: `Disponibles (${counts.disponible})` },
  ];

  return (
    <div>
      <label className="block font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-gris-noble mb-2">
        Statut
      </label>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 py-2.5 font-sans text-xs font-medium border transition-all duration-300",
              value === option.value
                ? "bg-or text-noir border-or"
                : "bg-transparent text-gris-clair border-white/10 hover:border-or/50 hover:text-ivoire"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RealisationsFilters({
  filters,
  onFiltersChange,
  resultsCount,
  properties,
  className,
}: RealisationsFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // ==================== GÉNÉRATION DYNAMIQUE DES OPTIONS ====================

  // Compteurs pour le toggle statut
  const statusCounts = useMemo(() => ({
    all: properties.length,
    vendu: properties.filter((p) => p.availability === "vendu").length,
    disponible: properties.filter((p) => p.availability === "disponible").length,
  }), [properties]);

  // Villes uniques triées
  const cityOptions = useMemo(() => {
    const cities = [...new Set(properties.map((p) => p.location.city))].sort();
    return cities.map((city) => ({
      value: city,
      label: `${city} (${properties.filter((p) => p.location.city === city).length})`,
    }));
  }, [properties]);

  // Quartiers uniques
  const neighborhoodOptions = useMemo(() => {
    const neighborhoods = [...new Set(properties.map((p) => p.location.neighborhood))].sort();
    return neighborhoods.map((neighborhood) => ({
      value: neighborhood,
      label: `${neighborhood} (${properties.filter((p) => p.location.neighborhood === neighborhood).length})`,
    }));
  }, [properties]);

  // Tranches de prix dynamiques
  const priceOptions = useMemo(() => {
    const ranges: { min: number; max: number | undefined; label: string }[] = [];

    const under300 = properties.filter((p) => p.price < 300000).length;
    if (under300 > 0) ranges.push({ min: 0, max: 300000, label: `< 300 000 € (${under300})` });
    
    const range300to500 = properties.filter((p) => p.price >= 300000 && p.price < 500000).length;
    if (range300to500 > 0) ranges.push({ min: 300000, max: 500000, label: `300 000 € - 500 000 € (${range300to500})` });

    const range500to700 = properties.filter((p) => p.price >= 500000 && p.price < 700000).length;
    if (range500to700 > 0) ranges.push({ min: 500000, max: 700000, label: `500 000 € - 700 000 € (${range500to700})` });

    const above700 = properties.filter((p) => p.price >= 700000).length;
    if (above700 > 0) ranges.push({ min: 700000, max: undefined, label: `> 700 000 € (${above700})` });

    return ranges.map((r) => ({
      value: `${r.min}-${r.max || ""}`,
      label: r.label,
    }));
  }, [properties]);

  // ==================== HANDLERS ====================

  const updateFilter = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({ status: "all" });
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, v]) => v !== undefined && v !== "" && key !== "status"
  ) || filters.status !== "all";

  const handlePriceChange = (rangeStr: string) => {
    if (!rangeStr) {
      onFiltersChange({
        ...filters,
        minPrice: undefined,
        maxPrice: undefined,
      });
      return;
    }
    const [min, max] = rangeStr.split("-").map((v) => (v ? Number(v) : undefined));
    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const currentPriceRange =
    filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? `${filters.minPrice || 0}-${filters.maxPrice || ""}`
      : "";

  const getPriceLabel = () => {
    if (!currentPriceRange) return "";
    const option = priceOptions.find((o) => o.value === currentPriceRange);
    return option?.label.replace(/\s*\(\d+\)$/, "") || "Budget personnalisé";
  };

  return (
    <div className={cn("relative", className)}>
      <div className="bg-noir-elegant border border-or/10 p-6">
        {/* Header mobile */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 text-ivoire"
          >
            <SlidersHorizontal size={20} className="text-or" />
            <span className="font-sans text-sm font-medium">Filtres</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 flex items-center justify-center bg-or text-noir text-[10px] font-bold rounded-full">
                {Object.values(filters).filter((v) => v !== undefined && v !== "" && v !== "all").length}
              </span>
            )}
          </button>
          <span className="font-sans text-sm text-gris-noble">
            {resultsCount} réalisation{resultsCount > 1 ? "s" : ""}
          </span>
        </div>

        {/* Grille de filtres */}
        <div
          className={cn(
            "grid gap-6 transition-all duration-500",
            "lg:grid-cols-4 lg:gap-4",
            "max-h-0 opacity-0 overflow-hidden",
            isExpanded && "max-h-[800px] opacity-100",
            "lg:max-h-none lg:opacity-100 lg:overflow-visible"
          )}
        >
          {/* Statut */}
          <StatusToggle
            value={filters.status || "all"}
            onChange={(v) => updateFilter("status", v)}
            counts={statusCounts}
          />

          {/* Localisation */}
          <FilterSelect
            icon={MapPin}
            label="Ville"
            value={filters.city || ""}
            options={cityOptions}
            onChange={(v) => updateFilter("city", v || undefined)}
            placeholder="Toutes les villes"
          />

          {/* Quartier */}
          <FilterSelect
            icon={MapPin}
            label="Quartier"
            value={(filters as any).neighborhood || ""}
            options={neighborhoodOptions}
            onChange={(v) => onFiltersChange({ ...filters, neighborhood: v || undefined } as any)}
            placeholder="Tous les quartiers"
          />

          {/* Budget */}
          <FilterSelect
            icon={Euro}
            label="Budget"
            value={currentPriceRange}
            options={priceOptions}
            onChange={handlePriceChange}
            placeholder="Tous les budgets"
          />
        </div>

        {/* Footer */}
        <div
          className={cn(
            "items-center justify-between pt-6 mt-6 border-t border-white/5",
            isExpanded ? "flex" : "hidden",
            "lg:flex"
          )}
        >
          <div className="flex items-center gap-6">
            <span className="font-serif text-xl text-ivoire">
              {resultsCount}{" "}
              <span className="text-gris-noble font-sans text-sm font-light">
                réalisation{resultsCount > 1 ? "s" : ""} trouvée{resultsCount > 1 ? "s" : ""}
              </span>
            </span>

            {/* Tags des filtres actifs */}
            {hasActiveFilters && (
              <div className="hidden lg:flex flex-wrap gap-2">
                {filters.status && filters.status !== "all" && (
                  <FilterTag
                    label={filters.status === "vendu" ? "Vendus" : "Disponibles"}
                    onRemove={() => updateFilter("status", "all")}
                  />
                )}
                {filters.city && (
                  <FilterTag
                    label={filters.city}
                    onRemove={() => updateFilter("city", undefined)}
                  />
                )}
                {(filters as any).neighborhood && (
                  <FilterTag
                    label={(filters as any).neighborhood}
                    onRemove={() => onFiltersChange({ ...filters, neighborhood: undefined } as any)}
                  />
                )}
                {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                  <FilterTag
                    label={getPriceLabel()}
                    onRemove={() => {
                      onFiltersChange({
                        ...filters,
                        minPrice: undefined,
                        maxPrice: undefined,
                      });
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-wider text-gris-noble hover:text-or transition-colors"
            >
              <RotateCcw size={14} />
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-or/10 border border-or/20 text-or text-xs font-sans">
      {label}
      <button onClick={onRemove} className="hover:text-ivoire transition-colors">
        <X size={12} />
      </button>
    </span>
  );
}
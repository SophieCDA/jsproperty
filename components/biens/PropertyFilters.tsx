"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { 
  MapPin, 
  Euro, 
  Maximize, 
  BedDouble, 
  Home, 
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw
} from "lucide-react";
import { PropertyFilters as FilterType, Property } from "@/types";

interface PropertyFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  resultsCount: number;
  properties: Property[]; // Les propriétés pour générer les options dynamiques
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
          {/* Option vide */}
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

// Composant pour les badges de chambres
function BedroomSelector({
  value,
  onChange,
  availableBedrooms,
}: {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  availableBedrooms: number[];
}) {
  return (
    <div>
      <label className="block font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-gris-noble mb-2">
        Chambres
      </label>
      <div className="flex gap-2">
        {availableBedrooms.map((num) => (
          <button
            key={num}
            onClick={() => onChange(value === num ? undefined : num)}
            className={cn(
              "w-10 h-10 flex items-center justify-center font-sans text-sm font-medium border transition-all duration-300",
              value === num
                ? "bg-or text-noir border-or"
                : "bg-transparent text-gris-clair border-white/10 hover:border-or/50 hover:text-ivoire"
            )}
          >
            {num}+
          </button>
        ))}
      </div>
    </div>
  );
}

export function PropertyFilters({
  filters,
  onFiltersChange,
  resultsCount,
  properties,
  className,
}: PropertyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // ==================== GÉNÉRATION DYNAMIQUE DES OPTIONS ====================

  // Villes uniques triées
  const cityOptions = useMemo(() => {
    const cities = [...new Set(properties.map((p) => p.location.city))].sort();
    return cities.map((city) => ({
      value: city,
      label: `${city} (${properties.filter((p) => p.location.city === city).length})`,
    }));
  }, [properties]);

  // Types de biens uniques
  const typeOptions = useMemo(() => {
    const types = [...new Set(properties.map((p) => p.type))];
    const typeLabels: Record<string, string> = {
      appartement: "Appartement",
      villa: "Villa",
      maison: "Maison",
      terrain: "Terrain",
      immeuble: "Immeuble",
    };
    return types.map((type) => ({
      value: type,
      label: `${typeLabels[type] || type} (${properties.filter((p) => p.type === type).length})`,
    }));
  }, [properties]);

  // Tranches de prix dynamiques basées sur les prix réels
  const priceOptions = useMemo(() => {
    const prices = properties.map((p) => p.price).sort((a, b) => a - b);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Créer des tranches intelligentes basées sur les données
    const ranges: { min: number; max: number | undefined; label: string }[] = [];

    if (minPrice < 300000) {
      const count = properties.filter((p) => p.price < 300000).length;
      if (count > 0) ranges.push({ min: 0, max: 300000, label: `< 300 000 € (${count})` });
    }
    
    const range300to500 = properties.filter((p) => p.price >= 300000 && p.price < 500000).length;
    if (range300to500 > 0) {
      ranges.push({ min: 300000, max: 500000, label: `300 000 € - 500 000 € (${range300to500})` });
    }

    const range500to700 = properties.filter((p) => p.price >= 500000 && p.price < 700000).length;
    if (range500to700 > 0) {
      ranges.push({ min: 500000, max: 700000, label: `500 000 € - 700 000 € (${range500to700})` });
    }

    const range700to900 = properties.filter((p) => p.price >= 700000 && p.price < 900000).length;
    if (range700to900 > 0) {
      ranges.push({ min: 700000, max: 900000, label: `700 000 € - 900 000 € (${range700to900})` });
    }

    const rangeAbove900 = properties.filter((p) => p.price >= 900000).length;
    if (rangeAbove900 > 0) {
      ranges.push({ min: 900000, max: undefined, label: `> 900 000 € (${rangeAbove900})` });
    }

    return ranges.map((r) => ({
      value: `${r.min}-${r.max || ""}`,
      label: r.label,
    }));
  }, [properties]);

  // Tranches de surface dynamiques
  const surfaceOptions = useMemo(() => {
    const surfaces = properties.filter((p) => p.surface > 0).map((p) => p.surface);
    if (surfaces.length === 0) return [];

    const ranges: { min: number; max: number | undefined; label: string }[] = [];

    const under50 = properties.filter((p) => p.surface > 0 && p.surface < 50).length;
    if (under50 > 0) ranges.push({ min: 0, max: 50, label: `< 50 m² (${under50})` });

    const range50to70 = properties.filter((p) => p.surface >= 50 && p.surface < 70).length;
    if (range50to70 > 0) ranges.push({ min: 50, max: 70, label: `50 - 70 m² (${range50to70})` });

    const range70to100 = properties.filter((p) => p.surface >= 70 && p.surface < 100).length;
    if (range70to100 > 0) ranges.push({ min: 70, max: 100, label: `70 - 100 m² (${range70to100})` });

    const above100 = properties.filter((p) => p.surface >= 100).length;
    if (above100 > 0) ranges.push({ min: 100, max: undefined, label: `> 100 m² (${above100})` });

    return ranges.map((r) => ({
      value: `${r.min}-${r.max || ""}`,
      label: r.label,
    }));
  }, [properties]);

  // Nombre de chambres disponibles
  const availableBedrooms = useMemo(() => {
    const bedrooms = [...new Set(properties.map((p) => p.bedrooms))].sort((a, b) => a - b);
    return bedrooms.filter((b) => b > 0);
  }, [properties]);

  // ==================== HANDLERS ====================

  const updateFilter = <K extends keyof FilterType>(key: K, value: FilterType[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== ""
  );

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

  const handleSurfaceChange = (rangeStr: string) => {
    if (!rangeStr) {
      onFiltersChange({
        ...filters,
        minSurface: undefined,
        maxSurface: undefined,
      });
      return;
    }
    const [min, max] = rangeStr.split("-").map((v) => (v ? Number(v) : undefined));
    onFiltersChange({
      ...filters,
      minSurface: min,
      maxSurface: max,
    });
  };

  const currentPriceRange =
    filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? `${filters.minPrice || 0}-${filters.maxPrice || ""}`
      : "";

  const currentSurfaceRange =
    filters.minSurface !== undefined || filters.maxSurface !== undefined
      ? `${filters.minSurface || 0}-${filters.maxSurface || ""}`
      : "";

  // Labels pour les tags actifs
  const getPriceLabel = () => {
    if (!currentPriceRange) return "";
    const option = priceOptions.find((o) => o.value === currentPriceRange);
    return option?.label.replace(/\s*\(\d+\)$/, "") || "Budget personnalisé";
  };

  const getSurfaceLabel = () => {
    if (!currentSurfaceRange) return "";
    const option = surfaceOptions.find((o) => o.value === currentSurfaceRange);
    return option?.label.replace(/\s*\(\d+\)$/, "") || "Surface personnalisée";
  };

  const typeLabels: Record<string, string> = {
    appartement: "Appartement",
    villa: "Villa",
    maison: "Maison",
    terrain: "Terrain",
    immeuble: "Immeuble",
  };

  return (
    <div className={cn("relative", className)}>
      {/* Barre de filtres principale */}
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
                {Object.values(filters).filter((v) => v !== undefined && v !== "").length}
              </span>
            )}
          </button>
          <span className="font-sans text-sm text-gris-noble">
            {resultsCount} bien{resultsCount > 1 ? "s" : ""}
          </span>
        </div>

        {/* Grille de filtres */}
        <div
          className={cn(
            "grid gap-6 transition-all duration-500",
            "lg:grid-cols-5 lg:gap-4",
            // Mobile: collapsible
            "max-h-0 opacity-0 overflow-hidden",
            isExpanded && "max-h-[800px] opacity-100",
            // Desktop: toujours visible
            "lg:max-h-none lg:opacity-100 lg:overflow-visible"
          )}
        >
          {/* Localisation */}
          <FilterSelect
            icon={MapPin}
            label="Localisation"
            value={filters.city || ""}
            options={cityOptions}
            onChange={(v) => updateFilter("city", v || undefined)}
            placeholder="Toutes les villes"
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

          {/* Surface */}
          <FilterSelect
            icon={Maximize}
            label="Surface"
            value={currentSurfaceRange}
            options={surfaceOptions}
            onChange={handleSurfaceChange}
            placeholder="Toutes surfaces"
          />

          {/* Type de bien */}
          <FilterSelect
            icon={Home}
            label="Type de bien"
            value={filters.type || ""}
            options={typeOptions}
            onChange={(v) => updateFilter("type", (v as FilterType["type"]) || undefined)}
            placeholder="Tous les types"
          />

          {/* Chambres */}
          <BedroomSelector
            value={filters.bedrooms}
            onChange={(v) => updateFilter("bedrooms", v)}
            availableBedrooms={availableBedrooms}
          />
        </div>

        {/* Footer avec résultats et reset */}
        <div
          className={cn(
            "items-center justify-between pt-6 mt-6 border-t border-white/5",
            // Mobile: visible seulement si expanded
            isExpanded ? "flex" : "hidden",
            // Desktop: toujours visible
            "lg:flex"
          )}
        >
          <div className="flex items-center gap-6">
            <span className="font-serif text-xl text-ivoire">
              {resultsCount}{" "}
              <span className="text-gris-noble font-sans text-sm font-light">
                bien{resultsCount > 1 ? "s" : ""} trouvé{resultsCount > 1 ? "s" : ""}
              </span>
            </span>

            {/* Tags des filtres actifs */}
            {hasActiveFilters && (
              <div className="hidden lg:flex flex-wrap gap-2">
                {filters.city && (
                  <FilterTag
                    label={filters.city}
                    onRemove={() => updateFilter("city", undefined)}
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
                {(filters.minSurface !== undefined || filters.maxSurface !== undefined) && (
                  <FilterTag
                    label={getSurfaceLabel()}
                    onRemove={() => {
                      onFiltersChange({
                        ...filters,
                        minSurface: undefined,
                        maxSurface: undefined,
                      });
                    }}
                  />
                )}
                {filters.type && (
                  <FilterTag
                    label={typeLabels[filters.type] || filters.type}
                    onRemove={() => updateFilter("type", undefined)}
                  />
                )}
                {filters.bedrooms && (
                  <FilterTag
                    label={`${filters.bedrooms}+ ch.`}
                    onRemove={() => updateFilter("bedrooms", undefined)}
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

// Composant Tag de filtre
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
      <button
        onClick={onRemove}
        className="hover:text-ivoire transition-colors"
      >
        <X size={12} />
      </button>
    </span>
  );
}
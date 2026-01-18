"use client";

import { useState, useMemo, useEffect } from "react";
import { Property, PropertyFilters as FilterType } from "@/types";
import { properties as allProperties, getAvailableProperties } from "@/lib/data";
import { BiensHero } from "@/components/biens/BiensHero";
import { PropertyFilters } from "@/components/biens/PropertyFilters";
import { ViewToggle, ViewMode } from "@/components/biens/ViewToggle";
import { PropertyGrid } from "@/components/biens/PropertyGrid";
import { SplitView } from "@/components/biens/SplitView";
import { PropertyMap } from "@/components/map/PropertyMap";
import { cn } from "@/lib/utils";
import { ArrowUpDown, TrendingUp, TrendingDown, Clock } from "lucide-react";

type SortOption = "price-asc" | "price-desc" | "date" | "surface";

const sortOptions: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: "date", label: "Plus récents", icon: Clock },
  { value: "price-asc", label: "Prix croissant", icon: TrendingUp },
  { value: "price-desc", label: "Prix décroissant", icon: TrendingDown },
  { value: "surface", label: "Surface", icon: ArrowUpDown },
];

export default function BiensPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<FilterType>({});
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);

  // Récupérer uniquement les biens disponibles par défaut
  const availableProperties = getAvailableProperties();

  // Filtrer les propriétés
  const filteredProperties = useMemo(() => {
    let result = [...availableProperties];

    // Filtre par ville
    if (filters.city) {
      result = result.filter((p) => p.location.city === filters.city);
    }

    // Filtre par prix min
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    // Filtre par prix max
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filtre par surface min
    if (filters.minSurface !== undefined) {
      result = result.filter((p) => p.surface >= filters.minSurface!);
    }

    // Filtre par surface max
    if (filters.maxSurface !== undefined) {
      result = result.filter((p) => p.surface <= filters.maxSurface!);
    }

    // Filtre par type
    if (filters.type) {
      result = result.filter((p) => p.type === filters.type);
    }

    // Filtre par nombre de chambres
    if (filters.bedrooms !== undefined) {
      result = result.filter((p) => p.bedrooms >= filters.bedrooms!);
    }

    return result;
  }, [availableProperties, filters]);

  // Trier les propriétés
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "surface":
        return sorted.sort((a, b) => b.surface - a.surface);
      case "date":
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [filteredProperties, sortBy]);

  // Gérer le sticky header des filtres
  useEffect(() => {
    const handleScroll = () => {
      setIsFiltersSticky(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-noir-elegant">
      {/* Hero Section */}
      <BiensHero
        totalProperties={allProperties.length}
        availableCount={availableProperties.length}
      />

      {/* Main Content */}
      <div className="relative">
        {/* Filters Bar */}
        <div
          className={cn(
            "bg-noir-elegant border-b border-or/10 transition-all duration-300",
            isFiltersSticky && "sticky top-0 z-40 shadow-lg shadow-noir/50"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              resultsCount={sortedProperties.length}
              properties={availableProperties}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-noir border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Sort */}
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs text-gris-noble uppercase tracking-wider">
                  Trier par
                </span>
                <div className="flex gap-2">
                  {sortOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setSortBy(value)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 font-sans text-xs transition-all duration-300",
                        sortBy === value
                          ? "text-or border-b-2 border-or"
                          : "text-gris-noble hover:text-ivoire"
                      )}
                    >
                      <Icon size={14} />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>
        </div>

        {/* Properties Display */}
        <div className="bg-noir-elegant">
          {viewMode === "grid" && (
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <PropertyGrid properties={sortedProperties} />
            </div>
          )}

          {viewMode === "list" && (
            <SplitView properties={sortedProperties} />
          )}

          {viewMode === "map" && (
            <div className="h-[calc(100vh-200px)] min-h-[600px]">
              <PropertyMap
                properties={sortedProperties}
                isFullScreen
              />
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {sortedProperties.length > 0 && (
          <BottomCTA count={sortedProperties.length} />
        )}
      </div>
    </div>
  );
}

// CTA en bas de page
function BottomCTA({ count }: { count: number }) {
  return (
    <section className="bg-noir py-20 border-t border-or/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-or mb-4">
          Vous n'avez pas trouvé votre bonheur ?
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ivoire mb-6">
          Contactez-nous pour une recherche personnalisée
        </h2>
        <p className="font-sans text-base text-gris-clair mb-8 max-w-2xl mx-auto">
          Notre équipe est à votre disposition pour vous accompagner dans la recherche 
          du bien idéal sur la Côte d'Azur, même s'il n'est pas encore dans notre portfolio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-or text-noir font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-or-clair transition-colors"
          >
            Nous contacter
          </a>
          <a
            href="tel:+33600000000"
            className="inline-flex items-center justify-center px-8 py-4 border border-or/30 text-or font-sans text-xs font-medium uppercase tracking-[0.2em] hover:border-or hover:bg-or/10 transition-all"
          >
            +33 6 00 00 00 00
          </a>
        </div>
      </div>
    </section>
  );
}
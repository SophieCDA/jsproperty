"use client";

import { useState, useMemo, useEffect } from "react";
import { Property, PropertyFilters as FilterType } from "@/types";
import { properties as allProperties, getRealisations, getSoldRealisations } from "@/lib/data";
import { RealisationsHero } from "@/components/realisations/RealisationsHero";
import { RealisationsFilters } from "@/components/realisations/RealisationsFilters";
import { RealisationsGrid } from "@/components/realisations/RealisationsGrid";
import { PropertyMap } from "@/components/map/PropertyMap";
import { cn } from "@/lib/utils";
import { ArrowUpDown, TrendingUp, TrendingDown, Clock, LayoutGrid, Map } from "lucide-react";

type SortOption = "date" | "price-asc" | "price-desc";
type StatusFilter = "all" | "vendu" | "disponible";

type ExtendedFilters = FilterType & { 
  status?: StatusFilter;
  neighborhood?: string;
};

const sortOptions: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: "date", label: "Plus récents", icon: Clock },
  { value: "price-asc", label: "Prix croissant", icon: TrendingUp },
  { value: "price-desc", label: "Prix décroissant", icon: TrendingDown },
];

export default function RealisationsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filters, setFilters] = useState<ExtendedFilters>({ status: "all" });
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);

  // Récupérer toutes les réalisations (biens rénovés par JS Property)
  const realisations = getRealisations();
  const soldRealisations = getSoldRealisations();

  // Filtrer les propriétés
  const filteredProperties = useMemo(() => {
    let result = [...realisations];

    // Filtre par statut
    if (filters.status === "vendu") {
      result = result.filter((p) => p.availability === "vendu");
    } else if (filters.status === "disponible") {
      result = result.filter((p) => p.availability === "disponible");
    }

    // Filtre par ville
    if (filters.city) {
      result = result.filter((p) => p.location.city === filters.city);
    }

    // Filtre par quartier
    if (filters.neighborhood) {
      result = result.filter((p) => p.location.neighborhood === filters.neighborhood);
    }

    // Filtre par prix min
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    // Filtre par prix max
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    return result;
  }, [realisations, filters]);

  // Trier les propriétés
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
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
      <RealisationsHero
        totalRealisations={realisations.length}
        soldCount={soldRealisations.length}
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
            <RealisationsFilters
              filters={filters}
              onFiltersChange={setFilters}
              resultsCount={sortedProperties.length}
              properties={realisations}
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

              {/* View Toggle simplifié */}
              <div className="flex items-center gap-1 p-1 bg-noir-surface border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300",
                    viewMode === "grid"
                      ? "bg-or text-noir"
                      : "text-gris-noble hover:text-ivoire"
                  )}
                >
                  <LayoutGrid size={16} />
                  <span className="hidden sm:inline">Grille</span>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300",
                    viewMode === "map"
                      ? "bg-or text-noir"
                      : "text-gris-noble hover:text-ivoire"
                  )}
                >
                  <Map size={16} />
                  <span className="hidden sm:inline">Carte</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Display */}
        <div className="bg-noir-elegant">
          {viewMode === "grid" && (
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <RealisationsGrid properties={sortedProperties} />
            </div>
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
        <BottomCTA />
      </div>
    </div>
  );
}

// CTA en bas de page
function BottomCTA() {
  return (
    <section className="bg-noir py-20 border-t border-or/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-or mb-4">
          Vous avez un bien à vendre ?
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-ivoire mb-6">
          Confiez-nous votre projet
        </h2>
        <p className="font-sans text-base text-gris-clair mb-8 max-w-2xl mx-auto">
          Notre expertise en rénovation et notre connaissance du marché nous permettent 
          de valoriser chaque bien. Recevez une offre d'achat sous 24 heures, 
          sans condition de financement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-or text-noir font-sans text-xs font-medium uppercase tracking-[0.2em] hover:bg-or-clair transition-colors"
          >
            Demander une estimation
          </a>
          <a
            href="/biens"
            className="inline-flex items-center justify-center px-8 py-4 border border-or/30 text-or font-sans text-xs font-medium uppercase tracking-[0.2em] hover:border-or hover:bg-or/10 transition-all"
          >
            Voir les biens disponibles
          </a>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState, useCallback } from "react";
import { Property } from "@/types";
import { PropertyListItem } from "./PropertyListItem";
import { PropertyMap } from "@/components/map/PropertyMap";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Expand, Minimize } from "lucide-react";

interface SplitViewProps {
  properties: Property[];
  className?: string;
}

export function SplitView({ properties, className }: SplitViewProps) {
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [listScrollPosition, setListScrollPosition] = useState(0);

  const handlePropertyHover = useCallback((property: Property | null) => {
    setHoveredPropertyId(property?.id || null);
  }, []);

  const handlePropertySelect = useCallback((property: Property | null) => {
    setSelectedPropertyId(property?.id || null);
    
    // Scroll vers le bien dans la liste
    if (property) {
      const element = document.getElementById(`property-${property.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <div className={cn("relative flex h-[calc(100vh-200px)] min-h-[600px]", className)}>
      {/* Liste des biens */}
      <div
        className={cn(
          "h-full overflow-y-auto custom-scrollbar transition-all duration-500",
          isMapExpanded ? "w-0 opacity-0" : "w-full lg:w-1/2"
        )}
      >
        <div className="p-6 space-y-4">
          {properties.length === 0 ? (
            <EmptyState />
          ) : (
            properties.map((property) => (
              <div key={property.id} id={`property-${property.id}`}>
                <PropertyListItem
                  property={property}
                  isHighlighted={
                    hoveredPropertyId === property.id || selectedPropertyId === property.id
                  }
                  onMouseEnter={() => setHoveredPropertyId(property.id)}
                  onMouseLeave={() => setHoveredPropertyId(null)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Séparateur */}
      <div
        className={cn(
          "hidden lg:block w-px bg-or/10 transition-opacity duration-500",
          isMapExpanded && "opacity-0"
        )}
      />

      {/* Carte */}
      <div
        className={cn(
          "h-full transition-all duration-500 relative",
          isMapExpanded ? "w-full" : "hidden lg:block lg:w-1/2"
        )}
      >
        <PropertyMap
          properties={properties}
          selectedPropertyId={hoveredPropertyId || selectedPropertyId}
          onPropertySelect={handlePropertySelect}
          onPropertyHover={handlePropertyHover}
          isFullScreen={isMapExpanded}
        />

        {/* Bouton expand/collapse */}
        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="absolute top-4 right-4 z-[1001] flex items-center gap-2 px-3 py-2 bg-noir/95 backdrop-blur-sm border border-or/20 text-ivoire font-sans text-xs uppercase tracking-wider hover:border-or hover:text-or transition-all duration-300"
        >
          {isMapExpanded ? (
            <>
              <Minimize size={14} />
              <span className="hidden sm:inline">Réduire</span>
            </>
          ) : (
            <>
              <Expand size={14} />
              <span className="hidden sm:inline">Agrandir</span>
            </>
          )}
        </button>

        {/* Liste compacte sur carte étendue */}
        {isMapExpanded && properties.length > 0 && (
          <CompactPropertyList
            properties={properties}
            hoveredPropertyId={hoveredPropertyId}
            selectedPropertyId={selectedPropertyId}
            onHover={setHoveredPropertyId}
            onSelect={(id) => setSelectedPropertyId(id)}
          />
        )}
      </div>

      {/* Bouton mobile pour voir la carte */}
      <button
        onClick={() => setIsMapExpanded(true)}
        className={cn(
          "lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 bg-or text-noir font-sans text-sm font-medium uppercase tracking-wider shadow-lg shadow-or/20",
          isMapExpanded && "hidden"
        )}
      >
        Voir la carte
      </button>
    </div>
  );
}

// Liste compacte pour la vue carte étendue
function CompactPropertyList({
  properties,
  hoveredPropertyId,
  selectedPropertyId,
  onHover,
  onSelect,
}: {
  properties: Property[];
  hoveredPropertyId: string | null;
  selectedPropertyId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={cn(
        "absolute bottom-4 left-4 right-20 z-[1000] transition-all duration-500",
        !isExpanded && "left-auto"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full w-8 h-16 bg-noir/95 backdrop-blur-sm border border-or/20 border-l-0 flex items-center justify-center text-gris-noble hover:text-or transition-colors"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Liste */}
      <div
        className={cn(
          "bg-noir/95 backdrop-blur-sm border border-or/20 overflow-hidden transition-all duration-500",
          isExpanded ? "max-w-full opacity-100" : "max-w-0 opacity-0"
        )}
      >
        <div className="p-3 border-b border-or/10">
          <span className="font-sans text-xs text-gris-noble">
            {properties.length} biens
          </span>
        </div>
        <div className="max-h-48 overflow-x-auto overflow-y-hidden custom-scrollbar-horizontal">
          <div className="flex gap-3 p-3">
            {properties.map((property) => (
              <CompactPropertyCard
                key={property.id}
                property={property}
                isActive={hoveredPropertyId === property.id || selectedPropertyId === property.id}
                onHover={() => onHover(property.id)}
                onLeave={() => onHover(null)}
                onClick={() => onSelect(property.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Card compacte pour la liste horizontale
function CompactPropertyCard({
  property,
  isActive,
  onHover,
  onLeave,
  onClick,
}: {
  property: Property;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={cn(
        "flex-shrink-0 w-48 text-left transition-all duration-300",
        isActive && "scale-105"
      )}
    >
      <div
        className={cn(
          "p-3 border transition-colors",
          isActive
            ? "bg-or/10 border-or"
            : "bg-noir-surface border-white/10 hover:border-or/30"
        )}
      >
        <span className="block font-serif text-sm text-ivoire truncate mb-1">
          {property.title}
        </span>
        <span className="block font-sans text-xs text-gris-noble truncate mb-2">
          {property.location.neighborhood}
        </span>
        <span className="block font-serif text-base text-or">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
          }).format(property.price)}
        </span>
      </div>
    </button>
  );
}

// État vide
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 border border-or/20 flex items-center justify-center mb-6">
        <span className="font-serif text-2xl text-or">0</span>
      </div>
      <h3 className="font-serif text-xl text-ivoire mb-2">Aucun bien trouvé</h3>
      <p className="font-sans text-sm text-gris-noble max-w-sm">
        Modifiez vos critères de recherche pour découvrir nos biens d'exception.
      </p>
    </div>
  );
}
"use client";

import { Property } from "@/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

interface PropertyGridProps {
  properties: Property[];
  className?: string;
}

export function PropertyGrid({ properties, className }: PropertyGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-property-id");
            if (id) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const items = gridRef.current?.querySelectorAll("[data-property-id]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [properties]);

  if (properties.length === 0) {
    return <EmptyState />;
  }

  return (
    <div ref={gridRef} className={cn("grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8", className)}>
      {properties.map((property, index) => (
        <div
          key={property.id}
          data-property-id={property.id}
          className={cn(
            "transition-all duration-700",
            visibleItems.has(property.id)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
          style={{
            transitionDelay: `${Math.min(index * 100, 500)}ms`,
          }}
        >
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 border border-or/20 flex items-center justify-center mb-6">
        <span className="font-serif text-3xl text-or">0</span>
      </div>
      <h3 className="font-serif text-2xl text-ivoire mb-3">
        Aucun bien ne correspond à votre recherche
      </h3>
      <p className="font-sans text-base text-gris-noble max-w-md">
        Modifiez vos critères de recherche ou explorez notre collection complète de biens d'exception sur la Côte d'Azur.
      </p>
    </div>
  );
}
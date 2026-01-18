"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PropertySimilarProps {
  properties: Property[];
}

export function PropertySimilar({ properties }: PropertySimilarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (properties.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-noir-elegant border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div>
            <SectionBadge text="Découvrez également" />
            <SectionTitle>
              Biens <Emphasis>similaires</Emphasis>
            </SectionTitle>
          </div>
          <Link href="/biens">
            <Button variant="outline" size="md">
              <span className="flex items-center gap-2">
                Voir tous nos biens
                <ArrowRight size={16} />
              </span>
            </Button>
          </Link>
        </div>

        {/* Grille de biens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className={cn(
                "transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
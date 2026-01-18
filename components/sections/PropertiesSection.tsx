"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getFeaturedProperties } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tab = "disponibles" | "realisations";

export function PropertiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("disponibles");

  const allProperties = getFeaturedProperties();
  const filteredProperties =
    activeTab === "disponibles"
      ? allProperties.filter((p) => p.availability === "disponible")
      : allProperties.filter(
          (p) => p.isRealisation == true || p.availability === "vendu"
        );

  // S'il n'y a pas assez de biens disponibles, on affiche tous les biens
  const displayProperties =
    filteredProperties.length >= 3
      ? filteredProperties.slice(0, 3)
      : allProperties.slice(0, 3);

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

  return (
    <section ref={sectionRef} className="bg-noir py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <SectionBadge text="Notre Portfolio" />
            <SectionTitle>
              Biens d&apos;<Emphasis>Exception</Emphasis>
            </SectionTitle>
          </div>

          {/* Tabs */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("disponibles")}
              className={cn(
                "font-sans text-xs font-medium uppercase tracking-[0.15em] px-6 py-3 border transition-all duration-300",
                activeTab === "disponibles"
                  ? "bg-or text-noir border-or"
                  : "bg-transparent text-gris-noble border-white/10 hover:border-or hover:text-or"
              )}
            >
              Disponibles
            </button>
            <button
              onClick={() => setActiveTab("realisations")}
              className={cn(
                "font-sans text-xs font-medium uppercase tracking-[0.15em] px-6 py-3 border transition-all duration-300",
                activeTab === "realisations"
                  ? "bg-or text-noir border-or"
                  : "bg-transparent text-gris-noble border-white/10 hover:border-or hover:text-or"
              )}
            >
              Réalisations
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProperties.map((property, index) => (
            <div
              key={property.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href={
              activeTab === "disponibles" ? "/biens" : "/realisations"
            }
          >
            <Button variant="primary" size="lg">
              Voir tous nos biens
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

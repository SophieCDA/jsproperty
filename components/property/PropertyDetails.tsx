"use client";

import { useEffect, useRef, useState } from "react";
import { Property } from "@/types";
import { formatPrice, formatSurface, cn } from "@/lib/utils";
import {
  Home,
  Bed,
  Bath,
  Maximize,
  Building,
  Calendar,
  FileText,
  Euro,
} from "lucide-react";

interface PropertyDetailsProps {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const typeLabels: Record<string, string> = {
    appartement: "Appartement",
    villa: "Villa",
    maison: "Maison",
    terrain: "Terrain",
    immeuble: "Immeuble",
  };

  const details = [
    {
      icon: Building,
      label: "Type de bien",
      value: typeLabels[property.type] || property.type,
    },
    {
      icon: Maximize,
      label: "Surface",
      value: formatSurface(property.surface),
    },
    {
      icon: Home,
      label: "Pièces",
      value: `${property.rooms} pièces`,
    },
    {
      icon: Bed,
      label: "Chambres",
      value: `${property.bedrooms} chambre${property.bedrooms > 1 ? "s" : ""}`,
    },
    {
      icon: Bath,
      label: "Salles de bain",
      value: `${property.bathrooms} salle${property.bathrooms > 1 ? "s" : ""} de bain`,
    },
    {
      icon: Euro,
      label: "Prix au m²",
      value: `${Math.round(property.price / property.surface).toLocaleString("fr-FR")} €/m²`,
    },
    ...(property.year
      ? [
          {
            icon: Calendar,
            label: "Année de réalisation",
            value: property.year.toString(),
          },
        ]
      : []),
    {
      icon: FileText,
      label: "Référence",
      value: property.reference,
    },
  ];

  return (
    <div ref={sectionRef}>
      {/* Titre de section */}
      <div
        className={cn(
          "mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <span className="inline-block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-or mb-4">
          Le bien
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-ivoire">
          Description
        </h2>
      </div>

      {/* Description */}
      <div
        className={cn(
          "mb-12 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <p className="font-sans text-base font-light text-gris-clair leading-relaxed whitespace-pre-line">
          {property.description}
        </p>
      </div>

      {/* Grille de détails */}
      <div
        className={cn(
          "transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <h3 className="font-serif text-xl text-ivoire mb-6">
          Caractéristiques
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={cn(
                "p-5 bg-noir-surface border border-white/5 transition-all duration-500 hover:border-or/20",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${300 + index * 50}ms` }}
            >
              <detail.icon size={20} className="text-or mb-3" />
              <span className="block font-sans text-[0.65rem] font-medium uppercase tracking-wider text-gris-noble mb-1">
                {detail.label}
              </span>
              <span className="font-serif text-lg text-ivoire">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badge réalisation JS Property */}
      {property.isRealisation && (
        <div
          className={cn(
            "mt-10 p-6 bg-or/5 border border-or/20 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center border border-or">
              <span className="font-serif text-lg font-medium text-or">JS</span>
            </div>
            <div>
              <h4 className="font-serif text-lg text-ivoire mb-2">
                Réalisation JS Property
              </h4>
              <p className="font-sans text-sm font-light text-gris-clair leading-relaxed">
                Ce bien a été entièrement rénové par nos équipes selon nos
                standards d&apos;excellence. Chaque détail a été pensé pour
                offrir un confort optimal et des finitions haut de gamme.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
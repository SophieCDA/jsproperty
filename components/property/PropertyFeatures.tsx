"use client";

import { useEffect, useRef, useState } from "react";
import { Property } from "@/types";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

interface PropertyFeaturesProps {
  property: Property;
}

export function PropertyFeatures({ property }: PropertyFeaturesProps) {
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

  if (!property.features || property.features.length === 0) return null;

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
          Équipements
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-ivoire">
          Prestations & atouts
        </h2>
      </div>

      {/* Grille des features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {property.features.map((feature, index) => (
          <div
            key={feature}
            className={cn(
              "group flex items-center gap-4 p-5 bg-noir-surface border border-white/5 transition-all duration-500 hover:border-or/30 hover:bg-or/5",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            )}
            style={{ transitionDelay: `${index * 75}ms` }}
          >
            <div className="w-10 h-10 flex items-center justify-center border border-or/30 bg-or/5 group-hover:bg-or group-hover:border-or transition-colors duration-300">
              <Check
                size={18}
                className="text-or group-hover:text-noir transition-colors duration-300"
              />
            </div>
            <span className="font-sans text-base text-gris-clair group-hover:text-ivoire transition-colors duration-300">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Section avantages supplémentaires si réalisation */}
      {property.isRealisation && (
        <div
          className={cn(
            "mt-10 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={20} className="text-or" />
            <h3 className="font-serif text-xl text-ivoire">
              Finitions premium incluses
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "Parquet premium",
              "Peinture haut de gamme",
              "Sanitaires design",
              "Robinetterie de marque",
              "Électricité aux normes",
              "Isolation phonique",
            ].map((item, index) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-2 text-gris-clair transition-all duration-500",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              >
                <div className="w-1.5 h-1.5 bg-or rounded-full" />
                <span className="font-sans text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
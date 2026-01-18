"use client";

import { useEffect, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

interface RealisationsHeroProps {
  totalRealisations: number;
  soldCount: number;
}

export function RealisationsHero({ totalRealisations, soldCount }: RealisationsHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-noir pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 169, 98, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 169, 98, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-transparent to-noir" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-or/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-azur-profond/10 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <SectionBadge text="Notre Savoir-Faire" />
          </div>

          {/* Title */}
          <h1
            className={cn(
              "font-serif text-4xl md:text-5xl lg:text-6xl font-light text-ivoire leading-[1.1] mt-6 transition-all duration-700 delay-150",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Nos <em className="italic text-or">Réalisations</em>
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "font-sans text-base md:text-lg font-light text-gris-clair mt-6 max-w-xl transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Découvrez nos projets de rénovation et de transformation. 
            Chaque bien témoigne de notre expertise et de notre engagement 
            envers l'excellence sur la Côte d'Azur.
          </p>

          {/* Stats */}
          <div
            className={cn(
              "flex items-center gap-8 mt-10 transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-or/30" />
              <div>
                <span className="block font-serif text-4xl text-or">
                  {totalRealisations}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-gris-noble">
                  Réalisations
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-white/10" />
              <div>
                <span className="block font-serif text-4xl text-ivoire">
                  {soldCount}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-gris-noble">
                  Vendus
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-px h-12 bg-white/10" />
              <div>
                <span className="block font-serif text-4xl text-ivoire">
                  10+
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-gris-noble">
                  Années d'expérience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-noir-elegant to-transparent" />
    </section>
  );
}
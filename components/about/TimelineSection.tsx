"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Building2, Award, TrendingUp, MapPin, Star, Sparkles } from "lucide-react";

const milestones = [
  {
    year: "2009",
    title: "Les Débuts",
    description:
      "Création de JS Property par Joachim Seroussi. Première acquisition d'un appartement à Nice pour rénovation complète.",
    icon: Building2,
    highlight: false,
  },
  {
    year: "2012",
    title: "Première Villa",
    description:
      "Acquisition et rénovation d'une première villa sur les hauteurs de Nice. Début de la diversification du portfolio.",
    icon: MapPin,
    highlight: false,
  },
  {
    year: "2015",
    title: "Expansion",
    description:
      "Extension de notre activité sur l'ensemble de la Côte d'Azur : Cannes, Antibes, Cap d'Ail. Plus de 20 projets réalisés.",
    icon: TrendingUp,
    highlight: false,
  },
  {
    year: "2018",
    title: "Reconnaissance",
    description:
      "JS Property devient une référence sur le marché du luxe azuréen. Partenariats avec les meilleurs artisans de la région.",
    icon: Award,
    highlight: true,
  },
  {
    year: "2021",
    title: "Cap des 40 Projets",
    description:
      "Franchissement du cap symbolique des 40 réalisations. Spécialisation dans les biens haut de gamme et d'exception.",
    icon: Star,
    highlight: false,
  },
  {
    year: "2024",
    title: "Nouvelle Ère",
    description:
      "Lancement de notre nouvelle plateforme digitale. Plus de 50 projets à notre actif et une vision tournée vers l'avenir.",
    icon: Sparkles,
    highlight: true,
  },
];

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Progressive reveal of timeline items
          milestones.forEach((_, index) => {
            setTimeout(() => {
              setActiveIndex(index);
            }, 300 * index);
          });
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
    <section ref={sectionRef} className="bg-noir py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBadge text="Notre Parcours" centered />
          <SectionTitle className="mt-6">
            10 ans d&apos;<Emphasis>excellence</Emphasis>
          </SectionTitle>
          <p className="font-sans text-base font-light text-gris-clair max-w-2xl mx-auto mt-6">
            Des premières acquisitions aux projets d&apos;envergure, découvrez
            les moments clés qui ont façonné JS Property.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-or/50 via-or/30 to-transparent hidden lg:block" />

          {/* Mobile Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-or/50 via-or/30 to-transparent lg:hidden" />

          {/* Milestones */}
          <div className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const isActive = index <= activeIndex;

              return (
                <div
                  key={milestone.year}
                  className={`relative lg:flex lg:items-center lg:gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div
                    className={`lg:w-[calc(50%-2rem)] ml-20 lg:ml-0 transition-all duration-700 ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
                    }`}
                  >
                    <div
                      className={`relative p-6 lg:p-8 bg-noir-elegant border transition-all duration-300 ${
                        milestone.highlight
                          ? "border-or/40 hover:border-or"
                          : "border-white/5 hover:border-or/30"
                      }`}
                    >
                      {/* Year Badge */}
                      <div
                        className={`absolute -top-4 ${
                          isEven ? "lg:right-8" : "lg:left-8"
                        } left-6 px-4 py-1 bg-noir border border-or font-serif text-lg text-or`}
                      >
                        {milestone.year}
                      </div>

                      {/* Content */}
                      <div className="pt-4">
                        <h3 className="font-serif text-xl lg:text-2xl text-ivoire mb-3">
                          {milestone.title}
                        </h3>
                        <p className="font-sans text-sm font-light text-gris-clair leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>

                      {/* Highlight Badge */}
                      {milestone.highlight && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-or rounded-full flex items-center justify-center">
                          <Star size={12} className="text-noir" fill="currentColor" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div
                    className={`absolute left-8 lg:left-1/2 top-6 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-10 transition-all duration-500 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        milestone.highlight
                          ? "bg-or text-noir"
                          : "bg-noir-elegant border-2 border-or/50 text-or"
                      }`}
                    >
                      <milestone.icon size={24} />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>

          {/* End Marker */}
          <div
            className={`absolute left-8 lg:left-1/2 bottom-0 -translate-x-1/2 transition-all duration-700 delay-1000 ${
              activeIndex >= milestones.length - 1
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <div className="w-4 h-4 bg-or rounded-full" />
            <div className="w-8 h-8 border border-or/30 rounded-full absolute -top-2 -left-2 animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
}
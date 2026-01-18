"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import {
  Diamond,
  Shield,
  Sparkles,
  Target,
  HandshakeIcon,
  Eye,
} from "lucide-react";

const values = [
  {
    icon: Diamond,
    title: "Excellence",
    subtitle: "Sans compromis",
    description:
      "Chaque détail compte. De la sélection des biens aux finitions, nous visons l'excellence absolue dans tout ce que nous entreprenons.",
    gradient: "from-or/20 to-transparent",
  },
  {
    icon: Shield,
    title: "Intégrité",
    subtitle: "Confiance totale",
    description:
      "Notre réputation repose sur une transparence totale. Nous construisons des relations durables basées sur l'honnêteté et le respect mutuel.",
    gradient: "from-azur-profond/30 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    subtitle: "Vision moderne",
    description:
      "Nous réinventons l'immobilier de luxe en intégrant les dernières tendances architecturales et les technologies contemporaines.",
    gradient: "from-or/20 to-transparent",
  },
  {
    icon: Target,
    title: "Précision",
    subtitle: "Expertise pointue",
    description:
      "Notre connaissance approfondie du marché azuréen nous permet d'identifier des opportunités uniques et de maximiser chaque investissement.",
    gradient: "from-azur-profond/30 to-transparent",
  },
  {
    icon: HandshakeIcon,
    title: "Engagement",
    subtitle: "Réactivité 24h",
    description:
      "Grâce à notre autonomie financière, nous pouvons nous engager rapidement et proposer des offres fermes dans les 24 heures.",
    gradient: "from-or/20 to-transparent",
  },
  {
    icon: Eye,
    title: "Vision",
    subtitle: "Avant-gardiste",
    description:
      "Nous anticipons les évolutions du marché et concevons des espaces qui traverseront les décennies avec élégance.",
    gradient: "from-azur-profond/30 to-transparent",
  },
];

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section ref={sectionRef} className="bg-noir-elegant py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBadge text="Nos Valeurs" centered />
          <SectionTitle className="mt-6 max-w-3xl mx-auto">
            Les piliers de notre <Emphasis>engagement</Emphasis>
          </SectionTitle>
          <p className="font-sans text-base font-light text-gris-clair max-w-2xl mx-auto mt-6">
            Six principes fondamentaux guident chacune de nos actions et
            définissent notre approche unique de l&apos;immobilier de prestige.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative bg-noir border border-white/5 p-8 transition-all duration-700 hover:border-or/30 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 border border-or/30 flex items-center justify-center mb-6 group-hover:bg-or/10 transition-colors duration-300">
                  <value.icon
                    size={24}
                    className="text-or"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title & Subtitle */}
                <div className="mb-4">
                  <h3 className="font-serif text-2xl text-ivoire mb-1">
                    {value.title}
                  </h3>
                  <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-or">
                    {value.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-sm font-light text-gris-clair leading-relaxed">
                  {value.description}
                </p>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-px h-8 bg-or/40" />
                  <div className="absolute bottom-0 right-0 w-8 h-px bg-or/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Quote, Award, MapPin, Building } from "lucide-react";

const achievements = [
  {
    icon: Building,
    title: "50+ opérations",
    description: "Réalisations d'exception",
  },
  {
    icon: MapPin,
    title: "Nice & Côte d'Azur",
    description: "Expertise locale",
  },
  {
    icon: Award,
    title: "100% fonds propres",
    description: "Autonomie financière",
  },
];

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-noir py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Portrait */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Joachim Seroussi - Fondateur de JS Property"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-or/30 -z-10" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-or/10 -z-10" />

              {/* Name Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-6 bg-noir border border-or/30 px-8 py-4 shadow-2xl">
                <span className="font-serif text-xl text-or block">
                  Joachim Seroussi
                </span>
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gris-noble">
                  Fondateur & CEO
                </span>
              </div>
            </div>

            {/* Achievement Cards - Mobile */}
            <div className="flex justify-center gap-4 mt-16 lg:hidden">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className="flex flex-col items-center text-center px-4"
                >
                  <achievement.icon size={20} className="text-or mb-2" />
                  <span className="font-sans text-xs font-medium text-ivoire">
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <SectionBadge text="Le Fondateur" />

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-ivoire leading-tight mt-6 mb-8">
              Une vision portée par
              <br />
              <span className="italic text-or">l&apos;excellence</span>
            </h2>

            {/* Quote */}
            <div className="relative pl-8 mb-8 border-l-2 border-or/30">
              <Quote
                size={24}
                className="absolute -left-3 -top-2 text-or/40 rotate-180"
              />
              <p className="font-serif text-xl md:text-2xl text-gris-clair italic leading-relaxed">
                « Mon ambition est de redéfinir l&apos;immobilier de luxe en
                conjuguant savoir-faire artisanal et vision contemporaine. »
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-5 font-sans text-base font-light text-gris-clair leading-relaxed">
              <p>
                Fort de plus de 10 années d&apos;expérience dans l&apos;immobilier de
                prestige,{" "}
                <strong className="text-ivoire font-medium">
                  Joachim Seroussi
                </strong>{" "}
                a fondé JS Property avec une conviction : transformer chaque
                acquisition en une véritable opportunité d&apos;investissement.
              </p>
              <p>
                Sa connaissance approfondie du marché azuréen, combinée à un
                réseau d&apos;artisans d&apos;exception, lui permet d&apos;identifier et de
                sublimer des biens au potentiel unique. Chaque projet porte sa
                signature : l&apos;alliance du raffinement et de la fonctionnalité.
              </p>
              <p>
                Grâce à une{" "}
                <strong className="text-ivoire font-medium">
                  totale autonomie financière
                </strong>
                , JS Property peut s&apos;engager rapidement et proposer des offres
                fermes sous 24 heures, sans condition suspensive de financement.
              </p>
            </div>

            {/* Achievement Cards - Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-or/30 flex items-center justify-center flex-shrink-0">
                      <achievement.icon size={18} className="text-or" />
                    </div>
                    <div>
                      <span className="font-sans text-sm font-medium text-ivoire block">
                        {achievement.title}
                      </span>
                      <span className="font-sans text-xs text-gris-noble">
                        {achievement.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
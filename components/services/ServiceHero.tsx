"use client";

import { useEffect, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import * as LucideIcons from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface ServiceHeroProps {
  badge: string;
  title: string;
  titleEmphasis: string;
  description: string;
  iconName: IconName;
  stats?: {
    value: string;
    label: string;
  }[];
}

export function ServiceHero({
  badge,
  title,
  titleEmphasis,
  description,
  iconName,
  stats,
}: ServiceHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Récupérer l'icône dynamiquement
  const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-noir-elegant pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-or/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-azur-profond/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <div
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <SectionBadge text={badge} />
            </div>

            <div
              className={`transition-all duration-700 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <SectionTitle as="h1" className="mb-6">
                {title}
                <br />
                <Emphasis>{titleEmphasis}</Emphasis>
              </SectionTitle>
            </div>

            <p
              className={`font-sans text-base font-light text-gris-clair leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {description}
            </p>

            {/* Stats */}
            {stats && (
              <div
                className={`flex flex-wrap gap-8 transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span className="block font-serif text-4xl text-or mb-1">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-gris-noble">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Icon Visual */}
          <div
            className={`hidden lg:flex justify-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute inset-0 w-80 h-80 border border-or/10 rounded-full animate-pulse-soft" />
              <div className="absolute inset-4 w-72 h-72 border border-or/20 rounded-full" />
              <div className="absolute inset-8 w-64 h-64 border border-or/30 rounded-full" />
              
              {/* Center icon */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                <div className="w-32 h-32 bg-or/10 border border-or/40 flex items-center justify-center">
                  <Icon size={56} className="text-or" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
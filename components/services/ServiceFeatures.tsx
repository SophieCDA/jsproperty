"use client";

import { useEffect, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = keyof typeof LucideIcons;

interface Feature {
  iconName: IconName;
  title: string;
  description: string;
  highlights?: string[];
}

interface ServiceFeaturesProps {
  badge: string;
  title: string;
  subtitle: string;
  features: Feature[];
  variant?: "grid" | "list";
}

export function ServiceFeatures({
  badge,
  title,
  subtitle,
  features,
  variant = "grid",
}: ServiceFeaturesProps) {
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
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-or" />
            <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-4">
            {title}
          </h2>
          <p className="font-sans text-sm font-light text-gris-clair">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        {variant === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = LucideIcons[feature.iconName] as LucideIcons.LucideIcon;
              return (
                <div
                  key={index}
                  className={cn(
                    "group bg-noir-surface border border-white/5 p-8 hover:border-or/20 transition-all duration-500",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-14 h-14 border border-or/30 flex items-center justify-center mb-6 group-hover:bg-or/10 transition-colors">
                    <Icon size={26} className="text-or" />
                  </div>
                  <h3 className="font-serif text-xl text-ivoire mb-3 group-hover:text-or transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm font-light text-gris-noble leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Highlights */}
                  {feature.highlights && (
                    <ul className="mt-4 space-y-2">
                      {feature.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 font-sans text-xs text-gris-clair"
                        >
                          <LucideIcons.Check size={14} className="text-or flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = LucideIcons[feature.iconName] as LucideIcons.LucideIcon;
              return (
                <div
                  key={index}
                  className={cn(
                    "group flex flex-col md:flex-row gap-6 bg-noir-surface border border-white/5 p-8 hover:border-or/20 transition-all duration-500",
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-14 h-14 flex-shrink-0 border border-or/30 flex items-center justify-center group-hover:bg-or/10 transition-colors">
                    <Icon size={26} className="text-or" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-ivoire mb-2 group-hover:text-or transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-sm font-light text-gris-noble leading-relaxed">
                      {feature.description}
                    </p>

                    {feature.highlights && (
                      <div className="flex flex-wrap gap-4 mt-4">
                        {feature.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-or/5 border border-or/20 font-sans text-xs text-or"
                          >
                            <LucideIcons.Check size={12} />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
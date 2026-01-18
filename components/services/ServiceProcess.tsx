"use client";

import { useEffect, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = keyof typeof LucideIcons;

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName: IconName;
}

interface ServiceProcessProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export function ServiceProcess({ title, subtitle, steps }: ServiceProcessProps) {
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
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-or" />
            <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
              Notre Processus
            </span>
            <span className="w-8 h-px bg-or" />
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-4">
            {title}
          </h2>
          <p className="font-sans text-sm font-light text-gris-clair">
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = LucideIcons[step.iconName] as LucideIcons.LucideIcon;
              return (
                <div
                  key={index}
                  className={cn(
                    "relative transition-all duration-700",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Step Card */}
                  <div className="group bg-noir-elegant border border-white/5 p-8 h-full hover:border-or/20 transition-all duration-500">
                    {/* Number & Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-serif text-5xl text-or/20 group-hover:text-or/40 transition-colors">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 border border-or/30 flex items-center justify-center group-hover:bg-or/10 transition-colors">
                        <Icon size={22} className="text-or" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-xl text-ivoire mb-3 group-hover:text-or transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm font-light text-gris-noble leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-24 w-6 h-6 z-10">
                      <div className="w-3 h-3 border-t border-r border-or/40 transform rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
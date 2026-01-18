"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-noir-elegant pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-or/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-azur-profond/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <SectionBadge text="Contact" />
          </div>

          {/* Title */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <SectionTitle as="h1" className="mb-6">
              Donnons vie à votre
              <br />
              <Emphasis>projet immobilier</Emphasis>
            </SectionTitle>
          </div>

          {/* Subtitle */}
          <p
            className={`font-sans text-base font-light text-gris-clair leading-relaxed max-w-xl transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Que vous souhaitiez vendre, acheter ou investir, notre équipe d&apos;experts 
            vous accompagne à chaque étape de votre projet sur la French Riviera.
          </p>

          {/* Decorative line */}
          <div
            className={`mt-10 h-px bg-gradient-to-r from-or via-or/50 to-transparent max-w-xs transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
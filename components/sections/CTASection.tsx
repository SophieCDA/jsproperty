"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { CheckCircle } from "lucide-react";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-azur-profond via-noir to-noir" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBadge text="Vendez votre bien" centered />
        </div>

        <h2
          className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light text-ivoire leading-tight mb-8 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Recevez une offre d&apos;achat
          <br />
          pour votre bien sous 24 heures
        </h2>

        {/* Highlight Box */}
        <div
          className={`inline-flex items-center gap-4 px-6 py-4 border border-or/30 bg-or/10 mb-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CheckCircle size={24} className="text-or" />
          <span className="font-serif text-lg md:text-xl text-or-clair">
            Sans condition suspensive de financement
          </span>
        </div>

        <p
          className={`font-sans text-base md:text-lg font-light text-gris-clair max-w-2xl mx-auto mb-10 transition-all duration-700 delay-450 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Fort de sa stabilité financière, notre groupe est en mesure de vous
          proposer une offre d&apos;achat ferme sous 24 heures. Appartements,
          villas, immeubles ou terrains — nous étudions toutes les opportunités.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Nous contacter
            </Button>
          </Link>
          <a href="tel:+33634780000">
            <Button variant="secondary" size="lg">
              +33 6 34 78 00 00
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function AboutCTASection() {
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
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-noir via-azur-profond/30 to-noir" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-or" />
              <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
                Commençons ensemble
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-ivoire leading-tight mb-6">
              Prêt à concrétiser
              <br />
              <span className="italic text-or">votre projet ?</span>
            </h2>

            <p className="font-sans text-base font-light text-gris-clair leading-relaxed mb-8">
              Que vous souhaitiez acquérir un bien d&apos;exception, vendre votre
              propriété ou simplement obtenir une estimation gratuite, notre
              équipe est à votre disposition pour vous accompagner.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Prendre rendez-vous
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/biens">
                <Button variant="secondary" size="lg">
                  Voir nos biens
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-noir/80 backdrop-blur-xl border border-or/20 p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-ivoire mb-8">
                Contactez-nous directement
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href="tel:+33634780000"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 border border-or/30 flex items-center justify-center flex-shrink-0 group-hover:bg-or/10 transition-colors">
                    <Phone size={20} className="text-or" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-gris-noble block mb-1">
                      Téléphone
                    </span>
                    <span className="font-sans text-lg text-ivoire group-hover:text-or transition-colors">
                      +33 6 34 78 00 00
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@jsproperty.fr"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 border border-or/30 flex items-center justify-center flex-shrink-0 group-hover:bg-or/10 transition-colors">
                    <Mail size={20} className="text-or" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-gris-noble block mb-1">
                      Email
                    </span>
                    <span className="font-sans text-lg text-ivoire group-hover:text-or transition-colors">
                      contact@jsproperty.fr
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-or/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-or" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-gris-noble block mb-1">
                      Adresse
                    </span>
                    <span className="font-sans text-lg text-ivoire">
                      2 rue Spitalieri
                      <br />
                      06000 Nice
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability Badge */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-sans text-sm text-gris-clair">
                    Disponible pour un appel ou une visite
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
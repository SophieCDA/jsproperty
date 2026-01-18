"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const visionPoints = [
  {
    title: "Sélection Rigoureuse",
    description:
      "Nous ne sélectionnons que des biens présentant un potentiel de transformation exceptionnel.",
  },
  {
    title: "Artisanat d'Excellence",
    description:
      "Un réseau d'artisans locaux triés sur le volet pour des finitions irréprochables.",
  },
  {
    title: "Design Intemporel",
    description:
      "Nous créons des espaces qui allient élégance contemporaine et fonctionnalité durable.",
  },
  {
    title: "Rentabilité Maîtrisée",
    description:
      "Chaque projet est conçu pour maximiser la valeur du bien et la satisfaction client.",
  },
];

const expertise = [
  { label: "Acquisition", percentage: 95 },
  { label: "Rénovation", percentage: 90 },
  { label: "Vente", percentage: 98 },
  { label: "Conseil", percentage: 92 },
];

export function TeamVisionSection() {
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
    <section ref={sectionRef} className="bg-noir-elegant py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Vision Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <SectionBadge text="Notre Vision" />

            <h2 className="font-serif text-3xl md:text-4xl font-light text-ivoire leading-tight mt-6 mb-8">
              Transformer l&apos;ordinaire
              <br />
              en <span className="italic text-or">extraordinaire</span>
            </h2>

            <p className="font-sans text-base font-light text-gris-clair leading-relaxed mb-10">
              Notre approche unique combine une connaissance approfondie du
              marché local avec une vision créative affirmée. Chaque bien que
              nous sélectionnons recèle un potentiel que nous révélons avec
              passion et savoir-faire.
            </p>

            {/* Vision Points */}
            <div className="space-y-6">
              {visionPoints.map((point, index) => (
                <div
                  key={point.title}
                  className={`flex gap-4 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 border border-or flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="text-or" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-medium text-ivoire mb-1">
                      {point.title}
                    </h4>
                    <p className="font-sans text-sm font-light text-gris-noble">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/realisations"
              className="inline-flex items-center gap-3 mt-10 font-sans text-sm font-medium text-or hover:text-or-clair transition-colors group"
            >
              Découvrir nos réalisations
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Expertise & Visual */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Image Grid */}
            <div className="relative mb-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/images/vision-1.jpg"
                    alt="Rénovation intérieure de luxe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="aspect-[4/5] relative overflow-hidden mt-8">
                  <Image
                    src="/images/vision-2.jpg"
                    alt="Détail finition haut de gamme"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-noir border border-or/30 px-8 py-6 shadow-2xl w-[280px]">
                <div className="text-center">
                  <span className="font-serif text-4xl text-or">98%</span>
                  <p className="font-sans text-xs text-gris-noble mt-1">
                    Clients satisfaits
                  </p>
                </div>
              </div>
            </div>

            {/* Expertise Bars */}
            <div className="mt-20 space-y-6">
              <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gris-noble mb-6">
                Notre Expertise
              </h3>

              {expertise.map((item, index) => (
                <div
                  key={item.label}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-sans text-sm text-ivoire">
                      {item.label}
                    </span>
                    <span className="font-sans text-sm text-or">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-1 bg-noir-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-or to-or-clair rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${item.percentage}%` : "0%",
                        transitionDelay: `${700 + index * 100}ms`,
                      }}
                    />
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
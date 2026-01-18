"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Clock, CheckCircle, Home, MapPin } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Offre d'achat",
    subtitle: "sous 24 heures",
  },
  {
    icon: CheckCircle,
    title: "Sans condition",
    subtitle: "de financement",
  },
  {
    icon: Home,
    title: "Expertise en",
    subtitle: "rénovation",
  },
  {
    icon: MapPin,
    title: "Spécialiste",
    subtitle: "Côte d'Azur",
  },
];

export function AboutSection() {
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <SectionBadge text="Notre Savoir-Faire" />

            <SectionTitle className="mb-8">
              Une expertise unique
              <br />
              sur la <Emphasis>French Riviera</Emphasis>
            </SectionTitle>

            <div className="space-y-6 font-sans text-base font-light text-gris-clair leading-relaxed">
              <p>
                Le groupe{" "}
                <strong className="text-ivoire font-medium">JS Property</strong>
                , fondé et dirigé par Joachim Seroussi, s&apos;est imposé comme
                une référence dans l&apos;acquisition, la réhabilitation et la
                revente de biens immobiliers d&apos;exception sur la Côte
                d&apos;Azur.
              </p>
              <p>
                Notre connaissance approfondie du marché local nous permet de
                cibler des opportunités uniques et de transformer chaque bien en
                un investissement de qualité, assurant satisfaction et
                rentabilité à nos clients.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-4 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 border border-or flex items-center justify-center flex-shrink-0">
                    <feature.icon size={18} className="text-or" />
                  </div>
                  <div>
                    <span className="font-sans text-sm font-medium text-ivoire block">
                      {feature.title}
                    </span>
                    <span className="font-sans text-sm font-light text-gris-noble">
                      {feature.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div
            className={`relative h-[500px] lg:h-[600px] transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-[85%] h-[75%] overflow-hidden">
              <Image
                src="/images/accueil-1.jpg"
                alt="Villa de luxe Côte d'Azur"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Secondary Image */}
            <div className="absolute bottom-0 left-0 w-[55%] h-[50%] overflow-hidden border-8 border-noir-elegant z-10">
              <Image
                src="/images/accueil-2.jpg"
                alt="Intérieur rénovation luxe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 30vw"
              />
            </div>

            {/* Decorative Frame */}
            <div className="absolute -top-5 -right-5 w-[85%] h-[75%] border border-or/30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

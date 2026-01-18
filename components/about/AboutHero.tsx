"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function AboutHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/about-hero.jpg')`,
          }}
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-noir/50 to-noir" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/60 via-transparent to-noir/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-or/10 rounded-full opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-or/5 rounded-full opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-3 mb-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="w-12 h-px bg-or" />
          <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
            Notre Histoire
          </span>
          <span className="w-12 h-px bg-or" />
        </div>

        {/* Main Title */}
        <h1
          className={`font-serif text-4xl md:text-5xl lg:text-7xl font-light text-ivoire leading-[1.1] mb-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          L&apos;Excellence au service
          <br />
          <span className="italic text-or">de votre patrimoine</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-sans text-base md:text-lg font-light text-gris-clair max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Depuis plus de 10 ans, JS Property accompagne une clientèle exigeante
          dans la réalisation de ses projets immobiliers sur la Côte d&apos;Azur.
          Une expertise unique, une vision d&apos;exception.
        </p>

        {/* Signature */}
        <div
          className={`mt-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="inline-flex flex-col items-center gap-2 py-6 px-10 border border-or/20 bg-noir/30 backdrop-blur-sm">
            <span className="font-serif text-2xl text-or italic">
              Joachim Seroussi
            </span>
            <span className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-gris-noble">
              Fondateur & Dirigeant
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer transition-all duration-1000 group ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "1000ms" }}
        aria-label="Défiler vers le bas"
      >
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/70">
          Découvrir
        </span>
        <div className="relative w-px h-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-or to-transparent animate-scroll-line" />
        </div>
        <ChevronDown
          size={16}
          className="text-or animate-bounce"
          style={{ animationDuration: "2s" }}
        />
      </button>
    </section>
  );
}
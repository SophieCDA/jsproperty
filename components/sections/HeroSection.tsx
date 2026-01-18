"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    const credentialsSection = document.getElementById("credentials");
    if (credentialsSection) {
      credentialsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          className="w-full h-full object-cover"
        >
          <source src="videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay unique */}
        <div className="absolute inset-0 bg-noir/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-4 mb-8 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="w-10 h-px bg-or" />
          <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-or">
            Immobilier de Prestige
          </span>
          <span className="w-10 h-px bg-or" />
        </div>

        {/* Title */}
        <h1
          className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          L&apos;Excellence Immobilière
          <br />
          sur la <em className="italic text-or-clair">Côte d&apos;Azur</em>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-sans text-base md:text-lg font-light text-white/90 max-w-2xl mx-auto mb-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Acquisition, réhabilitation et vente de biens d&apos;exception.
          <br className="hidden md:block" />
          Plus de 15 ans d&apos;expertise au service de votre patrimoine.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Link href="/biens">
            <Button variant="primary" size="lg">
              Découvrir nos biens
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Vendre mon bien
            </Button>
          </Link>
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
          Défiler
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
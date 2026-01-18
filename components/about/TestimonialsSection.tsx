"use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "Travailler avec JS Property a été une révélation. Leur expertise du marché niçois et leur capacité à transformer un bien m'ont permis de réaliser un investissement exceptionnel. Le résultat dépasse toutes mes attentes.",
    author: "Laurent M.",
    role: "Investisseur immobilier",
    location: "Nice",
    rating: 5,
  },
  {
    id: 2,
    content:
      "J'ai vendu mon appartement en moins d'une semaine avec une offre ferme et sans condition. Joachim et son équipe ont été d'un professionnalisme exemplaire du début à la fin.",
    author: "Sophie D.",
    role: "Propriétaire",
    location: "Cannes",
    rating: 5,
  },
  {
    id: 3,
    content:
      "La qualité des finitions sur leur dernière réalisation est simplement remarquable. On sent le souci du détail et l'exigence à chaque étape. Un vrai coup de cœur pour notre résidence secondaire.",
    author: "Pierre & Isabelle R.",
    role: "Acquéreurs",
    location: "Cap d'Ail",
    rating: 5,
  },
  {
    id: 4,
    content:
      "En tant qu'agent immobilier, je recommande régulièrement JS Property à mes clients investisseurs. Leur sérieux et leur réactivité sont des atouts majeurs sur ce marché compétitif.",
    author: "Marc T.",
    role: "Agent immobilier partenaire",
    location: "Monaco",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  // Auto-play
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, activeIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-noir py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border border-or/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 border border-or/5 rounded-full translate-x-1/2 translate-y-1/2" />

      {/* Large Quote Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <Quote size={400} className="text-or" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionBadge text="Témoignages" centered />
          <SectionTitle className="mt-6">
            Ils nous font <Emphasis>confiance</Emphasis>
          </SectionTitle>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main Content */}
          <div className="relative min-h-[320px] flex items-center justify-center">
            <div
              className={`text-center transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Quote Icon */}
              <Quote
                size={48}
                className="text-or/30 mx-auto mb-8 rotate-180"
              />

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: currentTestimonial.rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-or"
                      fill="currentColor"
                    />
                  )
                )}
              </div>

              {/* Content */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-ivoire leading-relaxed max-w-3xl mx-auto mb-10">
                &ldquo;{currentTestimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center">
                <span className="font-sans text-base font-medium text-or mb-1">
                  {currentTestimonial.author}
                </span>
                <span className="font-sans text-sm text-gris-noble">
                  {currentTestimonial.role} — {currentTestimonial.location}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-or hover:bg-or/10 transition-all group"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft
                size={20}
                className="text-gris-noble group-hover:text-or transition-colors"
              />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-or w-8"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-or hover:bg-or/10 transition-all group"
              aria-label="Témoignage suivant"
            >
              <ChevronRight
                size={20}
                className="text-gris-noble group-hover:text-or transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
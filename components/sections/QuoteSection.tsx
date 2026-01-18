"use client";

import { useEffect, useRef, useState } from "react";

export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-noir py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        {/* Quote Mark */}
        <span
          className={`block font-serif text-8xl text-or/30 leading-none mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          &ldquo;
        </span>

        {/* Quote Text */}
        <blockquote
          className={`font-serif text-2xl md:text-3xl lg:text-4xl font-light italic text-ivoire leading-relaxed mb-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Les détails font la perfection,
          <br />
          et la perfection n&apos;est pas un détail.
        </blockquote>

        {/* Author */}
        <cite
          className={`font-sans text-sm font-medium tracking-[0.15em] text-or not-italic transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          — Léonard de Vinci
        </cite>
      </div>
    </section>
  );
}

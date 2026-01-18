"use client";

import { useEffect, useRef, useState } from "react";
import { credentials } from "@/lib/data";

function AnimatedNumber({
  value,
  suffix = "",
  isVisible,
}: {
  value: string;
  suffix?: string;
  isVisible: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <span className="font-serif text-5xl md:text-6xl font-light text-or leading-none">
      {displayValue}
      <sup className="text-2xl md:text-3xl">{suffix}</sup>
    </span>
  );
}

export function CredentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
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
      id="credentials"
      className="bg-noir py-20 border-t border-or/10"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {credentials.map((credential, index) => (
            <div
              key={credential.label}
              className={`text-center py-8 relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Separator */}
              {index < credentials.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-or/20" />
              )}

              <AnimatedNumber
                value={credential.value}
                suffix={credential.suffix}
                isVisible={isVisible}
              />

              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gris-noble mt-3">
                {credential.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

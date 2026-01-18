"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Clock, Trophy, Users } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: 10,
    suffix: "+",
    label: "Années d'expertise",
    description: "sur la Côte d'Azur",
  },
  {
    icon: Building2,
    value: 50,
    suffix: "+",
    label: "Projets réalisés",
    description: "rénovations & ventes",
  },
  {
    icon: Trophy,
    value: 100,
    suffix: "%",
    label: "Fonds propres",
    description: "indépendance financière",
  },
  {
    icon: Users,
    value: 24,
    suffix: "h",
    label: "Délai d'offre",
    description: "réactivité maximale",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isVisible,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-or">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
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
      className="relative bg-noir-elegant py-20 lg:py-28 overflow-hidden"
    >
      {/* Pattern Background */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      {/* Gold Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 border border-or/30 flex items-center justify-center bg-noir/50">
                  <stat.icon size={24} className="text-or" />
                </div>
              </div>

              {/* Counter */}
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                isVisible={isVisible}
              />

              {/* Label */}
              <p className="font-sans text-sm font-medium text-ivoire mt-3 mb-1">
                {stat.label}
              </p>

              {/* Description */}
              <p className="font-sans text-xs text-gris-noble">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
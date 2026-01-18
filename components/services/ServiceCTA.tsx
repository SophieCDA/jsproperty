"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone } from "lucide-react";

interface ServiceCTAProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  showPhone?: boolean;
}

export function ServiceCTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  showPhone = true,
}: ServiceCTAProps) {
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
    <section ref={sectionRef} className="relative bg-noir py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-or/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-azur-profond/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-6">
            {title}
          </h2>
          <p className="font-sans text-base font-light text-gris-clair leading-relaxed max-w-2xl mx-auto mb-10">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href={primaryAction.href}>
            <Button variant="primary" size="lg">
              {primaryAction.label}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>

          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button variant="outline" size="lg">
                {secondaryAction.label}
              </Button>
            </Link>
          )}
        </div>

        {/* Phone */}
        {showPhone && (
          <div
            className={`mt-10 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-sans text-sm text-gris-noble mb-3">
              Ou appelez-nous directement
            </p>
            <a
              href="tel:+33634780000"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-10 h-10 border border-or/30 flex items-center justify-center group-hover:bg-or/10 transition-colors">
                <Phone size={18} className="text-or" />
              </div>
              <span className="font-serif text-xl text-ivoire group-hover:text-or transition-colors">
                +33 6 34 78 00 00
              </span>
            </a>
          </div>
        )}

        {/* Decorative line */}
        <div
          className={`mt-16 h-px bg-gradient-to-r from-transparent via-or/30 to-transparent max-w-md mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />
      </div>
    </section>
  );
}
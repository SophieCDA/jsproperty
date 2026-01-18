"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Property } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";

interface PropertyBeforeAfterProps {
  property: Property;
}

export function PropertyBeforeAfter({ property }: PropertyBeforeAfterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Vérifier si le bien a des images avant/après
  const beforeAfterImages = property.images.beforeAfter;
  if (!beforeAfterImages || beforeAfterImages.length === 0) return null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const currentPair = beforeAfterImages[activeIndex];

  return (
    <div ref={sectionRef} className="mt-16">
      {/* Titre de section */}
      <div
        className={cn(
          "mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <span className="inline-block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-or mb-4">
          Transformation
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-ivoire">
          Avant / Après
        </h2>
        <p className="font-sans text-sm text-gris-clair mt-3">
          Découvrez la transformation réalisée par nos équipes
        </p>
      </div>

      {/* Slider Before/After */}
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-[16/10] overflow-hidden cursor-ew-resize select-none transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Image After (fond) */}
        <div className="absolute inset-0">
          <Image
            src={currentPair.after}
            alt="Après rénovation"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 66vw"
          />
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-or text-noir font-sans text-[0.65rem] font-semibold uppercase tracking-wider">
            Après
          </div>
        </div>

        {/* Image Before (avec clip) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={currentPair.before}
            alt="Avant rénovation"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 66vw"
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-gris-noble text-ivoire font-sans text-[0.65rem] font-semibold uppercase tracking-wider">
            Avant
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-or cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-or rounded-full flex items-center justify-center shadow-lg">
            <ArrowLeftRight size={20} className="text-noir" />
          </div>

          {/* Ligne verticale avec effet glow */}
          <div className="absolute inset-0 bg-or shadow-[0_0_10px_rgba(201,169,98,0.5)]" />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-noir/80 backdrop-blur-sm">
          <span className="font-sans text-xs text-gris-clair">
            ← Glissez pour comparer →
          </span>
        </div>
      </div>

      {/* Navigation si plusieurs paires */}
      {beforeAfterImages.length > 1 && (
        <div
          className={cn(
            "flex justify-center gap-2 mt-6 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {beforeAfterImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setSliderPosition(50);
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "bg-or scale-100"
                  : "bg-white/20 hover:bg-white/40 scale-75"
              )}
              aria-label={`Voir transformation ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
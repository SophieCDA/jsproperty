"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Property } from "@/types";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Expand, Grid3X3 } from "lucide-react";

interface PropertyGalleryProps {
  property: Property;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Toutes les images (principale + galerie)
  const allImages = [property.images.main, ...property.images.gallery];

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

  // Gestion du clavier pour la lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "ArrowRight") navigateNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentIndex]);

  // Bloquer le scroll quand lightbox ouverte
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Si pas de galerie, ne pas afficher la section
  if (allImages.length <= 1) return null;

  return (
    <>
      <section ref={sectionRef} className="py-12 lg:py-16 bg-noir-elegant">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div
            className={cn(
              "flex items-center justify-between mb-8 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <div className="flex items-center gap-3">
              <Grid3X3 size={20} className="text-or" />
              <h2 className="font-serif text-2xl text-ivoire">Galerie</h2>
              <span className="font-sans text-sm text-gris-noble">
                ({allImages.length} photos)
              </span>
            </div>
            <button
              onClick={() => openLightbox(0)}
              className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-wider text-ivoire hover:text-or transition-colors"
            >
              <Expand size={16} />
              <span className="hidden sm:inline">Voir tout</span>
            </button>
          </div>

          {/* Grille d'images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {allImages.slice(0, 8).map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                  // Première image plus grande
                  index === 0 && "md:col-span-2 md:row-span-2 md:aspect-square"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={image}
                  alt={`${property.title} - Photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 50vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-colors duration-300 flex items-center justify-center">
                  <Expand
                    size={32}
                    className="text-ivoire opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                {/* Indicateur "voir plus" sur la dernière image */}
                {index === 7 && allImages.length > 8 && (
                  <div className="absolute inset-0 bg-noir/60 flex items-center justify-center">
                    <span className="font-serif text-2xl text-ivoire">
                      +{allImages.length - 8}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-noir/98 backdrop-blur-xl">
          {/* Header lightbox */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6">
            <span className="font-sans text-sm text-gris-clair">
              {currentIndex + 1} / {allImages.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="w-12 h-12 flex items-center justify-center border border-white/20 text-ivoire hover:border-or hover:text-or transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image principale */}
          <div className="absolute inset-0 flex items-center justify-center p-16 lg:p-24">
            <div className="relative w-full h-full">
              <Image
                src={allImages[currentIndex]}
                alt={`${property.title} - Photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={navigatePrev}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center border border-white/20 text-ivoire hover:border-or hover:bg-or/10 hover:text-or transition-all"
            aria-label="Image précédente"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={navigateNext}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center border border-white/20 text-ivoire hover:border-or hover:bg-or/10 hover:text-or transition-all"
            aria-label="Image suivante"
          >
            <ChevronRight size={28} />
          </button>

          {/* Miniatures */}
          <div className="absolute bottom-0 left-0 right-0 p-6 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 overflow-hidden transition-all duration-300",
                    index === currentIndex
                      ? "ring-2 ring-or opacity-100"
                      : "opacity-50 hover:opacity-80"
                  )}
                >
                  <Image
                    src={image}
                    alt={`Miniature ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
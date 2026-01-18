"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { formatPrice, formatSurface, getStatusLabel, cn } from "@/lib/utils";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Home,
  Share2,
  Heart,
  Calendar,
} from "lucide-react";

interface PropertyHeroProps {
  property: Property;
}

export function PropertyHero({ property }: PropertyHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const statusStyles = {
    disponible: "bg-or text-noir",
    vendu: "bg-gris-noble text-ivoire",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description.substring(0, 100),
          url: window.location.href,
        });
      } catch (err) {
        console.log("Partage annulé");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  return (
    <section className="relative min-h-[70vh] lg:min-h-[85vh]">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={property.images.main}
          alt={property.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-transparent to-transparent" />
      </div>

      {/* Navigation Bar */}
      <div className="relative z-10 pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Bouton retour */}
            <Link
              href="/biens"
              className={cn(
                "group flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-ivoire/80 hover:text-or transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              )}
            >
              <span className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-or group-hover:bg-or/10 transition-all duration-300">
                <ArrowLeft size={18} />
              </span>
              <span className="hidden sm:inline">Retour aux biens</span>
            </Link>

            {/* Actions */}
            <div
              className={cn(
                "flex items-center gap-3 transition-all duration-500 delay-100",
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              )}
            >
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center border transition-all duration-300",
                  isLiked
                    ? "border-or bg-or/10 text-or"
                    : "border-white/20 text-ivoire/80 hover:border-or hover:text-or"
                )}
                aria-label="Ajouter aux favoris"
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-ivoire/80 hover:border-or hover:text-or transition-all duration-300"
                aria-label="Partager"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-end min-h-[50vh] lg:min-h-[60vh] pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge statut + référence */}
            <div
              className={cn(
                "flex flex-wrap items-center gap-3 mb-6 transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <span
                className={cn(
                  "px-4 py-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider",
                  statusStyles[property.availability]
                )}
              >
                {getStatusLabel(property.availability)}
              </span>
              {property.isRealisation && (
                <span className="px-4 py-1.5 bg-ivoire/10 text-ivoire font-sans text-[0.65rem] font-semibold uppercase tracking-wider">
                  Réalisation JS Property
                </span>
              )}
              <span className="font-sans text-xs text-gris-noble">
                Réf. {property.reference}
              </span>
            </div>

            {/* Titre */}
            <h1
              className={cn(
                "font-serif text-4xl md:text-5xl lg:text-6xl text-ivoire leading-tight mb-6 transition-all duration-700 delay-100",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              {property.title}
            </h1>

            {/* Localisation */}
            <div
              className={cn(
                "flex items-center gap-2 mb-8 transition-all duration-700 delay-200",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <MapPin size={18} className="text-or" />
              <span className="font-sans text-base text-gris-clair">
                {property.location.address}, {property.location.postalCode}{" "}
                {property.location.city}
              </span>
            </div>

            {/* Caractéristiques principales */}
            <div
              className={cn(
                "flex flex-wrap gap-6 lg:gap-10 mb-10 transition-all duration-700 delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center border border-or/30 bg-or/5">
                  <Maximize size={20} className="text-or" />
                </div>
                <div>
                  <span className="block font-serif text-2xl text-ivoire">
                    {property.surface}
                  </span>
                  <span className="font-sans text-xs text-gris-noble uppercase tracking-wider">
                    m²
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center border border-or/30 bg-or/5">
                  <Home size={20} className="text-or" />
                </div>
                <div>
                  <span className="block font-serif text-2xl text-ivoire">
                    {property.rooms}
                  </span>
                  <span className="font-sans text-xs text-gris-noble uppercase tracking-wider">
                    Pièces
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center border border-or/30 bg-or/5">
                  <Bed size={20} className="text-or" />
                </div>
                <div>
                  <span className="block font-serif text-2xl text-ivoire">
                    {property.bedrooms}
                  </span>
                  <span className="font-sans text-xs text-gris-noble uppercase tracking-wider">
                    Chambres
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center border border-or/30 bg-or/5">
                  <Bath size={20} className="text-or" />
                </div>
                <div>
                  <span className="block font-serif text-2xl text-ivoire">
                    {property.bathrooms}
                  </span>
                  <span className="font-sans text-xs text-gris-noble uppercase tracking-wider">
                    Sdb
                  </span>
                </div>
              </div>
            </div>

            {/* Prix */}
            <div
              className={cn(
                "transition-all duration-700 delay-400",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <span className="font-serif text-4xl lg:text-5xl text-gradient-gold">
                {formatPrice(property.price)}
              </span>
              <span className="ml-4 font-sans text-sm text-gris-noble">
                {Math.round(property.price / property.surface).toLocaleString(
                  "fr-FR"
                )}{" "}
                €/m²
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 transition-all duration-700 delay-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-widest text-gris-noble">
          Découvrir
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-or to-transparent" />
      </div>
    </section>
  );
}
"use client";

import { Property } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Bed, Bath, Maximize, MapPin, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PropertyListItemProps {
  property: Property;
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export function PropertyListItem({
  property,
  isHighlighted = false,
  onMouseEnter,
  onMouseLeave,
  className,
}: PropertyListItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const statusStyles = {
    disponible: {
      bg: "bg-or/10",
      border: "border-or/30",
      text: "text-or",
      label: "Disponible",
    },
    vendu: {
      bg: "bg-gris-noble/10",
      border: "border-gris-noble/30",
      text: "text-gris-noble",
      label: "Vendu",
    },
  };

  const status = statusStyles[property.availability];

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative bg-noir-elegant border transition-all duration-500 ease-out-expo overflow-hidden",
        isHighlighted
          ? "border-or shadow-lg shadow-or/10 scale-[1.01]"
          : "border-white/5 hover:border-or/30",
        className
      )}
    >
      <Link href={`/biens/${property.slug}`} className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-72 lg:w-80 h-56 md:h-auto md:aspect-[4/3] flex-shrink-0 overflow-hidden">
          {/* Skeleton loader */}
          <div
            className={cn(
              "absolute inset-0 bg-noir-surface animate-pulse transition-opacity duration-500",
              imageLoaded ? "opacity-0" : "opacity-100"
            )}
          />
          
          <Image
            src={property.images.main}
            alt={property.title}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-out-expo",
              "group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, 320px"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-noir-elegant/50 md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-elegant via-transparent to-transparent md:hidden" />

          {/* Status Badge */}
          <span
            className={cn(
              "absolute top-4 left-4 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] border backdrop-blur-sm",
              status.bg,
              status.border,
              status.text
            )}
          >
            {status.label}
          </span>

          {/* Réalisation Badge */}
          {property.isRealisation && (
            <span className="absolute top-4 right-4 px-2 py-1 bg-ivoire/90 text-noir text-[9px] font-sans font-semibold uppercase tracking-wider backdrop-blur-sm">
              Réalisé JS Property
            </span>
          )}

          {/* Quick View on Hover */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-noir/60 backdrop-blur-sm transition-all duration-300",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <span className="flex items-center gap-2 px-4 py-2 bg-or text-noir font-sans text-xs font-medium uppercase tracking-wider">
              <Eye size={14} />
              Voir le bien
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Header */}
          <div>
            {/* Location */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-or" />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-or">
                {property.location.city} — {property.location.neighborhood}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl lg:text-2xl text-ivoire mb-3 leading-tight group-hover:text-or transition-colors duration-300">
              {property.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-sm font-light text-gris-clair line-clamp-2 mb-4">
              {property.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Specs */}
            <div className="flex flex-wrap gap-4">
              {property.surface > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-noir-surface">
                    <Maximize size={14} className="text-gris-noble" />
                  </div>
                  <div>
                    <span className="font-serif text-lg text-ivoire">{property.surface}</span>
                    <span className="font-sans text-xs text-gris-noble ml-1">m²</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-noir-surface">
                  <Bed size={14} className="text-gris-noble" />
                </div>
                <div>
                  <span className="font-serif text-lg text-ivoire">{property.bedrooms}</span>
                  <span className="font-sans text-xs text-gris-noble ml-1">ch.</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-noir-surface">
                  <Bath size={14} className="text-gris-noble" />
                </div>
                <div>
                  <span className="font-serif text-lg text-ivoire">{property.bathrooms}</span>
                  <span className="font-sans text-xs text-gris-noble ml-1">sdb.</span>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block font-sans text-[10px] uppercase tracking-wider text-gris-noble mb-1">
                  Prix
                </span>
                <span className="font-serif text-2xl lg:text-3xl text-or">
                  {formatPrice(property.price)}
                </span>
              </div>

              <div
                className={cn(
                  "w-12 h-12 flex items-center justify-center border transition-all duration-300",
                  isHighlighted
                    ? "bg-or border-or text-noir"
                    : "border-or/30 text-or group-hover:bg-or group-hover:text-noir"
                )}
              >
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Highlight indicator */}
      {isHighlighted && (
        <div className="absolute top-0 left-0 w-1 h-full bg-or" />
      )}
    </article>
  );
}
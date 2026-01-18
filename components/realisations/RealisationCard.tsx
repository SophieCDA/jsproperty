"use client";

import { Property } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Bed, Bath, Maximize, MapPin, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RealisationCardProps {
  property: Property;
  className?: string;
}

export function RealisationCard({ property, className }: RealisationCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isSold = property.availability === "vendu";

  return (
    <article
      className={cn(
        "group bg-noir-elegant border border-white/5 overflow-hidden transition-all duration-500 ease-out-expo hover:border-or/20 hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/biens/${property.slug}`}>
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
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
              "object-cover transition-all duration-700 ease-out-expo group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent" />

          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {/* Badge Vendu/Disponible */}
            <span
              className={cn(
                "px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm",
                isSold
                  ? "bg-noir/80 text-gris-clair border border-white/20"
                  : "bg-or/90 text-noir"
              )}
            >
              {isSold ? "Vendu" : "Disponible"}
            </span>

            {/* Badge Réalisation JS Property */}
            {property.isRealisation && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-ivoire/95 text-noir text-[10px] font-sans font-semibold uppercase tracking-wider backdrop-blur-sm">
                <CheckCircle size={12} />
                Réalisé par JS Property
              </span>
            )}
          </div>

          {/* Year badge */}
          {property.year && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-noir/80 backdrop-blur-sm border border-or/20">
              <Calendar size={12} className="text-or" />
              <span className="font-sans text-[10px] text-gris-clair">{property.year}</span>
            </div>
          )}

          {/* Location */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-or" />
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-or">
                {property.location.city} — {property.location.neighborhood}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="font-serif text-xl text-ivoire mb-3 leading-tight group-hover:text-or transition-colors duration-300">
            {property.title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm font-light text-gris-clair line-clamp-2 mb-4">
            {property.description}
          </p>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
            {property.surface > 0 && (
              <div className="flex items-center gap-1.5">
                <Maximize size={14} className="text-gris-noble" />
                <span className="font-sans text-sm text-gris-clair">{property.surface} m²</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Bed size={14} className="text-gris-noble" />
              <span className="font-sans text-sm text-gris-clair">{property.bedrooms} ch.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={14} className="text-gris-noble" />
              <span className="font-sans text-sm text-gris-clair">{property.bathrooms} sdb.</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block font-sans text-[10px] uppercase tracking-wider text-gris-noble mb-1">
                {isSold ? "Vendu à" : "Prix"}
              </span>
              <span className={cn(
                "font-serif text-2xl",
                isSold ? "text-gris-clair" : "text-or"
              )}>
                {formatPrice(property.price)}
              </span>
            </div>

            <div className="w-10 h-10 flex items-center justify-center border border-or/30 text-or group-hover:bg-or group-hover:text-noir transition-all duration-300">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
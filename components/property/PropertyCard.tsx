"use client";

import { Property } from "@/types";
import { formatPrice, formatSurface, getStatusLabel, cn } from "@/lib/utils";
import { ArrowRight, Bed, Bath, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const statusStyles = {
    disponible: "bg-or text-noir",
    realise: "bg-ivoire text-noir",
    vendu: "bg-gris-noble text-ivoire",
  };

  return (
    <article
      className={cn(
        "group bg-noir-elegant overflow-hidden transition-transform duration-500 ease-out-expo hover:-translate-y-2",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={property.images.main}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Status Badge */}
        <span
          className={cn(
            "absolute top-4 left-4 px-3 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wider z-10",
            statusStyles[property.availability]
          )}
        >
          {getStatusLabel(property.availability)}
        </span>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-transparent to-transparent" />

        {/* Location */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="font-sans text-[0.65rem] font-medium uppercase tracking-widest text-or">
            {property.location.city} — {property.location.neighborhood}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-xl text-ivoire mb-4 leading-tight">
          {property.title}
        </h3>

        {/* Details */}
        <div className="flex gap-6 mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bed size={16} className="text-gris-noble" />
            <span className="font-sans text-sm text-gris-clair">
              {property.bedrooms} ch.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={16} className="text-gris-noble" />
            <span className="font-sans text-sm text-gris-clair">
              {property.bathrooms} sdb
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={16} className="text-gris-noble" />
            <span className="font-sans text-sm text-gris-clair">
              {formatSurface(property.surface)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl text-or">
            {formatPrice(property.price)}
          </span>
          <Link
            href={`/biens/${property.slug}`}
            className="group/link flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-wider text-ivoire hover:text-or transition-colors"
          >
            Découvrir
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

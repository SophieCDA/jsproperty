"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Property } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { X, Maximize, Bed, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import dynamique pour éviter les erreurs SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  onPropertySelect?: (property: Property | null) => void;
  onPropertyHover?: (property: Property | null) => void;
  className?: string;
  isFullScreen?: boolean;
}

// Composant interne pour le contenu de la carte
function MapContent({
  properties,
  selectedPropertyId,
  onPropertySelect,
  onPropertyHover,
}: {
  properties: Property[];
  selectedPropertyId?: string | null;
  onPropertySelect?: (property: Property | null) => void;
  onPropertyHover?: (property: Property | null) => void;
}) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!L) return null;

  // Icône personnalisée
  const createIcon = (property: Property, isSelected: boolean) => {
    const isAvailable = property.availability === "disponible";
    const isHovered = selectedPropertyId === property.id;
    
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div class="marker-container ${isHovered || isSelected ? 'active' : ''}">
          <div class="marker-pin ${isAvailable ? 'available' : 'sold'} ${isHovered ? 'hovered' : ''}">
            <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
              <path d="M20 0C8.954 0 0 8.954 0 20c0 12.5 20 30 20 30s20-17.5 20-30c0-11.046-8.954-20-20-20z" 
                    fill="${isAvailable ? (isHovered ? '#e3d4a8' : '#c9a962') : (isHovered ? '#444' : '#222')}" 
                    stroke="${isAvailable ? '#c9a962' : '#666'}" 
                    stroke-width="2"/>
              <circle cx="20" cy="18" r="8" fill="${isAvailable ? '#0a0a0a' : '#c9a962'}"/>
              <text x="20" y="22" 
                    font-family="sans-serif" 
                    font-size="10" 
                    font-weight="600"
                    fill="${isAvailable ? '#c9a962' : '#0a0a0a'}" 
                    text-anchor="middle">
                ${property.rooms}
              </text>
            </svg>
          </div>
          ${isHovered ? '<div class="marker-pulse"></div>' : ''}
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -50],
    });
  };

  return (
    <>
      {/* Tile Layer - Style sombre élégant */}
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      
      <ZoomControl position="bottomright" />

      {/* Markers */}
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.location.coordinates.lat, property.location.coordinates.lng]}
          icon={createIcon(property, selectedPropertyId === property.id)}
          eventHandlers={{
            click: () => onPropertySelect?.(property),
            mouseover: () => onPropertyHover?.(property),
            mouseout: () => onPropertyHover?.(null),
          }}
        >
          <Popup className="property-popup-premium">
            <PropertyPopupContent property={property} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}

// Contenu du popup
function PropertyPopupContent({ property }: { property: Property }) {
  const isAvailable = property.availability === "disponible";

  return (
    <Link href={`/biens/${property.slug}`} className="block group">
      <div className="w-72 bg-noir-elegant border border-or/20 overflow-hidden">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={property.images.main}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="288px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent" />
          
          {/* Status */}
          <span
            className={cn(
              "absolute top-3 left-3 px-2 py-1 text-[9px] font-sans font-semibold uppercase tracking-wider",
              isAvailable
                ? "bg-or/90 text-noir"
                : "bg-noir/90 text-gris-noble border border-white/20"
            )}
          >
            {isAvailable ? "Disponible" : "Vendu"}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location */}
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={12} className="text-or" />
            <span className="font-sans text-[10px] uppercase tracking-wider text-or">
              {property.location.city} — {property.location.neighborhood}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-serif text-lg text-ivoire mb-3 leading-tight group-hover:text-or transition-colors">
            {property.title}
          </h4>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-3 pb-3 border-b border-white/10">
            {property.surface > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-gris-clair">
                <Maximize size={12} className="text-gris-noble" />
                {property.surface} m²
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-gris-clair">
              <Bed size={12} className="text-gris-noble" />
              {property.bedrooms} ch.
            </span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl text-or">
              {formatPrice(property.price)}
            </span>
            <span className="flex items-center gap-1 text-xs text-gris-noble group-hover:text-or transition-colors">
              Voir <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyMap({
  properties,
  selectedPropertyId,
  onPropertySelect,
  onPropertyHover,
  className,
  isFullScreen = false,
}: PropertyMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculer le centre et le zoom basé sur les propriétés
  const center: [number, number] = properties.length > 0
    ? [
        properties.reduce((sum, p) => sum + p.location.coordinates.lat, 0) / properties.length,
        properties.reduce((sum, p) => sum + p.location.coordinates.lng, 0) / properties.length,
      ]
    : [43.7, 7.25]; // Nice par défaut

  return (
    <div className={cn("relative", isFullScreen ? "h-full" : "h-[600px]", className)}>
      {/* Styles CSS pour la carte */}
      <style jsx global>{`
        /* Container du marker */
        .marker-container {
          position: relative;
          transition: transform 0.3s ease;
        }

        .marker-container.active {
          transform: scale(1.15);
          z-index: 1000 !important;
        }

        .marker-pin {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
          transition: all 0.3s ease;
        }

        .marker-pin.hovered {
          filter: drop-shadow(0 6px 16px rgba(201, 169, 98, 0.4));
        }

        /* Pulse animation */
        .marker-pulse {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: rgba(201, 169, 98, 0.4);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(-50%) scale(3);
            opacity: 0;
          }
        }

        /* Popup premium */
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }

        .leaflet-popup-tip-container {
          display: none;
        }

        .leaflet-popup-close-button {
          display: none !important;
        }

        /* Zoom controls */
        .leaflet-control-zoom {
          border: 1px solid rgba(201, 169, 98, 0.2) !important;
          border-radius: 0 !important;
          overflow: hidden;
        }

        .leaflet-control-zoom a {
          background: rgba(10, 10, 10, 0.95) !important;
          color: #f8f6f3 !important;
          border: none !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
          transition: all 0.2s ease !important;
        }

        .leaflet-control-zoom a:hover {
          background: rgba(201, 169, 98, 0.2) !important;
          color: #c9a962 !important;
        }

        .leaflet-control-zoom-in {
          border-bottom: 1px solid rgba(201, 169, 98, 0.2) !important;
        }

        /* Attribution */
        .leaflet-control-attribution {
          background: rgba(10, 10, 10, 0.9) !important;
          color: #666 !important;
          font-size: 10px !important;
          padding: 4px 8px !important;
          border: 1px solid rgba(201, 169, 98, 0.1) !important;
        }

        .leaflet-control-attribution a {
          color: #c9a962 !important;
        }

        /* Conteneur de la carte */
        .leaflet-container {
          background: #0a0a0a !important;
          font-family: inherit !important;
        }
      `}</style>

      {isClient ? (
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
          className="rounded-none"
        >
          <MapContent
            properties={properties}
            selectedPropertyId={selectedPropertyId}
            onPropertySelect={onPropertySelect}
            onPropertyHover={onPropertyHover}
          />
        </MapContainer>
      ) : (
        // Loading state
        <div className="h-full w-full bg-noir-elegant flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-or border-t-transparent rounded-full animate-spin" />
            <span className="font-sans text-sm text-gris-noble">
              Chargement de la carte...
            </span>
          </div>
        </div>
      )}

      {/* Légende */}
      <div className="absolute bottom-4 left-4 flex items-center gap-6 bg-noir/95 backdrop-blur-sm border border-or/20 px-4 py-3 z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-or" />
          <span className="font-sans text-xs text-gris-clair">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-noir-surface border border-gris-noble" />
          <span className="font-sans text-xs text-gris-clair">Vendu</span>
        </div>
      </div>

      {/* Compteur */}
      <div className="absolute top-4 left-4 bg-noir/95 backdrop-blur-sm border border-or/20 px-4 py-3 z-[1000]">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="font-serif text-2xl text-or">
              {properties.filter((p) => p.availability === "disponible").length}
            </p>
            <p className="font-sans text-[10px] uppercase tracking-wider text-gris-noble">
              Disponibles
            </p>
          </div>
          <div className="w-px h-8 bg-or/20" />
          <div className="text-center">
            <p className="font-serif text-2xl text-ivoire">{properties.length}</p>
            <p className="font-sans text-[10px] uppercase tracking-wider text-gris-noble">
              Total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
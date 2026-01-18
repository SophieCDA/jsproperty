// src/components/sections/MapPreviewSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { MapPin, Home, Maximize, X } from "lucide-react";
import { properties } from "@/lib/data";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

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

// Composant Map séparé pour le client uniquement
function MapContent({
  selectedProperty,
  setSelectedProperty,
}: {
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
}) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!L) return null;

  // Icônes personnalisées
  const createIcon = (isAvailable: boolean) => {
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div class="marker-wrapper ${isAvailable ? "available" : "sold"}">
          <div class="marker-pulse"></div>
          <div class="marker-pin">
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
              <path d="M18 0C8.059 0 0 8.059 0 18c0 11 18 26 18 26s18-15 18-26c0-9.941-8.059-18-18-18z" 
                    fill="${isAvailable ? "#c9a962" : "#1a1a1a"}" 
                    stroke="#c9a962" 
                    stroke-width="1.5"/>
              <circle cx="18" cy="16" r="7" fill="${isAvailable ? "#0a0a0a" : "#c9a962"}"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [36, 44],
      iconAnchor: [18, 44],
      popupAnchor: [0, -44],
    });
  };

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="topright" />

      {properties.map((property) => {
        const { lat, lng } = property.location.coordinates;
        const isAvailable = property.availability === "disponible";

        return (
          <Marker
            key={property.id}
            position={[lat, lng]}
            icon={createIcon(isAvailable)}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup className="custom-popup">
              <div className="popup-content">
                <span className={`popup-badge ${isAvailable ? "available" : ""}`}>
                  {isAvailable ? "Disponible" : "Vendu"}
                </span>
                <h4>{property.title}</h4>
                <p className="popup-location">
                  {property.location.city} — {property.location.neighborhood}
                </p>
                <div className="popup-details">
                  {property.surface > 0 && <span>{property.surface} m²</span>}
                  <span>{property.rooms} pièces</span>
                </div>
                <p className="popup-price">{formatPrice(property.price)}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export function MapPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const availableProperties = properties.filter((p) => p.availability === "disponible");

  // Vérifier qu'on est côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Observer pour animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Centre de la carte (Nice)
  const center: [number, number] = [43.7, 7.25];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-noir overflow-hidden">
      {/* Styles Leaflet personnalisés */}
      <style jsx global>{`
        @import "leaflet/dist/leaflet.css";

        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        .marker-wrapper {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .marker-wrapper:hover {
          transform: scale(1.15) translateY(-4px);
        }

        .marker-pulse {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          opacity: 0;
        }

        .marker-wrapper.available .marker-pulse {
          background: rgba(201, 169, 98, 0.4);
          animation: pulse 2s infinite;
        }

        .marker-wrapper:hover .marker-pulse {
          opacity: 1;
        }

        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateX(-50%) scale(3);
            opacity: 0;
          }
        }

        .marker-pin {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
          transition: filter 0.3s ease;
        }

        .marker-wrapper:hover .marker-pin {
          filter: drop-shadow(0 6px 16px rgba(201, 169, 98, 0.5));
        }

        /* Popup personnalisée */
        .leaflet-popup-content-wrapper {
          background: rgba(10, 10, 10, 0.95) !important;
          border: 1px solid rgba(201, 169, 98, 0.3) !important;
          border-radius: 4px !important;
          padding: 0 !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
          min-width: 200px !important;
        }

        .leaflet-popup-tip {
          background: rgba(10, 10, 10, 0.95) !important;
          border: 1px solid rgba(201, 169, 98, 0.3) !important;
          box-shadow: none !important;
        }

        .leaflet-popup-close-button {
          color: #888 !important;
          font-size: 18px !important;
          padding: 8px !important;
        }

        .leaflet-popup-close-button:hover {
          color: #c9a962 !important;
        }

        .popup-content {
          padding: 16px;
          font-family: "Montserrat", sans-serif;
        }

        .popup-badge {
          display: inline-block;
          padding: 4px 8px;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 2px;
          background: #1a1a1a;
          color: #888;
          border: 1px solid rgba(201, 169, 98, 0.3);
          margin-bottom: 8px;
        }

        .popup-badge.available {
          background: #c9a962;
          color: #0a0a0a;
          border-color: #c9a962;
        }

        .popup-content h4 {
          font-family: "Cormorant Garamond", serif;
          font-size: 16px;
          font-weight: 400;
          color: #f8f6f3;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .popup-location {
          font-size: 11px;
          color: #c9a962;
          margin: 0 0 8px 0;
        }

        .popup-details {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #888;
          margin-bottom: 8px;
        }

        .popup-price {
          font-family: "Cormorant Garamond", serif;
          font-size: 20px;
          color: #c9a962;
          margin: 0;
          font-weight: 500;
        }

        /* Contrôles de zoom */
        .leaflet-control-zoom {
          border: 1px solid rgba(201, 169, 98, 0.2) !important;
          border-radius: 4px !important;
          overflow: hidden;
        }

        .leaflet-control-zoom a {
          background: rgba(10, 10, 10, 0.9) !important;
          color: #f8f6f3 !important;
          border: none !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 16px !important;
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
          background: rgba(10, 10, 10, 0.8) !important;
          color: #666 !important;
          font-size: 10px !important;
          padding: 2px 8px !important;
        }

        .leaflet-control-attribution a {
          color: #c9a962 !important;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionBadge text="Nos Implantations" centered />
          </div>

          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light text-ivoire leading-tight mt-6 transition-all duration-700 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            La <em className="italic text-or">Côte d&apos;Azur</em> à vos pieds
          </h2>

          <p
            className={`font-sans text-base font-light text-gris-clair max-w-2xl mx-auto mt-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Découvrez nos biens d&apos;exception répartis sur les plus belles
            adresses de la French Riviera.
          </p>
        </div>

        {/* Map Container */}
        <div
          className={`relative transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-sm overflow-hidden border border-or/20">
            {/* Map */}
            {isClient && (
              <MapContainer
                center={center}
                zoom={11}
                scrollWheelZoom={false}
                zoomControl={false}
                style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
              >
                <MapContent
                  selectedProperty={selectedProperty}
                  setSelectedProperty={setSelectedProperty}
                />
              </MapContainer>
            )}

            {/* Loading state */}
            {!isClient && (
              <div className="absolute inset-0 bg-noir-elegant flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-or border-t-transparent rounded-full animate-spin" />
                  <span className="font-sans text-sm text-gris-noble">
                    Chargement de la carte...
                  </span>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex items-center gap-6 bg-noir/90 backdrop-blur-sm border border-or/20 rounded-sm px-4 py-2 z-[1000]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-or" />
                <span className="font-sans text-xs text-gris-clair">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-noir-surface border border-or/50" />
                <span className="font-sans text-xs text-gris-clair">Réalisation</span>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute top-4 left-4 bg-noir/90 backdrop-blur-sm border border-or/20 rounded-sm px-4 py-3 z-[1000]">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-serif text-2xl text-or">{availableProperties.length}</p>
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

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <Link href="/biens">
              <Button variant="primary" size="lg">
                <MapPin size={18} className="mr-2" />
                Explorer tous nos biens
              </Button>
            </Link>
          </div>
        </div>

        {/* Biens disponibles - Aperçu */}
        <div
          className={`mt-16 transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="font-serif text-xl text-ivoire mb-6 text-center">
            Biens actuellement disponibles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {availableProperties.slice(0, 5).map((property, index) => (
              <Link
                key={property.id}
                href={`/biens/${property.slug}`}
                className="group bg-noir-surface border border-or/10 rounded-sm p-4 hover:border-or/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-block px-2 py-0.5 bg-or/10 text-or text-[10px] uppercase tracking-wider rounded-sm">
                    Disponible
                  </span>
                  <span className="font-sans text-xs text-gris-noble">
                    {property.location.neighborhood}
                  </span>
                </div>

                <h4 className="font-serif text-sm text-ivoire group-hover:text-or transition-colors line-clamp-2 mb-3">
                  {property.title}
                </h4>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-gris-noble">
                    {property.surface > 0 && (
                      <span className="flex items-center gap-1">
                        <Maximize size={12} />
                        {property.surface}m²
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Home size={12} />
                      {property.rooms}p
                    </span>
                  </div>
                  <span className="font-semibold text-or">{formatPrice(property.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
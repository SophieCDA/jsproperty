"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Property } from "@/types";
import { cn } from "@/lib/utils";
import { MapPin, Navigation, Train, ShoppingBag, Waves } from "lucide-react";

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
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface PropertyLocationProps {
  property: Property;
}

function MapContent({ property }: { property: Property }) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!L) return null;

  const customIcon = L.divIcon({
    className: "custom-marker-single",
    html: `
      <div class="marker-single">
        <svg width="48" height="58" viewBox="0 0 48 58" fill="none">
          <path d="M24 0C10.745 0 0 10.745 0 24c0 14.667 24 34 24 34s24-19.333 24-34C48 10.745 37.255 0 24 0z" 
                fill="#c9a962"/>
          <circle cx="24" cy="22" r="10" fill="#0a0a0a"/>
          <circle cx="24" cy="22" r="4" fill="#c9a962"/>
        </svg>
      </div>
    `,
    iconSize: [48, 58],
    iconAnchor: [24, 58],
    popupAnchor: [0, -58],
  });

  return (
    <MapContainer
      center={[property.location.coordinates.lat, property.location.coordinates.lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker
        position={[property.location.coordinates.lat, property.location.coordinates.lng]}
        icon={customIcon}
      >
        <Popup>
          <div className="text-noir text-center py-2">
            <strong className="block text-sm">{property.title}</strong>
            <span className="text-xs text-gray-600">
              {property.location.address}
            </span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export function PropertyLocation({ property }: PropertyLocationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Points d'intérêt simulés (à remplacer par de vraies données)
  const nearbyPlaces = [
    { icon: Waves, label: "Plages", distance: "5 min" },
    { icon: Train, label: "Tramway", distance: "2 min" },
    { icon: ShoppingBag, label: "Commerces", distance: "1 min" },
    { icon: Navigation, label: "Centre-ville", distance: "10 min" },
  ];

  return (
    <div ref={sectionRef}>
      {/* Titre de section */}
      <div
        className={cn(
          "mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <span className="inline-block font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-or mb-4">
          Emplacement
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-ivoire">
          Localisation
        </h2>
      </div>

      {/* Adresse */}
      <div
        className={cn(
          "flex items-start gap-3 mb-8 transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <MapPin size={20} className="text-or flex-shrink-0 mt-1" />
        <div>
          <p className="font-sans text-base text-ivoire">
            {property.location.address}
          </p>
          <p className="font-sans text-sm text-gris-noble">
            {property.location.postalCode} {property.location.city} —{" "}
            {property.location.neighborhood}
          </p>
        </div>
      </div>

      {/* Carte */}
      <div
        className={cn(
          "relative h-[400px] mb-8 overflow-hidden transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {/* Bordure décorative */}
        <div className="absolute inset-0 border border-white/10 pointer-events-none z-10" />

        {isClient ? (
          <MapContent property={property} />
        ) : (
          <div className="w-full h-full bg-noir-surface flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-or mx-auto mb-4" />
              <p className="font-sans text-sm text-gris-noble">
                Chargement de la carte...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Points d'intérêt */}
      <div
        className={cn(
          "transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <h3 className="font-serif text-xl text-ivoire mb-6">À proximité</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {nearbyPlaces.map((place, index) => (
            <div
              key={place.label}
              className={cn(
                "p-4 bg-noir-surface border border-white/5 text-center transition-all duration-500 hover:border-or/20",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${400 + index * 75}ms` }}
            >
              <place.icon size={24} className="text-or mx-auto mb-3" />
              <span className="block font-sans text-sm text-ivoire mb-1">
                {place.label}
              </span>
              <span className="font-sans text-xs text-gris-noble">
                {place.distance}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Styles pour le marqueur */}
      <style jsx global>{`
        .marker-single {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-marker-single {
          background: transparent !important;
          border: none !important;
        }

        .leaflet-popup-content-wrapper {
          background: #f8f6f3;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .leaflet-popup-tip {
          background: #f8f6f3;
        }

        .leaflet-container {
          background: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

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

// Coordonnées de JS Property à Nice
const JS_PROPERTY_LOCATION = {
  lat: 43.6961,
  lng: 7.2714,
};

function MapContent() {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  if (!L) return null;

  // Icône personnalisée JS Property
  const customIcon = L.divIcon({
    className: "custom-contact-marker",
    html: `
      <div class="contact-marker-wrapper">
        <div class="contact-marker-pulse"></div>
        <div class="contact-marker-pin">
          <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
            <path d="M24 0C10.745 0 0 10.745 0 24c0 15 24 36 24 36s24-21 24-36c0-13.255-10.745-24-24-24z" 
                  fill="#c9a962" 
                  stroke="#0a0a0a" 
                  stroke-width="2"/>
            <circle cx="24" cy="22" r="10" fill="#0a0a0a"/>
            <text x="24" y="26" text-anchor="middle" fill="#c9a962" font-family="serif" font-size="12" font-weight="500">JS</text>
          </svg>
        </div>
      </div>
    `,
    iconSize: [48, 60],
    iconAnchor: [24, 60],
    popupAnchor: [0, -60],
  });

  return (
    <MapContainer
      center={[JS_PROPERTY_LOCATION.lat, JS_PROPERTY_LOCATION.lng]}
      zoom={16}
      scrollWheelZoom={false}
      zoomControl={false}
      className="w-full h-full"
      style={{ background: "#0a0a0a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker
        position={[JS_PROPERTY_LOCATION.lat, JS_PROPERTY_LOCATION.lng]}
        icon={customIcon}
      >
        <Popup className="contact-popup">
          <div className="text-center p-2">
            <span className="font-serif text-base text-noir font-medium block mb-1">
              JS Property
            </span>
            <span className="font-sans text-xs text-gris-sombre">
              2 rue Spitalieri, Nice
            </span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export function ContactMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative h-[400px] lg:h-full min-h-[400px] bg-noir-surface border border-or/10 overflow-hidden">
      {/* Loading State */}
      {!isMounted && (
        <div className="absolute inset-0 flex items-center justify-center bg-noir-surface">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border border-or/30 flex items-center justify-center animate-pulse">
              <MapPin size={24} className="text-or" />
            </div>
            <span className="font-sans text-xs text-gris-noble uppercase tracking-wider">
              Chargement de la carte...
            </span>
          </div>
        </div>
      )}

      {/* Map */}
      {isMounted && <MapContent />}

      {/* Overlay gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-noir-elegant to-transparent pointer-events-none z-10" />

      {/* Address card overlay */}
      <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-xs z-20">
        <div className="bg-noir/90 backdrop-blur-md border border-or/20 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex-shrink-0 bg-or flex items-center justify-center">
              <MapPin size={18} className="text-noir" />
            </div>
            <div>
              <span className="block font-serif text-base text-ivoire mb-1">
                JS Property
              </span>
              <span className="block font-sans text-xs text-gris-clair">
                2 rue Spitalieri
              </span>
              <span className="block font-sans text-xs text-gris-clair">
                06000 Nice, France
              </span>
              <a
                href="https://maps.google.com/?q=2+rue+Spitalieri+06000+Nice"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 font-sans text-[0.65rem] font-medium uppercase tracking-wider text-or hover:text-or-clair transition-colors"
              >
                Ouvrir dans Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ==================== PROPERTY TYPES ====================

export type PropertyAvailability = "disponible" | "vendu";
export type PropertyOrigin = "realisation" | "acquisition"; // réalisé par JS Property ou simple acquisition

export interface Property {
  id: string;
  title: string;
  slug: string;
  reference: string;
  location: {
    city: string;
    address: string;
    postalCode: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  availability: PropertyAvailability; // disponible ou vendu
  isRealisation: boolean; // true = rénové par JS Property
  type: "appartement" | "villa" | "maison" | "terrain" | "immeuble";
  images: {
    main: string;
    gallery: string[];
    beforeAfter?: {
      before: string;
      after: string;
    }[];
  };
  description: string;
  features: string[];
  year?: number; // année de réalisation
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==================== NAVIGATION TYPES ====================

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

// ==================== CREDENTIAL TYPES ====================

export interface Credential {
  value: string;
  label: string;
  suffix?: string;
}

// ==================== FILTER TYPES ====================

export interface PropertyFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  bedrooms?: number;
  type?: Property["type"];
  availability?: PropertyAvailability;
  isRealisation?: boolean;
}

// ==================== MAP TYPES ====================

export interface MapPin {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  property: Property;
}

// ==================== CONTACT TYPES ====================

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  consent: boolean;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

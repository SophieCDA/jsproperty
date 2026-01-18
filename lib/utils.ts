import { clsx, type ClassValue } from "clsx";

// ==================== CLASS NAME UTILITY ====================

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ==================== FORMAT UTILITIES ====================

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatSurface(surface: number): string {
  return `${surface} m²`;
}

// ==================== STATUS UTILITIES ====================

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    disponible: "Disponible",
    realise: "Réalisé",
    vendu: "Vendu",
  };
  return labels[status] || status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    disponible: "bg-or text-noir",
    realise: "bg-ivoire text-noir",
    vendu: "bg-gris-noble text-ivoire",
  };
  return colors[status] || "bg-gris-noble text-ivoire";
}

// ==================== SCROLL UTILITIES ====================

export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ==================== ANIMATION UTILITIES ====================

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ==================== VALIDATION UTILITIES ====================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s+()-]{10,}$/;
  return phoneRegex.test(phone);
}

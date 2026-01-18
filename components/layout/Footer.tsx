"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Nos biens disponibles", href: "/biens" },
    { label: "Nos réalisations", href: "/realisations" },
    { label: "Qui sommes-nous", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Achat de bien", href: "/services#achat" },
    { label: "Vente de bien", href: "/services#vente" },
    { label: "Rénovation", href: "/services#renovation" },
    { label: "Estimation gratuite", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noir-elegant border-t border-or/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-or flex items-center justify-center">
                <span className="font-serif text-xl font-medium text-or">
                  JS
                </span>
              </div>
              <span className="font-serif text-base tracking-[0.2em] uppercase text-ivoire">
                Property
              </span>
            </Link>
            <p className="font-sans text-sm font-light text-gris-noble leading-relaxed mb-6">
              Spécialiste de l&apos;immobilier de prestige sur la Côte
              d&apos;Azur. Acquisition, réhabilitation et vente de biens
              d&apos;exception depuis plus de 10 ans.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/j.sproperty/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-or hover:bg-or/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-gris-noble" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivoire mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm font-light text-gris-noble hover:text-or transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivoire mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm font-light text-gris-noble hover:text-or transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivoire mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-or flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm font-light text-gris-noble">
                  2 rue Spitalieri
                  <br />
                  06000 Nice
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-or flex-shrink-0" />
                <a
                  href="tel:+33634780000"
                  className="font-sans text-sm font-light text-gris-noble hover:text-or transition-colors"
                >
                  +33 6 34 78 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-or flex-shrink-0" />
                <a
                  href="mailto:contact@jsproperty.fr"
                  className="font-sans text-sm font-light text-gris-noble hover:text-or transition-colors"
                >
                  contact@jsproperty.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <span className="font-sans text-xs font-light text-gris-noble">
            © {currentYear} JS Property — Tous droits réservés
          </span>
          <div className="flex gap-6">
            <Link
              href="https://shebuildsapps.fr"
              className="font-sans text-xs font-light text-gris-noble hover:text-or transition-colors"
            >
              Développé par She Builds Apps
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

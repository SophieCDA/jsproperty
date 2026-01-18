"use client";

import { MapPin, Phone, Mail, Clock, Instagram, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "2 rue Spitalieri",
    subValue: "06000 Nice, France",
    href: "https://maps.google.com/?q=2+rue+Spitalieri+06000+Nice",
    isExternal: true,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 6 34 78 00 00",
    href: "tel:+33634780000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@jsproperty.fr",
    href: "mailto:contact@jsproperty.fr",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun - Ven : 9h - 19h",
    subValue: "Sam : Sur rendez-vous",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/j.sproperty/",
  }
];

export function ContactInfo() {
  return (
    <div className="space-y-10">
      {/* Introduction */}
      <div>
        <h3 className="font-serif text-2xl text-ivoire mb-4">
          Parlons de votre projet
        </h3>
        <p className="font-sans text-sm font-light text-gris-clair leading-relaxed">
          Notre équipe est à votre disposition pour répondre à toutes vos questions 
          et vous accompagner dans votre projet immobilier sur la Côte d&apos;Azur.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        {contactDetails.map((item) => {
          const Icon = item.icon;
          const content = (
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 flex-shrink-0 border border-or/30 flex items-center justify-center transition-all duration-300 group-hover:bg-or/10 group-hover:border-or">
                <Icon size={20} className="text-or" />
              </div>
              <div>
                <span className="block font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gris-noble mb-1">
                  {item.label}
                </span>
                <span className="block font-sans text-sm text-ivoire transition-colors group-hover:text-or">
                  {item.value}
                </span>
                {item.subValue && (
                  <span className="block font-sans text-sm text-gris-noble mt-0.5">
                    {item.subValue}
                  </span>
                )}
              </div>
              {item.isExternal && (
                <ArrowUpRight
                  size={16}
                  className="text-gris-noble transition-all duration-300 group-hover:text-or group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-auto"
                />
              )}
            </div>
          );

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="block"
              >
                {content}
              </Link>
            );
          }

          return <div key={item.label}>{content}</div>;
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />

      {/* Social Links */}
      <div>
        <span className="block font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gris-noble mb-4">
          Suivez-nous
        </span>
        <div className="flex gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-or hover:bg-or/10 group"
                aria-label={social.label}
              >
                <Icon size={20} className="text-gris-noble transition-colors group-hover:text-or" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Note */}
      <div className="bg-or/5 border border-or/20 p-6">
        <p className="font-sans text-xs font-light text-gris-clair leading-relaxed">
          <span className="text-or font-medium">Réponse garantie sous 24h.</span>
          {" "}Pour les demandes urgentes, privilégiez le contact téléphonique.
        </p>
      </div>
    </div>
  );
}
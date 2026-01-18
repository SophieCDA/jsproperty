import type { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, Hammer, ArrowRight, Check } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Nos Services — JS Property | Immobilier de Prestige Côte d'Azur",
  description:
    "Découvrez les services JS Property : achat immobilier, vente de bien et rénovation haut de gamme sur la Côte d'Azur.",
  keywords: [
    "services immobilier Nice",
    "achat vente Côte d'Azur",
    "rénovation haut de gamme",
    "agence immobilière prestige",
  ],
  openGraph: {
    title: "Nos Services — JS Property",
    description:
      "Achat, vente et rénovation : des services immobiliers premium sur la Côte d'Azur.",
    url: "https://jsproperty.fr/services",
  },
};

// Mapping des icônes pour éviter le problème Server/Client Component
const iconComponents = {
  Home,
  Building2,
  Hammer,
};

type IconKey = keyof typeof iconComponents;

const services = [
  {
    id: "achat",
    iconKey: "Home" as IconKey,
    title: "Achat de bien",
    subtitle: "Trouvez la perle rare",
    description:
      "Résidence principale, secondaire ou investissement locatif : nous vous accompagnons pour dénicher le bien idéal sur la Côte d'Azur.",
    highlights: [
      "Accès à des biens exclusifs",
      "Offre d'achat sous 24h",
      "Accompagnement juridique complet",
    ],
    href: "/services/achat",
    stats: { value: "50+", label: "biens/an" },
  },
  {
    id: "vente",
    iconKey: "Building2" as IconKey,
    title: "Vente de bien",
    subtitle: "Vendez au meilleur prix",
    description:
      "Estimation précise, mise en valeur premium et visibilité maximale pour vendre votre bien rapidement et au meilleur prix.",
    highlights: [
      "Estimation gratuite sous 48h",
      "Shooting photo professionnel",
      "Base de 500+ acquéreurs",
    ],
    href: "/services/vente",
    stats: { value: "98%", label: "taux de vente" },
  },
  {
    id: "renovation",
    iconKey: "Hammer" as IconKey,
    title: "Rénovation",
    subtitle: "Transformez votre bien",
    description:
      "Notre expertise en réhabilitation au service de votre projet : rénovation complète, décoration ou travaux ciblés.",
    highlights: [
      "Artisans sélectionnés",
      "Devis transparent",
      "Suivi de chantier dédié",
    ],
    href: "/services/renovation",
    stats: { value: "+25%", label: "plus-value" },
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-noir-elegant pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-30" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-or/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-azur-profond/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SectionBadge text="Nos Services" centered />
          <SectionTitle as="h1" className="mb-6">
            Un accompagnement
            <br />
            <Emphasis>sur-mesure</Emphasis>
          </SectionTitle>
          <p className="font-sans text-base font-light text-gris-clair leading-relaxed max-w-2xl mx-auto">
            Que vous souhaitiez acheter, vendre ou rénover, JS Property vous accompagne 
            à chaque étape de votre projet immobilier sur la Côte d&apos;Azur.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-noir py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const Icon = iconComponents[service.iconKey];
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-mt-32 ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="inline-flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 border border-or/30 flex items-center justify-center">
                        <Icon size={24} className="text-or" />
                      </div>
                      <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
                        {service.subtitle}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-6">
                      {service.title}
                    </h2>

                    <p className="font-sans text-sm font-light text-gris-clair leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-8">
                      {service.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 font-sans text-sm text-gris-clair"
                        >
                          <Check size={16} className="text-or flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <Link href={service.href}>
                      <Button variant="primary" size="lg">
                        En savoir plus
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Visual Card */}
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <div className="relative">
                      <div className="bg-noir-elegant border border-or/10 p-12 lg:p-16">
                        <div className="text-center">
                          {/* Icon */}
                          <div className="w-24 h-24 mx-auto mb-8 border border-or/30 flex items-center justify-center">
                            <Icon size={40} className="text-or" />
                          </div>

                          {/* Stat */}
                          <div className="mb-6">
                            <span className="block font-serif text-5xl text-or mb-2">
                              {service.stats.value}
                            </span>
                            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gris-noble">
                              {service.stats.label}
                            </span>
                          </div>

                          {/* Decorative line */}
                          <div className="h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div
                        className={`absolute -bottom-4 w-32 h-32 border border-or/10 -z-10 ${
                          isReversed ? "-left-4" : "-right-4"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-noir-elegant py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-6">
            Un projet en tête ?
          </h2>
          <p className="font-sans text-base font-light text-gris-clair leading-relaxed max-w-2xl mx-auto mb-10">
            Quel que soit votre projet immobilier sur la Côte d&apos;Azur, notre équipe 
            est à votre écoute pour vous conseiller et vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Nous contacter
              </Button>
            </Link>
            <Link href="/biens">
              <Button variant="outline" size="lg">
                Voir nos biens
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
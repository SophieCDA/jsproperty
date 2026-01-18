import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  ServiceHero,
  ServiceProcess,
  ServiceFeatures,
  ServiceCTA,
} from "@/components/services";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Rénovation Haut de Gamme — JS Property | Côte d'Azur",
  description:
    "Transformez votre bien immobilier avec JS Property. Rénovation haut de gamme, suivi de chantier et coordination des artisans sur la Côte d'Azur.",
  keywords: [
    "rénovation appartement Nice",
    "travaux haut de gamme Côte d'Azur",
    "réhabilitation immobilière",
    "architecte intérieur Nice",
    "rénovation prestige French Riviera",
  ],
  openGraph: {
    title: "Rénovation Haut de Gamme — JS Property",
    description:
      "Transformez votre bien immobilier avec notre expertise en rénovation haut de gamme.",
    url: "https://jsproperty.fr/services/renovation",
  },
};

const processSteps = [
  {
    number: "01",
    title: "Étude & Conception",
    description:
      "Visite technique, relevé de mesures et conception d'un projet sur-mesure adapté à vos envies et votre budget.",
    iconName: "Ruler" as const,
  },
  {
    number: "02",
    title: "Chiffrage détaillé",
    description:
      "Devis précis et transparent, sélection des matériaux et planning prévisionnel des travaux.",
    iconName: "ClipboardCheck" as const,
  },
  {
    number: "03",
    title: "Réalisation",
    description:
      "Coordination des corps de métier, suivi quotidien du chantier et contrôle qualité rigoureux.",
    iconName: "Hammer" as const,
  },
  {
    number: "04",
    title: "Livraison",
    description:
      "Réception des travaux, vérification des finitions et remise des clés de votre bien transformé.",
    iconName: "Sparkles" as const,
  },
];

const services = [
  {
    iconName: "PaintBucket" as const,
    title: "Rénovation complète",
    description:
      "Transformation intégrale de votre bien : redistribution des espaces, électricité, plomberie, revêtements.",
    highlights: ["Clé en main", "Gros œuvre", "Second œuvre"],
  },
  {
    iconName: "Lightbulb" as const,
    title: "Décoration & Aménagement",
    description:
      "Conception d'ambiances uniques, choix des matériaux nobles et aménagement intérieur personnalisé.",
  },
  {
    iconName: "Sofa" as const,
    title: "Home staging",
    description:
      "Mise en valeur de votre bien pour la vente : désencombrement, harmonisation et mise en scène.",
  },
  {
    iconName: "Wrench" as const,
    title: "Travaux ciblés",
    description:
      "Rénovation de pièces spécifiques : cuisine équipée, salle de bains design, suite parentale.",
    highlights: ["Cuisine", "Salle de bains", "Suite parentale"],
  },
  {
    iconName: "Home" as const,
    title: "Extension & Surélévation",
    description:
      "Agrandissement de votre espace de vie : véranda, extension, aménagement de combles.",
  },
  {
    iconName: "Shield" as const,
    title: "Mise aux normes",
    description:
      "Électricité, isolation thermique, accessibilité : mettez votre bien aux dernières normes.",
  },
];

const guarantees = [
  {
    iconName: "Award" as const,
    title: "Artisans sélectionnés",
    description:
      "Un réseau d'artisans locaux triés sur le volet, reconnus pour leur savoir-faire et leur fiabilité. Chaque corps de métier est choisi pour son excellence.",
  },
  {
    iconName: "FileCheck" as const,
    title: "Devis transparent",
    description:
      "Chiffrage détaillé poste par poste, sans mauvaise surprise. Le prix annoncé est le prix final, sauf modifications demandées par vos soins.",
  },
  {
    iconName: "Clock" as const,
    title: "Délais respectés",
    description:
      "Planning établi en amont et suivi rigoureux. Nous nous engageons sur les délais et vous tenons informé de l'avancement en temps réel.",
  },
  {
    iconName: "Eye" as const,
    title: "Suivi transparent",
    description:
      "Accès à un espace client avec photos du chantier, compte-rendus hebdomadaires et communication directe avec le chef de projet.",
  },
];

const expertise = [
  {
    iconName: "TrendingUp" as const,
    title: "Valorisation du bien",
    description:
      "Nos rénovations augmentent la valeur de votre bien de 15 à 30% en moyenne. Un investissement rentable.",
  },
  {
    iconName: "Users" as const,
    title: "Interlocuteur unique",
    description:
      "Un chef de projet dédié coordonne l'ensemble des intervenants. Vous n'avez qu'un seul contact.",
  },
  {
    iconName: "Shield" as const,
    title: "Garanties solides",
    description:
      "Garantie décennale, assurance tous risques chantier et garantie de parfait achèvement incluses.",
  },
];

export default function ServiceRenovationPage() {
  return (
    <>
      {/* Hero */}
      <ServiceHero
        badge="Service Rénovation"
        title="Transformez votre bien"
        titleEmphasis="en exception"
        description="Forts de notre expérience en réhabilitation de biens d'exception, nous mettons notre savoir-faire à votre service pour sublimer votre propriété sur la Côte d'Azur."
        iconName="Hammer"
        stats={[
          { value: "50+", label: "Projets réalisés" },
          { value: "100%", label: "Fonds propres" },
          { value: "+25%", label: "Plus-value moyenne" },
        ]}
      />

      {/* Process */}
      <ServiceProcess
        title="Un projet maîtrisé de A à Z"
        subtitle="De la conception à la livraison, nous gérons l'intégralité de votre projet de rénovation."
        steps={processSteps}
      />

      {/* Services */}
      <ServiceFeatures
        badge="Nos Prestations"
        title="Des solutions pour chaque projet"
        subtitle="Rénovation complète ou travaux ciblés, nous adaptons notre intervention à vos besoins."
        features={services}
        variant="grid"
      />

      {/* Guarantees */}
      <ServiceFeatures
        badge="Nos Garanties"
        title="La sérénité avant tout"
        subtitle="Nous nous engageons sur la qualité, les délais et la transparence."
        features={guarantees}
        variant="list"
      />

      {/* Before/After Section */}
      <section className="bg-noir py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-or" />
              <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
                Nos Réalisations
              </span>
              <span className="w-8 h-px bg-or" />
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-4">
              Le pouvoir de la transformation
            </h2>
            <p className="font-sans text-sm font-light text-gris-clair">
              Découvrez quelques-unes de nos réalisations et le potentiel de transformation 
              que nous pouvons apporter à votre bien.
            </p>
          </div>

          {/* Placeholder for before/after gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group bg-noir-surface border border-white/5 overflow-hidden hover:border-or/20 transition-all duration-500"
              >
                <div className="aspect-[4/3] bg-noir-elegant flex items-center justify-center">
                  <div className="text-center p-6">
                    <Sparkles size={40} className="text-or/30 mx-auto mb-4" />
                    <p className="font-serif text-lg text-gris-noble">
                      Avant / Après
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-ivoire mb-2 group-hover:text-or transition-colors">
                    Rénovation {item === 1 ? "Appartement Nice" : item === 2 ? "Villa Cannes" : "Loft Antibes"}
                  </h3>
                  <p className="font-sans text-xs text-gris-noble">
                    {item === 1 ? "Rénovation complète 85m²" : item === 2 ? "Extension et modernisation" : "Transformation loft industriel"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/realisations">
              <Button variant="outline" size="lg">
                Voir toutes nos réalisations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <ServiceFeatures
        badge="Notre Expertise"
        title="Pourquoi nous confier vos travaux ?"
        subtitle="L'expérience d'un promoteur-rénovateur au service de votre projet personnel."
        features={expertise}
        variant="list"
      />

      {/* CTA */}
      <ServiceCTA
        title="Discutons de votre projet"
        description="Décrivez-nous votre projet de rénovation et bénéficiez d'une première consultation gratuite. Nous vous recontactons sous 48 heures avec une première analyse."
        primaryAction={{
          label: "Décrire mon projet",
          href: "/contact?service=renovation",
        }}
        secondaryAction={{
          label: "Voir nos réalisations",
          href: "/realisations",
        }}
      />
    </>
  );
}
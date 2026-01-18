import type { Metadata } from "next";
import {
  ServiceHero,
  ServiceProcess,
  ServiceFeatures,
  ServiceCTA,
} from "@/components/services";

export const metadata: Metadata = {
  title: "Achat de Bien Immobilier — JS Property | Côte d'Azur",
  description:
    "Trouvez le bien immobilier de vos rêves sur la Côte d'Azur avec JS Property. Accompagnement personnalisé, accès à des biens exclusifs et expertise locale depuis plus de 15 ans.",
  keywords: [
    "achat immobilier Nice",
    "appartement Côte d'Azur",
    "investissement immobilier",
    "bien de prestige Nice",
    "acheter appartement French Riviera",
  ],
  openGraph: {
    title: "Achat de Bien Immobilier — JS Property",
    description:
      "Trouvez le bien immobilier de vos rêves sur la Côte d'Azur avec notre accompagnement personnalisé.",
    url: "https://jsproperty.fr/services/achat",
  },
};

const processSteps = [
  {
    number: "01",
    title: "Définition du projet",
    description:
      "Nous analysons ensemble vos critères, votre budget et vos objectifs pour cibler précisément le bien idéal.",
    iconName: "Target" as const,
  },
  {
    number: "02",
    title: "Recherche ciblée",
    description:
      "Accès à notre portefeuille exclusif et veille active sur le marché pour identifier les meilleures opportunités.",
    iconName: "Search" as const,
  },
  {
    number: "03",
    title: "Visites & Analyse",
    description:
      "Organisation des visites, analyse technique des biens et conseil objectif pour éclairer votre décision.",
    iconName: "FileCheck" as const,
  },
  {
    number: "04",
    title: "Acquisition",
    description:
      "Négociation, accompagnement juridique et suivi jusqu'à la remise des clés de votre nouveau bien.",
    iconName: "Key" as const,
  },
];

const features = [
  {
    iconName: "MapPin" as const,
    title: "Expertise locale",
    description:
      "Plus de 15 ans d'expérience sur la Côte d'Azur nous permettent de connaître chaque quartier, chaque rue, chaque opportunité.",
    highlights: ["Nice", "Cannes", "Monaco", "Antibes"],
  },
  {
    iconName: "BadgeCheck" as const,
    title: "Biens exclusifs",
    description:
      "Accédez à des biens hors marché et des opportunités avant leur mise en vente publique grâce à notre réseau privilégié.",
  },
  {
    iconName: "Shield" as const,
    title: "Sécurité juridique",
    description:
      "Vérification complète de chaque bien : diagnostics, urbanisme, copropriété. Aucune mauvaise surprise après l'achat.",
  },
  {
    iconName: "TrendingUp" as const,
    title: "Conseil investissement",
    description:
      "Analyse du potentiel locatif, de la plus-value et des travaux éventuels pour optimiser votre investissement.",
    highlights: ["Rentabilité", "Plus-value", "Fiscalité"],
  },
  {
    iconName: "Clock" as const,
    title: "Réactivité",
    description:
      "Sur un marché concurrentiel, notre réactivité fait la différence. Offre d'achat possible sous 24 heures.",
  },
  {
    iconName: "Handshake" as const,
    title: "Accompagnement complet",
    description:
      "De la première visite à la signature chez le notaire, un interlocuteur unique vous accompagne à chaque étape.",
  },
];

const whyChooseUs = [
  {
    iconName: "Users" as const,
    title: "Réseau d'experts",
    description:
      "Notaires, banquiers, architectes : nous mobilisons notre réseau de partenaires de confiance pour faciliter votre projet.",
  },
  {
    iconName: "Target" as const,
    title: "Biens ciblés uniquement",
    description:
      "Nous ne vous présentons que des biens correspondant strictement à vos critères. Pas de perte de temps.",
  },
  {
    iconName: "Shield" as const,
    title: "Transparence totale",
    description:
      "Prix du marché, état réel du bien, charges de copropriété : nous vous donnons toutes les informations pour décider sereinement.",
  },
];

export default function ServiceAchatPage() {
  return (
    <>
      {/* Hero */}
      <ServiceHero
        badge="Service Achat"
        title="Trouvez le bien"
        titleEmphasis="de vos rêves"
        description="Que vous recherchiez une résidence principale, secondaire ou un investissement locatif, notre équipe vous accompagne pour dénicher la perle rare sur la Côte d'Azur."
        iconName="Home"
        stats={[
          { value: "50+", label: "Biens vendus/an" },
          { value: "24h", label: "Offre d'achat" },
          { value: "15", label: "Ans d'expertise" },
        ]}
      />

      {/* Process */}
      <ServiceProcess
        title="Un accompagnement sur-mesure"
        subtitle="De la définition de votre projet jusqu'à la remise des clés, nous sommes à vos côtés."
        steps={processSteps}
      />

      {/* Features */}
      <ServiceFeatures
        badge="Nos Atouts"
        title="Pourquoi nous confier votre recherche ?"
        subtitle="Une expertise locale inégalée au service de votre projet immobilier."
        features={features}
        variant="grid"
      />

      {/* Why Choose Us */}
      <ServiceFeatures
        badge="Notre Engagement"
        title="La différence JS Property"
        subtitle="Plus qu'une agence, un partenaire de confiance pour votre investissement."
        features={whyChooseUs}
        variant="list"
      />

      {/* CTA */}
      <ServiceCTA
        title="Prêt à trouver votre bien idéal ?"
        description="Décrivez-nous votre projet et bénéficiez d'un premier entretien gratuit avec l'un de nos experts. Nous vous recontactons sous 24 heures."
        primaryAction={{
          label: "Décrire mon projet",
          href: "/contact?service=achat",
        }}
        secondaryAction={{
          label: "Voir nos biens",
          href: "/biens",
        }}
      />
    </>
  );
}
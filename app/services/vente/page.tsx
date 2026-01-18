import type { Metadata } from "next";
import {
  ServiceHero,
  ServiceProcess,
  ServiceFeatures,
  ServiceCTA,
} from "@/components/services";
import { Camera, Sparkles, Target } from "lucide-react";

// Composant helper pour les icônes dans la section premium
function CameraIcon({ className }: { className?: string }) {
  return <Camera className={className} />;
}

// Composant pour les services premium (côté client implicite via parent)
function PremiumServiceItem({ 
  iconName, 
  title, 
  description 
}: { 
  iconName: "Sparkles" | "Camera" | "Target";
  title: string;
  description: string;
}) {
  const icons = {
    Sparkles: Sparkles,
    Camera: Camera,
    Target: Target,
  };
  const Icon = icons[iconName];
  
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex-shrink-0 border border-or/30 flex items-center justify-center">
        <Icon size={22} className="text-or" />
      </div>
      <div>
        <h3 className="font-serif text-lg text-ivoire mb-1">{title}</h3>
        <p className="font-sans text-sm font-light text-gris-noble">{description}</p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Vente de Bien Immobilier — JS Property | Côte d'Azur",
  description:
    "Vendez votre bien immobilier au meilleur prix sur la Côte d'Azur. Estimation gratuite, mise en valeur premium et accompagnement personnalisé par JS Property.",
  keywords: [
    "vendre appartement Nice",
    "estimation immobilière Côte d'Azur",
    "vente bien prestige",
    "agence immobilière Nice",
    "vendre maison French Riviera",
  ],
  openGraph: {
    title: "Vente de Bien Immobilier — JS Property",
    description:
      "Vendez votre bien immobilier au meilleur prix avec notre accompagnement premium.",
    url: "https://jsproperty.fr/services/vente",
  },
};

const processSteps = [
  {
    number: "01",
    title: "Estimation gratuite",
    description:
      "Analyse approfondie de votre bien et du marché pour déterminer le prix de vente optimal.",
    iconName: "Calculator" as const,
  },
  {
    number: "02",
    title: "Mise en valeur",
    description:
      "Shooting photo professionnel, home staging virtuel et rédaction d'une annonce premium.",
    iconName: "Camera" as const,
  },
  {
    number: "03",
    title: "Commercialisation",
    description:
      "Diffusion ciblée auprès de notre base acquéreurs qualifiés et sur les portails premium.",
    iconName: "Megaphone" as const,
  },
  {
    number: "04",
    title: "Négociation & Vente",
    description:
      "Gestion des visites, négociation au meilleur prix et accompagnement jusqu'à la signature.",
    iconName: "FileSignature" as const,
  },
];

const features = [
  {
    iconName: "Calculator" as const,
    title: "Estimation précise",
    description:
      "Notre connaissance fine du marché local nous permet d'estimer votre bien au juste prix, ni trop haut ni trop bas.",
    highlights: ["Gratuite", "Sans engagement", "Sous 48h"],
  },
  {
    iconName: "Camera" as const,
    title: "Mise en valeur premium",
    description:
      "Photos professionnelles, vidéo drone, visite virtuelle 360° et home staging pour sublimer votre bien.",
  },
  {
    iconName: "Users" as const,
    title: "Base acquéreurs qualifiés",
    description:
      "Plus de 500 acquéreurs actifs dans notre base, pré-qualifiés et prêts à concrétiser leur projet.",
  },
  {
    iconName: "Eye" as const,
    title: "Visibilité maximale",
    description:
      "Diffusion sur les portails premium, réseaux sociaux et notre site. Votre bien est vu par les bons acheteurs.",
    highlights: ["SeLoger", "LeBonCoin", "Belles Demeures"],
  },
  {
    iconName: "Shield" as const,
    title: "Sécurité juridique",
    description:
      "Constitution d'un dossier complet, vérification des acquéreurs et accompagnement notarial.",
  },
  {
    iconName: "TrendingUp" as const,
    title: "Négociation experte",
    description:
      "Notre expertise en négociation vous assure d'obtenir le meilleur prix dans les meilleures conditions.",
  },
];

const guarantees = [
  {
    iconName: "Clock" as const,
    title: "Délai de vente optimisé",
    description:
      "En moyenne, nos biens se vendent 30% plus vite que la moyenne du marché grâce à notre stratégie de commercialisation.",
  },
  {
    iconName: "BarChart3" as const,
    title: "Reporting régulier",
    description:
      "Compte-rendu hebdomadaire sur les visites, retours acquéreurs et ajustements stratégiques si nécessaire.",
  },
  {
    iconName: "Award" as const,
    title: "Mandat sur-mesure",
    description:
      "Mandat simple ou exclusif, durée adaptée : nous construisons ensemble la formule qui vous convient.",
  },
];

const premiumServices = [
  {
    iconName: "Sparkles" as const,
    title: "Home staging",
    description:
      "Conseils de décoration et mise en scène pour permettre aux acquéreurs de se projeter immédiatement.",
  },
  {
    iconName: "Camera" as const,
    title: "Shooting professionnel",
    description:
      "Photos HDR, vidéo cinématique et prise de vue drone pour une présentation exceptionnelle.",
  },
  {
    iconName: "Target" as const,
    title: "Marketing ciblé",
    description:
      "Campagnes publicitaires ciblées sur les réseaux sociaux pour toucher les acquéreurs qualifiés.",
  },
];

export default function ServiceVentePage() {
  return (
    <>
      {/* Hero */}
      <ServiceHero
        badge="Service Vente"
        title="Vendez au"
        titleEmphasis="meilleur prix"
        description="Confiez-nous la vente de votre bien et bénéficiez d'une mise en valeur premium, d'une visibilité maximale et d'un accompagnement personnalisé jusqu'à la signature."
        iconName="Building2"
        stats={[
          { value: "98%", label: "Taux de vente" },
          { value: "45j", label: "Délai moyen" },
          { value: "+5%", label: "vs prix estimé" },
        ]}
      />

      {/* Process */}
      <ServiceProcess
        title="4 étapes vers la vente"
        subtitle="Un processus éprouvé pour vendre votre bien rapidement et au meilleur prix."
        steps={processSteps}
      />

      {/* Features */}
      <ServiceFeatures
        badge="Notre Méthode"
        title="Une stratégie de vente sur-mesure"
        subtitle="Chaque bien est unique. Notre approche aussi."
        features={features}
        variant="grid"
      />

      {/* Premium Services */}
      <section className="bg-noir py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-or" />
                <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
                  Services Premium
                </span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-ivoire mb-6">
                Sublimez votre bien
              </h2>
              <p className="font-sans text-sm font-light text-gris-clair leading-relaxed mb-8">
                Pour maximiser l&apos;attractivité de votre bien, nous proposons 
                des services premium inclus dans notre accompagnement.
              </p>

              <div className="space-y-6">
                <PremiumServiceItem
                  iconName="Sparkles"
                  title="Home staging"
                  description="Conseils de décoration et mise en scène pour permettre aux acquéreurs de se projeter immédiatement."
                />
                <PremiumServiceItem
                  iconName="Camera"
                  title="Shooting professionnel"
                  description="Photos HDR, vidéo cinématique et prise de vue drone pour une présentation exceptionnelle."
                />
                <PremiumServiceItem
                  iconName="Target"
                  title="Marketing ciblé"
                  description="Campagnes publicitaires ciblées sur les réseaux sociaux pour toucher les acquéreurs qualifiés."
                />
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-[4/3] bg-noir-surface border border-or/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <CameraIcon className="w-16 h-16 text-or/30 mx-auto mb-6" />
                  <p className="font-serif text-xl text-ivoire mb-2">
                    Mise en valeur professionnelle
                  </p>
                  <p className="font-sans text-sm text-gris-noble">
                    Photos • Vidéo • Drone • Visite 360°
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-or/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <ServiceFeatures
        badge="Nos Engagements"
        title="Des garanties concrètes"
        subtitle="Notre réputation repose sur la satisfaction de nos clients vendeurs."
        features={guarantees}
        variant="list"
      />

      {/* CTA */}
      <ServiceCTA
        title="Estimez votre bien gratuitement"
        description="Recevez une estimation précise de votre bien sous 48 heures. Sans engagement, totalement gratuit."
        primaryAction={{
          label: "Demander une estimation",
          href: "/contact?service=estimation",
        }}
        secondaryAction={{
          label: "Nos réalisations",
          href: "/realisations",
        }}
      />
    </>
  );
}
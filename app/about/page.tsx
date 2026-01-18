import type { Metadata } from "next";
import {
  AboutHero,
  FounderSection,
  ValuesSection,
  TimelineSection,
  TeamVisionSection,
  StatsSection,
  TestimonialsSection,
  AboutCTASection,
} from "@/components/about";

export const metadata: Metadata = {
  title: "Qui sommes-nous | JS Property — Immobilier de Prestige",
  description:
    "Découvrez JS Property, spécialiste de l'immobilier de luxe sur la Côte d'Azur. Plus de 10 ans d'expertise en acquisition, rénovation et vente de biens d'exception.",
  openGraph: {
    title: "Qui sommes-nous | JS Property — Immobilier de Prestige",
    description:
      "Découvrez JS Property, spécialiste de l'immobilier de luxe sur la Côte d'Azur.",
    url: "https://jsproperty.fr/about",
    siteName: "JS Property",
    locale: "fr_FR",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatsSection />
      <FounderSection />
      <ValuesSection />
      <TimelineSection />
      <TeamVisionSection />
      <TestimonialsSection />
      <AboutCTASection />
    </>
  );
}
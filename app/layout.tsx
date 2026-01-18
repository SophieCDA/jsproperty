import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsentWrapper } from "@/components/cookies";

export const metadata: Metadata = {
  title: "JS Property — Immobilier de Prestige sur la Côte d'Azur",
  description:
    "Spécialiste de l'acquisition, la réhabilitation et la vente de biens immobiliers d'exception sur la French Riviera. Plus de 15 ans d'expérience.",
  keywords: [
    "immobilier luxe",
    "Côte d'Azur",
    "Nice",
    "appartement prestige",
    "rénovation haut de gamme",
    "French Riviera",
    "investissement immobilier",
  ],
  authors: [{ name: "JS Property" }],
  openGraph: {
    title: "JS Property — Immobilier de Prestige sur la Côte d'Azur",
    description:
      "Spécialiste de l'acquisition, la réhabilitation et la vente de biens immobiliers d'exception sur la French Riviera.",
    url: "https://jsproperty.fr",
    siteName: "JS Property",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {/* 
          CookieConsentWrapper englobe tout le contenu.
          Il fournit le contexte et affiche automatiquement 
          le bandeau et le panneau de préférences.
        */}
        <CookieConsentWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </CookieConsentWrapper>
      </body>
    </html>
  );
}
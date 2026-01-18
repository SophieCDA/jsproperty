import type { Metadata } from "next";
import { ContactHero, ContactForm, ContactInfo, ContactMap } from "@/components/contact";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact — JS Property | Immobilier de Prestige Côte d'Azur",
  description:
    "Contactez JS Property pour votre projet immobilier sur la Côte d'Azur. Achat, vente, estimation gratuite. Notre équipe d'experts vous répond sous 24h.",
  keywords: [
    "contact JS Property",
    "immobilier Nice",
    "estimation gratuite",
    "agence immobilière Côte d'Azur",
    "achat appartement Nice",
    "vente bien immobilier",
  ],
  openGraph: {
    title: "Contact — JS Property | Immobilier de Prestige Côte d'Azur",
    description:
      "Contactez JS Property pour votre projet immobilier sur la Côte d'Azur. Notre équipe d'experts vous répond sous 24h.",
    url: "https://jsproperty.fr/contact",
    siteName: "JS Property",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <section className="bg-noir-elegant py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <div className="lg:col-span-3">
              <div className="bg-noir-elegant border border-or/10 p-8 lg:p-12">
                {/* Form Header */}
                <div className="mb-10">
                  <h2 className="font-serif text-2xl lg:text-3xl text-ivoire mb-4">
                    Envoyez-nous un message
                  </h2>
                  <p className="font-sans text-sm font-light text-gris-clair">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>

                {/* Contact Form */}
                <ContactForm />
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-noir">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-or" />
              <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
                Notre Localisation
              </span>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl text-ivoire">
              Venez nous rencontrer
            </h2>
          </div>

          {/* Map Container */}
          <div className="h-[500px] lg:h-[600px]">
            <ContactMap />
          </div>
        </div>
      </section>

      {/* FAQ Quick Section */}
      <section className="bg-noir-elegant py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quick FAQ Items */}
            <QuickFAQItem
              question="Délai de réponse"
              answer="Notre équipe s'engage à vous répondre sous 24h ouvrées. Pour les demandes urgentes, n'hésitez pas à nous appeler directement."
            />
            <QuickFAQItem
              question="Estimation gratuite"
              answer="Nous proposons une estimation gratuite et sans engagement de votre bien. Contactez-nous pour prendre rendez-vous avec l'un de nos experts."
            />
            <QuickFAQItem
              question="Zone d'intervention"
              answer="Nous intervenons sur l'ensemble de la Côte d'Azur : Nice, Cannes, Monaco, Antibes, Saint-Tropez et leurs environs."
            />
          </div>
        </div>
      </section>
    </>
  );
}

// Composant FAQ rapide
function QuickFAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="group">
      <div className="h-full bg-noir-surface border border-white/5 p-8 transition-all duration-300 hover:border-or/20">
        <h3 className="font-serif text-lg text-ivoire mb-4 group-hover:text-or transition-colors">
          {question}
        </h3>
        <p className="font-sans text-sm font-light text-gris-clair leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
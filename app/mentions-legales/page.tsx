import type { Metadata } from "next";
import Link from "next/link";
import { Building2, User, Server, CreditCard, Scale, Mail } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Mentions Légales — JS Property",
  description:
    "Mentions légales du site JS Property. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site.",
  robots: "noindex, follow",
};

// Informations à personnaliser
const legalInfo = {
  // Éditeur
  company: {
    name: "JS PROPERTY SAS",
    capital: "10 000", // Capital social en euros
    address: "2 rue Spitalieri",
    postalCode: "06000",
    city: "Nice",
    country: "France",
    siret: "881 427 736 00023",
    rcs: "Nice B 881 427 736",
    tva: "FR73 881 427 736",
    phone: "+33 6 34 78 00 00",
    email: "contact@jsproperty.fr",
  },
  // Directeur de publication
  director: {
    name: "Joachim Seroussi",
    role: "Président",
  },
  // Hébergeur
  hosting: {
    name: "IONOS", // À adapter selon votre hébergeur
    address: "701 Lee Road, Suite 300",
    city: "Chesterbrook, PA 19087",
    country: "États-Unis",
    website: "https://www.ionos.fr",
  }
};

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-noir-elegant pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-30" />
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-azur-profond/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <SectionBadge text="Informations légales" />
          <SectionTitle as="h1" className="mb-6">
            Mentions <Emphasis>Légales</Emphasis>
          </SectionTitle>
          <p className="font-sans text-base font-light text-gris-clair leading-relaxed max-w-2xl">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la 
            confiance dans l&apos;économie numérique, voici les informations légales relatives 
            au site jsproperty.fr.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="bg-noir-elegant py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Section 1 - Éditeur */}
          <LegalSection
            icon={Building2}
            number="01"
            title="Éditeur du site"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4>Raison sociale</h4>
                <p className="text-ivoire">{legalInfo.company.name}</p>
                <p>Société par Actions Simplifiée au capital de {legalInfo.company.capital} €</p>
              </div>
              <div>
                <h4>Siège social</h4>
                <p className="text-ivoire">{legalInfo.company.address}</p>
                <p>{legalInfo.company.postalCode} {legalInfo.company.city}, {legalInfo.company.country}</p>
              </div>
              <div>
                <h4>Immatriculation</h4>
                <p>SIRET : {legalInfo.company.siret}</p>
                <p>RCS : {legalInfo.company.rcs}</p>
                <p>N° TVA : {legalInfo.company.tva}</p>
              </div>
              <div>
                <h4>Contact</h4>
                <p>Tél : <a href={`tel:${legalInfo.company.phone.replace(/\s/g, '')}`} className="text-or hover:text-or-clair">{legalInfo.company.phone}</a></p>
                <p>Email : <a href={`mailto:${legalInfo.company.email}`} className="text-or hover:text-or-clair">{legalInfo.company.email}</a></p>
              </div>
            </div>
          </LegalSection>

          {/* Section 2 - Directeur de publication */}
          <LegalSection
            icon={User}
            number="02"
            title="Directeur de la publication"
          >
            <p>
              Le directeur de la publication du site est <strong className="text-ivoire">{legalInfo.director.name}</strong>, 
              en qualité de {legalInfo.director.role} de {legalInfo.company.name}.
            </p>
          </LegalSection>

          {/* Section 3 - Hébergeur */}
          <LegalSection
            icon={Server}
            number="03"
            title="Hébergement"
          >
            <p>Le site jsproperty.fr est hébergé par :</p>
            <div className="mt-4 p-6 bg-noir-surface border border-white/5">
              <p className="text-ivoire font-medium">{legalInfo.hosting.name}</p>
              <p>{legalInfo.hosting.address}</p>
              <p>{legalInfo.hosting.city}, {legalInfo.hosting.country}</p>
              <p className="mt-2">
                <a href={legalInfo.hosting.website} target="_blank" rel="noopener noreferrer" className="text-or hover:text-or-clair">
                  {legalInfo.hosting.website}
                </a>
              </p>
            </div>
          </LegalSection>

          {/* Section 5 - Propriété intellectuelle */}
          <LegalSection
            icon={Scale}
            number="05"
            title="Propriété intellectuelle"
          >
            <p>
              L&apos;ensemble du contenu du site jsproperty.fr (textes, images, photographies, 
              logos, vidéos, structure, mise en page, charte graphique, etc.) est la propriété 
              exclusive de {legalInfo.company.name} ou de ses partenaires et est protégé par 
              les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            
            <p className="mt-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout 
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
              interdite sans l&apos;autorisation écrite préalable de {legalInfo.company.name}.
            </p>

            <p className="mt-4">
              Toute exploitation non autorisée du site ou de son contenu sera considérée comme 
              constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des 
              articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </LegalSection>

          {/* Section 6 - Responsabilité */}
          <LegalSection
            icon={Scale}
            number="06"
            title="Limitation de responsabilité"
          >
            <h4>Informations du site</h4>
            <p>
              Les informations contenues sur le site sont aussi précises que possible et le site 
              est mis à jour régulièrement. Toutefois, des erreurs ou omissions peuvent survenir. 
              L&apos;utilisateur devra donc s&apos;assurer de l&apos;exactitude des informations 
              auprès de JS Property et signaler toute modification qu&apos;il jugerait utile.
            </p>

            <h4>Disponibilité du site</h4>
            <p>
              JS Property ne peut garantir que le site sera accessible sans interruption. 
              En cas d&apos;impossibilité d&apos;accès au site, JS Property ne saurait être tenue 
              pour responsable des dommages directs ou indirects résultant de cette indisponibilité.
            </p>

            <h4>Liens hypertextes</h4>
            <p>
              Le site peut contenir des liens vers d&apos;autres sites internet. JS Property 
              n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant 
              à leur contenu ou aux informations qui y sont diffusées.
            </p>
          </LegalSection>

          {/* Section 7 - Droit applicable */}
          <LegalSection
            icon={Scale}
            number="07"
            title="Droit applicable et juridiction"
          >
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, 
              et après tentative de recherche d&apos;une solution amiable, les tribunaux français 
              seront seuls compétents.
            </p>
            
            <p className="mt-4">
              Conformément à l&apos;article L.612-1 du Code de la consommation, le consommateur 
              peut recourir gratuitement au service de médiation MEDICYS dont JS Property relève. 
              Ce médiateur peut être saisi via le site{" "}
              <a href="https://www.medicys.fr" target="_blank" rel="noopener noreferrer" className="text-or hover:text-or-clair">
                www.medicys.fr
              </a>
              .
            </p>
          </LegalSection>

          {/* Section 8 - Protection des données */}
          <LegalSection
            icon={User}
            number="08"
            title="Protection des données personnelles"
          >
            <p>
              Pour toute information relative à la collecte et au traitement de vos données 
              personnelles, veuillez consulter notre{" "}
              <Link href="/confidentialite" className="text-or hover:text-or-clair">
                politique de confidentialité
              </Link>
              .
            </p>
          </LegalSection>

          {/* Contact */}
          <div className="mt-16 pt-12 border-t border-or/20">
            <h3 className="font-serif text-2xl text-ivoire mb-6">Besoin d&apos;informations ?</h3>
            <p className="font-sans text-sm font-light text-gris-clair mb-6">
              Pour toute question concernant ces mentions légales ou le fonctionnement du site, 
              n&apos;hésitez pas à nous contacter.
            </p>
            <Link href="/contact">
              <Button variant="primary">
                <Mail size={16} className="mr-2" />
                Nous contacter
              </Button>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

// Composant Section
function LegalSection({
  icon: Icon,
  number,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex-shrink-0 border border-or/30 flex items-center justify-center">
          <Icon size={20} className="text-or" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl text-or/30">{number}</span>
          <h2 className="font-serif text-xl text-ivoire">{title}</h2>
        </div>
      </div>
      <div className="ml-0 lg:ml-16 font-sans text-sm font-light text-gris-clair leading-relaxed space-y-4 [&_h4]:font-medium [&_h4]:text-ivoire [&_h4]:text-sm [&_h4]:mt-6 [&_h4]:mb-2 [&_p]:text-gris-clair [&_a]:text-or [&_a]:hover:text-or-clair [&_a]:transition-colors">
        {children}
      </div>
    </section>
  );
}
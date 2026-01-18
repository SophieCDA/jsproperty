import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Mail, Clock, FileText, Lock, Eye, Trash2, Download, AlertCircle } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle, Emphasis } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — JS Property",
  description:
    "Politique de confidentialité et protection des données personnelles de JS Property. Découvrez comment nous collectons, utilisons et protégeons vos informations.",
  robots: "noindex, follow",
};

// Données de la société
const companyInfo = {
  name: "JS Property",
  legalName: "JS PROPERTY SAS",
  address: "2 rue Spitalieri, 06000 Nice, France",
  email: "contact@jsproperty.fr",
  phone: "+33 6 34 78 00 00",
  siret: "881 427 736 00023",
  rcs: "Nice B 881 427 736",
  dpo: "contact@jsproperty.fr",
  lastUpdate: "18 janvier 2026",
};

// Sections de la politique
const sections = [
  {
    id: "collecte",
    icon: FileText,
    title: "Données collectées",
  },
  {
    id: "utilisation",
    icon: Eye,
    title: "Utilisation des données",
  },
  {
    id: "conservation",
    icon: Clock,
    title: "Durée de conservation",
  },
  {
    id: "securite",
    icon: Lock,
    title: "Sécurité des données",
  },
  {
    id: "droits",
    icon: Shield,
    title: "Vos droits",
  },
  {
    id: "cookies",
    icon: AlertCircle,
    title: "Cookies",
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-noir-elegant pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-30" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-or/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <SectionBadge text="RGPD" />
          <SectionTitle as="h1" className="mb-6">
            Politique de <Emphasis>Confidentialité</Emphasis>
          </SectionTitle>
          <p className="font-sans text-base font-light text-gris-clair leading-relaxed max-w-2xl">
            Chez JS Property, la protection de vos données personnelles est une priorité. 
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>

          {/* Dernière mise à jour */}
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 bg-or/5 border border-or/20">
            <Clock size={16} className="text-or" />
            <span className="font-sans text-xs text-gris-clair">
              Dernière mise à jour : <span className="text-ivoire">{companyInfo.lastUpdate}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="bg-noir border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <nav className="flex flex-wrap gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-or/30 transition-all duration-300"
                >
                  <Icon size={14} className="text-gris-noble group-hover:text-or transition-colors" />
                  <span className="font-sans text-xs text-gris-clair group-hover:text-ivoire transition-colors">
                    {section.title}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="bg-noir-elegant py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-invert prose-gold max-w-none">
            
            {/* Introduction */}
            <div className="mb-16">
              <p className="font-sans text-sm font-light text-gris-clair leading-relaxed">
                La société <strong className="text-ivoire">{companyInfo.legalName}</strong>, 
                située au {companyInfo.address}, immatriculée au RCS de {companyInfo.rcs}, 
                est responsable du traitement des données personnelles collectées sur le site 
                jsproperty.fr (ci-après « le Site »).
              </p>
              <p className="font-sans text-sm font-light text-gris-clair leading-relaxed mt-4">
                Cette politique de confidentialité s&apos;applique à l&apos;ensemble des services proposés 
                par JS Property et vise à vous informer sur la manière dont nous traitons vos données 
                personnelles, conformément au Règlement Général sur la Protection des Données (RGPD) 
                et à la loi Informatique et Libertés.
              </p>
            </div>

            {/* Section 1 - Données collectées */}
            <PolicySection id="collecte" number="01" title="Données collectées">
              <p>
                Dans le cadre de nos activités, nous sommes amenés à collecter différentes catégories 
                de données personnelles :
              </p>

              <h4>Données d&apos;identification</h4>
              <ul>
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale (le cas échéant)</li>
              </ul>

              <h4>Données relatives à votre projet immobilier</h4>
              <ul>
                <li>Type de bien recherché ou à vendre</li>
                <li>Budget envisagé</li>
                <li>Localisation souhaitée</li>
                <li>Critères de recherche spécifiques</li>
              </ul>

              <h4>Données de navigation</h4>
              <ul>
                <li>Adresse IP</li>
                <li>Type de navigateur et système d&apos;exploitation</li>
                <li>Pages consultées et durée de visite</li>
                <li>Source de trafic</li>
              </ul>

              <div className="bg-or/5 border border-or/20 p-6 mt-6">
                <p className="text-sm text-gris-clair m-0">
                  <strong className="text-or">Base légale :</strong> Le traitement de vos données repose 
                  sur votre consentement explicite (formulaire de contact), l&apos;exécution d&apos;un contrat 
                  ou de mesures précontractuelles, et notre intérêt légitime à améliorer nos services.
                </p>
              </div>
            </PolicySection>

            {/* Section 2 - Utilisation des données */}
            <PolicySection id="utilisation" number="02" title="Utilisation des données">
              <p>Vos données personnelles sont utilisées pour les finalités suivantes :</p>

              <h4>Gestion de la relation client</h4>
              <ul>
                <li>Répondre à vos demandes de contact et d&apos;information</li>
                <li>Vous accompagner dans votre projet immobilier</li>
                <li>Organiser les visites de biens</li>
                <li>Établir les documents contractuels</li>
              </ul>

              <h4>Communication commerciale</h4>
              <ul>
                <li>Vous informer de nos nouveaux biens disponibles</li>
                <li>Vous envoyer notre newsletter (avec votre accord)</li>
                <li>Vous proposer des services adaptés à vos besoins</li>
              </ul>

              <h4>Amélioration de nos services</h4>
              <ul>
                <li>Analyser l&apos;utilisation de notre site web</li>
                <li>Améliorer l&apos;expérience utilisateur</li>
                <li>Réaliser des statistiques anonymisées</li>
              </ul>

              <h4>Obligations légales</h4>
              <ul>
                <li>Respect des obligations comptables et fiscales</li>
                <li>Lutte contre le blanchiment d&apos;argent</li>
                <li>Réponse aux réquisitions judiciaires</li>
              </ul>
            </PolicySection>

            {/* Section 3 - Conservation */}
            <PolicySection id="conservation" number="03" title="Durée de conservation">
              <p>
                Vos données personnelles sont conservées pendant une durée limitée, 
                proportionnée à la finalité du traitement :
              </p>

              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-or/20">
                      <th className="text-left py-3 pr-4 font-sans font-medium text-ivoire">Type de données</th>
                      <th className="text-left py-3 font-sans font-medium text-ivoire">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-gris-clair">
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Données prospects (formulaire contact)</td>
                      <td className="py-3">3 ans après le dernier contact</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Données clients</td>
                      <td className="py-3">5 ans après la fin de la relation commerciale</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Documents contractuels</td>
                      <td className="py-3">10 ans (obligation légale)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4">Données de navigation</td>
                      <td className="py-3">13 mois maximum</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Cookies</td>
                      <td className="py-3">13 mois maximum</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6">
                À l&apos;expiration de ces délais, vos données sont supprimées ou anonymisées 
                de manière irréversible.
              </p>
            </PolicySection>

            {/* Section 4 - Sécurité */}
            <PolicySection id="securite" number="04" title="Sécurité des données">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour garantir la sécurité et la confidentialité de vos données :
              </p>

              <ul>
                <li>
                  <strong>Chiffrement SSL/TLS</strong> — Toutes les communications entre votre 
                  navigateur et notre site sont chiffrées
                </li>
                <li>
                  <strong>Accès restreint</strong> — Seuls les collaborateurs habilités ont accès 
                  à vos données, dans le cadre strict de leurs fonctions
                </li>
                <li>
                  <strong>Hébergement sécurisé</strong> — Nos serveurs sont hébergés en France/UE, 
                  dans des datacenters certifiés
                </li>
                <li>
                  <strong>Sauvegardes régulières</strong> — Vos données sont sauvegardées 
                  quotidiennement pour éviter toute perte
                </li>
                <li>
                  <strong>Mots de passe</strong> — Les mots de passe sont stockés de manière 
                  chiffrée (hachage)
                </li>
              </ul>

              <div className="bg-or/5 border border-or/20 p-6 mt-6">
                <p className="text-sm text-gris-clair m-0">
                  <strong className="text-or">Sous-traitants :</strong> Nous pouvons faire appel 
                  à des sous-traitants pour certains services (hébergement, envoi d&apos;emails). 
                  Ces prestataires sont soumis aux mêmes obligations de confidentialité et de sécurité.
                </p>
              </div>
            </PolicySection>

            {/* Section 5 - Vos droits */}
            <PolicySection id="droits" number="05" title="Vos droits">
              <p>
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <RightCard
                  icon={Eye}
                  title="Droit d'accès"
                  description="Obtenir la confirmation que vos données sont traitées et en recevoir une copie"
                />
                <RightCard
                  icon={FileText}
                  title="Droit de rectification"
                  description="Faire corriger vos données inexactes ou compléter vos données incomplètes"
                />
                <RightCard
                  icon={Trash2}
                  title="Droit à l'effacement"
                  description="Demander la suppression de vos données dans certaines conditions"
                />
                <RightCard
                  icon={Lock}
                  title="Droit à la limitation"
                  description="Demander la suspension temporaire du traitement de vos données"
                />
                <RightCard
                  icon={Download}
                  title="Droit à la portabilité"
                  description="Recevoir vos données dans un format structuré et réutilisable"
                />
                <RightCard
                  icon={AlertCircle}
                  title="Droit d'opposition"
                  description="Vous opposer au traitement de vos données pour des raisons légitimes"
                />
              </div>

              <h4 className="mt-8">Comment exercer vos droits ?</h4>
              <p>
                Vous pouvez exercer vos droits à tout moment en nous contactant :
              </p>
              <ul>
                <li>Par email : <a href={`mailto:${companyInfo.dpo}`} className="text-or hover:text-or-clair">{companyInfo.dpo}</a></li>
                <li>Par courrier : {companyInfo.name}, {companyInfo.address}</li>
              </ul>
              <p>
                Nous nous engageons à répondre à votre demande dans un délai d&apos;un mois. 
                Ce délai peut être prolongé de deux mois supplémentaires en cas de demande complexe.
              </p>

              <div className="bg-noir-surface border border-white/10 p-6 mt-6">
                <p className="text-sm text-gris-clair m-0">
                  <strong className="text-ivoire">Réclamation :</strong> Si vous estimez que vos droits 
                  ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL 
                  (Commission Nationale de l&apos;Informatique et des Libertés) — 
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-or hover:text-or-clair ml-1">
                    www.cnil.fr
                  </a>
                </p>
              </div>
            </PolicySection>

            {/* Section 6 - Cookies */}
            <PolicySection id="cookies" number="06" title="Cookies">
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation 
                et analyser l&apos;utilisation du site.
              </p>

              <h4>Qu&apos;est-ce qu&apos;un cookie ?</h4>
              <p>
                Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite 
                d&apos;un site web. Il permet de mémoriser vos préférences et d&apos;analyser votre navigation.
              </p>

              <h4>Types de cookies utilisés</h4>
              
              <div className="space-y-4 mt-4">
                <CookieType
                  type="Essentiels"
                  required
                  description="Nécessaires au fonctionnement du site (session, sécurité). Ne peuvent pas être désactivés."
                />
                <CookieType
                  type="Analytiques"
                  description="Permettent de mesurer l'audience et d'améliorer le site (ex: Google Analytics)."
                />
                <CookieType
                  type="Marketing"
                  description="Utilisés pour afficher des publicités pertinentes et mesurer leur efficacité."
                />
              </div>

              <h4 className="mt-8">Gestion des cookies</h4>
              <p>
                Lors de votre première visite, un bandeau vous permet d&apos;accepter ou de refuser 
                les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment :
              </p>
              <ul>
                <li>Via le lien « Gérer les cookies » en bas de chaque page</li>
                <li>Via les paramètres de votre navigateur</li>
              </ul>

              <div className="mt-6">
                <Button variant="outline" size="sm">
                  Gérer mes préférences cookies
                </Button>
              </div>
            </PolicySection>

            {/* Section 7 - Transferts */}
            <PolicySection id="transferts" number="07" title="Transferts de données">
              <p>
                Vos données personnelles sont hébergées au sein de l&apos;Union Européenne. 
                En cas de transfert vers un pays tiers, nous nous assurons que des garanties 
                appropriées sont mises en place :
              </p>
              <ul>
                <li>Décision d&apos;adéquation de la Commission européenne</li>
                <li>Clauses contractuelles types approuvées par la Commission européenne</li>
                <li>Règles d&apos;entreprise contraignantes (BCR)</li>
              </ul>
            </PolicySection>

            {/* Section 8 - Modifications */}
            <PolicySection id="modifications" number="08" title="Modifications de la politique">
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité 
                à tout moment. En cas de modification substantielle, nous vous en informerons 
                par email ou via une notification sur notre site.
              </p>
              <p>
                La date de dernière mise à jour est indiquée en haut de cette page. 
                Nous vous invitons à consulter régulièrement cette politique.
              </p>
            </PolicySection>

            {/* Contact */}
            <div className="mt-16 pt-12 border-t border-or/20">
              <h3 className="font-serif text-2xl text-ivoire mb-6">Une question ?</h3>
              <p className="font-sans text-sm font-light text-gris-clair mb-6">
                Pour toute question relative à cette politique de confidentialité ou à vos données 
                personnelles, n&apos;hésitez pas à nous contacter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="primary">
                    <Mail size={16} className="mr-2" />
                    Nous contacter
                  </Button>
                </Link>
                <a href={`mailto:${companyInfo.dpo}`}>
                  <Button variant="outline">
                    <Shield size={16} className="mr-2" />
                    Contacter le DPO
                  </Button>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

// Composant Section
function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-serif text-4xl text-or/30">{number}</span>
        <h2 className="font-serif text-2xl text-ivoire">{title}</h2>
      </div>
      <div className="font-sans text-sm font-light text-gris-clair leading-relaxed space-y-4 [&_h4]:font-medium [&_h4]:text-ivoire [&_h4]:text-base [&_h4]:mt-8 [&_h4]:mb-3 [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2 [&_li]:before:w-2 [&_li]:before:h-px [&_li]:before:bg-or [&_a]:text-or [&_a]:hover:text-or-clair [&_a]:transition-colors [&_strong]:text-ivoire [&_strong]:font-medium">
        {children}
      </div>
    </section>
  );
}

// Composant Droit
function RightCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-noir-surface border border-white/5 p-6 hover:border-or/20 transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex-shrink-0 border border-or/30 flex items-center justify-center">
          <Icon size={18} className="text-or" />
        </div>
        <div>
          <h5 className="font-sans text-sm font-medium text-ivoire mb-2">{title}</h5>
          <p className="font-sans text-xs font-light text-gris-noble leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Composant Cookie Type
function CookieType({
  type,
  description,
  required = false,
}: {
  type: string;
  description: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-noir-surface border border-white/5">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-sans text-sm font-medium text-ivoire">{type}</span>
          {required && (
            <span className="px-2 py-0.5 bg-or/10 text-or text-[10px] uppercase tracking-wider">
              Requis
            </span>
          )}
        </div>
        <p className="font-sans text-xs font-light text-gris-noble">{description}</p>
      </div>
    </div>
  );
}
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug, properties } from "@/lib/data";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyDetails } from "@/components/property/PropertyDetails";
import { PropertyFeatures } from "@/components/property/PropertyFeatures";
import { PropertyLocation } from "@/components/property/PropertyLocation";
import { PropertyContact } from "@/components/property/PropertyContact";
import { PropertySimilar } from "@/components/property/PropertySimilar";
import { PropertyBeforeAfter } from "@/components/property/PropertyBeforeAfter";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

// Génération des métadonnées dynamiques
export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Bien non trouvé — JS Property",
    };
  }

  return {
    title: `${property.title} — JS Property`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: `${property.title} — JS Property`,
      description: property.description.substring(0, 160),
      images: [property.images.main],
      type: "website",
    },
  };
}

// Génération des pages statiques
export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  // Récupérer les biens similaires (même ville, même type, exclure le bien actuel)
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.location.city === property.location.city || p.type === property.type)
    )
    .slice(0, 3);

  return (
    <div className="bg-noir min-h-screen">
      {/* Hero avec image principale et infos clés */}
      <PropertyHero property={property} />

      {/* Galerie d'images */}
      <PropertyGallery property={property} />

      {/* Section principale : Détails + Contact */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Colonne principale - 2/3 */}
            <div className="lg:col-span-2 space-y-16">
              <PropertyDetails property={property} />
              <PropertyFeatures property={property} />
              {property.isRealisation && property.images.beforeAfter && (
                <PropertyBeforeAfter property={property} />
              )}
              <PropertyLocation property={property} />
            </div>

            {/* Sidebar - 1/3 */}
            <div className="lg:col-span-1">
              <PropertyContact property={property} />
            </div>
          </div>
        </div>
      </section>

      {/* Biens similaires */}
      {similarProperties.length > 0 && (
        <PropertySimilar properties={similarProperties} />
      )}
    </div>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* Icône */}
        <div className="w-24 h-24 mx-auto mb-8 border border-or/30 flex items-center justify-center">
          <Home size={40} className="text-or" />
        </div>

        {/* Titre */}
        <h1 className="font-serif text-4xl lg:text-5xl text-ivoire mb-4">
          Bien non trouvé
        </h1>

        {/* Description */}
        <p className="font-sans text-base font-light text-gris-clair mb-10 leading-relaxed">
          Le bien que vous recherchez n&apos;existe pas ou n&apos;est plus
          disponible. Il a peut-être été vendu récemment.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/biens">
            <Button variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <Search size={18} />
                Voir nos biens disponibles
              </span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Retour à l&apos;accueil
              </span>
            </Button>
          </Link>
        </div>

        {/* Contact */}
        <p className="mt-12 font-sans text-sm text-gris-noble">
          Une question ?{" "}
          <Link
            href="/contact"
            className="text-or hover:text-or-clair transition-colors"
          >
            Contactez-nous
          </Link>
        </p>
      </div>
    </div>
  );
}
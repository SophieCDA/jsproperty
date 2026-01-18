"use client";

import { useState, useEffect, useRef } from "react";
import { Property } from "@/types";
import { formatPrice, cn, isValidEmail, isValidPhone } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface PropertyContactProps {
  property: Property;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export function PropertyContact({ property }: PropertyContactProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: `Bonjour,\n\nJe souhaite obtenir plus d'informations concernant le bien "${property.title}" (Réf. ${property.reference}).\n\nCordialement,`,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Prénom requis";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nom requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "Téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simuler l'envoi (à remplacer par un vrai appel API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        "lg:sticky lg:top-28 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Card principale */}
      <div className="bg-noir-elegant border border-white/10 overflow-hidden">
        {/* Header avec prix */}
        <div className="p-6 bg-noir-surface border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-xs font-medium uppercase tracking-wider text-gris-noble">
              Prix de vente
            </span>
            {property.availability === "disponible" && (
              <span className="px-2 py-1 bg-or/20 text-or font-sans text-[0.6rem] font-semibold uppercase tracking-wider">
                Disponible
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl lg:text-4xl text-gradient-gold">
              {formatPrice(property.price)}
            </span>
          </div>
          <span className="font-sans text-sm text-gris-noble">
            Soit{" "}
            {Math.round(property.price / property.surface).toLocaleString(
              "fr-FR"
            )}{" "}
            €/m²
          </span>
        </div>

        {/* Formulaire ou message de succès */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-2 border-or rounded-full">
                <CheckCircle size={32} className="text-or" />
              </div>
              <h3 className="font-serif text-xl text-ivoire mb-3">
                Message envoyé !
              </h3>
              <p className="font-sans text-sm text-gris-clair mb-6">
                Notre équipe vous recontactera dans les plus brefs délais.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-sans text-sm text-or hover:text-or-clair transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ivoire mb-6">
                Demander des informations
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom et prénom */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gris-noble mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 bg-noir-surface border text-ivoire font-sans text-sm focus:outline-none focus:border-or transition-colors",
                          errors.firstName
                            ? "border-red-500"
                            : "border-white/10"
                        )}
                        placeholder="Votre prénom"
                      />
                    </div>
                    {errors.firstName && (
                      <span className="font-sans text-xs text-red-500 mt-1">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gris-noble mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 bg-noir-surface border text-ivoire font-sans text-sm focus:outline-none focus:border-or transition-colors",
                        errors.lastName ? "border-red-500" : "border-white/10"
                      )}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <span className="font-sans text-xs text-red-500 mt-1">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-sans text-xs text-gris-noble mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-noir-surface border text-ivoire font-sans text-sm focus:outline-none focus:border-or transition-colors",
                      errors.email ? "border-red-500" : "border-white/10"
                    )}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <span className="font-sans text-xs text-red-500 mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block font-sans text-xs text-gris-noble mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-noir-surface border text-ivoire font-sans text-sm focus:outline-none focus:border-or transition-colors",
                      errors.phone ? "border-red-500" : "border-white/10"
                    )}
                    placeholder="+33 6 00 00 00 00"
                  />
                  {errors.phone && (
                    <span className="font-sans text-xs text-red-500 mt-1">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-sans text-xs text-gris-noble mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-noir-surface border border-white/10 text-ivoire font-sans text-sm focus:outline-none focus:border-or transition-colors resize-none"
                  />
                </div>

                {/* Bouton submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send size={18} />
                      Envoyer ma demande
                    </span>
                  )}
                </Button>
              </form>
            </>
          )}
        </div>

        {/* Contact direct */}
        <div className="p-6 bg-noir-surface border-t border-white/10">
          <p className="font-sans text-xs text-gris-noble text-center mb-4">
            Ou contactez-nous directement
          </p>
          <div className="flex gap-3">
            <a
              href="tel:+33634780000"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 text-ivoire hover:border-or hover:text-or transition-colors"
            >
              <Phone size={16} />
              <span className="font-sans text-xs font-medium">Appeler</span>
            </a>
            <a
              href="mailto:contact@jsproperty.fr"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 text-ivoire hover:border-or hover:text-or transition-colors"
            >
              <Mail size={16} />
              <span className="font-sans text-xs font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Info supplémentaire */}
      <div
        className={cn(
          "mt-6 p-4 border border-or/20 bg-or/5 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex items-start gap-3">
          <Calendar size={20} className="text-or flex-shrink-0" />
          <div>
            <p className="font-sans text-sm text-ivoire mb-1">
              Visite personnalisée
            </p>
            <p className="font-sans text-xs text-gris-clair">
              Nos conseillers sont disponibles 7j/7 pour organiser une visite
              sur mesure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { isValidEmail, isValidPhone } from "@/lib/utils";
import { User, Mail, Phone, MessageSquare, CheckCircle, Send } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

const subjectOptions = [
  { value: "achat", label: "Achat d'un bien" },
  { value: "vente", label: "Vente de mon bien" },
  { value: "estimation", label: "Estimation gratuite" },
  { value: "visite", label: "Demande de visite" },
  { value: "investissement", label: "Conseil en investissement" },
  { value: "renovation", label: "Projet de rénovation" },
  { value: "autre", label: "Autre demande" },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "Le numéro de téléphone n'est pas valide";
    }

    if (!formData.subject) {
      newErrors.subject = "Veuillez sélectionner un sujet";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Le message doit contenir au moins 20 caractères";
    }

    if (!formData.consent) {
      newErrors.consent = "Vous devez accepter la politique de confidentialité";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulation d'envoi (à remplacer par l'appel API réel)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form après succès
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
      });
      setIsSuccess(false);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-noir-elegant border border-or/20 p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 border border-or rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-or" />
        </div>
        <h3 className="font-serif text-2xl text-ivoire mb-4">
          Message envoyé avec succès
        </h3>
        <p className="font-sans text-sm font-light text-gris-clair max-w-md mx-auto">
          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais,
          généralement sous 24 heures.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom & Prénom */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          name="firstName"
          label="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          icon={<User size={18} />}
          autoComplete="given-name"
        />
        <Input
          name="lastName"
          label="Nom"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          icon={<User size={18} />}
          autoComplete="family-name"
        />
      </div>

      {/* Email & Téléphone */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<Mail size={18} />}
          autoComplete="email"
        />
        <Input
          name="phone"
          type="tel"
          label="Téléphone (optionnel)"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          icon={<Phone size={18} />}
          autoComplete="tel"
        />
      </div>

      {/* Sujet */}
      <Select
        name="subject"
        label="Sujet de votre demande"
        options={subjectOptions}
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        icon={<MessageSquare size={18} />}
      />

      {/* Message */}
      <Textarea
        name="message"
        label="Votre message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        rows={6}
      />

      {/* Consentement RGPD */}
      <Checkbox
        name="consent"
        checked={formData.consent}
        onChange={handleChange}
        error={errors.consent}
        label={
          <>
            J&apos;accepte que mes données soient traitées conformément à la{" "}
            <a
              href="/confidentialite"
              className="text-or hover:text-or-clair underline underline-offset-2"
            >
              politique de confidentialité
            </a>{" "}
            de JS Property.
          </>
        }
      />

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full md:w-auto"
        >
          <Send size={18} className="mr-2" />
          Envoyer le message
        </Button>
      </div>
    </form>
  );
}
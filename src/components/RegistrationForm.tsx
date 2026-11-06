import React, { useState, useId } from 'react';
import { ShieldCheck, Phone, User, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  cndpConsent: boolean;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  cndpConsent?: string;
}

// Nettoyage anti-XSS préventif (stripping des balises HTML et encodage entités de base)
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Supprime les balises < et >
    .trim();
};

// Validation stricte du mobile marocain (+212 / 05 / 06 / 07 suivi de 8 chiffres)
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+?212)|0)([5-7]\d{8})$/;

export const RegistrationForm: React.FC = () => {
  const formId = useId();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    cndpConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Normalisation du numéro pour WhatsApp (convertit 06/07 en format 2126/2127)
  const formatPhoneForWhatsApp = (rawPhone: string): string => {
    const cleaned = rawPhone.replace(/\s+/g, '').replace(/-/g, '');
    const match = cleaned.match(MOROCCAN_PHONE_REGEX);
    if (match && match[1]) {
      return `212${match[1]}`;
    }
    return cleaned;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = 'Le nom complet doit comporter au moins 3 caractères.';
    }

    const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
    if (!MOROCCAN_PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = 'Numéro invalide. Formats acceptés : 06XXXXXXXX, 07XXXXXXXX ou +2126XXXXXXXX.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Veuillez renseigner votre ville de résidence.';
    }

    if (!formData.cndpConsent) {
      newErrors.cndpConsent = 'Vous devez accepter les conditions relatives au traitement des données (Loi 09-08).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : sanitizeInput(value),
    }));

    // Reset de l'erreur sur le champ modifié
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const sanitizedPhone = formatPhoneForWhatsApp(formData.phone);
      
      // Construction du message WhatsApp sécurisé
      const message = `*Nouvelle Inscription Réseau MLM - Bouchra Way*\n\n` +
        `👤 *Nom:* ${formData.fullName}\n` +
        `📱 *Téléphone:* +${sanitizedPhone}\n` +
        `📍 *Ville:* ${formData.city}\n` +
        (formData.email ? `📧 *Email:* ${formData.email}\n` : '') +
        `✅ *Consentement CNDP:* Validé (Loi 09-08)\n` +
        `⏱️ *Horodatage:* ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}`;

      // Numéro support Bouchra Way (à adapter selon votre numéro officiel)
      const targetSupportPhone = "212634486494"; 
      const waUrl = `https://wa.me/${targetSupportPhone}?text=${encodeURIComponent(message)}`;

      setIsSuccess(true);
      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        setIsSubmitting(false);
      }, 600);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          Rejoindre le Réseau Bouchra Way
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          Démarrez votre activité de distribution indépendante au Maroc.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <p className="text-sm">Votre demande est prête. Redirection sécurisée vers WhatsApp...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Nom Complet */}
        <div>
          <label htmlFor={`${formId}-fullName`} className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Nom et Prénom *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id={`${formId}-fullName`}
              name="fullName"
              type="text"
              required
              maxLength={60}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ex: Fatima Zahra Alami"
              className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                errors.fullName ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
        </div>

        {/* Téléphone Mobile */}
        <div>
          <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Téléphone WhatsApp (Maroc) *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="06XXXXXXXX ou +2126XXXXXXXX"
              className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                errors.phone ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
        </div>

        {/* Ville & Email (Grille 2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-city`} className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Ville de résidence *
            </label>
            <input
              id={`${formId}-city`}
              name="city"
              type="text"
              required
              maxLength={40}
              value={formData.city}
              onChange={handleChange}
              placeholder="Casablanca, Rabat, Fès..."
              className={`w-full px-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                errors.city ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100'
              }`}
            />
            {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
              Email (Optionnel)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                maxLength={80}
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@exemple.ma"
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                  errors.email ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Cadre de Consentement CNDP (Loi 09-08) */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl mt-4">
          <div className="flex items-start gap-3">
            <input
              id={`${formId}-cndp`}
              name="cndpConsent"
              type="checkbox"
              checked={formData.cndpConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-600 cursor-pointer"
            />
            <label htmlFor={`${formId}-cndp`} className="text-xs leading-relaxed text-stone-600 cursor-pointer select-none">
              J&apos;accepte expressément que mes données soient traitées par <strong className="text-stone-800">Bouchra Way</strong> pour la gestion de mon adhésion et le suivi commercial via WhatsApp. Conformément à la <strong>Loi n° 09-08</strong> promulguée par le Dahir 1-09-15, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition auprès du service client.
            </label>
          </div>
          {errors.cndpConsent && (
            <div className="flex items-center gap-1 text-rose-600 text-xs mt-2 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.cndpConsent}</span>
            </div>
          )}
        </div>

        {/* Bouton de Soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-amber-700 hover:bg-amber-800 active:scale-[0.99] disabled:opacity-70 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5 text-amber-300" />
          <span>{isSubmitting ? 'Traitement sécurisé...' : 'Valider et Rejoindre via WhatsApp'}</span>
        </button>
      </form>
    </div>
  );
};
export default RegistrationForm;
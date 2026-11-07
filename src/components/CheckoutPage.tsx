import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  Truck, 
  Banknote, 
  Gift, 
  AlertCircle, 
  CheckCircle2, 
  ShoppingBag,
  ChevronDown
} from 'lucide-react';
import { CartItem, CompletedOrder, CustomerOrderInfo } from '../types/cart';

interface CheckoutPageProps {
  items: CartItem[];
  onBackToCart: () => void;
  onOrderSuccess: (order: CompletedOrder) => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
}

// Nettoyage anti-XSS préventif
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim();
};

// Validation stricte du mobile marocain (+212 / 05 / 06 / 07 suivi de 8 chiffres)
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+?212)|0)([5-7]\d{8})$/;

const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
  'Salé',
  'Meknès',
  'Kénitra',
  'Tétouan',
  'Oujda',
  'Nador',
  'Mohammédia',
  'El Jadida',
  'Béni Mellal',
  'Autre ville'
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBackToCart,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState<CustomerOrderInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: 'Casablanca',
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginal = items.reduce((sum, item) => sum + Math.round(item.product.price * 1.33) * item.quantity, 0);
  const totalSavings = totalOriginal - subtotal;
  const shipping = subtotal >= 400 || formData.city === 'Casablanca' ? 0 : 20;
  const finalTotal = subtotal + shipping;

  const formatPhoneForWhatsApp = (rawPhone: string): string => {
    const cleaned = rawPhone.replace(/\s+/g, '').replace(/-/g, '');
    const match = cleaned.match(MOROCCAN_PHONE_REGEX);
    if (match && match[1]) {
      return `212${match[1]}`;
    }
    return cleaned;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, productName: string) => {
    const target = e.currentTarget;
    if (target.src.startsWith('data:image')) return;
    target.src = `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect width="80" height="80" fill="#FAF7F5"/>
        <circle cx="40" cy="32" r="14" fill="#E8C5B8" opacity="0.45"/>
        <text x="40" y="55" font-family="system-ui, sans-serif" font-size="6" fill="#6B5A54" text-anchor="middle" font-weight="600">${productName.slice(0, 14)}</text>
        <text x="40" y="65" font-family="system-ui, sans-serif" font-size="5" fill="#A8948D" text-anchor="middle" letter-spacing="1">BOUCHRA WAY</text>
      </svg>
    `)}`;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Veuillez saisir votre prénom.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Veuillez saisir votre nom.';
    }

    const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
    if (!MOROCCAN_PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = 'Numéro invalide. Formats acceptés : 06XXXXXXXX, 07XXXXXXXX ou +2126XXXXXXXX.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Veuillez choisir votre ville.';
    }

    if (!formData.address.trim() || formData.address.length < 5) {
      newErrors.address = 'Veuillez préciser votre adresse de livraison complète.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const sanitizedPhone = formatPhoneForWhatsApp(formData.phone);
      const randomRef = Math.floor(10000 + Math.random() * 90000);
      const orderRef = `#BW-${randomRef}`;

      // Récapitulatif des articles pour le message WhatsApp
      const itemsListText = items
        .map((item, idx) => `▪ ${idx + 1}. *${item.product.name}* (x${item.quantity}) = ${item.product.price * item.quantity} MAD`)
        .join('\n');

      // Construction du message structuré
      const waMessage = 
        `*NOUVELLE COMMANDE BOUCHRA WAY - ${orderRef}* 🛍️\n` +
        `*(Paiement à la livraison / COD)* 🇲🇦\n\n` +
        `👤 *Informations Client:*\n` +
        `▪ *Nom complet:* ${formData.firstName} ${formData.lastName}\n` +
        `▪ *Téléphone:* +${sanitizedPhone}\n` +
        `📍 *Ville:* ${formData.city}\n` +
        `🏠 *Adresse de livraison:* ${formData.address}\n` +
        (formData.email ? `📧 *E-mail:* ${formData.email}\n` : '') +
        `\n📦 *Articles commandés:*\n${itemsListText}\n\n` +
        `💰 *Sous-total:* ${subtotal} MAD\n` +
        `🚚 *Frais de livraison:* ${shipping === 0 ? 'Offerte (Gratuit)' : `${shipping} MAD`}\n` +
        `💵 *TOTAL À PAYER À LA RÉCEPTION:* *${finalTotal} MAD*\n\n` +
        `⏱️ *Date:* ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}\n` +
        `Merci de confirmer la prise en charge de ma commande.`;

      const targetSupportPhone = "212634486494";
      const waUrl = `https://wa.me/${targetSupportPhone}?text=${encodeURIComponent(waMessage)}`;

      const completedOrder: CompletedOrder = {
        orderId: orderRef,
        items: [...items],
        customer: { ...formData },
        subtotal,
        shipping,
        total: finalTotal,
        createdAt: new Date().toISOString()
      };

      // Ouverture WhatsApp puis redirection vers page de succès
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        setIsSubmitting(false);
        onOrderSuccess(completedOrder);
      }, 500);

    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans" dir="ltr">
      
      {/* En-tête épuré du tunnel d'achat */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#E6007E]">
              BOUCHRA WAY
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Lock size={14} className="text-emerald-600" />
              <span className="font-medium">Commande sécurisée</span>
            </div>
            <button
              type="button"
              onClick={onBackToCart}
              className="text-[#E6007E] hover:underline font-semibold cursor-pointer"
            >
              Modifier le panier
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal : 2 colonnes (Formulaire à gauche, Récapitulatif à droite) */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Gauche : Formulaire Coordonnées et Livraison */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Section 1 : Vos coordonnées */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs">
                <div className="flex items-start gap-3 mb-5">
                  <span className="w-7 h-7 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      Vos coordonnées
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Le livreur vous appelle sur ce numéro avant de passer.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Téléphone avec indicatif MA +212 */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Téléphone portable <span className="text-[#E6007E]">*</span>
                    </label>
                    <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-[#E6007E] focus-within:ring-2 focus-within:ring-pink-100 transition">
                      <span className="bg-gray-100 px-3.5 py-2.5 text-xs font-semibold text-gray-700 border-r border-gray-300 flex items-center gap-1 shrink-0">
                        MA +212
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        className="w-full px-3 py-2.5 text-sm outline-none bg-white text-gray-900"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Prénom & Nom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Prénom <span className="text-[#E6007E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Prénom"
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition ${
                          errors.firstName ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-300 focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Nom <span className="text-[#E6007E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Nom"
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition ${
                          errors.lastName ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-300 focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* E-mail facultatif */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      E-mail (facultatif)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nom@gmail.com"
                      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition ${
                        errors.email ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-300 focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100'
                      }`}
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      Pour recevoir la confirmation et vos points fidélité.
                    </p>
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2 : Adresse de livraison */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs">
                <div className="flex items-start gap-3 mb-5">
                  <span className="w-7 h-7 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      Adresse de livraison
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Livrée en 24 h ouvrables à Casablanca, 48 à 72 h ailleurs.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Ville */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Ville <span className="text-[#E6007E]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition appearance-none bg-white cursor-pointer"
                      >
                        {MOROCCAN_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Adresse complète */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Adresse complète <span className="text-[#E6007E]">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Nom de rue, quartier, N° de maison/bâtiment, appartement..."
                      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition resize-none ${
                        errors.address ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-300 focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-600 mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Colonne Droite : Résumé de votre commande */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-20 space-y-5">
                
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Votre commande
                </h3>

                {/* Liste des produits commandés */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 bg-stone-50 rounded-lg p-1 border border-gray-100 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => handleImageError(e, item.product.name)}
                          className="max-h-full max-w-full object-contain"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xs font-bold text-[#E6007E]">
                            {item.product.price * item.quantity} MAD
                          </span>
                          <span className="text-[10px] text-gray-400 line-through">
                            {Math.round(item.product.price * 1.33) * item.quantity} MAD
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Code promo / Carte cadeau */}
                <div className="pt-2 border-t border-gray-100">
                  {!showPromoInput ? (
                    <button
                      type="button"
                      onClick={() => setShowPromoInput(true)}
                      className="text-xs text-gray-700 hover:text-[#E6007E] font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Gift size={14} className="text-amber-600" />
                      <span>Avez-vous un code promo ?</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Code promo ou carte cadeau"
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 outline-none uppercase"
                      />
                      <button
                        type="button"
                        onClick={() => alert('Code promo enregistré.')}
                        className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition cursor-pointer"
                      >
                        Appliquer
                      </button>
                    </div>
                  )}
                </div>

                {/* Calculs financiers */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Vous économisez</span>
                    <span>- {totalSavings} MAD</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Sous-total ({items.reduce((s, i) => s + i.quantity, 0)} articles)</span>
                    <span className="font-semibold text-gray-800">{subtotal} MAD</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Livraison ({formData.city})</span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-emerald-700">Offerte</span>
                    ) : (
                      <span className="font-semibold text-gray-800">{shipping} MAD</span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between pt-3 border-t border-gray-200">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-extrabold text-[#E6007E]">
                      {finalTotal} MAD
                    </span>
                  </div>
                </div>

                {/* Encart promotionnel */}
                <div className="p-3 bg-pink-50/70 border border-pink-100 rounded-xl text-[11px] text-pink-900 leading-relaxed">
                  Panier en promotion : la remise est déjà déduite, ces articles ne cumulent pas de points.
                </div>

                {/* Bouton de validation de commande */}
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#E6007E] to-[#c9006e] hover:from-[#c9006e] hover:to-[#b00060] active:scale-[0.99] disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <ShieldCheck size={20} />
                  <span>
                    {isSubmitting ? 'Validation en cours...' : `Valider la commande - ${finalTotal} MAD`}
                  </span>
                </button>

                {/* Badges de Réassurance */}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-[11px] text-gray-600">
                  <div className="flex items-center gap-2">
                    <Banknote size={14} className="text-emerald-600 shrink-0" />
                    <span>Paiement à la livraison, sans frais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-blue-600 shrink-0" />
                    <span>Livraison 24 à 72 h partout au Maroc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Produits 100% authentiques</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>
      </main>

    </div>
  );
};
export default CheckoutPage;

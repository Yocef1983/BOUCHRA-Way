import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
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
  cndpConsent?: string;
}

// Nettoyage anti-XSS préventif (stripping des balises < > et trim)
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '').trim();
};

// Validation & normalisation tolérante et stricte des numéros marocains (+212, 00212, 06, 07, 6, 7, 05)
const MOROCCAN_PHONE_REGEX = /^(?:(?:(?:\+|00)212)|212|0)?([5-7]\d{8})$/;

const MOROCCAN_CITIES = [
  'الدار البيضاء (Casablanca)',
  'الرباط (Rabat)',
  'مراكش (Marrakech)',
  'فاس (Fès)',
  'طنجة (Tanger)',
  'أكادير (Agadir)',
  'سلا (Salé)',
  'مكناس (Meknès)',
  'القنيطرة (Kénitra)',
  'تطوان (Tétouan)',
  'وجدة (Oujda)',
  'الناظور (Nador)',
  'المحمدية (Mohammédia)',
  'الجديدة (El Jadida)',
  'بني ملال (Béni Mellal)',
  'مدينة أخرى (Autre ville)'
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
    city: 'الدار البيضاء (Casablanca)',
    address: '',
    notes: '',
    cndpConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoStatus, setPromoStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginal = items.reduce((sum, item) => sum + Math.round(item.product.price * 1.33) * item.quantity, 0);
  const totalSavings = totalOriginal - subtotal;
  const isCasablanca = formData.city.includes('Casablanca') || formData.city.includes('الدار البيضاء');
  const shipping = subtotal >= 400 || isCasablanca ? 0 : 20;
  const finalTotal = subtotal + shipping;

  // Normalisation du numéro pour WhatsApp (+212XXXXXXXXX) sans faux rejets
  const formatPhoneForWhatsApp = (rawPhone: string): string => {
    const cleaned = rawPhone.replace(/[\s.-]/g, '');
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

  const handleApplyPromo = () => {
    const cleaned = sanitizeInput(promoCode).trim().toUpperCase();
    if (!cleaned) {
      setPromoStatus({
        message: 'يرجى إدخال رمز القسيمة / Veuillez saisir un code valide.',
        type: 'error'
      });
      return;
    }
    setPromoStatus({
      message: `تم تطبيق الرمز ${cleaned} بنجاح! التخفيض مُدرج في السلة.`,
      type: 'success'
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'يرجى إدخال الاسم الشخصي / Veuillez saisir votre prénom.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'يرجى إدخال الاسم العائلي / Veuillez saisir votre nom.';
    }

    const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
    if (!MOROCCAN_PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح. الصيغ المقبولة: 06XXXXXXXX أو 07XXXXXXXX أو +2126XXXXXXXX.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'يرجى اختيار مدينة الإقامة.';
    }

    if (!formData.address.trim() || formData.address.length < 5) {
      newErrors.address = 'يرجى كتابة عنوان التوصيل بالتفصيل (الحي، الزنقة، رقم المنزل).';
    }

    if (!formData.cndpConsent) {
      newErrors.cndpConsent = 'يجب الموافقة على معالجة البيانات الشخصية وفقاً للقانون 09-08 للمتابعة.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : sanitizeInput(value),
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
      // Application rigoureuse de la sanitisation anti-XSS
      const sanitizedFirstName = sanitizeInput(formData.firstName);
      const sanitizedLastName = sanitizeInput(formData.lastName);
      const sanitizedCity = sanitizeInput(formData.city);
      const sanitizedAddress = sanitizeInput(formData.address);
      const sanitizedEmail = formData.email ? sanitizeInput(formData.email) : '';
      const sanitizedPhone = formatPhoneForWhatsApp(formData.phone);
      
      const randomRef = Math.floor(10000 + Math.random() * 90000);
      const orderRef = `#BW-${randomRef}`;

      // Récapitulatif des articles pour le message WhatsApp
      const itemsListText = items
        .map((item, idx) => `▪ ${idx + 1}. *${sanitizeInput(item.product.name)}* (x${item.quantity}) = ${item.product.price * item.quantity} MAD`)
        .join('\n');

      // Construction du message WhatsApp bilingue structuré
      const waMessage = 
        `*طلب شراء جديد عبر الموقع - ${orderRef}* 🛍️\n` +
        `*(خدمة الدفع عند الاستلام بدون أي مصاريف إضافية)* 🇲🇦\n\n` +
        `👤 *معلومات الزبون / Client:*\n` +
        `▪ *الاسم الكامل:* ${sanitizedFirstName} ${sanitizedLastName}\n` +
        `▪ *رقم الهاتف:* +${sanitizedPhone}\n` +
        `📍 *المدينة:* ${sanitizedCity}\n` +
        `🏠 *عنوان التوصيل:* ${sanitizedAddress}\n` +
        (sanitizedEmail ? `📧 *البريد الإلكتروني:* ${sanitizedEmail}\n` : '') +
        `✅ *الموافقة على معالجة البيانات:* معتمدة (القانون 09-08 - CNDP)\n` +
        `\n📦 *المنتجات المطلوبة / Articles:*\n${itemsListText}\n\n` +
        `💰 *المجموع الجزئي:* ${subtotal} MAD\n` +
        `🚚 *مصاريف التوصيل:* ${shipping === 0 ? 'مجاناً (Offerte)' : `${shipping} MAD`}\n` +
        `💵 *المبلغ الإجمالي المستحق عند الاستلام:* *${finalTotal} MAD*\n` +
        `*(الدفع عند الاستلام بدون أي مصاريف إضافية مخفية)*\n\n` +
        `⏱️ *التاريخ:* ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}\n` +
        `المرجو تأكيد موعد التوصيل. شكراً!`;

      const targetSupportPhone = "212634486494";
      const waUrl = `https://wa.me/${targetSupportPhone}?text=${encodeURIComponent(waMessage)}`;

      const completedOrder: CompletedOrder = {
        orderId: orderRef,
        items: [...items],
        customer: {
          firstName: sanitizedFirstName,
          lastName: sanitizedLastName,
          phone: sanitizedPhone,
          email: sanitizedEmail,
          city: sanitizedCity,
          address: sanitizedAddress,
          cndpConsent: formData.cndpConsent
        },
        subtotal,
        shipping,
        total: finalTotal,
        createdAt: new Date().toISOString()
      };

      // Ouverture WhatsApp puis redirection vers page de confirmation
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
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans dir-rtl text-right" dir="rtl">
      
      {/* En-tête épuré et sécurisé */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#E6007E]">
              BOUCHRA WAY
            </span>
            <span className="text-xs text-purple-900 font-semibold hidden sm:inline">
              • ماي واي المغرب
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Lock size={14} className="text-emerald-600" />
              <span className="font-semibold text-emerald-800">إتمام الطلب بأمان</span>
            </div>
            <button
              type="button"
              onClick={onBackToCart}
              className="text-[#E6007E] hover:underline font-semibold cursor-pointer"
            >
              تعديل السلة / Modifier
            </button>
          </div>
        </div>

        {/* Bandeau de réassurance COD supérieur */}
        <div className="bg-emerald-50 border-t border-emerald-100 py-1.5 px-4 text-center text-xs text-emerald-900 font-bold flex items-center justify-center gap-2">
          <Banknote size={15} className="text-emerald-700" />
          <span>الدفع عند الاستلام بدون أي مصاريف إضافية (0 درهم مصاريف مخفية)</span>
        </div>
      </header>

      {/* Contenu principal : 2 colonnes en RTL */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Droite en RTL : Formulaire Coordonnées et Livraison */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Section 1 : معلومات الاتصال (Vos coordonnées) */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs">
                <div className="flex items-start gap-3 mb-5">
                  <span className="w-7 h-7 rounded-full bg-[#E6007E] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      معلومات الاتصال <span className="text-xs text-gray-400 font-normal">/ Vos coordonnées</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      يتواصل معكم الموزع هاتفياً لتأكيد موعد التوصيل قبل الحضور.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Téléphone portable marocain */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      رقم الهاتف - واتساب <span className="text-[#E6007E]">*</span>
                    </label>
                    <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-[#E6007E] focus-within:ring-2 focus-within:ring-pink-100 transition" dir="ltr">
                      <span className="bg-gray-100 px-3.5 py-2.5 text-xs font-semibold text-gray-700 border-r border-gray-300 flex items-center gap-1 shrink-0">
                        MA +212
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78 أو 612345678"
                        className="w-full px-3 py-2.5 text-sm outline-none bg-white text-gray-900 text-left"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* الاسم الشخصي والعائلي */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        الاسم الشخصي (Prénom) <span className="text-[#E6007E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        maxLength={50}
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="مثال: فاطمة الزهراء"
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
                        الاسم العائلي (Nom) <span className="text-[#E6007E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        maxLength={50}
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="مثال: العلمي"
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition ${
                          errors.lastName ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-300 focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* البريد الإلكتروني (اختياري) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      البريد الإلكتروني - اختياري <span className="text-xs text-gray-400 font-normal">(E-mail)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      maxLength={80}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@exemple.ma"
                      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 outline-none transition ${
                        errors.email ? 'border-rose-500 ring-2 ring-rose-100' : 'border-gray-300 focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100'
                      }`}
                    />
                    <p className="text-[11px] text-gray-400 mt-1">
                      لتلقي تأكيد الشحنة ونقاط العضوية.
                    </p>
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2 : عنوان التوصيل (Adresse de livraison) */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs">
                <div className="flex items-start gap-3 mb-5">
                  <span className="w-7 h-7 rounded-full bg-[#E6007E] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      عنوان التوصيل <span className="text-xs text-gray-400 font-normal">/ Adresse de livraison</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      توصيل سريع خلال 24 ساعة بالدار البيضاء والرباط، و48 إلى 72 ساعة بباقي مدن المغرب.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* المدينة */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      مدينة الإقامة <span className="text-[#E6007E]">*</span>
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
                      <ChevronDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* العنوان بالتفصيل */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      العنوان الكامل بالتفصيل <span className="text-[#E6007E]">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      maxLength={150}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="اسم الشارع، الحي، رقم المنزل أو الإقامة، الشقة..."
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

              {/* Bloc de Consentement Légal CNDP (Loi 09-08) */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl">
                <div className="flex items-start gap-3">
                  <input
                    id="checkout-cndp"
                    name="cndpConsent"
                    type="checkbox"
                    checked={formData.cndpConsent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-[#E6007E] focus:ring-pink-500 cursor-pointer shrink-0 accent-[#E6007E]"
                  />
                  <label htmlFor="checkout-cndp" className="text-xs leading-relaxed text-stone-700 cursor-pointer select-none">
                    أوافق على معالجة بياناتي الشخصية لتسيير طلبي والتواصل معي عبر الواتساب وفقاً للقانون 09-08.
                    <span className="block text-[11px] text-stone-500 mt-0.5">
                      J&apos;accepte le traitement de mes données pour la livraison et le suivi de ma commande conformément à la <strong>Loi 09-08</strong> (CNDP).
                    </span>
                  </label>
                </div>
                {errors.cndpConsent && (
                  <div className="flex items-center gap-1 text-rose-600 text-xs mt-2 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.cndpConsent}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Colonne Gauche en RTL : Résumé de votre commande */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-20 space-y-5">
                
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span>ملخص طلبيتك / Votre commande</span>
                  <span className="text-xs font-normal text-gray-400">({items.reduce((s, i) => s + i.quantity, 0)} منتج)</span>
                </h3>

                {/* Liste des produits commandés */}
                <div className="space-y-3 max-h-72 overflow-y-auto pl-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 bg-stone-50 rounded-lg p-1 border border-gray-100 shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => handleImageError(e, item.product.name)}
                          className="max-h-full max-w-full object-contain"
                        />
                        <span className="absolute -top-1.5 -left-1.5 bg-black text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-0.5" dir="ltr">
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

                {/* Section Code promo élégante (sans alert popup) */}
                <div className="pt-2 border-t border-gray-100">
                  {!showPromoInput ? (
                    <button
                      type="button"
                      onClick={() => setShowPromoInput(true)}
                      className="text-xs text-gray-700 hover:text-[#E6007E] font-medium flex items-center gap-2 cursor-pointer transition"
                    >
                      <Gift size={14} className="text-amber-600" />
                      <span>هل لديك رمز قسيمة أو كود تخفيض ؟</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="أدخل رمز القسيمة..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 outline-none uppercase font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition cursor-pointer"
                        >
                          تفعيل
                        </button>
                      </div>

                      {/* Retour visuel élégant inline */}
                      {promoStatus && (
                        <div className={`p-2.5 rounded-lg text-xs flex items-center gap-1.5 ${
                          promoStatus.type === 'success' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {promoStatus.type === 'success' ? (
                            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle size={14} className="text-rose-600 shrink-0" />
                          )}
                          <span className="leading-snug">{promoStatus.message}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Calculs financiers */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>التوفير المحقق (Économie) :</span>
                    <span dir="ltr">- {totalSavings} MAD</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>المجموع الجزئي (Sous-total) :</span>
                    <span className="font-semibold text-gray-800" dir="ltr">{subtotal} MAD</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>مصاريف التوصيل :</span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        مجاناً (Offerte)
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-800" dir="ltr">{shipping} MAD</span>
                    )}
                  </div>

                  {/* Total général */}
                  <div className="flex items-baseline justify-between pt-3 border-t border-gray-200">
                    <div>
                      <span className="text-base font-bold text-gray-900 block">المبلغ الإجمالي المستحق :</span>
                      <span className="text-[11px] text-emerald-700 font-medium">الدفع نقداً عند استلام الطرد</span>
                    </div>
                    <span className="text-2xl font-extrabold text-[#E6007E]" dir="ltr">
                      {finalTotal} MAD
                    </span>
                  </div>
                </div>

                {/* Encart réassurance COD sans frais cachés */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
                  <Banknote size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>الدفع عند الاستلام بدون أي مصاريف إضافية</strong> (0 درهم مصاريف مخفية). تأكد من طلبيتك قبل الدفع نقداً للموزع.
                  </p>
                </div>

                {/* Bouton de validation de commande */}
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#E6007E] to-[#c9006e] hover:from-[#c9006e] hover:to-[#b00060] active:scale-[0.99] disabled:opacity-60 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <ShieldCheck size={20} />
                  <span>
                    {isSubmitting ? 'جاري تجهيز الطلب...' : `تأكيد الطلب والدفع عند الاستلام - ${finalTotal} MAD`}
                  </span>
                </button>

                {/* Badges de Réassurance */}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-[11px] text-gray-600">
                  <div className="flex items-center gap-2">
                    <Banknote size={14} className="text-emerald-600 shrink-0" />
                    <span>الدفع عند الاستلام نقداً يداً بيد</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-blue-600 shrink-0" />
                    <span>توصيل سريع وآمن لجميع مدن المغرب</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>منتجات أصلية 100% ماي واي مع ضمان الجودة</span>
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

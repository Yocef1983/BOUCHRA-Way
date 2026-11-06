import React, { useState, useId } from 'react';
import { ShieldCheck, Phone, User, Mail, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormData {
  hasMembership: 'نعم' | 'لا';
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

// Nettoyage anti-XSS préventif (suppression des chevrons HTML et trim)
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .trim();
};

// Validation stricte du mobile marocain (+212 / 05 / 06 / 07 suivi de 8 chiffres)
const MOROCCAN_PHONE_REGEX = /^(?:(?:\+?212)|0)([5-7]\d{8})$/;

export const RegistrationForm: React.FC = () => {
  const formId = useId();

  const [formData, setFormData] = useState<FormData>({
    hasMembership: 'لا',
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
      newErrors.fullName = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).';
    }

    const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
    if (!MOROCCAN_PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone = 'رقم هاتف غير صحيح. الصيغ المقبولة: 06XXXXXXXX أو 07XXXXXXXX أو +2126XXXXXXXX.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'يرجى تحديد مدينة الإقامة.';
    }

    if (!formData.cndpConsent) {
      newErrors.cndpConsent = 'يجب الموافقة على معالجة البيانات الشخصية وفقاً للقانون 09-08 للمتابعة.';
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

    // Réinitialiser l'erreur correspondante au champ
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMembershipChange = (value: 'نعم' | 'لا') => {
    setFormData((prev) => ({
      ...prev,
      hasMembership: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const sanitizedPhone = formatPhoneForWhatsApp(formData.phone);
      
      // Construction du message WhatsApp sécurisé et encodé en UTF-8
      const message = `*طلب انضمام جديد - شبكة بوشرى واي*\n\n` +
        `❓ *عضوية سابقة في ماي واي:* ${formData.hasMembership}\n` +
        `👤 *الاسم الكامل:* ${formData.fullName}\n` +
        `📱 *رقم الهاتف:* +${sanitizedPhone}\n` +
        `📍 *مدينة الإقامة:* ${formData.city}\n` +
        (formData.email ? `📧 *البريد الإلكتروني:* ${formData.email}\n` : '') +
        `✅ *الموافقة على معالجة البيانات:* معتمدة (القانون 09-08)\n` +
        `⏱️ *التاريخ:* ${new Date().toLocaleString('ar-MA', { timeZone: 'Africa/Casablanca' })}`;

      // Numéro support Bouchra Way
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
    <div 
      id="opportunity" 
      dir="rtl" 
      className="scroll-mt-24 max-w-xl mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 text-right font-sans"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          الانضمام إلى شبكة بوشرى واي
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          ابدأي نشاطك في التوزيع المستقل بالمغرب
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <p className="text-sm">تم تجهيز طلبك بنجاح. جاري تحويلك بأمان إلى الواتساب...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* السؤال الأول: هل لديك عضوية في ماي واي؟ */}
        <div className="bg-stone-50/80 p-3.5 rounded-xl border border-stone-200">
          <label className="block text-xs font-semibold text-stone-700 mb-2.5">
            (*) هل لديك عضوية في ماي واي؟
          </label>
          <div className="flex items-center gap-8">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="hasMembership"
                value="نعم"
                checked={formData.hasMembership === 'نعم'}
                onChange={() => handleMembershipChange('نعم')}
                className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-stone-300 cursor-pointer accent-pink-600"
              />
              <span className="text-sm font-medium text-stone-800">نعم</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="hasMembership"
                value="لا"
                checked={formData.hasMembership === 'لا'}
                onChange={() => handleMembershipChange('لا')}
                className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-stone-300 cursor-pointer accent-pink-600"
              />
              <span className="text-sm font-medium text-stone-800">لا</span>
            </label>
          </div>
        </div>

        {/* الاسم الكامل */}
        <div>
          <label htmlFor={`${formId}-fullName`} className="block text-xs font-semibold text-stone-700 mb-1">
            الاسم الكامل <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id={`${formId}-fullName`}
              name="fullName"
              type="text"
              required
              maxLength={60}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="مثال: فاطمة الزهراء العلمي"
              className={`w-full pr-10 pl-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                errors.fullName ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-pink-600 focus:ring-2 focus:ring-pink-100'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
        </div>

        {/* رقم الهاتف - واتساب */}
        <div>
          <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold text-stone-700 mb-1">
            رقم الهاتف - واتساب <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="06XXXXXXXX أو +2126XXXXXXXX"
              className={`w-full pr-10 pl-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none text-right ${
                errors.phone ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-pink-600 focus:ring-2 focus:ring-pink-100'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
        </div>

        {/* مدينة الإقامة والبريد الإلكتروني */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-city`} className="block text-xs font-semibold text-stone-700 mb-1">
              مدينة الإقامة <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id={`${formId}-city`}
                name="city"
                type="text"
                required
                maxLength={40}
                value={formData.city}
                onChange={handleChange}
                placeholder="...الدار البيضاء، الرباط، فاس"
                className={`w-full pr-10 pl-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                  errors.city ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-pink-600 focus:ring-2 focus:ring-pink-100'
                }`}
              />
            </div>
            {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor={`${formId}-email`} className="block text-xs font-semibold text-stone-700 mb-1">
              البريد الإلكتروني - اختياري
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                maxLength={80}
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@exemple.ma"
                className={`w-full pr-10 pl-3 py-2.5 rounded-lg border text-sm text-stone-900 bg-stone-50/50 focus:bg-white transition-all outline-none ${
                  errors.email ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-stone-300 focus:border-pink-600 focus:ring-2 focus:ring-pink-100'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* كونسونتيمون CNDP مقتضب (القانون 09-08) */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl mt-4">
          <div className="flex items-start gap-3">
            <input
              id={`${formId}-cndp`}
              name="cndpConsent"
              type="checkbox"
              checked={formData.cndpConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-pink-600 focus:ring-pink-500 cursor-pointer shrink-0 accent-pink-600"
            />
            <label htmlFor={`${formId}-cndp`} className="text-xs leading-relaxed text-stone-600 cursor-pointer select-none">
              أوافق على معالجة بياناتي الشخصية لتسيير طلبي والتواصل معي عبر الواتساب وفقاً للقانون 09-08.
            </label>
          </div>
          {errors.cndpConsent && (
            <div className="flex items-center gap-1 text-rose-600 text-xs mt-2 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.cndpConsent}</span>
            </div>
          )}
        </div>

        {/* زر التأكيد */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 active:scale-[0.99] disabled:opacity-70 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5 text-pink-100" />
          <span>{isSubmitting ? 'جاري المعالجة...' : 'تأكيد والانضمام عبر الواتساب'}</span>
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

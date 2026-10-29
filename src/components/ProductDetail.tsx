import React, { useState } from 'react';
import { Product } from '../data/products';
import { ArrowRight, ShieldCheck, Truck, Sparkles, ChevronLeft, Banknote, CheckCircle2 } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState<number>(1);

  // Gestion anti-images brisées intelligente avec fallback SVG
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.startsWith('data:image')) return;

    const currentSrc = target.src;
    const attempts = target.dataset.attempt ? parseInt(target.dataset.attempt, 10) : 0;
    target.dataset.attempt = (attempts + 1).toString();

    // Tentative 1: 'produits-' au lieu de 'produit-'
    if (attempts === 0 && currentSrc.includes('produit-')) {
      target.src = currentSrc.replace('produit-', 'produits-');
      return;
    }
    // Tentative 2: remplacer les tirets bas par des tirets
    if (attempts <= 1 && currentSrc.includes('_')) {
      target.src = currentSrc.replace(/_/g, '-');
      return;
    }
    // Tentative 3: cas spécifique pearly crème fondation
    if (attempts <= 2 && currentSrc.includes('-pearly-creme-fondation')) {
      target.src = currentSrc.replace('-pearly-creme-fondation', '_pearly-creme-fondation');
      return;
    }
    // Tentative 4: extension .png au lieu de .jpg
    if (attempts <= 3 && currentSrc.endsWith('.jpg')) {
      target.src = currentSrc.replace(/\.jpg$/i, '.png');
      return;
    }

    // Fallback final: SVG élégant Bouchra Way aux teintes poudrées
    target.src = `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none">
        <rect width="500" height="500" fill="#FAF7F5"/>
        <circle cx="250" cy="210" r="75" fill="#E8C5B8" opacity="0.45"/>
        <path d="M230 190 C230 178, 270 178, 270 190 C270 210, 230 215, 230 235 H270" stroke="#9A6B5B" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="250" cy="255" r="4.5" fill="#9A6B5B"/>
        <text x="250" y="325" font-family="system-ui, sans-serif" font-size="16" fill="#5E4E49" text-anchor="middle" font-weight="500">${product.name.slice(0, 30)}</text>
        <text x="250" y="355" font-family="system-ui, sans-serif" font-size="12" fill="#A8948D" text-anchor="middle" letter-spacing="2">BOUCHRA WAY</text>
      </svg>
    `)}`;
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = '212634486494';
    const total = product.price * quantity;
    const message = encodeURIComponent(
      `*طلب جديد عبر الموقع - Bouchra Way* 🛍️\n` +
      `*(خدمة الدفع عند الاستلام)* 🇲🇦\n\n` +
      `📋 *تفاصيل الطلبية:*\n` +
      `▪ *اسم المنتج:* ${product.name}\n` +
      `▪ *المرجع / القسم:* ${product.category}\n` +
      `▪ *الكمية المطلوبة:* ${quantity}\n` +
      `▪ *السعر الفردي:* ${product.price} درهم\n` +
      `▪ *المبلغ الإجمالي المستحق:* ${total} درهم (خالص عند الاستلام)\n\n` +
      `📍 *معلومات التوصيل (يرجى إتمام البيانات):*\n` +
      `▪ *الاسم الكامل:* \n` +
      `▪ *المدينة:* \n` +
      `▪ *عنوان التوصيل بالتفصيل (الحي، الزنقة، رقم المنزل):* \n` +
      `▪ *رقم هاتف للتأكيد:* \n\n` +
      `المرجو تأكيد توفر المنتج وتحديد موعد الإرسال والتوصيل. شكراً!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="py-8 md:py-12 bg-[#FDFCFB] text-gray-800 dir-rtl min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane & Bouton retour */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-light">
            <button 
              onClick={onBack} 
              className="hover:text-rose-700 transition-colors flex items-center gap-1 font-normal cursor-pointer"
            >
              الرئيسية
            </button>
            <ChevronLeft size={14} className="text-gray-400" />
            <button 
              onClick={onBack} 
              className="hover:text-rose-700 transition-colors capitalize font-normal cursor-pointer"
            >
              {product.category}
            </button>
            <ChevronLeft size={14} className="text-gray-400" />
            <span className="text-gray-800 font-normal truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm text-gray-600 hover:text-rose-700 transition-colors py-1.5 px-4 rounded-full border border-gray-200 hover:border-rose-200 bg-white cursor-pointer shadow-xs"
          >
            <ArrowRight size={14} />
            <span>العودة للمنتجات</span>
          </button>
        </nav>

        {/* Corps principal : Grille Fiche Produit (Style épuré beautyforyou.ma) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* Section Image Principale (Grande photo avec gestion anti-images brisées) */}
          <div className="flex flex-col gap-4">
            <div className="w-full bg-white rounded-3xl border border-[#F2ECE8] p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-sm relative overflow-hidden group">
              {/* Badge d'authenticité */}
              <div className="absolute top-4 right-4 bg-[#F9F3F0] text-[#7A645D] text-[11px] font-normal px-3 py-1 rounded-full flex items-center gap-1 border border-[#E8DDD8]">
                <Sparkles size={12} className="text-amber-500" />
                <span>أصلي 100%</span>
              </div>

              {/* Tag COD rapide */}
              <div className="absolute top-4 left-4 bg-pink-50 text-pink-800 text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-pink-200">
                <Banknote size={12} className="text-[#BE185D]" />
                <span>الدفع عند الاستلام</span>
              </div>

              <img
                src={product.image}
                alt={product.altText || product.name}
                loading="eager"
                onError={handleImageError}
                className="max-h-[340px] sm:max-h-[400px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Vignette miniature interactive */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white rounded-xl border-2 border-[#BE185D] p-2 flex items-center justify-center cursor-pointer shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={handleImageError}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Section Informations & Achat */}
          <div className="flex flex-col text-right">
            {/* Catégorie / Marque */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#9C857E] font-medium">
                BOUCHRA WAY • MY WAY
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Prix en DH (en GRAS et dans la couleur rose/bordeaux de la marque) */}
            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl sm:text-4xl font-bold text-[#BE185D] tracking-tight">
                {product.price}.00
              </span>
              <span className="text-base sm:text-lg font-bold text-[#BE185D]">
                DH
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-3">
                الوصف والمميزات
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base bg-white/60 p-4 rounded-2xl border border-gray-100">
                {product.description}
              </p>
            </div>

            {/* Sélecteur de quantité (- 1 +) */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">
                الكمية المطلوبة
              </label>
              <div className="inline-flex items-center border border-gray-200 rounded-full bg-white shadow-xs p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Réduire la quantité"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#F9F3F0] hover:text-gray-900 transition-colors font-normal text-lg cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center text-gray-800 font-normal text-base select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Augmenter la quantité"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#F9F3F0] hover:text-gray-900 transition-colors font-normal text-lg cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total estimé (en GRAS dans la couleur rose/bordeaux de la marque) */}
            <div className="mb-6 flex items-center justify-between p-3.5 bg-pink-50/50 rounded-xl border border-pink-100 text-xs text-pink-950">
              <span className="font-normal">المجموع الإجمالي:</span>
              <span className="text-base font-bold text-[#BE185D]">{product.price * quantity}.00 DH</span>
            </div>

            {/* Bouton de commande WhatsApp (Couleur poudrée #E8C5B8 avec typographie non grasse) */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#E8C5B8] hover:bg-[#dfb5a6] active:bg-[#d6a999] text-[#2C2422] font-normal py-4 px-6 rounded-2xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3 text-base sm:text-lg cursor-pointer"
            >
              <span>طلب عبر الواتساب</span>
              <svg className="w-5 h-5 fill-current text-[#2C2422]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </button>

            {/* Badges de réassurance essentiels spécial marché marocain */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Badge 1 : الدفع عند الاستلام */}
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-pink-50/60 border border-pink-100 text-pink-900">
                  <Banknote size={18} className="text-[#BE185D] shrink-0" />
                  <div>
                    <span className="font-bold block">الدفع عند الاستلام</span>
                    <span className="text-[11px] text-pink-700">تأكد من طلبيتك قبل الدفع نقداً</span>
                  </div>
                </div>

                {/* Badge 2 : التوصيل لجميع مناطق المغرب */}
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-blue-900">
                  <Truck size={18} className="text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold block">التوصيل لجميع مناطق المغرب</span>
                    <span className="text-[11px] text-blue-700">توصيل سريع وآمن حتى باب منزلك</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 text-gray-700">
                  <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                  <span className="font-medium">منتجات أصلية 100% ماي واي</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100 text-gray-700">
                  <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                  <span className="font-medium">تغليف وحماية فائقة للطلبية</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

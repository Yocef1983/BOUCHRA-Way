import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ChevronLeft, 
  Banknote, 
  CheckCircle2, 
  ShoppingBag, 
  Clock, 
  Lock, 
  Gift, 
  Star 
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onOpenCart?: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onAddToCart,
  onOpenCart 
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Mise à jour dynamique du titre SEO et de la description lors de la consultation produit
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${product.name} | ${product.price} MAD - BOUCHRA WAY ماي واي المغرب`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc ? metaDesc.getAttribute('content') : null;
    if (metaDesc) {
      metaDesc.setAttribute('content', `${product.name}: ${product.description} - اشتر الآن بسعر ${product.price} درهم مع الدفع عند الاستلام والتوصيل بالمغرب.`);
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc) {
        metaDesc.setAttribute('content', previousDesc);
      }
    };
  }, [product]);

  // Prix calculés selon la maquette
  const originalPrice = Math.round(product.price * 1.33);
  const pharmacyPrice = Math.round(product.price * 1.8);
  const pharmacySavings = pharmacyPrice - product.price;
  const initialSavings = originalPrice - product.price;

  // Gestion anti-images brisées intelligente
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.startsWith('data:image')) return;

    const currentSrc = target.src;
    const attempts = target.dataset.attempt ? parseInt(target.dataset.attempt, 10) : 0;
    target.dataset.attempt = (attempts + 1).toString();

    if (attempts === 0 && currentSrc.includes('produit-')) {
      target.src = currentSrc.replace('produit-', 'produits-');
      return;
    }
    if (attempts <= 1 && currentSrc.includes('_')) {
      target.src = currentSrc.replace(/_/g, '-');
      return;
    }
    if (attempts <= 2 && currentSrc.includes('-pearly-creme-fondation')) {
      target.src = currentSrc.replace('-pearly-creme-fondation', '_pearly-creme-fondation');
      return;
    }
    if (attempts <= 3 && currentSrc.endsWith('.jpg')) {
      target.src = currentSrc.replace(/\.jpg$/i, '.png');
      return;
    }

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

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = '212634486494';
    const total = product.price * quantity;
    const message = encodeURIComponent(
      `*طلب جديد عبر الموقع - Bouchra Way* 🛍️\n` +
      `*(خدمة الدفع عند الاستلام بدون أي مصاريف إضافية)* 🇲🇦\n\n` +
      `📋 *تفاصيل الطلبية:*\n` +
      `▪ *اسم المنتج:* ${product.name}\n` +
      `▪ *المرجع / القسم:* ${product.category}\n` +
      `▪ *الكمية المطلوبة:* ${quantity}\n` +
      `▪ *السعر الفردي:* ${product.price} درهم\n` +
      `▪ *المبلغ الإجمالي المستحق:* ${total} درهم (خالص عند الاستلام)\n\n` +
      `📍 *معلومات التوصيل:*\n` +
      `▪ *الاسم الكامل:* \n` +
      `▪ *المدينة:* \n` +
      `▪ *العنوان الكامل:* \n` +
      `▪ *رقم الهاتف للتأكيد:* \n\n` +
      `المرجو تأكيد توفر المنتج وتحديد موعد الإرسال والتوصيل. شكراً!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="py-6 md:py-10 bg-[#FDFCFB] text-gray-800 dir-rtl min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane & Bouton retour */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-light">
            <button 
              onClick={onBack} 
              className="hover:text-[#E6007E] transition-colors flex items-center gap-1 font-normal cursor-pointer"
            >
              الرئيسية
            </button>
            <ChevronLeft size={14} className="text-gray-400" />
            <button 
              onClick={onBack} 
              className="hover:text-[#E6007E] transition-colors capitalize font-normal cursor-pointer"
            >
              {product.category}
            </button>
            <ChevronLeft size={14} className="text-gray-400" />
            <span className="text-gray-800 font-normal truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm text-gray-600 hover:text-[#E6007E] transition-colors py-1.5 px-3.5 rounded-full border border-gray-200 hover:border-pink-200 bg-white cursor-pointer shadow-xs"
          >
            <ArrowRight size={14} />
            <span>العودة للمنتجات</span>
          </button>
        </nav>

        {/* Corps principal de la fiche produit (Design Palmarosa / Beauty for You) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Section Image Produit avec badges superposés */}
          <div className="flex flex-col gap-4">
            <div className="w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-xs relative overflow-hidden group">
              
              {/* Badge Promo en haut à gauche */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                <span className="bg-[#E6007E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  PROMO -25%
                </span>
                <span className="bg-black text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase">
                  OUTLET
                </span>
              </div>

              {/* Badge Coup de Cœur en haut à droite */}
              <div className="absolute top-4 right-4 z-10 bg-pink-50 text-[#E6007E] text-xs font-bold px-3 py-1 rounded-full border border-pink-200 flex items-center gap-1">
                <Sparkles size={13} />
                <span>WANTED</span>
              </div>

              {/* Image principale */}
              <img
                src={product.image}
                alt={product.altText || product.name}
                loading="eager"
                onError={handleImageError}
                className="max-h-[320px] sm:max-h-[380px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Vignette miniature interactive */}
            <div className="flex items-center gap-3">
              <div className="w-18 h-18 bg-white rounded-xl border-2 border-[#E6007E] p-1.5 flex items-center justify-center cursor-pointer shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={handleImageError}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Section Informations, Prix & Actions */}
          <div className="flex flex-col text-right">
            
            {/* Étoiles & Marque */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#E6007E] font-bold">
                MY WAY • BOUCHRA WAY
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>4.8 (120 avis)</span>
              </div>
            </div>

            {/* Titre du produit */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Bloc PRIX DE RÉFÉRENCE (Style Palmarosa) */}
            <div className="bg-stone-50/80 rounded-xl border border-stone-200 p-3.5 mb-4 text-xs space-y-1.5">
              <span className="font-semibold text-stone-700 block uppercase tracking-wider text-[11px]">
                PRIX DE RÉFÉRENCE ℹ️
              </span>
              <div className="flex items-center justify-between text-stone-600">
                <span>Prix pharmacie / boutique (PPM) :</span>
                <span className="line-through font-medium">{pharmacyPrice} MAD</span>
              </div>
              <div className="flex items-center justify-between text-emerald-700 font-semibold pt-1 border-t border-stone-200">
                <span>Économie vs prix public :</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[11px]">
                  - {pharmacySavings} MAD (-45%)
                </span>
              </div>
            </div>

            {/* Bannière Rose Vif : PRIX FINAL BOUCHRA WAY */}
            <div className="bg-gradient-to-r from-[#E6007E] to-[#c9006e] text-white rounded-2xl p-4 sm:p-5 shadow-sm mb-4">
              <div className="flex items-center justify-between text-xs font-medium opacity-90 mb-1">
                <span>✦ PRIX FINAL BOUCHRA WAY</span>
                <span className="bg-black/25 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                  OUTLET
                </span>
              </div>

              <div className="flex items-baseline gap-3 my-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {product.price} MAD
                </span>
                <span className="text-sm sm:text-base line-through opacity-75">
                  {originalPrice} MAD
                </span>
                <span className="bg-white text-[#E6007E] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                  -25%
                </span>
              </div>

              <p className="text-xs text-pink-100 mt-1">
                Vous économisez <strong className="text-white underline">{initialSavings} MAD</strong> sur le prix initial !
              </p>
            </div>

            {/* Informations Livraison Rapide & Reassurance */}
            <div className="space-y-2 mb-5 text-xs text-gray-700">
              <div className="flex items-center gap-2 text-stone-800">
                <Clock size={15} className="text-[#E6007E] shrink-0" />
                <span>Chez vous en <strong>24 à 72 h</strong> partout au Maroc</span>
              </div>
              <div className="flex items-center gap-2 text-stone-800">
                <Truck size={15} className="text-[#E6007E] shrink-0" />
                <span><strong>Livraison offerte</strong> dès 400 MAD d&apos;achats</span>
              </div>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                  <Banknote size={13} className="text-emerald-700" />
                  الدفع عند الاستلام بدون أي مصاريف إضافية
                </span>
                <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-800 border border-stone-200 px-2.5 py-1 rounded-lg font-medium text-[11px]">
                  <Lock size={13} className="text-stone-600" />
                  Paiement sécurisé
                </span>
              </div>
            </div>

            {/* Programme Fidélité Callout */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 mb-5 text-xs text-amber-950 flex items-start gap-2.5">
              <Gift size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">+ Programme Fidélité</strong>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Remise immédiate de 25% appliquée sur ce produit. Offre valable dans la limite des stocks disponibles.
                </p>
              </div>
            </div>

            {/* Sélecteur de Quantité & Bouton Ajouter au panier */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-700">الكمية :</span>
                <div className="inline-flex items-center border border-gray-300 rounded-xl bg-white shadow-xs p-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Réduire la quantité"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition text-base font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-gray-900 font-bold text-sm select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Augmenter la quantité"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition text-base font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500 mr-2">
                  (Total : <strong className="text-[#E6007E]">{product.price * quantity} MAD</strong>)
                </span>
              </div>

              {/* Bouton Principal : Ajouter au panier avec animation 1 seconde */}
              <button
                type="button"
                onClick={handleAddToCartClick}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] cursor-pointer ${
                  isAdded 
                    ? 'bg-emerald-600 text-white scale-[1.01]' 
                    : 'bg-[#E6007E] hover:bg-[#c9006e] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={20} className="text-white animate-bounce" />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>

              {/* Bouton secondaire WhatsApp pour le marché marocain */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#FAF7F5] hover:bg-[#F2ECE8] text-[#2C2422] font-medium py-3 px-4 rounded-xl border border-[#E8DDD8] transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span>أو الطلب المباشر السريع عبر واتساب</span>
                <span className="text-emerald-600 font-bold">WhatsApp 💬</span>
              </button>
            </div>

            {/* Description détaillée */}
            <div className="mb-6 pt-4 border-t border-gray-100">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                الوصف والمميزات
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm bg-stone-50/60 p-3.5 rounded-xl border border-stone-200">
                {product.description}
              </p>
            </div>

            {/* Badges de Réassurance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <ShieldCheck size={18} className="text-[#E6007E] mx-auto mb-1" />
                <span className="font-semibold block text-gray-800">أصلي 100%</span>
                <span className="text-[10px] text-gray-500">منتجات ماي واي المعتمدة</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <Truck size={18} className="text-blue-600 mx-auto mb-1" />
                <span className="font-semibold block text-gray-800">توصيل لكل المغرب</span>
                <span className="text-[10px] text-gray-500">24 إلى 72 ساعة</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <Banknote size={18} className="text-emerald-600 mx-auto mb-1" />
                <span className="font-semibold block text-gray-800">الدفع عند الاستلام</span>
                <span className="text-[10px] text-emerald-700 font-bold">بدون أي مصاريف إضافية</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
export default ProductDetail;

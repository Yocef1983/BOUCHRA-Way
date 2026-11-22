import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { SITE } from '../config/site';
import { Language, translations } from '../i18n/translations';
import { 
  ArrowRight, 
  ChevronLeft, 
  CheckCircle2, 
  ShoppingBag, 
  Star 
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  lang?: Language; // Ajout de la prop pour gérer la langue
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onBack, 
  onAddToCart,
  lang = 'ar' // Arabe par défaut
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Dictionnaire de traduction actif
  const t = translations[lang];
  const isAr = lang === 'ar';

  // Titre et description localisés selon la langue active
  const displayName = lang === 'fr' ? (product.nameFr || product.name) : (product.nameAr || product.name);
  const displayDescription = lang === 'fr' ? (product.descriptionFr || product.description) : (product.descriptionAr || product.description);

  // Mise à jour dynamique du titre SEO, de la meta description et du lien canonique lors de la consultation produit
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${displayName} | ${product.price} ${t.currency} - BOUCHRA WAY`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc ? metaDesc.getAttribute('content') : null;
    if (metaDesc) {
      metaDesc.setAttribute('content', `${displayName}: ${displayDescription}`);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonicalLink ? canonicalLink.getAttribute('href') : null;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://bouchra-way.vercel.app/?sku=${encodeURIComponent(product.sku)}`);
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc) {
        metaDesc.setAttribute('content', previousDesc);
      }
      if (canonicalLink && previousCanonical) {
        canonicalLink.setAttribute('href', previousCanonical);
      }
    };
  }, [product, displayName, displayDescription, t]);

  // Promotion officielle du catalogue
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : null;

  // Gestion anti-images brisées intelligente
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.startsWith('data:image')) return;
    target.src = `/image/placeholder.webp`;
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
    const phoneNumber = SITE.whatsapp;
    const total = product.price * quantity;
    const message = encodeURIComponent(
      `*طلب جديد عبر الموقع - Bouchra Way* 🛍️\n\n` +
      `▪ ${isAr ? '*المنتج:*' : '*Produit:*'} ${displayName}\n` +
      `▪ *SKU:* ${product.sku}\n` +
      `▪ ${isAr ? '*الكمية:*' : '*Quantité:*'} ${quantity}\n` +
      `▪ ${isAr ? '*المجموع:*' : '*Total:*'} ${total} ${t.currency}\n`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className={`py-6 md:py-10 bg-[#FDFCFB] text-gray-800 min-h-screen`} dir={t.dir}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane & Bouton retour */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-light">
            <button 
              onClick={onBack} 
              className="hover:text-[#E6007E] transition-colors flex items-center gap-1 font-normal cursor-pointer"
            >
              {isAr ? 'الرئيسية' : 'Accueil'}
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
              {displayName}
            </span>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm text-gray-600 hover:text-[#E6007E] transition-colors py-1.5 px-3.5 rounded-full border border-gray-200 hover:border-pink-200 bg-white cursor-pointer shadow-xs"
          >
            <ArrowRight size={14} />
            <span>{isAr ? 'العودة للمنتجات' : 'Retour au catalogue'}</span>
          </button>
        </nav>

        {/* Corps principal de la fiche produit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Section Image Produit */}
          <div className="flex flex-col gap-4">
            <div className="w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] shadow-xs relative overflow-hidden group">
              {(hasDiscount || product.promoTag) && (
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  {hasDiscount && (
                    <span className="bg-[#E6007E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      -{discountPercent}%
                    </span>
                  )}
                  {product.promoTag && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase">
                      {product.promoTag}
                    </span>
                  )}
                </div>
              )}

              <img
                src={product.image}
                alt={displayName}
                loading="eager"
                onError={handleImageError}
                className="max-h-[320px] sm:max-h-[380px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Section Informations, Prix & Actions */}
          <div className="flex flex-col text-start">
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#E6007E] font-bold">
                MY WAY • BOUCHRA WAY
              </span>
              {product.rating !== undefined && (
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < Math.round(product.rating!) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span>{product.rating} {product.reviewCount !== undefined ? `(${product.reviewCount})` : ''}</span>
                </div>
              )}
            </div>

            {/* Titre du produit & SKU */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-snug">
              {displayName}
            </h1>
            <p className="text-xs text-gray-400 mb-4 font-mono">
              {t.skuLabel}: {product.sku}
            </p>

            {/* Badge Points Réseau Exclusif (MLM) */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 mb-4 text-xs text-pink-950 flex items-center justify-between">
              <span className="font-bold">{t.exclusivePoints}</span>
              <span className="bg-[#E6007E] text-white px-2.5 py-1 rounded-lg font-bold">
                {product.points} {t.pointsLabel}
              </span>
            </div>

            {/* Bannière Prix Final */}
            <div className="bg-gradient-to-r from-[#E6007E] to-[#c9006e] text-white rounded-2xl p-4 sm:p-5 shadow-sm mb-4">
              <div className="flex items-center justify-between text-xs font-medium opacity-90 mb-1">
                <span>✦ PRIX PUBLIC OFFICIEL</span>
              </div>

              <div className="flex items-baseline gap-3 my-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {product.price} {t.currency}
                </span>
                {hasDiscount && (
                  <span className="text-sm sm:text-base line-through opacity-75">
                    {product.compareAtPrice} {t.currency}
                  </span>
                )}
              </div>
            </div>

            {/* Sélecteur de Quantité & Bouton Ajouter au panier */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-700">{isAr ? 'الكمية :' : 'Quantité :'}</span>
                <div className="inline-flex items-center border border-gray-300 rounded-xl bg-white shadow-xs p-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition text-base font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bouton Ajouter au panier */}
              <button
                type="button"
                onClick={handleAddToCartClick}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] cursor-pointer ${
                  isAdded ? 'bg-emerald-600 text-white' : 'bg-[#E6007E] hover:bg-[#c9006e] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={20} className="text-white animate-bounce" />
                    <span>{isAr ? 'تمت الإضافة !' : 'Ajouté !'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>{t.addToCart}</span>
                  </>
                )}
              </button>

              {/* Bouton WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#FAF7F5] hover:bg-[#F2ECE8] text-[#2C2422] font-medium py-3 px-4 rounded-xl border border-[#E8DDD8] transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <span>{isAr ? 'الطلب السريع عبر واتساب' : 'Commander via WhatsApp'}</span>
                <span className="text-emerald-600 font-bold">WhatsApp 💬</span>
              </button>
            </div>

            {/* Description détaillée */}
            <div className="mb-6 pt-4 border-t border-gray-100">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                {t.aboutProduct}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm bg-stone-50/60 p-3.5 rounded-xl border border-stone-200">
                {displayDescription}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
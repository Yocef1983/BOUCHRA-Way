import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Truck, Banknote, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/cart';
import { SITE, computeShipping } from '../config/site';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  lang?: 'ar' | 'fr';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';

  // Verrouillage du défilement d'arrière-plan lorsque le tiroir est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fermeture par la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Frais de livraison fixes 20 MAD pour toute commande
  const shippingCost = items.length === 0 ? 0 : computeShipping(subtotal);
  const finalTotal = subtotal + shippingCost;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, productName: string) => {
    const target = e.currentTarget;
    if (target.src.startsWith('data:image')) return;
    target.src = `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" fill="#FAF7F5"/>
        <circle cx="50" cy="40" r="18" fill="#E8C5B8" opacity="0.45"/>
        <text x="50" y="68" font-family="system-ui, sans-serif" font-size="7" fill="#6B5A54" text-anchor="middle" font-weight="600">${productName.slice(0, 16)}</text>
        <text x="50" y="80" font-family="system-ui, sans-serif" font-size="6" fill="#A8948D" text-anchor="middle" letter-spacing="1">BOUCHRA WAY</text>
      </svg>
    `)}`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex ${isAr ? 'justify-start' : 'justify-end'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Fond sombre avec flou d'arrière-plan (backdrop-blur-sm) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Panneau latéral du panier */}
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out ${isAr ? 'text-right' : 'text-left'}`}>
        
        {/* En-tête du panier */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {isAr ? 'سلة المشتريات' : 'Mon Panier'}{' '}
              <span className="text-[#E6007E]">({totalItemsCount})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? 'إغلاق السلة' : 'Fermer le panier'}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Frais de livraison fixes et réassurance COD marocain */}
        <div className="px-5 pt-3 pb-1 space-y-2">
          <div className="p-2.5 bg-pink-50/70 border border-pink-100 rounded-xl flex items-center justify-between text-xs text-gray-800 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck size={15} className="text-[#E6007E] shrink-0" />
              <span>{isAr ? 'توصيل لجميع مدن المغرب :' : 'Livraison partout au Maroc :'}</span>
            </span>
            <span className="font-bold text-[#E6007E]" dir="ltr">{SITE.shippingFee} MAD</span>
          </div>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-medium">
            <Banknote size={16} className="text-emerald-600 shrink-0" />
            <span>{isAr ? 'الدفع نقداً عند الاستلام بدون أي مصاريف إضافية (COD)' : 'Paiement à la livraison sans frais supplémentaires (COD)'}</span>
          </div>
        </div>

        {/* Liste des articles du panier */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#E6007E] mb-3">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">
                {isAr ? 'سلة التسوق فارغة' : 'Votre panier est vide'}
              </h3>
              <p className="text-xs text-gray-500 mb-4 max-w-xs leading-relaxed">
                {isAr 
                  ? 'اكتشفي تشكيلة ماي واي من العطور، الماكياج ومنتجات العناية واختاري ما يناسبك.'
                  : 'Découvrez la sélection My Way de parfums, maquillage et soins et choisissez vos favoris.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#E6007E] hover:bg-[#c9006e] text-white text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer shadow-xs"
              >
                {isAr ? 'تصفح المنتجات' : 'Découvrir les produits'}
              </button>
            </div>
          ) : (
            items.map((item) => {
              const hasDiscount = Boolean(item.product.compareAtPrice && item.product.compareAtPrice > item.product.price);
              const productName = isAr ? (item.product.nameAr || item.product.name) : (item.product.nameFr || item.product.name);

              return (
                <div 
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-2xs hover:border-pink-100 transition"
                >
                  {/* Miniature produit */}
                  <div className="w-20 h-20 bg-stone-50 rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={productName}
                      onError={(e) => handleImageError(e, item.product.name)}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Détails & Quantité */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                          MY WAY • BOUCHRA WAY
                        </span>
                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                          {productName}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label={isAr ? 'حذف المنتج' : 'Supprimer le produit'}
                        className="text-gray-400 hover:text-rose-600 transition p-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-2">
                      {/* Sélecteur de quantité */}
                      <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50/50 p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded transition text-xs font-bold cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded transition text-xs font-bold cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Prix */}
                      <div className="text-left" dir="ltr">
                        <div className="flex items-baseline justify-end gap-1 text-[#E6007E] font-bold text-sm">
                          <span>{item.product.price * item.quantity}</span>
                          <span className="text-xs">MAD</span>
                        </div>
                        {hasDiscount ? (
                          <span className="text-[10px] text-gray-400 line-through">
                            {item.product.compareAtPrice! * item.quantity} MAD
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pied du panier avec récapitulatif & Bouton de commande */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white space-y-3">
            {/* Sous-total */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">{isAr ? 'المجموع الجزئي :' : 'Sous-total :'}</span>
              <span className="text-base font-bold text-gray-900" dir="ltr">{subtotal} MAD</span>
            </div>

            {/* Livraison */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{isAr ? 'مصاريف التوصيل :' : 'Frais de livraison :'}</span>
              <span className="font-semibold text-gray-800" dir="ltr">{shippingCost} MAD</span>
            </div>

            {/* Total général */}
            <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-gray-800">{isAr ? 'المبلغ الإجمالي المستحق :' : 'Total à régler :'}</span>
              <span className="text-xl font-extrabold text-[#E6007E]" dir="ltr">{finalTotal} MAD</span>
            </div>

            {/* Bouton principal de commande */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E6007E] to-[#c9006e] hover:from-[#c9006e] hover:to-[#b00060] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-[0.99]"
            >
              <span>{isAr ? `إتمام الطلب (${finalTotal} MAD)` : `Passer la commande (${finalTotal} MAD)`}</span>
              {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </button>

            {/* Continuer mes achats */}
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-xs text-gray-500 hover:text-[#E6007E] py-1 transition cursor-pointer"
            >
              {isAr ? 'متابعة التسوق' : 'Continuer mes achats'}
            </button>

            {/* Badges de réassurance */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1">
                <Banknote size={12} className="text-emerald-600" />
                {isAr ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
              </span>
              <span className="flex items-center gap-1">
                <Truck size={12} className="text-blue-600" />
                {isAr ? '24 إلى 72 ساعة' : '24h à 72h'}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#E6007E]" />
                {isAr ? 'أصلي 100%' : '100% Authentique'}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default CartDrawer;

import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Truck, Gift, Lock, Banknote, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
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
  const freeShippingThreshold = 400;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 20;
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
    <div className="fixed inset-0 z-50 flex justify-start" dir="rtl">
      {/* Fond sombre avec flou d'arrière-plan (backdrop-blur-sm) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Panneau latéral du panier avec continuité RTL */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 transform transition-transform duration-300 ease-out text-right">
        
        {/* En-tête du panier bilingue */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              سلة المشتريات <span className="text-xs text-gray-400 font-normal">/ Mon Panier</span>{' '}
              <span className="text-[#E6007E]">({totalItemsCount})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barre de progression livraison offerte */}
        <div className="bg-pink-50/70 px-5 py-3 border-b border-pink-100">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs text-gray-700 mb-1.5 leading-relaxed">
              باقي <strong className="text-[#E6007E] font-bold">{remainingForFreeShipping} MAD</strong> للاستفادة من <strong>التوصيل المجاني</strong> بالمغرب
            </p>
          ) : (
            <p className="text-xs text-emerald-800 font-bold mb-1.5 flex items-center gap-1">
              <span>🎉 هنيئاً لك ! استفدت من التوصيل المجاني بالمغرب !</span>
            </p>
          )}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#E6007E] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Badge réassurance COD marocain */}
        <div className="px-5 pt-3 pb-1">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-medium">
            <Banknote size={16} className="text-emerald-600 shrink-0" />
            <span>الدفع عند الاستلام بدون أي مصاريف إضافية (COD)</span>
          </div>
        </div>

        {/* Liste des articles du panier */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-[#E6007E] mb-3">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">سلة التسوق فارغة</h3>
              <p className="text-xs text-gray-500 mb-4 max-w-xs leading-relaxed">
                اكتشفي تشكيلة ماي واي من العطور، الماكياج ومنتجات العناية واختاري ما يناسبك.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#E6007E] hover:bg-[#c9006e] text-white text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer shadow-xs"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            items.map((item) => {
              const originalPrice = Math.round(item.product.price * 1.33);

              return (
                <div 
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-2xs hover:border-pink-100 transition"
                >
                  {/* Miniature produit */}
                  <div className="w-20 h-20 bg-stone-50 rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
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
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label="حذف المنتج"
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
                        <span className="text-[10px] text-gray-400 line-through">
                          {originalPrice * item.quantity} MAD
                        </span>
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
              <span className="text-gray-600 font-medium">المجموع الجزئي / Sous-total</span>
              <span className="text-base font-bold text-gray-900">{subtotal} MAD</span>
            </div>

            {/* Livraison */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>مصاريف التوصيل / Livraison</span>
              {shippingCost === 0 ? (
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  مجاناً / Offerte
                </span>
              ) : (
                <span className="font-medium text-gray-700">20 MAD</span>
              )}
            </div>

            {/* Total général */}
            <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
              <span className="text-sm font-bold text-gray-800">المبلغ الإجمالي المستحق :</span>
              <span className="text-xl font-extrabold text-[#E6007E]">{finalTotal} MAD</span>
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
              <span>إتمام الطلب / Commander ({finalTotal} MAD)</span>
              <ArrowLeft size={16} />
            </button>

            {/* Continuer mes achats */}
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-xs text-gray-500 hover:text-[#E6007E] py-1 transition cursor-pointer"
            >
              متابعة التسوق / Continuer mes achats
            </button>

            {/* Badges de réassurance */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1">
                <Banknote size={12} className="text-emerald-600" />
                الدفع عند الاستلام
              </span>
              <span className="flex items-center gap-1">
                <Truck size={12} className="text-blue-600" />
                24 إلى 72 ساعة
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#E6007E]" />
                أصلي 100%
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default CartDrawer;

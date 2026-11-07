import React from 'react';
import { Check, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { CompletedOrder } from '../types/cart';

interface OrderSuccessProps {
  order: CompletedOrder;
  onContinueShopping: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({
  order,
  onContinueShopping
}) => {
  const handleOpenWhatsAppAgain = () => {
    const phoneNumber = '212634486494';
    const message = encodeURIComponent(
      `مرحباً بوشرى واي، أود متابعة طلبيتي رقم ${order.orderId} المسجلة بمبلغ ${order.total} درهم. شكراً!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 py-12" dir="ltr">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl text-center space-y-6">
        
        {/* Icône de validation verte (CheckCircle) */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-xs">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <Check size={32} className="stroke-[3]" />
          </div>
        </div>

        {/* Message de succès */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Commande passée !
          </h1>
          <p className="text-sm text-gray-600">
            Votre commande a été confirmée avec succès.
          </p>
          <div className="inline-block mt-2 px-3.5 py-1 bg-pink-50 border border-pink-200 rounded-full text-xs font-bold text-[#E6007E]">
            Référence : {order.orderId}
          </div>
        </div>

        {/* Récapitulatif rapide */}
        <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-700 text-left space-y-2 border border-stone-200">
          <div className="flex justify-between">
            <span className="text-stone-500">Destinataire :</span>
            <span className="font-semibold text-stone-900">{order.customer.firstName} {order.customer.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Ville de livraison :</span>
            <span className="font-semibold text-stone-900">{order.customer.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Mode de paiement :</span>
            <span className="font-semibold text-emerald-700">الدفع عند الاستلام بدون أي مصاريف إضافية (COD)</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold">
            <span>Montant à régler :</span>
            <span className="text-[#E6007E]">{order.total} MAD</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Vous recevrez un message de confirmation sous peu. Notre équipe traitera votre commande dans les meilleurs délais.
        </p>

        {/* Boutons d'actions */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleOpenWhatsAppAgain}
            className="w-full py-3.5 px-4 bg-[#E6007E] hover:bg-[#c9006e] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>Suivre ma commande sur WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onContinueShopping}
            className="w-full py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ShoppingBag size={16} />
            <span>Continuer mes achats</span>
          </button>
        </div>

      </div>
    </div>
  );
};
export default OrderSuccess;

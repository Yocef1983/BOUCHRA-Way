import React, { useState } from 'react';
import { Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { CompletedOrder } from '../types/cart';
import { SITE } from '../config/site';
import { Language } from '../i18n/translations';

interface OrderSuccessProps {
  order: CompletedOrder;
  onContinueShopping: () => void;
  onOrderConfirmed?: () => void;
  lang?: Language;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({
  order,
  onContinueShopping,
  onOrderConfirmed,
  lang = 'ar',
}) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const isAr = lang === 'ar';

  const handleConfirmSent = () => {
    setIsConfirmed(true);
    onOrderConfirmed?.();
  };

  const handleOpenWhatsAppAgain = () => {
    const phoneNumber = SITE.whatsapp;
    const message = encodeURIComponent(
      lang === 'fr'
        ? `Bonjour Bouchra Way, je souhaite suivre ma commande N° ${order.orderId} d'un montant de ${order.total} MAD. Merci !`
        : `مرحباً بوشرى واي، أود متابعة طلبيتي رقم ${order.orderId} المسجلة بمبلغ ${order.total} درهم. شكراً!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div 
      className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4 py-12" 
      dir={isAr ? 'rtl' : 'ltr'}
    >
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
            {isAr ? 'تم تأكيد طلبك بنجاح !' : 'Commande passée !'}
          </h1>
          <p className="text-sm text-gray-600">
            {isAr 
              ? 'شكراً لك! لقد تم تسجيل طلبيتك بنجاح وسنتواصل معك قريباً.' 
              : 'Votre commande a été confirmée avec succès.'}
          </p>
          <div className="inline-block mt-2 px-3.5 py-1 bg-pink-50 border border-pink-200 rounded-full text-xs font-bold text-[#E6007E]">
            {isAr ? `رقم الطلب : ${order.orderId}` : `Référence : ${order.orderId}`}
          </div>
        </div>

        {/* Récapitulatif rapide / Facture */}
        <div className={`bg-stone-50 rounded-2xl p-4 text-xs text-stone-700 ${isAr ? 'text-right' : 'text-left'} space-y-2 border border-stone-200`}>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">{isAr ? 'المستلم :' : 'Destinataire :'}</span>
            <span className="font-semibold text-stone-900">{order.customer.firstName} {order.customer.lastName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">{isAr ? 'مدينة التوصيل :' : 'Ville de livraison :'}</span>
            <span className="font-semibold text-stone-900">{order.customer.city}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">{isAr ? 'طريقة الدفع :' : 'Mode de paiement :'}</span>
            <span className="font-semibold text-emerald-700">
              {isAr ? 'الدفع نقداً عند الاستلام (COD)' : 'Paiement à la livraison en espèces (COD)'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-stone-500">{isAr ? 'المجموع الجزئي :' : 'Sous-total :'}</span>
            <span className="font-semibold text-stone-900" dir="ltr">{order.subtotal} MAD</span>
          </div>
          {order.discount !== undefined && order.discount > 0 && (
            <div className="flex justify-between items-center text-emerald-700 font-semibold">
              <span>{isAr ? 'تخفيض عضوية -25% :' : 'Remise membre -25% :'}</span>
              <span dir="ltr">- {order.discount} MAD</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-stone-500">{isAr ? 'مصاريف التوصيل :' : 'Frais de livraison :'}</span>
            <span className="font-semibold text-stone-900" dir="ltr">{order.shipping} MAD</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-sm font-bold">
            <span>{isAr ? 'المبلغ الإجمالي المستحق :' : 'Total à régler :'}</span>
            <span className="text-[#E6007E]" dir="ltr">{order.total} MAD</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          {isAr 
            ? 'سيتواصل معك فريقنا في أقرب وقت لتأكيد طلبيتك والبدء في تجهيزها فوراً.'
            : 'Vous recevrez un message de confirmation sous peu. Notre équipe traitera votre commande dans les meilleurs délais.'}
        </p>

        {/* Boutons d'actions */}
        <div className="space-y-3 pt-2">
          {/* Bouton de confirmation finale de l'envoi WhatsApp */}
          <button
            type="button"
            onClick={handleConfirmSent}
            disabled={isConfirmed}
            className={`w-full py-3.5 px-4 font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm ${
              isConfirmed
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white cursor-pointer'
            }`}
          >
            <Check size={18} className={isConfirmed ? 'text-emerald-600' : 'text-white'} />
            <span>
              {isConfirmed
                ? (isAr ? 'تم تأكيد إرسال الطلب بنجاح ✓' : 'Commande confirmée ✓')
                : (isAr ? 'تم إرسال الطلب عبر واتساب' : "J'ai bien envoyé ma commande sur WhatsApp")}
            </span>
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsAppAgain}
            className="w-full py-3.5 px-4 bg-[#E6007E] hover:bg-[#c9006e] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>{isAr ? 'متابعة طلبيتي عبر واتساب' : 'Suivre ma commande sur WhatsApp'}</span>
          </button>

          <button
            type="button"
            onClick={onContinueShopping}
            className="w-full py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ShoppingBag size={16} />
            <span>{isAr ? 'متابعة التسوق' : 'Continuer mes achats'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
export default OrderSuccess;

import React, { useState } from 'react';
import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleWhatsAppOrder = () => {
    const phoneNumber = '212600000000'; // Remplacez par votre numéro WhatsApp
    const message = encodeURIComponent(
      `مرحباً بوشرى واي، أود طلب هذا المنتج:\n\n` +
      `📦 *المنتج:* ${product.name}\n` +
      `🔢 *الكمية:* ${quantity}\n` +
      `💰 *الثمن الإجمالي:* ${product.price * quantity} درهم\n\n` +
      `المرجو تأكيد الطلب ومعلومات التوصيل.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="py-8 bg-white dir-rtl min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane & Bouton retour */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <button onClick={onBack} className="hover:text-amber-700 transition-colors">الرئيسية</button>
          <span>/</span>
          <span className="text-gray-800 font-light">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Galerie d'images (Style minimaliste) */}
          <div className="flex gap-4">
            <div className="w-20 flex flex-col gap-3">
              <div className="border border-amber-200 rounded-lg p-1 bg-gray-50 cursor-pointer">
                <img src={product.image} alt={product.name} className="w-full h-16 object-contain" />
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
              <img 
                src={product.image} 
                alt={product.altText} 
                className="max-h-[350px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('.png')) {
                    target.src = product.image.replace(/\.(jpg|jpeg|webp)$/i, '.png');
                  }
                }}
              />
            </div>
          </div>

          {/* Informations et Actions */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-light">BOUCHRA WAY</span>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4 leading-relaxed">
              {product.name}
            </h1>

            <div className="text-2xl font-semibold text-gray-900 mb-6">
              {product.price}.00 <span className="text-sm font-normal text-gray-500">DH</span>
            </div>

            <p className="text-gray-600 font-light leading-relaxed mb-8 border-b pb-6">
              {product.description}
            </p>

            {/* Sélecteur de quantité */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 font-light">الكمية</label>
              <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 text-gray-800 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bouton de commande WhatsApp (Couleur poudrée assortie et police non grasse) */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#E8C5B8] hover:bg-[#dfb5a6] text-gray-900 font-normal py-4 px-6 rounded-xl shadow-sm flex items-center justify-center gap-3 transition-colors text-base"
            >
              <span>طلب عبر الواتساب</span>
              <svg className="w-5 h-5 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
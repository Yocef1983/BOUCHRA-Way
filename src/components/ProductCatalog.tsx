import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'parfum', label: 'العطور' },
    { id: 'soin-visage', label: 'العناية بالوجه' },
    { id: 'soin-capillaire', label: 'العناية بالشعر' },
    { id: 'soin-corps', label: 'العناية بالجسم' },
    { id: 'maquillage', label: 'المكياج' },
    { id: 'menage', label: 'المنظفات المنزلية' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Ajouter au panier
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Modifier la quantité
  const updateQuantity = (productId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Validation globale de la commande via WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const phoneNumber = '212600000000'; // ⚠️ Remplacez par votre numéro WhatsApp
    
    let orderDetails = cart.map(item => 
      `▪️ ${item.product.name} (×${item.quantity}) - ${item.product.price * item.quantity} درهم`
    ).join('\n');

    const message = encodeURIComponent(
      `مرحباً بوشرى واي، أود طلب المنتجات التالية:\n\n` +
      `${orderDetails}\n\n` +
      `💰 *المجموع الكلي:* ${totalPrice} درهم\n\n` +
      `المرجو تأكيد الطلب ومعلومات التوصيل.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-12 bg-gray-50 dir-rtl relative" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête et Bouton Panier Flottant */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">كتالوج المنتجات</h2>
            <p className="mt-2 text-lg text-gray-600">اكتشفي أفضل عروض ماي واي المغرب واطلبي بسهولة</p>
          </div>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="mt-4 sm:mt-0 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span>سلة المشتريات</span>
            {totalItems > 0 && (
              <span className="bg-white text-amber-700 text-xs font-extrabold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Filtres par catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group"
            >
              <div>
                {/* Cadre Image avec gestion anti-images brisées */}
                <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.altText}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.endsWith('.png')) {
                        target.src = product.image.replace(/\.(jpg|jpeg|webp)$/i, '.png');
                      }
                    }}
                  />
                </div>

                {/* Détails du produit */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-amber-700">
                      {product.price} <span className="text-sm font-normal">درهم</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bouton Ajouter au Panier */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors duration-200"
                >
                  <span>أضف إلى السلة</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tiroir du Panier Glissant */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6">
              
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">سلة المشتريات ({totalItems})</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">سلة المشتريات فارغة حالياً.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-contain bg-white rounded-lg p-1 border"/>
                        <div>
                          <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.product.name}</h4>
                          <span className="text-amber-700 font-semibold text-sm">{item.product.price} درهم</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="text-gray-500 font-bold px-1">-</button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="text-gray-500 font-bold px-1">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>المجموع الإجمالي:</span>
                    <span className="text-amber-700">{totalPrice} درهم</span>
                  </div>

                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <span>إرسال الطلب عبر الواتساب</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
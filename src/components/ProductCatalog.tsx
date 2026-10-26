import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const handleWhatsAppOrder = (product: Product) => {
    const phoneNumber = '212600000000'; // ⚠️ Remplacez par votre numéro WhatsApp (ex: 212612345678)
    const message = encodeURIComponent(
      `مرحباً بوشرى واي، أود طلب هذا المنتج:\n\n` +
      `📦 *المنتج:* ${product.name}\n` +
      `💰 *الثمن:* ${product.price} درهم\n` +
      `🔗 *الصورة:* https://bouchra-way.vercel.app${product.image}\n\n` +
      `المرجو تأكيد الطلب ومعلومات التوصيل.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-12 bg-gray-50 dir-rtl" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de la section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            كتالوج المنتجات
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            تصفحي أفضل منتجات ماي واي للعناية والتجميل والمنزل
          </p>
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

        {/* Grille des 50 produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between"
            >
              <div>
                {/* Cadre Image Carré (1:1) avec fond propre */}
                <div className="w-full h-64 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.altText}
                    loading="lazy"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
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

              {/* Bouton de commande WhatsApp */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleWhatsAppOrder(product)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors duration-200"
                >
                  <span>طلب عبر الواتساب</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
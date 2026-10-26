import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct }) => {
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

  return (
    <section className="py-12 bg-white dir-rtl relative" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête minimaliste */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light text-gray-800 tracking-wider">
            تشكيلة المنتجات المميزة
          </h2>
          <div className="w-16 h-0.5 bg-amber-200 mx-auto mt-2"></div>
        </div>

        {/* Filtres par catégories (Design épuré) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-normal transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-amber-100 text-amber-900 border border-amber-200 shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des produits (Inspirée beautyforyou.ma) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col bg-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Cadre Image propre */}
              <div className="w-full h-56 bg-gray-50 rounded-lg flex items-center justify-center p-3 overflow-hidden relative mb-4">
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

              {/* Informations Produit (Typographie non grasse et élégante) */}
              <div className="flex flex-col flex-1 justify-between text-center">
                <h3 className="text-sm font-normal text-gray-800 line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                <div className="text-sm font-semibold text-gray-900 mt-auto">
                  {product.price}.00 <span className="text-xs font-normal text-gray-500">DH</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
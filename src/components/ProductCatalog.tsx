import React from 'react';
import { PRODUCTS } from '../data/products';
import { ShoppingCart } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: string;
}

export default function ProductCatalog({ selectedCategory }: ProductCatalogProps) {
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          كتالوج المنتجات / Catalogue Produit
        </h2>
        <span className="text-sm text-gray-500 font-medium">
          {filteredProducts.length} Produit(s) disponible(s)
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">Aucun produit dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  {product.discountPrice && (
                    <span className="absolute top-2 right-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                      Prix Membre
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">
                    {product.subCategory}
                  </span>
                  <h3 className="font-bold text-gray-800 text-sm mt-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-extrabold text-rose-600">
                    {product.discountPrice || product.price} MAD
                  </span>
                  {product.discountPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.price} MAD
                    </span>
                  )}
                </div>

                <a 
                  href={`https://wa.me/212634486494?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${product.name} au prix de ${product.discountPrice || product.price} MAD`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={16} /> Commander via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
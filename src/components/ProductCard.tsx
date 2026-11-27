import React from 'react';
import type { Product } from '../data/products';
import { Eye, Heart, Plus, Star } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  lang?: 'ar' | 'fr';
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang = 'ar',
  isFavorite = false,
  onToggleFavorite,
  onSelectProduct,
  onAddToCart,
}) => {
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : null;

  const productName = lang === 'fr' ? (product.nameFr || product.name) : (product.nameAr || product.name);

  // Repli intelligent vers /image/5818.webp avec garde anti-boucle infinie
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === '1' || target.src.endsWith('/image/5818.webp')) {
      return;
    }
    target.dataset.fallbackApplied = '1';
    target.src = '/image/5818.webp';
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(product.id, e);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, 1);
    } else {
      onSelectProduct(product);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Badges catalogue réels si promotion ou tag officiel */}
      {(hasDiscount || product.promoTag) && (
        <div className="absolute top-3 start-3 z-10 flex flex-col items-start gap-1 pointer-events-none">
          {hasDiscount && (
            <span className="bg-[#E6007E] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.promoTag && (
            <span className="bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm uppercase">
              {product.promoTag}
            </span>
          )}
        </div>
      )}

      {/* Bouton Favoris en haut à droite (end-3) */}
      <button
        type="button"
        onClick={handleToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={
          lang === 'fr'
            ? (isFavorite ? `Retirer ${productName} des favoris` : `Ajouter ${productName} aux favoris`)
            : (isFavorite ? `إزالة ${productName} من المفضلة` : `إضافة ${productName} إلى المفضلة`)
        }
        title={
          lang === 'fr'
            ? (isFavorite ? `Retirer ${productName} des favoris` : `Ajouter ${productName} aux favoris`)
            : (isFavorite ? `إزالة ${productName} من المفضلة` : `إضافة ${productName} إلى المفضلة`)
        }
        className="absolute top-3 end-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white text-gray-400 hover:text-[#E6007E] transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6007E]"
      >
        <Heart 
          size={17} 
          className={isFavorite ? "fill-[#E6007E] text-[#E6007E]" : "transition-transform group-hover:scale-110"} 
        />
      </button>

      {/* Bouton cliquable pour voir les détails du produit (Image, Marque & Titre) */}
      <button
        type="button"
        onClick={() => onSelectProduct(product)}
        aria-label={
          lang === 'fr'
            ? `Voir les détails de ${productName}`
            : `عرض تفاصيل ${productName}`
        }
        className="w-full text-start cursor-pointer bg-transparent border-0 p-0 flex flex-col flex-1 focus:outline-none focus:ring-2 focus:ring-[#E6007E] focus:ring-offset-2 rounded-xl group/cardbtn"
      >
        {/* Cadre Image avec dimensions explicites, décodage asynchrone et repli sécurisé */}
        <div className="w-full h-44 sm:h-52 bg-[#FAF7F5] rounded-xl flex items-center justify-center p-3 overflow-hidden relative mb-3">
          <img
            src={product.image}
            alt={product.altText || productName}
            width={200}
            height={200}
            decoding="async"
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Aperçu rapide au survol */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-[11px] px-3 py-1 rounded-full shadow-xs flex items-center gap-1 font-medium">
              <Eye size={12} />
              {lang === 'fr' ? 'Voir les détails' : 'عرض التفاصيل'}
            </span>
          </div>
        </div>

        {/* Marque & Titre */}
        <div className="flex flex-col flex-1 text-start w-full">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1 block">
            BOUCHRA WAY • MY WAY
          </span>

          <span className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] mb-1 group-hover:text-[#E6007E] transition-colors leading-snug block">
            {productName}
          </span>

          {/* Affichage du SKU en gras et gris foncé */}
          {product.sku && (
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-700 block mb-1">
              {lang === 'fr' ? 'Réf' : 'المرجع'}: {product.sku}
            </span>
          )}
        </div>
      </button>

      {/* Avis & Étoiles réels si présents */}
      {product.rating !== undefined ? (
        <div className="flex items-center gap-1 mb-3 text-amber-500">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.round(product.rating!) ? "fill-amber-400 text-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-gray-600 mr-1">{product.rating}</span>
          {product.reviewCount !== undefined && (
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          )}
        </div>
      ) : null}

      {/* Ligne Prix & Bouton + PANIER */}
      <div className="mt-auto pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
        {/* Prix actuel en rose vif & Prix barré réel si existant */}
        <div className="flex flex-col text-start">
          <div className="flex items-baseline gap-1 text-[#E6007E] font-bold">
            <span className="text-base sm:text-lg leading-none">{product.price}</span>
            <span className="text-xs font-bold">MAD</span>
          </div>
          {product.compareAtPrice && product.compareAtPrice > product.price ? (
            <span className="text-[11px] text-gray-400 line-through">
              {product.compareAtPrice} MAD
            </span>
          ) : null}
        </div>

        {/* Bouton "+ PANIER" */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={
            lang === 'fr'
              ? `Ajouter ${productName} au panier`
              : `إضافة ${productName} إلى السلة`
          }
          className="bg-[#E6007E] hover:bg-[#c9006e] active:scale-95 text-white font-bold text-xs uppercase px-3 py-2 rounded-lg flex items-center gap-1 shadow-xs transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E6007E]"
        >
          <Plus size={13} className="stroke-[3]" />
          <span>PANIER</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

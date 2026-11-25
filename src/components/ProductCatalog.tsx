import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import { Eye, Search, X, RotateCcw, Filter, ChevronLeft, Heart, Plus, Star } from 'lucide-react';
import { getSubCategoryTranslation } from '../i18n/translations';

// Affectation stricte des SKU pour la catégorie Maison & Entretien
const MAISON_ENTRETIEN_SKUS = {
  lessive: ['3284', '3285', '3506'],
  sols: ['3319', '3510'],
  detachants: ['3335', '3457', '3467', '4700', '4705'],
  all: ['3284', '3285', '3506', '3319', '3510', '3335', '3457', '3467', '4700', '4705'],
};

// Affectation stricte des SKU pour la catégorie Enfants & Bébé
const ENFANTS_BEBE_SKUS = ['1574', '4282'];

const isLessiveSubCategory = (sub: string): boolean => {
  const s = sub.trim().toLowerCase();
  return s === 'منظفات الملابس' || s === 'lessive et soin du linge' || s.includes('lessive');
};

const isSolsSubCategory = (sub: string): boolean => {
  const s = sub.trim().toLowerCase();
  return s === 'الأرضيات والأسطح' || s === 'sols et surfaces' || s.includes('sols');
};

const isDetachantsSubCategory = (sub: string): boolean => {
  const s = sub.trim().toLowerCase();
  return (
    s === 'مزيلات البقع متعدد الاستخدامات' ||
    s === 'détachants / solvants multi-usages' ||
    s === 'detachants / solvants multi-usages' ||
    s.includes('détachants') ||
    s.includes('detachants') ||
    s.includes('solvants') ||
    s.includes('مزيلات البقع')
  );
};

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  selectedSubCategory?: string | null;
  setSelectedSubCategory?: (subCategory: string | null) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
  lang?: 'ar' | 'fr';
  isStandaloneView?: boolean;
  favorites?: Record<string, boolean>;
  onToggleFavorite?: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onSelectProduct,
  selectedCategory: controlledCategory,
  setSelectedCategory: setControlledCategory,
  selectedSubCategory = null,
  setSelectedSubCategory,
  searchQuery = '',
  setSearchQuery,
  onAddToCart,
  lang = 'ar',
  isStandaloneView = false,
  favorites: controlledFavorites,
  onToggleFavorite
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const [internalFavorites, setInternalFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bw_favorites');
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const map: Record<string, boolean> = {};
        for (const id of parsed) {
          if (typeof id === 'string') map[id] = true;
        }
        return map;
      }
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch {
      // Ignorer si stockage non disponible
    }
    return {};
  });

  const favorites = controlledFavorites !== undefined ? controlledFavorites : internalFavorites;

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(productId);
    } else {
      setInternalFavorites(prev => {
        const updated = { ...prev, [productId]: !prev[productId] };
        try {
          const activeIds = Object.keys(updated).filter(id => updated[id]);
          localStorage.setItem('bw_favorites', JSON.stringify(activeIds));
        } catch {
          // Ignorer si stockage non disponible
        }
        return updated;
      });
    }
  };

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const setSelectedCategory = setControlledCategory || setInternalCategory;

  // Normalisation de la catégorie (support direct arabe et slugs bilingues)
  const normalizeCategory = (cat: string): string => {
    if (!cat || cat === 'all' || cat === 'كل المنتجات' || cat === 'الكل' || cat === 'Tous les produits') return 'all';
    const map: Record<string, string> = {
      'parfum': 'عطور',
      'parfums': 'عطور',
      'عطور': 'عطور',
      'maquillage': 'ماكياج',
      'ماكياج': 'ماكياج',
      'soin-visage': 'العناية بالوجه',
      'soinVisage': 'العناية بالوجه',
      'العناية بالوجه': 'العناية بالوجه',
      'soin-corps': 'العناية بالجسم',
      'soinCorps': 'العناية بالجسم',
      'العناية بالجسم': 'العناية بالجسم',
      'soin-capillaire': 'العناية بالشعر',
      'soinCapillaire': 'العناية بالشعر',
      'العناية بالشعر': 'العناية بالشعر',
      // Maison & Entretien
      'menage': 'العناية المنزلية',
      'maison-entretien': 'العناية المنزلية',
      'maison-et-entretien': 'العناية المنزلية',
      'maison & entretien': 'العناية المنزلية',
      'Maison & Entretien': 'العناية المنزلية',
      'العناية المنزلية': 'العناية المنزلية',
      'منظفات المنزل': 'العناية المنزلية',
      'entretien ménager': 'العناية المنزلية',
      'Entretien ménager': 'العناية المنزلية',
      'Entretien ménagères': 'العناية المنزلية',
      // Enfants & Bébé
      'enfants': 'الأطفال والرضع',
      'enfants-et-bebe': 'الأطفال والرضع',
      'enfants & bébé': 'الأطفال والرضع',
      'Enfants & Bébé': 'الأطفال والرضع',
      'الأطفال والرضع': 'الأطفال والرضع',
      'أطفال': 'الأطفال والرضع',
      'Enfants': 'الأطفال والرضع'
    };
    return map[cat] || map[cat.toLowerCase()] || cat;
  };

  const normalizedCategory = normalizeCategory(selectedCategory);

  // Catégories officielles
  const categories = [
    { id: 'all', label: 'الكل', labelFr: 'Tous les produits' },
    { id: 'ماكياج', label: 'ماكياج', labelFr: 'Maquillage' },
    { id: 'العناية بالوجه', label: 'العناية بالوجه', labelFr: 'Soin du visage' },
    { id: 'العناية بالجسم', label: 'العناية بالجسم', labelFr: 'Soin du corps' },
    { id: 'العناية بالشعر', label: 'العناية بالشعر', labelFr: 'Soin des cheveux' },
    { id: 'عطور', label: 'عطور', labelFr: 'Parfums' },
    { id: 'العناية المنزلية', label: 'العناية المنزلية', labelFr: 'Maison & Entretien' },
    { id: 'الأطفال والرضع', label: 'الأطفال والرضع', labelFr: 'Enfants & Bébé' },
  ];

  const getCategoryLabel = (catId: string) => {
    const norm = normalizeCategory(catId);
    if (norm === 'all') return lang === 'fr' ? 'Tous les produits' : 'الكل';
    const found = categories.find(c => c.id === norm || c.label === norm);
    if (found) {
      return lang === 'fr' ? found.labelFr : found.label;
    }
    return catId;
  };

  const getSubCategoryLabel = (subCat: string): string => {
    if (isLessiveSubCategory(subCat)) {
      return lang === 'fr' ? 'Lessive et soin du linge' : 'منظفات الملابس';
    }
    if (isSolsSubCategory(subCat)) {
      return lang === 'fr' ? 'Sols et surfaces' : 'الأرضيات والأسطح';
    }
    if (isDetachantsSubCategory(subCat)) {
      return lang === 'fr' ? 'Détachants / Solvants multi-usages' : 'مزيلات البقع متعدد الاستخدامات';
    }
    return getSubCategoryTranslation(subCat, lang);
  };

  // Filtrage combiné strict
  let filteredProducts = PRODUCTS;

  // 1. Filtrage par catégorie principale
  if (normalizedCategory !== 'all') {
    if (normalizedCategory === 'العناية المنزلية') {
      filteredProducts = filteredProducts.filter((product) =>
        MAISON_ENTRETIEN_SKUS.all.includes(product.sku)
      );
    } else if (normalizedCategory === 'الأطفال والرضع') {
      filteredProducts = filteredProducts.filter((product) =>
        ENFANTS_BEBE_SKUS.includes(product.sku)
      );
    } else {
      filteredProducts = filteredProducts.filter((product) => {
        const matchInArray = product.categories && Array.isArray(product.categories) && product.categories.includes(normalizedCategory);
        const matchSingle = product.category === normalizedCategory;
        return matchInArray || matchSingle;
      });
    }
  }

// 2. Filtrage par sous‑catégorie – Ignoré pour la catégorie Enfants & Bébé (verrouillage strict)
if (selectedSubCategory && normalizedCategory !== 'الأطفال والرضع') {
  if (isLessiveSubCategory(selectedSubCategory)) {
    filteredProducts = filteredProducts.filter((product) =>
      MAISON_ENTRETIEN_SKUS.lessive.includes(product.sku)
    );
  } else if (isSolsSubCategory(selectedSubCategory)) {
    filteredProducts = filteredProducts.filter((product) =>
      MAISON_ENTRETIEN_SKUS.sols.includes(product.sku)
    );
  } else if (isDetachantsSubCategory(selectedSubCategory)) {
    filteredProducts = filteredProducts.filter((product) =>
      MAISON_ENTRETIEN_SKUS.detachants.includes(product.sku)
    );
  } else {
    filteredProducts = filteredProducts.filter((product) => {
      if (normalizedCategory !== 'all') {
        const matchCat =
          (product.categories && Array.isArray(product.categories) && product.categories.includes(normalizedCategory)) ||
          product.category === normalizedCategory;
        if (!matchCat) return false;
      }
      const matchInSubArray =
        product.subCategories && Array.isArray(product.subCategories) && product.subCategories.includes(selectedSubCategory);
      const matchSingleSub = product.subCategory === selectedSubCategory;
      return matchInSubArray || matchSingleSub;
    });
  }
}

  // 3. Filtrage en temps réel par mot-clé de recherche
  const trimmedSearch = searchQuery.trim().toLowerCase();
  if (trimmedSearch !== '') {
    filteredProducts = filteredProducts.filter((product) => {
      const matchName = product.name?.toLowerCase().includes(trimmedSearch) || false;
      const matchNameAr = product.nameAr?.toLowerCase().includes(trimmedSearch) || false;
      const matchNameFr = product.nameFr?.toLowerCase().includes(trimmedSearch) || false;
      const matchDesc = product.description?.toLowerCase().includes(trimmedSearch) || false;
      const matchDescAr = product.descriptionAr?.toLowerCase().includes(trimmedSearch) || false;
      const matchDescFr = product.descriptionFr?.toLowerCase().includes(trimmedSearch) || false;
      const matchSku = product.sku?.toLowerCase().includes(trimmedSearch) || false;
      const matchCat = product.category?.toLowerCase().includes(trimmedSearch) || false;
      return matchName || matchNameAr || matchNameFr || matchDesc || matchDescAr || matchDescFr || matchSku || matchCat;
    });
  }

  // Gestion anti-images brisées pour la grille du catalogue
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, productName: string) => {
    const target = e.currentTarget;
    if (target.src.startsWith('data:image')) return;

    const currentSrc = target.src;
    const attempts = target.dataset.attempt ? parseInt(target.dataset.attempt, 10) : 0;
    target.dataset.attempt = (attempts + 1).toString();

    if (attempts === 0 && currentSrc.includes('produit-')) {
      target.src = currentSrc.replace('produit-', 'produits-');
      return;
    }
    if (attempts <= 1 && currentSrc.includes('_')) {
      target.src = currentSrc.replace(/_/g, '-');
      return;
    }
    if (attempts <= 2 && currentSrc.includes('-pearly-creme-fondation')) {
      target.src = currentSrc.replace('-pearly-creme-fondation', '_pearly-creme-fondation');
      return;
    }
    if (attempts <= 3 && currentSrc.endsWith('.jpg')) {
      target.src = currentSrc.replace(/\.jpg$/i, '.png');
      return;
    }

    target.src = `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300" fill="none">
        <rect width="300" height="300" fill="#FAF7F5"/>
        <circle cx="150" cy="125" r="45" fill="#E8C5B8" opacity="0.45"/>
        <text x="150" y="195" font-family="system-ui, sans-serif" font-size="12" fill="#6B5A54" text-anchor="middle" font-weight="500">${productName.slice(0, 22)}</text>
        <text x="150" y="215" font-family="system-ui, sans-serif" font-size="10" fill="#A8948D" text-anchor="middle" letter-spacing="1">BOUCHRA WAY</text>
      </svg>
    `)}`;
  };

  const handleResetSearch = () => {
    if (setSearchQuery) {
      setSearchQuery('');
    }
  };

  const handleResetAll = () => {
    if (setSearchQuery) setSearchQuery('');
    if (setSelectedSubCategory) setSelectedSubCategory(null);
    setSelectedCategory('all');
  };

  return (
    <section 
      className="py-10 bg-[#FDFCFB] relative scroll-mt-20 text-start" 
      id="catalogue" 
      dir={lang === 'fr' ? 'ltr' : 'rtl'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête épuré moderne */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#A8948D] font-normal block mb-1">
            {lang === 'fr' ? 'NOTRE SÉLECTION OFFICIELLE • BOUCHRA WAY MAROC' : 'تشكيلتنا الرسمية • بوشرى واي المغرب'}
          </span>
          {isStandaloneView ? (
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-wide">
              {lang === 'fr' ? 'Sélection de Produits Officiels' : 'تشكيلة المنتجات المميزة'}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-wide">
              {lang === 'fr' ? 'Sélection de Produits Officiels' : 'تشكيلة المنتجات المميزة'}
            </h2>
          )}
          <div className="w-12 h-0.5 bg-[#E6007E] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Indicateur de filtre actif (Sous-catégorie ou Recherche) */}
        {(selectedSubCategory || (normalizedCategory !== 'all')) && (
          <div className="mb-6 max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 bg-pink-50/80 border border-pink-200 rounded-2xl text-xs sm:text-sm text-pink-950">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={15} className="text-[#E6007E] shrink-0" />
              <span className="text-gray-500 font-normal">{lang === 'fr' ? 'Catégorie :' : 'القسم المختار:'}</span>
              <span className="font-bold text-[#E6007E]">
                {getCategoryLabel(normalizedCategory)}
              </span>
              {selectedSubCategory && (
                <>
                  <ChevronLeft size={13} className={`text-gray-400 ${lang === 'fr' ? 'rotate-180' : ''}`} />
                  <span className="font-bold text-pink-900 bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
                    {getSubCategoryLabel(selectedSubCategory)}
                  </span>
                </>
              )}
              <span className="text-[#E6007E] text-xs">({filteredProducts.length} {lang === 'fr' ? 'produits disponibles' : 'منتج متوفر'})</span>
            </div>

            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 text-xs text-[#E6007E] hover:text-pink-950 bg-white hover:bg-pink-100/60 px-3 py-1 rounded-full border border-pink-200 transition cursor-pointer shrink-0"
            >
              <X size={12} />
              <span>{lang === 'fr' ? 'Réinitialiser' : 'إلغاء التصفية'}</span>
            </button>
          </div>
        )}

        {/* Bandeau d'état de recherche en temps réel */}
        {trimmedSearch !== '' && (
          <div className="mb-6 max-w-2xl mx-auto flex items-center justify-between p-3.5 bg-pink-50/70 border border-pink-100 rounded-2xl text-xs sm:text-sm text-pink-900">
            <div className="flex items-center gap-2 truncate">
              <Search size={16} className="text-[#E6007E] shrink-0" />
              <span>
                {lang === 'fr' ? 'Résultats pour :' : 'نتائج البحث عن:'} <strong className="font-semibold text-pink-950">«{searchQuery}»</strong>
                <span className="text-[#E6007E] mx-2">({filteredProducts.length} {lang === 'fr' ? 'produits' : 'منتج'})</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetSearch}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleResetSearch(); } }}
              aria-label={lang === 'fr' ? 'Effacer la recherche' : 'مسح البحث'}
              className="inline-flex items-center gap-1 text-xs text-[#E6007E] hover:text-pink-950 bg-white hover:bg-pink-100/50 px-2.5 py-1 rounded-full border border-pink-200 transition cursor-pointer shrink-0"
            >
              <X size={12} />
              <span>{lang === 'fr' ? 'Effacer la recherche' : 'إلغاء البحث'}</span>
            </button>
          </div>
        )}

        {/* Grille des cartes produits (Design conforme à la maquette - Badges catalogue réels, Favoris, Prix barré officiel, Bouton + PANIER) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
            const discountPercent = hasDiscount
              ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
              : null;
            const isFav = !!favorites[product.id];
            const productName = lang === 'fr' ? (product.nameFr || product.name) : (product.nameAr || product.name);

            return (
              <div 
                key={product.id}
                className="group relative flex flex-col bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300"
              >
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
                  onClick={(e) => toggleFavorite(product.id, e)}
                  aria-pressed={isFav}
                  aria-label={
                    lang === 'fr'
                      ? (isFav ? `Retirer ${productName} des favoris` : `Ajouter ${productName} aux favoris`)
                      : (isFav ? `إزالة ${productName} من المفضلة` : `إضافة ${productName} إلى المفضلة`)
                  }
                  title={
                    lang === 'fr'
                      ? (isFav ? `Retirer ${productName} des favoris` : `Ajouter ${productName} aux favoris`)
                      : (isFav ? `إزالة ${productName} من المفضلة` : `إضافة ${productName} إلى المفضلة`)
                  }
                  className="absolute top-3 end-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white text-gray-400 hover:text-[#E6007E] transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6007E]"
                >
                  <Heart 
                    size={17} 
                    className={isFav ? "fill-[#E6007E] text-[#E6007E]" : "transition-transform group-hover:scale-110"} 
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
                  {/* Cadre Image */}
                  <div className="w-full h-44 sm:h-52 bg-[#FAF7F5] rounded-xl flex items-center justify-center p-3 overflow-hidden relative mb-3">
                    <img
                      src={product.image}
                      alt={product.altText || productName}
                      width={200}
                      height={200}
                      decoding="async"
                      loading="lazy"
                      onError={(e) => handleImageError(e, product.name)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToCart) {
                        onAddToCart(product, 1);
                      } else {
                        onSelectProduct(product);
                      }
                    }}
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
          })}
        </div>

        {/* État vide en cas d'absence de résultat */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 p-8 max-w-lg mx-auto">
            <Search size={40} className="text-gray-300 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-gray-800 mb-2">
              {lang === 'fr' ? 'Aucun produit trouvé' : 'لم يتم العثور على أي منتج'}
            </h4>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              {selectedSubCategory
                ? (lang === 'fr' ? `Aucun produit disponible actuellement dans « ${getSubCategoryLabel(selectedSubCategory)} ». Disponibilité prochaine !` : `لا توجد منتجات مسجلة حالياً في قسم «${getSubCategoryLabel(selectedSubCategory)}». سيتم توفيرها قريباً!`)
                : trimmedSearch !== '' 
                  ? (lang === 'fr' ? `Aucun résultat correspondant à votre recherche « ${searchQuery} » dans cette catégorie.` : `لا توجد نتائج مطابقة لبحثك «${searchQuery}» في هذا القسم.`)
                  : (lang === 'fr' ? 'Aucun produit disponible dans cette catégorie.' : 'لا توجد منتجات متوفرة حالياً في هذا القسم.')}
            </p>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 bg-[#E6007E] hover:bg-[#c9006e] text-white text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer shadow-xs"
            >
              <RotateCcw size={14} />
              <span>{lang === 'fr' ? 'Afficher tous les produits' : 'عرض جميع المنتجات'}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
export default ProductCatalog;

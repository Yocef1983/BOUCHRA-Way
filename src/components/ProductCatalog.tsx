import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';
import { Search, X, RotateCcw, Filter, ChevronLeft } from 'lucide-react';
import { getSubCategoryTranslation } from '../i18n/translations';
import { ProductCard } from './ProductCard';

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
    const trimmed = cat.trim();
    const lower = trimmed.toLowerCase();

    // Enfants & Bébé — toutes variantes (insensible casse/accents via lookup + fallback)
    if (
      trimmed === 'الأطفال والرضع' ||
      trimmed === 'أطفال' ||
      trimmed === 'اطفال' ||
      trimmed === 'الاطفال' ||
      trimmed === 'الرضع' ||
      trimmed === 'الأطفال و الرضع' ||
      lower === 'enfants' ||
      lower === 'enfant' ||
      lower === 'enfants & bébé' ||
      lower === 'enfants & bebe' ||
      lower === 'enfants et bébé' ||
      lower === 'enfants et bebe' ||
      lower === 'enfants-et-bebe' ||
      lower === 'enfants-bebe' ||
      lower === 'enfants_bebe' ||
      lower.includes('enfant') ||
      lower.includes('bébé') ||
      lower.includes('bebe') ||
      lower.includes('أطفال') ||
      lower.includes('اطفال')
    ) {
      return 'الأطفال والرضع';
    }

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
      'Entretien ménagères': 'العناية المنزلية'
    };
    return map[trimmed] || map[lower] || cat;
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
      // Verrouillage strict : seuls les SKU 1574 et 4282
      filteredProducts = filteredProducts.filter((product) =>
        ENFANTS_BEBE_SKUS.includes(String(product.sku ?? '').trim())
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
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              isFavorite={Boolean(favorites[product.id])}
              onToggleFavorite={toggleFavorite}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
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

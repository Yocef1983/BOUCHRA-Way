import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { Eye, Search, X, RotateCcw, Filter, ChevronLeft } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  selectedSubCategory?: string | null;
  setSelectedSubCategory?: (subCategory: string | null) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onSelectProduct,
  selectedCategory: controlledCategory,
  setSelectedCategory: setControlledCategory,
  selectedSubCategory = null,
  setSelectedSubCategory,
  searchQuery = '',
  setSearchQuery
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('all');

  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const setSelectedCategory = setControlledCategory || setInternalCategory;

  // Catégories alignées avec le tableau Excel
  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'parfum', label: 'عطور' },
    { id: 'maquillage', label: 'ماكياج' },
    { id: 'soin-visage', label: 'العناية بالوجه' },
    { id: 'soin-corps', label: 'العناية بالجسم' },
    { id: 'soin-capillaire', label: 'العناية بالشعر' },
    { id: 'hommes', label: 'مستحضرات رجالية' },
    { id: 'accessoires', label: 'مجوهرات و أكسيسوارات' },
    { id: 'enfants', label: 'أطفال' },
    { id: 'menage', label: 'منظفات المنزل' },
  ];

  const getCategoryLabel = (catId: string) => {
    const found = categories.find(c => c.id === catId);
    return found ? found.label : catId;
  };

  // Fonction de filtrage précis par sous-catégorie
  const matchSubCategory = (product: Product, subCat: string): boolean => {
    const text = (product.name + ' ' + product.description + ' ' + (product.altText || '') + ' ' + product.category).toLowerCase();

    switch (subCat) {
      // عطور
      case 'عطر رجالي':
        return product.category === 'parfum' && (text.includes('رجالي') || text.includes('homme'));
      case 'عطر نسائي':
        return product.category === 'parfum' && (text.includes('نسائي') || text.includes('femme'));
      case 'مزيلات العرق':
        return text.includes('مزيل') || text.includes('déodorant') || text.includes('deodorant') || text.includes('عرق');

      // ماكياج
      case 'البشرة':
        return product.category === 'maquillage' && (text.includes('أساس') || text.includes('بشرة') || text.includes('تصحيح') || text.includes('bb'));
      case 'الشفايف':
        return product.category === 'maquillage' && (text.includes('شفاه') || text.includes('شفايف') || text.includes('ملمع') || text.includes('rouge') || text.includes('gloss'));
      case 'الأظافر':
        return product.category === 'maquillage' && (text.includes('أظافر') || text.includes('اظافر') || text.includes('vernis'));
      case 'العيون و الحواجب':
        return product.category === 'maquillage' && (text.includes('ماسكارا') || text.includes('mascara') || text.includes('رموش') || text.includes('عيون') || text.includes('حواجب'));

      // العناية بالوجه
      case 'كريمات':
        return product.category === 'soin-visage' && (text.includes('كريم') || text.includes('مرطب'));
      case 'منظفات الوجه':
        return product.category === 'soin-visage' && (text.includes('لوشن') || text.includes('منظف') || text.includes('غسول') || text.includes('nettoyant'));
      case 'ماسكات':
        return (product.category === 'soin-visage' || product.category === 'soin-capillaire') && (text.includes('ماسك') || text.includes('غاسول') || text.includes('كريمة'));
      case 'حماية الوجه':
        return product.category === 'soin-visage' && (text.includes('حماية') || text.includes('حساسة') || text.includes('شمس') || text.includes('delicate'));

      // العناية بالجسم
      case 'كريمات مرطبة':
        return product.category === 'soin-corps' && (text.includes('مرطب') || text.includes('كريم') || text.includes('ترطيب'));
      case 'زيوت مغذية':
        return product.category === 'soin-corps' && (text.includes('زيت') || text.includes('مغذي') || text.includes('huile'));
      case 'العناية باليدين':
        return product.category === 'soin-corps' && (text.includes('يدين') || text.includes('يد') || text.includes('mains') || text.includes('refine'));
      case 'العناية بالقدمين':
        return product.category === 'soin-corps' && (text.includes('قدم') || text.includes('أقدام') || text.includes('تشققات') || text.includes('ibnosina'));
      case 'مستحضرات الحمام':
        return product.category === 'soin-corps' && (text.includes('حمام') || text.includes('صابون') || text.includes('bain') || text.includes('مزيل'));

      // العناية بالشعر
      case 'شامبو':
        return product.category === 'soin-capillaire' && (text.includes('شامبو') || text.includes('shampoing'));
      case 'ماسكات':
        return product.category === 'soin-capillaire' && (text.includes('ماسك') || text.includes('كريمة') || text.includes('حمام'));
      case 'زيوت و سيرومات':
        return product.category === 'soin-capillaire' && (text.includes('زيت') || text.includes('سيروم') || text.includes('serum') || text.includes('huile'));
      case 'مستلزمات الشعر':
        return product.category === 'soin-capillaire';

      // مستحضرات رجالية
      case 'العناية بالوجه':
        return text.includes('رجالي') || text.includes('homme') || (text.includes('وجه') && text.includes('رجالي'));
      case 'العناية بالجسم':
        return text.includes('رجالي') || text.includes('homme') || text.includes('sporty');
      case 'الحلاقة':
        return text.includes('حلاقة') || text.includes('rasage') || text.includes('barbe');

      // أطفال
      case 'العناية ببشرة الطفل':
        return text.includes('طفل') || text.includes('أطفال') || text.includes('رقيقة');
      case 'العناية بشعر الطفل':
        return text.includes('طفل') || text.includes('أطفال') || (text.includes('شعر') && text.includes('طفل'));
      case 'عطر الأطفال':
        return text.includes('طفل') || text.includes('أطفال') || (text.includes('عطر') && text.includes('طفل'));

      default:
        return text.includes(subCat.toLowerCase());
    }
  };

  // 1. Filtrage principal par catégorie
  let filteredProducts = PRODUCTS;

  if (selectedCategory !== 'all') {
    if (selectedCategory === 'hommes') {
      filteredProducts = PRODUCTS.filter(p => {
        const text = (p.name + ' ' + p.description + ' ' + (p.altText || '')).toLowerCase();
        return text.includes('رجالي') || text.includes('homme');
      });
    } else if (selectedCategory === 'enfants') {
      filteredProducts = PRODUCTS.filter(p => {
        const text = (p.name + ' ' + p.description + ' ' + (p.altText || '')).toLowerCase();
        return text.includes('طفل') || text.includes('أطفال');
      });
    } else if (selectedCategory === 'accessoires') {
      filteredProducts = PRODUCTS.filter(p => {
        const text = (p.name + ' ' + p.description + ' ' + (p.altText || '')).toLowerCase();
        return text.includes('مجوهرات') || text.includes('أكسسوار') || p.category === 'accessoires';
      });
    } else {
      filteredProducts = PRODUCTS.filter(p => p.category === selectedCategory);
    }
  }

  // 2. Filtrage par sous-catégorie sélectionnée
  if (selectedSubCategory) {
    filteredProducts = filteredProducts.filter(p => matchSubCategory(p, selectedSubCategory));
  }

  // 3. Filtrage en temps réel par mot-clé de recherche
  const trimmedSearch = searchQuery.trim().toLowerCase();
  if (trimmedSearch !== '') {
    filteredProducts = filteredProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(trimmedSearch);
      const matchDesc = product.description.toLowerCase().includes(trimmedSearch);
      const matchAlt = product.altText ? product.altText.toLowerCase().includes(trimmedSearch) : false;
      const matchCat = product.category.toLowerCase().includes(trimmedSearch);
      return matchName || matchDesc || matchAlt || matchCat;
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

  const handleCategoryPillClick = (catId: string) => {
    setSelectedCategory(catId);
    if (setSelectedSubCategory) setSelectedSubCategory(null);
  };

  return (
    <section className="py-12 bg-[#FDFCFB] dir-rtl relative scroll-mt-20" id="catalogue" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête épuré moderne (Inspiré beautyforyou.ma) */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#A8948D] font-normal block mb-1">
            NOTRE COLLECTION • MY WAY MAROC
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-wide">
            تشكيلة المنتجات المميزة
          </h2>
          <div className="w-12 h-0.5 bg-[#E8C5B8] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Filtres par catégories (Style pills minimaliste) */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id && !selectedSubCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryPillClick(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#BE185D] text-white font-bold shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-[#F7F2EF] border border-gray-200 font-normal'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Indicateur de filtre actif (Sous-catégorie ou Recherche) */}
        {(selectedSubCategory || (selectedCategory !== 'all' && selectedCategory)) && (
          <div className="mb-6 max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 bg-pink-50/80 border border-pink-200 rounded-2xl text-xs sm:text-sm text-pink-950">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={15} className="text-pink-600 shrink-0" />
              <span className="text-gray-500 font-normal">القسم المختار:</span>
              <span className="font-bold text-[#BE185D]">
                {getCategoryLabel(selectedCategory)}
              </span>
              {selectedSubCategory && (
                <>
                  <ChevronLeft size={13} className="text-gray-400" />
                  <span className="font-bold text-pink-900 bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
                    {selectedSubCategory}
                  </span>
                </>
              )}
              <span className="text-pink-700 text-xs">({filteredProducts.length} منتج متوفر)</span>
            </div>

            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 text-xs text-pink-700 hover:text-pink-950 bg-white hover:bg-pink-100/60 px-3 py-1 rounded-full border border-pink-200 transition cursor-pointer shrink-0"
            >
              <X size={12} />
              <span>إلغاء التصفية</span>
            </button>
          </div>
        )}

        {/* Bandeau d'état de recherche en temps réel */}
        {trimmedSearch !== '' && (
          <div className="mb-6 max-w-2xl mx-auto flex items-center justify-between p-3.5 bg-pink-50/70 border border-pink-100 rounded-2xl text-xs sm:text-sm text-pink-900">
            <div className="flex items-center gap-2 truncate">
              <Search size={16} className="text-pink-600 shrink-0" />
              <span>
                نتائج البحث عن: <strong className="font-semibold text-pink-950">«{searchQuery}»</strong>
                <span className="text-pink-700 mr-2">({filteredProducts.length} منتج)</span>
              </span>
            </div>
            <button
              onClick={handleResetSearch}
              className="inline-flex items-center gap-1 text-xs text-pink-700 hover:text-pink-950 bg-white hover:bg-pink-100/50 px-2.5 py-1 rounded-full border border-pink-200 transition cursor-pointer shrink-0"
            >
              <X size={12} />
              <span>إلغاء البحث</span>
            </button>
          </div>
        )}

        {/* Grille des produits cliquables sans bouton d'achat direct */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col bg-white p-3 sm:p-4 rounded-2xl border border-[#F2ECE8] hover:border-[#E8C5B8] hover:shadow-md transition-all duration-300 relative"
            >
              {/* Cadre Image épuré */}
              <div className="w-full h-48 sm:h-56 bg-[#FAF7F5] rounded-xl flex items-center justify-center p-4 overflow-hidden relative mb-3">
                <img
                  src={product.image}
                  alt={product.altText || product.name}
                  loading="lazy"
                  onError={(e) => handleImageError(e, product.name)}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge visuel discret au survol */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 font-normal transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye size={12} />
                    عرض التفاصيل
                  </span>
                </div>
              </div>

              {/* Informations Produit (Nom et Prix en GRAS dans la couleur rose/bordeaux de la marque) */}
              <div className="flex flex-col flex-1 justify-between text-center mt-1">
                <h3 className="text-xs sm:text-sm font-normal text-gray-800 line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-[#BE185D] transition-colors">
                  {product.name}
                </h3>
                {/* Prix en GRAS et dans la couleur rose/bordeaux de la marque */}
                <div className="text-base sm:text-lg font-bold text-[#BE185D] mt-auto pt-2 border-t border-gray-50 flex items-center justify-center gap-1">
                  <span>{product.price}.00</span>
                  <span className="text-xs font-bold text-[#BE185D]">DH</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* État vide en cas d'absence de résultat */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 p-8 max-w-lg mx-auto">
            <Search size={40} className="text-gray-300 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-gray-800 mb-2">
              لم يتم العثور على أي منتج
            </h4>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              {selectedSubCategory
                ? `لا توجد منتجات مسجلة حالياً في قسم «${selectedSubCategory}». سيتم توفيرها قريباً!`
                : trimmedSearch !== '' 
                  ? `لا توجد نتائج مطابقة لبحثك «${searchQuery}» في هذا القسم.`
                  : 'لا توجد منتجات متوفرة حالياً في هذا القسم.'}
            </p>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-bold px-5 py-2.5 rounded-full transition cursor-pointer shadow-xs"
            >
              <RotateCcw size={14} />
              <span>عرض جميع المنتجات</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

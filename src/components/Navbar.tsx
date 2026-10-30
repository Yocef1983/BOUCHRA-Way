import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Phone, UserPlus, Home, Layers, MessageSquare, X, Menu, ChevronLeft, ChevronDown, Sparkles, Check, Gem, Baby, Sparkle } from 'lucide-react';

export interface SubCategoryItem {
  label: string;
  categoryId: string;
}

export interface NavCategoryItem {
  id: string;
  label: string;
  categoryId: string;
  isDirectLink?: boolean;
  directHref?: string;
  subCategories?: SubCategoryItem[];
}

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubCategory?: string | null;
  setSelectedSubCategory?: (subCategory: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateHome?: () => void;
  onNavigateToCatalog?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onSelectSubCategory?: (category: string, subCategory: string) => void;
  cartCount?: number;
}

export default function Navbar({ 
  selectedCategory, 
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  searchQuery, 
  setSearchQuery,
  onNavigateHome,
  onNavigateToCatalog,
  onNavigateSection,
  onSelectSubCategory,
  cartCount = 0 
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Définition exacte des rubriques selon le tableau Excel dans l'ordre strict demandé
  const menuCategories: NavCategoryItem[] = [
    {
      id: 'parfum',
      label: 'عطور',
      categoryId: 'parfum',
      subCategories: [
        { label: 'عطر رجالي', categoryId: 'parfum' },
        { label: 'عطر نسائي', categoryId: 'parfum' },
        { label: 'مزيلات العرق', categoryId: 'parfum' },
      ]
    },
    {
      id: 'maquillage',
      label: 'ماكياج',
      categoryId: 'maquillage',
      subCategories: [
        { label: 'البشرة', categoryId: 'maquillage' },
        { label: 'الشفايف', categoryId: 'maquillage' },
        { label: 'الأظافر', categoryId: 'maquillage' },
        { label: 'العيون و الحواجب', categoryId: 'maquillage' },
      ]
    },
    {
      id: 'soin-visage',
      label: 'العناية بالوجه',
      categoryId: 'soin-visage',
      subCategories: [
        { label: 'كريمات', categoryId: 'soin-visage' },
        { label: 'منظفات الوجه', categoryId: 'soin-visage' },
        { label: 'ماسكات', categoryId: 'soin-visage' },
        { label: 'حماية الوجه', categoryId: 'soin-visage' },
      ]
    },
    {
      id: 'soin-corps',
      label: 'العناية بالجسم',
      categoryId: 'soin-corps',
      subCategories: [
        { label: 'كريمات مرطبة', categoryId: 'soin-corps' },
        { label: 'زيوت مغذية', categoryId: 'soin-corps' },
        { label: 'العناية باليدين', categoryId: 'soin-corps' },
        { label: 'العناية بالقدمين', categoryId: 'soin-corps' },
        { label: 'مستحضرات الحمام', categoryId: 'soin-corps' },
      ]
    },
    {
      id: 'soin-capillaire',
      label: 'العناية بالشعر',
      categoryId: 'soin-capillaire',
      subCategories: [
        { label: 'شامبو', categoryId: 'soin-capillaire' },
        { label: 'ماسكات', categoryId: 'soin-capillaire' },
        { label: 'زيوت و سيرومات', categoryId: 'soin-capillaire' },
        { label: 'مستلزمات الشعر', categoryId: 'soin-capillaire' },
      ]
    },
    {
      id: 'hommes',
      label: 'مستحضرات رجالية',
      categoryId: 'hommes',
      subCategories: [
        { label: 'العناية بالوجه', categoryId: 'hommes' },
        { label: 'العناية بالجسم', categoryId: 'hommes' },
        { label: 'الحلاقة', categoryId: 'hommes' },
      ]
    },
    {
      id: 'accessoires',
      label: 'مجوهرات و أكسيسوارات',
      categoryId: 'accessoires',
      isDirectLink: true
    },
    {
      id: 'enfants',
      label: 'أطفال',
      categoryId: 'enfants',
      subCategories: [
        { label: 'العناية ببشرة الطفل', categoryId: 'enfants' },
        { label: 'العناية بشعر الطفل', categoryId: 'enfants' },
        { label: 'عطر الأطفال', categoryId: 'enfants' },
      ]
    },
    {
      id: 'menage',
      label: 'منظفات المنزل',
      categoryId: 'menage',
      isDirectLink: true
    }
  ];

  // Verrouillage du scroll en arrière-plan lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Fermeture du menu à l'aide de la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setHoveredCategory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setHoveredCategory(null);
  };

  const handleHomeClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedCategory('all');
    if (setSelectedSubCategory) setSelectedSubCategory(null);
    setSearchQuery('');
    closeMenu();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAllProductsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedCategory('all');
    if (setSelectedSubCategory) setSelectedSubCategory(null);
    setSearchQuery('');
    closeMenu();
    if (onNavigateToCatalog) {
      onNavigateToCatalog();
    } else {
      const el = document.getElementById('catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMainCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (setSelectedSubCategory) setSelectedSubCategory(null);
    closeMenu();
    if (onNavigateToCatalog) {
      onNavigateToCatalog();
    } else {
      const el = document.getElementById('catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubCategorySelect = (categoryId: string, subCategoryLabel: string) => {
    if (onSelectSubCategory) {
      onSelectSubCategory(categoryId, subCategoryLabel);
    } else {
      setSelectedCategory(categoryId);
      if (setSelectedSubCategory) setSelectedSubCategory(subCategoryLabel);
      if (onNavigateToCatalog) {
        onNavigateToCatalog();
      } else {
        const el = document.getElementById('catalogue');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMenu();
  };

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    closeMenu();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans dir-rtl" dir="rtl">
      {/* شريط الإشعارات العلوي */}
      <div className="bg-pink-700 text-white text-xs py-1.5 px-4 text-center font-medium">
        ✨ انضمي إلى عائلة بوشرى واي اليوم واحصلي على خصومات تصل إلى 50% وتوصيل لجميع مناطق المغرب!
      </div>

      {/* الرأس الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* زر القائمة للهواتف الذكية (Hamburger) + الشعار */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:text-pink-700 hover:bg-pink-50 transition cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a href="#" onClick={handleHomeClick} className="text-right cursor-pointer">
            <h1 className="text-xl sm:text-2xl font-bold text-pink-700 tracking-wide">BOUCHRA WAY</h1>
            <p className="text-[10px] sm:text-xs text-purple-800 font-semibold">عائلة واحدة - فرصة نجاح</p>
          </a>
        </div>

        {/* البحث السريع النشط (سطح المكتب) */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن منتجات العناية، المكياج، أو المنظفات..."
            className="w-full pl-9 pr-10 py-2 border border-pink-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/30 text-right transition"
          />
          <Search className="absolute right-3.5 top-2.5 text-pink-400 w-4 h-4 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              aria-label="مسح البحث"
              className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-700 bg-gray-200/80 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs transition cursor-pointer"
            >
              <X size={10} />
            </button>
          )}
        </div>

        {/* أيقونات الإجراءات */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/212634486494?text=مرحباً%20بوشرى%20واي،%20أود%20التواصل%20والاستفسار%20عن%20المنتجات"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 sm:px-3.5 py-2 rounded-full font-semibold transition shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">واتساب</span>
          </a>

          <div 
            onClick={handleAllProductsClick}
            title="السلة والتسوق"
            className="relative cursor-pointer p-2 bg-pink-50 rounded-full text-pink-700 hover:bg-pink-100 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* البحث السريع على الهواتف الذكية */}
      <div className="md:hidden px-4 pb-2.5 pt-0.5">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن منتج بالاسم أو القسم..."
            className="w-full pl-8 pr-9 py-1.5 border border-pink-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/40 text-right"
          />
          <Search className="absolute right-3 top-2 text-pink-400 w-3.5 h-3.5 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              aria-label="مسح البحث"
              className="absolute left-2.5 top-1.5 text-gray-400 hover:text-gray-700 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
            >
              <X size={10} />
            </button>
          )}
        </div>
      </div>

      {/* شريط التنقل لسطح المكتب (Desktop) مع القوائم المنسدلة الاحترافية عند التمرير بالماوس */}
      <nav className="hidden md:block bg-pink-50/90 border-t border-b border-pink-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-2 lg:px-4">
          <ul className="flex items-center justify-start lg:justify-center gap-0.5 lg:gap-1.5 py-1 text-[11px] lg:text-xs xl:text-[13px] font-semibold text-gray-700 whitespace-nowrap overflow-x-auto lg:overflow-visible">
            
            {/* 1. الصفحة الرئيسية */}
            <li>
              <button 
                onClick={handleHomeClick} 
                className={`px-2.5 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/60 transition flex items-center gap-1 cursor-pointer ${selectedCategory === 'all' && !searchQuery && !selectedSubCategory ? 'text-pink-700 font-bold bg-pink-100/40' : ''}`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>الصفحة الرئيسية</span>
              </button>
            </li>

            {/* 2. كل المنتجات */}
            <li>
              <button 
                onClick={handleAllProductsClick} 
                className="px-2.5 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/60 transition flex items-center gap-1 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>كل المنتجات</span>
              </button>
            </li>

            {/* 3 -> 11. الأقسام المستخرجة من جدول الإكسيل بالترتيب المحدد */}
            {menuCategories.map((category) => {
              const hasSubCategories = category.subCategories && category.subCategories.length > 0;
              const isHovered = hoveredCategory === category.id;
              const isCategoryActive = selectedCategory === category.categoryId;

              if (category.isDirectLink || !hasSubCategories) {
                // أقسام مباشرة بدون قائمة منسدلة (مجوهرات و أكسيسوارات، منظفات المنزل)
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => handleMainCategoryClick(category.categoryId)}
                      className={`px-2.5 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/60 transition cursor-pointer ${
                        isCategoryActive
                          ? 'text-pink-700 font-bold bg-pink-100/70'
                          : 'text-gray-700'
                      }`}
                    >
                      {category.label}
                    </button>
                  </li>
                );
              }

              // أقسام مع قائمة منسدلة عند التمرير (Hover Dropdown)
              return (
                <li
                  key={category.id}
                  className="relative group py-1"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleMainCategoryClick(category.categoryId)}
                    className={`px-2.5 py-2 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                      isCategoryActive
                        ? 'text-pink-700 font-bold bg-pink-100/70'
                        : 'text-gray-700 hover:text-pink-700 hover:bg-pink-100/60'
                    }`}
                    aria-haspopup="menu"
                    aria-expanded={isHovered}
                    aria-controls={`dropdown-${category.id}`}
                  >
                    <span>{category.label}</span>
                    <ChevronDown 
                      size={12} 
                      className={`text-gray-400 group-hover:text-pink-600 transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-pink-600' : ''
                      }`} 
                    />
                  </button>

                  {/* القائمة المنسدلة المنبثقة (Dropdown Desktop) */}
                  <div 
                    id={`dropdown-${category.id}`}
                    className={`absolute top-full right-0 pt-1.5 min-w-[210px] z-50 transition-all duration-200 ease-out origin-top-right ${
                      isHovered 
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                        : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    }`}
                    role="menu"
                    aria-label={category.label}
                  >
                    <div className="bg-white rounded-2xl shadow-xl shadow-pink-950/10 border border-pink-100 p-2 text-right overflow-hidden">
                      {/* رأس القائمة */}
                      <div className="px-3 py-1.5 mb-1 border-b border-gray-100 flex items-center justify-between text-[11px] text-pink-700 font-bold bg-pink-50/60 rounded-lg">
                        <span>{category.label}</span>
                        <Sparkles size={12} className="text-pink-500" />
                      </div>

                      {/* عناصر القائمة المنسدلة (الفرعية) */}
                      <div className="space-y-0.5">
                        {category.subCategories.map((subItem, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSubCategorySelect(subItem.categoryId, subItem.label)}
                            className="w-full text-right px-3 py-2 rounded-xl text-xs text-gray-700 hover:text-pink-700 hover:bg-pink-50 transition flex items-center justify-between group/sub cursor-pointer"
                          >
                            <span>{subItem.label}</span>
                            <ChevronLeft size={13} className="text-gray-300 group-hover/sub:text-pink-600 transition-transform group-hover/sub:-translate-x-0.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* 12. إنضم إلينا : رابط مباشر إلى #opportunity */}
            <li>
              <a 
                href="#opportunity" 
                onClick={(e) => handleSectionClick(e, 'opportunity')}
                className="px-2.5 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/60 transition flex items-center gap-1 text-purple-900 font-bold cursor-pointer"
              >
                <span>إنضم إلينا</span>
                <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">فرصة</span>
              </a>
            </li>

            {/* 13. تواصل معنا : رابط مباشر إلى #contact / الواتساب */}
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleSectionClick(e, 'contact')}
                className="px-2.5 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>تواصل معنا</span>
              </a>
            </li>

          </ul>
        </div>
      </nav>

      {/* القائمة الجانبية المنبثقة للهواتف الذكية (Menu Hamburger Mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* خلفية معتمة تتيح الإغلاق السهل عند النقر في أي مكان */}
          <div 
            onClick={closeMenu}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* لوحة القائمة المنزلقة من اليمين (RTL) */}
          <aside className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col p-5 overflow-y-auto transform transition-transform duration-300 ease-out">
            
            {/* ترويسة القائمة مع زر الإغلاق الواضح */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <span className="text-lg font-bold text-pink-700">BOUCHRA WAY</span>
                <span className="block text-[11px] text-gray-500 font-medium">ماي واي المغرب</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="إغلاق القائمة"
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* روابط البداية الرئيسية */}
            <div className="mb-4 space-y-1">
              <button
                onClick={() => handleHomeClick()}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-800 hover:bg-pink-50 hover:text-pink-700 font-medium text-xs sm:text-sm text-right"
              >
                <Home size={16} className="text-pink-600" />
                <span>الصفحة الرئيسية</span>
              </button>
              <button
                onClick={() => handleAllProductsClick()}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-800 hover:bg-pink-50 hover:text-pink-700 font-medium text-xs sm:text-sm text-right"
              >
                <Layers size={16} className="text-pink-600" />
                <span>كل المنتجات (عرض الكتالوج)</span>
              </button>
            </div>

            {/* الأقسام والفئات حسب جدول الإكسيل (Mobile Accordion) */}
            <div className="mb-6 border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-pink-600" />
                  <span>أقسام وفئات المنتجات</span>
                </span>
              </div>

              <div className="space-y-1.5">
                {menuCategories.map((category) => {
                  const hasSubCategories = category.subCategories && category.subCategories.length > 0;
                  const isExpanded = expandedMobileCategory === category.id;
                  const isCategoryActive = selectedCategory === category.categoryId;

                  if (category.isDirectLink || !hasSubCategories) {
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleMainCategoryClick(category.categoryId)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-right border ${
                          isCategoryActive
                            ? 'bg-pink-50 border-pink-200 text-pink-900 font-bold'
                            : 'border-gray-100 text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <span>{category.label}</span>
                        <ChevronLeft size={14} className="text-gray-400" />
                      </button>
                    );
                  }

                  return (
                    <div key={category.id} className="rounded-xl border border-gray-100 overflow-hidden bg-white">
                      {/* زر العنوان الرئيسي للقسم */}
                      <button
                        type="button"
                        onClick={() => setExpandedMobileCategory(isExpanded ? null : category.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-medium transition cursor-pointer text-right ${
                          isCategoryActive
                            ? 'bg-pink-50 text-pink-900 font-bold'
                            : 'text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{category.label}</span>
                          <span className="text-[10px] text-gray-400">({category.subCategories.length})</span>
                        </span>
                        <ChevronDown 
                          size={15} 
                          className={`text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-pink-600' : ''
                          }`} 
                        />
                      </button>

                      {/* قائمة العناصر الفرعية للهاتف */}
                      {isExpanded && (
                        <div className="bg-pink-50/40 p-2 space-y-1 border-t border-pink-100/50">
                          {category.subCategories.map((subItem, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSubCategorySelect(subItem.categoryId, subItem.label)}
                              className="w-full text-right px-3 py-1.5 rounded-lg text-xs text-gray-700 hover:text-pink-700 hover:bg-white transition flex items-center justify-between cursor-pointer"
                            >
                              <span>{subItem.label}</span>
                              <ChevronLeft size={13} className="text-gray-300" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* الروابط المباشرة السريعة (إنضم إلينا وتواصل معنا) */}
            <div className="mb-6 border-t border-gray-100 pt-4 space-y-2">
              <a
                href="#opportunity"
                onClick={(e) => handleSectionClick(e, 'opportunity')}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-800 bg-amber-50/70 border border-amber-200/60 font-semibold text-xs sm:text-sm transition"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-600" />
                  <span>إنضم إلينا (فرصة زيادة الدخل)</span>
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full font-bold">فرصة</span>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleSectionClick(e, 'contact')}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-white bg-pink-600 hover:bg-pink-700 font-semibold text-xs sm:text-sm transition"
              >
                <span className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>تواصل معنا (السياسات وخدمة الزبناء)</span>
                </span>
              </a>
            </div>

            {/* زر التواصل المباشر السريع أسفل القائمة */}
            <div className="mt-auto border-t border-gray-100 pt-4 text-center">
              <a
                href="https://wa.me/212634486494?text=مرحباً%20بوشرى%20واي،%20أود%20التواصل%20والاستفسار%20عن%20المنتجات"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-sm transition"
              >
                <Phone size={15} />
                <span>واتساب مباشر: 06 34 48 64 94</span>
              </a>
              <p className="text-[10px] text-gray-400 mt-2 font-normal">
                الدفع عند الاستلام • التوصيل لجميع مناطق المغرب
              </p>
            </div>

          </aside>
        </div>
      )}
    </header>
  );
}

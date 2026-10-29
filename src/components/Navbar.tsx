import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Phone, UserPlus, Home, Layers, MessageSquare, X, Menu, ChevronLeft, ChevronDown, Sparkles, Check, Heart, ShieldCheck } from 'lucide-react';

interface SubCategoryItem {
  label: string;
  query?: string;
  categoryId: string;
}

interface NavCategoryDropdown {
  id: string;
  label: string;
  categoryId: string;
  items: SubCategoryItem[];
}

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateHome?: () => void;
  onNavigateToCatalog?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  cartCount?: number;
}

export default function Navbar({ 
  selectedCategory, 
  setSelectedCategory, 
  searchQuery, 
  setSearchQuery,
  onNavigateHome,
  onNavigateToCatalog,
  onNavigateSection,
  cartCount = 0 
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Configuration des catégories avec sous-catégories pour le menu déroulant
  const navDropdowns: NavCategoryDropdown[] = [
    {
      id: 'maquillage',
      label: 'المكياج',
      categoryId: 'maquillage',
      items: [
        { label: 'كريم الأساس والـ BB', query: 'كريم الأساس', categoryId: 'maquillage' },
        { label: 'الماسكارا وكحل العيون', query: 'ماسكارا', categoryId: 'maquillage' },
        { label: 'أحمر وملمع الشفاه', query: 'الشفاه', categoryId: 'maquillage' },
        { label: 'أقلام تصحيح عيوب البشرة', query: 'قلم تصحيح', categoryId: 'maquillage' },
        { label: 'عرض جميع مستحضرات المكياج', categoryId: 'maquillage' },
      ]
    },
    {
      id: 'soins',
      label: 'العناية والجمال',
      categoryId: 'soin-visage',
      items: [
        { label: 'ترطيب وتغذية بشرة الوجه', query: 'مرطب', categoryId: 'soin-visage' },
        { label: 'علاج حب الشباب وتنقية البشرة', query: 'حب الشباب', categoryId: 'soin-visage' },
        { label: 'تفتيح المناطق الحساسة والداكنة', query: 'المناطق الحساسة', categoryId: 'soin-corps' },
        { label: 'كريمات اليدين ومزيلات العرق', query: 'اليدين', categoryId: 'soin-corps' },
        { label: 'كريمات ما بعد التعرض للشمس', query: 'الشمس', categoryId: 'soin-corps' },
        { label: 'عرض كل منتجات العناية بالبشرة', categoryId: 'soin-visage' },
      ]
    },
    {
      id: 'cheveux',
      label: 'العناية بالشعر',
      categoryId: 'soin-capillaire',
      items: [
        { label: 'علاج تساقط الشعر بالثوم الطبيعي', query: 'تساقط الشعر', categoryId: 'soin-capillaire' },
        { label: 'زيوت ترطيب جوز الهند والسمسم', query: 'زيت', categoryId: 'soin-capillaire' },
        { label: 'شامبوهات وحمامات كريم مغذية', query: 'شامبو', categoryId: 'soin-capillaire' },
        { label: 'سيروم إصلاح وتجديد الشعر', query: 'سيروم', categoryId: 'soin-capillaire' },
        { label: 'عرض جميع منتجات الشعر', categoryId: 'soin-capillaire' },
      ]
    },
    {
      id: 'parfums',
      label: 'العطور الراقية',
      categoryId: 'parfum',
      items: [
        { label: 'عطور نسائية فخمة (كريستال، فيحاء...)', query: 'نسائي', categoryId: 'parfum' },
        { label: 'عطور رجالية مميزة (كلاسيك، وان...)', query: 'رجالي', categoryId: 'parfum' },
        { label: 'عطور سبورتي والانتعاش اليومي', query: 'سبورتي', categoryId: 'parfum' },
        { label: 'عطر ماي واي الأيقوني', query: 'ماي واي', categoryId: 'parfum' },
        { label: 'عرض جميع تشكيلات العطور', categoryId: 'parfum' },
      ]
    },
    {
      id: 'menage',
      label: 'المنظفات والمنزل',
      categoryId: 'menage',
      items: [
        { label: 'بخاخ إزالة الدهون القوي للمطبخ', query: 'الدهون', categoryId: 'menage' },
        { label: 'مساحيق وجل الغسيل الفعال', query: 'الغسيل', categoryId: 'menage' },
        { label: 'منظفات الأرضيات متعددة الاستعمال', query: 'الأرضيات', categoryId: 'menage' },
        { label: 'بخاخ تنظيف وتلميع الخشب', query: 'الخشب', categoryId: 'menage' },
        { label: 'عجينة الهلوبة السحرية للتنظيف', query: 'الهلوبة', categoryId: 'menage' },
        { label: 'عرض كل المنظفات المنزلية', categoryId: 'menage' },
      ]
    },
    {
      id: 'complements',
      label: 'المكملات والرشاقة',
      categoryId: 'all',
      items: [
        { label: 'شاي الأعشاب للتنحيف والرشاقة', query: 'شاي', categoryId: 'all' },
        { label: 'منتجات الطاقة والحيوية الطبيعية', query: 'طبيعي', categoryId: 'all' },
        { label: 'العناية بالصحة والرفاهية اليومية', query: 'صحة', categoryId: 'all' },
        { label: 'عرض جميع المكملات والرشاقة', categoryId: 'all' },
      ]
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
    setSearchQuery('');
    closeMenu();
    if (onNavigateToCatalog) {
      onNavigateToCatalog();
    } else {
      const el = document.getElementById('catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubCategoryClick = (categoryId: string, query?: string) => {
    setSelectedCategory(categoryId);
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }
    closeMenu();
    if (onNavigateToCatalog) {
      onNavigateToCatalog();
    } else {
      const el = document.getElementById('catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
      <nav className="hidden md:block bg-pink-50/90 border-t border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-1 lg:gap-3 py-1 text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
            
            {/* الصفحة الرئيسية */}
            <li>
              <button 
                onClick={handleHomeClick} 
                className={`px-3 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/50 transition flex items-center gap-1 cursor-pointer ${selectedCategory === 'all' && !searchQuery ? 'text-pink-700 font-bold' : ''}`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </button>
            </li>

            {/* جميع المنتجات */}
            <li>
              <button 
                onClick={handleAllProductsClick} 
                className="px-3 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/50 transition flex items-center gap-1 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>كل المنتجات</span>
              </button>
            </li>

            {/* الفئات الرئيسية مع Dropdown عند التمرير (Hover Dropdown) */}
            {navDropdowns.map((category) => {
              const isHovered = hoveredCategory === category.id;
              const isCategoryActive = selectedCategory === category.categoryId;

              return (
                <li
                  key={category.id}
                  className="relative group py-1"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* زر الفئة الرئيسية */}
                  <button
                    type="button"
                    onClick={() => handleSubCategoryClick(category.categoryId)}
                    className={`px-3 py-2 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                      isCategoryActive
                        ? 'text-pink-700 font-bold bg-pink-100/70'
                        : 'text-gray-700 hover:text-pink-700 hover:bg-pink-100/50'
                    }`}
                  >
                    <span>{category.label}</span>
                    <ChevronDown 
                      size={13} 
                      className={`text-gray-400 group-hover:text-pink-600 transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-pink-600' : ''
                      }`} 
                    />
                  </button>

                  {/* القائمة المنسدلة المنبثقة (Dropdown Desktop) */}
                  <div 
                    className={`absolute top-full right-0 pt-1.5 w-60 z-50 transition-all duration-200 ease-out origin-top-right ${
                      isHovered 
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                        : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl shadow-pink-950/10 border border-pink-100 p-2.5 text-right overflow-hidden">
                      {/* رأس القائمة */}
                      <div className="px-3 py-1.5 mb-1.5 border-b border-gray-100 flex items-center justify-between text-[11px] text-pink-700 font-bold bg-pink-50/50 rounded-lg">
                        <span>{category.label}</span>
                        <Sparkles size={12} className="text-pink-500" />
                      </div>

                      {/* عناصر القائمة المنسدلة */}
                      <div className="space-y-0.5">
                        {category.items.map((subItem, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSubCategoryClick(subItem.categoryId, subItem.query)}
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

            {/* زود دخلك */}
            <li>
              <a 
                href="#opportunity" 
                onClick={(e) => handleSectionClick(e, 'opportunity')}
                className="px-3 py-2 rounded-lg hover:text-pink-700 hover:bg-pink-100/50 transition flex items-center gap-1 text-purple-900 font-bold"
              >
                <span>زود دخلك</span>
                <span className="text-[10px] bg-amber-200/80 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">فرصة</span>
              </a>
            </li>

            {/* إنضم إلينا */}
            <li>
              <a 
                href="#register" 
                onClick={(e) => handleSectionClick(e, 'register')}
                className="px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold transition flex items-center gap-1 shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>إنضم إلينا</span>
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

            {/* الأقسام والفئات مع القوائم الفرعية (Mobile Accordion) */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-pink-600" />
                  <span>تصفح حسب الأقسام</span>
                </span>
                <button
                  onClick={handleAllProductsClick}
                  className="text-pink-600 hover:underline text-[11px] font-semibold"
                >
                  عرض الكل
                </button>
              </div>

              <div className="space-y-1.5">
                {navDropdowns.map((category) => {
                  const isExpanded = expandedMobileCategory === category.id;
                  const isCategoryActive = selectedCategory === category.categoryId;

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
                          <span className="text-[10px] text-gray-400">({category.items.length})</span>
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
                          {category.items.map((subItem, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSubCategoryClick(subItem.categoryId, subItem.query)}
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

            {/* روابط الصفحات والخدمات */}
            <div className="mb-6 border-t border-gray-100 pt-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                روابط سريعة
              </span>
              <ul className="space-y-1 text-xs sm:text-sm font-medium">
                <li>
                  <button
                    onClick={() => handleHomeClick()}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-pink-700 transition text-right"
                  >
                    <Home size={16} className="text-pink-600" />
                    <span>الصفحة الرئيسية</span>
                  </button>
                </li>
                <li>
                  <a
                    href="#opportunity"
                    onClick={(e) => handleSectionClick(e, 'opportunity')}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-pink-700 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles size={16} className="text-amber-500" />
                      <span>زود دخلك مع ماي واي</span>
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">فرصة</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#register"
                    onClick={(e) => handleSectionClick(e, 'register')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white font-bold bg-pink-600 hover:bg-pink-700 transition"
                  >
                    <UserPlus size={16} />
                    <span>استمارة التسجيل في الفريق</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/212634486494?text=مرحباً%20بوشرى%20واي،%20أود%20الانضمام%20إلى%20مجتمع%20وفريق%20بوشرى%20واي%20(المنتدى)"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-pink-700 transition"
                  >
                    <MessageSquare size={16} className="text-purple-600" />
                    <span>مجتمع بوشرى واي (المنتدى)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleSectionClick(e, 'contact')}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-pink-700 transition"
                  >
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>سياسات التوصيل والدفع عند الاستلام</span>
                  </a>
                </li>
              </ul>
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
                <span>تواصل معنا عبر واتساب</span>
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

import { ShoppingBag, Search, Phone, UserPlus, Home, Layers, MessageSquare } from 'lucide-react';

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cartCount?: number;
}

export default function Navbar({ selectedCategory, setSelectedCategory, cartCount = 0 }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans dir-rtl" dir="rtl">
      {/* شريط الإشعارات العلوي */}
      <div className="bg-pink-700 text-white text-xs py-1.5 px-4 text-center font-medium">
        ✨ انضمي إلى عائلة بوشرى واي اليوم واحصلي على خصومات تصل إلى 50% وتوصيل لجميع مدن المغرب!
      </div>

      {/* الرأس الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* الشعار */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-pink-700 tracking-wide">BOUCHRA WAY</h1>
            <p className="text-xs text-purple-800 font-semibold">عائلة واحدة - فرصة نجاح</p>
          </div>
        </div>

        {/* البحث السريع */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="ابحثي عن منتجات العناية، المكياج، أو المنظفات..."
            className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/30 text-right"
          />
          <Search className="absolute left-3 top-2.5 text-pink-400 w-4 h-4" />
        </div>

        {/* أيقونات الإجراءات */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-2 rounded-full font-semibold transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </a>

          <div className="relative cursor-pointer p-2 bg-pink-50 rounded-full text-pink-700 hover:bg-pink-100 transition">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* قائمة التنقل الرئيسية (باللغة العربية فقط) */}
      <nav className="bg-pink-50 border-t border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <ul className="flex items-center justify-center gap-6 py-2.5 text-sm font-bold text-gray-700 whitespace-nowrap">
            <li>
              <button 
                onClick={() => setSelectedCategory('all')} 
                className={`hover:text-pink-600 transition flex items-center gap-1 ${selectedCategory === 'all' ? 'text-pink-700 border-b-2 border-pink-700 pb-0.5' : ''}`}
              >
                <Home className="w-4 h-4" />
                الصفحة الرئيسية
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSelectedCategory('maquillage')} 
                className={`hover:text-pink-600 transition flex items-center gap-1 ${selectedCategory === 'maquillage' ? 'text-pink-700 border-b-2 border-pink-700 pb-0.5' : ''}`}
              >
                <Layers className="w-4 h-4" />
                منتجاتنا
              </button>
            </li>
            <li>
              <a href="#opportunity" className="hover:text-pink-600 transition">زود دخلك</a>
            </li>
            <li>
              <a href="#register" className="hover:text-pink-600 transition flex items-center gap-1 text-pink-700">
                <UserPlus className="w-4 h-4" />
                إنضم إلينا
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-pink-600 transition">طلب شراء لغير الأعضاء</a>
            </li>
            <li>
              <a href="#community" className="hover:text-pink-600 transition flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                المنتدى
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-pink-600 transition">تواصل معنا</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccess } from './components/OrderSuccess';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { Product } from './data/products';
import { CartItem, CompletedOrder } from './types/cart';
import { CheckCircle2, Gift, Users, BookOpen, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // État explicite pour contrôler l'affichage de la page d'accueil vs le catalogue
  const [showHome, setShowHome] = useState<boolean>(true);

  // État du panier et de la navigation du tunnel d'achat
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bw_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'main' | 'checkout' | 'success'>('main');
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Sauvegarde automatique du panier dans le stockage local
  useEffect(() => {
    try {
      localStorage.setItem('bw_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignorer si stockage non disponible
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Gestion de l'ajout au panier
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });
    // Ouvre le tiroir panier latéral pour un retour visuel direct
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setSelectedProduct(null);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: CompletedOrder) => {
    setCompletedOrder(order);
    setCartItems([]);
    try {
      localStorage.removeItem('bw_cart_items');
    } catch {
      // Ignorer
    }
    setCurrentView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueShopping = () => {
    setCurrentView('main');
    setShowHome(false);
    setSelectedProduct(null);
    setCompletedOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setCurrentView('main');
    setShowHome(false);
    const normalizedCategory = (category === 'كل المنتجات' || category === 'all') ? 'all' : category;
    setSelectedCategory(normalizedCategory);
    setSelectedSubCategory(null);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleSubCategorySelect = (category: string, subCategory: string) => {
    setCurrentView('main');
    setShowHome(false);
    const normalizedCategory = category === 'كل المنتجات' ? 'all' : category;
    setSelectedCategory(normalizedCategory);
    setSelectedSubCategory(subCategory);
    setSearchQuery('');
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    setTimeout(() => {
      const el = document.getElementById('catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSearchChange = (query: string) => {
    setCurrentView('main');
    if (query.trim() !== '') {
      setShowHome(false);
    }
    setSearchQuery(query);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setCurrentView('main');
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('main');
    setShowHome(true);
    setSelectedProduct(null);
    setSelectedCategory('all');
    setSelectedSubCategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCatalog = () => {
    setCurrentView('main');
    setShowHome(false);
    setSelectedProduct(null);
    setSelectedCategory('all');
    setSelectedSubCategory(null);
    setSearchQuery('');
    setTimeout(() => {
      const el = document.getElementById('catalogue');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleNavigateSection = (sectionId: string) => {
    setCurrentView('main');
    setShowHome(true);
    setSelectedProduct(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // La vue d'accueil ne s'affiche que si showHome est true et qu'il n'y a pas de recherche active
  const isHomeView = showHome && !selectedSubCategory && searchQuery === '';

  // Vue spéciale : Tunnel de Commande (Checkout)
  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col">
        <CheckoutPage
          items={cartItems}
          onBackToCart={() => {
            setCurrentView('main');
            setIsCartOpen(true);
          }}
          onOrderSuccess={handleOrderSuccess}
        />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleProceedToCheckout}
        />
      </div>
    );
  }

  // Vue spéciale : Confirmation de Commande (Success)
  if (currentView === 'success' && completedOrder) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col">
        <OrderSuccess
          order={completedOrder}
          onContinueShopping={handleContinueShopping}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans relative flex flex-col">
      {/* Barre de navigation globale avec menus déroulants, recherche et panier */}
      <Navbar 
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        onNavigateHome={handleNavigateHome}
        onNavigateToCatalog={handleNavigateToCatalog}
        onNavigateSection={handleNavigateSection}
        onSelectSubCategory={handleSubCategorySelect}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      {/* Contenu principal : alternance entre Catalogue, Fiche Produit et Accueil */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToCatalog}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        ) : !isHomeView ? (
          /* ── Vue Catalogue / Recherche / Tous les produits ── */
          <div id="catalogue" className="scroll-mt-24">
            <ProductCatalog
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              searchQuery={searchQuery}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />
          </div>
        ) : (
          /* ── Vue Accueil ── */
          <>
            <HeroBanner onNavigateToCatalog={handleNavigateToCatalog} />
            
            {/* Section Supérieure Asymétrique (فرصة فريدة لزيادة الدخل + إستمارة التسجيل) */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* À droite : Encart présentation opportunité */}
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sm:p-8 space-y-4 text-right" dir="rtl">
                  <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4 text-[#E6007E]" />
                    فرصة فريدة لزيادة الدخل
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug">
                    فرصة حقيقية لزيادة الدخل مع ماي واي المغرب
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    انضمي إلى عائلة بوشرى واي واستفيدي من نظام البيع المباشر الخاص بشركة ماي واي. احصلي على تخفيضات خاصة، مكافآت شهرية، وهدايا قيمة مقابل جهودك في الترويج للمنتجات الأصلية.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>خصم مباشر يصل إلى 50% على جميع منتجات ماي واي</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>مكافآت مالية شهرية حسب المبيعات</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>فرصة بناء فريق وزيادة الدخل التدريجي</span>
                    </li>
                  </ul>
                  <a 
                    href="#opportunity" 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#E6007E] to-[#c9006e] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    زود دخلك
                  </a>
                </div>

                {/* À gauche : Formulaire de parrainage */}
                <RegistrationForm />
              </div>
            </section>

            {/* Section "كيف تزود دخلك" */}
            <section className="max-w-7xl mx-auto px-4 py-10" dir="rtl">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">كيف تزود دخلك مع ماي واي؟</h2>
                <div className="w-20 h-1 bg-[#E6007E] mx-auto mt-3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm text-right">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">من نحن - مشاهدة الفيديو</h3>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/KNtRghtkl9w"
                        title="من نحن - ماي واي"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6007E] text-white text-sm font-bold shrink-0">1</span>
                          <div>
                            <p className="font-bold text-gray-800">أولاً: المكسب الفوري</p>
                          </div>
                        </div>
                        <span className="text-[#E6007E] font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">تحصلي على خصم فوري عند شراء المنتجات أو الترويج لها</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6007E] text-white text-sm font-bold shrink-0">2</span>
                          <div>
                            <p className="font-bold text-gray-800">الفرصة الحقيقية لزيادة دخلك مع مكافآت ماي واي الشهرية</p>
                          </div>
                        </div>
                        <span className="text-[#E6007E] font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">نظام مكافآت واضح وشفاف يضيف دخلاً حقيقياً</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6007E] text-white text-sm font-bold shrink-0">3</span>
                          <div>
                            <p className="font-bold text-gray-800">كيف تنمي دخلك الشهر التالي</p>
                          </div>
                        </div>
                        <span className="text-[#E6007E] font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">بناء فريق يساعدك على نمو مستمر للدخل</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6007E] text-white text-sm font-bold shrink-0">4</span>
                          <div>
                            <p className="font-bold text-gray-800">كيف تحصل على دخل يتراوح بين 200 - 3000 درهم في الشهر</p>
                          </div>
                        </div>
                        <span className="text-[#E6007E] font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">فرصة حقيقية تناسب الجميع مع إمكانية النمو</div>
                    </details>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm text-right">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">مزايا إضافية للشبكة</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><span>كتالوج شهري متجدد يضم أكثر من 500 منتج</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><span>دعم وتوجيه مستمر عبر الواتساب</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><span>تدريب احترافي مجاني للموزعات الجدد</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cartes d'avantages "مزايا العمل في ماي واي" */}
            <section className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">مزايا العمل في ماي واي</h2>
                <div className="w-20 h-1 bg-[#E6007E] mx-auto mt-3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 text-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-[#E6007E] shrink-0"><Gift className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">عروض الكتالوج المميزة</h3>
                    <p className="text-sm text-gray-600 mt-1">عروض حصرية وتخفيضات تصل إلى 50% للأعضاء كل شهر</p>
                  </div>
                </div>
                <div className="bg-[#BE185D] text-white rounded-2xl p-6 shadow-md flex items-start gap-4 text-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white shrink-0"><Sparkles className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold">برنامج الترقيات</h3>
                    <p className="text-sm text-pink-100 mt-1">برنامج واضح ومحفز للترقيات والمكافآت المتزايدة</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 text-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-[#E6007E] shrink-0"><Gift className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">مكافأة مادية شهرية</h3>
                    <p className="text-sm text-gray-600 mt-1">مكافآت نقدية مباشرة عند تحقيق أهداف المبيعات</p>
                  </div>
                </div>
                <div className="bg-[#BE185D] text-white rounded-2xl p-6 shadow-md flex items-start gap-4 text-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white shrink-0"><Users className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold">إدخال أعضاء جدد</h3>
                    <p className="text-sm text-pink-100 mt-1">مكافآت تحفيزية ممتازة على توسيع الفريق</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 text-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-[#E6007E] shrink-0"><Sparkles className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">ميزة مجموعات القمة</h3>
                    <p className="text-sm text-gray-600 mt-1">امتيازات حصرية وهدايا تكريمية لأعضاء القمة</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section des Témoignages et Preuve Sociale (Ajoutée ici) */}
            <Testimonials />

            {/* Section Institutionnelle "نبذة عن شركة ماي واي" */}
            <section className="max-w-7xl mx-auto px-4 py-10 mb-6" dir="rtl">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 text-right">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4 text-[#E6007E]" />
                      نبذة عن شركة ماي واي
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">شركة ماي واي العالمية</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      شركة ماي واي هي شركة عالمية رائدة في مجال البيع المباشر، تعمل في أكثر من 39 فرعاً حول العالم. تهدف الشركة إلى تمكين الأفراد من تحقيق الاستقلال المالي من خلال بيع منتجاتها الأصلية عالية الجودة في مجالات التجميل، العناية، والمنزل.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>أكثر من 39 فرعاً وملايين الأعضاء حول العالم</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>كتالوجات شهرية محدثة بأفضل الأسعار</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>منتجات أصلية ومضمونة الجودة 100%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-6 h-6 text-[#E6007E]" />
                      <h3 className="text-lg font-bold text-gray-800">شبكة التواصل المباشر</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      تواصلوا مع فريق بوشرى واي عبر الواتساب للحصول على أحدث العروض والكتالوجات وللإجابة عن استفساراتكم.
                    </p>
                    <a 
                      href="https://wa.me/212634486494?text=مرحباً، أود الاستفسار عن فرصة الانضمام إلى ماي واي"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition"
                    >
                      انضم إلى مجتمعنا عبر واتساب
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Tiroir Panier Latéral Flou (CartDrawer) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />

      {/* Icône WhatsApp flottante présente sur les pages principales */}
      <FloatingWhatsApp />

      {/* Pied de page avec badges COD et mentions légales */}
      <Footer onNavigateToCatalog={handleNavigateToCatalog} onNavigateSection={handleNavigateSection} />
    </div>
  );
}
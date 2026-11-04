import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import { Product } from './data/products';
import { CheckCircle2, Gift, Percent, Users, BookOpen, Eye, Download, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleSubCategorySelect = (category: string, subCategory: string) => {
    setSelectedCategory(category);
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
    setSearchQuery(query);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setSelectedCategory('all');
    setSelectedSubCategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCatalog = () => {
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
    setSelectedProduct(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Correction : La vue d'accueil ne s'active que si la catégorie est 'all' (ou vide) SANS sous-catégorie ni recherche.
  // Si l'utilisateur clique sur "كل المنتجات", selectedCategory vaudra 'كل المنتجات', donc isHomeView sera false et le ProductCatalog s'affichera correctement.
  const isCategoryAll = selectedCategory === 'all' || selectedCategory === 'كل المنتجات';
  const isHomeView = isCategoryAll && !selectedSubCategory && searchQuery === '';

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans relative flex flex-col">
      {/* Barre de navigation globale avec menus déroulants et recherche */}
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
      />
      
      {/* Contenu principal : alternance entre Catalogue, Fiche Produit et Accueil */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToCatalog} 
          />
        ) : !isHomeView ? (
          /* ── Vue Catégorie / Recherche / Tous les produits ── */
          <div id="catalogue" className="scroll-mt-24">
            <ProductCatalog
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              searchQuery={searchQuery}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        ) : (
          /* ── Vue Accueil ── */
          <>
            <HeroBanner />
            
            {/* Section Supérieure Asymétrique (فرصة فريدة لزيادة الدخل + إستمارة التسجيل) */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* À gauche : Encart présentation opportunité */}
                <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sm:p-8 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    فرصة فريدة لزيادة الدخل
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug">فرصة حقيقية لزيادة الدخل مع ماي واي المغرب</h2>
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
                  <a href="#opportunity" className="inline-flex items-center justify-center bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition">
                    زود دخلك
                  </a>
                </div>
                {/* À droite : Formulaire de parrainage */}
                <RegistrationForm />
              </div>
            </section>

            {/* Section "كيف تزود دخلك" */}
            <section className="max-w-7xl mx-auto px-4 py-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">كيف تزود دخلك مع ماي واي؟</h2>
                <div className="w-20 h-1 bg-pink-600 mx-auto mt-3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">من نحن - مشاهدة الفيديو</h3>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/KNtRghtkl9w"
                        title="من نحن - ماي واي"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">1</span>
                          <div>
                            <p className="font-bold text-gray-800">أولاً: المكسب الفوري</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">تحصلي على خصم فوري عند شراء المنتجات أو الترويج لها</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">2</span>
                          <div>
                            <p className="font-bold text-gray-800">الفرصة الحقيقية لزيادة دخلك مع مكافآت ماي واي الشهرية</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">نظام مكافآت واضح وشفاف يضيف دخلاً حقيقياً</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">3</span>
                          <div>
                            <p className="font-bold text-gray-800">كيف تنمي دخلك الشهر التالي</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">بناء فريق يساعدك على نمو مستمر للدخل</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">4</span>
                          <div>
                            <p className="font-bold text-gray-800">كيف تحصل على دخل يتراوح بين 200 - 3000 درهم في الشهر</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">فرصة حقيقية تناسب الجميع مع إمكانية النمو</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">5</span>
                          <div>
                            <p className="font-bold text-gray-800">مكافآت سنوية عند حصولك على ألقاب متميزة</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">حوافز إضافية وجوائز قيمة</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">6</span>
                          <div>
                            <p className="font-bold text-gray-800">نصائح لإدارة الوقت وتحقيق أهدافك</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">خطوات عملية للنجاح اليومي</div>
                    </details>
                    <details className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-3 p-3 bg-white cursor-pointer hover:bg-pink-50/60 transition">
                        <div className="flex items-start gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">7</span>
                          <div>
                            <p className="font-bold text-gray-800">التغلب على العقبات في البداية</p>
                          </div>
                        </div>
                        <span className="text-pink-600 font-bold group-open:rotate-90 transition-transform">»</span>
                      </summary>
                      <div className="px-4 pb-3 pt-1 text-sm text-gray-600 bg-white">دعم وتوجيه مستمر من الفريق</div>
                    </details>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">مزايا إضافية</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><span>كتالوج شهري محدث</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><span>دعم فني عبر الواتساب</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /><span>تدريب مجاني للأعضاء الجدد</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cartes d'avantages */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">مزايا العمل في ماي واي</h2>
                <div className="w-20 h-1 bg-pink-600 mx-auto mt-3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-700"><Gift className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">عروض الكتالوج المميزة</h3>
                    <p className="text-sm text-gray-600 mt-1">عروض حصرية للأعضاء كل شهر</p>
                  </div>
                </div>
                <div className="bg-fuchsia-700 text-white rounded-2xl p-6 shadow-lg flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white"><Sparkles className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold">البرنامج</h3>
                    <p className="text-sm text-fuchsia-100 mt-1">برنامج واضح للترقيات والمكافآت</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-700"><Gift className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">مكافأة مادية من الشركة</h3>
                    <p className="text-sm text-gray-600 mt-1">مكافآت مالية عند تحقيق الأهداف</p>
                  </div>
                </div>
                <div className="bg-fuchsia-700 text-white rounded-2xl p-6 shadow-lg flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white"><Users className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold">إدخال أعضاء جدد</h3>
                    <p className="text-sm text-fuchsia-100 mt-1">مكافأة على توسيع الفريق</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-700"><Sparkles className="w-6 h-6" /></div>
                  <div>
                    <h3 className="font-bold text-gray-800">ميزة خاصة بمجموعات القمة</h3>
                    <p className="text-sm text-gray-600 mt-1">امتيازات حصرية لأعضاء القمة</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Institutionnelle "نبذة عن شركة ماي واي" */}
            <section className="max-w-7xl mx-auto px-4 py-10 mb-6">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4" />
                      نبذة عن شركة ماي واي
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">شركة ماي واي العالمية</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      شركة ماي واي هي شركة عالمية رائدة في مجال البيع المباشر، تعمل في أكثر من 39 فرعاً حول العالم. تهدف الشركة إلى تمكين الأفراد من تحقيق الاستقلال المالي من خلال بيع منتجاتها الأصلية عالية الجودة في مجالات التجميل، العناية، المنزل، والمنزل.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      تصدر الشركة كتالوجاً شهرياً جديداً يضم أحدث المنتجات، وتوفر نظاماً واضحاً للمكافآت والجوائز. يتميز النظام بالشفافية، ويمنح الفرصة للجميع لبناء مشروع ناجح بدون رأس مال كبير.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>أكثر من 39 فرعاً حول العالم</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>كتالوجات شهرية محدثة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>منتجات أصلية ومضمونة الجودة</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>نظام مكافآت واضح للمتسلقين</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100 space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-6 h-6 text-pink-700" />
                      <h3 className="text-lg font-bold text-gray-800">شبكة التواصل الاجتماعي</h3>
                    </div>
                    <p className="text-sm text-gray-600">تابعونا عبر الواتساب للحصول على آخر العروض والكتالوجات الجديدة</p>
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

      {/* Icône WhatsApp flottante effet verre présente sur toutes les pages */}
      <FloatingWhatsApp />

      {/* Pied de page avec badges COD et contact direct */}
      <Footer />
    </div>
  );
}
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
      
      {/* Contenu principal : alternance entre Catalogue et Fiche Produit */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={handleBackToCatalog} 
          />
        ) : (
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

            {/* Bloc d'Accès aux Catalogues */}
            <section className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="#catalogue" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-base shadow-md transition">
                  <Download className="w-5 h-5" />
                  تحميل الكتالوج
                </a>
                <a href="#catalogue" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-base shadow-md transition">
                  <Eye className="w-5 h-5" />
                  عرض الكتالوج
                </a>
              </div>
            </section>

            {/* Section "كيف تزود دخلك" */}
            <section className="max-w-7xl mx-auto px-4 py-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">كيف تزود دخلك مع ماي واي؟</h2>
                <div className="w-20 h-1 bg-pink-600 mx-auto mt-3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <img src="/image/parfum-myway-femme.jpg" alt="منتجات ماي واي" className="rounded-2xl object-cover h-40 w-full shadow" />
                    <img src="/image/maquillage-pearly-mascara-myway.jpg" alt="ماكياج ماي واي" className="rounded-2xl object-cover h-40 w-full shadow" />
                    <img src="/image/soin-visage-pure-skin-lotion-anti-acne-myway.jpg" alt="عناية بالبشرة ماي واي" className="rounded-2xl object-cover h-40 w-full shadow" />
                    <img src="/image/soin-capillaire-natures-cheveux-antichute-shampoing-ail-myway.jpg" alt="عناية بالشعر ماي واي" className="rounded-2xl object-cover h-40 w-full shadow" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">١</span>
                    <div>
                      <p className="font-bold text-gray-800">أولاً: المكسب الفوري</p>
                      <p className="text-sm text-gray-600">تحصلي على خصم فوري عند شراء المنتجات أو الترويج لها</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">٢</span>
                    <div>
                      <p className="font-bold text-gray-800">الفرصة الحقيقية لزيادة دخلك مع مكافآت ماي واي الشهرية</p>
                      <p className="text-sm text-gray-600">نظام مكافآت واضح وشفاف يضيف دخلاً حقيقياً</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">٣</span>
                    <div>
                      <p className="font-bold text-gray-800">كيف تنمي دخلك الشهر التالي</p>
                      <p className="text-sm text-gray-600">بناء فريق يساعدك على نمو مستمر للدخل</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">٤</span>
                    <div>
                      <p className="font-bold text-gray-800">دخل يتراوح بين 200 - 3000 درهم شهرياً</p>
                      <p className="text-sm text-gray-600">فرصة حقيقية تناسب الجميع</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white text-sm font-bold shrink-0">٥</span>
                    <div>
                      <p className="font-bold text-gray-800">مكافآت سنوية عند الحصول على ألقاب متميزة</p>
                      <p className="text-sm text-gray-600">حوافز إضافية وجوائز قيمة</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Grid "مميزات العمل في ماي واي" */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">مميزات العمل في ماي واي</h2>
                <div className="w-20 h-1 bg-pink-600 mx-auto mt-3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-rose-600 to-pink-700 text-white rounded-2xl p-6 shadow-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8" />
                    <h3 className="text-xl font-bold">العروض الأسبوعية</h3>
                  </div>
                  <p className="text-rose-100 text-sm leading-relaxed">
                    عروض حصرية للأعضاء كل أسبوع بخصومات مميزة على تشكيلة واسعة من المنتجات.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-rose-600 to-pink-700 text-white rounded-2xl p-6 shadow-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8" />
                    <h3 className="text-xl font-bold">هدايا النقاط</h3>
                  </div>
                  <p className="text-rose-100 text-sm leading-relaxed">
                    نظام نقاط متكامل يكافئك على كل عملية شراء أو مبيعات، وتحوليها لهدايا قيمة.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-rose-600 to-pink-700 text-white rounded-2xl p-6 shadow-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Percent className="w-8 h-8" />
                    <h3 className="text-xl font-bold">خصم خاص للأعضاء</h3>
                  </div>
                  <p className="text-rose-100 text-sm leading-relaxed">
                    استفيدي من خصم خاص يتراوح بين 20% إلى 25% على سعر الكتالوج لجميع المنتجات.
                  </p>
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

            <ProductCatalog 
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              onSelectProduct={handleSelectProduct} 
            />
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

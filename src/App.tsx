import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetail } from './components/ProductDetail';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import { Product } from './data/products';

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
            <ProductCatalog 
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              onSelectProduct={handleSelectProduct} 
            />
            <RegistrationForm />
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

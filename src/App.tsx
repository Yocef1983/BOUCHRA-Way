import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import RegistrationForm from './components/RegistrationForm';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 1. Barre de navigation */}
      <Navbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 2. Bannière Hero optimisée */}
        <HeroBanner />

        {/* 3. Formulaire de Parrainage & Réseau */}
        <RegistrationForm />

        {/* 4. Catalogue des produits */}
        <ProductCatalog selectedCategory={selectedCategory} />
      </main>

      {/* 5. Pied de page */}
      <Footer />
    </div>
  );
}
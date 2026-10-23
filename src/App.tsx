import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import ProductCatalog from './components/ProductCatalog';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 1. En-tête avec navigation bilingue */}
      <Navbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Banner de bienvenue */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-3xl p-8 text-center my-6 shadow-md">
          <h2 className="text-3xl font-extrabold mb-2">مرحباً بكم في BOUCHRA WAY</h2>
          <p className="text-rose-100 text-sm md:text-base max-w-2xl mx-auto">
            منتجات ماي واي الأصلية في المغرب والتسجيل في الفريق للحصول على كود الخصم والأرباح.
          </p>
        </div>

        {/* 2. Formulaire de Parrainage & Réseau (Home Page) */}
        <RegistrationForm />

        {/* 3. Catalogue des produits avec filtre actif */}
        <ProductCatalog selectedCategory={selectedCategory} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center text-xs mt-12 border-t border-gray-800">
        <p className="font-semibold text-gray-300">BOUCHRA WAY — Partenaire Officiel My Way Maroc</p>
        <p className="text-gray-500 mt-2">© 2026 Tous droits réservés.</p>
      </footer>
    </div>
  );
}
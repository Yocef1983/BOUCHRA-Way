import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import RegistrationForm from './components/RegistrationForm';
import { ProductCatalog } from './components/ProductCatalog';
import Footer from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <HeroBanner />
        <ProductCatalog />
        <RegistrationForm />
      </main>
      
      <Footer />
    </div>
  );
}
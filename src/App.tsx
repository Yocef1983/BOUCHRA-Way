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

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans relative">
      <Navbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <main>
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        ) : (
          <>
            <HeroBanner />
            <ProductCatalog onSelectProduct={(product) => setSelectedProduct(product)} />
            <RegistrationForm />
          </>
        )}
      </main>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
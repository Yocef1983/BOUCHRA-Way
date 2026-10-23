import React from 'react';
import { ShoppingBag, PhoneCall } from 'lucide-react';

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Navbar({ selectedCategory, setSelectedCategory }: NavbarProps) {
  const categories = [
    { id: 'all', label: 'الكل / Tous' },
    { id: 'visage-corps', label: 'العناية بالبشرة والجسم (Soins)' },
    { id: 'cheveux', label: 'العناية بالشعر (Cheveux)' },
    { id: 'maquillage', label: 'المكياج (Maquillage)' },
    { id: 'parfums', label: 'العطور (Parfums)' },
    { id: 'maison', label: 'منظفات منزلية (Entretien)' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar Contact */}
      <div className="bg-rose-600 text-white text-xs py-2 px-4 font-medium flex justify-between items-center max-w-7xl mx-auto">
        <span>🎉 Inscription & Parrainage Officiel My Way Maroc</span>
        <a href="https://wa.me/212634486494" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
          <PhoneCall size={14} /> WhatsApp: 06 34 48 64 94
        </a>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <h1 
          onClick={() => setSelectedCategory('all')} 
          className="text-2xl font-black text-rose-600 tracking-wider cursor-pointer select-none"
        >
          BOUCHRA WAY
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full font-semibold text-sm border border-rose-100">
            <ShoppingBag size={18} />
            <span>Mon Panier</span>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <nav className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 overflow-x-auto py-2.5 text-xs md:text-sm font-bold whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl transition ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
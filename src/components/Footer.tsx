import React from 'react';
import { Phone, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
        {/* Colonne 1 : À propos */}
        <div>
          <h3 className="text-lg font-bold text-rose-500 mb-3">BOUCHRA WAY</h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            Votre partenaire officiel My Way au Maroc. Vente directe de soins, produits de beauté et entretien, ainsi que recrutement de nouveaux membres.
          </p>
        </div>

        {/* Colonne 2 : Engagement & Confiance */}
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Truck size={16} className="text-rose-500" />
            <span>Livraison partout au Maroc (Cash on Delivery)</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck size={16} className="text-rose-500" />
            <span>Produits 100% Authentiques My Way</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Clock size={16} className="text-rose-500" />
            <span>Assistance WhatsApp 7j/7</span>
          </div>
        </div>

        {/* Colonne 3 : Contact Direct */}
        <div>
          <h4 className="text-sm font-bold text-gray-200 mb-3">Contact & Inscription</h4>
          <a 
            href="https://wa.me/212634486494" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
          >
            <Phone size={14} /> WhatsApp: 06 34 48 64 94
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        <p>© 2026 Bouchra Way - Tous droits réservés.</p>
      </div>
    </footer>
  );
}
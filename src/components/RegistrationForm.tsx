import React, { useState } from 'react';
import { UserCheck, ShieldCheck } from 'lucide-react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    cin: '',
    phone: '',
    city: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour Bouchra Way, je souhaite rejoindre l'équipe et obtenir mon code :\n- Nom : ${formData.fullName}\n- CIN : ${formData.cin}\n- Tél : ${formData.phone}\n- Ville : ${formData.city}\n- Adresse : ${formData.address}`;
    const url = `https://wa.me/212634486494?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-3xl p-6 md:p-10 shadow-xl my-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Rejoignez l'Équipe Bouchra Way</h2>
        <p className="mt-3 text-rose-100">
          Profitez de remises exclusives sur vos produits My Way et gagnez des commissions sur votre réseau.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white text-gray-800 rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Nom Complet</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Bouchra Alami" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Numéro CIN (Obligatoire)</label>
            <input 
              type="text" 
              required
              placeholder="Ex: AB123456" 
              value={formData.cin}
              onChange={(e) => setFormData({...formData, cin: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Téléphone (WhatsApp)</label>
            <input 
              type="tel" 
              required
              placeholder="Ex: 0661000000" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Ville</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Casablanca" 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Adresse de Livraison Complète</label>
          <input 
            type="text" 
            required
            placeholder="Rue, Quartier, Numéro..." 
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
          <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
          <span>Vos données sont strictement confidentielles et traitées pour votre inscription officielle.</span>
        </div>

        <button 
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 mt-4"
        >
          <UserCheck size={18} /> Valider mon Inscription & Demander mon Code
        </button>
      </form>
    </div>
  );
}
import React from 'react';
import { Sparkles, ArrowRight, UserPlus, ShieldCheck, Tag } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white rounded-3xl p-8 md:p-12 shadow-xl my-6">
      {/* Background Decorator / Motif d'arrière-plan */}
      <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -top-16 w-60 h-60 bg-rose-400/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl">
        {/* Badge Officiel */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm border border-white/20">
          <Sparkles size={14} className="text-yellow-300" />
          <span>الكتالوج الرسمي - Catalogue Officiel My Way 2026</span>
        </div>

        {/* Titre Principal */}
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
          عالم الجمال والربح مع ماي واي المغرب
        </h2>

        {/* Sous-titre descriptif */}
        <p className="text-rose-100 text-sm md:text-base mb-8 leading-relaxed font-normal">
          اكتشفي أحدث العروض والمنتجات الأصلية للجمال والعناية والمنزل. انضمي إلى فريقنا واستفيدي من تخفيضات الأعضاء والربح المباشر.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#catalogue"
            className="bg-white text-rose-600 hover:bg-rose-50 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 flex items-center gap-2 text-sm"
          >
            تصفح العروض <ArrowRight size={18} />
          </a>
          <a
            href="https://wa.me/212634486494?text=Bonjour%2C%20je%20souhaite%20rejoindre%20l'equipe%20Bouchra%20Way"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 flex items-center gap-2 text-sm border border-emerald-400/30"
          >
            <UserPlus size={18} /> انضم إلى الفريق (Parrainage)
          </a>
        </div>

        {/* Barre de réassurance rapide */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs text-rose-100 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-300" />
            <span>منتجات أصلية 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-yellow-300" />
            <span>تخفيضات الأعضاء الحصرية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
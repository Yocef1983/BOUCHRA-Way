import React from 'react';
import { Sparkles, ArrowRight, UserPlus, ShieldCheck, Tag } from 'lucide-react';
import { Language } from '../i18n/translations';

interface HeroBannerProps {
  onNavigateToCatalog?: () => void;
  lang?: Language;
}

export default function HeroBanner({ onNavigateToCatalog, lang = 'ar' }: HeroBannerProps) {
  const isAr = lang === 'ar';

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white rounded-3xl p-8 md:p-12 shadow-xl my-6"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Decorator / Motif d'arrière-plan */}
      <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-16 -top-16 w-60 h-60 bg-rose-400/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl text-start">
        {/* Badge Officiel */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm border border-white/20">
          <Sparkles size={14} className="text-yellow-300" />
          <span>{isAr ? 'الكتالوج الرسمي - Catalogue Officiel My Way 2026' : 'Catalogue Officiel My Way 2026'}</span>
        </div>

        {/* Titre Principal */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
          {isAr ? 'عالم الجمال والربح مع ماي واي المغرب' : "L'univers Beauté & Opportunité My Way Maroc"}
        </h1>

        {/* Sous-titre descriptif */}
        <p className="text-rose-100 text-sm md:text-base mb-8 leading-relaxed font-normal">
          {isAr 
            ? 'اكتشفي أحدث العروض والمنتجات الأصلية للجمال والعناية والمنزل. انضمي إلى فريقنا واستفيدي من تخفيضات الأعضاء والربح المباشر.'
            : 'Découvrez les offres et produits officiels de beauté, soins et maison. Rejoignez notre réseau et profitez de remises exclusives et de gains directs.'}
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#catalogue"
            onClick={(e) => {
              if (onNavigateToCatalog) {
                e.preventDefault();
                onNavigateToCatalog();
              }
            }}
            className="bg-white text-rose-600 hover:bg-rose-50 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 flex items-center gap-2 text-sm cursor-pointer"
          >
            <span>{isAr ? 'تصفح العروض' : 'Découvrir les offres'}</span>
            {isAr ? <ArrowRight size={18} /> : <ArrowRight size={18} />}
          </a>
          <a
            href="https://wa.me/212634486494?text=Bonjour%2C%20je%20souhaite%20rejoindre%20l'equipe%20Bouchra%20Way"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 flex items-center gap-2 text-sm border border-emerald-400/30"
          >
            <UserPlus size={18} />
            <span>{isAr ? 'انضم إلى الفريق (Parrainage)' : "Rejoindre l'équipe (Parrainage)"}</span>
          </a>
        </div>

        {/* Barre de réassurance rapide */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs text-rose-100 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-300" />
            <span>{isAr ? 'منتجات أصلية 100%' : 'Produits 100% Authentiques'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-yellow-300" />
            <span>{isAr ? 'تخفيضات الأعضاء الحصرية' : 'Remises Membres Exclusives'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Lock, FileText } from 'lucide-react';
import { LegalModal } from './LegalModal';
import { Language } from '../i18n/translations';
import { SITE } from '../config/site';

const FOOTER_YEAR = new Date().getFullYear();

interface FooterProps {
  onNavigateToCatalog: () => void;
  onNavigateSection: (sectionId: string) => void;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCatalog, lang = 'ar' }) => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'shipping' | 'returns' | 'terms' | 'privacy'>('shipping');
  const isAr = lang === 'ar';

  const openLegal = (tab: 'shipping' | 'returns' | 'terms' | 'privacy') => {
    setActiveLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 4 Piliers de confiance */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-start">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isAr ? `توصيل بـ ${SITE.shippingFee} درهم` : `Livraison à ${SITE.shippingFee} MAD`}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr ? 'لكافة المدن المغربية (24h/48h)' : 'Partout au Maroc (24h/48h)'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isAr ? 'الدفع عند الاستلام' : 'Paiement à la livraison'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr ? 'بدون مصاريف خفية' : 'Sans frais cachés'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isAr ? 'منتجات أصلية 100%' : 'Produits 100% Authentiques'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr ? 'ضمان الجودة MyWay' : 'Garantie Qualité MyWay'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isAr ? 'دعم مباشر' : 'Support Direct'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr ? 'إجابة سريعة عبر الواتساب' : 'Réponse rapide via WhatsApp'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">
              {isAr ? 'BOUCHRA Way ماي واي المغرب' : 'BOUCHRA Way My Way Maroc'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr 
                ? 'منصتكم المعتمدة لتسوق أحدث منتجات التجميل والعناية والمنزل من ماي واي في المغرب، مع خدمة التوصيل السريع والدفع عند الاستلام.'
                : 'Votre plateforme agréée pour commander les produits authentiques My Way au Maroc, avec livraison rapide et paiement à la livraison.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">
              {isAr ? 'روابط سريعة' : 'Liens rapides'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onNavigateToCatalog} className="hover:text-white transition cursor-pointer">
                  {isAr ? 'الكتالوج الكامل للمنتجات' : 'Catalogue complet des produits'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('shipping')} className="hover:text-white transition cursor-pointer">
                  {isAr ? 'مصاريف وآجال التوصيل (20 DH)' : 'Frais et délais de livraison (20 DH)'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('returns')} className="hover:text-white transition cursor-pointer">
                  {isAr ? 'سياسة الاستبدال والضمان' : 'Politique de retour et garantie'}
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('terms')} className="hover:text-white transition cursor-pointer">
                  {isAr ? 'الشروط العامة للبيع (CGV)' : 'Conditions Générales de Vente (CGV)'}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">
              {isAr ? 'الامتثال والحماية' : 'Conformité & Protection'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => openLegal('privacy')} className="flex items-center gap-1 hover:text-white transition cursor-pointer">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>{isAr ? 'حماية البيانات الشخصية (CNDP 09-08)' : 'Protection des données (CNDP 09-08)'}</span>
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('terms')} className="flex items-center gap-1 hover:text-white transition cursor-pointer">
                  <FileText className="w-3 h-3 text-blue-400" />
                  <span>{isAr ? 'الشروط العامة للبيع (قانون 31-08)' : 'Conditions Générales de Vente (Loi 31-08)'}</span>
                </button>
              </li>
              <li className="text-[11px] text-slate-500 pt-2">
                {isAr 
                  ? 'جميع المعاملات مصانة طبقاً للتشريع المغربي الجاري به العمل.'
                  : 'Toutes les transactions sont conformes à la législation marocaine en vigueur.'}
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {FOOTER_YEAR} BOUCHRA Way. {isAr ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
        </div>

        {/* Mentions légales - Informations éditeur */}
        <div id="contact" className="mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500 space-y-1">
          <p><strong>BOUCHRA Way</strong> - {isAr ? 'علامة تجارية مغربية لتوزيع منتجات MyWay الأصلية.' : 'Marque marocaine de distribution des produits MyWay officiels.'}</p>
          <p>
            <span className="text-rose-600">[À compléter : raison sociale / الشكل القانوني]</span> •
            <span className="text-rose-600">[À compléter : RC]</span> •
            <span className="text-rose-600">[À compléter : IF]</span> •
            <span className="text-rose-600">[À compléter : ICE]</span> •
            <span className="text-rose-600">[À compléter : Siège social / عنوان المقر]</span>
          </p>
          <p>
            {isAr ? 'دعم العملاء:' : 'Service client :'} <a href="https://wa.me/212634486494" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">+212 6 34 48 64 94</a> •
            {isAr ? 'إيميل:' : 'Email :'} <span className="text-rose-600">[À compléter : contact@bouchraway.ma]</span>
          </p>
          <p className="text-slate-600">
            <span className="text-rose-600">[À compléter : N° récépissé / Autorisation CNDP إن وجد]</span>
          </p>
        </div>
      </div>

      {/* Modale Juridique */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        activeTab={activeLegalTab}
        setActiveTab={setActiveLegalTab}
      />
    </footer>
  );
};

export default Footer;

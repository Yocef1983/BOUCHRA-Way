import React, { useState } from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Lock } from 'lucide-react';
import { LegalModal } from './LegalModal';

interface FooterProps {
  onNavigateToCatalog: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCatalog }) => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<'shipping' | 'returns' | 'terms' | 'privacy'>('shipping');

  const openLegal = (tab: 'shipping' | 'returns' | 'terms' | 'privacy') => {
    setActiveLegalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto dir-rtl" dir="rtl">
      
      {/* 4 Piliers de confiance */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-right">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">توصيل بـ 20 درهم</h4>
              <p className="text-xs text-slate-400">لكافة المدن المغربية (24h/48h)</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">الدفع عند الاستلام</h4>
              <p className="text-xs text-slate-400">بدون مصاريف خفية</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">منتجات أصلية 100%</h4>
              <p className="text-xs text-slate-400">ضمان الجودة MyWay</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">دعم مباشر</h4>
              <p className="text-xs text-slate-400">إجابة سريعة عبر الواتساب</p>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">BOUCHRA Way ماي واي المغرب</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              منصتكم المعتمدة لتسوق أحدث منتجات التجميل والعناية والمنزل من ماي واي في المغرب، مع خدمة التوصيل السريع والدفع عند الاستلام.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onNavigateToCatalog} className="hover:text-white transition">
                  الكتالوج الكامل للمنتجات
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('shipping')} className="hover:text-white transition">
                  مصاريف وآجال التوصيل (20 DH)
                </button>
              </li>
              <li>
                <button onClick={() => openLegal('returns')} className="hover:text-white transition">
                  سياسة الاستبدال والضمان
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">الامتثال والحماية</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => openLegal('privacy')} className="flex items-center gap-1 hover:text-white transition">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>حماية البيانات الشخصية (CNDP 09-08)</span>
                </button>
              </li>
              <li className="text-[11px] text-slate-500 pt-2">
                جميع المعاملات مصانة طبقاً للتشريع المغربي الجاري به العمل.
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} BOUCHRA Way. جميع الحقوق محفوظة.
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
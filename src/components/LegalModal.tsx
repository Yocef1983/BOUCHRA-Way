import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'shipping' | 'returns' | 'terms' | 'privacy';
  setActiveTab: (tab: 'shipping' | 'returns' | 'terms' | 'privacy') => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* En-tête de la modale */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>سياسات المتجر والشروط القانونية</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Onglets de navigation */}
        <div className="flex border-b border-slate-100 bg-white px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition ${
              activeTab === 'shipping'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>الشحن والتوصيل (20 DH)</span>
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition ${
              activeTab === 'returns'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>سياسة الإرجاع والاستبدال</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition ${
              activeTab === 'privacy'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>حماية المعطيات (CNDP 09-08)</span>
          </button>
        </div>

        {/* Contenu principal */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed text-right">
          
          {/* Section 1 : الشحن والتوصيل */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                شروط الشحن والتوصيل في المغرب
              </h3>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-900 font-medium">
                🚚 **تعرفة التوصيل موحدة:** 20 درهم مغربي (20 MAD) فقط لجميع الطلبيات نحو جميع المدن المغربية.
              </div>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>**آجال التسليم:** يتم توصيل الطلبيات في غضون 24 إلى 48 ساعة بالنسبة للمدن الكبرى (الدار البيضاء، الرباط، سلا، القنيطرة، فاس، مكناس، مراكش، أقاليم الشمال والجنوب).</li>
                <li>**طريقة الدفع:** الدفع عند الاستلام نقداً (Cash on Delivery) بعد معاينة الطرد مع موزع التوصيل.</li>
                <li>**التتبع:** يتم التواصل معكم مباشرة عبر الواتساب أو الهاتف لتأكيد موعد ومكان التسليم المناسب لكم.</li>
              </ul>
            </div>
          )}

          {/* Section 2 : الإرجاع والاستبدال */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E6007E]"></span>
                سياسة الاستبدال والضمان
              </h3>
              <p>
                حرصاً منا على تقديم أفضل خدمة لعميلاتنا، نضمن لكم أصالة منتجات **ماي واي MyWay** ومطابقتها للمواصفات.
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>**حالة التلف أو عدم المطابقة:** إذا وصلك منتج متضرر أثناء الشحن أو غير مطابق لطلبيتك، يحق لك طلب استبداله مجاناً في غضون 7 أيام من تاريخ الاستلام.</li>
                <li>**منتجات التجميل والعناية الشخصية:** لأسباب صحية ووقائية، لا يمكن إرجاع أو استبدال منتجات التجميل والعناية التي تم فتح غلافها الأصلي أو تجريبها إلا في حالة وجود عيب تصنيع مثبت.</li>
                <li>**إجراءات الطلب:** يكفي التواصل مع فريق الدعم عبر الواتساب مع إرفاق صورة للمنتج المعني وسنقوم بمعالجة طلبكم فوراً.</li>
              </ul>
            </div>
          )}

          {/* Section 3 : حماية المعطيات */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                حماية المعطيات الشخصية (القانون 09-08)
              </h3>
              <p>
                يلتزم موقع **BOUCHRA Way** بحماية خصوصيتك وبياناتك الشخصية وفقاً لأحكام القانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي.
              </p>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>المعلومات المجمعة (الاسم، الهاتف، العنوان) تُستخدم حصرياً لمعالجة طلبيتكم وتأكيد التوصيل مع شركة الشحن.</li>
                <li>لا يتم بيع أو مشاركة بياناتكم مع أي طرف ثالث لأغراض تجارية خارج نطاق تنفيذ الطلبية.</li>
                <li>يحق لكم في أي وقت طلب تعديل أو حذف بياناتكم الشخصية عبر التواصل المباشر مع مصلحة الزبناء.</li>
              </ul>
            </div>
          )}

        </div>

        {/* Pied de la modale */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
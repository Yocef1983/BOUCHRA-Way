import React, { useEffect } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, Lock, FileText, Info } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'shipping' | 'returns' | 'terms' | 'privacy';
  setActiveTab: (tab: 'shipping' | 'returns' | 'terms' | 'privacy') => void;
}

const parseMarkdownBold = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

const LegalEntityInfo = () => (
  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 space-y-2">
    <p className="font-semibold text-slate-900 flex items-center gap-2">
      <Info className="w-4 h-4 text-[#E6007E]" />
      <span>Informations légales de l&apos;éditeur (à compléter)</span>
    </p>
    <ul className="space-y-1 list-disc list-inside text-slate-600">
      <li><strong>Dénomination sociale :</strong> BOUCHRA Way (Marque commerciale)</li>
      <li><strong>Forme juridique :</strong> <span className="text-rose-600">[À compléter : SARL / SA / Auto-entrepreneur / Autre]</span></li>
      <li><strong>Siège social :</strong> <span className="text-rose-600">[À compléter : Adresse complète, Ville, Maroc]</span></li>
      <li><strong>Registre de Commerce (RC) :</strong> <span className="text-rose-600">[À compléter : N° RC]</span></li>
      <li><strong>Identifiant Fiscal (IF) :</strong> <span className="text-rose-600">[À compléter : N° IF]</span></li>
      <li><strong>ICE :</strong> <span className="text-rose-600">[À compléter : Identifiant Commun de l&apos;Entreprise]</span></li>
      <li><strong>Téléphone :</strong> +212 6 34 48 64 94</li>
      <li><strong>E-mail :</strong> <span className="text-rose-600">[À compléter : contact@bouchraway.ma]</span></li>
      <li><strong>Déclaration CNDP :</strong> <span className="text-rose-600">[À compléter : N° récépissé / Autorisation CNDP si applicable]</span></li>
    </ul>
  </div>
);

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        
        {/* En-tête de la modale */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span id="legal-modal-title">السياسات القانونية والامتثال التنظيمي</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition"
            aria-label="إغلاق النافذة"
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
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition ${
              activeTab === 'terms'
                ? 'border-[#E6007E] text-[#E6007E]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>الشروط العامة للبيع</span>
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
          
          {/* Section 1 : الشحن والتوصيل - Livraison */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <LegalEntityInfo />
              
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                شروط الشحن والتوصيل في المغرب
              </h3>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-900 font-medium">
                {parseMarkdownBold('🚚 **تعرفة التوصيل موحدة:** 20 درهم مغربي (20 MAD) فقط لجميع الطلبيات نحو جميع المدن المغربية.')}
              </div>
              
              <h4 className="font-semibold text-slate-800 mt-2">معلومات ما قبل التعاقد (المادة 7 من القانون 31-08)</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>{parseMarkdownBold('**آجال التسليم:** يتم توصيل الطلبيات في غضون 24 إلى 48 ساعة بالنسبة للمدن الكبرى (الدار البيضاء، الرباط، سلا، القنيطرة، فاس، مكناس، مراكش، أقاليم الشمال والجنوب). وباقي المدن في غضون 48 إلى 72 ساعة كحد أقصى.')}</li>
                <li>{parseMarkdownBold('**طريقة الدفع:** الدفع عند الاستلام نقداً (Cash on Delivery) بعد معاينة الطرد مع موزع التوصيل. لا توجد رسوم خفية إضافية.')}</li>
                <li>{parseMarkdownBold('**التتبع والتواصل:** يتم التواصل معكم مباشرة عبر الواتساب أو الهاتف لتأكيد موعد ومكان التسليم المناسب لكم. رقم الدعم: +212 6 34 48 64 94.')}</li>
                <li>{parseMarkdownBold('**مصاريف إضافية:** لا توجد أي مصاريف إضافية غير المعلن عنها (20 MAD فقط للتوصيل، أو مجاناً للطلبيات ≥ 400 MAD أو للدار البيضاء).')}</li>
                <li>{parseMarkdownBold('**مناطق التغطية:** التوصيل متاح لجميع المدن والمناطق المغربية عبر شركاء لوجستيين معتمدين.')}</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">آلية تأكيد الطلب</h4>
              <p className="text-slate-600">
                تتم معالجة الطلب بعد ملء استمارة الدفع على الموقع (الاسم، الهاتف، المدينة، العنوان التفصيلي) 
                والموافقة على معالجة البيانات الشخصية (قانون 09-08). يتم إرسال ملخص الطلب تلقائياً عبر الواتساب 
                إلى فريق الدعم للتأكيد والتنسيق. لا يعتبر الطلب نهائياً إلا بعد التأكيد الهاتفي/الواتساب مع العميل.
              </p>
            </div>
          )}

          {/* Section 2 : الإرجاع والاستبدال - Retour/Échange/Retractation */}
          {activeTab === 'returns' && (
            <div className="space-y-4">
              <LegalEntityInfo />
              
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E6007E]"></span>
                سياسة الاستبدال، الإرجاع وحق التراجع
              </h3>
              
              <h4 className="font-semibold text-slate-800">حق التراجع (المادة 17 من القانون 31-08)</h4>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900">
                <p className="font-medium mb-2">كمستهلك، يحق لك التراجع عن طلبك في غضون <strong>7 أيام</strong> من تاريخ الاستلام، دون حاجة لتبرير السبب ودون تحمل غرامات، باستثناء تكاليف الإرجاع المحتملة.</p>
                <p className="text-sm">يتم إبلاغ فريق الدعم عبر الواتساب (+212 6 34 48 64 94) برغبتكم في التراجع مع ذكر رقم الطلب.</p>
              </div>

              <h4 className="font-semibold text-slate-800 mt-2">حالات الاستبدال المجاني (ضمان المطابقة)</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>{parseMarkdownBold('**منتج تالف أو معيب عند الاستلام:** إذا وصلك منتج متضرر أثناء الشحن أو غير مطابق لطلبيتك (خطأ في المرجع، اللون، الحجم)، يحق لك طلب استبداله مجاناً في غضون 7 أيام من تاريخ الاستلام.')}</li>
                <li>{parseMarkdownBold('**إجراءات الطلب:** يكفي التواصل مع فريق الدعم عبر الواتساب مع إرفاق صورة واضحة للمنتج المعني ورقم الطلب، وسنقوم بمعالجة طلبكم فوراً وترتيب الاستبدال.')}</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">استثناءات حق التراجع والاستبدال (لأسباب صحية ووقائية)</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>{parseMarkdownBold('**منتجات التجميل والعناية الشخصية:** لا يمكن إرجاع أو استبدال منتجات التجميل والعناية (ماكياج، كريمات، عطور، مزيلات عرق، شامبو، زيوت، إلخ) التي تم فتح غلافها الأصلي أو تجريبها أو استخدامها، إلا في حالة وجود عيب تصنيع مثبت.')}</li>
                <li>{parseMarkdownBold('**منتجات النظافة والصحة:** مستحضرات الحمام، معقمات، منتجات العناية بالقدمين/اليدين المفتوحة غير قابلة للإرجاع لأسباب صحية.')}</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">الإجراءات والمهل</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>الإبلاغ: خلال 7 أيام من الاستلام عبر الواتساب مع صورة/فيديو للمنتج.</li>
                <li>التحقق: فريق الدعم يتحقق من أهلية الطلب (عيب تصنيع، تلف شحن، عدم مطابقة).</li>
                <li>الاستبدال: يتم شحن المنتج البديل على نفقة المتجر (توصيل مجاني) في حال قبول الطلب.</li>
                <li>التراجع الطوعي: في حال تراجع بدون عيب، يتحمل العميل تكاليف الإرجاع (20 MAD) ويتم الاسترداد بعد استلام المنتج بحالته الأصلية مغلفة.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">الشكاوى والوساطة</h4>
              <p className="text-slate-600">
                في حال عدم الرضا عن معالجة طلبكم، يمكنكم توجيه شكوى كتابية عبر الواتساب أو البريد الإلكتروني 
                (عند توفره). يتم معالجة الشكاوى في أجل أقصاه 15 يوم عمل. كملاذ أخير، يمكن اللجوء إلى 
                جمعية حماية المستهلك أو الجهات القضائية المختصة بالمغرب.
              </p>
            </div>
          )}

          {/* Section 3 : الشروط العامة للبيع (CGV) - Terms */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <LegalEntityInfo />
              
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                الشروط العامة للبيع (CGV) - القانون 31-08
              </h3>
              
              <h4 className="font-semibold text-slate-800">1. مجال التطبيق والأطراف</h4>
              <p className="text-slate-600">
                تحكم هذه الشروط العامة للبيع (CGV) جميع عمليات البيع عن بعد لمنتجات <strong>ماي واي (MyWay)</strong> 
                عبر موقع <strong>BOUCHRA Way</strong> الموجه للمستهلكين المقيمين في المغرب. 
                الطرفان: <strong>المتجر (البائع)</strong> و <strong>العميل (المستهلك)</strong>.
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">2. المعلومات الجوهرية عن المنتجات (المادة 7 قانون 31-08)</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>جميع المنتجات المعروضة هي <strong>منتجات أصلية 100%</strong> من علامة <strong>MyWay</strong>.</li>
                <li>الأسعار معروضة بالدرهم المغربي (MAD) وتشمل جميع الرسوم (TTC).</li>
                <li>الصور والوصفات للاطلاع فقط؛ قد تختلف التعبئة أو الظاهر قليلاً عن الواقع دون تأثير على الجودة.</li>
                <li>التوفر: المخزون يتم تحديثه بانتظام؛ في حالة نفاد منتج بعد الطلب، يتم إبلاغ العميل فوراً واقتراح بديل أو استرداد.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">3. تشكيل العقد وآلية الطلب</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>الطلب يتم عبر الموقع: إضافة للسلة → ملء استمارة الدفع (الاسم، الهاتف، المدينة، العنوان، الموافقة على البيانات الشخصية) → تأكيد.</li>
                <li>إرسال الطلب عبر الواتساب إلى فريق الدعم لا يشكل عقداً نهائياً؛ العقد يتم <strong>عند التأكيد الهاتفي/الواتساب</strong> مع العميل على تفاصيل التوصيل.</li>
                <li>العميل يلتزم بتقديم معلومات دقيقة وكاملة؛ أي خطأ في العنوان/الهاتف قد يؤخر أو يلغي التوصيل.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">4. السعر والدفع</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>الأسعار ثابتة بالدرهم المغربي (MAD) شاملة للرسوم (TTC).</li>
                <li>الدفع <strong>حصرياً عند الاستلام نقداً (COD)</strong>، بدون رسوم خفية.</li>
                <li>لا يتم تحصيل أي مبلغ مسبقاً، ولا يتم تخزين بيانات بنكية.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">5. التوصيل ونقل المخاطر</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>التوصيل في المغرب فقط، خلال 24-72 ساعة حسب المدينة.</li>
                <li>المخاطر تنتقل للعميل عند التسليم الفعلي للمنتج وفحصه.</li>
                <li>في حالة غياب العميل عند التوصيل بعد تنسيق الموعد، يتم محاولة ثانية؛ بعد فشل المحاولات، الطلب يعتبر ملغى.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">6. حق التراجع (المادة 17 قانون 31-08)</h4>
              <p className="text-slate-600">
                مهلة 7 أيام من الاستلام للتراجع دون مبرر. الاستثناءات: منتجات التجميل/العناية المفتوحة، 
                المنتجات المخصصة، المنتجات القابلة للتلف السريع. تكاليف الإرجاع على العميل في حالة تراجع طوعي 
                بدون عيب؛ مجانية في حالة عيب/تلف/عدم مطابقة.
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">7. الضمان القانوني والامتثال</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>المنتجات تستفيد من الضمان القانوني للمطابقة (قانون 31-08) والضمان ضد العيوب الخفية.</li>
                <li>في حالة عدم المطابقة: استبدال أو استرداد حسب اختيار العميل.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">8. حماية المعطيات الشخصية (قانون 09-08)</h4>
              <p className="text-slate-600">
                معالجة البيانات الشخصية تخضع لسياسة الخصوصية (علامة التبويب <strong>حماية المعطيات</strong>) 
                والقانون 09-08. الموافقة على المعالجة شرط لإتمام الطلب.
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">9. الملكية الفكرية</h4>
              <p className="text-slate-600">
                العلامة <strong>MyWay</strong>، الشعارات، الصور، الكتالوجات، والمحتوى محمية. 
                أي استخدام غير مصرح به محظور.
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">10. القوة القاهرة</h4>
              <p className="text-slate-600">
                لا يتحمل أي طرف المسؤولية عن التأخير أو الفشل الناجم عن أحداث خارجة عن إرادته 
                (كوارث طبيعية، إضرابات، قرارات إدارية، انقطاع اتصالات، إلخ).
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">11. القانون الواجب التطبيق والاختصاص</h4>
              <p className="text-slate-600">
                هذه الشروط تخضع <strong>للقانون المغربي</strong>. في حال نزاع، يُفضل التسوية الودية. 
                خلاف ذلك، الاختصاص يعود للمحاكم المغربية المختصة (محكمة مقر المدعى عليه أو مكان التسليم).
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">12. تعديل الشروط</h4>
              <p className="text-slate-600">
                يحتفظ المتجر بحق تعديل هذه الشروط في أي وقت. النسخة السارية هي تلك المنشورة على الموقع 
                بتاريخ الطلب. يُنصح العملاء بالاطلاع عليها بانتظام.
              </p>
            </div>
          )}

          {/* Section 4 : حماية المعطيات الشخصية (CNDP 09-08) - Privacy */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <LegalEntityInfo />
              
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                حماية المعطيات الشخصية - القانون 09-08 واللجنة الوطنية لحماية المعطيات (CNDP)
              </h3>

              <h4 className="font-semibold text-slate-800">1. المسؤول عن المعالجة</h4>
              <p className="text-slate-600">
                المسؤول عن معالجة معطياتكم الشخصية هو: <strong>BOUCHRA Way</strong> (انظر تفاصيل الكيان القانوني أعلاه). 
                يمكنكم التواصل مع المسؤول عن المعالجة أو المكلف بحماية البيانات (DPO إن وجد) عبر:
                <br />
                <strong>الواتساب:</strong> +212 6 34 48 64 94<br />
                <strong>البريد الإلكتروني:</strong> <span className="text-rose-600">[À compléter : privacy@bouchraway.ma]</span>
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">2. المعطيات المجمعة وأساسها القانوني</h4>
              <table className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="p-3 text-right border-b border-slate-200">فئة المعطيات</th>
                    <th className="p-3 text-right border-b border-slate-200">أمثلة</th>
                    <th className="p-3 text-right border-b border-slate-200">الأساس القانوني</th>
                    <th className="p-3 text-right border-b border-slate-200">طابعها</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-100">
                    <td className="p-3 border-slate-100 font-medium">هوية وتواصل</td>
                    <td className="p-3 border-slate-100">الاسم العائلي، الاسم الشخصي، رقم الهاتف (واتساب)، البريد الإلكتروني (اختياري)</td>
                    <td className="p-3 border-slate-100">تنفيذ العقد / التدابير قبل التعاقد (المادة 7 قانون 09-08)</td>
                    <td className="p-3 border-slate-100"><strong>إلزامية</strong> (ما عدا البريد الإلكتروني)</td>
                  </tr>
                  <tr className="bg-slate-50 border-t border-slate-100">
                    <td className="p-3 border-slate-100 font-medium">عنوان التوصيل</td>
                    <td className="p-3 border-slate-100">المدينة، العنوان التفصيلي (الحي، الزنقة، رقم المنزل)</td>
                    <td className="p-3 border-slate-100">تنفيذ العقد / التزام قانوني (توصيل)</td>
                    <td className="p-3 border-slate-100"><strong>إلزامية</strong></td>
                  </tr>
                  <tr className="border-t border-slate-100">
                    <td className="p-3 border-slate-100 font-medium">بيانات الطلب</td>
                    <td className="p-3 border-slate-100">المنتجات، الكميات، المبلغ، تاريخ الطلب، رقم المرجع</td>
                    <td className="p-3 border-slate-100">تنفيذ العقد / مصلحة مشروعة (إدارة الطلبات، المحاسبة)</td>
                    <td className="p-3 border-slate-100">تلقائية</td>
                  </tr>
                  <tr className="bg-slate-50 border-t border-slate-100">
                    <td className="p-3 border-slate-100 font-medium">موافقة CNDP</td>
                    <td className="p-3 border-slate-100">تاريخ ووقت الموافقة، نسخة من نص الموافقة</td>
                    <td className="p-3 border-slate-100">الالتزام القانوني (المادة 7-8 قانون 09-08)</td>
                    <td className="p-3 border-slate-100"><strong>إلزامية</strong> للمعالجة</td>
                  </tr>
                </tbody>
              </table>

              <h4 className="font-semibold text-slate-800 mt-2">3. أغراض المعالجة (الFinalités)</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li><strong>إدارة وتنفيذ الطلبيات:</strong> تجهيز، تغليف، شحن، تسليم المنتجات المطلوبة.</li>
                <li><strong>التواصل مع العميل:</strong> تأكيد الطلب عبر الواتساب/الهاتف، تنسيق موعد ومكان التوصيل، إشعارات الحالة.</li>
                <li><strong>خدمة ما بعد البيع:</strong> معالجة طلبات الاستبدال، الإرجاع، الشكاوى، الضمان.</li>
                <li><strong>الالتزامات القانونية والمحاسبية:</strong> الفوترة، المحاسبة، حفظ المستندات القانونية (10 سنوات وفق التشريع المغربي).</li>
                <li><strong>الأمان ومكافحة الاحتيال:</strong> التحقق من صحة أرقام الهواتف، منع الطلبات الوهمية.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">4. المستلمون ونقل المعطيات</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li><strong>فريق الدعم الداخلي (BOUCHRA Way):</strong> لمعالجة الطلبات والتواصل.</li>
                <li><strong>شركاء التوصيل (شركات الشحن):</strong> الاسم، الهاتف، العنوان، المدينة <strong>فقط</strong> لتنفيذ التوصيل. لا يتم مشاركة البريد الإلكتروني أو تفاصيل الطلب المالية.</li>
                <li><strong>قناة الواتساب (WhatsApp Business / Meta):</strong> يتم إرسال ملخص الطلب عبر الواتساب إلى رقم الدعم المخصص. تنطبق سياسة خصوصية Meta/WhatsApp على البيانات المتبادلة عبر هذه المنصة.</li>
                <li><strong>الجهات القضائية/الإدارية:</strong> فقط عند طلب قانوني ملزم أو للدفاع عن حقوق المتجر.</li>
              </ul>
              <p className="text-slate-600 mt-2 text-sm">
                <strong>لا يتم بيع أو تأجير أو مشاركة معطياتكم مع أطراف ثالثة لأغراض تجارية/تسويقية خارج نطاق تنفيذ الطلب.</strong>
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">5. مدة الاحتفاظ بالمعطيات</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li><strong>بيانات الحساب/الطلب:</strong> مدة العلاقة التجارية + 10 سنوات للأرشفة القانونية (محاسبة، فوترة).</li>
                <li><strong>بيانات التواصل (الهاتف، العنوان):</strong> محذوفة بعد 3 سنوات من آخر نشاط/طلب، ما لم يطلب العميل الحذف مبكراً.</li>
                <li><strong>سجلات الموافقة (CNDP):</strong> محفوظة لمدة 5 سنوات كدليل على الامتثال للقانون 09-08.</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">6. حقوقكم بموجب القانون 09-08 (المواد 10 إلى 14)</h4>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-blue-900 space-y-2">
                <p className="font-semibold">يمكنكم ممارسة الحقوق التالية في أي وقت، مجاناً، عبر التواصل معنا (واتساب/بريد إلكتروني):</p>
                <ul className="space-y-1 list-disc list-inside text-blue-800">
                  <li><strong>حق الوصول (المادة 10):</strong> الحصول على تأكيد لمعالجة معطياتكم ونسخة منها.</li>
                  <li><strong>حق التصحيح (المادة 11):</strong> طلب تعديل المعطيات غير الدقيقة أو غير المكتملة.</li>
                  <li><strong>حق الاعتراض (المادة 12):</strong> الاعتراض على المعالجة لأسباب مشروعة، بما في ذلك لأغراض التسويق المباشر.</li>
                  <li><strong>حق الحذف / النسيان (المادة 13):</strong> طلب حذف معطياتكم عندما لم تعد ضرورية للأغراض المجمعة لها، أو عند سحب الموافقة، أو في حالة معالجة غير قانونية (مع مراعاة الالتزامات القانونية للاحتفاظ بالفواتير).</li>
                  <li><strong>حق تقييد المعالجة:</strong> طلب تعليق المعالجة في حالات معينة (دقة البيانات متنازع عليها، معالجة غير قانونية، إلخ).</li>
                </ul>
              </div>

              <h4 className="font-semibold text-slate-800 mt-2">7. كيفية ممارسة حقوقكم</h4>
              <p className="text-slate-600">
                توجيه طلب مكتوب وموقع (أو عبر الواتساب مع إثبات الهوية) إلى:
              </p>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li><strong>واتساب:</strong> +212 6 34 48 64 94 (ذكر "طلب ممارسة حقوق CNDP / قانون 09-08")</li>
                <li><strong>بريد إلكتروني:</strong> <span className="text-rose-600">[À compléter : privacy@bouchraway.ma]</span></li>
                <li><strong>عبر البريد العادي:</strong> <span className="text-rose-600">[À compléter : عنوان المقر الاجتماعي]</span></li>
              </ul>
              <p className="text-slate-600 mt-2">
                سنرد على طلبكم في أجل <strong>أقصاه شهر واحد</strong> من استلام الطلب الكامل (قابلة للتمديد بشهرين إضافيين للتعقيد، مع إشعاركم).
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">8. الحق في تقديم شكوى لدى CNDP</h4>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900">
                <p className="font-semibold">إذا كنتم تعتبرون أن معالجة معطياتكم لا تمتثل للقانون 09-08، يحق لكم تقديم شكوى لدى:</p>
                <p className="mt-2"><strong>اللجنة الوطنية لحماية المعطيات ذات الطابع الشخصي (CNDP)</strong></p>
                <p className="mt-1 text-sm">الموقع الرسمي: <a href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-700">www.cndp.ma</a></p>
                <p className="mt-1 text-sm">العنوان: حي الرياض، الرباط، المغرب</p>
              </div>

              <h4 className="font-semibold text-slate-800 mt-2">9. أمان المعطيات</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>نطبّق تدابير تقنية وتنظيمية مناسبة (تشفير HTTPS، تنظيف المدخلات ضد XSS، وصول محدود، وعي الفريق).</li>
                <li>لا يتم تخزين أي بيانات بنكية أو بطائق ائتمان.</li>
                <li>في حالة خرق أمني محتمل يمس معطياتكم، سنُبلغكم والـ CNDP وفق الآجال القانونية (المادة 21 قانون 09-08).</li>
              </ul>

              <h4 className="font-semibold text-slate-800 mt-2">10. ملفات تعريف الارتباط (Cookies) وتتبع</h4>
              <p className="text-slate-600">
                الموقع يستخدم <strong>ملفات تعريف ارتباط تقنية ضرورية فقط</strong> (جلسة التسوق، تفضيل اللغة، اتجاه RTL/LTR). 
                لا يتم استخدام ملفات تتبع إعلانية، تحليلية خارجية، أو بكسلات طرف ثالث دون موافقة صريحة مسبقة.
              </p>

              <h4 className="font-semibold text-slate-800 mt-2">11. تحديث سياسة الخصوصية</h4>
              <p className="text-slate-600">
                قد يتم تحديث هذه السياسة لتعكس تغييرات قانونية أو تشغيلية. النسخة السارية منشورة في هذه النافذة 
                بتاريخ آخر تحديث. يُنصح بالاطلاع عليها دورياً.
              </p>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                <p>آخر تحديث: <strong>نوفمبر 2026</strong></p>
                <p>النسخة المرجعية: الفرنسية / العربية (هذه النسخة)</p>
              </div>
            </div>
          )}

        </div>

        {/* Pied de la modale */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
            aria-label="إغلاق النافذة"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
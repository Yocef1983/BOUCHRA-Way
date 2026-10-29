import React from 'react';
import { Phone, ShieldCheck, Truck, Clock, Banknote, Sparkles, RotateCcw, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-12 pb-8 mt-16 border-t border-gray-800 dir-rtl scroll-mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Bandeau supérieur de réassurance spécial Maroc */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 mb-10 border-b border-gray-800 text-center">
          <div className="flex flex-col items-center p-3 rounded-xl bg-gray-800/40 border border-gray-800">
            <Truck size={24} className="text-emerald-400 mb-2" />
            <h5 className="text-sm font-bold text-white">التوصيل لجميع مناطق المغرب</h5>
            <p className="text-[11px] text-gray-400 mt-1">توصيل سريع وآمن حتى باب المنزل</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-gray-800/40 border border-gray-800">
            <Banknote size={24} className="text-amber-400 mb-2" />
            <h5 className="text-sm font-bold text-white">الدفع عند الاستلام</h5>
            <p className="text-[11px] text-gray-400 mt-1">لا تدفع حتى تستلم طلبيتك وتتأكد منها</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-gray-800/40 border border-gray-800">
            <ShieldCheck size={24} className="text-rose-400 mb-2" />
            <h5 className="text-sm font-bold text-white">منتجات أصلية 100%</h5>
            <p className="text-[11px] text-gray-400 mt-1">ضمان الجودة الرسمية من ماي واي</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-gray-800/40 border border-gray-800">
            <Clock size={24} className="text-purple-400 mb-2" />
            <h5 className="text-sm font-bold text-white">خدمة واتساب 7/7</h5>
            <p className="text-[11px] text-gray-400 mt-1">إجابة فورية واستشارات مجانية</p>
          </div>
        </div>

        {/* قسم الثقة والشفافية : السياسات الأساسية للمتجر (P1/P2) */}
        <div className="mb-12 p-6 rounded-2xl bg-gray-800/60 border border-gray-700/60">
          <div className="text-center md:text-right mb-6">
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <HelpCircle size={15} />
              <span>الثقة والشفافية • سياسات متجر بوشرى واي</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              كل ما تحتاج معرفته حول تجربة التسوق والتوصيل معنا
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-300">
            
            {/* 1. سياسة التوصيل */}
            <div className="space-y-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Truck size={18} />
                <h5>سياسة التوصيل</h5>
              </div>
              <p className="text-gray-400 leading-relaxed text-[11px]">
                نوفر التوصيل لكافة مدن ومناطق المملكة المغربية خلال <strong>24 إلى 48 ساعة</strong> للمدن الكبرى، و72 ساعة للمناطق النائية. يتواصل معكم الموزع هاتفياً لتحديد الوقت والمكان المناسب.
              </p>
            </div>

            {/* 2. الدفع عند الاستلام */}
            <div className="space-y-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Banknote size={18} />
                <h5>الدفع عند الاستلام (COD)</h5>
              </div>
              <p className="text-gray-400 leading-relaxed text-[11px]">
                تسوق بكل أمان وراحة بال دون الحاجة لبطاقة بنكية. السداد يتم <strong>نقداً يداً بيد</strong> للموزع بعد استلام الطرد والتأكد من سلامة المنتجات ومطابقتها لطلبك.
              </p>
            </div>

            {/* 3. شروط الإرجاع 7 أيام */}
            <div className="space-y-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <RotateCcw size={18} />
                <h5>شروط الإرجاع (7 أيام)</h5>
              </div>
              <p className="text-gray-400 leading-relaxed text-[11px]">
                نضمن حق الإرجاع أو الاستبدال خلال <strong>7 أيام من الاستلام</strong> في حال وجود أي عيب مصنعي أو خطأ، بشرط أن يظل المنتج في حالته وعبوته الأصلية المغلقة لضمان شروط النظافة والسلامة.
              </p>
            </div>

            {/* 4. خدمة الزبناء واتساب */}
            <div className="space-y-2 p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                  <Phone size={18} />
                  <h5>التواصل المباشر</h5>
                </div>
                <p className="text-gray-400 leading-relaxed text-[11px] mb-3">
                  فريقنا رهن إشارتكم لمتابعة الشحنات، الاستفسار عن المنتجات أو المساعدة في التسجيل على مدار الأسبوع.
                </p>
              </div>
              <a
                href="https://wa.me/212634486494?text=مرحباً%20بوشرى%20واي،%20أود%20الاستفسار%20عن%20الطلبيات%20أو%20السياسات"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-[11px] transition"
              >
                <Phone size={13} />
                <span>واتساب مباشر: 06 34 48 64 94</span>
              </a>
            </div>

          </div>
        </div>

        {/* Colonnes principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-right">
          {/* Colonne 1 : À propos */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Sparkles size={20} className="text-rose-500" />
              <h3 className="text-xl font-bold text-white tracking-wide">BOUCHRA WAY</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              بوابتك الرسمية لمنتجات ماي واي بالمغرب. نوفر لك أرقى تشكيلات العطور، الماكياج، العناية بالبشرة والمنظفات، مع فرصة ذهبية لزيادة الدخل وتكوين فريق عمل ناجح.
            </p>
            <p className="text-xs text-rose-400 font-medium">
              عائلة واحدة - فرصة نجاح مستمرة
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-3 border-b border-gray-800 pb-2">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#catalogue" className="hover:text-rose-400 transition-colors">تشكيلة المنتجات المميزة</a>
              </li>
              <li>
                <a href="#opportunity" className="hover:text-rose-400 transition-colors">فرصة زيادة الدخل (زود دخلك)</a>
              </li>
              <li>
                <a href="#register" className="hover:text-rose-400 transition-colors">استمارة التسجيل في ماي واي</a>
              </li>
              <li>
                <a 
                  href="https://wa.me/212634486494?text=مرحباً%20بوشرى%20واي،%20أود%20الاستفسار%20عن%20الكتالوج%20والعروض" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 transition-colors"
                >
                  طلب الكتالوج الشهري عبر واتساب
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Contact Direct & WhatsApp */}
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-3 border-b border-gray-800 pb-2">التواصل والمساعدة المباشرة</h4>
            <p className="text-gray-400 text-xs mb-4">
              فريقنا جاهز لمساعدتك في اختيار المنتجات أو الإجابة على استفسارات تسجيل العضوية.
            </p>
            <a 
              href="https://wa.me/212634486494?text=مرحباً%20بوشرى%20واي،%20أود%20التواصل%20معكم%20للحصول%20على%20المساعدة" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md"
            >
              <Phone size={16} /> تواصل معنا عبر واتساب: 06 34 48 64 94
            </a>
          </div>
        </div>

        {/* Droits & Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 Bouchra Way Maroc - جميع الحقوق محفوظة. تجربة تسوق آمنة مع الدفع عند الاستلام وضمان الجودة.</p>
        </div>
      </div>
    </footer>
  );
}

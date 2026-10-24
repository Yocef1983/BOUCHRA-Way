import React, { useState } from 'react';
import { FileText, Download, Eye, CheckCircle2, UserCheck } from 'lucide-react';

export default function RegistrationForm() {
  const [hasMembership, setHasMembership] = useState<'yes' | 'no'>('no');
  const [formData, setFormData] = useState({
    fullName: '',
    cin: '',
    phoneWhatsapp: '',
    phoneAlt: '',
    city: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `طلب تسجيل عضوية جديدة - Bouchra Way:\n\n` +
      `👤 الاسم الكامل: ${formData.fullName}\n` +
      `❓ هل لديك عضوية في ماي واي؟: ${hasMembership === 'yes' ? 'نعم' : 'لا'}\n` +
      `💳 رقم البطاقة الوطنية/ CIN: ${formData.cin}\n` +
      `📱 رقم الهاتف - يدعم واتساب: ${formData.phoneWhatsapp}\n` +
      `📞 رقم هاتف آخر: ${formData.phoneAlt}\n` +
      `🏙️ المدينة / المنطقة: ${formData.city}\n` +
      `📍 العنوان بالتفصيل: ${formData.address}`;
    
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="register" className="py-10 bg-gradient-to-b from-pink-50/50 to-white dir-rtl" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* قسم الفرصة والمميزات */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">
              <UserCheck className="w-4 h-4" />
              فرصة فريدة لزيادة الدخل
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 leading-snug">
              انضمي الآن لعائلة بوشرى واي واكتسبي استقلالك المالي!
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              تقدم بوشرى واي فرصة عمل ممتازة لتطوير وتزايد الدخل بصورة مستمرة، مع الحفاظ على ولاء أعضائها ومستهلكيها بتقديم مكافآت مجزية ونسب خصم تصل إلى 50%.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 font-medium">خصم مباشر يصل إلى 50% على جميع المنتجات.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 font-medium">مكافآت مالية شهرية حسب مبيعاتك ومبيعات فريقك.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 font-medium">هدايا قيمة كتالوجية وأجهزة منزلية متطورة.</span>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-2">
              <p className="font-bold">⚠️ ملاحظة مهمة:</p>
              <p>هذا الموقع مخصص لعمل عضويات لمن لم يسبق لهم عمل عضوية في ماي واي من قبل أو لمن كان لديه عضوية منتهية يريد عمل عضوية جديدة.</p>
            </div>
          </div>

          {/* استمارة التسجيل المطابقة للتوجيهات */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-pink-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-pink-700 flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                استمارة التسجيل
              </h3>
              <p className="text-xs text-gray-500 mt-1">يرجى ملء البيانات بدقة لإنشاء حساب العضوية الخاص بك</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">الاسم الكامل (*)</label>
                <input
                  type="text"
                  required
                  placeholder="الاسم والنسب الكامل"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-right"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* سؤال العضوية */}
              <div className="p-3 bg-pink-50/50 rounded-lg border border-pink-100">
                <label className="block text-gray-700 font-bold mb-2">(*) هل لديك عضوية في ماي واي؟</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="membership"
                      checked={hasMembership === 'yes'}
                      onChange={() => setHasMembership('yes')}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <span>نعم</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="membership"
                      checked={hasMembership === 'no'}
                      onChange={() => setHasMembership('no')}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <span>لا</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">(*) رقم البطاقة الوطنية/ CIN</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: AB123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-right"
                    value={formData.cin}
                    onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">(*) رقم الهاتف - يدعم واتساب</label>
                  <input
                    type="tel"
                    required
                    placeholder="06XXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-right"
                    value={formData.phoneWhatsapp}
                    onChange={(e) => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">رقم هاتف آخر</label>
                  <input
                    type="tel"
                    placeholder="اختياري"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-right"
                    value={formData.phoneAlt}
                    onChange={(e) => setFormData({ ...formData, phoneAlt: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">(*) المدينة / المنطقة</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: الدار البيضاء، الرباط..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-right"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">(*) العنوان بالتفصيل</label>
                <textarea
                  required
                  rows={2}
                  placeholder="الحي، الشارع، أرقام الزنقة أو البناية وعلامة مميزة..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none text-right"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-200 text-sm mt-2"
              >
                إرسال استمارة التسجيل عبر واتساب 🚀
              </button>
            </form>

            {/* أزرار الكتالوج */}
            <div id="catalog" className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <a
                href="#"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                تحميل الكتالوج الشهر الحالي (PDF)
              </a>

              <a
                href="#"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition shadow-sm"
              >
                <Eye className="w-4 h-4" />
                عرض الكتالوج والتصفح المباشر
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'سلمى العبدلاوي',
    city: 'الدار البيضاء (Casablanca)',
    rating: 5,
    date: 'منذ يومين',
    comment: 'وصلاتني المنتجات في أقل من 24 ساعة للدار البيضاء. جودة رائعة و الدفع عند الاستلام كيعطي ثقة كبيرة. شكرا bouchra way!',
    productName: 'مجموعة العناية بالوجه MyWay',
    verified: true,
  },
  {
    id: '2',
    name: 'مريم بناني',
    city: 'الرباط (Rabat)',
    rating: 5,
    date: 'منذ 4 أيام',
    comment: 'Le parfum est 100% original, la livraison à Rabat était très rapide. Je recommande vivement pour la qualité et le sérieux.',
    productName: 'عطر MyWay الأنثوي',
    verified: true,
  },
  {
    id: '3',
    name: 'فاطمة الزهراء العمراني',
    city: 'فاس (Fès)',
    rating: 5,
    date: 'منذ أسبوع',
    comment: 'صراحة التعامل راقي و المنتجات أصلية. جربت كريم البشارة و النتيجة ممتازة من الأسبوع الأول.',
    productName: 'كريم Pearly للوجه',
    verified: true,
  },
  {
    id: '4',
    name: 'يوسف التازي',
    city: 'مراكش (Marrakech)',
    rating: 5,
    date: 'منذ أسبوعين',
    comment: 'طلب زوجتي وصل لمراكش في حالة جيدة. التغليف محكم و المعاملة ممتازة عبر الواتساب.',
    productName: 'منتجات التظيف المنزلية Power',
    verified: true,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100 dir-rtl" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>ثقة أكثر من +500 عميل في المغرب</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            آراء عميلاتنا و عملائنا <span className="text-emerald-600">التجارب الحقيقية</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Ce que disent nos clientes à propos de nos produits et de notre service de livraison rapide.
          </p>

          {/* Note moyenne globale */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-slate-800 text-sm">4.9 / 5.0</span>
            <span className="text-xs text-slate-400">(تقييمات مأكدة)</span>
          </div>
        </div>

        {/* Grille des avis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-emerald-100" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.city}</p>
                  </div>
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      مشتري مؤكد
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-emerald-600 font-medium truncate">
                  المنتج: {item.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
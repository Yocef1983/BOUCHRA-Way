export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  altText: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  // --- MAQUILLAGE ---
  {
    id: '1',
    name: 'قلم تصحيح العيوب كارلا',
    category: 'maquillage',
    price: 65,
    image: '/image/maquillage-carla-crayoncorrecteur-myway.jpg',
    altText: 'قلم تصحيح العيوب ماي واي المغرب - maquillage carla crayon correcteur myway',
    description: 'قلم تصحيح عيوب البشرة لتغطية مثالية وإشراقة طبيعية.'
  },
  {
    id: '2',
    name: 'ملمع الشفاه العنابي',
    category: 'maquillage',
    price: 55,
    image: '/image/maquillage-gloss-levres-myway.jpg',
    altText: 'ملمع الشفاه ماي واي - maquillage gloss levres myway',
    description: 'ملمع شفاه يمنح شفاهك حجماً ولمعاناً جذاباً طوال اليوم.'
  },
  {
    id: '3',
    name: 'كريم الأساس بيلي بي',
    category: 'maquillage',
    price: 110,
    image: '/image/maquillage-pearlybb-fonddeteint-myway.jpg',
    altText: 'كريم أساس بيلي بي ماي واي - maquillage pearly bb fond de teint myway',
    description: 'كريم أساس يوحّد لون البشرة ويخفي الشوائب بنعومة.'
  },
  {
    id: '4',
    name: 'ماسcara بيارلي للرموش',
    category: 'maquillage',
    price: 75,
    image: '/image/maquillage-pearly-mascara-myway.jpg',
    altText: 'ماسcara بيارلي للرموش ماي واي - maquillage pearly mascara myway',
    description: 'ماسcara لتكثيف وتطويل الرموش نظرة ساحرة وجذابة.'
  },
  {
    id: '5',
    name: 'أحمر الشفاه الأحمر الكلاسيكي',
    category: 'maquillage',
    price: 60,
    image: '/image/maquillage-red-rougealevrevs-myway.jpg',
    altText: 'أحمر شفاه أحمر ماي واي - maquillage red rouge a levres myway',
    description: 'أحمر شفاه ثابت بلون جريء وأنيق يناسب كل المناسبات.'
  },

  // --- PARFUMS ---
  {
    id: '6',
    name: 'عطر كلاسيك رجالي',
    category: 'parfum',
    price: 130,
    image: '/image/parfum-classic-homme-myway.jpg',
    altText: 'عطر كلاسيك رجالي ماي واي - parfum classic homme myway',
    description: 'عطر رجالي راقي يعكس الأصالة والأناقة.'
  },
  {
    id: '7',
    name: 'عطر كريستال نسائي',
    category: 'parfum',
    price: 140,
    image: '/image/parfum-crystal-femme-myway.jpg',
    altText: 'عطر كريستال نسائي ماي واي - parfum crystal femme myway',
    description: 'عطر نسائي فواح ومنعش يدوم طويلاً.'
  },
  {
    id: '8',
    name: 'عطر دون ستوب رجالي',
    category: 'parfum',
    price: 135,
    image: '/image/parfum-dontstop-homme-myway.jpg',
    altText: 'عطر دون ستوب رجالي ماي واي - parfum dont stop homme myway',
    description: 'عطر بطابع حيوي ومميز للشباب.'
  },
  {
    id: '9',
    name: 'عطر إيموشن نسائي',
    category: 'parfum',
    price: 140,
    image: '/image/parfum-emotions-femme-myway.jpg',
    altText: 'عطر إيموشن نسائي ماي واي - parfum emotions femme myway',
    description: 'عطر يعبر عن المشاعر الرقيقة والأنوثة الطاغية.'
  },
  {
    id: '10',
    name: 'عطر إكسبشنال رجالي',
    category: 'parfum',
    price: 150,
    image: '/image/parfum-exceptional-homme-myway.jpg',
    altText: 'عطر إكسبشنال رجالي ماي واي - parfum exceptional homme myway',
    description: 'عطر استثنائي يترك انطباعاً قوياً لا يُنسى.'
  },
  {
    id: '11',
    name: 'عطر فيحاء نسائي',
    category: 'parfum',
    price: 130,
    image: '/image/parfum-fayhaa-femme-myway.jpg',
    altText: 'عطر فيحاء نسائي ماي واي - parfum fayhaa femme myway',
    description: 'نفحات عطرية شرقية ساحرة.'
  },
  {
    id: '12',
    name: 'عطر همسات نسائي',
    category: 'parfum',
    price: 125,
    image: '/image/parfum-hamassat-femme-myway.jpg',
    altText: 'عطر همسات نسائي ماي واي - parfum hamassat femme myway',
    description: 'همسات عطرية رقيقة تلامس الروح.'
  },
  {
    id: '13',
    name: 'عطر ليتي نسائي',
    category: 'parfum',
    price: 130,
    image: '/image/parfum-lete-femme-myway.jpg',
    altText: 'عطر ليتي نسائي ماي واي - parfum lete femme myway',
    description: 'انتعاش الصيف في عطر نسائي مميز.'
  },
  {
    id: '14',
    name: 'عطر ماي واي النسائي الأصلي',
    category: 'parfum',
    price: 160,
    image: '/image/parfum-myway-femme.jpg',
    altText: 'عطر ماي واي نسائي - parfum myway femme',
    description: 'العطر الرئيسي الأكثر طلباً وأناقة.'
  },
  {
    id: '15',
    name: 'عطر وان رجالي',
    category: 'parfum',
    price: 135,
    image: '/image/parfum-one-homme-myway.jpg',
    altText: 'عطر وان رجالي ماي واي - parfum one homme myway',
    description: 'عطر يجسد الثقة والتميز.'
  },
  {
    id: '16',
    name: 'عطر بلاتينيوم رجالي',
    category: 'parfum',
    price: 145,
    image: '/image/parfum-platinum-homme-myway.jpg',
    altText: 'عطر بلاتينيوم رجالي ماي واي - parfum platinum homme myway',
    description: 'فخامة البلاتين بين إيديك.'
  },
  {
    id: '17',
    name: 'عطر برينسيس نسائي',
    category: 'parfum',
    price: 140,
    image: '/image/parfum-princesse-femme-myway.jpg',
    altText: 'عطر برينسيس نسائي ماي واي - parfum princesse femme myway',
    description: 'عطر الأميرة لإطلالة ملكية.'
  },
  {
    id: '18',
    name: 'عطر سيليكشن رجالي',
    category: 'parfum',
    price: 135,
    image: '/image/parfum-selection-homme-myway.jpg',
    altText: 'عطر سيليكشن رجالي ماي واي - parfum selection homme myway',
    description: 'اختيار الرجل العصري الجذاب.'
  },
  {
    id: '19',
    name: 'عطر سندباد رجالي',
    category: 'parfum',
    price: 130,
    image: '/image/parfum-sindibad-homme-myway.jpg',
    altText: 'عطر سندباد رجالي ماي واي - parfum sindibad homme myway',
    description: 'عطر المغامرة والانتعاش.'
  },
  {
    id: '20',
    name: 'عطر سبورتي أبيض',
    category: 'parfum',
    price: 120,
    image: '/image/parfum-sporty-blanc-myway.jpg',
    altText: 'عطر سبورتي أبيض ماي واي - parfum sporty blanc myway',
    description: 'انتعاش رياضي خفيف ومثالي للاستخدام اليومي.'
  },
  {
    id: '21',
    name: 'عطر سبورتي أسود رجالي',
    category: 'parfum',
    price: 120,
    image: '/image/parfum-sporty-noir-homme-myway.jpg',
    altText: 'عطر سبورتي أسود رجالي ماي واي - parfum sporty noir homme myway',
    description: 'طاقة وحيوية برائحة رجالية رياضية.'
  },
  {
    id: '22',
    name: 'عطر تندر نسائي',
    category: 'parfum',
    price: 130,
    image: '/image/parfum-tender-femme-myway.jpg',
    altText: 'عطر تندر نسائي ماي واي - parfum tender femme myway',
    description: 'رقة ونعومة تدوم طوال اليوم.'
  },

  // --- PRODUITS MÉNAGERS ---
  {
    id: '23',
    name: 'جل إضافي لتنظيف الأواني والملابس',
    category: 'menage',
    price: 45,
    image: '/image/produit-power-extra-gel-lessive-menagers-maison-myway.jpg',
    altText: 'جل تنظيف منزلي ماي واي - produit power extra gel lessive menagers maison myway',
    description: 'قوة إضافية لمحاربة الدهون والأوساخ الصعبة.'
  },
  {
    id: '24',
    name: 'منظف متعدد الاستعمالات للأرضيات',
    category: 'menage',
    price: 40,
    image: '/image/produit-clean-multiusage-sols-maison-menagers-myway.jpg',
    altText: 'منظف أرضيات متعدد الاستعمالات ماي واي - produit clean multiusage sols maison menagers myway',
    description: 'تطهير عمق ولمعان براق لكل أرضيات المنزل.'
  },
  {
    id: '25',
    name: 'بخاخ لتنظيف وتلميع الخشب',
    category: 'menage',
    price: 50,
    image: '/image/produit-clean-spray-bois-maison-menagers-myway.jpg',
    altText: 'بخاخ تنظيف الخشب ماي واي - produit clean spray bois maison menagers myway',
    description: 'يحافظ على بريق الأثاث الخشبى ويحميه من الغبار.'
  },
  {
    id: '26',
    name: 'عجينة الهلوبة التنظيفية متعددة الاستعمالات',
    category: 'menage',
    price: 55,
    image: '/image/produit-elhalouba-pate-nettoyante-multi-usage-maison-menagers-myway.jpg',
    altText: 'عجينة الهلوبة منظفة ماي واي - produit elhalouba pate nettoyante multi usage maison menagers myway',
    description: 'المنتج السحري لإزالة البواقي الصعبة والأوساخ المستعصية.'
  },
  {
    id: '27',
    name: 'مسحوق الغسيل الفعال للملابس',
    category: 'menage',
    price: 85,
    image: '/image/produit-power-lessive-maison-menagers-myway.jpg',
    altText: 'مسحوق غسيل ماي واي - produit power lessive maison menagers myway',
    description: 'نظافة ناصعة وبياض مشرق لملابس العائلة.'
  },
  {
    id: '28',
    name: 'بخاخ مزيل الدهون القوي للمطبخ',
    category: 'menage',
    price: 50,
    image: '/image/produit-power-menagers-maison-spray-degraissant-puissant-cuisine-myway.jpg',
    altText: 'بخاخ مزيل الدهون المطبخ ماي واي - produit power menagers maison spray degraissant puissant cuisine myway',
    description: 'يزيل أخبث الدهون والزيوت في المطبخ بكل سهولة.'
  },

  // --- SOINS CAPILLAIRES (شعر) ---
  {
    id: '29',
    name: 'زيت طبيعي للشعر ضد تساقط الشعر بالثوم',
    category: 'soin-capillaire',
    price: 70,
    image: '/image/soin-capillaire-natures-cheveux-huile-antichute-ails-myway.jpg',
    altText: 'زيت ضد تساقط الشعر بالثوم ماي واي - soin capillaire natures cheveux huile antichute ails myway',
    description: 'يغذي بصيلات الشعر ويحارب التساقط بفعالية.'
  },
  {
    id: '30',
    name: 'شامبو بالثوم الطبيعي ضد التساقط',
    category: 'soin-capillaire',
    price: 65,
    image: '/image/soin-capillaire-natures-cheveux-antichute-shampoing-ail-myway.jpg',
    altText: 'شامبو بالثوم ضد التساقط ماي واي - soin capillaire natures cheveux antichute shampoing ail myway',
    description: 'شامبو مقوي لفروة الرأس والحد من تساقط الشعر.'
  },
  {
    id: '31',
    name: 'زيت ترطيب الشعر بجوز الهند الطبيعي',
    category: 'soin-capillaire',
    price: 70,
    image: '/image/soin-capillaire-natures-cheveux-huile-hydratant-noix-coco-myway.jpg',
    altText: 'زيت جوز الهند للشعر ماي واي - soin capillaire natures cheveux huile hydratant noix coco myway',
    description: 'ترطيب عمق ولمعان فائق لشعر جاف ومتضرر.'
  },
  {
    id: '32',
    name: 'زيت السمسم المغذي للشعر',
    category: 'soin-capillaire',
    price: 65,
    image: '/image/soin-capillaire-natures-cheveux-huile-sesame-nourissant-myway.jpg',
    altText: 'زيت السمسم المغذي للشعر ماي واي - soin capillaire natures cheveux huile sesame nourrissant myway',
    description: 'يغذي الشعر من الجذور حتى الأطراف.'
  },
  {
    id: '33',
    name: 'شامبو مغذي بخلاصة جوز الهند',
    category: 'soin-capillaire',
    price: 60,
    image: '/image/soin-capillaire-natures-cheveux-shampoing-norissant-noix-coco-natures.jpg',
    altText: 'شامبو جوز الهند المغذي ماي واي - soin capillaire natures cheveux shampoing norissant noix coco natures',
    description: 'شامبو مرطب يترك الشعر ناعماً ورائحة منعشة.'
  },
  {
    id: '34',
    name: 'كريمة الثوم المعالجة لتساقط الشعر',
    category: 'soin-capillaire',
    price: 65,
    image: '/image/soin-capillaire-natures-creme-ails-antichute-myway.jpg',
    altText: 'كريمة الثوم للشعر ماي واي - soin capillaire natures creme ails antichute myway',
    description: 'حمام كريم مغذي يعالج الشعر التالف والمتقصف.'
  },
  {
    id: '35',
    name: 'زيت أساسي مرمم للشعر المتعب',
    category: 'soin-capillaire',
    price: 75,
    image: '/image/soin-capillaire-refill-cheveux-huile-essentielle-myway.jpg',
    altText: 'زيت أساسي للشعر ماي واي - soin capillaire refill cheveux huile essentielle myway',
    description: 'إصلاح سريع لألياف الشعر التالفة.'
  },
  {
    id: '36',
    name: 'سيروم بخاخ ضد تساقط الشعر',
    category: 'soin-capillaire',
    price: 80,
    image: '/image/soin-capillaire-refill-cheveux-serum-spray-antichute-myway.jpg',
    altText: 'سيروم بخاخ للشعر ماي واي - soin capillaire refill cheveux serum spray antichute myway',
    description: 'بخاخ مقوي يمنح الشعر حيوية ويحمي أطرافه.'
  },

  // --- SOINS CORPS (الجسم) ---
  {
    id: '37',
    name: 'كريم إبنوسينا للتشققات والجفاف الشديد',
    category: 'soin-corps',
    price: 55,
    image: '/image/soin-corps-ibnosina-fisseurs-crevasses-secheresse-peau-myway.jpg',
    altText: 'كريم إبنوسينا للتشققات ماي واي - soin corps ibnosina fisseurs crevasses secheresse peau myway',
    description: 'علاج فعال للتشققات والخشونة الشديدة بالبشرة.'
  },
  {
    id: '38',
    name: 'كريم بريتي برايد لتفتيح المناطق الحساسة',
    category: 'soin-corps',
    price: 75,
    image: '/image/soin-corps-pretybride-creme-eclaircissante-zones-sombres-sensible-myway.jpg',
    altText: 'كريم تفتيح المناطق الحساسة ماي واي - soin corps pretybride creme eclaircissante zones sensibles myway',
    description: 'تفتيح آمن وتوحيد لون البشرة للمناطق الحساسة.'
  },
  {
    id: '39',
    name: 'كريم رفاين مرطب لليدين',
    category: 'soin-corps',
    price: 45,
    image: '/image/soin-corps-refine-creme-hydratante-mains-myway.jpg',
    altText: 'كريم مرطب لليدين ماي واي - soin corps refine creme hydratante mains myway',
    description: 'نعومة فائقة وحماية لليدين من الجفاف.'
  },
  {
    id: '40',
    name: 'كريم صوبريت المفتح للمناطق الداكنة',
    category: 'soin-corps',
    price: 70,
    image: '/image/soin-corps-sobright_creme_eclaircissante_zones_sombres_hydratante_myway.jpg',
    altText: 'كريم صوبريت المفتح ماي واي - soin corps sobright creme eclaircissante zones sombres hydratante myway',
    description: 'ترطيب وتفتيح فعال للمناطق الداكنة بالجسم.'
  },
  {
    id: '41',
    name: 'مزيل العرق الطبيعي سبرينج المنعش',
    category: 'soin-corps',
    price: 40,
    image: '/image/soin-corps-spring-deodorant-naturel_myway.jpg',
    altText: 'مزيل عرق طبيعي ماي واي - soin corps spring deodorant naturel myway',
    description: 'حماية طوال اليوم وانتعاش يدوم.'
  },
  {
    id: '42',
    name: 'كريم مرطب بعد الشمس ومبرد للجسم',
    category: 'soin-corps',
    price: 65,
    image: '/image/soin-corps-sunout-creme-hydratante-apres-soleil-cooling-myway.jpg',
    altText: 'كريم مرطب بعد الشمس ماي واي - soin corps sunout creme hydratante apres soleil cooling myway',
    description: 'هدئ ورطب بشرتك بعد التعرض لأشعة الشمس.'
  },

  // --- SOINS VISAGE (الوجه) ---
  {
    id: '43',
    name: 'كريم أساس بيارلي المرطب للوجه',
    category: 'soin-visage',
    price: 90,
    image: '/image/soin-visage-pearly-creme-fondation-fonddeteint-myway.jpg',
    altText: 'كريم أساس بيارلي للوجه ماي واي - soin visage pearly creme fondation fond de teint myway',
    description: 'إشراقة طبيعية ومظهر متألق للوجه.'
  },
  {
    id: '44',
    name: 'كريم بيلا المرطب للشفاه والوجه',
    category: 'soin-visage',
    price: 50,
    image: '/image/soin-visage-bella-baume-levres-teinte-hydratant-myway.jpg',
    altText: 'مرطب الشفاه بيلا ماي واي - soin visage bella baume levres teinte hydratant myway',
    description: 'ترطيب ملون وناعم للشفاه والبشرة الحساسة.'
  },
  {
    id: '45',
    name: 'كريم مرطب للبشرة الرقيقة والحساسة',
    category: 'soin-visage',
    price: 75,
    image: '/image/soin-visage-creme-hydratant-de-peau-delicate.jpg',
    altText: 'كريم مرطب للبشرة الحساسة ماي واي - soin visage creme hydratant de peau delicate',
    description: 'عناية لطيفة فائقة بالبشرة الحساسة.'
  },
  {
    id: '46',
    name: 'كريم دليكيت بزبدة الكاكاو للوجه',
    category: 'soin-visage',
    price: 70,
    image: '/image/soin-visage-delicate-creme-hydratante-beurre-cacao-myway.jpg',
    altText: 'كريم زبدة الكاكاو للوجه ماي واي - soin visage delicate creme hydratante beurre cacao myway',
    description: 'تغذية عميقة وعلاج للبشرة الجافة بزبدة الكاكاو.'
  },
  {
    id: '47',
    name: 'كريم دليكيت المرطب للبشرة الجافة',
    category: 'soin-visage',
    price: 65,
    image: '/image/soin-visage-delicate-creme-hydratante-peaux-seches-myway.jpg',
    altText: 'كريم للبشرة الجافة ماي واي - soin visage delicate creme hydratante peaux seches myway',
    description: 'ترطيب مكثف يخلصك من جفاف البشرة.'
  },
  {
    id: '48',
    name: 'لوشن إستيميد المضاد لحب الشباب بالألوفيرا',
    category: 'soin-visage',
    price: 70,
    image: '/image/soin-visage-estemed-antiacne-aleovera-myway.jpg',
    altText: 'لوشن مضاد لحبوب الشباب ماي واي - soin visage estemed antiacne aleovera myway',
    description: 'يعالج حب الشباب وينقي البشرة بفضل الألوفيرا.'
  },
  {
    id: '49',
    name: 'لوشن بيور سكين المضاد لحب الشباب والشوائب',
    category: 'soin-visage',
    price: 65,
    image: '/image/soin-visage-pure-skin-lotion-anti-acne-myway.jpg',
    altText: 'لوشن بيور سكين مضاد لحب الشباب ماي واي - soin visage pure skin lotion anti acne myway',
    description: 'محاربة فعالة للبثور وتصفية بشرة الوجه.'
  },
  {
    id: '50',
    name: 'لوشن صوبريت بالغاسول والليمون للبشرة الدهنية',
    category: 'soin-visage',
    price: 60,
    image: '/image/soin-visage-sobright-lotion-ghassoule-nettoyante-peaux-gras-citron-myway.jpg',
    altText: 'لوشن بالغاسول والليمون للبشرة الدهنية ماي واي - soin visage sobright lotion ghassoule nettoyante peaux gras citron myway',
    description: 'ينظف الدهون الزائدة ويعتني بالبشرة الدهنية بفعالية.'
  }
];
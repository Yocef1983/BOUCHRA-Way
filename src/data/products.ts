export interface Product {
  id: string;
  name: string;
  category: 'visage-corps' | 'cheveux' | 'maquillage' | 'parfums' | 'maison';
  categoryLabel: string;
  subCategory: string;
  image: string;
  price: number;
  discountPrice?: number;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'كريم أساس بيليرلي - Crème Fond de Teint Pearly',
    category: 'maquillage',
    categoryLabel: 'المكياج',
    subCategory: 'Soins du Teint',
    image: '/image/soins-visage_creme-fondation-pearly.jpg',
    price: 120,
    discountPrice: 89,
    description: 'Crème fond de teint illuminatrice Pearly My Way pour un teint parfait.'
  },
  {
    id: '2',
    name: 'كريم مرطب للجسم والبشرة - Crème Hydratante Corps',
    category: 'visage-corps',
    categoryLabel: 'العناية بالبشرة والجسم',
    subCategory: 'Hydratation',
    image: '/image/soins-corps-creme-hydratante-pour-visage.jpg',
    price: 110,
    discountPrice: 75,
    description: 'Soin hydratant intense My Way pour le corps et le visage.'
  },
  {
    id: '3',
    name: 'مزيل عرق سبراينج ناتشور - Déodorant Spring Nature',
    category: 'visage-corps',
    categoryLabel: 'العناية بالبشرة والجسم',
    subCategory: 'Hygiène',
    image: '/image/soins-corps-deodorant-spring-nature.jpg',
    price: 65,
    discountPrice: 45,
    description: 'Protection rafraîchissante longue durée aux extraits naturels.'
  },
  {
    id: '4',
    name: 'منظف ومزيل الدهون - Spray Nettoyant Dégraissant',
    category: 'maison',
    categoryLabel: 'منظفات منزلية',
    subCategory: 'Entretien',
    image: '/image/spray_bottle_cleaning_greasy_stains.jpg',
    price: 85,
    discountPrice: 59,
    description: 'Formule puissante pour éliminer la graisse et les taches difficiles.'
  },
  {
    id: '5',
    name: 'غسول ومنظف الوجه - Lotion Nettoyante Visage',
    category: 'visage-corps',
    categoryLabel: 'العناية بالبشرة والجسم',
    subCategory: 'Nettoyants',
    image: '/image/visage-soin-lotion-nettoyante-de-visage.jpg',
    price: 95,
    discountPrice: 69,
    description: 'Lotion nettoyante douce pour purifier le visage en profondeur.'
  }
];
export type Language = 'ar' | 'fr';

export interface CategoryTranslations {
  label: string;
  labelFr: string;
  subCategories?: { [key: string]: { label: string; labelFr: string } };
}

export const categoryHierarchy = {
  all: {
    label: 'الكل',
    labelFr: 'Tous les produits',
  },
  maquillage: {
    categoryId: 'ماكياج',
    label: 'ماكياج',
    labelFr: 'Maquillage',
    subCategories: [
      { id: 'البشرة', label: 'البشرة', labelFr: 'Teint / Peau' },
      { id: 'الشفايف', label: 'الشفايف', labelFr: 'Lèvres' },
      { id: 'العيون و الحواجب', label: 'العيون و الحواجب', labelFr: 'Yeux & Sourcils' },
    ]
  },
  soinVisage: {
    categoryId: 'العناية بالوجه',
    label: 'العناية بالوجه',
    labelFr: 'Soin du visage',
    subCategories: [
      { id: 'كريمات', label: 'كريمات', labelFr: 'Crèmes' },
      { id: 'منظفات الوجه', label: 'منظفات الوجه', labelFr: 'Nettoyants visage' },
      { id: 'حماية الوجه', label: 'حماية الوجه', labelFr: 'Protection visage' },
      { id: 'ماسكات', label: 'ماسكات', labelFr: 'Masques' },
    ]
  },
  soinCorps: {
    categoryId: 'العناية بالجسم',
    label: 'العناية بالجسم',
    labelFr: 'Soin du corps',
    subCategories: [
      { id: 'كريمات مرطبة', label: 'كريمات مرطبة', labelFr: 'Crèmes hydratantes' },
      { id: 'العناية باليدين', label: 'العناية باليدين', labelFr: 'Soin des mains' },
      { id: 'العناية بالقدمين', label: 'العناية بالقدمين', labelFr: 'Soin des pieds' },
      { id: 'مستحضرات الحمام', label: 'مستحضرات الحمام', labelFr: 'Produits de bain & déodorants' },
      { id: 'زيوت مغذية', label: 'زيوت مغذية', labelFr: 'Huiles nourrissantes' },
    ]
  },
  soinCapillaire: {
    categoryId: 'العناية بالشعر',
    label: 'العناية بالشعر',
    labelFr: 'Soin des cheveux',
    subCategories: [
      { id: 'شامبو', label: 'شامبو', labelFr: 'Shampooings' },
      { id: 'زيوت و سيرومات', label: 'زيوت و سيرومات', labelFr: 'Huiles & Sérums' },
      { id: 'ماسكات', label: 'ماسكات', labelFr: 'Masques capillaires' },
    ]
  },
  parfums: {
    categoryId: 'عطور',
    label: 'عطور',
    labelFr: 'Parfums',
    subCategories: [
      { id: 'عطر نسائي', label: 'عطر نسائي', labelFr: 'Parfum femme' },
      { id: 'عطر رجالي', label: 'عطر رجالي', labelFr: 'Parfum homme' },
    ]
  },
  menage: {
    categoryId: 'منظفات المنزل',
    label: 'منظفات المنزل',
    labelFr: 'Entretien ménager',
    subCategories: []
  },
  enfants: {
    categoryId: 'أطفال',
    label: 'أطفال',
    labelFr: 'Enfants',
    subCategories: []
  }
};

export const translations = {
  ar: {
    dir: 'rtl' as const,
    collectionTitle: 'تشكيلة ماي واي',
    resultsCount: (current: number, total: number) => `عرض النتائج ${current} من ${total}`,
    allProducts: 'جميع المنتجات',
    pointsLabel: 'النقاط',
    exclusivePoints: 'حصرية لأعضاء شبكة Bouchra Way',
    skuLabel: 'رمز المنتج (SKU)',
    aboutProduct: 'حول المنتج',
    addToCart: 'أضف للسلة',
    currency: 'MAD',
  },
  fr: {
    dir: 'ltr' as const,
    collectionTitle: 'MYWAY COLLECTION',
    resultsCount: (current: number, total: number) => `Affichage des résultats 1 à ${current} sur ${total}`,
    allProducts: 'Tous les produits',
    pointsLabel: 'POINTS',
    exclusivePoints: 'Exclusivité Membres Réseau Bouchra Way',
    skuLabel: 'SKU',
    aboutProduct: 'À PROPOS DU PRODUIT',
    addToCart: 'Ajouter au panier',
    currency: 'MAD',
  },
};

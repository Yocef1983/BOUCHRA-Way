import type { Product } from '../data/products';
import {
  SITE_URL,
  SITE_NAME,
  SITE_NAME_AR,
  SITE_LOGO_URL,
  DEFAULT_OG_IMAGE,
  HERO_BANNER_IMAGE,
  SITE,
  getShippingSeoText,
  getOfferShippingDetailsSchema,
} from '../config/site';
import { Language, categoryHierarchy, getSubCategoryTranslation } from '../i18n/translations';

export type SeoView = 'home' | 'catalog' | 'product' | 'checkout' | 'success';

export interface SeoContext {
  view: SeoView;
  lang: Language;
  product?: Product | null;
  category?: string;
  subCategory?: string | null;
  searchQuery?: string;
  products?: Product[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  twitterCard: 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

/**
 * Résout le libellé localisé d'une catégorie
 */
export const resolveCategoryLabel = (category: string, lang: Language): string => {
  if (category === 'all' || category === 'كل المنتجات' || !category) {
    return lang === 'fr' ? 'Tous les produits' : 'كل المنتجات';
  }
  for (const catKey of Object.keys(categoryHierarchy) as Array<keyof typeof categoryHierarchy>) {
    const item = categoryHierarchy[catKey];
    if ('categoryId' in item && (item.categoryId === category || item.label === category)) {
      return lang === 'fr' ? (item.labelFr || item.label) : item.label;
    }
    if (item.label === category) {
      return lang === 'fr' ? (item.labelFr || item.label) : item.label;
    }
  }
  return category;
};

/**
 * Construit les balises méta complètes pour chaque état de l'application
 */
export const buildSeoMetadata = (ctx: SeoContext): SeoMetadata => {
  const { view, lang, product, category = 'all', subCategory, searchQuery } = ctx;
  const isAr = lang === 'ar';
  const shippingInfo = getShippingSeoText(lang);

  let title = '';
  let description = '';
  let canonicalUrl = `${SITE_URL}/`;
  let ogImage = HERO_BANNER_IMAGE || DEFAULT_OG_IMAGE;
  let ogType = 'website';

  if (view === 'product' && product) {
    const productName = isAr ? (product.nameAr || product.name) : (product.nameFr || product.name);
    const productDesc = isAr
      ? (product.descriptionAr || product.description || '')
      : (product.descriptionFr || product.description || '');
    
    // Nettoyage de la description pour éviter les coupures disgracieuses
    const cleanDesc = productDesc.replace(/\s+/g, ' ').trim().slice(0, 160);

    title = isAr
      ? `${productName} | ${product.sku} - ${product.price} درهم - ${SITE_NAME}`
      : `${productName} | Réf. ${product.sku} - ${product.price} MAD - ${SITE_NAME}`;

    description = isAr
      ? `${productName} (مرجع ${product.sku}) بسعر ${product.price} درهم. ${cleanDesc}. ${shippingInfo}.`
      : `${productName} (Réf. ${product.sku}) à ${product.price} MAD. ${cleanDesc}. ${shippingInfo}.`;

    canonicalUrl = `${SITE_URL}/?sku=${encodeURIComponent(product.sku)}`;
    ogImage = product.image.startsWith('http')
      ? product.image
      : `${SITE_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`;
    ogType = 'product';

  } else if (view === 'catalog') {
    const catLabel = resolveCategoryLabel(category, lang);
    const subLabel = subCategory ? getSubCategoryTranslation(subCategory, lang) : null;

    if (searchQuery && searchQuery.trim().length > 0) {
      title = isAr
        ? `نتائج البحث عن "${searchQuery.trim()}" | ${SITE_NAME}`
        : `Recherche "${searchQuery.trim()}" | ${SITE_NAME}`;
      description = isAr
        ? `نتائج البحث عن ${searchQuery.trim()} في كتالوج ماي واي المغرب. ${shippingInfo}.`
        : `Résultats de recherche pour "${searchQuery.trim()}" dans le catalogue My Way Maroc. ${shippingInfo}.`;
    } else if (subLabel) {
      title = isAr
        ? `${subLabel} - ${catLabel} | ${SITE_NAME}`
        : `${subLabel} - ${catLabel} | ${SITE_NAME}`;
      description = isAr
        ? `تسوقي منتجات ${subLabel} ضمن تشكيلة ${catLabel} ماي واي المغرب الأصلية. ${shippingInfo}.`
        : `Découvrez notre gamme ${subLabel} dans la catégorie ${catLabel} My Way Maroc. ${shippingInfo}.`;
    } else if (category !== 'all' && category !== 'كل المنتجات') {
      title = isAr
        ? `${catLabel} - ماي واي المغرب | ${SITE_NAME}`
        : `${catLabel} - My Way Maroc | ${SITE_NAME}`;
      description = isAr
        ? `اكتشفي أفضل عروض ${catLabel} من ماي واي المغرب لدى ${SITE_NAME}. ${shippingInfo}.`
        : `Découvrez les meilleures offres ${catLabel} de My Way Maroc chez ${SITE_NAME}. ${shippingInfo}.`;
    } else {
      title = isAr
        ? `كتالوج منتجات ماي واي المغرب 2026 | ${SITE_NAME}`
        : `Catalogue Officiel My Way Maroc 2026 | ${SITE_NAME}`;
      description = isAr
        ? `تصفحي كتالوج ماي واي المغرب الكامل: عطور، مكياج، عناية بالبشرة والمنزل. ${shippingInfo}.`
        : `Parcourez le catalogue complet My Way Maroc : parfums, maquillage, soins et maison. ${shippingInfo}.`;
    }

  } else if (view === 'checkout') {
    title = isAr
      ? `إتمام الطلب | ${SITE_NAME} - الدفع عند الاستلام`
      : `Finaliser ma commande | ${SITE_NAME} - Paiement à la livraison`;
    description = isAr
      ? `أكدي طلبك بسهولة من متجر ${SITE_NAME}. ${shippingInfo}.`
      : `Validez votre commande facilement chez ${SITE_NAME}. ${shippingInfo}.`;

  } else if (view === 'success') {
    title = isAr
      ? `تم تأكيد طلبك بنجاح | ${SITE_NAME}`
      : `Commande confirmée avec succès | ${SITE_NAME}`;
    description = isAr
      ? `شكراً لثقتكم في ${SITE_NAME}. سيتم توصيل طلبكم في أقرب وقت.`
      : `Merci de votre confiance. Votre commande sera livrée sous 24h à 48h.`;

  } else {
    // Vue d'accueil ('home')
    title = isAr
      ? `${SITE_NAME} | ماي واي المغرب - كتالوج الجمال والعناية والدفع عند الاستلام`
      : `${SITE_NAME} | Cosmétiques, Soins & Maison My Way Maroc`;

    description = isAr
      ? `تسوقي تشكيلة ماي واي المغرب الأصلية 2026: عطور، عناية بالبشرة، مكياج ومنظفات منزلية. ${shippingInfo} مع فرصة استثنائية لزيادة الدخل.`
      : `Bouchra Way Maroc : Cosmétiques, soins, parfums et maison & entretien My Way authentiques. ${shippingInfo}.`;
  }

  const ogLocale = isAr ? 'ar_MA' : 'fr_MA';
  const ogLocaleAlternate = isAr ? 'fr_MA' : 'ar_MA';

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: canonicalUrl,
    ogType,
    ogLocale,
    ogLocaleAlternate,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  };
};

/**
 * Génère le graphe JSON-LD Schema.org complet selon la vue active
 */
export const buildJsonLdGraph = (ctx: SeoContext): Record<string, unknown> => {
  const { view, lang, product, category = 'all', products = [] } = ctx;
  const isAr = lang === 'ar';

  const organizationEntity = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME_AR,
    url: `${SITE_URL}/`,
    logo: SITE_LOGO_URL,
    image: DEFAULT_OG_IMAGE,
    areaServed: {
      '@type': 'Country',
      name: 'Morocco',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+${SITE.whatsapp}`,
        contactType: 'customer service',
        availableLanguage: ['French', 'Arabic'],
        areaServed: 'MA',
      },
    ],
  };

  const webSiteEntity = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: ['fr-MA', 'ar-MA'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const graph: Array<Record<string, unknown>> = [organizationEntity, webSiteEntity];

  if (view === 'product' && product) {
    const productName = isAr ? (product.nameAr || product.name) : (product.nameFr || product.name);
    const productDesc = isAr
      ? (product.descriptionAr || product.description || '')
      : (product.descriptionFr || product.description || '');
    const absoluteImage = product.image.startsWith('http')
      ? product.image
      : `${SITE_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`;
    const productUrl = `${SITE_URL}/?sku=${encodeURIComponent(product.sku)}`;

    const productEntity: Record<string, unknown> = {
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: productName,
      sku: product.sku,
      mpn: product.sku,
      image: [absoluteImage],
      description: productDesc,
      brand: {
        '@type': 'Brand',
        name: 'My Way',
      },
      category: resolveCategoryLabel(product.category, lang),
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: SITE.currency,
        price: product.price,
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
        shippingDetails: getOfferShippingDetailsSchema(),
      },
    };

    graph.push(productEntity);

  } else if (view === 'catalog') {
    const catLabel = resolveCategoryLabel(category, lang);
    const sampleProducts = products.slice(0, 15);

    const itemListElement = sampleProducts.map((p, idx) => {
      const pName = isAr ? (p.nameAr || p.name) : (p.nameFr || p.name);
      const pUrl = `${SITE_URL}/?sku=${encodeURIComponent(p.sku)}`;
      const pImg = p.image.startsWith('http')
        ? p.image
        : `${SITE_URL}${p.image.startsWith('/') ? '' : '/'}${p.image}`;

      return {
        '@type': 'ListItem',
        position: idx + 1,
        url: pUrl,
        name: pName,
        image: pImg,
      };
    });

    const collectionEntity: Record<string, unknown> = {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/#catalog`,
      name: `${catLabel} - ${SITE_NAME}`,
      url: `${SITE_URL}/`,
      inLanguage: isAr ? 'ar-MA' : 'fr-MA',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: sampleProducts.length,
        itemListElement,
      },
    };

    graph.push(collectionEntity);

  } else {
    // Vue d'accueil ('home') : mise en avant des produits phares
    const featuredProducts = products.slice(0, 8);
    if (featuredProducts.length > 0) {
      const itemListEntity = {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#featured-products`,
        name: isAr ? 'أبرز عروض ومنتجات ماي واي المغرب' : 'Sélection officielle My Way Maroc',
        numberOfItems: featuredProducts.length,
        itemListElement: featuredProducts.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${SITE_URL}/?sku=${encodeURIComponent(p.sku)}`,
          name: isAr ? (p.nameAr || p.name) : (p.nameFr || p.name),
          image: p.image.startsWith('http')
            ? p.image
            : `${SITE_URL}${p.image.startsWith('/') ? '' : '/'}${p.image}`,
        })),
      };
      graph.push(itemListEntity);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

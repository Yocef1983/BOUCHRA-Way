export const SITE = {
  whatsapp: '212634486494',
  currency: 'MAD',
  shippingFee: 20,
} as const;

export type ShippingConfig = typeof SITE;

/**
 * Taux de remise exclusif accordé aux membres validés de l'équipe Bouchra Way
 * (25 % de réduction supplémentaire sur le sous-total des prix publics).
 */
export const MEMBER_DISCOUNT_RATE = 0.25;

/**
 * Format officiel d'un code membre / parrainage Bouchra Way : 6 à 8 chiffres numériques.
 */
export const MEMBER_CODE_REGEX = /^\d{6,8}$/;

/**
 * Liste des codes membres officiellement validés auprès de My Way Maroc / Bouchra Way.
 * Insérez ici les codes réels transmis aux membres de votre équipe.
 */
export const APPROVED_MEMBER_CODES: readonly string[] = [
  // Codes de test / démonstration pour valider le parcours (faciles à remplacer) :
  '123456',
  '12345678',
  '87654321',
  '20261122',
];

/**
 * Vérifie si le code saisi respecte le format (6 à 8 chiffres) et fait partie des codes autorisés.
 */
export const isValidMemberCode = (rawCode: string): boolean => {
  const sanitized = rawCode.trim();
  if (!MEMBER_CODE_REGEX.test(sanitized)) return false;
  return APPROVED_MEMBER_CODES.includes(sanitized);
};

/**
 * Frais de livraison fixes (20 MAD) pour toutes les commandes et toutes les villes du Maroc.
 */
export const computeShipping = (_subtotal?: number, _city?: string): number => {
  return SITE.shippingFee;
};

/**
 * Retourne un libellé bilingue (FR/AR) pour l'affichage des frais de livraison fixes.
 */
export const getShippingLabel = (
  _subtotal?: number,
  _city?: string,
  lang: 'fr' | 'ar' = 'ar'
): { label: string; isFree: boolean; amount: number } => {
  const amount = SITE.shippingFee;
  const isFree = false;
  const label = lang === 'fr' ? `${amount} MAD` : `${amount} درهم`;
  return { label, isFree, amount };
};

export const SHIPPING_DELAY_FR = '24h à 48h';
export const SHIPPING_DELAY_AR = '24 إلى 48 ساعة';

/**
 * Constantes canoniques et médias pour le SEO et Open Graph
 */
export const SITE_URL = 'https://bouchra-way.vercel.app';
export const SITE_NAME = 'Bouchra Way';
export const SITE_NAME_AR = 'بوشرى واي';
export const SITE_LOGO_URL = 'https://bouchra-way.vercel.app/image/5818.webp';
export const DEFAULT_OG_IMAGE = 'https://bouchra-way.vercel.app/image/5818.webp';
export const HERO_BANNER_IMAGE = 'https://bouchra-way.vercel.app/image/5818.webp';

/**
 * Interface d'évolutivité tarifaire pour la livraison
 */
export interface ShippingSummary {
  isUniform: boolean;
  amount: number;
  minAmount: number;
  maxAmount: number;
  currency: string;
  delayDaysMin: number;
  delayDaysMax: number;
  delayFr: string;
  delayAr: string;
  destinationCountry: string;
}

/**
 * Helper centralisé retournant la synthèse de livraison pour le SEO et Schema.org.
 * Conçu pour supporter sans régression un tarif unique fixe (actuel 20 MAD)
 * ou une future grille tarifaire multi-villes (ex. Casablanca vs hors Casablanca).
 */
export const getShippingSummary = (): ShippingSummary => {
  const currentFee = SITE.shippingFee;
  return {
    isUniform: true,
    amount: currentFee,
    minAmount: currentFee,
    maxAmount: currentFee,
    currency: SITE.currency,
    delayDaysMin: 1,
    delayDaysMax: 2,
    delayFr: SHIPPING_DELAY_FR,
    delayAr: SHIPPING_DELAY_AR,
    destinationCountry: 'MA',
  };
};

/**
 * Retourne le texte dynamique de livraison bilingue FR/AR pour les balises SEO (meta description, OG).
 * Ne code jamais le montant en dur : lit dynamiquement getShippingSummary().
 */
export const getShippingSeoText = (lang: 'fr' | 'ar'): string => {
  const summary = getShippingSummary();
  if (lang === 'fr') {
    const feeText = summary.isUniform
      ? `${summary.amount} ${summary.currency}`
      : `à partir de ${summary.minAmount} ${summary.currency}`;
    return `Livraison rapide (${summary.delayFr}) à ${feeText} partout au Maroc, paiement à la livraison`;
  } else {
    const feeText = summary.isUniform
      ? `${summary.amount} درهم`
      : `ابتداءً من ${summary.minAmount} درهم`;
    return `توصيل سريع (${summary.delayAr}) بـ ${feeText} لجميع المدن المغربية والدفع عند الاستلام`;
  }
};

/**
 * Génère dynamiquement l'objet Schema.org OfferShippingDetails conforme aux spécifications Google.
 */
export const getOfferShippingDetailsSchema = () => {
  const summary = getShippingSummary();
  const rateSpecification = summary.isUniform
    ? {
        '@type': 'MonetaryAmount',
        value: summary.amount,
        currency: summary.currency,
      }
    : {
        '@type': 'MonetaryAmount',
        minValue: summary.minAmount,
        maxValue: summary.maxAmount,
        currency: summary.currency,
      };

  return {
    '@type': 'OfferShippingDetails',
    shippingRate: rateSpecification,
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: summary.destinationCountry,
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 1,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: summary.delayDaysMin,
        maxValue: summary.delayDaysMax,
        unitCode: 'DAY',
      },
    },
  };
};

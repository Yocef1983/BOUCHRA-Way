export const SITE = {
  whatsapp: '212634486494',
  currency: 'MAD',
  shippingFee: 20,
  freeShippingThreshold: 400,
  freeShippingCities: ['الدار البيضاء', 'Casablanca'],
} as const;

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

export const computeShipping = (subtotal: number, city?: string): number => {
  if (subtotal >= SITE.freeShippingThreshold) return 0;
  if (city && SITE.freeShippingCities.some((c) => city.includes(c))) return 0;
  return SITE.shippingFee;
};

export const toWhatsApp = (message: string): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

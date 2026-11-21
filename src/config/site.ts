export const SITE = {
  whatsapp: '212634486494',
  currency: 'MAD',
  shippingFee: 20,
  freeShippingThreshold: 400,
  freeShippingCities: ['الدار البيضاء', 'Casablanca'],
} as const;

export const computeShipping = (subtotal: number, city?: string): number => {
  if (subtotal >= SITE.freeShippingThreshold) return 0;
  if (city && SITE.freeShippingCities.some((c) => city.includes(c))) return 0;
  return SITE.shippingFee;
};

export const toWhatsApp = (message: string): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

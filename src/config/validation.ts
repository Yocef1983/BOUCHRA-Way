export const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|212|0)?([5-7]\d{8})$/;

export const normalizeMaPhone = (raw: string): string => {
  const cleaned = raw.replace(/[\s.-]/g, '');
  const m = cleaned.match(MOROCCAN_PHONE_REGEX);
  return m?.[1] ? `212${m[1]}` : cleaned;
};

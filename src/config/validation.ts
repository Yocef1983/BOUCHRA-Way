export const MOROCCAN_PHONE_REGEX = /^(?:(?:\+|00)212|212|0)?([5-7]\d{8})$/;

export const normalizeMaPhone = (raw: string): string => {
  const cleaned = raw.replace(/[\s.-]/g, '');
  const m = cleaned.match(MOROCCAN_PHONE_REGEX);
  return m?.[1] ? `212${m[1]}` : cleaned;
};

/**
 * Sanitizes user input to prevent XSS and injection attacks.
 * - Removes control characters (C0, C1, DEL)
 * - Strips HTML angle brackets
 * - Trims whitespace
 * - Enforces a maximum length (default 200, configurable)
 */
export const sanitizeInput = (input: string, maxLength: number = 200): string => {
  if (typeof input !== 'string') return '';
  // Remove C0 control chars (U+0000-U+001F), DEL (U+007F), C1 control chars (U+0080-U+009F)
  // Keep tab (U+0009), newline (U+000A), carriage return (U+000D) as they can be legitimate in textareas
  // eslint-disable-next-line no-control-regex
  let sanitized = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/gu, '');
  // Strip HTML angle brackets to prevent tag injection
  sanitized = sanitized.replace(/[<>]/g, '');
  // Normalize whitespace: collapse multiple spaces/tabs/newlines, trim
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  // Enforce max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength).trim();
  }
  return sanitized;
};

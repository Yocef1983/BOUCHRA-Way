import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://bouchra-way.vercel.app';

// Date du jour au format ISO YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Extraction fiable des produits depuis src/data/products.ts
const productsFilePath = path.join(rootDir, 'src', 'data', 'products.ts');
const fileContent = fs.readFileSync(productsFilePath, 'utf8');

// Extraction du tableau products = [...]
const jsonMatch = fileContent.match(/export\s+const\s+products:\s*Product\[\]\s*=\s*(\[\s*\{[\s\S]*\}\s*\]);/);

let products = [];
if (jsonMatch && jsonMatch[1]) {
  try {
    products = JSON.parse(jsonMatch[1]);
  } catch {
    console.warn('JSON.parse standard a échoué, tentative via extraction regex des SKUs...');
  }
}

if (!products || products.length === 0) {
  // Fallback robuste : extraction par regex de tous les "sku": "..."
  const skuMatches = [...fileContent.matchAll(/"sku":\s*"([^"]+)"/g)];
  products = skuMatches.map((m, idx) => ({ id: String(idx + 1), sku: m[1] }));
}

console.log(`Génération du sitemap pour ${products.length} produits (date: ${today})...`);

const xmlEntries = [
  `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
];

for (const p of products) {
  const sku = p.sku;
  xmlEntries.push(
    `  <url>\n    <loc>${BASE_URL}/?sku=${encodeURIComponent(sku)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  );
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries.join('\n')}\n</urlset>\n`;

const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemapXml, 'utf8');
console.log(`✅ Sitemap généré avec succès dans public/sitemap.xml (${xmlEntries.length} URLs indexables).`);

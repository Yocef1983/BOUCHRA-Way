import { useEffect } from 'react';
import { SeoContext, buildSeoMetadata, buildJsonLdGraph } from '../utils/seo';

/**
 * Met à jour ou crée une balise <meta> dans le <head>
 */
const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string): void => {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Met à jour ou crée une balise <link> dans le <head>
 */
const setLinkTag = (rel: string, href: string): void => {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

/**
 * Hook personnalisé React 19 pour la synchronisation SEO dynamique & JSON-LD
 * Léger, sans dépendance externe, sans duplication de balises <script>.
 */
export const useSeo = (ctx: SeoContext): void => {
  const { view, lang, product, category, subCategory, searchQuery, products } = ctx;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const context: SeoContext = {
      view,
      lang,
      product,
      category,
      subCategory,
      searchQuery,
      products,
    };

    // 1. Synchronisation de la langue et de la direction sur l'élément <html>
    const htmlEl = document.documentElement;
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'fr' ? 'ltr' : 'rtl';

    // 2. Calcul des métadonnées SEO et Open Graph
    const meta = buildSeoMetadata(context);

    // Titre de l'onglet
    document.title = meta.title;

    // Métadonnées standards
    setMetaTag('name', 'description', meta.description);
    setMetaTag('name', 'robots', 'index, follow');
    setMetaTag('name', 'theme-color', '#be185d');

    // Balises Open Graph (WhatsApp, Facebook, Instagram)
    setMetaTag('property', 'og:site_name', 'Bouchra Way');
    setMetaTag('property', 'og:title', meta.ogTitle);
    setMetaTag('property', 'og:description', meta.ogDescription);
    setMetaTag('property', 'og:url', meta.ogUrl);
    setMetaTag('property', 'og:image', meta.ogImage);
    setMetaTag('property', 'og:image:secure_url', meta.ogImage);
    setMetaTag('property', 'og:type', meta.ogType);
    setMetaTag('property', 'og:locale', meta.ogLocale);
    setMetaTag('property', 'og:locale:alternate', meta.ogLocaleAlternate);

    // Balises Twitter Cards
    setMetaTag('name', 'twitter:card', meta.twitterCard);
    setMetaTag('name', 'twitter:title', meta.twitterTitle);
    setMetaTag('name', 'twitter:description', meta.twitterDescription);
    setMetaTag('name', 'twitter:image', meta.twitterImage);

    // Balise Canonique
    setLinkTag('canonical', meta.canonicalUrl);

    // 3. Injection / Mise à jour du JSON-LD Schema.org (id="bouchra-way-jsonld")
    const jsonLdGraph = buildJsonLdGraph(context);
    const scriptId = 'bouchra-way-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    try {
      scriptTag.textContent = JSON.stringify(jsonLdGraph, null, 2);
    } catch {
      // Ignorer si échec de sérialisation
    }
  }, [view, lang, product, category, subCategory, searchQuery, products]);
};

import { useEffect } from 'react';

interface RouteSeoOptions {
  title: string;
  description: string;
  canonicalPath: string;
  structuredData?: Record<string, unknown>;
}

const siteUrl = 'https://srbmaury.com';

const setMetaContent = (selector: string, content: string) => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
};

const metaSelectors = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[property="og:url"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
  'meta[name="twitter:url"]',
];

export const useRouteSeo = ({ title, description, canonicalPath, structuredData }: RouteSeoOptions) => {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${canonicalPath}`;
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    const previousMeta = new Map(
      metaSelectors.map((selector) => [
        selector,
        document.querySelector<HTMLMetaElement>(selector)?.content,
      ])
    );

    document.title = title;
    canonical?.setAttribute('href', canonicalUrl);
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:url"]', canonicalUrl);

    let routeStructuredData: HTMLScriptElement | undefined;
    if (structuredData) {
      routeStructuredData = document.createElement('script');
      routeStructuredData.type = 'application/ld+json';
      routeStructuredData.id = 'route-structured-data';
      routeStructuredData.textContent = JSON.stringify(structuredData);
      document.head.appendChild(routeStructuredData);
    }

    return () => {
      document.title = previousTitle;
      if (previousCanonical) canonical?.setAttribute('href', previousCanonical);
      previousMeta.forEach((content, selector) => {
        if (content) setMetaContent(selector, content);
      });
      routeStructuredData?.remove();
    };
  }, [canonicalPath, description, structuredData, title]);
};

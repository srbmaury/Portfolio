import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProjectMetadata, homeMetadata } from '../config/routeMetadata';

const archiveMetadata = getProjectMetadata(import.meta.env.VITE_HIDE_BEGINNER_PROJECTS === 'true');
const notFoundMetadata = {
  ...homeMetadata,
  title: 'Page not found | Saurabh Maurya',
  description: 'This page could not be found.',
  canonicalUrl: '',
  structuredData: null,
};

export const useRouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const home = pathname === '/';
    const archive = pathname === '/projects' || pathname === '/projects/';
    const { title, description, canonicalUrl, structuredData } =
      home ? homeMetadata : archive ? archiveMetadata : notFoundMetadata;

    document.title = title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonical?.setAttribute('href', canonicalUrl || new URL(pathname, homeMetadata.canonicalUrl).href);

    const tags = {
      'name="description"': description,
      'property="og:description"': description,
      'name="twitter:description"': description,
      'property="og:title"': title,
      'name="twitter:title"': title,
      'property="og:url"': canonical?.href ?? canonicalUrl,
      'name="twitter:url"': canonical?.href ?? canonicalUrl,
      'name="robots"': home || archive ? 'index, follow' : 'noindex',
      'name="googlebot"': home || archive ? 'index, follow, max-image-preview:large' : 'noindex',
    };
    for (const [selector, value] of Object.entries(tags)) {
      document.querySelector<HTMLMetaElement>(`meta[${selector}]`)?.setAttribute('content', value);
    }

    const schema = document.getElementById('route-structured-data');
    if (schema) schema.textContent = structuredData ? JSON.stringify(structuredData) : '';
  }, [pathname]);
};

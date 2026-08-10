/**
 * Google Analytics utilities for tracking custom events
 *
 * Usage:
 * import { trackEvent, trackPageView } from './utils/analytics';
 * trackEvent('careerbot', 'question_asked');
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track custom events in Google Analytics
 * @param category - Event category (e.g., 'careerbot', 'project', 'contact')
 * @param action - Event action (e.g., 'click', 'submit', 'view')
 * @param label - Optional event label for more context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track page views (for SPAs)
 * @param path - Page path (e.g., '/projects', '/contact')
 * @param title - Page title
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track CareerBot interactions
 */
export const trackCareerBotEvent = (action: string, label?: string): void => {
  trackEvent('careerbot', action, label);
};

/**
 * Track project interactions
 */
export const trackProjectEvent = (action: string, projectName: string): void => {
  trackEvent('project', action, projectName);
};

/**
 * Track social profile clicks using a fixed platform label
 */
export const trackSocialEvent = (platform: string): void => {
  trackEvent('social', 'profile_click', platform);
};

/**
 * Track contact form submissions
 */
export const trackContactFormSubmit = (success: boolean): void => {
  trackEvent('contact', success ? 'submit_success' : 'submit_error');
};

/**
 * Track contact form intent events such as open or submit attempt
 */
export const trackContactFormIntent = (action: string, label?: string): void => {
  trackEvent('contact_intent', action, label);
};

/**
 * Track hero call-to-action clicks
 */
export const trackHeroEvent = (action: string, label?: string): void => {
  trackEvent('hero', action, label);
};

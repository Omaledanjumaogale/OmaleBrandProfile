import type { PageSEO, SEOConfig } from './types/seo';

/**
 * Global SEO Configuration for E-WIN Project
 */
export const defaultSEO: SEOConfig = {
    siteName: 'E-WIN Platform',
    defaultTitle: 'E-WIN Project | Empowering African Workforce',
    titleTemplate: '%s | E-WIN Platform',
    defaultDescription: 'Elite Workforce Impact Nigeria (E-WIN) Project — Architecting the future of African youth through AI-driven skill acquisition and digital leadership.',
    twitterHandle: '@DanjumaOmale',
    baseUrl: 'https://omaledanjumaogale.ewinproject.org'
};

/**
 * Builds a complete PageSEO object with defaults applied.
 */
export function buildMeta(page: Partial<PageSEO>): PageSEO {
    const canonical = page.canonical || defaultSEO.baseUrl;
    
    return {
        title: page.title ? defaultSEO.titleTemplate.replace('%s', page.title) : defaultSEO.defaultTitle,
        description: page.description || defaultSEO.defaultDescription,
        canonical: canonical,
        ogType: page.ogType || 'website',
        ogImage: page.ogImage || `${defaultSEO.baseUrl}/og-main.jpg`,
        noIndex: page.noIndex || false,
        jsonLd: page.jsonLd || []
    };
}

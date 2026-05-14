/**
 * TypeScript Interfaces for SEO and Metadata management
 * Optimized for SvelteKit 5 and AEO/GEO standards.
 */

export interface PageSEO {
    title: string;
    description: string;
    canonical?: string;
    ogType?: 'website' | 'article' | 'profile';
    ogImage?: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    noIndex?: boolean;
    jsonLd?: any[];
}

export interface SEOConfig {
    siteName: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    twitterHandle: string;
    baseUrl: string;
}

export interface Breadcrumb {
    name: string;
    item: string;
}

import { defaultSEO } from '$lib/seo';
import type { FAQ, Crumb, AuthorData } from './types';

export const buildOrganizationSchema = () => ({
    "@type": "Organization",
    "@id": `${defaultSEO.baseUrl}/#organization`,
    "name": "Elite Workforce Impact Nigeria Project",
    "url": defaultSEO.baseUrl,
    "logo": {
        "@type": "ImageObject",
        "url": "https://ewinproject.org/logo.png",
        "width": "512",
        "height": "512"
    },
    "sameAs": [
        "https://twitter.com/DanjumaOmale",
        "https://linkedin.com/in/omaledanjumaogale",
        "https://facebook.com/ewinproject"
    ],
    "description": "Architecting the future of the African workforce through AI and digital leadership.",
    "founder": { "@id": `${defaultSEO.baseUrl}/about/#author` }
});

export const buildPersonSchema = (author?: Partial<AuthorData>) => ({
    "@type": "Person",
    "@id": `${defaultSEO.baseUrl}/about/#author`,
    "name": author?.name || "Omale Danjuma Ogale",
    "jobTitle": author?.role || "Founder & CEO",
    "url": author?.url || `${defaultSEO.baseUrl}/about`,
    "image": author?.image || `${defaultSEO.baseUrl}/author.jpg`,
    "description": "Elite tech leader and nation builder specializing in AI and workforce empowerment.",
    "worksFor": { "@id": `${defaultSEO.baseUrl}/#organization` }
});

export const buildWebSiteSchema = () => ({
    "@type": "WebSite",
    "@id": `${defaultSEO.baseUrl}/#website`,
    "url": defaultSEO.baseUrl,
    "name": "E-WIN Platform",
    "description": "Official platform for the Elite Workforce Impact Nigeria Project.",
    "publisher": { "@id": `${defaultSEO.baseUrl}/#organization` },
    "inLanguage": "en-NG",
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${defaultSEO.baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
});

export const buildBreadcrumbSchema = (crumbs: Crumb[]) => ({
    "@type": "BreadcrumbList",
    "@id": `${defaultSEO.baseUrl}/#breadcrumb`,
    "itemListElement": crumbs.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": c.name,
        "item": c.item.startsWith('http') ? c.item : `${defaultSEO.baseUrl}${c.item}`
    }))
});

export const buildFAQSchema = (faqs: FAQ[]) => ({
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
        }
    }))
});

export const buildArticleSchema = (data: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: AuthorData;
    url: string;
}) => ({
    "@type": "Article",
    "@id": `${data.url}/#article`,
    "headline": data.title,
    "description": data.description,
    "image": data.image,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": { "@id": `${defaultSEO.baseUrl}/about/#author` },
    "publisher": { "@id": `${defaultSEO.baseUrl}/#organization` },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.url
    }
});

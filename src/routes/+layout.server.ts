import { buildMeta } from '$lib/seo';
import type { LayoutServerLoad } from './$types';

/**
 * Root Layout Load Function
 * Provides default SEO metadata to all child pages.
 */
export const load: LayoutServerLoad = async () => {
    // We start with default metadata
    const seo = buildMeta({});
    
    return {
        seo
    };
};



/**
 * Dynamic Sitemap Generator
 * Outputs valid XML with correct Content-Type for search engines.
 */
export const GET = async () => {
	const baseUrl = 'https://danjumaomaleogale.dev';
	const now = new Date().toISOString();

	type SitemapEntry = {
		loc: string;
		priority: string;
		changefreq: string;
		lastmod?: string;
	};

	const pages: SitemapEntry[] = [
		{ loc: '/', priority: '1.0', changefreq: 'daily' },
		{ loc: '/services', priority: '0.9', changefreq: 'weekly' },
		{ loc: '/apply', priority: '0.9', changefreq: 'weekly' },
		{ loc: '/faq', priority: '0.8', changefreq: 'weekly' },
		{ loc: '/blog', priority: '0.8', changefreq: 'weekly' },
		{ loc: '/platforms', priority: '0.8', changefreq: 'weekly' },
		{ loc: '/login', priority: '0.5', changefreq: 'monthly' }
	];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map((p) => `
    <url>
        <loc>${baseUrl}${p.loc}</loc>
        <lastmod>${p.lastmod ?? now}</lastmod>
        <changefreq>${p.changefreq}</changefreq>
        <priority>${p.priority}</priority>
    </url>`).join('')}
</urlset>`.trim();

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'public, max-age=0, s-maxage=3600'
        }
    });
};

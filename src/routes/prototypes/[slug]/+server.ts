import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Import all prototype HTML files as raw strings at build time
const prototypes = import.meta.glob('/static/platforms/*.html', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;
	
	// Match key case-insensitively
	const targetKey = Object.keys(prototypes).find((key) => {
		const filename = key.split('/').pop() || '';
		const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
		return nameWithoutExt.toLowerCase() === slug.toLowerCase();
	});

	if (!targetKey) {
		throw error(404, 'Prototype not found');
	}

	const html = prototypes[targetKey];

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

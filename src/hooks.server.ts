import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

// ── Main Handle hook ───────────────────────────────────────────────
export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// URL Normalization — /platform/ → /platforms/ (SEO redirect)
	if (pathname.startsWith('/platform/') && !pathname.startsWith('/platforms/')) {
		const newPath = pathname.replace('/platform/', '/platforms/');
		throw redirect(301, newPath.endsWith('/') ? newPath.slice(0, -1) : newPath);
	}

	// Domain Standardization (SEO — canonical domain)
	const targetDomain = 'omaledanjumaogale.ewinproject.org';
	if (
		event.url.hostname.startsWith('www.') &&
		!event.url.hostname.includes('localhost') &&
		!event.url.hostname.includes('pages.dev')
	) {
		const newUrl = new URL(event.url.href);
		newUrl.hostname = targetDomain;
		throw redirect(301, newUrl.toString());
	}

	// Resolve request
	const response = await resolve(event);

	// Technical SEO Headers (AEO/GEO Integration)
	if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/auth')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
	} else {
		response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
	}

	// Detect AI Agent User Agents (Observability)
	const userAgent = event.request.headers.get('user-agent')?.toLowerCase() || '';
	const isAIBot = /gptbot|claudebot|perplexitybot|google-extended|anthropic-ai|cohere-ai|applebot-extended/i.test(userAgent);
	if (isAIBot) {
		// Potential: Log AI bot access to Convex analytics
		response.headers.set('X-AI-Bot-Detected', 'true');
	}

	// Security Headers
	const secHeaders: Record<string, string> = {
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
		'X-Frame-Options': 'SAMEORIGIN',
		'X-Content-Type-Options': 'nosniff',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
	};

	for (const [k, v] of Object.entries(secHeaders)) {
		response.headers.set(k, v);
	}

	// Cache static assets
	if (
		pathname.endsWith('.jpg') ||
		pathname.endsWith('.png') ||
		pathname.endsWith('.svg') ||
		pathname.endsWith('.webp')
	) {
		response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
	}

	return response;
};

// ── Error Handler ──────────────────────────────────────────────────
export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();

	console.error('─── SERVER ERROR ───────────────────────────────');
	console.error(`ID:        ${errorId}`);
	console.error(`Timestamp: ${new Date().toISOString()}`);
	console.error(`Path:      ${event.url.pathname}`);
	console.error(`Error:     `, error);
	console.error('────────────────────────────────────────────────');

	return {
		message: 'An unexpected error occurred. Please try again.',
		errorId
	};
};

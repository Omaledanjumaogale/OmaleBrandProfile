import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// 1. URL Normalization
	// Redirect singular /platform/ to plural /platforms/ (Fix for old links)
	if (pathname.startsWith('/platform/') && !pathname.startsWith('/platforms/')) {
		const newPathname = pathname.replace('/platform/', '/platforms/');
		throw redirect(301, newPathname.endsWith('/') ? newPathname.slice(0, -1) : newPathname);
	}

	// 2. Domain Standardization (SEO Best Practice)
	// Redirect www to non-www and enforce correct production domain
	const targetDomain = 'danjumaomaleogale.ewinproject.org';
	if (event.url.hostname.startsWith('www.') || (event.url.hostname !== targetDomain && !event.url.hostname.includes('localhost') && !event.url.hostname.includes('convex.site'))) {
		const newUrl = new URL(event.url.href);
		newUrl.hostname = targetDomain;
		throw redirect(301, newUrl.toString());
	}

	// 3. Enterprise-Grade Security Headers
	const response = await resolve(event);
	
	// Security Header Implementation
	const securityHeaders = {
		'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.convex.cloud https://*.gstatic.com https://*.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.convex.cloud https://*.convex.site wss://*.convex.cloud; frame-ancestors 'none'; upgrade-insecure-requests;",
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
		'X-Frame-Options': 'DENY',
		'X-Content-Type-Options': 'nosniff',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
		'X-XSS-Protection': '1; mode=block'
	};

	Object.entries(securityHeaders).forEach(([header, value]) => {
		response.headers.set(header, value);
	});

	// 4. Cache Control for Static Assets
	if (pathname.startsWith('/platforms/') || pathname.endsWith('.jpg') || pathname.endsWith('.svg')) {
		response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
	}

	return response;
};

/**
 * Enterprise-Grade Error Handling
 * Logs errors to console (can be extended to Sentry/LogRocket)
 */
export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();
	
	// Structured logging for production observability
	console.error('--- PRODUCTION ERROR REPORT ---');
	console.error(`ID: ${errorId}`);
	console.error(`Timestamp: ${new Date().toISOString()}`);
	console.error(`Path: ${event.url.pathname}`);
	console.error(`Error:`, error);
	console.error('-------------------------------');

	return {
		message: 'An unexpected error occurred. Our engineers have been notified.',
		errorId
	};
};

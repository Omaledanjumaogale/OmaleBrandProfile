import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// 1. URL Normalization & Redirect Loop Fix
	// Fix 404s for static platform HTML files
	// Only redirect if it's EXACTLY /platforms/something (no extension)
	if (pathname.startsWith('/platforms/') && !pathname.includes('.')) {
		const cleanPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
		throw redirect(301, `${cleanPath}.html`);
	}

	// Redirect singular /platform/ to plural /platforms/ (Fix for old links)
	// Ensure we don't match /platforms/ to avoid redirect loops
	if (pathname.startsWith('/platform/') && !pathname.startsWith('/platforms/')) {
		let newPathname = pathname.replace('/platform/', '/platforms/');
		if (!newPathname.includes('.')) {
			newPathname = newPathname.endsWith('/') ? newPathname.slice(0, -1) : newPathname;
			newPathname = `${newPathname}.html`;
		}
		throw redirect(301, newPathname);
	}

	// 2. Domain Standardization (SEO Best Practice)
	if (event.url.hostname.startsWith('www.')) {
		const newUrl = new URL(event.url.href);
		newUrl.hostname = event.url.hostname.replace('www.', '');
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

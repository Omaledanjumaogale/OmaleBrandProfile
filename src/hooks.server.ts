import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { verifySessionToken } from '$lib/server/session';

// ── Protected route groups ─────────────────────────────────────────
const ADMIN_ROUTES = ['/admin'];
const DASHBOARD_ROUTES = ['/dashboard'];
const PUBLIC_EXCEPTIONS = ['/admin/login', '/api/session'];

function isProtectedAdmin(path: string) {
	return ADMIN_ROUTES.some((r) => path.startsWith(r)) &&
		!PUBLIC_EXCEPTIONS.some((e) => path.startsWith(e));
}

function isProtectedDashboard(path: string) {
	return DASHBOARD_ROUTES.some((r) => path.startsWith(r)) &&
		!PUBLIC_EXCEPTIONS.some((e) => path.startsWith(e));
}

// ── Main Handle hook ───────────────────────────────────────────────
export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// 1. URL Normalization — /platform/ → /platforms/
	if (pathname.startsWith('/platform/') && !pathname.startsWith('/platforms/')) {
		const newPath = pathname.replace('/platform/', '/platforms/');
		throw redirect(301, newPath.endsWith('/') ? newPath.slice(0, -1) : newPath);
	}

	// 2. Domain Standardization (SEO)
	const targetDomain = 'danjumaomaleogale.ewinproject.org';
	if (
		event.url.hostname.startsWith('www.') ||
		(event.url.hostname !== targetDomain &&
			!event.url.hostname.includes('localhost') &&
			!event.url.hostname.includes('convex.site') &&
			!event.url.hostname.includes('pages.dev'))
	) {
		const newUrl = new URL(event.url.href);
		newUrl.hostname = targetDomain;
		throw redirect(301, newUrl.toString());
	}

	// 3. Auth Guards — verify session cookie for protected routes
	const sessionCookie = event.cookies.get('__session');
	const secret = env.SESSION_SECRET ?? 'dev-secret-please-set-in-prod';
	const sessionUser = sessionCookie ? await verifySessionToken(sessionCookie, secret) : null;

	// Attach user to locals for downstream use
	event.locals.user = sessionUser ?? null;

	if (isProtectedAdmin(pathname) || isProtectedDashboard(pathname)) {
		if (!sessionUser) {
			throw redirect(303, `/admin/login?redirect=${encodeURIComponent(pathname)}`);
		}
		// Admin routes require role='admin'
		if (isProtectedAdmin(pathname) && sessionUser.role !== 'admin') {
			throw redirect(303, '/dashboard');
		}
	}

	// 4. Resolve request
	const response = await resolve(event);

	// 5. Enterprise Security Headers
	const secHeaders: Record<string, string> = {
		'Content-Security-Policy':
			"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.convex.cloud https://*.gstatic.com https://*.googleapis.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.convex.cloud https://*.convex.site wss://*.convex.cloud https://identitytoolkit.googleapis.com; frame-ancestors 'none'; upgrade-insecure-requests;",
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
		'X-Frame-Options': 'DENY',
		'X-Content-Type-Options': 'nosniff',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
		'X-XSS-Protection': '1; mode=block'
	};

	for (const [k, v] of Object.entries(secHeaders)) {
		response.headers.set(k, v);
	}

	// 6. Cache Control for static assets
	if (
		pathname.startsWith('/platforms/') ||
		pathname.endsWith('.jpg') ||
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

	console.error('─── PRODUCTION ERROR ───────────────────────────');
	console.error(`ID:        ${errorId}`);
	console.error(`Timestamp: ${new Date().toISOString()}`);
	console.error(`Path:      ${event.url.pathname}`);
	console.error(`Error:     `, error);
	console.error('────────────────────────────────────────────────');

	return {
		message: 'An unexpected error occurred. Our engineers have been notified.',
		errorId
	};
};

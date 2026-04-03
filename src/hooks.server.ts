import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Redirect singular /platform/ to plural /platforms/ to fix 404s from old links
	if (pathname.startsWith('/platform/')) {
		const newPathname = pathname.replace('/platform/', '/platforms/');
		throw redirect(301, newPathname);
	}

	// Ensure no WWW to avoid duplicate content as requested by SEO audit
	if (event.url.hostname.startsWith('www.')) {
		const newUrl = new URL(event.url.href);
		newUrl.hostname = event.url.hostname.replace('www.', '');
		throw redirect(301, newUrl.toString());
	}

	const response = await resolve(event);
	return response;
};

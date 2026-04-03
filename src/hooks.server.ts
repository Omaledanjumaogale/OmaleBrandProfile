import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Fix 404s for static platform HTML files by checking if they exist in the platforms directory
	if (pathname.startsWith('/platforms/') && !pathname.endsWith('.html')) {
		const newPathname = `${pathname}.html`;
		throw redirect(301, newPathname);
	}

	// Redirect singular /platform/ to plural /platforms/ to fix 404s from old links
	if (pathname.startsWith('/platform/')) {
		let newPathname = pathname.replace('/platform/', '/platforms/');
		if (!newPathname.endsWith('.html')) {
			newPathname = `${newPathname}.html`;
		}
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

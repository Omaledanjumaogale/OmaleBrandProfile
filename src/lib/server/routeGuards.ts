export function shouldBypassMaintenance(pathname: string) {
	return (
		pathname.startsWith('/admin') ||
		pathname.startsWith('/login') ||
		pathname.startsWith('/faq') ||
		pathname.startsWith('/blog') ||
		pathname.startsWith('/platforms') ||
		pathname === '/' ||
		pathname === '/services' ||
		pathname.startsWith('/_app/') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/manifest') ||
		pathname.startsWith('/robots.txt') ||
		pathname.startsWith('/sitemap.xml') ||
		pathname.startsWith('/service-worker') ||
		pathname.startsWith('/registerSW') ||
		pathname.startsWith('/api/')
	);
}

export function shouldProtectRegistration(pathname: string) {
	return pathname === '/register/iam' || pathname.startsWith('/register/iam/');
}


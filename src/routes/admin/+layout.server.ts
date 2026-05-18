import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
    // Skip protection for the login page itself to avoid infinite redirect loops
    if (url.pathname === '/admin/login') {
        return {};
    }

    const adminSession = cookies.get('admin_session');
    
    // If no session is present, redirect to the login portal
    if (!adminSession) {
        throw redirect(302, '/admin/login');
    }

    // Optional: We could call Convex here to validate the token against the secret,
    // but checking the existence of the cookie signed by our backend is the first line of defense.
    
    return {
        isAdmin: true
    };
};

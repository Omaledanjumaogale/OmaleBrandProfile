import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    // Clear the admin session cookie
    cookies.delete('admin_session', { path: '/' });
    
    // Redirect to the login page or homepage
    throw redirect(302, '/admin/login');
};

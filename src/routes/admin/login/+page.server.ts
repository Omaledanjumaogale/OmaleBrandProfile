import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const adminSession = cookies.get('admin_session');
    
    // If already logged in, redirect to dashboard
    if (adminSession) {
        throw redirect(303, '/admin');
    }

    return {};
};

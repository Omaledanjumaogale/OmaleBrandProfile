import { writable } from 'svelte/store';
import { convex } from '$lib/convex';
import { api } from '../../../convex/_generated/api';

export const stats = writable({
    totalUsers: 0,
    activeAmbassadors: 0,
    totalApplications: 0,
    pendingRequests: 0
});

export const loading = writable(true);

export async function refreshStats() {
    try {
        if (!api.functions?.getApplications || !api.functions?.getServiceRequests) {
            console.warn("Convex API functions not yet generated.");
            return;
        }
        const apps = await convex.query(api.functions.getApplications);
        const requests = await convex.query(api.functions.getServiceRequests);
        
        stats.set({
            totalUsers: (apps?.length || 0) + 1284,
            activeAmbassadors: (apps || []).filter((a: any) => a.status === 'approved').length,
            totalApplications: apps?.length || 0,
            pendingRequests: (requests || []).filter((r: any) => r.status === 'pending').length
        });
    } catch (e) {
        console.error('Error refreshing convex stats:', e);
    } finally {
        loading.set(false);
    }
}

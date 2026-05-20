import { error } from '@sveltejs/kit';
import { platformMap } from '$lib/data/platforms';

export function load({ params }) {
	const platform = platformMap.get(params.slug);

	if (!platform) {
		throw error(404, 'Platform not found');
	}

	return { platform };
}

import { error } from '@sveltejs/kit';
import { insights } from '$lib/data/insights';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = insights.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Insight not found');
	}

	return {
		post
	};
};

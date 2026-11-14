import { error, redirect } from '@sveltejs/kit';
import { insights } from '$lib/data/insights';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.slug === 'iam-network') redirect(308, '/blog/the-iam-network-explained');
	const post = insights.find((p) => p.slug === params.slug);

	if (!post) {
		throw error(404, 'Insight not found');
	}

	return {
		post
	};
};

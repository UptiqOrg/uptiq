import type { SelectProjectPartial } from '$lib/db/schema';
import type { PageServerLoad } from '../../(auth)/signout/$types';

export const load = (async ({ fetch }) => {
	const projects: SelectProjectPartial[] = await fetch('/api/projects', {
		method: 'GET'
	})
		.then(async (response) => await response.json())
		.then((response) => response.projects);

	return { projects };
}) satisfies PageServerLoad;

import { SvelteKitAuth } from '@auth/sveltekit';
import {
	SECRET_AUTH_GITHUB_ID,
	SECRET_AUTH_GITHUB_SECRET,
	SECRET_AUTH_SECRET
} from '$env/static/private';
import GitHub from '@auth/sveltekit/providers/github';
import type { RequestEvent } from '@sveltejs/kit';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event: RequestEvent) => {
	const authOptions = {
		providers: [
			GitHub({
				clientId: SECRET_AUTH_GITHUB_ID,
				clientSecret: SECRET_AUTH_GITHUB_SECRET
			})
		],
		secret: SECRET_AUTH_SECRET,
		trustHost: true
	};
	return authOptions;
});

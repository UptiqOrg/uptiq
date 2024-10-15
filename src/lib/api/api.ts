import { Hono } from 'hono';

import { initAuthConfig, type AuthConfig } from '@hono/auth-js';
import GitHub from '@auth/sveltekit/providers/github';
import {
	SECRET_AUTH_GITHUB_ID,
	SECRET_AUTH_GITHUB_SECRET,
	SECRET_AUTH_SECRET
} from '$env/static/private';
import { userRouter } from './user/user.controller';

const router = new Hono();
router.use('*', initAuthConfig(getAuthConfig));

router.route('/user', userRouter);

export const api = new Hono().route('/api', router);

function getAuthConfig(): AuthConfig {
	return {
		secret: SECRET_AUTH_SECRET,
		providers: [
			GitHub({
				clientId: SECRET_AUTH_GITHUB_ID,
				clientSecret: SECRET_AUTH_GITHUB_SECRET
			})
		]
	};
}

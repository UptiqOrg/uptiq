import { Hono } from 'hono';

import { initAuthConfig, type AuthConfig } from '@hono/auth-js';
import GitHub from '@auth/sveltekit/providers/github';
import {
	SECRET_AUTH_GITHUB_ID,
	SECRET_AUTH_GITHUB_SECRET,
	SECRET_AUTH_SECRET
} from '$env/static/private';
import { userRouter } from './user/user.controller';

export const api = new Hono().basePath('/api');

api.use('*', initAuthConfig(getAuthConfig));
api.route('/user', userRouter);

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

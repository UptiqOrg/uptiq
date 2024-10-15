import { Hono, type Context } from 'hono';

import { getAuthUser, verifyAuth } from '@hono/auth-js';
import { ensureUser } from './user.service';

export const userRouter = new Hono();

export const postSignIn = async (context: Context) => {
	const { token } = await getAuthUser(context);
	if (!token) return context.status(401);

	console.log(token);

	const user = {
		githubUserId: token.id,
		username: token.login,
		email: token.email,
		name: token.name
	};

	await ensureUser(user);

	return context.json({ message: 'Hello, world!', user, token });
};

userRouter.use(verifyAuth());
userRouter.get('/ensure-user', postSignIn);

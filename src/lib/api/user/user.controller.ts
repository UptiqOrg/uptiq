import { Hono, type Context } from 'hono';

import { getAuthUser, verifyAuth } from '@hono/auth-js';
import { ensureUser } from './user.service';

export const userRouter = new Hono();

export const ensureUserController = async (context: Context) => {
	const { token } = await getAuthUser(context);
	if (!token) return context.status(401);

	const user = {
		githubUserId: token.id,
		username: token.login,
		email: token.email,
		name: token.name
	};

	await ensureUser(user);

	return context.json({ message: 'Ensured user!', user });
};

userRouter.use(verifyAuth());
userRouter.get('/ensure-user', ensureUserController);

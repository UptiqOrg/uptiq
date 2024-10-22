import { SECRET_TURSO_AUTH_TOKEN, SECRET_TURSO_DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/connect';

export const db = await drizzle('turso', {
	connection: {
		url: SECRET_TURSO_DATABASE_URL!,
		authToken: SECRET_TURSO_AUTH_TOKEN!
	}
});

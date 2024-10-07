import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	out: './src/lib/db/migrations',
	schema: './src/lib/db/schema.ts',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.SECRET_TURSO_DATABASE_URL!,
		authToken: process.env.SECRET_TURSO_AUTH_TOKEN
	}
} satisfies Config;

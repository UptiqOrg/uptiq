import { db } from '$lib/db/drizzle';
import { users, type InsertUser } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const checkUserExists = async (githubUserId: string): Promise<boolean> => {
	const result = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.githubUserId, githubUserId))
		.limit(1);

	return result.length > 0;
};

export const createUser = async (user: InsertUser) => {
	const result = await db.insert(users).values(user).returning({ id: users.id });
	return result[0];
};

export const ensureUser = async (user: InsertUser): Promise<void> => {
	const exists = await checkUserExists(user.githubUserId);
	if (exists) return;

	await createUser(user);
};

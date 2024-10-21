import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	name: text('name'),
	pro: integer('pro', { mode: 'boolean' }).default(false),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

// Projects table
export const projects = sqliteTable('projects', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	name: text('name').notNull(),
	description: text('description'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

// Websites table
export const websites = sqliteTable('websites', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	projectId: integer('project_id')
		.notNull()
		.references(() => projects.id),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	url: text('url').notNull(),
	name: text('name').notNull(),
	checkInterval: integer('check_interval').notNull().default(300), // in seconds
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

// Uptime checks table
export const uptimeChecks = sqliteTable('uptime_checks', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	websiteId: integer('website_id')
		.notNull()
		.references(() => websites.id),
	status: text('status').notNull(),
	responseTime: integer('response_time'), // in milliseconds
	statusCode: integer('status_code'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

// Alerts table
export const alerts = sqliteTable('alerts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	websiteId: integer('website_id')
		.notNull()
		.references(() => websites.id),
	type: text('type').notNull(),
	target: text('target').notNull(), // email address, phone number, or webhook URL
	enabled: integer('enabled').notNull().default(1), // SQLite doesn't have a boolean type, so we use integer
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
});

// Relations
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const usersRelations = relations(users, ({ many }) => ({
	projects: many(projects)
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
	user: one(users, {
		fields: [projects.userId],
		references: [users.id]
	}),
	websites: many(websites)
}));

export const websitesRelations = relations(websites, ({ one, many }) => ({
	project: one(projects, {
		fields: [websites.projectId],
		references: [projects.id]
	}),
	user: one(users, {
		fields: [websites.userId],
		references: [users.id]
	}),
	uptimeChecks: many(uptimeChecks),
	alerts: many(alerts)
}));

export const uptimeChecksRelations = relations(uptimeChecks, ({ one }) => ({
	website: one(websites, {
		fields: [uptimeChecks.websiteId],
		references: [websites.id]
	})
}));

export const alertsRelations = relations(alerts, ({ one }) => ({
	website: one(websites, {
		fields: [alerts.websiteId],
		references: [websites.id]
	})
}));

// Insert types
export type InsertUser = typeof users.$inferInsert;
export type InsertProject = typeof projects.$inferInsert;
export type InsertWebsite = typeof websites.$inferInsert;

// Select types
export type SelectUptimeCheck = typeof uptimeChecks.$inferSelect;
export type SelectProject = typeof projects.$inferSelect;
export type SelectWebsite = typeof websites.$inferSelect;

// Partial Select types
export type SelectWebsiteStatusCard = Pick<SelectWebsite, 'id' | 'name' | 'url' | 'checkInterval'>;
export type SelectProjectPartial = Pick<SelectProject, 'id' | 'slug' | 'name' | 'description'>;
export type SelectWebsitePartial = Pick<SelectWebsite, 'id' | 'name' | 'url' | 'checkInterval'>;

// Zod Schemas
export const InsertProjectSchema = createInsertSchema(projects);
export const InsertWebsiteSchema = createInsertSchema(websites);

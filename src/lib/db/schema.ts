import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql, relations } from 'drizzle-orm';

// Websites table
export const websites = sqliteTable('websites', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	githubUserId: text('github_user_id').notNull(), // GitHub User ID as text
	url: text('url').notNull(),
	name: text('name').notNull(),
	checkInterval: integer('check_interval').notNull().default(300), // in seconds
	status: text('status').notNull().default('unknown'),
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

export const websitesRelations = relations(websites, ({ many }) => ({
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

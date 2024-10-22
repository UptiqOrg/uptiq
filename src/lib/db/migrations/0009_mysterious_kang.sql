PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_uptime_checks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`website_id` integer NOT NULL,
	`status` text NOT NULL,
	`response_time` integer,
	`status_code` integer,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`website_id`) REFERENCES `websites`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_uptime_checks`("id", "website_id", "status", "response_time", "status_code", "created_at") SELECT "id", "website_id", "status", "response_time", "status_code", "created_at" FROM `uptime_checks`;--> statement-breakpoint
DROP TABLE `uptime_checks`;--> statement-breakpoint
ALTER TABLE `__new_uptime_checks` RENAME TO `uptime_checks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_websites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`user_id` text NOT NULL,
	`url` text NOT NULL,
	`name` text NOT NULL,
	`check_interval` integer DEFAULT 300 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_websites`("id", "project_id", "user_id", "url", "name", "check_interval", "created_at", "updated_at") SELECT "id", "project_id", "user_id", "url", "name", "check_interval", "created_at", "updated_at" FROM `websites`;--> statement-breakpoint
DROP TABLE `websites`;--> statement-breakpoint
ALTER TABLE `__new_websites` RENAME TO `websites`;
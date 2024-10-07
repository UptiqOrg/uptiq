CREATE TABLE `alerts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`website_id` integer NOT NULL,
	`type` text NOT NULL,
	`target` text NOT NULL,
	`enabled` integer DEFAULT 1 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`website_id`) REFERENCES `websites`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `uptime_checks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`website_id` integer NOT NULL,
	`status` text NOT NULL,
	`response_time` integer,
	`status_code` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`website_id`) REFERENCES `websites`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `websites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`github_user_id` text NOT NULL,
	`url` text NOT NULL,
	`name` text NOT NULL,
	`check_interval` integer DEFAULT 300 NOT NULL,
	`status` text DEFAULT 'unknown' NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);

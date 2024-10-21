ALTER TABLE `websites` ADD `user_id` text NOT NULL REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `websites` DROP COLUMN `status`;
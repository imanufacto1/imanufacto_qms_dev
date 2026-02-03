ALTER TABLE "forms" ADD COLUMN "form_version" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "last_modified_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "last_modified_by" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "version_major" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "version_minor" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "version_patch" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "version_semver" text DEFAULT '0.0.0' NOT NULL;
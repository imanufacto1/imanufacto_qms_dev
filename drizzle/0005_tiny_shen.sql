CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_name" text NOT NULL,
	"report_code" text NOT NULL,
	"report_type" text DEFAULT 'PDF v2',
	"status" text DEFAULT 'Inactive',
	"scheduler_status" text DEFAULT 'Inactive',
	"scheduled_time" timestamp,
	"previous_executed_time" timestamp,
	"template_content" text,
	"header_content" text,
	"footer_content" text,
	"page_setup" jsonb,
	"local_scripts" text,
	"data_settings" jsonb,
	"server_script" text,
	"excel_template" text,
	"created_at" timestamp DEFAULT now(),
	"valid_from" timestamp DEFAULT now() NOT NULL,
	"valid_to" timestamp,
	"is_current" boolean DEFAULT true NOT NULL,
	"version" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "form_submissions" CASCADE;--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "version" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_report_code" ON "reports" USING btree ("report_code") WHERE "reports"."is_current" = true;
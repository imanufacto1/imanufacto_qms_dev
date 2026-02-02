ALTER TABLE "department_master" DROP CONSTRAINT "department_master_name_unique";--> statement-breakpoint
ALTER TABLE "department_master" DROP CONSTRAINT "department_master_code_unique";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_name_unique";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_slug_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
DROP INDEX "unq_dept_name_plant";--> statement-breakpoint
DROP INDEX "unq_plant_name_org";--> statement-breakpoint
DROP INDEX "unq_role_name_dept";--> statement-breakpoint
ALTER TABLE "department_master" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "department_master" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "department_master" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "department_master" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "plants" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "plants" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "plants" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "plants" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "valid_from" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "valid_to" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_current" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_dept_master_name" ON "department_master" USING btree ("name") WHERE "department_master"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_dept_master_code" ON "department_master" USING btree ("code") WHERE "department_master"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_org_name" ON "organizations" USING btree ("name") WHERE "organizations"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_org_slug" ON "organizations" USING btree ("slug") WHERE "organizations"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_clerk" ON "users" USING btree ("clerk_id") WHERE "users"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_username" ON "users" USING btree ("username") WHERE "users"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_email" ON "users" USING btree ("email") WHERE "users"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_dept_name_plant" ON "departments" USING btree ("plant_id","name") WHERE "departments"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_plant_name_org" ON "plants" USING btree ("organization_id","name") WHERE "plants"."is_current" = true;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_role_name_dept" ON "roles" USING btree ("department_id","name") WHERE "roles"."is_current" = true;
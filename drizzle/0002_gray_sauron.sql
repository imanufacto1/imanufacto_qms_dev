CREATE TABLE "department_master" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "department_master_name_unique" UNIQUE("name"),
	CONSTRAINT "department_master_code_unique" UNIQUE("code")
);

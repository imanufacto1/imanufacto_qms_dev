CREATE UNIQUE INDEX "unq_dept_name_plant" ON "departments" USING btree ("plant_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_plant_name_org" ON "plants" USING btree ("organization_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_role_name_dept" ON "roles" USING btree ("department_id","name");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_name_unique" UNIQUE("name");
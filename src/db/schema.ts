import { pgTable, text, uuid, jsonb, timestamp, integer, boolean, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// SCD Type 2 Helper Columns
const scdColumns = {
  validFrom: timestamp('valid_from').defaultNow().notNull(),
  validTo: timestamp('valid_to'),
  isCurrent: boolean('is_current').default(true).notNull(),
  version: integer('version').default(1).notNull(),
};

// Organizations Table: Top level of hierarchy
export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug'), // For URL friendly names
  logo: text('logo'),
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqOrgName: uniqueIndex('unq_org_name').on(t.name).where(sql`${t.isCurrent} = true`),
  unqOrgSlug: uniqueIndex('unq_org_slug').on(t.slug).where(sql`${t.isCurrent} = true`),
}));

// Plants Table: Belong to an Organization
export const plants = pgTable('plants', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqPlantNameOrg: uniqueIndex('unq_plant_name_org').on(t.organizationId, t.name).where(sql`${t.isCurrent} = true`),
}));

// Departments Table: Belong to a Plant
export const departments = pgTable('departments', {
  id: uuid('id').defaultRandom().primaryKey(),
  plantId: uuid('plant_id').references(() => plants.id).notNull(),
  name: text('name').notNull(),
  managerId: text('manager_id'), // Can be linked to a user later
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqDeptNamePlant: uniqueIndex('unq_dept_name_plant').on(t.plantId, t.name).where(sql`${t.isCurrent} = true`),
}));

// Department Master Table: Standardized list of departments
export const departmentMaster = pgTable('department_master', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(), // e.g., "Human Resources"
  code: text('code').notNull(), // e.g., "HR"
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqDeptMasterName: uniqueIndex('unq_dept_master_name').on(t.name).where(sql`${t.isCurrent} = true`),
  unqDeptMasterCode: uniqueIndex('unq_dept_master_code').on(t.code).where(sql`${t.isCurrent} = true`),
}));

// Roles Table: Belong to a Department
export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  departmentId: uuid('department_id').references(() => departments.id).notNull(),
  name: text('name').notNull(), // e.g., "Operator", "Supervisor"
  permissions: jsonb('permissions'), // Store specific permissions for this role
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqRoleNameDept: uniqueIndex('unq_role_name_dept').on(t.departmentId, t.name).where(sql`${t.isCurrent} = true`),
}));

// Users Table: Belong to a Role (and thus Department -> Plant -> Org)
// Modified to support both Clerk and Custom Auth
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id'), // Link to Clerk Auth (Nullable for custom users)
  username: text('username'), // For custom auth
  password: text('password'), // Hashed password for custom auth
  roleId: uuid('role_id').references(() => roles.id), // Optional initially until assigned
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqUserClerk: uniqueIndex('unq_user_clerk').on(t.clerkId).where(sql`${t.isCurrent} = true`),
  unqUserUsername: uniqueIndex('unq_user_username').on(t.username).where(sql`${t.isCurrent} = true`),
  unqUserEmail: uniqueIndex('unq_user_email').on(t.email).where(sql`${t.isCurrent} = true`),
}));

// Forms Table: (Existing) - keeping for now, maybe link to Organization later
export const forms = pgTable('forms', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: text('tenant_id').notNull(), // Clerk Organization ID or similar
  title: text('title').notNull(),
  formVersion: integer('form_version').default(1),
  schema: jsonb('schema').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
});

// Reports Table: For Report Builder
export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  reportName: text('report_name').notNull(),
  reportCode: text('report_code').notNull(),
  reportType: text('report_type').default('PDF v2'),
  status: text('status').default('Inactive'), // Active, Inactive
  schedulerStatus: text('scheduler_status').default('Inactive'),
  scheduledTime: timestamp('scheduled_time'),
  previousExecutedTime: timestamp('previous_executed_time'),
  
  // Configuration Fields
  templateContent: text('template_content'), // HTML content
  headerContent: text('header_content'),
  footerContent: text('footer_content'),
  pageSetup: jsonb('page_setup'), // { paperFormat, orientation, margins, etc. }
  localScripts: text('local_scripts'),
  dataSettings: jsonb('data_settings'),
  serverScript: text('server_script'),
  excelTemplate: text('excel_template'), // Base64 or URL? text for now

  // Audit & Versioning
  lastModifiedAt: timestamp('last_modified_at').defaultNow(),
  lastModifiedBy: text('last_modified_by'),
  versionMajor: integer('version_major').default(0).notNull(),
  versionMinor: integer('version_minor').default(0).notNull(),
  versionPatch: integer('version_patch').default(0).notNull(),
  versionSemver: text('version_semver').default('0.0.0').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  ...scdColumns,
}, (t) => ({
  unqReportCode: uniqueIndex('unq_report_code').on(t.reportCode).where(sql`${t.isCurrent} = true`),
}));

import { pgTable, text, uuid, jsonb, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Organizations Table: Top level of hierarchy
export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique(), // For URL friendly names
  logo: text('logo'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Plants Table: Belong to an Organization
export const plants = pgTable('plants', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Departments Table: Belong to a Plant
export const departments = pgTable('departments', {
  id: uuid('id').defaultRandom().primaryKey(),
  plantId: uuid('plant_id').references(() => plants.id).notNull(),
  name: text('name').notNull(),
  managerId: text('manager_id'), // Can be linked to a user later
  createdAt: timestamp('created_at').defaultNow(),
});

// Roles Table: Belong to a Department
export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  departmentId: uuid('department_id').references(() => departments.id).notNull(),
  name: text('name').notNull(), // e.g., "Operator", "Supervisor"
  permissions: jsonb('permissions'), // Store specific permissions for this role
  createdAt: timestamp('created_at').defaultNow(),
});

// Users Table: Belong to a Role (and thus Department -> Plant -> Org)
// Modified to support both Clerk and Custom Auth
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').unique(), // Link to Clerk Auth (Nullable for custom users)
  username: text('username').unique(), // For custom auth
  password: text('password'), // Hashed password for custom auth
  roleId: uuid('role_id').references(() => roles.id), // Optional initially until assigned
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Forms Table: (Existing) - keeping for now, maybe link to Organization later
export const forms = pgTable('forms', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: text('tenant_id').notNull(), // Clerk Organization ID or similar
  title: text('title').notNull(),
  version: integer('version').default(1),
  schema: jsonb('schema').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// FormSubmissions Table: (Existing)
export const formSubmissions = pgTable('form_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  formId: uuid('form_id').references(() => forms.id).notNull(),
  submittedBy: text('submitted_by').notNull(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations definitions (Optional but good for Drizzle Queries)
export const organizationsRelations = relations(organizations, ({ many }) => ({
  plants: many(plants),
}));

export const plantsRelations = relations(plants, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [plants.organizationId],
    references: [organizations.id],
  }),
  departments: many(departments),
}));

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  plant: one(plants, {
    fields: [departments.plantId],
    references: [plants.id],
  }),
  roles: many(roles),
}));

export const rolesRelations = relations(roles, ({ one, many }) => ({
  department: one(departments, {
    fields: [roles.departmentId],
    references: [departments.id],
  }),
  users: many(users),
}));

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

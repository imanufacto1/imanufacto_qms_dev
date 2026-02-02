import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import bcrypt from 'bcryptjs';

async function main() {
  // Dynamically import db and schema to ensure dotenv runs first
  const { db } = await import('./index');
  const { organizations, plants, departments, roles, users } = await import('./schema');

  console.log('Seeding database...');

  try {
    // 1. Create Organization
    console.log('Creating Organization...');
    const [org] = await db.insert(organizations).values({
      name: 'Imanufacto',
      slug: 'imanufacto',
    }).onConflictDoNothing().returning();
    
    let orgId = org?.id;

    if (!orgId) {
        // If it existed, fetch it
        const existingOrg = await db.query.organizations.findFirst({
            where: (orgs, { eq }) => eq(orgs.slug, 'imanufacto')
        });
        if (existingOrg) orgId = existingOrg.id;
        else throw new Error("Could not create or find Organization");
        console.log('Organization already existed:', orgId);
    } else {
        console.log('Organization created:', orgId);
    }

    // 2. Create Plant
    console.log('Creating Plant...');
    const [plant] = await db.insert(plants).values({
      organizationId: orgId,
      name: 'Headquarters',
      location: 'Main Location',
    }).returning();
    console.log('Plant created:', plant.id);

    // 3. Create Department
    console.log('Creating Department...');
    const [dept] = await db.insert(departments).values({
      plantId: plant.id,
      name: 'IT/Admin',
    }).returning();
    console.log('Department created:', dept.id);

    // 4. Create Role
    console.log('Creating Role...');
    const [role] = await db.insert(roles).values({
      departmentId: dept.id,
      name: 'Super Admin',
      permissions: { admin: true },
    }).returning();
    console.log('Role created:', role.id);

    // 5. Create User
    console.log('Creating User...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Check if user exists
    const existingUser = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.username, 'nayan_admin')
    });

    if (existingUser) {
        console.log('User nayan_admin already exists.');
    } else {
        const [user] = await db.insert(users).values({
            username: 'nayan_admin',
            password: hashedPassword,
            roleId: role.id,
            firstName: 'Nayan',
            lastName: 'Admin',
            email: 'nayan@imanufacto.com',
            isActive: true,
        }).returning();
        console.log('User created:', user.id);
    }

  } catch (e) {
    console.error("Error during seeding:", e);
    process.exit(1);
  }

  process.exit(0);
}

main();

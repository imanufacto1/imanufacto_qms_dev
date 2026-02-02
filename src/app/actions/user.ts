'use server'

import { db } from '@/db';
import { users, roles, departments, plants, organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Fetch users with their role, department, plant, and organization info
export async function getUsers() {
  try {
    const result = await db.select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      username: users.username,
      isActive: users.isActive,
      roleName: roles.name,
      departmentName: departments.name,
      plantName: plants.name,
      organizationName: organizations.name
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .leftJoin(departments, eq(roles.departmentId, departments.id))
    .leftJoin(plants, eq(departments.plantId, plants.id))
    .leftJoin(organizations, eq(plants.organizationId, organizations.id));
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}

export async function addUser(data: { 
  roleId: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  username: string;
  password?: string; // In real app, hash this
}) {
  try {
    await db.insert(users).values(data);
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to add user:', error);
    return { success: false, error: 'Failed to add user' };
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

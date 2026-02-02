'use server'

import { db } from '@/db';
import { roles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getRoles(departmentId: string) {
  try {
    const result = await db.select().from(roles).where(eq(roles.departmentId, departmentId));
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    return { success: false, error: 'Failed to fetch roles' };
  }
}

export async function addRole(data: { departmentId: string; name: string; permissions?: any }) {
  try {
    await db.insert(roles).values(data);
    revalidatePath('/roles');
    return { success: true };
  } catch (error) {
    console.error('Failed to add role:', error);
    return { success: false, error: 'Failed to add role' };
  }
}

export async function deleteRole(id: string) {
  try {
    await db.delete(roles).where(eq(roles.id, id));
    revalidatePath('/roles');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete role:', error);
    return { success: false, error: 'Failed to delete role' };
  }
}

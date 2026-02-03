'use server'

import { db } from '@/db';
import { roles } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getRoles(departmentId: string) {
  try {
    const result = await db.select().from(roles)
      .where(
        and(
          eq(roles.departmentId, departmentId),
          eq(roles.isCurrent, true)
        )
      );
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    return { success: false, error: 'Failed to fetch roles' };
  }
}

interface DbError {
  code: string;
}

export async function addRole(data: { departmentId: string; name: string; permissions?: Record<string, unknown> }) {
  try {
    await db.insert(roles).values(data);
    revalidatePath('/roles');
    return { success: true };
  } catch (error: unknown) {
    console.error('Failed to add role:', error);
    if ((error as DbError).code === '23505') {
      return { success: false, error: 'Role name already exists in this department.' };
    }
    return { success: false, error: 'Failed to add role' };
  }
}

export async function deleteRole(id: string) {
  try {
    // SCD Type 2: Soft delete
    await db.update(roles)
      .set({
        isCurrent: false,
        validTo: new Date()
      })
      .where(eq(roles.id, id));
      
    revalidatePath('/roles');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete role:', error);
    return { success: false, error: 'Failed to delete role' };
  }
}

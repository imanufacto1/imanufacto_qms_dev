'use server'

import { db } from '@/db';
import { departmentMaster } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getDepartments() {
  try {
    const departments = await db.select().from(departmentMaster).orderBy(departmentMaster.name);
    return { success: true, data: departments };
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    return { success: false, error: 'Failed to fetch departments' };
  }
}

export async function addDepartment(data: { name: string; code: string; description: string }) {
  try {
    await db.insert(departmentMaster).values(data);
    revalidatePath('/department');
    return { success: true };
  } catch (error) {
    console.error('Failed to add department:', error);
    return { success: false, error: 'Failed to add department' };
  }
}

export async function deleteDepartment(id: string) {
  try {
    await db.delete(departmentMaster).where(eq(departmentMaster.id, id));
    revalidatePath('/department');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete department:', error);
    return { success: false, error: 'Failed to delete department' };
  }
}

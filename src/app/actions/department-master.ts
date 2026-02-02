'use server'

import { db } from '@/db';
import { departmentMaster } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getDepartments() {
  try {
    const departments = await db.select().from(departmentMaster)
      .where(eq(departmentMaster.isCurrent, true))
      .orderBy(departmentMaster.name);
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
  } catch (error: any) {
    console.error('Failed to add department:', error);
    if (error.code === '23505') {
       return { success: false, error: 'Department with this name or code already exists.' };
    }
    return { success: false, error: 'Failed to add department' };
  }
}

export async function deleteDepartment(id: string) {
  try {
    // SCD Type 2: Soft delete
    await db.update(departmentMaster)
      .set({
        isCurrent: false,
        validTo: new Date()
      })
      .where(eq(departmentMaster.id, id));
      
    revalidatePath('/department');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete department:', error);
    return { success: false, error: 'Failed to delete department' };
  }
}

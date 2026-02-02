'use server'

import { db } from '@/db';
import { departments } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getDepartmentsByPlant(plantId: string) {
  try {
    const result = await db.select().from(departments)
      .where(
        and(
          eq(departments.plantId, plantId),
          eq(departments.isCurrent, true)
        )
      );
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    return { success: false, error: 'Failed to fetch departments' };
  }
}

export async function addDepartmentInstance(data: { plantId: string; name: string; managerId?: string }) {
  try {
    await db.insert(departments).values(data);
    revalidatePath('/department');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to add department:', error);
    if (error.code === '23505') {
      return { success: false, error: 'Department name already exists in this plant.' };
    }
    return { success: false, error: 'Failed to add department' };
  }
}

export async function deleteDepartmentInstance(id: string) {
  try {
    // SCD Type 2: Soft delete
    await db.update(departments)
      .set({
        isCurrent: false,
        validTo: new Date()
      })
      .where(eq(departments.id, id));
      
    revalidatePath('/department');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete department:', error);
    return { success: false, error: 'Failed to delete department' };
  }
}

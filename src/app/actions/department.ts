'use server'

import { db } from '@/db';
import { departments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getDepartmentsByPlant(plantId: string) {
  try {
    const result = await db.select().from(departments).where(eq(departments.plantId, plantId));
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
  } catch (error) {
    console.error('Failed to add department:', error);
    return { success: false, error: 'Failed to add department' };
  }
}

export async function deleteDepartmentInstance(id: string) {
  try {
    await db.delete(departments).where(eq(departments.id, id));
    revalidatePath('/department');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete department:', error);
    return { success: false, error: 'Failed to delete department' };
  }
}

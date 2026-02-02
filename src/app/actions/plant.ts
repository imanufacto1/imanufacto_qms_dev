'use server'

import { db } from '@/db';
import { plants } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getPlants(organizationId?: string) {
  try {
    let query = db.select().from(plants);
    if (organizationId) {
      // @ts-ignore - simple query construction
      query = query.where(eq(plants.organizationId, organizationId));
    }
    const result = await query;
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch plants:', error);
    return { success: false, error: 'Failed to fetch plants' };
  }
}

export async function addPlant(data: { organizationId: string; name: string; location?: string }) {
  try {
    await db.insert(plants).values(data);
    revalidatePath('/plants');
    return { success: true };
  } catch (error) {
    console.error('Failed to add plant:', error);
    return { success: false, error: 'Failed to add plant' };
  }
}

export async function deletePlant(id: string) {
  try {
    await db.delete(plants).where(eq(plants.id, id));
    revalidatePath('/plants');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete plant:', error);
    return { success: false, error: 'Failed to delete plant' };
  }
}

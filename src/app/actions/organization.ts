'use server'

import { db } from '@/db';
import { organizations, plants } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getOrganizations() {
  try {
    const orgs = await db.select().from(organizations).orderBy(organizations.createdAt);
    return { success: true, data: orgs };
  } catch (error) {
    console.error('Failed to fetch organizations:', error);
    return { success: false, error: 'Failed to fetch organizations' };
  }
}

export async function addOrganization(data: { name: string; slug?: string; logo?: string }) {
  try {
    // Transaction to create Org and Default Plant
    await db.transaction(async (tx) => {
      const [newOrg] = await tx.insert(organizations).values({
        name: data.name,
        slug: data.slug,
        logo: data.logo
      }).returning();

      // Auto-create default plant
      await tx.insert(plants).values({
        organizationId: newOrg.id,
        name: 'Main Plant',
        location: 'Default Location'
      });
    });

    revalidatePath('/organization');
    return { success: true };
  } catch (error) {
    console.error('Failed to add organization:', error);
    return { success: false, error: 'Failed to add organization' };
  }
}

export async function deleteOrganization(id: string) {
  try {
    // Note: This might fail if there are cascading dependencies not handled by DB
    // Ideally we should delete children first or use CASCADE in DB schema
    await db.delete(organizations).where(eq(organizations.id, id));
    revalidatePath('/organization');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete organization:', error);
    return { success: false, error: 'Failed to delete organization' };
  }
}

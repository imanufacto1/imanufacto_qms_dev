import React from 'react';
import PlantsClient from './plants-client';
import { getPlants } from '@/app/actions/plant';
import { getOrganizations } from '@/app/actions/organization';

export default async function PlantsPage() {
  const { data: plants } = await getPlants();
  const { data: organizations } = await getOrganizations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plant Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Define physical locations or functional plants within your organizations.
        </p>
      </div>

      <PlantsClient 
        initialPlants={plants || []} 
        organizations={organizations || []} 
      />
    </div>
  );
}


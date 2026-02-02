import React from 'react';
import RolesClient from './roles-client';
import { getOrganizations } from '@/app/actions/organization';

export default async function RolesPage() {
  const { data: organizations } = await getOrganizations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Define user roles within specific departments. 
          You must select an Organization, Plant, and Department first.
        </p>
      </div>
      <RolesClient organizations={organizations || []} />
    </div>
  );
}

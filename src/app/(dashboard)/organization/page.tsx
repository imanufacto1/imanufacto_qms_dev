import React from 'react';
import OrganizationClient from './organization-client';
import { getOrganizations } from '@/app/actions/organization';

export default async function OrganizationPage() {
  const { data: organizations } = await getOrganizations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your organizations. Creating an organization will automatically create a default Main Plant.</p>
      </div>
      <OrganizationClient initialOrganizations={organizations || []} />
    </div>
  );
}

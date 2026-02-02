import React from 'react';
import UsersClient from './users-client';
import { getUsers } from '@/app/actions/user';
import { getOrganizations } from '@/app/actions/organization';

export default async function UsersPage() {
  const { data: users } = await getUsers();
  const { data: organizations } = await getOrganizations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage system users. Users must be assigned to a Role, which requires an Organization, Plant, and Department.
        </p>
      </div>
      <UsersClient 
        initialUsers={users || []} 
        organizations={organizations || []} 
      />
    </div>
  );
}

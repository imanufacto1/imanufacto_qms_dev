import React from 'react';
import OrgDepartmentClient from './org-department-client';
import { getDepartments } from '@/app/actions/department-master';
import { getOrganizations } from '@/app/actions/organization';

export default async function DepartmentPage() {
  const { data: masterDepartments } = await getDepartments();
  const { data: organizations } = await getOrganizations();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Assign and manage departments for your plants.
          </p>
        </div>
      </div>

      <OrgDepartmentClient 
        organizations={organizations || []} 
        masterDepartments={masterDepartments || []}
      />
    </div>
  );
}

import React from 'react';
import DepartmentClient from './department-client';
import OrgDepartmentClient from './org-department-client';
import { getDepartments } from '@/app/actions/department-master';
import { getOrganizations } from '@/app/actions/organization';

export default async function DepartmentPage() {
  const { data: masterDepartments, success } = await getDepartments();
  const { data: organizations } = await getOrganizations();

  return (
    <div className="space-y-10">
      {/* Master List Section */}
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Master List</h1>
          <p className="mt-1 text-sm text-gray-500">
            Define standard departments that can be used across the system.
          </p>
        </div>
        <DepartmentClient initialDepartments={success && masterDepartments ? masterDepartments : []} />
      </section>

      <hr className="border-gray-200" />

      {/* Organization Departments Section */}
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization Departments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Assign departments to specific Organizations and Plants. 
            <strong> You must create these here before you can add Roles.</strong>
          </p>
        </div>
        <OrgDepartmentClient organizations={organizations || []} />
      </section>
    </div>
  );
}

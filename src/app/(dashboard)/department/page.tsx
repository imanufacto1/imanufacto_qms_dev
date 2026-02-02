import React from 'react';
import DepartmentClient from './department-client';
import { getDepartments } from '@/app/actions/department-master';

export default async function DepartmentPage() {
  const { data: departments, success } = await getDepartments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Define the master list of departments available for organizations.
        </p>
      </div>

      <DepartmentClient initialDepartments={success && departments ? departments : []} />
    </div>
  );
}

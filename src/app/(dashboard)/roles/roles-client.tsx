"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Shield, ChevronRight } from 'lucide-react';
import { getPlants } from '@/app/actions/plant';
import { getDepartmentsByPlant } from '@/app/actions/department';
import { getRoles, addRole, deleteRole } from '@/app/actions/role';

interface Organization { id: string; name: string; }
interface Plant { id: string; name: string; }
interface Department { id: string; name: string; }
interface Role { id: string; name: string; permissions: any; }

export default function RolesClient({ organizations }: { organizations: Organization[] }) {
  // Selection State
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('');

  // Data State
  const [plants, setPlants] = useState<Plant[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  // UI State
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  // Fetch Plants when Org changes
  useEffect(() => {
    if (selectedOrg) {
      setLoading(true);
      getPlants(selectedOrg).then(res => {
        if (res.success && res.data) setPlants(res.data as Plant[]);
        setLoading(false);
      });
    } else {
      setPlants([]);
    }
    setSelectedPlant('');
    setSelectedDept('');
    setRoles([]);
  }, [selectedOrg]);

  // Fetch Departments when Plant changes
  useEffect(() => {
    if (selectedPlant) {
      setLoading(true);
      getDepartmentsByPlant(selectedPlant).then(res => {
        if (res.success && res.data) setDepartments(res.data as Department[]);
        setLoading(false);
      });
    } else {
      setDepartments([]);
    }
    setSelectedDept('');
    setRoles([]);
  }, [selectedPlant]);

  // Fetch Roles when Department changes
  useEffect(() => {
    if (selectedDept) {
      setLoading(true);
      getRoles(selectedDept).then(res => {
        if (res.success && res.data) setRoles(res.data as Role[]);
        setLoading(false);
      });
    } else {
      setRoles([]);
    }
  }, [selectedDept]);

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDept) return;
    
    try {
      const result = await addRole({ departmentId: selectedDept, name: newRoleName });
      if (result.success) {
        setNewRoleName('');
        setIsModalOpen(false);
        // Refresh roles
        getRoles(selectedDept).then(res => {
          if (res.success && res.data) setRoles(res.data as Role[]);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm('Delete this role?')) return;
    try {
      await deleteRole(id);
      // Refresh roles
      getRoles(selectedDept).then(res => {
        if (res.success && res.data) setRoles(res.data as Role[]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Context Selectors */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
          >
            <option value="">Select Organization...</option>
            {organizations.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plant</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            disabled={!selectedOrg}
          >
            <option value="">Select Plant...</option>
            {plants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            disabled={!selectedPlant}
          >
            <option value="">Select Department...</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      </div>

      {/* Roles List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Roles</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedDept}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add Role
          </button>
        </div>

        {!selectedDept ? (
          <div className="p-12 text-center text-gray-500">
            <ChevronRight className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>Please select an Organization, Plant, and Department to view roles.</p>
          </div>
        ) : roles.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Shield className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>No roles found in this department. Add one to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {roles.map((role) => (
              <div key={role.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-900">{role.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Role</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleAddRole} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  placeholder="e.g. Supervisor"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-lg">Save Role</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

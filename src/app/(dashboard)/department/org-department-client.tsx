"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Building, ChevronRight, Factory } from 'lucide-react';
import { getPlants } from '@/app/actions/plant';
import { getDepartmentsByPlant, addDepartmentInstance, deleteDepartmentInstance } from '@/app/actions/department';

interface Organization { id: string; name: string; }
interface Plant { id: string; name: string; }
interface Department { id: string; name: string; }

export default function OrgDepartmentClient({ organizations }: { organizations: Organization[] }) {
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');

  useEffect(() => {
    if (selectedOrg) {
      getPlants(selectedOrg).then(res => setPlants(res.data as Plant[] || []));
    } else {
      setPlants([]);
    }
    setSelectedPlant('');
    setDepartments([]);
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedPlant) {
      getDepartmentsByPlant(selectedPlant).then(res => setDepartments(res.data as Department[] || []));
    } else {
      setDepartments([]);
    }
  }, [selectedPlant]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlant || !newDeptName) return;
    
    try {
      await addDepartmentInstance({ plantId: selectedPlant, name: newDeptName });
      setNewDeptName('');
      // Refresh
      getDepartmentsByPlant(selectedPlant).then(res => setDepartments(res.data as Department[] || []));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this department?')) return;
    try {
      await deleteDepartmentInstance(id);
      getDepartmentsByPlant(selectedPlant).then(res => setDepartments(res.data as Department[] || []));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm"
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
          >
            <option value="">Select Organization...</option>
            {organizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plant</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm"
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            disabled={!selectedOrg}
          >
            <option value="">Select Plant...</option>
            {plants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            <Factory className="h-4 w-4" /> Plant Departments
          </h3>
          <form onSubmit={handleAdd} className="flex gap-2">
            <input 
              placeholder="New Department Name" 
              className="border rounded-md px-3 py-1 text-sm"
              value={newDeptName}
              onChange={e => setNewDeptName(e.target.value)}
              disabled={!selectedPlant}
            />
            <button 
              type="submit" 
              disabled={!selectedPlant || !newDeptName}
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
            >
              Add
            </button>
          </form>
        </div>

        {!selectedPlant ? (
           <div className="p-8 text-center text-gray-500">
             <p>Select Organization and Plant to manage departments.</p>
           </div>
        ) : departments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No departments found in this plant.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {departments.map(d => (
              <div key={d.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                    <Building className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{d.name}</span>
                </div>
                <button onClick={() => handleDelete(d.id)} className="text-gray-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

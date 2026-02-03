"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Building, Factory, X, MapPin } from 'lucide-react';
import { getPlants } from '@/app/actions/plant';
import { getDepartmentsByPlant, addDepartmentInstance, deleteDepartmentInstance } from '@/app/actions/department';
import { addDepartment } from '@/app/actions/department-master';

interface Organization { id: string; name: string; }
interface Plant { id: string; name: string; location: string | null; }
interface Department { id: string; name: string; }
interface MasterDepartment { id: string; name: string; code: string; }

interface DepartmentManagementProps {
  organizations: Organization[];
  masterDepartments: MasterDepartment[];
}

export default function DepartmentManagementClient({ organizations, masterDepartments }: DepartmentManagementProps) {
  // Selection State
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  
  // Data State
  const [plants, setPlants] = useState<Plant[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'select' | 'create'>('select');
  
  // Form State
  const [selectedMasterId, setSelectedMasterId] = useState('');
  const [newMasterData, setNewMasterData] = useState({ name: '', code: '', description: '' });

  // Load Plants when Org changes
  useEffect(() => {
    if (selectedOrg) {
      getPlants(selectedOrg).then(res => {
        if (res.success && res.data) setPlants(res.data as Plant[]);
      });
    } else {
      setPlants([]);
    }
    setSelectedPlant('');
    setDepartments([]);
  }, [selectedOrg]);

  // Load Departments when Plant changes
  useEffect(() => {
    if (selectedPlant) {
      getDepartmentsByPlant(selectedPlant).then(res => {
        if (res.success && res.data) setDepartments(res.data as Department[]);
      });
    } else {
      setDepartments([]);
    }
  }, [selectedPlant]);

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlant) return;

    try {
      let deptName = '';

      if (activeTab === 'select') {
        const master = masterDepartments.find(m => m.id === selectedMasterId);
        if (!master) return;
        deptName = master.name;
      } else {
        // Create new master first
        const masterRes = await addDepartment(newMasterData);
        if (!masterRes.success) {
          alert(masterRes.error || 'Failed to create new department type');
          return;
        }
        deptName = newMasterData.name;
        // Ideally we should reload master list here, but we'll reload page for simplicity or need a callback
        // For this demo, we proceed to add instance
      }

      const res = await addDepartmentInstance({ 
        plantId: selectedPlant, 
        name: deptName 
      });

      if (res.success) {
        setIsModalOpen(false);
        setNewMasterData({ name: '', code: '', description: '' });
        setSelectedMasterId('');
        // Refresh List
        const updated = await getDepartmentsByPlant(selectedPlant);
        if (updated.success && updated.data) setDepartments(updated.data as Department[]);
        
        if (activeTab === 'create') window.location.reload(); // To refresh master list prop if needed
      } else {
        alert(res.error || 'Failed to add department to plant');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this department from the plant? This will remove all associated roles and users.')) return;
    try {
      const res = await deleteDepartmentInstance(id);
      if (res.success) {
        const updated = await getDepartmentsByPlant(selectedPlant);
        if (updated.success && updated.data) setDepartments(updated.data as Department[]);
      } else {
        alert('Failed to delete department');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Hierarchy Selection Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Organization</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
            >
              <option value="">Choose an Organization...</option>
              {organizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Plant</label>
            <select 
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              disabled={!selectedOrg}
            >
              <option value="">
                {!selectedOrg ? 'Select Organization First' : 'Choose a Plant...'}
              </option>
              {plants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex justify-between items-center pt-4">
        <div>
           <h2 className="text-xl font-semibold text-gray-900">
             {selectedPlant ? 
               `Departments in ${plants.find(p => p.id === selectedPlant)?.name}` : 
               'Department Management'
             }
           </h2>
           <p className="text-sm text-gray-500 mt-1">
             Manage operational departments for this facility.
           </p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!selectedPlant}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </button>
      </div>

      {/* 3. Department Grid */}
      {!selectedPlant ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Factory className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Plant Selected</h3>
          <p className="text-gray-500">Please select an organization and plant above to manage departments.</p>
        </div>
      ) : departments.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Departments Yet</h3>
          <p className="text-gray-500 mb-6">This plant has no active departments.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add First Department
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                  <Building className="h-5 w-5" />
                </div>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-1"
                  title="Remove Department"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{dept.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {plants.find(p => p.id === selectedPlant)?.name}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="text-gray-500">Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Department Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add Department</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Tabs */}
              <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                <button
                  onClick={() => setActiveTab('select')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'select' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Select Existing
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === 'create' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Create New
                </button>
              </div>

              <form onSubmit={handleAddDepartment} className="space-y-4">
                {activeTab === 'select' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Type</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={selectedMasterId}
                      onChange={e => setSelectedMasterId(e.target.value)}
                    >
                      <option value="">Select a department type...</option>
                      {masterDepartments.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.code})</option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      Choose from the standard list of approved departments.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Department Name</label>
                      <input
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Research & Development"
                        value={newMasterData.name}
                        onChange={e => setNewMasterData({...newMasterData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                      <input
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. R&D"
                        value={newMasterData.code}
                        onChange={e => setNewMasterData({...newMasterData, code: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        value={newMasterData.description}
                        onChange={e => setNewMasterData({...newMasterData, description: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium shadow-sm"
                  >
                    {activeTab === 'select' ? 'Add to Plant' : 'Create & Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

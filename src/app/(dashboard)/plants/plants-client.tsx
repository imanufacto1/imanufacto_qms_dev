"use client";

import React, { useState } from 'react';
import { Plus, Trash2, X, Factory, MapPin, Building, Save } from 'lucide-react';
import { addPlant, deletePlant } from '@/app/actions/plant';

interface Plant {
  id: string;
  name: string;
  location: string | null;
  organizationId: string;
  organizationName?: string;
}

interface Organization {
  id: string;
  name: string;
}

interface PlantsClientProps {
  initialPlants: Plant[];
  organizations: Organization[];
}

export default function PlantsClient({ initialPlants, organizations }: PlantsClientProps) {
  const [plants] = useState<Plant[]>(initialPlants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    organizationId: ''
  });
  
  // Filter state
  const [selectedOrgFilter, setSelectedOrgFilter] = useState<string>('');

  const filteredPlants = selectedOrgFilter 
    ? plants.filter(p => p.organizationId === selectedOrgFilter)
    : plants;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await addPlant({
        name: formData.name,
        location: formData.location,
        organizationId: formData.organizationId
      });

      if (result.success) {
        setIsModalOpen(false);
        setFormData({ name: '', location: '', organizationId: '' });
        window.location.reload();
      } else {
        alert('Failed to add plant');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plant? This may affect linked departments.')) return;
    
    try {
      const result = await deletePlant(id);
      if (result.success) {
         window.location.reload();
      } else {
        alert('Failed to delete plant');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Plant List</h2>
          <p className="text-sm text-gray-500">Manage manufacturing plants and facilities.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            className="border-gray-300 rounded-lg text-sm min-w-[200px]"
            value={selectedOrgFilter}
            onChange={(e) => setSelectedOrgFilter(e.target.value)}
          >
            <option value="">All Organizations</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Add Plant
          </button>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg border border-gray-200 border-dashed">
            <Factory className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>No plants found. Add one to get started.</p>
          </div>
        ) : (
          filteredPlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <Factory className="h-5 w-5" />
                </div>
                <button
                  onClick={() => handleDelete(plant.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-1"
                  title="Delete Plant"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{plant.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{plant.location || 'No location specified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-3.5 w-3.5" />
                  {/* Note: In a real app we'd join the Org name, here we might need to lookup from props if not in object */}
                  <span>
                     {organizations.find(o => o.id === plant.organizationId)?.name || 'Unknown Organization'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add New Plant</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700 mb-1">
                  Organization *
                </label>
                <select
                  id="organizationId"
                  name="organizationId"
                  required
                  value={formData.organizationId}
                  onChange={e => setFormData({...formData, organizationId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Organization...</option>
                  {organizations.map(org => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Plant Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Manufacturing Unit 1"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. New York, USA"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Plant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

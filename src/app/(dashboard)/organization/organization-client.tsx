"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Save, X, Building, Factory } from 'lucide-react';
import { addOrganization, deleteOrganization } from '@/app/actions/organization';

interface Organization {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
  createdAt: Date | null;
}

export default function OrganizationClient({ initialOrganizations }: { initialOrganizations: Organization[] }) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await addOrganization(formData);
      if (result.success) {
        setIsModalOpen(false);
        setFormData({ name: '', slug: '' });
        window.location.reload();
      } else {
        alert('Failed to add organization');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will delete the organization and all its data!')) return;
    try {
      const result = await deleteOrganization(id);
      if (result.success) window.location.reload();
      else alert('Failed to delete organization');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Organizations List</h2>
          <p className="text-sm text-gray-500">Manage top-level organizations (Tenants).</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Organization
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                  <p className="text-sm text-gray-500">{org.slug || 'No slug'}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(org.id)}
                className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
              <Factory className="h-4 w-4" />
              <span>Includes Default Plant</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Organization</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (Optional)</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

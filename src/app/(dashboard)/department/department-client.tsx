"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Save, X, Building2 } from 'lucide-react';
import { addDepartment, deleteDepartment } from '@/app/actions/department-master';

interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
  createdAt: Date | null;
}

interface DepartmentClientProps {
  initialDepartments: Department[];
}

export default function DepartmentClient({ initialDepartments }: DepartmentClientProps) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await addDepartment({
        name: formData.name,
        code: formData.code,
        description: formData.description
      });

      if (result.success) {
        setIsModalOpen(false);
        setFormData({ name: '', code: '', description: '' });
        // Refresh local state (in a real app, maybe fetch again or optimistic update)
        // For now, we rely on page reload or simple optimistic addition if we had the ID
        // But since we don't have the ID from the insert immediately without returning it,
        // we'll trigger a router refresh in the parent or just let revalidatePath handle it on next visit.
        // Better: The Server Action revalidates, so we just need to refresh the router.
        window.location.reload(); 
      } else {
        alert('Failed to add department');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this department?')) return;
    
    try {
      const result = await deleteDepartment(id);
      if (result.success) {
         window.location.reload();
      } else {
        alert('Failed to delete department');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Departments List</h2>
          <p className="text-sm text-gray-500">Manage standard departments for the organization.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </button>
      </div>

      {/* List */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p>No departments found. Add one to get started.</p>
                </td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {dept.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {dept.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add New Department</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Human Resources"
                />
              </div>
              
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Department Code *
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. HR"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional description..."
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
                  {loading ? 'Saving...' : 'Save Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, User, Search, Filter } from 'lucide-react';
import { getPlants } from '@/app/actions/plant';
import { getDepartmentsByPlant } from '@/app/actions/department';
import { getRoles } from '@/app/actions/role';
import { addUser, deleteUser } from '@/app/actions/user';

interface Organization { id: string; name: string; }
interface Plant { id: string; name: string; }
interface Department { id: string; name: string; }
interface Role { id: string; name: string; }
interface UserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  username: string | null;
  roleName: string | null;
  departmentName: string | null;
  plantName: string | null;
  organizationName: string | null;
}

export default function UsersClient({ 
  initialUsers, 
  organizations 
}: { 
  initialUsers: UserData[], 
  organizations: Organization[] 
}) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Selection State for Add User
  const [selectedOrg, setSelectedOrg] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Dropdown Data
  const [plants, setPlants] = useState<Plant[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  // Form Data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '' // Optional in UI but required by logic if custom auth
  });

  // Fetch chains
  useEffect(() => {
    if (selectedOrg) getPlants(selectedOrg).then(res => setPlants(res.data as Plant[] || []));
    else setPlants([]);
    setSelectedPlant('');
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedPlant) getDepartmentsByPlant(selectedPlant).then(res => setDepartments(res.data as Department[] || []));
    else setDepartments([]);
    setSelectedDept('');
  }, [selectedPlant]);

  useEffect(() => {
    if (selectedDept) getRoles(selectedDept).then(res => setRoles(res.data as Role[] || []));
    else setRoles([]);
    setSelectedRole('');
  }, [selectedDept]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setLoading(true);

    try {
      const result = await addUser({
        roleId: selectedRole,
        ...formData
      });

      if (result.success) {
        setIsModalOpen(false);
        setFormData({ firstName: '', lastName: '', email: '', username: '', password: '' });
        window.location.reload();
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(u => 
    (u.firstName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (u.lastName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (u.username?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <User className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p>No users found.</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.roleName || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.departmentName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{user.plantName}</span>
                      <span className="text-xs text-gray-400">{user.organizationName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-gray-500" /></button>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-6">
              {/* Context Selection */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Assignment Context
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Organization *</label>
                    <select 
                      required
                      className="w-full text-sm border-gray-300 rounded-md"
                      value={selectedOrg}
                      onChange={e => setSelectedOrg(e.target.value)}
                    >
                      <option value="">Select Organization...</option>
                      {organizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Plant *</label>
                    <select 
                      required
                      className="w-full text-sm border-gray-300 rounded-md"
                      value={selectedPlant}
                      onChange={e => setSelectedPlant(e.target.value)}
                      disabled={!selectedOrg}
                    >
                      <option value="">Select Plant...</option>
                      {plants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Department *</label>
                    <select 
                      required
                      className="w-full text-sm border-gray-300 rounded-md"
                      value={selectedDept}
                      onChange={e => setSelectedDept(e.target.value)}
                      disabled={!selectedPlant}
                    >
                      <option value="">Select Department...</option>
                      {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Role *</label>
                    <select 
                      required
                      className="w-full text-sm border-gray-300 rounded-md"
                      value={selectedRole}
                      onChange={e => setSelectedRole(e.target.value)}
                      disabled={!selectedDept}
                    >
                      <option value="">Select Role...</option>
                      {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input required className="w-full border rounded-lg px-3 py-2" 
                    value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input required className="w-full border rounded-lg px-3 py-2" 
                    value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" className="w-full border rounded-lg px-3 py-2" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input required className="w-full border rounded-lg px-3 py-2" 
                    value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                  {loading ? 'Saving...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

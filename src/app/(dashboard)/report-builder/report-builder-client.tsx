"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Search, FileText, Edit2 } from 'lucide-react';
import { deleteReport } from '@/app/actions/report-builder';

interface Report {
  id: string;
  reportName: string;
  reportType: string | null;
  scheduledTime: Date | null;
  previousExecutedTime: Date | null;
  status: string | null;
  // ... other fields
}

export default function ReportBuilderClient({ 
  initialReports 
}: { 
  initialReports: Report[] 
}) {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    try {
      await deleteReport(id);
      // Optimistic update or refresh
      setReports(reports.filter(r => r.id !== id));
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to delete report');
    }
  };

  const filteredReports = reports.filter(r => 
    r.reportName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => router.push('/report-builder/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto justify-center"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">S No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Executed Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p>No reports found.</p>
                </td>
              </tr>
            ) : (
              filteredReports.map((report, index) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.reportName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.reportType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(report.scheduledTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(report.previousExecutedTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => router.push(`/report-builder/${report.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(report.id)} 
                      className="text-red-600 hover:text-red-900"
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
    </div>
  );
}

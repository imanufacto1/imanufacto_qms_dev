import React from 'react';
import ReportBuilderClient from './report-builder-client';
import { getReports } from '@/app/actions/report-builder';

export default async function ReportBuilderPage() {
  const { data: reports } = await getReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Report Builder</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create, manage and schedule reports.
        </p>
      </div>
      <ReportBuilderClient initialReports={reports || []} />
    </div>
  );
}

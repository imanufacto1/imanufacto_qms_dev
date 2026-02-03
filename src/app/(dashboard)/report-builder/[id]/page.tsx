import React from 'react';
import { getReportById } from '@/app/actions/report-builder';
import ReportEditor from './report-editor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportEditorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const isNew = id === 'new';
  
  let reportData = null;

  if (!isNew) {
    const { data } = await getReportById(id);
    if (data) {
      reportData = data;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? 'Create Report' : 'Edit Report'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure report template and settings.
        </p>
      </div>
      <ReportEditor initialData={reportData} isNew={isNew} />
    </div>
  );
}

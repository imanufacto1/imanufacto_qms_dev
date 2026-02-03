import React from 'react';
import { getReportByCode } from '@/app/actions/report-builder';
import ReportViewer from './report-viewer';
import { AlertTriangle } from 'lucide-react';

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function ReportViewPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { code } = resolvedParams;
  
  // Clean up code from URL if needed (though it should be passed cleanly)
  // The menu passes codes like "OBJECTIVE", "NON_CONFORMANCE"
  const reportCode = code.toUpperCase();

  const { data: report, error } = await getReportByCode(reportCode);

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">Report Not Found</h2>
        <p className="mt-2">The report {reportCode} could not be found.</p>
        <p className="text-sm mt-1">Please ensure it is configured in the Report Builder.</p>
      </div>
    );
  }

  const viewerReport = {
    ...report,
    pageSetup: (report.pageSetup && typeof report.pageSetup === 'object') ? report.pageSetup : null,
  };

  return <ReportViewer report={viewerReport as any} />;
}

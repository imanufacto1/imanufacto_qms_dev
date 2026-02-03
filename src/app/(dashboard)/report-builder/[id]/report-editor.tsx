"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { createReport, updateReport } from '@/app/actions/report-builder';
import { getCurrentUserIdentity } from '@/app/actions/auth';
import ReportViewer from '@/app/(dashboard)/reports/view/[code]/report-viewer';

type PageSetup = {
  paperFormat?: string;
  orientation?: string;
  headerHeight?: number;
  footerHeight?: number;
  margin?: number;
  waitForJavascript?: boolean;
  [key: string]: unknown;
};

interface ReportData {
  id: string;
  reportName: string;
  reportCode: string;
  reportType?: string | null;
  status?: string | null;
  schedulerStatus?: string | null;
  templateContent?: string | null;
  headerContent?: string | null;
  footerContent?: string | null;
  pageSetup?: {
    paperFormat?: string;
    orientation?: string;
    headerHeight?: number;
    footerHeight?: number;
    margin?: number;
    waitForJavascript?: boolean;
    [key: string]: unknown;
  } | unknown | null;
  localScripts?: string | null;
  dataSettings?: unknown;
  serverScript?: string | null;
  excelTemplate?: string | null;
  lastModifiedAt?: string | Date | null;
  lastModifiedBy?: string | null;
  versionSemver?: string | null;
  [key: string]: unknown; // Allow other Drizzle fields
}

interface ReportEditorProps {
  initialData: ReportData | null;
  isNew: boolean;
}

const TABS = [
  { id: 'template', label: 'Template' },
  { id: 'header', label: 'Header' },
  { id: 'footer', label: 'Footer' },
  { id: 'pageSetup', label: 'Page Setup' },
  { id: 'localScripts', label: 'Local Scripts' },
  { id: 'dataSettings', label: 'Data Settings' },
  { id: 'scheduler', label: 'Scheduler' },
  { id: 'serverScript', label: 'Server Script' },
  { id: 'excelTemplate', label: 'Excel Template' },
];

export default function ReportEditor({ initialData, isNew }: ReportEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('template');
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Form State
  const initialPageSetup: PageSetup = (initialData?.pageSetup && typeof initialData.pageSetup === 'object')
    ? (initialData.pageSetup as PageSetup)
    : {
        paperFormat: 'A4',
        orientation: 'Landscape',
        headerHeight: 1,
        footerHeight: 1.4,
        margin: 0.3,
        waitForJavascript: false
      };

  const [formData, setFormData] = useState({
    reportName: initialData?.reportName || '',
    reportCode: initialData?.reportCode || '',
    reportType: initialData?.reportType || 'PDF v2',
    status: initialData?.status || 'Inactive',
    schedulerStatus: initialData?.schedulerStatus || 'Inactive',
    templateContent: initialData?.templateContent || '',
    headerContent: initialData?.headerContent || '',
    footerContent: initialData?.footerContent || '',
    localScripts: initialData?.localScripts || '',
    serverScript: initialData?.serverScript || '',
    excelTemplate: initialData?.excelTemplate || '',
    // Page Setup (JSON)
    pageSetup: initialPageSetup,
    // Data Settings (JSON)
    dataSettings: initialData?.dataSettings || {},
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePageSetupChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      pageSetup: { ...prev.pageSetup, [field]: value }
    }));
  };

  React.useEffect(() => {
    (async () => {
      const identity = await getCurrentUserIdentity();
      if (identity) {
        setCurrentUser(identity);
      }
    })();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      let result;
      if (isNew) {
        result = await createReport(formData);
      } else {
        if (!initialData) {
          setLoading(false);
          return;
        }
        result = await updateReport(initialData.id, formData);
      }

      if (result.success) {
        router.push('/report-builder');
        router.refresh();
      } else {
        alert(result.error || 'Failed to save report');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Top Form Section */}
      <div className="p-6 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Name</label>
            <input
              type="text"
              value={formData.reportName}
              onChange={(e) => handleChange('reportName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Access Control (Admin)</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
              <option>Global</option>
            </select>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700">Scheduler Status</label>
             <div className="mt-1">
               <span className={`px-2 py-1 text-xs font-semibold rounded-full ${formData.schedulerStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                 {formData.schedulerStatus}
               </span>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Code</label>
            <input
              type="text"
              value={formData.reportCode}
              onChange={(e) => handleChange('reportCode', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select 
              value={formData.reportType}
              onChange={(e) => handleChange('reportType', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              <option value="PDF v2">PDF v2</option>
              <option value="HTML">HTML</option>
              <option value="Excel">Excel</option>
            </select>
          </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Status</label>
             <select 
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Version</label>
            <div className="mt-1">
              <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                {initialData?.versionSemver ?? '0.0.0'}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Modified</label>
            <div className="mt-1 text-sm text-gray-600">
              {initialData?.lastModifiedAt
                ? new Date(
                    typeof initialData.lastModifiedAt === 'string'
                      ? initialData.lastModifiedAt
                      : (initialData.lastModifiedAt as Date)
                  ).toLocaleString()
                : '—'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modified By</label>
            <div className="mt-1 text-sm text-gray-900">
              {currentUser || '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="border-b border-gray-200 bg-gray-100">
        <nav className="-mb-px flex space-x-0.5 overflow-x-auto" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tabs Content */}
      <div className="p-6 min-h-[400px]">
        {activeTab === 'template' && (
          <div className="h-full flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">HTML Template</label>
            <div className="flex-1 w-full border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="85vh"
                defaultLanguage="html"
                theme="vs-dark"
                value={formData.templateContent || ''}
                onChange={(value) => handleChange('templateContent', value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'header' && (
           <div className="h-full flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">Header Content</label>
            <div className="flex-1 w-full border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="85vh"
                defaultLanguage="html"
                theme="vs-dark"
                value={formData.headerContent || ''}
                onChange={(value) => handleChange('headerContent', value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'footer' && (
           <div className="h-full flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Content</label>
            <div className="flex-1 w-full border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="85vh"
                defaultLanguage="html"
                theme="vs-dark"
                value={formData.footerContent || ''}
                onChange={(value) => handleChange('footerContent', value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'pageSetup' && (
          <div className="grid grid-cols-2 gap-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">Paper Format</label>
              <select
                value={formData.pageSetup.paperFormat}
                onChange={(e) => handlePageSetupChange('paperFormat', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="Letter">Letter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Orientation</label>
              <select
                value={formData.pageSetup.orientation}
                onChange={(e) => handlePageSetupChange('orientation', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                <option value="Landscape">Landscape</option>
                <option value="Portrait">Portrait</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Header Height (cm)</label>
              <input
                type="number"
                step="0.1"
                value={formData.pageSetup.headerHeight}
                onChange={(e) => handlePageSetupChange('headerHeight', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Footer Height (cm)</label>
              <input
                type="number"
                step="0.1"
                value={formData.pageSetup.footerHeight}
                onChange={(e) => handlePageSetupChange('footerHeight', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Margin (cm)</label>
              <input
                type="number"
                step="0.1"
                value={formData.pageSetup.margin}
                onChange={(e) => handlePageSetupChange('margin', parseFloat(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                checked={formData.pageSetup.waitForJavascript}
                onChange={(e) => handlePageSetupChange('waitForJavascript', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Wait for Javascript</label>
            </div>
          </div>
        )}

        {/* Other tabs can be similar textareas for now */}
        {(['localScripts', 'dataSettings', 'serverScript', 'excelTemplate'].includes(activeTab)) && (
          <div className="h-full flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">{TABS.find(t => t.id === activeTab)?.label}</label>
            <div className="flex-1 w-full border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="85vh"
                defaultLanguage={activeTab === 'dataSettings' ? 'json' : 'javascript'}
                theme="vs-dark"
                value={formData[activeTab as keyof typeof formData] as string || ''}
                onChange={(value) => handleChange(activeTab, value || '')}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'scheduler' && (
          <div className="text-gray-500 text-center py-12">
            Scheduler configuration coming soon.
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Preview</h3>
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded bg-white hover:bg-gray-100"
          >
            {previewOpen ? 'Hide' : 'Show'}
          </button>
        </div>
        {previewOpen && (
          <div className="w-full h-[70vh] border border-gray-300 rounded-lg overflow-hidden bg-white">
            {formData.reportType === 'PDF v2' ? (
              <ReportViewer report={{ ...formData, id: initialData?.id || 'preview' }} />
            ) : (
              <div className="p-4 overflow-auto h-full">
                <div dangerouslySetInnerHTML={{ __html: (formData.templateContent || '').toString() }} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? 'Saving...' : 'Save Report'}
        </button>
      </div>
    </div>
  );
}

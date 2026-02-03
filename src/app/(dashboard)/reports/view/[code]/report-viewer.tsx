"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Loader2, RefreshCw } from 'lucide-react';

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
  } | null;
  localScripts?: string | null;
  dataSettings?: unknown;
  serverScript?: string | null;
  excelTemplate?: string | null;
  [key: string]: unknown;
}

interface ReportViewerProps {
  report: ReportData;
}

export default function ReportViewer({ report }: ReportViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePdf = useCallback(async () => {
    if (!contentRef.current) return;
    setLoading(true);

    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Page setup from report or default A4
      const format = report.pageSetup?.paperFormat?.toLowerCase() || 'a4';
      const orientation = (report.pageSetup?.orientation?.toLowerCase() || 'portrait') as 'portrait' | 'landscape';
      const margin = typeof report.pageSetup?.margin === 'number' ? report.pageSetup?.margin : 10;
      
      const pdf = new jsPDF({ orientation, unit: 'mm', format });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight > pageHeight - margin * 2 ? pageWidth - margin * 2 : imgHeight);
      
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  }, [report]);

  useEffect(() => {
    // Wait for content to render then generate PDF
    // Small timeout to ensure styles are applied
    const timer = setTimeout(() => {
      generatePdf();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report, generatePdf]);

  // Combine header, content, footer
  // This is a simple concatenation. For complex layouts, we'd need more structure.
  const fullContent = `
    <div class="report-container" style="padding: 20px; font-family: Arial, sans-serif;">
      ${report.headerContent || ''}
      <div class="report-body" style="margin: 20px 0;">
        ${report.templateContent || '<p>No content defined for this report.</p>'}
      </div>
      ${report.footerContent || ''}
    </div>
  `;

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-2xl font-bold text-gray-800">{report.reportName}</h1>
        <div className="flex gap-2">
          <button 
            onClick={generatePdf} 
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-500">Generating PDF Preview...</p>
            </div>
          </div>
        )}
        
        {pdfUrl ? (
          <iframe 
            src={pdfUrl} 
            className="w-full h-full" 
            title="PDF Viewer"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Preview not available
          </div>
        )}
      </div>

      {/* Hidden container for rendering HTML to canvas */}
      <div className="absolute top-[-10000px] left-[-10000px]">
        <div 
          ref={contentRef}
          style={{
            width: report.pageSetup?.paperFormat === 'A3' ? '297mm' : '210mm',
            minHeight: report.pageSetup?.paperFormat === 'A3' ? '420mm' : '297mm', // Approximate A4 height
            backgroundColor: 'white',
            color: 'black'
          }}
          dangerouslySetInnerHTML={{ __html: fullContent }}
        />
      </div>
    </div>
  );
}

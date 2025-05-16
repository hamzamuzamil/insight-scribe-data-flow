
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { exportAsPDF, generateShareableLink, exportToNotion, exportAsZIP } from "@/utils/exportUtils";
import { ChartData } from "@/utils/chartRenderer";

interface ExportOptionsProps {
  csvData: any;
  insights: string;
  chartConfig: ChartData | null;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ csvData, insights, chartConfig }) => {
  const reportContentRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    exportAsPDF('report-content', 'data-analysis-report.pdf');
  };

  const handleShareLink = async () => {
    await generateShareableLink(csvData, insights, chartConfig);
  };

  const handleExportZIP = () => {
    exportAsZIP(csvData, insights, 'data-insights.zip');
  };

  return (
    <div ref={reportContentRef}>
      <h3 className="text-lg font-medium mb-4">Export Options</h3>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Button variant="outline" className="justify-start" onClick={handleExportPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            Export as PDF
          </Button>
          <Button variant="outline" className="justify-start" onClick={handleShareLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Generate Share Link
          </Button>
          <Button variant="outline" className="justify-start" onClick={exportToNotion}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line>
            </svg>
            Export to Notion
          </Button>
          <Button variant="outline" className="justify-start" onClick={handleExportZIP}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path>
            </svg>
            Export CSV with Insights
          </Button>
        </div>
      </div>
    </div>
  );
};

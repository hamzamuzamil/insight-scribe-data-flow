
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { exportAsPDF, generateShareableLink, exportToNotion, exportAsZIP } from "@/utils/exportUtils";
import { ChartData } from "@/utils/chartRenderer";
import { FileDown, Link as LinkIcon, Copy, FileText, Archive } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

interface ExportOptionsProps {
  csvData: any;
  insights: string;
  chartConfig: ChartData | null;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ csvData, insights, chartConfig }) => {
  const reportContentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleExportPDF = async () => {
    setIsExporting('pdf');
    try {
      await exportAsPDF('report-content', 'data-analysis-report.pdf');
      toast.success('PDF exported successfully');
    } catch (error) {
      toast.error('Failed to export PDF');
      console.error(error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleShareLink = async () => {
    setIsExporting('link');
    try {
      const link = await generateShareableLink(csvData, insights, chartConfig);
      if (link) {
        setShareLink(link);
        toast.success('Share link generated and copied to clipboard');
      }
    } catch (error) {
      toast.error('Failed to generate share link');
      console.error(error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportZIP = async () => {
    setIsExporting('zip');
    try {
      await exportAsZIP(csvData, insights, 'data-insights.zip');
      toast.success('ZIP file exported successfully');
    } catch (error) {
      toast.error('Failed to export ZIP file');
      console.error(error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportNotion = async () => {
    setIsExporting('notion');
    try {
      await exportToNotion();
      toast.success('Content ready for Notion');
    } catch (error) {
      toast.error('Failed to prepare Notion export');
      console.error(error);
    } finally {
      setIsExporting(null);
    }
  };

  const copyShareLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div ref={reportContentRef}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-lg font-medium mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5 border border-white/10">
            <h4 className="font-medium mb-3 flex items-center">
              <LinkIcon className="mr-2 h-4 w-4 text-primary" />
              Share Analysis
            </h4>
            <p className="text-sm text-muted-foreground mb-4">Generate a shareable link to your analysis that others can view.</p>
            
            {shareLink ? (
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="icon" onClick={copyShareLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            ) : null}
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="w-full justify-center" 
                onClick={handleShareLink}
                disabled={isExporting === 'link'}
              >
                {isExporting === 'link' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Generate Share Link
                  </>
                )}
              </Button>
            </motion.div>
          </div>
          
          <div className="glass rounded-xl p-5 border border-white/10">
            <h4 className="font-medium mb-3 flex items-center">
              <FileDown className="mr-2 h-4 w-4 text-primary" />
              Export Report
            </h4>
            <p className="text-sm text-muted-foreground mb-4">Download your analysis and insights in different formats.</p>
            
            <div className="space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleExportPDF}
                  disabled={isExporting === 'pdf'}
                >
                  {isExporting === 'pdf' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      </motion.div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export as PDF
                    </>
                  )}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleExportNotion}
                  disabled={isExporting === 'notion'}
                >
                  {isExporting === 'notion' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      </motion.div>
                      Preparing...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Export to Notion
                    </>
                  )}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={handleExportZIP}
                  disabled={isExporting === 'zip'}
                >
                  {isExporting === 'zip' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      </motion.div>
                      Archiving...
                    </>
                  ) : (
                    <>
                      <Archive className="mr-2 h-4 w-4" />
                      Export CSV with Insights
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Trust Boosting Section */}
      <motion.div 
        className="mt-8 glass rounded-xl p-5 border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h4 className="font-medium mb-4">Why People Love ProReporter</h4>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-1">99%</div>
            <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-1">500K+</div>
            <div className="text-xs text-muted-foreground">Insights Generated</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-primary mb-1">12K+</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-none gap-3 py-2">
          {[
            { name: "Sarah K.", role: "Marketing Director", text: "ProReporter saved me hours of data analysis every week." },
            { name: "Michael T.", role: "Finance Analyst", text: "The insights feature helped us identify critical business trends." },
            { name: "Priya M.", role: "Product Manager", text: "The best data tool I've used. Interactive and intuitive!" },
            { name: "James L.", role: "Startup Founder", text: "Made our quarterly reports 10x better with minimal effort." }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="min-w-[250px] glass bg-secondary/30 p-4 rounded-lg flex-shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <p className="text-sm italic mb-2">"{testimonial.text}"</p>
              <div className="text-xs">
                <span className="font-medium text-primary">{testimonial.name}</span> • {testimonial.role}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

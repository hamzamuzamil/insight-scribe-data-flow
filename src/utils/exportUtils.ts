
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import html2pdf from 'html2pdf.js';
import { toast } from "@/components/ui/sonner";
import { v4 as uuidv4 } from 'uuid';

// Store exports in local storage instead of Supabase for now
// (can be updated later when Supabase is integrated)
export const storeExport = (data: any, insights: string, chartConfig?: any) => {
  const id = uuidv4();
  const exportData = {
    id,
    data,
    insights,
    chartConfig,
    timestamp: new Date().toISOString()
  };
  
  const storedExports = JSON.parse(localStorage.getItem('reports') || '[]');
  storedExports.push(exportData);
  localStorage.setItem('reports', JSON.stringify(storedExports));
  
  return id;
};

export const exportAsPDF = async (elementId: string, filename: string = 'report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    toast.error("Could not find content to export");
    return;
  }

  const opt = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    toast.success("PDF exported successfully");
  } catch (error) {
    console.error("Error exporting PDF:", error);
    toast.error("Failed to export PDF");
  }
};

export const generateShareableLink = async (data: any, insights: string, chartConfig?: any) => {
  try {
    // Store data and get unique ID
    const id = storeExport(data, insights, chartConfig);
    
    // Create a shareable URL
    const link = `${window.location.origin}/share/${id}`;
    
    // Copy to clipboard
    await navigator.clipboard.writeText(link);
    toast.success("Share link copied to clipboard");
    
    return link;
  } catch (error) {
    console.error("Error generating shareable link:", error);
    toast.error("Couldn't generate a share link right now. Try again later.");
    return null;
  }
};

export const exportToNotion = () => {
  // This would integrate with Notion API
  toast.info("Notion export feature coming soon");
};

export const exportAsZIP = async (csvData: any, insights: string, filename: string = 'data-insights.zip') => {
  if (!csvData || !csvData.data) {
    toast.error("No data available to export");
    return;
  }

  const zip = new JSZip();
  
  // Add CSV data
  const csvContent = convertJsonToCsv(csvData);
  zip.file("data.csv", csvContent);
  
  // Add insights as text
  zip.file("insights.txt", insights);
  
  try {
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, filename);
    toast.success("ZIP file exported successfully");
  } catch (error) {
    console.error("Error exporting ZIP:", error);
    toast.error("Failed to export ZIP file");
  }
};

// Helper to convert JSON back to CSV
const convertJsonToCsv = (jsonData: any) => {
  if (!jsonData || !jsonData.data || !jsonData.headers) {
    return '';
  }
  
  const { headers, data } = jsonData;
  const headerRow = headers.join(',');
  const rows = data.map((row: any) => 
    headers.map((header: string) => row[header] || '').join(',')
  );
  
  return [headerRow, ...rows].join('\n');
};

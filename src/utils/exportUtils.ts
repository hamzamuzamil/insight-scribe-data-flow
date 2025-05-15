
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import html2pdf from 'html2pdf.js';
import { toast } from "@/components/ui/sonner";

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

export const generateShareableLink = async (data: any) => {
  // In a real implementation, this would create a shareable link via backend
  // Here we'll simulate it with localStorage
  const id = `report-${Date.now()}`;
  localStorage.setItem(id, JSON.stringify(data));
  
  const link = `${window.location.origin}/shared/${id}`;
  
  // Copy to clipboard
  await navigator.clipboard.writeText(link);
  toast.success("Share link copied to clipboard");
  
  return link;
};

export const exportToNotion = () => {
  // This would integrate with Notion API
  toast.info("Notion export feature coming soon");
};

export const exportAsZIP = async (csvData: any, insights: string, filename: string = 'data-insights.zip') => {
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

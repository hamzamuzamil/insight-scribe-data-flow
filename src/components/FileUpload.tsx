
import { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/sonner";

interface FileUploadProps {
  onFileUpload: (data: any) => void;
  isLoading: boolean;
}

export const FileUpload = ({ onFileUpload, isLoading }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Please upload a CSV file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const result = parseCSV(csv);
        onFileUpload(result);
        toast.success(`File "${file.name}" uploaded successfully`);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        toast.error("Error parsing CSV file. Please check the format.");
      }
    };

    reader.onerror = () => {
      toast.error("Error reading file");
    };

    reader.readAsText(file);
  };

  const parseCSV = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      const values = line.split(',').map(value => value.trim());
      const row: Record<string, string | number> = {};
      
      headers.forEach((header, index) => {
        const value = values[index] || '';
        // Try to convert to number if possible
        const numValue = Number(value);
        row[header] = !isNaN(numValue) && value !== '' ? numValue : value;
      });
      
      data.push(row);
    }

    return {
      headers,
      data,
      rawCSV: csv
    };
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className={`glass border-2 ${isDragging ? 'border-primary border-dashed' : 'border-white/10'} transition-all duration-300 animate-scale-in`}>
      <CardContent className="p-0">
        <div
          className={`flex flex-col items-center justify-center p-10 text-center h-64 transition-all duration-300 ${isDragging ? 'bg-primary/5' : ''}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader size="lg" className="mb-4" />
              <p className="text-muted-foreground">Processing your data...</p>
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-16 w-16 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-300`}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h3 className="text-xl font-medium mb-2">Drop your CSV file here</h3>
              <p className="text-muted-foreground mb-4">or</p>
              <Button onClick={handleButtonClick}>
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileInput}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

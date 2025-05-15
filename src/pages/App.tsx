
import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { DataTable } from "@/components/DataTable";
import { ChatInterface } from "@/components/ChatInterface";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";

const App = () => {
  const [csvData, setCsvData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (data: any) => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setCsvData(data);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-white/10 backdrop-blur-lg bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="text-sm text-muted-foreground">
            <span className="hidden sm:inline">Data stays private - </span>
            <span className="text-green-500">Processing locally</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        {!csvData ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="text-3xl font-bold mb-3 text-gradient">
                Upload your data to begin analysis
              </h1>
              <p className="text-muted-foreground">
                Drop a CSV file to start asking questions and getting insights
              </p>
            </div>
            
            <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center p-4 glass rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mx-auto mb-3 text-primary">
                  <path d="M20.25 10.063a7.5 7.5 0 0 1-9.475 9.475L2.5 21.75l2.212-8.275a7.5 7.5 0 1 1 15.538-3.412Z"></path>
                </svg>
                <h3 className="font-medium mb-2">Chat with Your Data</h3>
                <p className="text-sm text-muted-foreground">Ask natural language questions and get immediate insights.</p>
              </div>
              
              <div className="text-center p-4 glass rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mx-auto mb-3 text-primary">
                  <circle cx="12" cy="12" r="10"></circle><path d="m16 8-8 8"></path><path d="m8 8 8 8"></path>
                </svg>
                <h3 className="font-medium mb-2">No Account Needed</h3>
                <p className="text-sm text-muted-foreground">Start analyzing immediately. Your data stays private.</p>
              </div>
              
              <div className="text-center p-4 glass rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mx-auto mb-3 text-primary">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path>
                </svg>
                <h3 className="font-medium mb-2">Export & Share</h3>
                <p className="text-sm text-muted-foreground">Generate reports and visualizations to share with your team.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
              <DataTable data={csvData.data} headers={csvData.headers} />
              
              <div className="mt-6 flex flex-col gap-2">
                <div className="glass p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Data Summary</h3>
                  <div className="text-sm">
                    <p><span className="text-muted-foreground">Rows:</span> {csvData.data.length}</p>
                    <p><span className="text-muted-foreground">Columns:</span> {csvData.headers.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4">Ask Questions</h2>
              <ChatInterface csvData={csvData} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="mt-auto border-t border-white/10 py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="mb-2 sm:mb-0">
              <Logo size="sm" />
            </div>
            <p>Your data stays private and secure</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

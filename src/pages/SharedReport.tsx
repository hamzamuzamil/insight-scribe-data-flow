
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { DynamicChart } from "@/utils/chartRenderer";
import { exportAsPDF } from "@/utils/exportUtils";
import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';

interface ReportData {
  id: string;
  data: any;
  insights: string;
  chartConfig?: any;
  timestamp: string;
}

const SharedReport = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchReport = () => {
      try {
        setLoading(true);
        
        // Retrieve report from localStorage
        const storedExports = JSON.parse(localStorage.getItem('reports') || '[]');
        const foundReport = storedExports.find((r: ReportData) => r.id === id);
        
        if (foundReport) {
          setReport(foundReport);
        } else {
          setError("Report not found or has expired");
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load the report");
      } finally {
        setLoading(false);
      }
    };
    
    fetchReport();
  }, [id]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  const getIconForInsight = (text: string) => {
    if (text.toLowerCase().includes('growth') || text.toLowerCase().includes('increase')) {
      return <TrendingUp className="w-5 h-5" />;
    } else if (text.toLowerCase().includes('decrease') || text.toLowerCase().includes('decline')) {
      return <TrendingDown className="w-5 h-5" />;
    }
    return <BarChart className="w-5 h-5" />;
  };

  const formatInsights = (text: string) => {
    const sections = text.split('\n\n').filter(section => section.trim().length > 0);
    
    return sections.map((section, index) => {
      const icon = getIconForInsight(section);
      
      return (
        <div key={index} className="insight-card mb-4">
          <div className="flex items-start">
            <div className="mr-4 p-2 rounded-full bg-primary/20">
              <div className="text-xl">{icon}</div>
            </div>
            <div>
              <h4 className="font-medium mb-1">
                {section.split('.')[0]}.
              </h4>
              <p className="text-muted-foreground">
                {section.substring(section.indexOf('.') + 1).trim()}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[70vh]">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (error || !report) {
    return (
      <div className="container py-8">
        <Card className="glass border-white/10">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Oops!</h2>
            <p className="text-muted-foreground mb-6">{error || "Report not found"}</p>
            <Button onClick={() => window.location.href = "/"}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8" id="shared-report">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shared Report</h1>
        <p className="text-muted-foreground">Created: {formatDate(report.timestamp)}</p>
        <div className="mt-4 flex gap-4">
          <Button onClick={() => exportAsPDF('shared-report', 'shared-report.pdf')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            Export as PDF
          </Button>
          <Button variant="outline" onClick={() => window.navigator.clipboard.writeText(window.location.href)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            Copy Link
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formatInsights(report.insights)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            {report.chartConfig ? (
              <DynamicChart chartData={report.chartConfig} />
            ) : (
              <div className="text-center p-10 text-muted-foreground">
                No chart visualization available for this report.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SharedReport;

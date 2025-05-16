
import React from 'react';
import { Loader } from "@/components/ui/loader";
import { DynamicChart, ChartData } from "@/utils/chartRenderer";
import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface InsightsViewProps {
  insights: string;
  isLoading: boolean;
  chartConfig: ChartData | null;
  suggestedQuestions: string[];
  onQuestionClick: (question: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  insights,
  isLoading,
  chartConfig,
  suggestedQuestions,
  onQuestionClick
}) => {
  const getIconForInsight = (text: string) => {
    if (text.toLowerCase().includes('growth') || text.toLowerCase().includes('increase')) {
      return <TrendingUp className="w-5 h-5" />;
    } else if (text.toLowerCase().includes('decrease') || text.toLowerCase().includes('decline')) {
      return <TrendingDown className="w-5 h-5" />;
    }
    return <BarChart className="w-5 h-5" />;
  };

  const formatInsights = (text: string) => {
    // Split insights into sections
    const sections = text.split('\n\n').filter(section => section.trim().length > 0);
    
    return sections.map((section, index) => {
      const icon = getIconForInsight(section);
      
      return (
        <div key={index} className="insight-card">
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

  return (
    <>
      <div className="space-y-4">
        {isLoading && !insights ? (
          <div className="flex items-center justify-center p-10">
            <Loader size="lg" />
            <span className="ml-2">Generating insights...</span>
          </div>
        ) : insights ? (
          <div className="space-y-4">
            {formatInsights(insights)}
            {chartConfig && (
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Data Visualization</h4>
                <DynamicChart chartData={chartConfig} />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No insights available yet. Try asking a question in the chat.
          </div>
        )}
      </div>
      
      {suggestedQuestions.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-lg font-medium mb-2">Suggested Follow-up Questions</h4>
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => onQuestionClick(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

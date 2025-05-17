
import React from 'react';
import { Loader } from "@/components/ui/loader";
import { DynamicChart, ChartData } from "@/utils/chartRenderer";
import { TrendingUp, TrendingDown, BarChart, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
      return <TrendingUp className="w-5 h-5 text-green-400" />;
    } else if (text.toLowerCase().includes('decrease') || text.toLowerCase().includes('decline')) {
      return <TrendingDown className="w-5 h-5 text-red-400" />;
    }
    return <BarChart className="w-5 h-5 text-blue-400" />;
  };

  const getStatBadge = (text: string) => {
    const percentRegex = /\+?(\d+(\.\d+)?)%/;
    const match = text.match(percentRegex);
    
    if (match) {
      const percentage = match[0];
      const isPositive = !percentage.includes('-');
      return (
        <div className={`px-2 py-0.5 rounded text-xs font-medium ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {percentage} {isPositive ? '↑' : '↓'}
        </div>
      );
    }
    
    return null;
  };

  const formatInsights = (text: string) => {
    // Split insights into sections
    const sections = text.split('\n\n').filter(section => section.trim().length > 0);
    
    return sections.map((section, index) => {
      const icon = getIconForInsight(section);
      const statBadge = getStatBadge(section);
      const title = section.split('.')[0] + '.';
      const description = section.substring(section.indexOf('.') + 1).trim();
      
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="insight-card glass hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start">
            <div className="mr-4 p-2 rounded-full bg-primary/20">
              <div className="text-xl">{icon}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{title}</h4>
                {statBadge}
              </div>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <>
      <div className="space-y-4">
        {isLoading && !insights ? (
          <div className="flex items-center justify-center p-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader size="lg" />
            </motion.div>
            <span className="ml-2">Generating insights...</span>
          </div>
        ) : insights ? (
          <div className="space-y-4">
            {formatInsights(insights)}
            {chartConfig && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-lg font-medium mb-4">Data Visualization</h4>
                <div className="glass p-4 rounded-xl">
                  <DynamicChart chartData={chartConfig} />
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-10 glass rounded-xl">
            <Info className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50" />
            <p>No insights available yet. Try asking a question in the chat.</p>
          </div>
        )}
      </div>
      
      {suggestedQuestions.length > 0 && (
        <motion.div
          className="space-y-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h4 className="text-lg font-medium mb-2">Suggested Follow-up Questions</h4>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="text-left bg-secondary/50 backdrop-blur-sm border-white/10 hover:bg-primary/20 hover:text-primary-foreground transition-colors"
                  onClick={() => onQuestionClick(question)}
                >
                  {question}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

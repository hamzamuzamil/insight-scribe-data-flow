import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeDataWithGPT, processUserQuestion, parseAIResponse, AnalysisResult } from "@/utils/openaiService";
import { tryParseChartData, ChartData, isValidChartData } from "@/utils/chartRenderer";

// Import the refactored components
import { MessageList } from '@/components/chat/MessageList';
import { ChatInput } from '@/components/chat/ChatInput';
import { InsightsView } from '@/components/insights/InsightsView';
import { ExportOptions } from '@/components/export/ExportOptions';
import { Message, ChatInterfaceProps } from '@/components/chat/types';

export const ChatInterface = ({ csvData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [insights, setInsights] = useState<string>('');
  const [initialAnalysisDone, setInitialAnalysisDone] = useState(false);
  const [chartConfig, setChartConfig] = useState<ChartData | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (csvData && Object.keys(csvData).length > 0 && !initialAnalysisDone) {
      // Generate welcome message and suggestions when data is loaded
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: "I've analyzed your data. What would you like to know?",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
      
      // Generate suggestions based on the data
      generateSuggestions();
      
      // Perform initial analysis
      performInitialAnalysis();
      
      setInitialAnalysisDone(true);
    }
  }, [csvData, initialAnalysisDone]);

  const generateSuggestions = () => {
    if (!csvData || !csvData.headers) return;
    
    const headers = csvData.headers;
    const suggestionsArray = [
      `Summarize the key trends in this data`,
      `Show me a chart of ${headers[0]} over time`,
      `What insights can you provide about ${headers[headers.length > 1 ? 1 : 0]}?`
    ];
    
    setSuggestions(suggestionsArray);
  };

  const performInitialAnalysis = async () => {
    setIsLoading(true);
    try {
      const analysisResult = await analyzeDataWithGPT(csvData.data);
      
      // Try to parse the structured response
      const parsedResponse = parseAIResponse(analysisResult);
      
      if (parsedResponse) {
        // If we have a structured response, use it
        setInsights(parsedResponse.summary);
        setChartConfig(parsedResponse.chart);
        setSuggestedQuestions(parsedResponse.suggestedQuestions);
        
        // Add suggested questions to the suggestions
        if (parsedResponse.suggestedQuestions && parsedResponse.suggestedQuestions.length > 0) {
          setSuggestions(prev => [...prev, ...parsedResponse.suggestedQuestions]);
        }
      } else {
        // Otherwise just use the raw text
        setInsights(analysisResult);
        
        // Try to extract chart data
        const chart = tryParseChartData(analysisResult);
        if (chart) {
          setChartConfig(chart);
        }
      }
    } catch (error) {
      console.error("Error in initial analysis:", error);
      toast.error("Failed to analyze data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (inputValue: string) => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await processUserQuestion(userMessage.content, csvData.data);
      
      // Try to parse structured response
      const parsedResponse = parseAIResponse(response);
      let aiResponseContent = response;
      let chartData = null;
      
      if (parsedResponse) {
        // If structured response, update insights
        if (parsedResponse.summary) {
          setInsights(prev => `${prev}\n\n${parsedResponse.summary}`);
          aiResponseContent = parsedResponse.summary;
        }
        
        // Update chart config if available
        if (parsedResponse.chart && isValidChartData(parsedResponse.chart)) {
          chartData = parsedResponse.chart;
          setChartConfig(parsedResponse.chart);
        }
        
        // Update suggested questions
        if (parsedResponse.suggestedQuestions) {
          setSuggestedQuestions(parsedResponse.suggestedQuestions);
        }
      } else {
        // Try to extract chart data from unstructured response
        chartData = tryParseChartData(response);
        
        if (chartData) {
          aiResponseContent = response.replace(/{[\s\S]*}/, "Chart has been generated based on your request.");
          setChartConfig(chartData);
        }
        
        // Update insights with new information
        setInsights(prev => `${prev}\n\n${aiResponseContent}`);
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponseContent,
        sender: 'ai',
        timestamp: new Date(),
        chartData: chartData
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("We couldn't process that request. Please retry with different input.");
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I couldn't process that request. Please try rephrasing your question.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <Card className="flex-1 glass border-white/10 overflow-hidden flex flex-col">
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <MessageList 
                messages={messages} 
                isLoading={isLoading} 
              />
            </CardContent>

            <CardFooter className="border-t border-white/10 p-4">
              <ChatInput 
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
                showSuggestions={messages.length <= 3}
              />
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="insights" id="report-content">
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Key Insights</h3>
              <InsightsView 
                insights={insights}
                isLoading={isLoading}
                chartConfig={chartConfig}
                suggestedQuestions={suggestedQuestions}
                onQuestionClick={handleSuggestionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <ExportOptions 
                csvData={csvData}
                insights={insights}
                chartConfig={chartConfig}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

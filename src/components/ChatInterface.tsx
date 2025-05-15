import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { analyzeDataWithGPT, processUserQuestion, parseAIResponse } from "@/utils/openaiService";
import { DynamicChart, tryParseChartData, ChartData } from "@/utils/chartRenderer";
import { exportAsPDF, generateShareableLink, exportToNotion, exportAsZIP } from "@/utils/exportUtils";
import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  chartData?: ChartData | null;
}

interface ChatInterfaceProps {
  csvData: any;
}

export const ChatInterface = ({ csvData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [insights, setInsights] = useState<string>('');
  const [initialAnalysisDone, setInitialAnalysisDone] = useState(false);
  const [chartConfig, setChartConfig] = useState<ChartData | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reportContentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
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
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleExportPDF = () => {
    exportAsPDF('report-content', 'data-analysis-report.pdf');
  };

  const handleShareLink = async () => {
    await generateShareableLink(csvData, insights, chartConfig);
  };

  const handleExportZIP = () => {
    exportAsZIP(csvData, insights, 'data-insights.zip');
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
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'glass'
                      } animate-slide-in`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.chartData && <DynamicChart chartData={message.chartData} />}
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="glass rounded-lg px-4 py-2 flex items-center space-x-2 animate-slide-in">
                      <Loader size="sm" />
                      <span>Analyzing data...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="border-t border-white/10 p-4">
              <div className="flex flex-col w-full space-y-4">
                {suggestions.length > 0 && messages.length <= 3 && (
                  <div className="flex flex-wrap gap-2">
                    {suggestions.slice(0, 3).map((suggestion, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="truncate max-w-full"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask a question about your data..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}>
                    Send
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="insights" id="report-content">
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Key Insights</h3>
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
            </CardContent>
          </Card>
          
          {suggestedQuestions.length > 0 && (
            <Card className="glass border-white/10 mt-4">
              <CardHeader>
                <CardTitle>Suggested Follow-up Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => handleSuggestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="export">
          <Card className="glass border-white/10">
            <CardContent className="p-6" ref={reportContentRef}>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

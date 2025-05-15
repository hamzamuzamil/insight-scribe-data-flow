
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  csvData: any;
}

export const ChatInterface = ({ csvData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (csvData && Object.keys(csvData).length > 0) {
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
    }
  }, [csvData]);

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
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call the OpenAI API
      // For this demo, we'll simulate a response after a delay
      setTimeout(() => {
        generateAIResponse(userMessage.content);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to process your request');
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    
    setTimeout(() => {
      generateAIResponse(suggestion);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string) => {
    let responseContent = "I'm analyzing your data...";
    
    if (query.toLowerCase().includes('trend') || query.toLowerCase().includes('summarize')) {
      responseContent = "Based on your data, I can see several key trends:\n\n" +
        "1. There's been a 14% growth in overall metrics\n" +
        "2. The peak activity occurs mid-month\n" +
        "3. There's a positive correlation between categories A and B\n\n" +
        "Would you like me to visualize any of these trends?";
    } else if (query.toLowerCase().includes('chart') || query.toLowerCase().includes('show')) {
      responseContent = "Here's the chart you requested. You can see the key patterns highlighted in blue. The trend line indicates consistent growth over the period:\n\n" +
        "[Chart visualization would appear here in the actual implementation]";
    } else if (query.toLowerCase().includes('insight') || query.toLowerCase().includes('analyze')) {
      responseContent = "Here are some insights about your data:\n\n" +
        "• The data shows seasonal patterns with peaks in Q4\n" +
        "• There are 3 outliers that significantly impact the average\n" +
        "• Your growth rate is 23% higher than the typical benchmark\n" +
        "• There appears to be a correlation between metrics X and Y";
    } else {
      responseContent = "I've analyzed your question about '" + query + "'. Based on the data provided, I can see patterns that indicate varying performance across different dimensions. Would you like me to generate a specific visualization or provide deeper analysis on any particular aspect?";
    }
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: responseContent,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, aiMessage]);
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
                {suggestions.length > 0 && messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
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

        <TabsContent value="insights">
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="insight-card">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 rounded-full bg-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 2v8"></path><path d="m16 6-4 4-4-4"></path><path d="M3 10h18"></path><path d="M10 16H3"></path><path d="M21 16h-7"></path><path d="M16 22H8"></path><path d="M12 18v4"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Growth Trend Analysis</h4>
                      <p className="text-muted-foreground">
                        Your data shows a consistent growth pattern with seasonal fluctuations.
                        Q4 performance exceeded expectations by 23%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="insight-card">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 rounded-full bg-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M3 3v18h18"></path><path d="M18 12H8l4-6z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Performance Outliers</h4>
                      <p className="text-muted-foreground">
                        Three significant outliers were identified that impact overall averages.
                        Removing these improves predictive accuracy by 17%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="insight-card">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 rounded-full bg-primary/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m22 22-2-2M2 22l2-2M2 2l2 2m16-2-2 2"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Correlation Insights</h4>
                      <p className="text-muted-foreground">
                        Strong correlation (0.87) detected between categories A and B,
                        suggesting opportunities for cross-optimization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Export Options</h3>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line>
                    </svg>
                    Export as PDF
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Generate Share Link
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line>
                    </svg>
                    Export to Notion
                  </Button>
                  <Button variant="outline" className="justify-start">
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

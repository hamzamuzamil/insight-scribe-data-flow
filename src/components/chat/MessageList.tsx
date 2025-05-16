
import React, { useRef, useEffect } from 'react';
import { Loader } from "@/components/ui/loader";
import { DynamicChart } from "@/utils/chartRenderer";
import { ChartData } from "@/utils/chartRenderer";
import { Message } from "./types";
import { Button } from "@/components/ui/button";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestedQuestionClick?: (question: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isLoading, 
  onSuggestedQuestionClick 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
            {message.suggestedQuestions && message.suggestedQuestions.length > 0 && onSuggestedQuestionClick && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {message.suggestedQuestions.map((question, idx) => (
                    <Button 
                      key={idx} 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSuggestedQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
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
  );
};


import React, { useRef, useEffect } from 'react';
import { Loader } from "@/components/ui/loader";
import { DynamicChart } from "@/utils/chartRenderer";
import { ChartData } from "@/utils/chartRenderer";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  chartData?: ChartData | null;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
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

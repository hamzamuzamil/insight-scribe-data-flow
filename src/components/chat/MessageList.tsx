
import React, { useRef, useEffect } from 'react';
import { Loader } from "@/components/ui/loader";
import { DynamicChart } from "@/utils/chartRenderer";
import { ChartData } from "@/utils/chartRenderer";
import { Message } from "./types";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User } from "lucide-react";

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

  const messageVariants = {
    hidden: (isUser: boolean) => ({
      opacity: 0,
      x: isUser ? 20 : -20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      }
    },
    exit: (isUser: boolean) => ({
      opacity: 0,
      x: isUser ? 20 : -20,
      transition: {
        duration: 0.3,
      }
    })
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={messageVariants}
            custom={message.sender === 'user'}
            layout
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'glass shadow-lg'
              }`}
            >
              <div className="flex items-center mb-2">
                {message.sender === 'user' ? (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-xs font-medium">You</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2" />
                    <span className="text-xs font-medium">ProReporter AI</span>
                  </div>
                )}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {message.chartData && (
                <motion.div 
                  className="mt-4 bg-background/30 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <DynamicChart chartData={message.chartData} />
                </motion.div>
              )}
              
              {message.suggestedQuestions && message.suggestedQuestions.length > 0 && onSuggestedQuestionClick && (
                <motion.div 
                  className="mt-4 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm font-medium">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.suggestedQuestions.map((question, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-background/30 backdrop-blur-sm border-white/10 hover:bg-primary/20 hover:text-primary-foreground transition-colors"
                          onClick={() => onSuggestedQuestionClick(question)}
                        >
                          {question}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div className="text-xs opacity-70 mt-2 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="glass rounded-2xl px-4 py-3 flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Loader size="sm" />
              </motion.div>
              <span>Analyzing your data...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div ref={messagesEndRef} />
    </div>
  );
};

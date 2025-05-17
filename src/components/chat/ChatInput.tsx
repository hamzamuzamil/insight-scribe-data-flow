
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  showSuggestions?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  suggestions,
  onSuggestionClick,
  showSuggestions = true
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <div className="text-sm">Try asking:</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSuggestionClick(suggestion)}
                  className="truncate max-w-full rounded-full bg-secondary/50 backdrop-blur-sm border-white/10 hover:bg-primary/20 hover:text-primary-foreground transition-colors"
                >
                  {suggestion}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex space-x-2">
        <Input
          placeholder="Ask a question about your data..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          disabled={isLoading}
          className="flex-1 glass border-white/20 focus-visible:ring-primary/50"
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            className={`${isLoading ? 'opacity-70' : 'shadow-glow-primary'}`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Send
          </Button>
        </motion.div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      {showSuggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm" 
              onClick={() => onSuggestionClick(suggestion)}
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
  );
};

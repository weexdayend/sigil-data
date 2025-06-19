import { Bot, User, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
};

type ChatMessageProps = {
  message: Message;
  onSuggestionClick?: (suggestion: string) => void;
};

export function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isUser = message.role === 'user';
  const IconComponent = isUser ? User : Bot;

  return (
    <div className={`flex items-start space-x-3 group ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary">
          <IconComponent size={20} />
        </span>
      )}
      <div className={`relative p-3 rounded-lg shadow max-w-[70%] ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-secondary text-secondary-foreground rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {message.suggestions && onSuggestionClick && (
          <div className="mt-3 space-y-2">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start bg-background/50 hover:bg-background"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy} aria-label="Copy message">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </Button>
        </div>
      </div>
      {isUser && (
        <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent/20 text-accent">
          <IconComponent size={20} />
        </span>
      )}
    </div>
  );
}

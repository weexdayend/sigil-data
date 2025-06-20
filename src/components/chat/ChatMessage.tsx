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
    toast({ title: "Copied to clipboard!", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isUser = message.role === 'user';
  const IconComponent = isUser ? User : Bot;

  return (
    <div className={`flex items-start space-x-3.5 group ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-secondary-foreground shadow-sm">
          <IconComponent size={22} />
        </span>
      )}
      <div className={`relative p-3.5 rounded-2xl shadow-md max-w-[75%] sm:max-w-[70%] ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-lg'
            : 'bg-card text-card-foreground rounded-bl-lg border border-border' // Added border for assistant
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        {message.suggestions && onSuggestionClick && (
          <div className="mt-3.5 space-x-2 space-y-2 flex flex-wrap"> {/* Flex wrap for suggestions */}
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left justify-start bg-background hover:bg-primary/10 text-primary border-primary/30 hover:border-primary/70 text-xs rounded-full px-3.5 py-1.5 shadow-sm transition-all hover:shadow-md"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        <div className={`absolute top-1.5 ${isUser ? 'left-1.5' : 'right-1.5'} opacity-0 group-hover:opacity-100 transition-opacity`}>
           <Button 
            variant="ghost" 
            size="icon" 
            className={`h-7 w-7 ${isUser ? 'text-primary-foreground/70 hover:text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`} 
            onClick={handleCopy} 
            aria-label="Copy message"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </Button>
        </div>
      </div>
      {isUser && (
        <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent text-accent-foreground shadow-sm">
          <IconComponent size={20} />
        </span>
      )}
    </div>
  );
}

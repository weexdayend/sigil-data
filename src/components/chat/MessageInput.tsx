import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, CornerDownLeft, Loader2 } from 'lucide-react';

type MessageInputProps = {
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  isLoading: boolean;
};

export function MessageInput({ input, setInput, onSend, isLoading }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [input]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background">
      <div className="relative flex items-end space-x-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message or ask anything..."
          className="flex-grow resize-none p-3 pr-20 rounded-lg shadow-sm focus-visible:ring-primary min-h-[48px] max-h-[150px] overflow-y-auto"
          rows={1}
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <div className="absolute right-3 bottom-2.5 flex items-center space-x-1">
          <Button
            type="submit"
            size="icon"
            onClick={onSend}
            disabled={isLoading || input.trim() === ''}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-9 h-9"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            <CornerDownLeft size={14} className="inline mr-1" /> Enter to send
          </span>
        </div>
      </div>
    </div>
  );
}

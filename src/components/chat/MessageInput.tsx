import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

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
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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
    <div className="p-4 border-t border-border/30 bg-card">
      <div className="relative flex items-end rounded-xl border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-150 bg-background overflow-hidden">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow resize-none p-3 pl-4 pr-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[48px] max-h-[150px] overflow-y-auto bg-transparent"
          rows={1}
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <div className="absolute right-2 bottom-2 flex items-center">
          <Button
            type="submit"
            size="icon"
            onClick={onSend}
            disabled={isLoading || input.trim() === ''}
            className="w-8 h-8 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg disabled:opacity-50"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

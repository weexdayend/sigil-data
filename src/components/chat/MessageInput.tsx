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

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [input]);

  // Handle sending message on Enter key press
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="p-4 border-t border-border bg-card">
      <div className="relative flex items-center rounded-xl bg-background shadow-sm overflow-hidden">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message or ask anything..."
          className="flex-grow resize-none p-3 pl-4 pr-16 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[48px] max-h-[150px] overflow-y-auto bg-transparent"
          rows={1}
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {/* Display "Enter to send" hint */}
          {!isLoading && (
            <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
              <CornerDownLeft size={14} /> Enter to send
            </span>
          )}
          <Button
            type="submit"
            size="icon"
            onClick={onSend}
            disabled={isLoading || input.trim() === ''}
            className="w-9 h-9 shrink-0 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

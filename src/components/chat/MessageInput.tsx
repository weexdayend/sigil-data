import { useRef, useEffect, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal, Loader2, CornerDownLeft } from 'lucide-react'; // Changed Send to SendHorizonal

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
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 150; // Corresponds to max-h-[150px]
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      if (scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = 'auto';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [input]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading && input.trim() !== '') {
        onSend();
      }
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-border/50 bg-card sticky bottom-0">
      <div className="relative flex items-end rounded-xl border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-150 bg-background shadow-sm">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="flex-grow resize-none p-3 pl-4 pr-20 sm:pr-24 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[52px] max-h-[150px] bg-transparent text-sm"
          rows={1}
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <div className="absolute right-2 bottom-2 flex items-center space-x-2">
          {/* <span className="text-xs text-muted-foreground hidden sm:block">
            <CornerDownLeft size={14} className="inline mr-1" /> Enter to send
          </span> */}
          <Button
            type="submit"
            size="icon"
            onClick={onSend}
            disabled={isLoading || input.trim() === ''}
            className="w-10 h-10 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg disabled:opacity-60 disabled:bg-muted"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

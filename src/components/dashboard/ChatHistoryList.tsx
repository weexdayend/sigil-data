
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquareText, ExternalLink, ChevronRight, Hash, Clock } from 'lucide-react'; 
import { cn } from '@/lib/utils';

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  messagesCount: number;
  dataAiHint?: string;
}

interface ChatHistoryListProps {
  variant?: 'default' | 'sidebar';
  itemsToShow?: number;
}

const mockHistory: ChatHistoryItem[] = [
  { id: '1', title: 'Exploring Quantum Physics', lastMessage: 'Can you explain superposition in simpler terms for a beginner?', date: '2 days ago', messagesCount: 15, dataAiHint: "atom science" },
  { id: '2', title: 'Recipe Ideas for Dinner', lastMessage: 'What about a healthy pasta dish with lots of vegetables?', date: '5 days ago', messagesCount: 23, dataAiHint: "food cooking" },
  { id: '3',title: 'Next.js Project Brainstorm', lastMessage: 'Let\'s consider using server components for the new dashboard features.', date: '1 week ago', messagesCount: 42, dataAiHint: "code programming" },
  { id: '4', title: 'Travel Plans for Summer', lastMessage: 'Any recommendations for budget-friendly travel in Southeast Asia?', date: '2 weeks ago', messagesCount: 8, dataAiHint: "travel map" },
  { id: '5', title: 'Learning Spanish Basics', lastMessage: 'How do I say "Hello, how are you?"', date: '3 weeks ago', messagesCount: 30, dataAiHint: "language learn" },
  { id: '6', title: 'Fitness Routine Advice', lastMessage: 'What are some good exercises for beginners?', date: '1 month ago', messagesCount: 12, dataAiHint: "exercise gym" },
];

export function ChatHistoryList({ variant = 'default', itemsToShow = variant === 'sidebar' ? 5 : 3 }: ChatHistoryListProps) {
  const displayedHistory = mockHistory.slice(0, itemsToShow);

  if (displayedHistory.length === 0) {
    return (
      <div className={cn(
        "text-center py-10 sm:py-12", 
        variant === 'sidebar' ? 'px-2' : 'border-2 border-dashed border-border/70 rounded-xl bg-card/30'
      )}>
        <MessageSquareText className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
        <h3 className="mt-2 text-base font-semibold text-foreground">No Chat History Yet</h3>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-xs mx-auto">
          Start a new conversation to see your chat history here. All your discussions will be saved.
        </p>
        {variant === 'default' && (
          <Button asChild className="mt-6 font-semibold rounded-lg">
            <Link href="/chat">
              <MessageSquareText className="mr-2 h-5 w-5" /> Start New Chat
            </Link>
          </Button>
        )}
      </div>
    );
  }
  
  if (variant === 'sidebar') {
    return (
      <div className="space-y-1 overflow-y-auto flex-grow pr-1">
        {displayedHistory.map((chat) => (
          <Link 
            key={chat.id} 
            href={`/chat?history=${chat.id}`} 
            className="block p-2.5 rounded-md hover:bg-sidebar-accent transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-sidebar-foreground group-hover:text-sidebar-primary-foreground line-clamp-1 flex-grow">
                {chat.title}
              </h4>
              <ChevronRight className="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-primary-foreground/80 transition-colors flex-shrink-0" />
            </div>
            <p className="text-xs text-sidebar-foreground/70 line-clamp-1 mt-0.5">{chat.lastMessage}</p>
          </Link>
        ))}
      </div>
    );
  }

  // Default variant (for Dashboard)
  return (
    <div className="space-y-4">
      {displayedHistory.map((chat) => (
        <Link 
          key={chat.id} 
          href={`/chat?history=${chat.id}`} 
          className="block p-4 sm:p-5 rounded-xl bg-card hover:bg-secondary/70 border border-border/70 hover:border-primary/50 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex justify-between items-start gap-3">
            <div className="flex-grow overflow-hidden">
              <h4 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {chat.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {chat.lastMessage}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>
          <div className="text-xs text-muted-foreground flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <span className="flex items-center"><MessageSquareText size={14} className="mr-1.5 opacity-70"/>{chat.messagesCount} messages</span>
            <span className="flex items-center"><Clock size={14} className="mr-1.5 opacity-70"/>{chat.date}</span>
          </div>
        </Link>
      ))}
      {mockHistory.length > itemsToShow && (
        <div className="pt-2 text-center">
          <Button variant="outline" className="text-sm text-primary border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary rounded-lg">
            View All History
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

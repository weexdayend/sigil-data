
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText, ExternalLink, ChevronRight, Hash } from 'lucide-react'; 

interface ChatHistoryListProps {
  variant?: 'default' | 'sidebar';
}

const mockHistory = [
  { id: '1', title: 'Exploring Quantum Physics', lastMessage: 'Can you explain superposition in simpler terms for a beginner?', date: '2 days ago', messagesCount: 15, dataAiHint: "atom science" },
  { id: '2', title: 'Recipe Ideas for Dinner', lastMessage: 'What about a healthy pasta dish with lots of vegetables?', date: '5 days ago', messagesCount: 23, dataAiHint: "food cooking" },
  { id: '3',title: 'Next.js Project Brainstorm', lastMessage: 'Let\'s consider using server components for the new dashboard features.', date: '1 week ago', messagesCount: 42, dataAiHint: "code programming" },
  { id: '4', title: 'Travel Plans for Summer', lastMessage: 'Any recommendations for budget-friendly travel in Southeast Asia?', date: '2 weeks ago', messagesCount: 8, dataAiHint: "travel map" },
  { id: '5', title: 'Learning Spanish Basics', lastMessage: 'How do I say "Hello, how are you?"', date: '3 weeks ago', messagesCount: 30, dataAiHint: "language learn" },
  { id: '6', title: 'Fitness Routine Advice', lastMessage: 'What are some good exercises for beginners?', date: '1 month ago', messagesCount: 12, dataAiHint: "exercise gym" },
];

export function ChatHistoryList({ variant = 'default' }: ChatHistoryListProps) {
  if (mockHistory.length === 0) {
    return (
      <div className={`text-center py-12 ${variant === 'sidebar' ? 'px-2' : 'border-2 border-dashed border-border rounded-lg'}`}>
        <MessageSquareText className="mx-auto h-12 w-12 text-muted-foreground/70" /> {/* Slightly smaller for sidebar */}
        <h3 className="mt-3 text-base font-medium text-foreground">No Chat History Yet</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Start a new conversation to see your chat history here.
        </p>
        {variant === 'default' && (
          <Button asChild className="mt-4 font-semibold">
            <Link href="/chat">
              <MessageSquareText className="mr-2 h-5 w-5" /> Start New Chat
            </Link>
          </Button>
        )}
      </div>
    );
  }
  
  const itemClass = variant === 'sidebar' 
    ? "block p-2.5 rounded-lg hover:bg-sidebar-accent transition-colors group" 
    : "block p-5 group";
  
  const cardClass = variant === 'sidebar' 
    ? "" // No card for sidebar items, just hover state on the link
    : "hover:shadow-lg transition-all duration-200 border-border hover:border-primary/40";


  return (
    <div className={`space-y-2 ${variant === 'default' ? 'max-h-[500px] overflow-y-auto pr-2 -mr-2' : 'overflow-y-auto flex-grow'}`}>
      {mockHistory.map((chat) => (
        <ConditionalWrapper
          key={chat.id}
          condition={variant === 'default'}
          wrapper={children => <Card className={cardClass}>{children}</Card>}
        >
          <Link href={`/chat?history=${chat.id}`} className={itemClass}>
            <div className="flex justify-between items-start gap-2">
              <div className="flex-grow overflow-hidden">
                <CardTitle className={`text-sm font-medium group-hover:text-primary transition-colors line-clamp-1 ${variant === 'sidebar' ? 'text-sidebar-foreground group-hover:text-sidebar-primary' : 'text-lg'}`}>
                  {chat.title}
                </CardTitle>
                {variant === 'default' && (
                  <CardDescription className="text-sm mt-1 line-clamp-2">
                    {chat.lastMessage}
                  </CardDescription>
                )}
              </div>
              <ChevronRight className={`h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5 ${variant === 'sidebar' ? 'opacity-50 group-hover:opacity-100' : ''}`} />
            </div>
            {variant === 'default' && (
              <div className="text-xs text-muted-foreground flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                <span>{chat.messagesCount} messages</span>
                <span>{chat.date}</span>
              </div>
            )}
             {variant === 'sidebar' && (
              <div className="text-xs text-muted-foreground/80 flex justify-between items-center mt-1">
                <span className="line-clamp-1">{chat.lastMessage}</span>
              </div>
            )}
          </Link>
        </ConditionalWrapper>
      ))}
      {variant === 'default' && (
        <div className="pt-4 text-center">
          <Button variant="outline" className="text-primary border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary">
            View All History
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// Helper component to conditionally wrap children
const ConditionalWrapper = ({ condition, wrapper, children }: {condition: boolean, wrapper: (children: React.ReactNode) => JSX.Element, children: React.ReactNode}) => 
  condition ? wrapper(children) : <>{children}</>;


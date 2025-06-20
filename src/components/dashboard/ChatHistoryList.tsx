'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText, ExternalLink, ChevronRight } from 'lucide-react'; // Changed icon

const mockHistory = [
  { id: '1', title: 'Exploring Quantum Physics', lastMessage: 'Can you explain superposition in simpler terms for a beginner?', date: '2 days ago', messagesCount: 15, dataAiHint: "atom science" },
  { id: '2', title: 'Recipe Ideas for Dinner', lastMessage: 'What about a healthy pasta dish with lots of vegetables?', date: '5 days ago', messagesCount: 23, dataAiHint: "food cooking" },
  { id: '3',title: 'Next.js Project Brainstorm', lastMessage: 'Let\'s consider using server components for the new dashboard features.', date: '1 week ago', messagesCount: 42, dataAiHint: "code programming" },
  { id: '4', title: 'Travel Plans for Summer', lastMessage: 'Any recommendations for budget-friendly travel in Southeast Asia?', date: '2 weeks ago', messagesCount: 8, dataAiHint: "travel map" },
];

export function ChatHistoryList() {
  if (mockHistory.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
        <MessageSquareText className="mx-auto h-16 w-16 text-muted-foreground/70" />
        <h3 className="mt-4 text-lg font-medium text-foreground">No Chat History Yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Start a new conversation to see your chat history here.
        </p>
        <Button asChild className="mt-6 font-semibold">
          <Link href="/chat">
            <MessageSquareText className="mr-2 h-5 w-5" /> Start New Chat
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 -mr-2"> {/* Added scroll for long lists */}
      {mockHistory.map((chat) => (
        <Card key={chat.id} className="hover:shadow-lg transition-all duration-200 border-border hover:border-primary/40 group">
          <Link href={`/chat?history=${chat.id}`} className="block p-5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-grow">
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                  {chat.title}
                </CardTitle>
                <CardDescription className="text-sm mt-1 line-clamp-2">
                  {chat.lastMessage}
                </CardDescription>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
            <div className="text-xs text-muted-foreground flex justify-between items-center mt-3 pt-3 border-t border-border/50">
              <span>{chat.messagesCount} messages</span>
              <span>{chat.date}</span>
            </div>
          </Link>
        </Card>
      ))}
       <div className="pt-4 text-center">
        <Button variant="outline" className="text-primary border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary">
          View All History
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

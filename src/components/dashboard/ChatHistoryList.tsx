'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ExternalLink } from 'lucide-react';

const mockHistory = [
  { id: '1', title: 'Exploring Quantum Physics', lastMessage: 'Can you explain superposition...', date: '2 days ago', messagesCount: 15, dataAiHint: "atom science" },
  { id: '2', title: 'Recipe Ideas for Dinner', lastMessage: 'What about a pasta dish?', date: '5 days ago', messagesCount: 23, dataAiHint: "food cooking" },
  { id: '3', title: 'Next.js Project Brainstorm', lastMessage: 'Let\'s consider using server components.', date: '1 week ago', messagesCount: 42, dataAiHint: "code programming" },
  { id: '4', title: 'Travel Plans for Summer', lastMessage: 'Any recommendations for Italy?', date: '2 weeks ago', messagesCount: 8, dataAiHint: "travel map" },
];

export function ChatHistoryList() {
  if (mockHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-medium text-foreground">No chat history</h3>
        <p className="mt-1 text-sm text-muted-foreground">Start a new conversation to see it here.</p>
        <Button asChild className="mt-6">
          <Link href="/chat">Start New Chat</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mockHistory.map((chat) => (
        <Card key={chat.id} className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-headline hover:text-primary transition-colors">
                  <Link href={`/chat?history=${chat.id}`}>{chat.title}</Link>
                </CardTitle>
                <CardDescription>Last message: "{chat.lastMessage}"</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/chat?history=${chat.id}`} aria-label={`Open chat: ${chat.title}`}>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground flex justify-between">
            <span>{chat.messagesCount} messages</span>
            <span>{chat.date}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

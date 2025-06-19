"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import { MessageInput } from './MessageInput';
import { ChatMessage, Message } from './ChatMessage';
import { ModelSelector } from './ModelSelector';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateInitialPrompt } from '@/ai/flows/generate-initial-prompt';
import { contextAwareChat, type ContextAwareChatInput } from '@/ai/flows/context-aware-chat';
import { useToast } from '@/hooks/use-toast';
import { Bot, User, CornerDownLeft, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-pro'); // Default model
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load initial prompts if chat is empty
    if (messages.length === 0) {
      const fetchInitialPrompts = async () => {
        try {
          setIsLoading(true);
          const result = await generateInitialPrompt({});
          if (result.prompts && result.prompts.length > 0) {
            setMessages([
              {
                id: 'init-prompt-msg',
                role: 'assistant',
                content: "Hello! I'm SynapseChat. How can I help you today? Here are some things you can ask:",
                timestamp: new Date(),
                suggestions: result.prompts,
              },
            ]);
          }
        } catch (error) {
          console.error("Failed to load initial prompts:", error);
          toast({ title: "Error", description: "Could not load initial prompts.", variant: "destructive" });
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialPrompts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleSend = async (messageContent?: string) => {
    const currentInput = messageContent || input;
    if (currentInput.trim() === '' || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentInput,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build context from previous messages
      const chatContext = messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const aiInput: ContextAwareChatInput = {
        userInput: currentInput,
        context: chatContext, // Simple context from chat history
      };
      
      // Add a small delay for better UX if API responds too quickly
      // await new Promise(resolve => setTimeout(resolve, 500));

      const result = await contextAwareChat(aiInput);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error calling AI model:", error);
      toast({ title: "AI Error", description: "Failed to get response from AI.", variant: "destructive" });
       const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSend(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg shadow-xl overflow-hidden border border-border">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-semibold font-headline flex items-center">
          <Bot className="mr-2 text-primary" /> Synapse AI Chat
        </h2>
        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
      </div>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onSuggestionClick={handleSuggestionClick} />
          ))}
          {isLoading && messages.length > 0 && messages[messages.length -1].role === 'user' && (
            <div className="flex items-start space-x-3 animate-pulse">
              <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary">
                <Bot size={20} />
              </span>
              <div className="bg-secondary p-3 rounded-lg rounded-tl-none shadow max-w-[70%]">
                <div className="h-4 bg-muted-foreground/30 rounded w-24"></div>
              </div>
            </div>
          )}
        </div>
         {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Image src="https://placehold.co/300x300.png" alt="AI Chatbot" width={150} height={150} className="rounded-full mb-4 opacity-50" data-ai-hint="robot ai"/>
                <Sparkles className="h-16 w-16 mb-4 text-primary opacity-50" />
                <p className="text-lg">Start a conversation with SynapseChat</p>
                <p className="text-sm">Ask anything or try one of the suggestions.</p>
            </div>
        )}
      </ScrollArea>
      
      <MessageInput
        input={input}
        setInput={setInput}
        onSend={() => handleSend()}
        isLoading={isLoading}
      />
    </div>
  );
}

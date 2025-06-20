"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageInput } from './MessageInput';
import { ChatMessage, Message } from './ChatMessage';
import { ModelSelector } from './ModelSelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateInitialPrompt } from '@/ai/flows/generate-initial-prompt';
import { contextAwareChat, type ContextAwareChatInput } from '@/ai/flows/context-aware-chat';
import { useToast } from '@/hooks/use-toast';
import { Bot, BotMessageSquare } from 'lucide-react';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
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
  }, []);

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
      const chatContext = messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const aiInput: ContextAwareChatInput = {
        userInput: currentInput,
        context: chatContext,
      };
      
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
    <div className="flex flex-col flex-grow bg-card text-card-foreground rounded-xl shadow-lg border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/30 flex justify-between items-center">
        <h2 className="text-xl font-semibold font-headline flex items-center">
          <Bot className="mr-2 h-5 w-5 text-primary" /> Synapse AI Chat
        </h2>
        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
      </div>

      <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onSuggestionClick={handleSuggestionClick} />
          ))}
          {isLoading && messages.length > 0 && messages[messages.length -1].role === 'user' && (
            <div className="flex items-start space-x-3 animate-pulse">
              <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-muted text-muted-foreground">
                <Bot size={20} />
              </span>
              <div className="bg-secondary p-3 rounded-xl rounded-tl-none shadow max-w-[70%]">
                <div className="h-4 bg-muted-foreground/30 rounded w-24"></div>
              </div>
            </div>
          )}
        </div>
         {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4">
                <BotMessageSquare className="h-24 w-24 text-primary/60" />
                <p className="text-xl font-medium">Ready to Chat?</p>
                <p className="text-sm max-w-xs">
                    Type your first message below or try one of the suggestions if available.
                </p>
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

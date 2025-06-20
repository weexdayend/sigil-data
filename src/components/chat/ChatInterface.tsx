
"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageInput } from './MessageInput';
import { ChatMessage, Message } from './ChatMessage';
import { ModelSelector } from './ModelSelector';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateInitialPrompt } from '@/ai/flows/generate-initial-prompt';
import { contextAwareChat, type ContextAwareChatInput } from '@/ai/flows/context-aware-chat';
import { useToast } from '@/hooks/use-toast';
import { Bot, BotMessageSquare, Sparkles, MessageSquarePlus } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar'; // For mobile view

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
                content: "Hello! I'm SynapseChat. How can I assist you today? Here are a few ideas:",
                timestamp: new Date(),
                suggestions: result.prompts,
              },
            ]);
          } else {
             setMessages([
              {
                id: 'init-fallback-msg',
                role: 'assistant',
                content: "Hello! I'm SynapseChat. How can I assist you today? Feel free to ask me anything!",
                timestamp: new Date(),
              },
            ]);
          }
        } catch (error) {
          console.error("Failed to load initial prompts:", error);
          toast({ title: "Initialization Error", description: "Could not load initial prompt suggestions.", variant: "destructive" });
           setMessages([
            {
              id: 'init-error-msg',
              role: 'assistant',
              content: "Hello! I'm SynapseChat. I had a little trouble fetching suggestions, but I'm ready to chat!",
              timestamp: new Date(),
            },
          ]);
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
        .slice(-5) 
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n');

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
      toast({ title: "AI Communication Error", description: "Failed to get a response from the AI. Please check your connection or try again later.", variant: "destructive" });
       const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden h-full w-full"> {/* Removed card-like styling */}
      <div className="p-3 sm:p-4 border-b border-border/50 flex justify-between items-center bg-background sticky top-0 z-10">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2 md:hidden" /> {/* Mobile sidebar toggle */}
          <h2 className="text-xl font-semibold flex items-center">
            <Bot className="mr-2.5 h-6 w-6 text-primary hidden sm:flex" /> Synapse AI Chat
          </h2>
        </div>
        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
      </div>

      <ScrollArea className="flex-grow p-4 sm:p-6" ref={scrollAreaRef}>
        <div className="space-y-6 pb-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onSuggestionClick={handleSuggestionClick} />
          ))}
          {isLoading && messages.length > 0 && messages[messages.length -1].role === 'user' && (
            <div className="flex items-start space-x-3.5 animate-pulse group">
              <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-secondary-foreground"> {/* Adjusted assistant icon bg */}
                <Bot size={22} />
              </span>
              <div className="bg-muted p-3.5 rounded-xl rounded-tl-none shadow-sm max-w-[70%]"> {/* Changed bg to muted */}
                <div className="h-4 bg-muted-foreground/30 rounded w-24"></div>
              </div>
            </div>
          )}
        </div>
         {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-5 pt-10">
                <MessageSquarePlus className="h-28 w-28 text-primary/40" strokeWidth={1} />
                <p className="text-2xl font-semibold text-foreground">Start a new conversation</p>
                <p className="text-base max-w-sm">
                    Ask me anything, or try one of the suggestions if available. Your chat journey begins here!
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

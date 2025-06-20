import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="flex flex-col flex-grow h-[calc(100vh-12rem)] overflow-hidden"> {/* Ensures ChatInterface can grow */}
      <ChatInterface />
    </div>
  );
}

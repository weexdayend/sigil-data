import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] sm:h-[calc(100vh-12rem)]"> {/* Adjust height based on header/footer */}
      <ChatInterface />
    </div>
  );
}

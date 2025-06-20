import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    // Ensure this div allows ChatInterface to take full height within the main layout's padding
    <div className="flex flex-col flex-grow h-[calc(100vh-var(--header-height,6rem)-var(--footer-height,4rem)-4rem)] md:h-[calc(100vh-var(--header-height,6rem)-var(--footer-height,4rem)-6rem)]">
      <ChatInterface />
    </div>
  );
}

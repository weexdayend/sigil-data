
import { ChatHistoryList } from '@/components/dashboard/ChatHistoryList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { History as HistoryIcon } from 'lucide-react'; // Renamed to avoid conflict

export default function ChatHistoryPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center">
          <HistoryIcon className="mr-3 h-8 w-8 text-primary" /> Chat History
        </h1>
        <p className="mt-1.5 text-muted-foreground text-base">
          Review and manage all your past conversations with the AI.
        </p>
      </div>

      <Card className="w-full shadow-xl border-border bg-card/80 backdrop-blur-sm animate-slide-up-fade" style={{animationDelay: '0.1s'}}>
        <CardHeader className="pt-6 pb-4 border-b border-border/70">
          <CardTitle className="text-xl sm:text-2xl">All Conversations</CardTitle>
          <CardDescription>Browse through your complete chat log.</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-6">
          {/* Using default variant for full page display, itemsToShow can be higher or handled by pagination later */}
          <ChatHistoryList variant="default" itemsToShow={10} />
        </CardContent>
      </Card>
    </div>
  );
}

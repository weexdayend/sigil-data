
import { UserSettings } from '@/components/dashboard/UserSettings';
import { ChatHistoryList } from '@/components/dashboard/ChatHistoryList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, MessageSquareText, Settings2, Activity, Zap, BarChart3, Users, Briefcase } from 'lucide-react'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const stats = [
    { title: "Total Chats", value: "27", icon: <MessageSquareText className="h-6 w-6 text-primary" />, dataAiHint: "chat bubbles analytics", trend: "+5 this week" },
    { title: "Active Models", value: "Gemini Pro", icon: <Zap className="h-6 w-6 text-primary" />, dataAiHint: "ai brain processing", trend: "Default" },
    { title: "API Calls (Today)", value: "1,204", icon: <BarChart3 className="h-6 w-6 text-primary" />, dataAiHint: "graph chart api", trend: "+15% vs yesterday" },
    { title: "Team Members", value: "1 (You)", icon: <Users className="h-6 w-6 text-primary" />, dataAiHint: "team users", trend: "Starter Plan" },
  ];

  return (
    <div className="space-y-8 lg:space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome Back, SynapseUser!</h1>
          <p className="mt-1.5 text-muted-foreground text-base">Here's an overview of your AI activity and settings.</p>
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg group whitespace-nowrap">
          <Link href="/chat">
            <MessageSquareText className="mr-2 h-5 w-5" /> New Chat
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 border-border hover:border-primary/40 bg-card animate-slide-up-fade"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="pb-5">
              <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-slide-up-fade" style={{ animationDelay: '0.5s' }}>
          <Card className="shadow-xl h-full border-border bg-card/80 backdrop-blur-sm">
            <CardHeader className="pt-6 pb-4 border-b border-border/70">
              <CardTitle className="text-xl sm:text-2xl">Recent Chat History</CardTitle>
              <CardDescription>Review and continue your past conversations.</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 py-6">
              <ChatHistoryList />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
          <Card className="shadow-xl h-full border-border bg-card/80 backdrop-blur-sm">
            <CardHeader className="pt-6 pb-4 border-b border-border/70">
              <CardTitle className="text-xl sm:text-2xl flex items-center">
                <Settings2 className="mr-2.5 h-6 w-6 text-muted-foreground" /> Account Settings
              </CardTitle>
              <CardDescription>Manage your preferences and account details.</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 py-6">
              <UserSettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


import { ChatHistoryList } from '@/components/dashboard/ChatHistoryList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { MessageSquareText, Settings2, LayoutGrid, Zap, BarChart3, Users, PlusCircle, ArrowRight, History, Settings, Lightbulb } from 'lucide-react';
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
          <p className="mt-1.5 text-muted-foreground text-base">Here's your AI activity overview and quick actions.</p>
        </div>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg group">
            <Link href="/chat">
              <PlusCircle className="mr-2 h-5 w-5" /> Start New Chat
            </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 border-border hover:border-primary/40 bg-card"
            style={{ animationDelay: `${index * 0.05}s` }}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10">
        {/* Left Column (Recent Activity & Quick Links) */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pt-6 pb-4 border-b border-border/70">
              <CardTitle className="text-xl sm:text-2xl flex items-center">
                <History className="mr-2.5 h-6 w-6 text-muted-foreground" /> Recent Chat Snippets
              </CardTitle>
              <CardDescription>A quick look at your latest conversations.</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 py-6">
              {/* Using sidebar variant for a compact list on dashboard */}
              <ChatHistoryList variant="sidebar" itemsToShow={3} />
            </CardContent>
            <CardFooter className="border-t border-border/70 p-4 sm:p-6 justify-end">
              <Button variant="outline" asChild className="text-primary border-primary/50 hover:bg-primary/10 hover:border-primary rounded-lg">
                <Link href="/history">
                  View All History <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column (Quick Actions/Info) */}
        <div className="lg:col-span-1 space-y-8">
           <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pt-6 pb-4 border-b border-border/70">
              <CardTitle className="text-xl sm:text-2xl flex items-center">
                <LayoutGrid className="mr-2.5 h-6 w-6 text-muted-foreground" /> Quick Actions
              </CardTitle>
              <CardDescription>Access key areas of the application.</CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 py-6 space-y-3">
              <Button variant="outline" asChild className="w-full justify-start text-left py-6 rounded-lg group hover:border-primary/50">
                <Link href="/settings/account" className="flex items-center">
                  <Settings2 className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary" />
                  <div>
                    <span className="font-medium text-foreground">Manage Account</span>
                    <p className="text-xs text-muted-foreground">Update profile & preferences.</p>
                  </div>
                   <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
               <Button variant="outline" asChild className="w-full justify-start text-left py-6 rounded-lg group hover:border-primary/50">
                <Link href="/chat" className="flex items-center">
                  <PlusCircle className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary" />
                   <div>
                    <span className="font-medium text-foreground">Start New Chat</span>
                    <p className="text-xs text-muted-foreground">Engage with the AI assistant.</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
            <CardHeader className="pt-6 pb-4">
              <CardTitle className="text-xl sm:text-2xl flex items-center">
                <Lightbulb className="mr-2.5 h-6 w-6 text-muted-foreground" /> Did you know?
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-6">
              <p className="text-sm text-muted-foreground">
                You can switch AI models directly in the chat interface for different tasks. Experiment to find the best fit!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { UserSettings } from '@/components/dashboard/UserSettings';
import { ChatHistoryList } from '@/components/dashboard/ChatHistoryList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, MessageSquareText, Settings2, Activity, Zap } from 'lucide-react'; // Using more distinct icons

export default function DashboardPage() {
  const stats = [
    { title: "Total Chats", value: "27", icon: <MessageSquareText className="h-7 w-7 text-primary" />, dataAiHint: "chat bubbles analytics" },
    { title: "Active Models", value: "3+", icon: <Zap className="h-7 w-7 text-primary" />, dataAiHint: "ai brain processing" }, // Changed icon
    { title: "API Calls Today", value: "1,204", icon: <Activity className="h-7 w-7 text-primary" />, dataAiHint: "graph chart api" }, // New stat
    { title: "Profile Status", value: "Verified", icon: <User className="h-7 w-7 text-primary" />, dataAiHint: "user checkmark verified" },
  ];

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">User Dashboard</h1>
        {/* Placeholder for a quick action button, e.g., "New Chat" */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 border-border hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
              <CardTitle className="text-base font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="pb-5">
              <div className="text-3xl font-bold">{stat.value}</div>
              {/* Optional: <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-lg h-full border-border">
            <CardHeader className="pt-6">
              <CardTitle className="text-2xl">Chat History</CardTitle>
              <CardDescription>Review and continue your past conversations.</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <ChatHistoryList />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="shadow-lg h-full border-border">
            <CardHeader className="pt-6">
              <CardTitle className="text-2xl flex items-center">
                <Settings2 className="mr-2.5 h-6 w-6 text-muted-foreground" /> User Settings
              </CardTitle>
              <CardDescription>Manage your preferences and account details.</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <UserSettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

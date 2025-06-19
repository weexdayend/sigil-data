import { UserSettings } from '@/components/dashboard/UserSettings';
import { ChatHistoryList } from '@/components/dashboard/ChatHistoryList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, MessageSquare, Settings as SettingsIcon } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { title: "Total Chats", value: "27", icon: <MessageSquare className="h-6 w-6 text-primary" />, dataAiHint: "chat bubbles" },
    { title: "Models Available", value: "3", icon: <SettingsIcon className="h-6 w-6 text-primary" />, dataAiHint: "gears settings" },
    { title: "Profile Status", value: "Verified", icon: <User className="h-6 w-6 text-primary" />, dataAiHint: "user profile" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-headline font-bold">User Dashboard</h1>
        {/* Placeholder for a quick action button, e.g., "New Chat" */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-lg hover:shadow-primary/20 transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {/* Optional: <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>Review your past conversations.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatHistoryList />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>Manage your preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCircle, Palette, Bell } from 'lucide-react';

export function UserSettings() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    toast({
      title: "Settings Updated",
      description: "Your preferences have been successfully saved.",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <section aria-labelledby="profile-settings">
        <CardHeader className="px-0 pb-3 pt-0">
          <div className="flex items-center">
            <UserCircle className="h-6 w-6 mr-2.5 text-primary" />
            <CardTitle id="profile-settings" className="text-lg sm:text-xl">Profile Information</CardTitle>
          </div>
          <CardDescription className="pl-[34px]">Update your username and email address.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4 sm:space-y-5 border border-border/70 rounded-xl p-5 sm:p-6 bg-card/50">
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-foreground/90">Username</Label>
            <Input id="username" defaultValue="SynapseUser123" className="mt-1.5 bg-background/70 border-border/80 focus:border-primary" data-ai-hint="user avatar"/>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground/90">Email Address</Label>
            <Input id="email" type="email" defaultValue="user@synapsechat.ai" className="mt-1.5 bg-background/70 border-border/80 focus:border-primary" />
          </div>
        </CardContent>
      </section>
      
      <Separator className="my-6 sm:my-8 bg-border/50" />

      <section aria-labelledby="application-settings">
        <CardHeader className="px-0 pb-3 pt-0">
          <div className="flex items-center">
            <Palette className="h-6 w-6 mr-2.5 text-primary" />
            <CardTitle id="application-settings" className="text-lg sm:text-xl">Application Preferences</CardTitle>
          </div>
          <CardDescription className="pl-[34px]">Customize your default AI model and notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-4 sm:space-y-5 border border-border/70 rounded-xl p-5 sm:p-6 bg-card/50">
          <div>
            <Label htmlFor="default-model" className="text-sm font-medium text-foreground/90">Default AI Model</Label>
            <Select defaultValue="gemini-pro">
              <SelectTrigger id="default-model" className="mt-1.5 bg-background/70 border-border/80 focus:border-primary text-foreground">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-pro">Gemini Pro (Recommended)</SelectItem>
                <SelectItem value="gpt-4">GPT-4 (Mock)</SelectItem>
                <SelectItem value="claude-3">Claude 3 (Mock)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1.5">This model will be used by default for all new chat sessions.</p>
          </div>
        
          <div className="flex items-center justify-between rounded-lg border border-border/70 p-4 bg-background/30">
            <div>
              <Label htmlFor="notifications" className="text-sm font-medium text-foreground/90 flex items-center">
                <Bell size={16} className="mr-2 opacity-80"/> Email Notifications
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5 pl-[24px]">
                Receive important updates and summaries via email.
              </p>
            </div>
            <Switch id="notifications" defaultChecked aria-label="Toggle email notifications"/>
          </div>
        </CardContent>
      </section>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base rounded-lg mt-8 sm:mt-10"
      >
        Save Changes
      </Button>
    </form>
  );
}

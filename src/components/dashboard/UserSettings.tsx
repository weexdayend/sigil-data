'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card'; // Import Card for grouping
import { Separator } from '@/components/ui/separator';

export function UserSettings() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your preferences have been successfully updated.",
      variant: "default", // Explicitly set if not default
      duration: 3000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="border-border/70 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="username" className="text-sm font-medium">Username</Label>
            <Input id="username" defaultValue="SynapseUser123" className="mt-1.5" data-ai-hint="user avatar"/>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <Input id="email" type="email" defaultValue="user@synapsechat.ai" className="mt-1.5" />
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="border-border/70 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="default-model" className="text-sm font-medium">Default AI Model</Label>
            <Select defaultValue="gemini-pro">
              <SelectTrigger id="default-model" className="mt-1.5">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-pro">Gemini Pro (Recommended)</SelectItem>
                <SelectItem value="gpt-4">GPT-4 (Mock)</SelectItem>
                <SelectItem value="claude-3">Claude 3 (Mock)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1.5">Choose the AI model used by default for new chats.</p>
          </div>
        
          <div className="flex items-center justify-between rounded-lg border border-border/70 p-4">
            <div>
              <Label htmlFor="notifications" className="text-sm font-medium">
                Email Notifications
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Receive updates and summaries via email.
              </p>
            </div>
            <Switch id="notifications" defaultChecked aria-label="Toggle email notifications"/>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base">
        Save Changes
      </Button>
    </form>
  );
}

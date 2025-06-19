'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function UserSettings() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="SynapseUser123" data-ai-hint="user avatar"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="user@synapsechat.ai" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="default-model">Default AI Model</Label>
        <Select defaultValue="gemini-pro">
          <SelectTrigger id="default-model">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
            <SelectItem value="gpt-4">GPT-4 (Mock)</SelectItem>
            <SelectItem value="claude-3">Claude 3 (Mock)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications" className="flex flex-col space-y-1">
          <span>Email Notifications</span>
          <span className="font-normal leading-snug text-muted-foreground">
            Receive updates and summaries via email.
          </span>
        </Label>
        <Switch id="notifications" defaultChecked />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
    </form>
  );
}

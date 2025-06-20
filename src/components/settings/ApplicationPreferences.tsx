
'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bell } from 'lucide-react';

export function ApplicationPreferences() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferences Updated",
      description: "Your application preferences have been successfully saved.",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="space-y-4 sm:space-y-5">
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
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base rounded-lg mt-8 sm:mt-10"
      >
        Save Preferences
      </Button>
    </form>
  );
}

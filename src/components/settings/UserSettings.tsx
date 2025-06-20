
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// This component now focuses only on Profile Information

export function UserSettings() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully saved.",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="space-y-4 sm:space-y-5">
        <div>
          <Label htmlFor="username" className="text-sm font-medium text-foreground/90">Username</Label>
          <Input id="username" defaultValue="SynapseUser123" className="mt-1.5 bg-background/70 border-border/80 focus:border-primary" data-ai-hint="user avatar"/>
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground/90">Email Address</Label>
          <Input id="email" type="email" defaultValue="user@synapsechat.ai" className="mt-1.5 bg-background/70 border-border/80 focus:border-primary" />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base rounded-lg mt-8 sm:mt-10"
      >
        Save Profile Changes
      </Button>
    </form>
  );
}

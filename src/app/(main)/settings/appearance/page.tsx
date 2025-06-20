
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Palette, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AppearancePage() {
  return (
    <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
      <CardHeader className="pt-6 pb-4 border-b border-border/70">
        <CardTitle className="text-xl sm:text-2xl">Theme & Appearance</CardTitle>
        <CardDescription>Customize the look and feel of the application.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-6 space-y-6">
        <div>
          <Label className="text-base font-medium text-foreground/90">Theme Mode</Label>
          <p className="text-sm text-muted-foreground mb-3">Select your preferred interface theme.</p>
          <RadioGroup defaultValue="dark" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
              <Label
                htmlFor="theme-light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Sun className="mb-3 h-6 w-6" />
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
              <Label
                htmlFor="theme-dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Moon className="mb-3 h-6 w-6" />
                Dark
              </Label>
            </div>
             <div>
              <RadioGroupItem value="system" id="theme-system" className="peer sr-only" disabled />
              <Label
                htmlFor="theme-system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-not-allowed opacity-60"
              >
                <Palette className="mb-3 h-6 w-6" />
                System (Soon)
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="pt-4">
            <Button disabled>Save Appearance Settings (Coming Soon)</Button>
        </div>
      </CardContent>
    </Card>
  );
}

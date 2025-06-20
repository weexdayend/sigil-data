
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Palette, Sun, Moon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/context/ThemeProvider'; // Updated import
import { useEffect, useState } from 'react';

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  // Local state to manage radio group selection before theme context updates, ensuring UI responsiveness
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as "light" | "dark" | "system");
    setTheme(value as "light" | "dark" | "system");
  };

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
          <RadioGroup 
            value={selectedTheme} 
            onValueChange={handleThemeChange} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
              <Label
                htmlFor="theme-light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                <Sun className="mb-3 h-6 w-6" />
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
              <Label
                htmlFor="theme-dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                <Moon className="mb-3 h-6 w-6" />
                Dark
              </Label>
            </div>
             <div>
              <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
              <Label
                htmlFor="theme-system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
              >
                <Laptop className="mb-3 h-6 w-6" /> 
                System
              </Label>
            </div>
          </RadioGroup>
        </div>
        {/* The save button is removed as theme changes are applied instantly */}
        {/* 
        <div className="pt-4">
            <Button onClick={() => setTheme(selectedTheme)}>Save Appearance Settings</Button>
        </div>
        */}
      </CardContent>
    </Card>
  );
}

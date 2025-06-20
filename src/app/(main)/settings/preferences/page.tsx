
import { ApplicationPreferences } from '@/components/settings/ApplicationPreferences';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ApplicationPreferencesPage() {
  return (
    <Card className="w-full shadow-xl border-border bg-card/80 backdrop-blur-sm">
      <CardHeader className="pt-6 pb-4 border-b border-border/70">
        <CardTitle className="text-xl sm:text-2xl">Application Preferences</CardTitle>
        <CardDescription>Customize your default AI model and notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-6">
        <ApplicationPreferences />
      </CardContent>
    </Card>
  );
}

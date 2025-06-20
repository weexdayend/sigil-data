
import { UserSettings } from '@/components/settings/UserSettings'; // Updated path
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AccountSettingsPage() {
  return (
    <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
      <CardHeader className="pt-6 pb-4 border-b border-border/70">
        <CardTitle className="text-xl sm:text-2xl">Profile Information</CardTitle>
        <CardDescription>Manage your personal account details.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-6">
        <UserSettings />
      </CardContent>
    </Card>
  );
}

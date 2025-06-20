
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ApiKeysPage() {
  return (
    <Card className="shadow-xl border-border bg-card/80 backdrop-blur-sm">
      <CardHeader className="pt-6 pb-4 border-b border-border/70">
        <CardTitle className="text-xl sm:text-2xl">API Key Management</CardTitle>
        <CardDescription>Manage your API keys for external integrations (Feature Coming Soon).</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 py-10 text-center">
        <KeyRound className="mx-auto h-16 w-16 text-primary/50 mb-4" strokeWidth={1.5} />
        <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon!</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We are working hard to bring you robust API key management. This will allow you to securely integrate SynapseChat with other services.
        </p>
        <div className="bg-destructive/10 border border-destructive/30 text-destructive p-4 rounded-lg text-sm flex items-start space-x-3 max-w-md mx-auto">
          <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-left">
            <strong>Security Note:</strong> Always keep your API keys confidential and never share them publicly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


import type { ReactNode } from 'react';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { Settings as SettingsIcon } from 'lucide-react'; // Renamed to avoid conflict

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center">
           <SettingsIcon className="mr-3 h-8 w-8 text-primary" /> Application Settings
        </h1>
        <p className="mt-1.5 text-muted-foreground text-base">
          Manage your account, preferences, and application configurations.
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4 xl:w-1/5 animate-slide-up-fade" style={{animationDelay: '0.1s'}}>
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-4xl animate-slide-up-fade" style={{animationDelay: '0.2s'}}>
          {children}
        </div>
      </div>
    </div>
  );
}

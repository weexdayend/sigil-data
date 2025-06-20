
import type { ReactNode } from 'react';
import { SettingsNav } from '@/components/settings/SettingsNav';
import { Settings as SettingsIcon } from 'lucide-react'; 

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-border pb-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center">
           <SettingsIcon className="mr-3 h-8 w-8 text-primary" /> Application Settings
        </h1>
        <p className="mt-1.5 text-muted-foreground text-base">
          Manage your account, preferences, and application configurations.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:gap-10 lg:gap-12">
        <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-[260px] flex-shrink-0 animate-slide-up-fade" style={{animationDelay: '0.1s'}}>
          <SettingsNav />
        </aside>
        <div className="flex-1 min-w-0 animate-slide-up-fade" style={{animationDelay: '0.2s'}}> {/* Added min-w-0 for flex child */}
          {children}
        </div>
      </div>
    </div>
  );
}

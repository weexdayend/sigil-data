
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserCircle, Settings, KeyRound, Palette, Cog } from 'lucide-react'; // Added Cog as a generic icon

const navLinks = [
  { href: '/settings/account', label: 'Account', icon: <UserCircle className="h-5 w-5" /> },
  { href: '/settings/preferences', label: 'Preferences', icon: <Cog className="h-5 w-5" /> }, // Changed to Cog
  { href: '/settings/appearance', label: 'Appearance', icon: <Palette className="h-5 w-5" /> },
  { href: '/settings/api-keys', label: 'API Keys', icon: <KeyRound className="h-5 w-5" /> },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1" aria-label="Settings navigation">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-all duration-150 ease-in-out',
            'hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            pathname === link.href 
              ? 'bg-primary/10 text-primary font-semibold border border-primary/20 shadow-sm' 
              : 'text-muted-foreground hover:text-foreground border border-transparent'
          )}
        >
          <span className={cn("transition-colors", pathname === link.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>
            {link.icon}
          </span>
          <span className="flex-grow">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}

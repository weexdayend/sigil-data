
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserCircle, Settings, KeyRound, Palette } from 'lucide-react';

const navLinks = [
  { href: '/settings/account', label: 'Account', icon: <UserCircle className="h-5 w-5" /> },
  { href: '/settings/preferences', label: 'Preferences', icon: <Settings className="h-5 w-5" /> },
  { href: '/settings/api-keys', label: 'API Keys', icon: <KeyRound className="h-5 w-5" /> },
  { href: '/settings/appearance', label: 'Appearance', icon: <Palette className="h-5 w-5" /> },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2 text-sm text-muted-foreground" aria-label="Settings navigation">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary hover:bg-primary/10',
            pathname === link.href ? 'bg-primary/10 text-primary font-medium border border-primary/30 shadow-sm' : 'border border-transparent'
          )}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

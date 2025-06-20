
"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavLink = {
  href: string;
  label: string;
};

type AppHeaderProps = {
  variant?: 'landing' | 'app';
};

export function AppHeader({ variant = 'landing' }: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const landingLinks: NavLink[] = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
    // { href: '/contact', label: 'Contact' }, // Assuming contact page might not be ready
  ];

  const appLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/chat', label: 'Chat' },
  ];

  const links = variant === 'landing' ? landingLinks : appLinks;

  const getLinkClass = (href: string) => {
    const isHashLinkActive = href.startsWith('/#') && pathname === '/' && currentHash === href.substring(1);
    return cn(
      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
      (pathname === href && !href.startsWith('/#')) || isHashLinkActive
        ? "text-primary bg-primary/10" 
        : "text-muted-foreground"
    );
  };
  
  const getMobileLinkClass = (href: string) => {
    const isHashLinkActive = href.startsWith('/#') && pathname === '/' && currentHash === href.substring(1);
    return cn(
      "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-primary hover:bg-primary/5",
      (pathname === href && !href.startsWith('/#')) || isHashLinkActive
        ? "text-primary bg-primary/10"
        : "text-foreground"
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo iconSize={22} textSize="text-xl" />
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          {variant === 'landing' ? (
            <>
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Link href="/chat">Get Started</Link>
              </Button>
            </>
          ) : (
             <Button variant="outline" asChild className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                <Link href="/">Sign Out</Link>
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="text-muted-foreground hover:text-primary"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col space-y-1 p-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={getMobileLinkClass(link.href)} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-border/60">
             {variant === 'landing' ? (
                <div className="space-y-2">
                  <Button variant="ghost" asChild className="w-full justify-start text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
                    <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              ) : (
                 <Button variant="outline" asChild className="w-full justify-start text-base font-medium border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>Sign Out</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

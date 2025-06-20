
"use client";

import Link from 'next/link';
import { Menu, X, Bell, UserCircle, LogOut, Settings, LayoutDashboardIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from '@/components/ui/sidebar'; // For mobile main sidebar

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
    const updateHash = () => {
      if (typeof window !== 'undefined') {
        setCurrentHash(window.location.hash);
      }
    };
    updateHash(); // Initial call
    window.addEventListener('hashchange', updateHash);
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);


  const landingLinks: NavLink[] = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
  ];
  
  // App links are now in the main sidebar, so this is for mobile fallback or specific app header items
  const appMobileNavLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/chat', label: 'Chat' },
  ];


  const getLandingLinkClass = (href: string) => {
    const isHashLinkActive = href.startsWith('/#') && pathname === '/' && currentHash === href.substring(1);
    return cn(
      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
      (pathname === href && !href.startsWith('/#')) || isHashLinkActive
        ? "text-primary bg-primary/10" 
        : "text-muted-foreground"
    );
  };
  
  const getMobileLandingLinkClass = (href: string) => {
    const isHashLinkActive = href.startsWith('/#') && pathname === '/' && currentHash === href.substring(1);
    return cn(
      "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-primary hover:bg-primary/5",
      (pathname === href && !href.startsWith('/#')) || isHashLinkActive
        ? "text-primary bg-primary/10"
        : "text-foreground"
    );
  };
  
  const getMobileAppLinkClass = (href: string) => {
    return cn(
      "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-primary hover:bg-primary/5",
      pathname === href ? "text-primary bg-primary/10" : "text-foreground"
    );
  };


  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container-fluid flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-none"> {/* Max-w-none for full width header */}
        
        {variant === 'app' && (
          <div className="flex items-center">
            {/* Mobile trigger for the main sidebar, if main layout uses one */}
            <SidebarTrigger className="md:hidden mr-2" />
            <Logo iconSize={20} textSize="text-lg" />
          </div>
        )}

        {variant === 'landing' && (
           <Logo iconSize={22} textSize="text-xl" />
        )}

        {variant === 'landing' && (
          <nav className="hidden md:flex items-center space-x-1">
            {landingLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLandingLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          {variant === 'landing' ? (
            <>
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Link href="/chat">Get Started</Link>
              </Button>
            </>
          ) : ( // App variant header actions
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="text-muted-foreground hover:text-primary">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User Account" className="text-muted-foreground hover:text-primary rounded-full">
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="font-medium">SynapseUser</p>
                    <p className="text-xs text-muted-foreground">user@synapsechat.ai</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboardIcon className="mr-2 h-4 w-4" /> Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     {/* Assuming settings are part of dashboard or a dedicated page */}
                    <Link href="/dashboard#settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/"><LogOut className="mr-2 h-4 w-4" /> Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {/* Mobile Menu Toggle for Landing Page */}
          {variant === 'landing' && (
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
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer for Landing Page */}
      {variant === 'landing' && mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col space-y-1 p-4">
            {landingLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getMobileLandingLinkClass(link.href)} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-border/60">
              <div className="space-y-2">
                <Button variant="ghost" asChild className="w-full justify-start text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
                  <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
       {/* Mobile Menu Drawer for App (if main sidebar is collapsed/hidden - this is a fallback) */}
       {/* Note: For app variant, the main sidebar becomes a drawer on mobile, so this specific mobile menu might be less critical or could be removed if the SidebarTrigger handles all mobile nav needs.
           Keeping it for now as a potential fallback or for specific header actions not in the main sidebar. */}
      {variant === 'app' && mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col space-y-1 p-4">
            {appMobileNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getMobileAppLinkClass(link.href)} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
             <div className="pt-3 mt-2 border-t border-border/60">
                <DropdownMenuItem asChild>
                     {/* Assuming settings are part of dashboard or a dedicated page */}
                    <Link href="/dashboard#settings" className={getMobileAppLinkClass('/dashboard#settings')} onClick={() => setMobileMenuOpen(false)}><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/" className={getMobileAppLinkClass('/')}  onClick={() => setMobileMenuOpen(false)}><LogOut className="mr-2 h-4 w-4" /> Sign Out</Link>
                  </DropdownMenuItem>
             </div>
          </nav>
        </div>
      )}
    </header>
  );
}

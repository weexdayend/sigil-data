
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
import { SidebarTrigger } from '@/components/ui/sidebar'; 

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

    if (typeof window !== 'undefined') {
      updateHash(); // Initial call only on client
      window.addEventListener('hashchange', updateHash);
      return () => {
        window.removeEventListener('hashchange', updateHash);
      };
    }
  }, [pathname]); // Re-run if pathname changes for initial hash on new pages


  const landingLinks: NavLink[] = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
  ];
  
  const appMobileNavLinks: NavLink[] = [ // Fallback for app header on mobile if main sidebar is not used/visible
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/chat', label: 'Chat' },
    { href: '/history', label: 'History' },
    { href: '/settings/account', label: 'Settings' },
  ];


  const getLandingLinkClass = (href: string) => {
    // Only access window.location.hash if on client
    const clientHash = typeof window !== 'undefined' ? window.location.hash : '';
    const isHashLinkActive = href.startsWith('/#') && pathname === '/' && clientHash === href.substring(1);
    return cn(
      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
      (pathname === href && !href.startsWith('/#')) || isHashLinkActive
        ? "text-primary bg-primary/10" 
        : "text-muted-foreground"
    );
  };
  
  const getMobileLandingLinkClass = (href: string) => {
    const clientHash = typeof window !== 'undefined' ? window.location.hash : '';
    const isHashLinkActive = href.startsWith('/#') && pathname === '/' && clientHash === href.substring(1);
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
      pathname.startsWith(href) ? "text-primary bg-primary/10" : "text-foreground" // Use startsWith for broader matching like /settings/*
    );
  };


  return (
    <header className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        variant === 'app' ? "border-border/60" : "border-transparent" // Transparent border for landing page header
      )}>
      <div className={cn(
          "flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8", // Slightly taller header
          variant === 'app' ? "max-w-none" : "container" // Full width for app, container for landing
      )}>
        
        {variant === 'app' && (
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden text-muted-foreground hover:text-foreground" />
            {/* Logo might be in sidebar for app variant, so conditionally render or remove */}
            {/* <Logo iconSize={20} textSize="text-lg" /> */}
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
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg">
                <Link href="/chat">Get Started</Link>
              </Button>
            </>
          ) : ( 
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="text-muted-foreground hover:text-primary rounded-full w-9 h-9">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 w-9 h-9" aria-label="User Account">
                    <UserCircle className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 shadow-lg border-border bg-popover">
                  <DropdownMenuLabel>
                    <p className="font-medium text-foreground">SynapseUser</p>
                    <p className="text-xs text-muted-foreground">user@synapsechat.ai</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboardIcon className="mr-2 h-4 w-4" /> Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings/account"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/"><LogOut className="mr-2 h-4 w-4" /> Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {(variant === 'landing' || (variant === 'app' && !pathname.startsWith('/chat'))) && ( // Show mobile toggle for landing or non-chat app pages
            <div className={cn(variant === 'app' ? "hidden" : "md:hidden")}> {/* For app variant, main sidebar trigger handles mobile menu */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="text-muted-foreground hover:text-primary w-9 h-9"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md absolute w-full shadow-lg">
          <nav className="flex flex-col space-y-1 p-4">
            {(variant === 'landing' ? landingLinks : appMobileNavLinks).map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={variant === 'landing' ? getMobileLandingLinkClass(link.href) : getMobileAppLinkClass(link.href)} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-border/60">
              {variant === 'landing' ? (
                <div className="space-y-2">
                  <Button variant="outline" asChild className="w-full justify-start text-base font-medium text-foreground hover:bg-primary/5 hover:text-primary border-border hover:border-primary/50">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg">
                    <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              ) : (
                 <div className="space-y-1">
                    <DropdownMenuItem asChild>
                        <Link href="/" className={getMobileAppLinkClass('/') + " text-destructive hover:text-destructive"} onClick={() => setMobileMenuOpen(false)}><LogOut className="mr-2 h-4 w-4" /> Sign Out</Link>
                    </DropdownMenuItem>
                 </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

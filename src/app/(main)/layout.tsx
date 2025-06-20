
"use client";
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { LayoutDashboard, MessageSquareText, PlusCircle, Settings, UserCircle, History, KeyRound, Palette } from "lucide-react";
import Link from "next/link";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/chat') {
    return <div className="h-screen flex flex-col">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground w-[260px] md:w-[280px] group-data-[state=collapsed]/sidebar-wrapper:w-[var(--sidebar-width-icon)]">
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-between">
              <Logo iconSize={22} textSize="text-xl" />
              <SidebarTrigger className="hidden md:flex" />
            </div>
            <Button variant="outline" asChild className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary group-data-[state=collapsed]/sidebar-wrapper:hidden">
              <Link href="/chat">
                <PlusCircle className="mr-2 h-5 w-5" /> New Chat
              </Link>
            </Button>
             <Button variant="ghost" size="icon" asChild className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hidden group-data-[state=collapsed]/sidebar-wrapper:flex group-data-[state=collapsed]/sidebar-wrapper:justify-center">
              <Link href="/chat" aria-label="New Chat">
                <PlusCircle className="h-5 w-5" />
              </Link>
            </Button>
          </SidebarHeader>

          <SidebarContent className="p-2 pr-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/chat')} tooltip="AI Chat">
                  <Link href="/chat">
                    <MessageSquareText />
                    <span>AI Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/history')} tooltip="Chat History">
                  <Link href="/history">
                    <History />
                    <span>Chat History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/settings')} tooltip="Settings">
                  <Link href="/settings/account">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-sidebar-border">
            {/* Footer links can be more contextual or removed if settings are in main nav */}
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Account Settings">
                    <Link href="/settings/account">
                      <UserCircle />
                      <span>Account</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col bg-background">
          <AppHeader variant="app" />
          <main className="flex-grow w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-y-auto">
            {children}
          </main>
          <AppFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

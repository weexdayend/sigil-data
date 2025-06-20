
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
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/common/Logo";
import { LayoutDashboard, MessageSquareText, PlusCircle, Settings, UserCircle, History, KeyRound, Palette, Cog } from "lucide-react";
import Link from "next/link";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/chat') { // Dedicated layout for chat page
    return <div className="h-screen flex flex-col">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen storageKey="main-sidebar-state">
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] md:w-[var(--sidebar-width)] group-data-[state=collapsed]/sidebar-wrapper:w-[var(--sidebar-width-icon)]">
          <SidebarHeader className="p-3">
            <div className="flex items-center justify-between h-10"> {/* Fixed height for header items */}
              <div className="group-data-[state=expanded]/sidebar-wrapper:opacity-100 group-data-[state=collapsed]/sidebar-wrapper:opacity-0 transition-opacity duration-200">
                <Logo iconSize={22} textSize="text-xl" />
              </div>
              <SidebarTrigger className="hidden md:flex" />
            </div>
            <Button variant="default" asChild className="w-full mt-3 h-10 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 group-data-[state=collapsed]/sidebar-wrapper:hidden rounded-lg">
              <Link href="/chat">
                <PlusCircle className="mr-2 h-5 w-5" /> New Chat
              </Link>
            </Button>
             <Button variant="ghost" size="icon" asChild className="w-full mt-3 h-10 text-sidebar-primary hover:bg-sidebar-accent hidden group-data-[state=collapsed]/sidebar-wrapper:flex group-data-[state=collapsed]/sidebar-wrapper:justify-center rounded-lg">
              <Link href="/chat" aria-label="New Chat">
                <PlusCircle className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mock Quota Display */}
            <div className="mt-4 group-data-[state=expanded]/sidebar-wrapper:opacity-100 group-data-[state=collapsed]/sidebar-wrapper:opacity-0 group-data-[state=collapsed]/sidebar-wrapper:hidden transition-opacity duration-200 px-1">
              <div className="text-xs text-sidebar-foreground/70 mb-1.5 font-medium">Monthly Usage</div>
              <Progress value={60} className="h-2 bg-sidebar-accent" indicatorClassName="bg-sidebar-primary" />
              <p className="text-xs text-sidebar-foreground/70 mt-1.5">600 / 1000 Chats</p>
            </div>
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

          <SidebarFooter className="p-2 border-t border-sidebar-border">
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Account Settings" variant="ghost" className="text-sidebar-foreground/80 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
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
          <main className="flex-grow w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto"> {/* Adjusted padding */}
            {children}
          </main>
          <AppFooter />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

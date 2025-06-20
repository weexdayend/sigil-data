
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
import { LayoutDashboard, MessageSquareText, PlusCircle, Settings, UserCircle, Bell } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/chat') {
    // For the chat page, render children directly to allow full viewport control
    // This page uses its own ChatLayout with its own sidebar.
    return <div className="h-screen flex flex-col">{children}</div>;
  }

  // Standard layout for other pages (e.g., Dashboard) with a main navigation sidebar
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground w-[260px] md:w-[280px] group-data-[state=collapsed]/sidebar-wrapper:w-[var(--sidebar-width-icon)]">
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-between">
              <Logo iconSize={22} textSize="text-xl" />
              <SidebarTrigger className="hidden md:flex" /> {/* Desktop toggle */}
            </div>
            <Button variant="outline" className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary group-data-[state=collapsed]/sidebar-wrapper:hidden">
              <PlusCircle className="mr-2 h-5 w-5" /> New Chat
            </Button>
             <Button variant="ghost" size="icon" className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hidden group-data-[state=collapsed]/sidebar-wrapper:flex group-data-[state=collapsed]/sidebar-wrapper:justify-center">
              <PlusCircle className="h-5 w-5" />
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
                <SidebarMenuButton asChild isActive={pathname.startsWith('/chat')} tooltip="Chat">
                  <Link href="/chat">
                    <MessageSquareText />
                    <span>AI Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Add more main navigation items here */}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-sidebar-border">
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Account Settings">
                    <Link href="/dashboard"> {/* Assuming settings are on dashboard for now */}
                      <UserCircle />
                      <span>Account</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Application Settings">
                    <Link href="/dashboard"> {/* Assuming settings are on dashboard for now */}
                      <Settings />
                      <span>Settings</span>
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


"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger, // This is for the CHAT sidebar's mobile toggle
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatHistoryList } from "@/components/dashboard/ChatHistoryList";
import { Logo } from "@/components/common/Logo";
import { PlusCircle, Settings, UserCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To potentially hide main sidebar trigger

export function ChatLayout() {
  const pathname = usePathname();

  return (
    // ChatLayout uses its own SidebarProvider for its own chat history sidebar
    <SidebarProvider defaultOpen> 
      <Sidebar className="border-r border-border/70">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            {/* Link back to Dashboard from Chat */}
            <Button variant="ghost" size="icon" asChild className="mr-2 text-muted-foreground hover:text-primary">
              <Link href="/dashboard" aria-label="Back to Dashboard">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <Logo iconSize={20} textSize="text-lg" />
            <SidebarTrigger className="md:hidden" /> {/* Chat sidebar's mobile toggle */}
          </div>
          <Button variant="outline" className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary group-data-[state=collapsed]/sidebar-wrapper:hidden">
            <PlusCircle className="mr-2 h-5 w-5" /> New Chat
          </Button>
           <Button variant="ghost" size="icon" className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hidden group-data-[state=collapsed]/sidebar-wrapper:flex group-data-[state=collapsed]/sidebar-wrapper:justify-center">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </SidebarHeader>
        <SidebarContent className="p-2 pr-1">
          <div className="text-xs font-semibold text-muted-foreground px-2 mb-2">Recent Chats</div>
          <ChatHistoryList variant="sidebar" />
        </SidebarContent>
        <SidebarFooter className="p-3 border-t border-border/70">
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Account Settings">
                <Link href="/dashboard">
                  <UserCircle />
                  <span>Account</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild tooltip="Application Settings">
                <Link href="/dashboard"> {/* Assuming settings are on dashboard */}
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background flex flex-col h-screen overflow-hidden">
        <ChatInterface /> 
      </SidebarInset>
    </SidebarProvider>
  );
}

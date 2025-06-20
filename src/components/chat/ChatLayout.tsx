
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
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
import { PlusCircle, Settings, UserCircle } from "lucide-react";
import Link from "next/link";

export function ChatLayout() {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="border-r border-border/70">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <Logo iconSize={22} textSize="text-xl" />
            <SidebarTrigger className="md:hidden" />
          </div>
          <Button variant="outline" className="w-full mt-4 h-10 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
            <PlusCircle className="mr-2 h-5 w-5" /> New Chat
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
                <Link href="/dashboard">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background flex flex-col h-screen overflow-hidden">
        {/* The ChatInterface header will act as the header for this pane */}
        {/* The ChatInterface needs to take full available height now */}
        <ChatInterface /> 
      </SidebarInset>
    </SidebarProvider>
  );
}

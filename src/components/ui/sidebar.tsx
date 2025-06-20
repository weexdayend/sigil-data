
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger as ShadcnSheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_WIDTH = "16rem" 
const SIDEBAR_WIDTH_MOBILE = "20rem" 
const SIDEBAR_WIDTH_ICON = "3.75rem" // Increased slightly for better icon centering and padding

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  isFloating: boolean;
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
    storageKey?: string;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      storageKey = SIDEBAR_COOKIE_NAME,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)
    const [isFloating, setIsFloating] = React.useState(false);

    const getInitialOpenState = () => {
      if (typeof window === 'undefined') return defaultOpen;
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : defaultOpen;
    };
    
    const [_open, _setOpen] = React.useState(getInitialOpenState());
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, JSON.stringify(openState));
        }
      },
      [setOpenProp, open, storageKey]
    )

    React.useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue) {
          _setOpen(JSON.parse(storedValue));
        }
      }
    }, [storageKey]);

    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((current) => !current)
        : setOpen((current) => !current)
    }, [isMobile, setOpen, setOpenMobile])

    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        isFloating
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar, isFloating]
    )
    
    React.useEffect(() => {
        const checkVariant = () => {
            const sidebarEl = document.querySelector('[data-sidebar="sidebar"]');
            if (sidebarEl) {
                setIsFloating(sidebarEl.getAttribute('data-variant') === 'floating');
            }
        };
        checkVariant();
    }, []);

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={100}> {/* Slightly increased delay for tooltips */}
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement, // Changed from aside to div, as it's a generic container
  React.ComponentProps<"div"> & { // Changed from aside
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar", 
      collapsible = "icon", 
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none" && !isMobile) {
      return (
        <aside
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            variant === "sidebar" && (side === "left" ? "border-r border-sidebar-border" : "border-l border-sidebar-border"),
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </aside>
      )
    }
    
    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
           <ShadcnSheetTrigger asChild> 
            <button className="sr-only">Open sidebar</button>
          </ShadcnSheetTrigger>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width-mobile] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden border-none"
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <aside
        ref={ref}
        data-sidebar="sidebar"
        className={cn(
          "group hidden md:flex flex-col text-sidebar-foreground transition-all duration-200 ease-in-out z-20", // Faster transition
          side === "left" ? "left-0" : "right-0",
          state === "expanded" ? "w-[--sidebar-width]" : "w-[--sidebar-width-icon]",
          variant === "sidebar" && "h-screen sticky top-0 " + (side === "left" ? "border-r border-sidebar-border" : "border-l border-sidebar-border"),
          variant === "floating" && "h-[calc(100vh-2rem)] fixed top-2 m-2 rounded-lg shadow-lg border border-sidebar-border bg-sidebar", 
          variant === "inset" && "h-full relative", 
          className
        )}
        data-state={state}
        data-variant={variant}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"


const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, children, ...props }, ref) => {
  const { toggleSidebar, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <ShadcnSheetTrigger asChild>
        <Button
          ref={ref}
          data-sidebar="trigger"
          variant="ghost"
          size="icon"
          className={cn("h-9 w-9 text-sidebar-foreground/80 hover:text-sidebar-foreground", className)}
          onClick={(event) => {
            onClick?.(event);
            toggleSidebar();
          }}
          {...props}
        >
          {children || <PanelLeft size={20} />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </ShadcnSheetTrigger>
    );
  }

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9 hidden md:flex text-sidebar-foreground/80 hover:text-sidebar-foreground", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children || <PanelLeft size={20} />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";


const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "flex-1 flex flex-col min-h-0 overflow-auto",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-9 w-full bg-sidebar-accent shadow-none focus-visible:ring-1 focus-visible:ring-sidebar-ring placeholder:text-sidebar-foreground/60",
        state === "collapsed" && "hidden", 
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-3 p-3 border-b border-sidebar-border", className)} 
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-1.5 p-2 mt-auto border-t border-sidebar-border", className)} 
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn(
        "mx-2.5 my-1.5 w-auto bg-sidebar-border/70", 
        state === "collapsed" && "mx-auto w-2/3",
        className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto overflow-x-hidden p-2",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col mb-1.5", className)} 
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"
  const { state } = useSidebar();

  if (state === "collapsed") return null;

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-7 shrink-0 items-center rounded-md px-2.5 text-xs font-medium text-sidebar-foreground/70 outline-none select-none",
         className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { state } = useSidebar();
  if (state === "collapsed") return null; 

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-2 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 [&>svg]:size-3.5 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 after:md:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)} // Adjusted gap
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-left text-[0.9rem] outline-none ring-sidebar-ring transition-all duration-150 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[state=collapsed]/sidebar-wrapper:justify-center group-data-[state=collapsed]/sidebar-wrapper:!size-10 group-data-[state=collapsed]/sidebar-wrapper:!p-0 group-data-[state=collapsed]/sidebar-wrapper:rounded-lg [&>span:last-child]:truncate group-data-[state=collapsed]/sidebar-wrapper:[&>span:last-child]:hidden [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
      size: { 
        default: "h-10 text-[0.9rem]", // Adjusted height slightly
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | Omit<React.ComponentProps<typeof TooltipContent>, 'children'> & {children?: React.ReactNode}
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state: sidebarState } = useSidebar()

    const buttonElement = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    )

    if (!tooltip || isMobile || sidebarState === "expanded") { 
      return buttonElement;
    }
    
    const tooltipContent = typeof tooltip === 'string' ? tooltip : tooltip.children;
    const tooltipProps = typeof tooltip === 'object' ? tooltip : {};

    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          sideOffset={8} // Increased offset
          className="bg-sidebar text-sidebar-foreground border-sidebar-border shadow-md rounded-md px-2.5 py-1.5 text-xs"
          {...tooltipProps}
        >
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = true, ...props }, ref) => { 
  const Comp = asChild ? Slot : "button"
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1.5 top-1/2 -translate-y-1/2 flex aspect-square w-6 h-6 items-center justify-center rounded-md p-0 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-opacity hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 [&>svg]:size-3.5 [&>svg]:shrink-0",
        "after:absolute after:-inset-1 after:md:hidden",
        showOnHover && "opacity-0 group-hover/menu-item:opacity-100 focus-within:opacity-100",
        "peer-data-[active=true]/menu-button:text-sidebar-primary-foreground peer-data-[active=true]/menu-button:hover:text-sidebar-primary-foreground peer-data-[active=true]/menu-button:opacity-100",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-2 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-[0.625rem] font-semibold tabular-nums text-sidebar-primary-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-primary-foreground",
       className
    )}
    {...props}
  />
)})
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = true, ...props }, ref) => { 
  const { state } = useSidebar();
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 30) + 60}%` 
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-lg h-10 flex gap-3 px-3 items-center",
        state === "collapsed" && "justify-center !p-0 !size-10",
       className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-5 rounded-md bg-sidebar-accent/50"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      {state === "expanded" && (
        <Skeleton
          className="h-3.5 flex-1 max-w-[--skeleton-width] bg-sidebar-accent/50 rounded"
          data-sidebar="menu-skeleton-text"
          style={
            {
              "--skeleton-width": width,
            } as React.CSSProperties
          }
        />
      )}
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "ml-[calc(theme(spacing.10)_-_theme(spacing.3))] mr-2 flex min-w-0 flex-col gap-0.5 border-l border-sidebar-border/70 pl-3 py-1", // Adjusted spacing
      className
    )}
    {...props}
  />
)})
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => {
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
    <li ref={ref} className={cn("relative", className)} {...props} />
  )
})
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement, 
  React.ComponentProps<"a"> & {
    asChild?: boolean
    isActive?: boolean
  }
>(({ asChild = false, isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  const { state } = useSidebar();
  if (state === "collapsed") return null;

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-active={isActive}
      className={cn(
        "flex h-9 min-w-0 items-center gap-2.5 overflow-hidden rounded-md py-2 px-2.5 text-sm text-sidebar-foreground/80 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

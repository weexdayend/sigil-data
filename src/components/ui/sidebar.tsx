
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
import { Sheet, SheetContent, SheetTrigger as ShadcnSheetTrigger } from "@/components/ui/sheet" // Renamed SheetTrigger to avoid conflict
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem" // Default width for desktop sidebar
const SIDEBAR_WIDTH_MOBILE = "20rem" // Width for mobile drawer
const SIDEBAR_WIDTH_ICON = "3.5rem" // Width for collapsed icon-only sidebar

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
        // Optionally, re-check if layout changes dynamically, though less common for variant
    }, []);


    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
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
  HTMLDivElement,
  React.ComponentProps<"aside"> & { // Changed to aside for semantics
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none" // offcanvas for mobile-like, icon for desktop collapse
  }
>(
  (
    {
      side = "left",
      variant = "sidebar", // default, full-height sidebar
      collapsible = "icon", // default to icon collapse for desktop
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile, setOpen } = useSidebar()

    if (collapsible === "none" && !isMobile) {
      return (
        <aside // Changed to aside
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            variant === "sidebar" && (side === "left" ? "border-r" : "border-l"), // Border for default variant
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </aside>
      )
    }
    
    // Mobile view: always use Sheet (drawer)
    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
           <ShadcnSheetTrigger asChild> 
            {/* The actual trigger button will be placed in SidebarTrigger component by the user */}
            <button className="sr-only">Open sidebar</button>
          </ShadcnSheetTrigger>
          <SheetContent
            data-sidebar="sidebar" // Keep data attribute for consistency
            data-mobile="true"
            className="w-[--sidebar-width-mobile] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden" // Removed ShadCN's close button if we have our own
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    // Desktop view
    return (
      <aside // Changed to aside
        ref={ref}
        data-sidebar="sidebar"
        className={cn(
          "group hidden md:flex flex-col text-sidebar-foreground transition-all duration-300 ease-in-out z-20",
          side === "left" ? "left-0" : "right-0",
          state === "expanded" ? "w-[--sidebar-width]" : "w-[--sidebar-width-icon]",
          variant === "sidebar" && "h-screen sticky top-0 " + (side === "left" ? "border-r" : "border-l"), // Full height, sticky, border
          variant === "floating" && "h-[calc(100vh-2rem)] fixed top-2 m-2 rounded-lg shadow-lg border bg-card", // Floating style
          variant === "inset" && "h-full relative", // Inset style (managed by parent typically)
          className
        )}
        data-state={state}
        data-variant={variant} // Store variant for context if needed
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
          className={cn("h-8 w-8", className)} // Consistent size
          onClick={(event) => {
            onClick?.(event);
            toggleSidebar();
          }}
          {...props}
        >
          {children || <PanelLeft />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </ShadcnSheetTrigger>
    );
  }

  // Desktop trigger
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 hidden md:flex", className)} // Consistent size, hidden on mobile by default
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children || <PanelLeft />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";


const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
   const { state, isMobile, isFloating } = useSidebar();
  return (
    <main
      ref={ref}
      className={cn(
        "flex-1 flex flex-col min-h-0 overflow-auto", // Ensure it can grow and scroll
        // Adjust margin-left based on sidebar state for non-mobile and non-floating
        // No margin adjustment needed if sidebar is floating or on mobile (handled by sheet)
        // This logic is simplified as the sidebar itself is now sticky/fixed or a sheet.
        // The main content area just needs to be `flex-1`.
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
        state === "collapsed" && "hidden", // Hide input when collapsed for icon-only mode
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
      className={cn("flex flex-col gap-2 p-3 border-b border-sidebar-border", className)} // Adjusted padding
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
      className={cn("flex flex-col gap-1 p-2 mt-auto border-t border-sidebar-border", className)} // Adjusted padding
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
        "mx-2 my-1 w-auto bg-sidebar-border", 
        state === "collapsed" && "mx-auto w-3/4", // Center separator when collapsed
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
        "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden p-2", // Adjusted padding
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
      className={cn("relative flex w-full min-w-0 flex-col mb-1", className)} // Removed p-2, handled by content/children
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

  if (state === "collapsed") return null; // Don't render label if collapsed

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-7 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none select-none",
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
    className={cn("flex w-full min-w-0 flex-col gap-0.5", className)} // Reduced gap
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
  "peer/menu-button flex w-full items-center gap-2.5 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-all duration-150 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[state=collapsed]/sidebar-wrapper:justify-center group-data-[state=collapsed]/sidebar-wrapper:!size-9 group-data-[state=collapsed]/sidebar-wrapper:!p-0 [&>span:last-child]:truncate group-data-[state=collapsed]/sidebar-wrapper:[&>span:last-child]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        // outline: // Removed outline variant for simplicity, can be added back
        //   "bg-transparent shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: { // Simplified sizes, mostly controlled by base styles now
        default: "h-9 text-sm", // Adjusted height
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
      children, // Explicitly include children
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state: sidebarState } = useSidebar() // Renamed state to sidebarState

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

    if (!tooltip || (!isMobile && sidebarState === "expanded")) { // Show tooltip only when collapsed and not mobile
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
          sideOffset={6}
          className="bg-sidebar text-sidebar-foreground border-sidebar-border"
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
>(({ className, asChild = false, showOnHover = true, ...props }, ref) => { // showOnHover true by default
  const Comp = asChild ? Slot : "button"
  const { state } = useSidebar();
  if (state === "collapsed") return null;


  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1.5 top-1/2 -translate-y-1/2 flex aspect-square w-6 h-6 items-center justify-center rounded-md p-0 text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-opacity hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 [&>svg]:size-3.5 [&>svg]:shrink-0",
        "after:absolute after:-inset-1 after:md:hidden", // Hit area for mobile
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
>(({ className, showIcon = true, ...props }, ref) => { // showIcon true by default
  const { state } = useSidebar();
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 30) + 60}%` // Random width 60-90%
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-9 flex gap-2.5 px-2 items-center", // Adjusted to match button
        state === "collapsed" && "justify-center !p-0",
       className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md bg-sidebar-accent/50"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      {state === "expanded" && (
        <Skeleton
          className="h-3 flex-1 max-w-[--skeleton-width] bg-sidebar-accent/50"
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
      "ml-[calc(theme(spacing.9)_-_theme(spacing.2))] mr-1 flex min-w-0 flex-col gap-0.5 border-l border-sidebar-border pl-2.5 py-0.5",
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
  HTMLAnchorElement, // Typically an anchor for navigation
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
        "flex h-8 min-w-0 items-center gap-2.5 overflow-hidden rounded-md py-2 px-2 text-sm text-sidebar-foreground/80 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

// Removed SidebarRail as it's less common with modern icon-based collapse

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
  // SidebarRail, // Removed
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

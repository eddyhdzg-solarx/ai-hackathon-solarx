"use client"

import { MapProvider } from "@/client"
// import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/lib/hooks/use-sidebar"
import { ThemeProviderProps } from "next-themes/dist/types"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <MapProvider>{children}</MapProvider>
      </TooltipProvider>
    </SidebarProvider>
  )
}

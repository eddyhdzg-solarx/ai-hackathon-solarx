"use client"

import "@/app/globals.css"
import { MapProvider } from "@/client/MapProvider"

interface DemoLayoutProps {
  children: React.ReactNode
}

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <MapProvider>
      <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
        {children}
      </div>
    </MapProvider>
  )
}

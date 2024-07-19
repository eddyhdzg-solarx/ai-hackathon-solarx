import * as React from "react"

import Link from "next/link"

import { SidebarList } from "@/components/sidebar-list"
import { buttonVariants } from "@/components/ui/button"
import { IconPlus } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

interface ChatHistoryProps {
  userId?: string
}

export async function ChatHistory({ userId }: ChatHistoryProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium">Chat History</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 w-full justify-start bg-neutral-50 px-4 shadow-none transition-colors hover:bg-neutral-200/40"
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          New Chat
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-full shrink-0 animate-pulse rounded-lg bg-neutral-200"
              />
            ))}
          </div>
        }
      >
        <SidebarList userId={userId} />
      </React.Suspense>
    </div>
  )
}

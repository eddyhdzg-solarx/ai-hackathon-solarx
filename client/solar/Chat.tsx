"use client"

import { ChatList } from "./ChatList"
import { ChatPanel } from "./ChatPanel"
import { EmptyScreen } from "@/components/empty-screen"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor"
import { cn } from "@/lib/utils"
import { User } from "@clerk/nextjs/dist/types/server"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { NoraDemo } from "./NoraDemo"

export function Chat() {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState("")

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group z-10 w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className={cn("pb-4")} ref={messagesRef}>
        <div
          style={{
            paddingBottom: 16
          }}
        >
          <EmptyScreen />
        </div>
        <div
          className="h-full max-h-[768px] w-full"
          style={{
            height: 768
          }}
        >
          <NoraDemo />
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}

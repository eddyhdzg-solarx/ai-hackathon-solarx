"use client"

import { EmptyScreen } from "@/components/empty-screen"
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor"
import { cn } from "@/lib/utils"
import { ChatPanel } from "./ChatPanel"
import { useState } from "react"

export type ChatProps = React.ComponentProps<"div">

export function Chat({ className }: ChatProps) {
  const [input, setInput] = useState("")
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className={cn("pb-[200px] pt-4", className)} ref={messagesRef}>
        {false ? null : ( // <ChatList messages={messages} isShared={false} userId={userId} />
          <EmptyScreen />
        )}
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

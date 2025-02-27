"use client"

import { ChatList } from "@/components/chat-list"
import { ChatPanel } from "@/components/chat-panel"
import { EmptyScreen } from "@/components/empty-screen"
import { Message } from "@/lib/chat/actions"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor"
import { cn } from "@/lib/utils"
import { User } from "@clerk/nextjs/dist/types/server"
import { useAIState, useUIState } from "ai/rsc"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string
  initialMessages?: Message[]
  missingKeys: string[]
  userId?: User["id"] | null
}

export function Chat({ id, className, missingKeys, userId }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState("")
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage("newChatId", id)

  useEffect(() => {
    if (userId) {
      if (!path.includes("chat") && messages.length === 1) {
        window.history.replaceState({}, "", `/chat/${id}`)
      }
    }
  }, [id, path, userId, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className={cn("pb-[200px] pt-4", className)} ref={messagesRef}>
        {messages.length ? (
          <ChatList messages={messages} isShared={false} userId={userId} />
        ) : (
          <EmptyScreen />
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}

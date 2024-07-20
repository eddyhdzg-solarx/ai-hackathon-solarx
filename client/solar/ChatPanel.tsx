"use client"

import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom"
import { FooterText } from "@/components/footer"
import { PromptForm } from "./PromptForm"
import { cn } from "@/lib/utils"
import { antler, bucees } from "@/consts"
import { useState } from "react"
import { Address } from "cluster"

export interface ChatPanelProps {
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [messages, setMessages] = useState<Address[]>([])
  const exampleMessages = [antler, bucees]

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-white/90 duration-300 ease-in-out dark:from-10% peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid gap-2 px-4 sm:grid-cols-2 sm:gap-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.title}
                className={cn(
                  "cursor-pointer rounded-2xl bg-neutral-50 p-4 text-neutral-950 transition-colors hover:bg-neutral-100 sm:p-6",
                  index > 1 && "hidden md:block"
                )}
                onClick={() => {}}
              >
                <div className="font-medium">{example.title}</div>
                <div className="text-sm text-neutral-800">
                  {example.description}
                </div>
              </div>
            ))}
        </div>
        <div className="grid gap-4 sm:pb-4">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}

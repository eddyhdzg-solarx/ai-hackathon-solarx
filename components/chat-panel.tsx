import * as React from "react"

import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom"
import { ChatShareDialog } from "@/components/chat-share-dialog"
import { FooterText } from "@/components/footer"
import { PromptForm } from "@/components/prompt-form"
import { Button } from "@/components/ui/button"
import { IconShare } from "@/components/ui/icons"
import type { AI } from "@/lib/chat/actions"
import { cn } from "@/lib/utils"
import { useAIState, useActions, useUIState } from "ai/rsc"
import { nanoid } from "nanoid"
import { toast } from "sonner"
import { UserMessage } from "./stocks/message"
import { shareChat } from "@/app/actions"
import { antler, bucees } from "@/app/consts"

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

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
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.description}</UserMessage>
                    }
                  ])

                  try {
                    const responseMessage = await submitUserMessage(
                      example.description
                    )

                    setMessages(currentMessages => [
                      ...currentMessages,
                      responseMessage
                    ])
                  } catch {
                    toast(
                      <div className="text-red-600">
                        You have reached your message limit! Please try again
                        later, or{" "}
                        <a
                          className="underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://vercel.com/templates/next.js/gemini-ai-chatbot"
                        >
                          deploy your own version
                        </a>
                        .
                      </div>
                    )
                  }
                }}
              >
                <div className="font-medium">{example.title}</div>
                <div className="text-sm text-neutral-800">
                  {example.description}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-fit items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 sm:pb-4">
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}

import { UIState } from "@/lib/chat/actions"
import { User } from "@clerk/nextjs/dist/types/server"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export interface ChatList {
  messages: UIState
  userId?: User["id"] | null
  isShared: boolean
}

export function ChatList({ messages, userId, isShared }: ChatList) {
  return messages.length ? (
    <div className="relative mx-auto grid max-w-2xl auto-rows-max gap-8 px-4">
      {!isShared && !userId ? (
        <>
          <div className="group relative flex items-start md:-ml-12">
            <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border bg-background shadow-sm">
              <ExclamationTriangleIcon />
            </div>
            <div className="ml-5 flex-1 space-y-2 overflow-hidden px-1">
              <p className="leading-normal text-muted-foreground">
                Please{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  log in
                </Link>{" "}
                or{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  sign up
                </Link>{" "}
                to save and revisit your chat history!
              </p>
            </div>
          </div>
        </>
      ) : null}

      {messages.map(message => (
        <div key={message.id}>
          {message.spinner}
          {message.display}
          {message.attachments}
        </div>
      ))}
    </div>
  ) : null
}

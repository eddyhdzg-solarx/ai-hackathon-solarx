import { type Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { getChat, getMissingKeys } from "@/app/actions"

import { Chat } from "@/components/chat"
import { AI } from "@/lib/chat/actions"
import { auth } from "@clerk/nextjs/server"

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.userId) {
    return {}
  }

  const chat = await getChat(params.id, session.userId)
  return {
    title: chat?.title.toString().slice(0, 50) ?? "Chat"
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()
  const missingKeys = await getMissingKeys()

  if (!session?.userId) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const userId = session.userId
  const chat = await getChat(params.id, userId)

  if (!chat) {
    redirect("/")
  }

  if (chat?.userId !== session?.userId) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages,
        interactions: []
      }}
    >
      <Chat
        id={chat.id}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
        userId={userId}
      />
    </AI>
  )
}

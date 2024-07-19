import { Chat } from "@/components/chat"
import { AI } from "@/lib/chat/actions"
import { nanoid } from "@/lib/utils"
import { auth } from "@clerk/nextjs/server"
import { getMissingKeys } from "../actions"

export const metadata = {
  title: "SolarX AI Chatbot Demo"
}

export default async function IndexPage() {
  const id = nanoid()
  const session = await auth()
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}

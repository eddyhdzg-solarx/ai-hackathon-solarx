import { Chat } from "@/components/chat"
import { AI } from "@/lib/chat/actions"
import { nanoid } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import { getMissingKeys } from "../actions"

export const metadata = {
  title: "SolarX AI Chatbot Demo"
}

export default async function Page() {
  const id = nanoid()
  const user = await currentUser()
  const missingKeys = await getMissingKeys()

  const userId = user?.id

  return (
    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <Chat id={id} userId={userId} missingKeys={missingKeys} />
    </AI>
  )
}

import { nanoid } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import { getMissingKeys } from "../actions"
import { Chat } from "@/client"

export const metadata = {
  title: "SolarX AI Chatbot Demo"
}

export default async function Page() {
  return <Chat />
}

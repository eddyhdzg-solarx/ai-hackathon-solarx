"use server"

import { kv } from "@vercel/kv"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { type Chat } from "@/lib/types"
import { auth } from "@clerk/nextjs/server"

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const user = await auth()

  if (!user) {
    return {
      error: "Unauthorized"
    }
  }

  //Convert uid to string for consistent comparison with session.user.id
  const uid = String(await kv.hget(`chat:${id}`, "userId"))

  if (uid !== user?.userId) {
    return {
      error: "Unauthorized"
    }
  }

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${user.userId}`, `chat:${id}`)

  revalidatePath("/")
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session.userId) {
    return {
      error: "Unauthorized"
    }
  }

  const chats: string[] = await kv.zrange(`user:chat:${session.userId}`, 0, -1)
  if (!chats.length) {
    return redirect("/")
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.userId}`, chat)
  }

  await pipeline.exec()

  revalidatePath("/")
  return redirect("/")
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {
  const session = await auth()

  if (!session.userId) {
    return {
      error: "Unauthorized"
    }
  }

  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || chat.userId !== session.userId) {
    return {
      error: "Something went wrong"
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}

export async function saveChat(chat: Chat) {
  const session = await auth()

  if (session && session.userId) {
    const pipeline = kv.pipeline()
    pipeline.hmset(`chat:${chat.id}`, chat)
    pipeline.zadd(`user:chat:${chat.userId}`, {
      score: Date.now(),
      member: `chat:${chat.id}`
    })
    await pipeline.exec()
  } else {
    return
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ["GOOGLE_GENERATIVE_AI_API_KEY"]
  return keysRequired
    .map(key => (process.env[key] ? "" : key))
    .filter(key => key !== "")
}

import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { IconGitHub, IconSeparator } from "@/components/ui/icons"
import { UserMenu } from "@/components/user-menu"
import { currentUser } from "@clerk/nextjs/server"
import { ChatHistory } from "./chat-history"
import { SidebarMobile } from "./sidebar-mobile"
import { SidebarToggle } from "./sidebar-toggle"

async function UserOrLogin() {
  const user = await currentUser()

  return (
    <>
      {user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <img
            className="size-6"
            src="/images/solarx-symbol-logo.svg"
            alt="solarx logo"
          />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-neutral-200" />
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Button variant="link" asChild className="-ml-2 text-neutral-950">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button asChild size="sm" variant="ghost">
          <a
            target="_blank"
            href="https://github.com/eddyhdzg-solarx/ai-hackathon-solarx"
            rel="noopener noreferrer"
          >
            <IconGitHub />
            <span className="ml-2 hidden md:flex">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  )
}

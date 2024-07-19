import Link from 'next/link'
import * as React from 'react'

import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { IconGitHub, IconSeparator } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { Session } from '@/lib/types'
import { ChatHistory } from './chat-history'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
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
        <IconSeparator className="text-neutral-200 size-6" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2 text-neutral-950">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
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
            <span className="hidden ml-2 md:flex">GitHub</span>
          </a>
        </Button>
      </div>
    </header>
  )
}

import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { IconGitHub } from "@/components/ui/icons"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <Link href="/new" rel="nofollow">
            <img
              className="size-6"
              src="/images/solarx-symbol-logo.svg"
              alt="solarx logo"
            />
          </Link>
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

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SignOutButton } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/dist/types/server"

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(" ")
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: { user: User }) {
  const email = user.primaryEmailAddress?.emailAddress ?? ""

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              {getUserInitials(email)}
            </div>
            <span className="ml-2 hidden md:block">{email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs text-neutral-500">{email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton>
            <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Sign Out
            </button>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

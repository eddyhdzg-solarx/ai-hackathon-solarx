import React from "react"

import { ExternalLink } from "@/components/external-link"
import { cn } from "@/lib/utils"

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "px-2 text-center text-xs leading-normal text-neutral-500",
        className
      )}
      {...props}
    >
      Open source AI chatbot built with{" "}
      <ExternalLink
        href="https://cloud.google.com/vertex-ai"
        className="underline"
      >
        Google Gemini
      </ExternalLink>
      ,{" "}
      <ExternalLink
        href="https://developers.google.com/maps/documentation/solar/overview"
        className="underline"
      >
        Solar API
      </ExternalLink>
      ,{" "}
      <ExternalLink href="https://nextjs.org" className="underline">
        Next.js
      </ExternalLink>{" "}
      and{" "}
      <ExternalLink href="https://github.com/vercel/ai" className="underline">
        Vercel AI SDK
      </ExternalLink>
      .
    </p>
  )
}

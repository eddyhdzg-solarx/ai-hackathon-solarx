"use client"

import { EmptyScreen } from "@/components/empty-screen"
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor"
import { cn } from "@/lib/utils"
import { ChatPanel } from "./ChatPanel"
import { useState } from "react"
import { NoraDemo } from "./NoraDemo"
import { ControlPosition } from "@vis.gl/react-google-maps"
import { Map } from "@vis.gl/react-google-maps"
import { GoogleDemo } from "../google/GoogleDemo"
import { CustomMapControl } from "../google/MapControl"
import MapHandler from "../google/MapHandler"

export type ChatProps = React.ComponentProps<"div">

export type AutocompleteMode = { id: string; label: string }

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
  { id: "custom-hybrid", label: "Custom w/ Select Widget" }
]

export function Chat({ className }: ChatProps) {
  const [showMap, setShowMap] = useState(false)
  const [input, setInput] = useState("")
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      style={{
        height: "100%",
        width: "100%"
      }}
    >
      <div
        style={{
          height: "inherit",
          width: "inherit"
        }}
        ref={scrollRef}
      >
        <div
          className={cn("h-full py-4", className)}
          ref={messagesRef}
          style={{
            height: "inherit",
            width: "inherit"
          }}
        >
          <div
            className="mx-auto flex h-full flex-1 items-center justify-center"
            style={{
              height: "inherit",
              width: "inherit",

              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <NoraDemo />
          </div>
        </div>

        <ChatPanel
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
  )
}

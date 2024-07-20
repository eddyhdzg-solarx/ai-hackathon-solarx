"use client"

import { useEffect, useRef, useState } from "react"
import Textarea from "react-textarea-autosize"

import { Button } from "@/components/ui/button"
import { IconArrowElbow, IconPlus } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit"
import { toast } from "sonner"
import { useMapsLibrary } from "@vis.gl/react-google-maps"

export type AutocompleteMode = { id: string; label: string }

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
  { id: "custom-hybrid", label: "Custom w/ Select Widget" }
]

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const Autocomplete = useMapsLibrary("places")?.Autocomplete

  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0])

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const fileRef = useRef<HTMLInputElement>(null)

  if (!Autocomplete) {
    return null
  }

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target["message"]?.blur()
        }

        const value = input.trim()
        setInput("")
        if (!value) return
      }}
    >
      <input
        type="file"
        className="hidden"
        id="file"
        ref={fileRef}
        onChange={async event => {
          if (!event.target.files) {
            toast.error("No file selected")
            return
          }
        }}
      />

      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-neutral-100 px-12 sm:rounded-full sm:px-12">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
          disabled
          onClick={() => {
            fileRef.current?.click()
          }}
        >
          <IconPlus />
          <span className="sr-only">New Chat</span>
        </Button>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] placeholder:text-neutral-900 focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          disabled
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-4 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={input === ""}
                className="rounded-full bg-transparent text-neutral-950 shadow-none hover:bg-neutral-200"
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}

"use client"

import { CardIcon, GoogleIcon, SparklesIcon } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { readStreamableValue, useActions, useUIState } from "ai/rsc"
import { useState } from "react"

type Status =
  | "requires_confirmation"
  | "requires_code"
  | "completed"
  | "failed"
  | "expired"
  | "in_progress"

interface PurchaseProps {
  status: Status
  summary: {
    airline: string
    departureTime: string
    arrivalTime: string
    price: number
    seat: string
  }
}

export const suggestions = [
  "Show flight status",
  "Show boarding pass for flight"
]

export const PurchaseTickets = ({
  status = "requires_confirmation",
  summary = {
    airline: "American Airlines",
    departureTime: "10:00 AM",
    arrivalTime: "12:00 PM",
    price: 100,
    seat: "1A"
  }
}: PurchaseProps) => {
  const [currentStatus, setCurrentStatus] = useState(status)
  const { requestCode, validateCode, submitUserMessage } = useActions()
  const [display, setDisplay] = useState(null)
  const [_, setMessages] = useUIState()

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <div className="flex">
          <div className="flex items-center gap-2 text-neutral-950">
            <div className="flex size-6 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 [&>svg]:size-3">
              <CardIcon />
            </div>
            <div className="text-sm text-neutral-600">Visa · · · · 0512</div>
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-0.5 text-sm">
            <GoogleIcon />
            Pay
          </div>
        </div>
        {currentStatus === "requires_confirmation" ? (
          <div className="flex flex-col gap-4">
            <p className="">
              Thanks for choosing your flight and hotel reservations! Confirm
              your purchase to complete your booking.
            </p>
            <button
              className="cursor-pointer rounded-full bg-neutral-900 p-2 text-center text-neutral-50 transition-colors hover:bg-neutral-600"
              onClick={async () => {
                const { status, display } = await requestCode()
                setCurrentStatus(status)
                setDisplay(display)
              }}
            >
              Pay $981
            </button>
          </div>
        ) : currentStatus === "requires_code" ? (
          <>
            <div>
              Enter the code sent to your phone (***) *** 6137 to complete your
              purchase.
            </div>
            <div className="flex justify-center rounded-full border p-2 text-center text-neutral-950">
              <input
                className="w-16 bg-transparent text-center tabular-nums outline-none"
                type="text"
                maxLength={6}
                placeholder="------"
                autoFocus
              />
            </div>
            <button
              className="cursor-pointer rounded-full bg-neutral-900 p-2 text-center text-neutral-50 transition-colors hover:bg-neutral-600"
              onClick={async () => {
                const { status, display } = await validateCode()

                for await (const statusFromStream of readStreamableValue(
                  status
                )) {
                  setCurrentStatus(statusFromStream as Status)
                  setDisplay(display)
                }
              }}
            >
              Submit
            </button>
          </>
        ) : currentStatus === "completed" || currentStatus === "in_progress" ? (
          display
        ) : currentStatus === "expired" ? (
          <div className="flex items-center justify-center gap-3">
            Your Session has expired!
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "flex flex-col items-start gap-2 sm:flex-row",
          currentStatus === "completed" ? "opacity-100" : "opacity-0"
        )}
      >
        {suggestions.map(suggestion => (
          <button
            key={suggestion}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2 text-sm transition-colors hover:bg-neutral-100"
            onClick={async () => {
              const response = await submitUserMessage(suggestion)
              setMessages((currentMessages: any[]) => [
                ...currentMessages,
                response
              ])
            }}
          >
            <SparklesIcon />
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

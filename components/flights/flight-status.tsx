"use client"

import {
  ArrowDownRight,
  ArrowUpRight,
  IconCheck,
  SparklesIcon
} from "@/components/ui/icons"
import { useActions, useUIState } from "ai/rsc"

export interface StatusProps {
  summary: {
    departingCity: string
    departingAirport: string
    departingAirportCode: string
    departingTime: string
    arrivalCity: string
    arrivalAirport: string
    arrivalAirportCode: string
    arrivalTime: string
    flightCode: string
    date: string
  }
}

export const suggestions = [
  "Change my seat",
  "Change my flight",
  "Show boarding pass"
]

export const FlightStatus = ({
  summary = {
    departingCity: "Miami",
    departingAirport: "Miami Intl",
    departingAirportCode: "MIA",
    departingTime: "11:45 PM",
    arrivalCity: "San Francisco",
    arrivalAirport: "San Francisco Intl",
    arrivalAirportCode: "SFO",
    arrivalTime: "4:20 PM",
    flightCode: "XY 2421",
    date: "Mon, 16 Sep"
  }
}: StatusProps) => {
  const {
    departingCity,
    departingAirport,
    departingAirportCode,
    departingTime,
    arrivalCity,
    arrivalAirport,
    arrivalAirportCode,
    arrivalTime,
    flightCode,
    date
  } = summary

  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="aspect-square w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-50 sm:w-12">
            <img
              src="https://www.gstatic.com/flights/airline_logos/70px/UA.png"
              className="aspect-square object-cover"
              alt="airline logo"
            />
          </div>
          <div>
            <div className="font-medium">
              {date} · {flightCode}
            </div>
            <div className="text-sm text-neutral-600">
              {departingCity} to {arrivalCity}
            </div>
          </div>
        </div>
        <div className="relative grid items-center gap-8">
          <div className="absolute left-[1.1rem] top-1 h-full w-px bg-neutral-200 sm:left-[1.45rem]" />
          <div className="relative flex w-full items-start gap-4 pl-2 sm:pl-3.5">
            <div className="flex size-5 shrink-0 translate-y-1 items-center justify-center rounded-full bg-neutral-200 p-1 text-neutral-500 [&>svg]:size-2.5">
              <ArrowUpRight />
            </div>
            <div>
              <div className="text-2xl font-medium">{departingAirportCode}</div>
              <div>{departingAirport}</div>
              <div className="text-sm text-neutral-600">
                Terminal N · GATE D43
              </div>
            </div>
            <div className="ml-auto font-mono">
              <div className="text-lg md:text-xl">{departingTime}</div>
              <div className="text-sm text-neutral-600">in 6h 50m</div>
              <div className="text-sm font-medium text-red-600">
                2h 15m late
              </div>
            </div>
          </div>
          <div className="relative flex min-h-10 w-full items-center gap-4 pl-2 sm:pl-3.5">
            <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 p-1 text-neutral-500 [&>svg]:size-2.5">
              <IconCheck />
            </div>
            <div className="text-sm text-neutral-600 sm:text-base">
              Total 11h 30m · 5, 563mi · Overnight
            </div>
          </div>
          <div className="relative flex w-full items-start gap-4 pl-2 sm:pl-3.5">
            <div className="flex size-5 shrink-0 translate-y-1 items-center justify-center rounded-full bg-neutral-200 p-1 text-neutral-500 [&>svg]:size-2.5">
              <ArrowDownRight />
            </div>
            <div>
              <div className="text-2xl font-medium">{arrivalAirportCode}</div>
              <div>{arrivalAirport}</div>
              <div className="text-sm text-neutral-600">
                Terminal 2 · GATE 59A
              </div>
            </div>
            <div className="ml-auto font-mono">
              <div className="text-lg md:text-xl">{arrivalTime}</div>
              <div className="text-sm font-medium text-red-600">
                2h 15m late
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        {suggestions.map(suggestion => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  )
}

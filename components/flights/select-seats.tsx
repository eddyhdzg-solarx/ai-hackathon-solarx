/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useAIState, useActions, useUIState } from "ai/rsc"
import { useState } from "react"
import { SparklesIcon } from "../ui/icons"

interface SelectSeatsProps {
  summary: {
    departingCity: string
    arrivalCity: string
    flightCode: string
    date: string
  }
}

export const suggestions = [
  "Proceed to checkout",
  "List hotels and make a reservation"
]

export const SelectSeats = ({
  summary = {
    departingCity: "New York City",
    arrivalCity: "San Francisco",
    flightCode: "CA123",
    date: "23 March 2024"
  }
}: SelectSeatsProps) => {
  const availableSeats = ["3B", "2D"]
  const [aiState, setAIState] = useAIState()
  const [selectedSeat, setSelectedSeat] = useState("")
  const { departingCity, arrivalCity, flightCode, date } = summary
  const [_, setMessages] = useUIState()
  const { submitUserMessage } = useActions()

  return (
    <div className="grid gap-4">
      <p>
        Great! Here are the available seats for your flight. Please select a
        seat to continue.
      </p>
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
        <div className="w-ful relative flex justify-center rounded-xl bg-neutral-50 p-4 sm:rounded-lg sm:p-6">
          <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            {[4, 3, 2, 1].map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex flex-row gap-3">
                {["A", "B", 0, "C", "D"].map((seat, seatIndex) => (
                  <div
                    key={`seat-${seatIndex}`}
                    className={`align-center relative flex size-6 flex-row items-center justify-center rounded ${
                      seatIndex === 2
                        ? "transparent"
                        : selectedSeat === `${row}${seat}`
                          ? "cursor-pointer border-x border-b border-emerald-500 bg-emerald-300"
                          : availableSeats.includes(`${row}${seat}`)
                            ? "cursor-pointer border-x border-b border-sky-500 bg-sky-200"
                            : "cursor-not-allowed border-x border-b border-neutral-300 bg-neutral-200"
                    }`}
                    onClick={() => {
                      setSelectedSeat(`${row}${seat}`)

                      setAIState({
                        ...aiState,
                        interactions: [
                          `great, I have selected seat ${row}${seat}`
                        ]
                      })
                    }}
                  >
                    {seatIndex === 2 ? (
                      <div className="w-6 text-center text-sm tabular-nums text-neutral-500">
                        {row}
                      </div>
                    ) : (
                      <div
                        className={`absolute top-0 h-2 w-7 rounded border ${
                          selectedSeat === `${row}${seat}`
                            ? "border-emerald-500 bg-emerald-300"
                            : availableSeats.includes(`${row}${seat}`)
                              ? "border-sky-500 bg-sky-300"
                              : "border-neutral-300 bg-neutral-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div className="flex gap-3">
              {["A", "B", "", "C", "D"].map((seat, index) => (
                <div
                  key={index}
                  className="w-6 shrink-0 text-center text-sm text-neutral-500"
                >
                  {seat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedSeat !== "" && (
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2 text-sm transition-colors hover:bg-neutral-100"
              onClick={async () => {
                const response = await submitUserMessage(suggestion, [])
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
      )}
    </div>
  )
}

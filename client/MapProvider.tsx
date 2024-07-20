"use client"

import { APIProvider } from "@vis.gl/react-google-maps"
import { PropsWithChildren } from "react"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

export function MapProvider({ children }: PropsWithChildren) {
  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>
}

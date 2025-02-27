"use client"

import React, { useEffect, useRef } from "react"

import SolarPanelsMap from "@/nora"
import { useMapsLibrary } from "@vis.gl/react-google-maps"

export const NoraDemo = () => {
  const mapContainerRef = useRef(null)
  const Map = useMapsLibrary("maps")?.Map

  useEffect(() => {
    const element = mapContainerRef.current

    if (element && Map) {
      new SolarPanelsMap(process.env.NEXT_PUBLIC_GOOGLE_API_KEY, element, Map)
    }
  }, [mapContainerRef, Map])

  return (
    <div
      ref={mapContainerRef}
      id="solar-panels"
      className="solar-panels"
      style={{
        maxWidth: 768,
        maxHeight: 768
      }}
    />
  )
}

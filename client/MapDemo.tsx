"use client"

import { APIProvider, Map } from "@vis.gl/react-google-maps"

export function MapDemo() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

  const antlerLocation = {
    lat: 30.267946904577837,
    lng: -97.74325599361393
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "50vw", height: "50vh" }}
        defaultCenter={{ lat: antlerLocation.lat, lng: antlerLocation.lng }}
        defaultZoom={20}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      />
    </APIProvider>
  )
}

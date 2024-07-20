import React, { useState } from "react"

import { ControlPosition, Map } from "@vis.gl/react-google-maps"

import ControlPanel from "./ControlPanel"
import { CustomMapControl } from "./MapControl"
import MapHandler from "./MapHandler"

export type AutocompleteMode = { id: string; label: string }

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" }
]

export const GoogleDemo = () => {
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0])

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null)

  return (
    <Map
      defaultZoom={3}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  )
}

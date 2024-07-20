import React from "react"
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps"

import { PlaceAutocompleteClassic } from "./AutocompleteClassic"

import type { AutocompleteMode } from "./GoogleDemo"

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition
  selectedAutocompleteMode: AutocompleteMode
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
}

export const CustomMapControl = ({
  controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect
}: CustomAutocompleteControlProps) => {
  const { id } = selectedAutocompleteMode

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        {id === "classic" && (
          <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
        )}
      </div>
    </MapControl>
  )
}

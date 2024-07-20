"use client"

import React, { useEffect, useRef } from "react"
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps"
import { Input } from "@/components/ui/input"

const center = {
  lat: 57.623147493770105,
  lng: 11.931981013011718
}

export const NoraDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary("places")
  const Autocomplete = places?.Autocomplete

  useEffect(() => {
    if (Autocomplete && inputRef.current) {
      const autocomplete = new Autocomplete(inputRef.current, {
        fields: ["geometry"],
        types: ["address"]
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()

        if (!place.geometry?.location)
          return alert(
            "Something went wrong, can't resolve the location of this address!"
          )

        this.showInsightsForCoordinate({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        })
          .then(() => {
            this.formElement.classList.remove("active")
          })
          .catch(error => {
            console.error(error)

            if (error.message.includes("404"))
              alert("Sorry, there's no coverage available for this address!")
            else alert("Sorry, something went wrong!")
          })
      })
    }

    // do something with marker instance here
  }, [Autocomplete, inputRef.current])

  return (
    <div>
      <Map
        mapTypeId="satellite"
        tilt={0}
        styles={[
          {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]}
        streetViewControl={false}
        mapTypeControl={false}
        rotateControl={false}
        style={{ width: "80vw", height: "80vh" }}
        zoom={17}
        center={center}
        disableDefaultUI
      />
      <div>
        <Input ref={inputRef} />
      </div>
    </div>
  )
}

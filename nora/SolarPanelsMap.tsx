"use client"

import { useEffect, useRef, useState } from "react"
import {
  BuildingInsights,
  findClosestBuildingInsights,
  getDataLayers
} from "@nora-soderlund/google-maps-solar-api"
import { useMapsLibrary } from "@vis.gl/react-google-maps"
import { getDataLayersCanvas } from "./getDataLayersCanvas"
import DataLayerOverlay from "./DataLayerOverlay"

interface SolarPanelsMapProps {
  apiKey: string
  elementId: string
}

type SolarPanel = BuildingInsights["solarPotential"]["solarPanels"][number]

const SolarPanelsMap = ({ apiKey, elementId }: SolarPanelsMapProps) => {
  const mapRef = useRef<google.maps.MapElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLInputElement | null>(null)
  const countConicRef = useRef<HTMLDivElement | null>(null)
  const countConicInnerRef = useRef<HTMLDivElement | null>(null)
  const energyConicRef = useRef<HTMLDivElement | null>(null)
  const energyConicInnerRef = useRef<HTMLDivElement | null>(null)

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [buildingInsights, setBuildingInsights] =
    useState<BuildingInsights | null>(null)
  const [solarPanelPolygons, setSolarPanelPolygons] = useState<SolarPanel[]>([])
  const solarPanelPolygonReferences = useRef(new Map())

  useEffect(() => {
    const initMap = async () => {
      const mapElement = document.createElement("div")

      mapElement.className = "solar-panels-map"
      if (mapRef.current) {
        mapRef.current.append(mapElement)
      } else {
        console.error("mapRef.current is null")
        return
      }

      const Map = useMapsLibrary("maps")?.Map

      if (!Map) return

      await google.maps.importLibrary("geometry").catch(err => {
        console.error("Failed to import geometry library", err)
        return
      })

      const mapInstance = new Map(mapElement, {
        center: {
          lat: 57.623147493770105,
          lng: 11.931981013011718
        },
        mapTypeId: "satellite",
        tilt: 0,
        styles: [
          {
            featureType: "all",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        zoom: 17,
        streetViewControl: false,
        mapTypeControl: false,
        rotateControl: false
      })

      setMap(mapInstance)
    }

    const initForm = async () => {
      const formElement = document.createElement("div")
      formElement.className = "solar-panels-form active"
      formRef.current?.append(formElement)

      const Autocomplete = useMapsLibrary("places")?.Autocomplete

      if (!Autocomplete) {
        return
      }

      const inputElement = document.createElement("input")
      inputElement.type = "text"
      inputElement.className = "solar-panels-form-input"
      formElement.append(inputElement)

      const autocomplete = new Autocomplete(inputElement, {
        fields: ["geometry"],
        types: ["address"]
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        if (!place.geometry?.location)
          return alert(
            "Something went wrong, can't resolve the location of this address!"
          )

        showInsightsForCoordinate({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        })
          .then(() => {
            formElement.classList.remove("active")
          })
          .catch(error => {
            console.error(error)
            if (error.message.includes("404"))
              alert("Sorry, there's no coverage available for this address!")
            else alert("Sorry, something went wrong!")
          })
      })
    }

    const initPanel = () => {
      const panelElement = document.createElement("div")
      panelRef.current?.append(panelElement)

      const dataContainer = document.createElement("div")
      dataContainer.className = "solar-panels-panel solar-panels-panel-data"
      panelElement.append(dataContainer)

      const panelsCountContainer = document.createElement("div")
      panelsCountContainer.className = "solar-panels-panel-container"
      dataContainer.append(panelsCountContainer)

      const panelsCountTitle = document.createElement("h3")
      panelsCountTitle.className = "solar-panels-panel-title"
      panelsCountTitle.innerText = "Panels count"
      panelsCountContainer.append(panelsCountTitle)

      const panelCountConicElement = document.createElement("div")
      panelCountConicElement.className = "solar-panels-panel-conic"
      panelCountConicElement.style.color = "blue"
      panelCountConicElement.style.setProperty("--progress", "50%")
      panelsCountContainer.append(panelCountConicElement)

      const panelCountConicInnerElement = document.createElement("div")
      panelCountConicInnerElement.className = "solar-panels-panel-conic-inner"
      panelCountConicInnerElement.innerText = "50"
      panelCountConicElement.append(panelCountConicInnerElement)

      const annualEnergyContainer = document.createElement("div")
      annualEnergyContainer.className = "solar-panels-panel-container"
      dataContainer.append(annualEnergyContainer)

      const annualEnergyTitle = document.createElement("h3")
      annualEnergyTitle.className = "solar-panels-panel-title"
      annualEnergyTitle.innerText = "Annual energy"
      annualEnergyContainer.append(annualEnergyTitle)

      const panelEnergyConicElement = document.createElement("div")
      panelEnergyConicElement.className = "solar-panels-panel-conic"
      panelEnergyConicElement.style.color = "green"
      panelEnergyConicElement.style.setProperty("--progress", "25%")
      annualEnergyContainer.append(panelEnergyConicElement)

      const panelEnergyConicInnerElement = document.createElement("div")
      panelEnergyConicInnerElement.className = "solar-panels-panel-conic-inner"
      panelEnergyConicInnerElement.innerText = "50"
      panelEnergyConicElement.append(panelEnergyConicInnerElement)

      const sliderContainer = document.createElement("div")
      sliderContainer.className = "solar-panels-panel"
      panelElement.append(sliderContainer)

      const panelSliderElement = document.createElement("input")
      panelSliderElement.className = "solar-panels-panel-slider"
      panelSliderElement.type = "range"
      panelSliderElement.min = "0"
      panelSliderElement.value = "0"
      panelSliderElement.step = "1"
      sliderContainer.append(panelSliderElement)

      sliderRef.current = panelSliderElement
      countConicRef.current = panelCountConicElement
      countConicInnerRef.current = panelCountConicInnerElement
      energyConicRef.current = panelEnergyConicElement
      energyConicInnerRef.current = panelEnergyConicInnerElement

      panelSliderElement.addEventListener("input", () => {
        setPotentialSegment(parseInt(panelSliderElement.value))
      })
    }

    initMap()
    initForm()
    initPanel()
  }, [])

  const showInsightsForCoordinate = async (coordinate: {
    latitude: number
    longitude: number
  }) => {
    if (!formRef.current) return

    formRef.current.innerHTML = `<h2 class="solar-panels-form-label">Loading data...</h2>`

    const buildingInsightsData = await findClosestBuildingInsights(apiKey, {
      location: coordinate
    })

    setBuildingInsights(buildingInsightsData)

    map?.moveCamera({
      center: {
        lat: buildingInsightsData.center.latitude,
        lng: buildingInsightsData.center.longitude
      },
      zoom: 21
    })

    const radius = Math.max(
      google.maps.geometry.spherical.computeDistanceBetween(
        {
          lat: buildingInsightsData.boundingBox.ne.latitude,
          lng: buildingInsightsData.boundingBox.ne.longitude
        },
        {
          lat: buildingInsightsData.boundingBox.sw.latitude,
          lng: buildingInsightsData.boundingBox.sw.longitude
        }
      ) / 2,
      100
    )

    const location = {
      lat: coordinate.latitude,
      lng: coordinate.longitude
    }

    const coordinateBounds = [
      google.maps.geometry.spherical.computeOffset(location, radius, 0),
      google.maps.geometry.spherical.computeOffset(location, radius, 90),
      google.maps.geometry.spherical.computeOffset(location, radius, 180),
      google.maps.geometry.spherical.computeOffset(location, radius, 270)
    ]

    const dataLayers = await getDataLayers(apiKey, {
      location: coordinate,
      radiusMeters: radius,
      view: "IMAGERY_AND_ANNUAL_FLUX_LAYERS"
    })

    const bounds = new google.maps.LatLngBounds()
    coordinateBounds.forEach(coordinate => {
      bounds.extend(coordinate)
    })

    const image = await getDataLayersCanvas(apiKey, dataLayers)
    const dataLayerOverlay = DataLayerOverlay.create(bounds, image)
    dataLayerOverlay.setMap(map)

    if (!panelRef.current) {
      return
    }
    map?.controls[google.maps.ControlPosition.LEFT_TOP].push(panelRef.current)

    setPotentialSegment(0)
    updatePanel(0)
  }

  const setPotentialSegment = (configIndex: number) => {
    updatePanelData(configIndex)

    // @ts-ignore
    solarPanelPolygons.forEach(polygon => polygon.setMap(null))
    setSolarPanelPolygons([])

    const solarPanelConfig =
      buildingInsights?.solarPotential.solarPanelConfigs[configIndex]
    let panelsCount = 0
    const newSolarPanelPolygons: SolarPanel[] = []
    solarPanelConfig?.roofSegmentSummaries.forEach(roofSegmentSummary => {
      buildingInsights?.solarPotential.solarPanels
        .filter(
          solarPanel =>
            solarPanel.segmentIndex === roofSegmentSummary.segmentIndex
        )
        .slice(
          0,
          Math.min(
            solarPanelConfig.panelsCount - panelsCount,
            roofSegmentSummary.panelsCount
          )
        )
        .forEach(solarPanel => {
          let height = buildingInsights.solarPotential.panelHeightMeters / 2
          let width = buildingInsights.solarPotential.panelWidthMeters / 2

          if (solarPanel.orientation === "LANDSCAPE") {
            const previousHeight = height
            height = width
            width = previousHeight
          }

          const angle = roofSegmentSummary.azimuthDegrees

          if (!solarPanelPolygonReferences.current.has(solarPanel)) {
            const center = {
              lat: solarPanel.center.latitude,
              lng: solarPanel.center.longitude
            }

            const top = google.maps.geometry.spherical.computeOffset(
              center,
              height,
              angle + 0
            )
            const right = google.maps.geometry.spherical.computeOffset(
              center,
              width,
              angle + 90
            )
            const left = google.maps.geometry.spherical.computeOffset(
              center,
              width,
              angle + 270
            )

            const topRight = google.maps.geometry.spherical.computeOffset(
              top,
              width,
              angle + 90
            )
            const bottomRight = google.maps.geometry.spherical.computeOffset(
              right,
              height,
              angle + 180
            )
            const bottomLeft = google.maps.geometry.spherical.computeOffset(
              left,
              height,
              angle + 180
            )
            const topLeft = google.maps.geometry.spherical.computeOffset(
              left,
              height,
              angle + 0
            )

            solarPanelPolygonReferences.current.set(
              solarPanel,
              new google.maps.Polygon({
                map,
                fillColor: "#2B2478",
                fillOpacity: 0.8,
                strokeWeight: 1,
                strokeColor: "#AAAFCA",
                strokeOpacity: 1,
                geodesic: false,
                paths: [topRight, bottomRight, bottomLeft, topLeft]
              })
            )
          }

          const polygon = solarPanelPolygonReferences.current.get(solarPanel)
          polygon.setMap(map)
          newSolarPanelPolygons.push(polygon)
        })

      panelsCount += roofSegmentSummary.panelsCount
    })
    setSolarPanelPolygons(newSolarPanelPolygons)
  }

  const updatePanel = (current: number) => {
    if (sliderRef.current) {
      sliderRef.current.value = current.toString()
      if (buildingInsights) {
        sliderRef.current.max = (
          buildingInsights.solarPotential.solarPanelConfigs.length - 1
        ).toString()
      }
    }
  }

  const updatePanelData = (segmentIndex: number) => {
    if (!buildingInsights) return
    const solarPanelConfig =
      buildingInsights.solarPotential.solarPanelConfigs[segmentIndex]
    const lastSolarPanelConfig =
      buildingInsights.solarPotential.solarPanelConfigs[
        buildingInsights.solarPotential.solarPanelConfigs.length - 1
      ]

    if (!countConicRef.current) {
      return null
    }

    countConicRef.current.style.setProperty(
      "--progress",
      (
        (solarPanelConfig.panelsCount / lastSolarPanelConfig.panelsCount) *
        75
      ).toString() + "%"
    )

    if (!countConicInnerRef.current) {
      return null
    }

    countConicInnerRef.current.innerText = `${solarPanelConfig.panelsCount}/${lastSolarPanelConfig.panelsCount}`

    if (!energyConicRef.current) {
      return null
    }

    energyConicRef.current.style.setProperty(
      "--progress",
      (
        (solarPanelConfig.yearlyEnergyDcKwh /
          lastSolarPanelConfig.yearlyEnergyDcKwh) *
        75
      ).toString() + "%"
    )

    if (!energyConicInnerRef.current) {
      return null
    }
    energyConicInnerRef.current.innerText = `${Math.round(solarPanelConfig.yearlyEnergyDcKwh)} kwh`
  }

  return (
    <div id={elementId} className="solar-panels">
      <div ref={mapRef as React.RefObject<HTMLDivElement>} />
      <div ref={formRef as React.RefObject<HTMLDivElement>} />
      <div ref={panelRef as React.RefObject<HTMLDivElement>} />
    </div>
  )
}

export default SolarPanelsMap

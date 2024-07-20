import { MapProvider } from "@/client/MapProvider"
import SolarPanelsMap from "@/nora/SolarPanelsMap"

export default function Page() {
  return (
    <div>
      <MapProvider>
        <SolarPanelsMap
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          elementId="solar-panels-map"
        />
      </MapProvider>
    </div>
  )
}

import { findClosestBuilding } from "@/lib/solar/findClosestBuilding"
import { google } from "@googlemaps/solar/build/protos/protos"

export default async function Page() {
  const location = {
    lat: 30.267946904577837,
    lng: -97.74325599361393
  }

  const closestBuilding = await findClosestBuilding(
    location,
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  )

  console.log(closestBuilding)

  return <div>Eddy</div>
}

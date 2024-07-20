"use client"

import { findClosestBuilding } from "@/lib/solar/findClosestBuilding"
import React, { useState, useEffect } from "react"

export default function Page() {
  const [buildingData, setBuildingData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const location = new google.maps.LatLng(37.7749, -122.4194) // Example coordinates (San Francisco)
        console.log("eddy")
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        const data = await findClosestBuilding(location, apiKey)
        setBuildingData(data)
      } catch (err) {
        setError(err?.message)
      }
    }

    fetchBuildingData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Building Insights</h1>
      {buildingData ? (
        <pre>{JSON.stringify(buildingData, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

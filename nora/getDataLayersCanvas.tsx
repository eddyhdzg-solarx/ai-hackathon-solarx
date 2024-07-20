"use client"

import { DataLayers, getGeoTiff } from "@nora-soderlund/google-maps-solar-api"
import * as GeoTIFF from "geotiff"
import { useEffect, useRef } from "react"

async function getDataLayerRgbCanvas(apiKey: string, dataLayers: DataLayers) {
  if (!dataLayers.rgbUrl) {
    return null
  }

  const tiffImageBuffer = await getGeoTiff(apiKey, dataLayers.rgbUrl)

  const tiff = await GeoTIFF.fromArrayBuffer(tiffImageBuffer)
  const tiffImage = await tiff.getImage()
  const tiffData = await tiffImage.readRasters()

  const canvas = document.createElement("canvas")

  canvas.width = tiffData.width
  canvas.height = tiffData.height

  const context = canvas.getContext("2d")

  if (!context) {
    return null
  }

  for (let row = 0; row < tiffData.height; row++) {
    for (let column = 0; column < tiffData.width; column++) {
      const index = row * tiffData.width + column
      context.fillStyle = `rgb(${(tiffData as any)[0][index]}, ${(tiffData as any)[1][index]}, ${(tiffData as any)[2][index]})`
      context.fillRect(column, row, 1, 1)
    }
  }

  return canvas
}

async function getDataLayerMaskCanvas(apiKey: string, dataLayers: DataLayers) {
  if (!dataLayers.maskUrl) {
    return null
  }

  const tiffImageBuffer = await getGeoTiff(apiKey, dataLayers.maskUrl)

  const tiff = await GeoTIFF.fromArrayBuffer(tiffImageBuffer)
  const tiffImage = await tiff.getImage()
  const tiffData = await tiffImage.readRasters()

  const canvas = document.createElement("canvas")

  canvas.width = tiffData.width
  canvas.height = tiffData.height

  const context = canvas.getContext("2d")

  if (!context) {
    return null
  }

  for (let row = 0; row < tiffData.height; row++) {
    for (let column = 0; column < tiffData.width; column++) {
      const index = row * tiffData.width + column
      if ((tiffData as any)[0][index]) {
        context.fillRect(column, row, 1, 1)
      }
    }
  }

  return canvas
}

async function getDataLayerFluxCanvas(
  apiKey: string,
  dataLayers: DataLayers,
  scale: number
) {
  if (!dataLayers.annualFluxUrl) {
    return null
  }

  const tiffImageBuffer = await getGeoTiff(apiKey, dataLayers.annualFluxUrl)

  const tiff = await GeoTIFF.fromArrayBuffer(tiffImageBuffer)
  const tiffImage = await tiff.getImage()
  const tiffData = await tiffImage.readRasters()

  const canvas = document.createElement("canvas")

  canvas.width = tiffData.width * scale
  canvas.height = tiffData.height * scale

  const context = canvas.getContext("2d")

  const array = tiffData[0] as any

  const maximumKwhPerKwPerYear = array.reduce(
    // @ts-ignore
    (unit, currentUnit) => (unit > currentUnit ? unit : currentUnit),
    0
  )

  for (let row = 0; row < tiffData.height; row += Math.round(1 / scale)) {
    for (
      let column = 0;
      column < tiffData.width;
      column += Math.round(1 / scale)
    ) {
      const index = row * tiffData.width + column
      // @ts-ignore
      const value = tiffData[0][index]
      if (value === -9999) continue
      // @ts-ignore
      context.fillStyle = `hsl(50 100% ${(value / maximumKwhPerKwPerYear) * 100}%)`
      // @ts-ignore
      context.fillRect(column * scale, row * scale, 1, 1)
    }
  }

  return canvas
}

export async function getDataLayersCanvas(
  apiKey: string,
  dataLayers: DataLayers
) {
  const canvas = document.createElement("canvas")
  const expectedSize = 2000
  const scale = 1
  const size = expectedSize * scale
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")

  const canvases = await Promise.all([
    // Uncomment if you need these layers
    // getDataLayerFluxCanvas(apiKey, dataLayers, 1),
    // getDataLayerMaskCanvas(apiKey, dataLayers),
    getDataLayerRgbCanvas(apiKey, dataLayers)
  ])

  // Uncomment if you need these layers
  // context.drawImage(canvases[0], 0, 0, canvases[0].width, canvases[0].height, 0, 0, size, size);
  // context.globalCompositeOperation = "destination-in";
  // context.drawImage(canvases[1], 0, 0, canvases[1].width, canvases[1].height, 0, 0, size, size);

  context?.drawImage(
    // @ts-ignore
    canvases[0],
    0,
    0,
    // @ts-ignore
    canvases[0].width,
    // @ts-ignore
    canvases[0].height,
    0,
    0,
    size,
    size
  )

  return canvas
}

const SolarDataLayerCanvas = ({
  apiKey,
  dataLayers
}: {
  apiKey: string
  dataLayers: DataLayers
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const renderCanvas = async () => {
      if (!canvasRef.current) {
        return null
      }

      const canvas = await getDataLayersCanvas(apiKey, dataLayers)
      canvasRef.current.appendChild(canvas)
    }

    renderCanvas()
  }, [apiKey, dataLayers])

  return <div ref={canvasRef}></div>
}

export default SolarDataLayerCanvas

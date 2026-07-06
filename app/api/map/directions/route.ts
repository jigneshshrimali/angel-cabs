import { NextResponse } from "next/server"

// GET /api/map/directions?pickupLat=&pickupLng=&dropLat=&dropLng=
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const pickupLat = url.searchParams.get("pickupLat")
    const pickupLng = url.searchParams.get("pickupLng")
    const dropLat = url.searchParams.get("dropLat")
    const dropLng = url.searchParams.get("dropLng")

    if (!pickupLat || !pickupLng || !dropLat || !dropLng) {
      return NextResponse.json({ error: "Missing coordinates" }, { status: 400 })
    }

    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN
    if (!MAPBOX_TOKEN) {
      return NextResponse.json({ error: "Mapbox token not configured (MAPBOX_TOKEN)" }, { status: 501 })
    }

    const coords = `${encodeURIComponent(pickupLng)},${encodeURIComponent(pickupLat)};${encodeURIComponent(dropLng)},${encodeURIComponent(dropLat)}`
    const mbUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?alternatives=false&geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`

    const res = await fetch(mbUrl)
    if (!res.ok) {
      const txt = await res.text().catch(() => "")
      return NextResponse.json({ error: "Mapbox directions error", details: txt }, { status: 502 })
    }

    const data = await res.json()
    const route = data.routes && data.routes[0]
    if (!route) {
      return NextResponse.json({ error: "No route found" }, { status: 404 })
    }

    const distanceMeters = route.distance || 0
    const durationSec = route.duration || 0

    return NextResponse.json({ ok: true, distanceMeters, distanceKm: distanceMeters / 1000, durationSec })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

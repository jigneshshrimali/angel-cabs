import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lng = searchParams.get("lng")
  const lat = searchParams.get("lat")
  if (!lng || !lat) return NextResponse.json({ error: "Missing coords" }, { status: 400 })

  const token = process.env.MAPBOX_TOKEN || ""
  if (!token) return NextResponse.json({ error: "Server MAPBOX_TOKEN not configured" }, { status: 500 })

  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&limit=1`,
    )
    const json = await res.json()
    const place = json.features?.[0]?.place_name || null
    return NextResponse.json({ place })
  } catch (err) {
    return NextResponse.json({ error: "Reverse geocode failed" }, { status: 500 })
  }
}

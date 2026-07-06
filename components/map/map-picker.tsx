"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { toast } from "sonner"

type Place = {
  id: string
  name: string
  coords: { lat: number; lng: number }
}

export default function MapPicker({
  initialCoords,
  onSelect,
  onClose,
}: {
  initialCoords?: { lat: number; lng: number }
  onSelect: (p: Place) => void
  onClose: () => void
}) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapboxMarkerRef = useRef<any>(null)
  const mapRefInst = useRef<any>(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

  useEffect(() => {
    let mounted = true
    if (!mapRef.current) return
    if (!token) return
    let mapbox: any
    const mapboxModuleRef: { current?: any } = mapRef as any
    import("mapbox-gl").then((m) => {
      mapbox = m.default || m
      mapboxModuleRef.current = mapbox
      mapbox.accessToken = token
      const map = new mapbox.Map({
        container: mapRef.current as HTMLElement,
        style: "mapbox://styles/mapbox/streets-v11",
        center: initialCoords ? [initialCoords.lng, initialCoords.lat] : [72.58, 23.03],
        zoom: 12,
      })
      mapRefInst.current = map

      const marker = new mapbox.Marker({ draggable: true })
      marker.setLngLat(initialCoords ? [initialCoords.lng, initialCoords.lat] : [72.58, 23.03])
      marker.addTo(map)
      mapboxMarkerRef.current = marker

      marker.on("dragend", async () => {
        const lngLat = marker.getLngLat()
        // reverse geocode via server if available
        try {
          const base = "/api/map/reverse";
          const res = await fetch(`${base}?lng=${lngLat.lng}&lat=${lngLat.lat}`)
          if (res.ok) {
            const json = await res.json()
            const name = json.place || `${lngLat.lat.toFixed(5)}, ${lngLat.lng.toFixed(5)}`
            onSelect({ id: String(Date.now()), name, coords: { lat: lngLat.lat, lng: lngLat.lng } })
            return
          }
          // fallback to client token if server route unavailable
          if (token) {
            const res2 = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${token}&limit=1`)
            const json2 = await res2.json()
            const name = json2.features?.[0]?.place_name || `${lngLat.lat.toFixed(5)}, ${lngLat.lng.toFixed(5)}`
            onSelect({ id: String(Date.now()), name, coords: { lat: lngLat.lat, lng: lngLat.lng } })
            return
          }
          onSelect({ id: String(Date.now()), name: `${lngLat.lat.toFixed(5)}, ${lngLat.lng.toFixed(5)}`, coords: { lat: lngLat.lat, lng: lngLat.lng } })
        } catch (err) {
          onSelect({ id: String(Date.now()), name: `${lngLat.lat.toFixed(5)}, ${lngLat.lng.toFixed(5)}`, coords: { lat: lngLat.lat, lng: lngLat.lng } })
        }
      })

      return () => {
        mounted = false
        map.remove()
      }
    })
  }, [initialCoords, token, onSelect])

  const useMyLocation = () => {
    if (!navigator?.geolocation) {
      toast.error("Geolocation not supported in this browser")
      return
    }
    toast("Detecting your location…")
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        try {
          const res = await fetch(`/api/map/reverse?lng=${lng}&lat=${lat}`)
          if (res.ok) {
            const json = await res.json()
            const name = json.place || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
            // move marker and center
            if (mapRefInst.current && mapboxModuleRef?.current) {
              mapRefInst.current.setCenter([lng, lat])
              mapRefInst.current.setZoom(14)
              if (mapboxMarkerRef.current) mapboxMarkerRef.current.setLngLat([lng, lat])
            }
            onSelect({ id: String(Date.now()), name, coords: { lat, lng } })
            toast.success("Location detected")
            return
          }
          if (token) {
            const res2 = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&limit=1`)
            const json2 = await res2.json()
            const name = json2.features?.[0]?.place_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
            if (mapRefInst.current && mapboxModuleRef?.current) {
              mapRefInst.current.setCenter([lng, lat])
              mapRefInst.current.setZoom(14)
              if (mapboxMarkerRef.current) mapboxMarkerRef.current.setLngLat([lng, lat])
            }
            onSelect({ id: String(Date.now()), name, coords: { lat, lng } })
            toast.success("Location detected")
            return
          }
          onSelect({ id: String(Date.now()), name: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, coords: { lat, lng } })
          toast.success("Location detected")
        } catch (err) {
          onSelect({ id: String(Date.now()), name: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, coords: { lat, lng } })
          toast.success("Location detected")
        }
      },
      (err) => {
        toast.error("Unable to detect location")
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const doSearch = async (q: string) => {
    if (!q || !token) return
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${token}&autocomplete=true&limit=6`,
      )
      const json = await res.json()
      setResults(json.features || [])
    } catch {
      setResults([])
    }
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
          <div className="text-center w-full">
            <div className="text-sm font-semibold">Move map to adjust location</div>
          </div>
          <button type="button" onClick={onClose} className="rounded p-1 text-muted-foreground">
            <X />
          </button>
        </div>

        <div className="flex h-[480px]">
          <div className="w-1/3 overflow-auto border-r">
            <div className="p-3">
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search places or addresses"
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => doSearch(query)}
                  className="rounded-md bg-primary px-3 py-2 text-sm text-white"
                >
                  Search
                </button>
              </div>
              <div className="mt-3">
                <button type="button" onClick={useMyLocation} className="text-sm text-muted-foreground underline">Use my location</button>
              </div>

              <ul className="mt-3">
                {results.map((r) => (
                  <li key={r.id} className="mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        const [lng, lat] = r.center
                        if (mapRefInst.current) {
                          mapRefInst.current.setCenter([lng, lat])
                          mapRefInst.current.setZoom(16)
                          if (mapboxMarkerRef.current) mapboxMarkerRef.current.setLngLat([lng, lat])
                        }
                        onSelect({ id: r.id, name: r.place_name, coords: { lat, lng } })
                        // keep picker open so user can fine-tune
                      }}
                      className="w-full text-left"
                    >
                      <div className="text-sm font-semibold">{r.text}</div>
                      <div className="text-xs text-muted-foreground">{r.place_name}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-2/3 relative">
            <div ref={mapRef} className="absolute inset-0" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={async () => {
                try {
                  if (!mapboxMarkerRef.current) return
                  const lngLat = mapboxMarkerRef.current.getLngLat()
                  const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${token}&limit=1`)
                  const json = await res.json()
                  const name = json.features?.[0]?.place_name || `${lngLat.lat.toFixed(5)}, ${lngLat.lng.toFixed(5)}`
                  onSelect({ id: String(Date.now()), name, coords: { lat: lngLat.lat, lng: lngLat.lng } })
                  onClose()
                } catch (err) {
                  toast.error("Unable to confirm location")
                }
              }}
              className="w-full rounded-3xl bg-black px-6 py-3 text-lg font-semibold text-yellow-400"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { distanceKm, type LatLng } from "@/lib/geo"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { MapPin, CalendarClock, Users, Search, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { tripTypes, type TripType } from "@/lib/booking"

function defaultDateTime() {
  const d = new Date(Date.now() + 60 * 60 * 1000)
  const date = d.toISOString().slice(0, 10)
  const time = `${String(d.getHours()).padStart(2, "0")}:00`
  return { date, time }
}

export function BookingWidget({ variant = "card" }: { variant?: "card" | "bar" }) {
  const router = useRouter()
  const dt = defaultDateTime()
  const [tripType, setTripType] = useState<TripType>("one-way")
  const [pickup, setPickup] = useState("")
  const [drop, setDrop] = useState("")
  const [pickupCoord, setPickupCoord] = useState<LatLng | null>(null)
  const [dropCoord, setDropCoord] = useState<LatLng | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [pickerTarget, setPickerTarget] = useState<"pickup" | "drop">("pickup")

  const [date, setDate] = useState(dt.date)
  const [time, setTime] = useState(dt.time)
  const [passengers, setPassengers] = useState(2)

  const [popularLocations, setPopularLocations] = useState<string[]>([
    "Rajkot Airport",
    "Rajkot Railway Station",
    "Rajkot Bus Station",
    "Rajkot Main Highway",
    "Rajkot Ring Road",
    "Rajkot Race Course",
    "Rajkot Bus Stand",
    "Gondal",
    "Jamnagar",
    "Porbandar",
    "Bhavnagar",
    "Gir National Park",
    "Sasan Gir",
    "Dwarka",
    "Somnath",
    "Diu",
    "Surat",
    "Vadodara",
    "Anand",
    "Gandhinagar",
    "Ahmedabad",
    "Ahmedabad Airport",
    "Bhuj",
    "Palanpur",
    "Saputara",
  ])
  const popularSummary = `${popularLocations.slice(0, 8).join(", ")}, and more.`

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      tripType,
      pickup,
      drop,
      date,
      time,
      passengers: String(passengers),
    })
    if (pickupCoord) {
      params.set("pickupLat", String(pickupCoord.lat))
      params.set("pickupLng", String(pickupCoord.lng))
    }
    if (dropCoord) {
      params.set("dropLat", String(dropCoord.lat))
      params.set("dropLng", String(dropCoord.lng))
    }
    if (computedDistance) {
      params.set("distanceKm", String(computedDistance.toFixed(2)))
    }
    router.push(`/booking?${params.toString()}`)
  }

  // Persist draft to sessionStorage (and localStorage as fallback) so home inputs
  // are available across navigation within the same browser session.
  useEffect(() => {
    try {
      const draft = { tripType, pickup, drop, date, time, passengers }
      // session cookie (no expires) for session-scoped cross-tab semantics
      document.cookie = `angel_booking_draft=${encodeURIComponent(JSON.stringify(draft))}; path=/`
      sessionStorage.setItem("angel_booking_draft", JSON.stringify(draft))
      localStorage.setItem("angel_booking_draft", JSON.stringify(draft))
    } catch {
      // ignore storage errors
    }
  }, [tripType, pickup, drop, date, time, passengers])

  const canSearch = Boolean(pickup.trim() && drop.trim())
  const ctaText = canSearch ? "Continue to booking" : "Start booking"

  const computedDistance = pickupCoord && dropCoord ? distanceKm(pickupCoord.lat, pickupCoord.lng, dropCoord.lat, dropCoord.lng) : null

  return (
    <form
      onSubmit={onSearch}
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5",
        variant === "bar" && "shadow-md",
      )}
    >
      <div className="mb-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Trip type">
        {tripTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tripType === t.id}
            onClick={() => setTripType(t.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              tripType === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        <Field icon={<MapPin className="h-4 w-4 text-primary" />} label="Pickup Location">
          <div>
            <div className="flex items-center gap-2">
              <Input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                aria-label="Pickup location"
                list="popular-locations"
                className="h-10 border-0 px-0 shadow-none focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => {
                  const name = window.prompt("Add new pickup place (e.g. 'New Landmark, Rajkot')")
                  if (!name) return
                  setPopularLocations((p) => [name, ...p])
                  setPickup(name)
                }}
                className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground"
              >
                Add
              </button>
            </div>

            <div className="mt-1">
              <p className="text-xs text-secondary-foreground/70">Popular Gujarat locations: {popularSummary}</p>
            </div>
          </div>
        </Field>
        <Field icon={<Navigation className="h-4 w-4 text-primary" />} label="Drop Location">
          <div>
            <div className="flex items-center gap-2">
              <Input
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Enter drop location"
                aria-label="Drop location"
                list="popular-locations"
                className="h-10 border-0 px-0 shadow-none focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => {
                  const name = window.prompt("Add new drop place (e.g. 'New Landmark')")
                  if (!name) return
                  setPopularLocations((p) => [name, ...p])
                  setDrop(name)
                }}
                className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-foreground"
              >
                Add
              </button>
            </div>

            <div className="mt-1">
              <p className="text-xs text-secondary-foreground/70">Popular Gujarat locations: {popularSummary}</p>
            </div>
          </div>
        </Field>
        <Field icon={<CalendarClock className="h-4 w-4 text-primary" />} label="Date & Time">
          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Pickup date"
              className="w-full bg-transparent text-sm outline-none"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-label="Pickup time"
              className="bg-transparent text-sm outline-none"
            />
          </div>
        </Field>
        <Field icon={<Users className="h-4 w-4 text-primary" />} label="Passengers">
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            aria-label="Passengers"
            className="w-full bg-transparent text-sm outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <datalist id="popular-locations">
        {popularLocations.map((location) => (
          <option key={location} value={location} />
        ))}
      </datalist>

      {computedDistance ? (
        <p className="mt-2 text-sm text-muted-foreground">Estimated distance: <strong>{computedDistance.toFixed(2)} km</strong></p>
      ) : null}

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {canSearch
            ? "Continue to booking with your pickup and drop already set."
            : "Enter pickup and drop locations to start your ride booking."}
        </p>
        <Button type="submit" size="lg" className="h-12 w-full sm:w-auto text-base font-semibold" disabled={!canSearch}>
          <Search className="h-4 w-4" />
          {ctaText}
        </Button>
      </div>

      {/* Map picker disabled for POC to simplify UI */}
    </form>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-background px-3.5 py-2">
      <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </Label>
      <div className="mt-0.5">{children}</div>
    </div>
  )
}

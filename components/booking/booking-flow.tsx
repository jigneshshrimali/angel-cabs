"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { vehicles } from "@/lib/data"
import { estimateFare, generateBookingId, formatINR, tripTypes } from "@/lib/booking"

export default function BookingFlow({ initialParams = {} as Record<string, string> }) {
  const router = useRouter()
  const hasInitialSearch = Boolean(initialParams.pickup && initialParams.drop)
  const [step, setStep] = useState(() => (hasInitialSearch ? 2 : 1))
  const [values, setValues] = useState<any>({
    tripType: initialParams.tripType || "one-way",
    pickup: initialParams.pickup || "",
    drop: initialParams.drop || "",
    date: initialParams.date || "",
    returnDate: initialParams.returnDate || "",
    time: initialParams.time || "",
    passengers: Number(initialParams.passengers || 2),
    distanceKm: Number(initialParams.distanceKm || 50),
    vehicle: initialParams.vehicle || vehicles[0]?.slug,
    name: "",
    phone: "",
    email: initialParams.email || "",
    payment: "cash",
  })
  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false)

  const popularLocations = [
    "Ahmedabad Airport",
    "Vadodara",
    "Gandhinagar",
    "Sabarmati",
    "Sarkhej",
    "Navrangpura",
    "Gota",
  ]

  useEffect(() => {
    try {
      // Save draft to sessionStorage for the current browser session
      sessionStorage.setItem("angel_booking_draft", JSON.stringify(values))
      // Also keep a copy in localStorage as a fallback/persistent draft
      localStorage.setItem("angel_booking_draft", JSON.stringify(values))
    } catch {
      // ignore storage errors (e.g., private mode)
    }
  }, [values])

  useEffect(() => {
    if (initialValuesLoaded) {
      return
    }

    const queryHasValue =
      Boolean(initialParams.pickup) ||
      Boolean(initialParams.drop) ||
      Boolean(initialParams.date) ||
      Boolean(initialParams.time) ||
      Boolean(initialParams.tripType) ||
      Boolean(initialParams.passengers)

    if (queryHasValue) {
      setValues((prev: any) => ({
        ...prev,
        tripType: initialParams.tripType || prev.tripType,
        pickup: initialParams.pickup || prev.pickup,
        drop: initialParams.drop || prev.drop,
        date: initialParams.date || prev.date,
        time: initialParams.time || prev.time,
        passengers: initialParams.passengers ? Number(initialParams.passengers) : prev.passengers,
        vehicle: initialParams.vehicle || prev.vehicle,
      }))
      // if coordinates are provided, compute distance
      if (initialParams.pickupLat && initialParams.pickupLng && initialParams.dropLat && initialParams.dropLng) {
        try {
          const pl = Number(initialParams.pickupLat)
          const pg = Number(initialParams.pickupLng)
          const dl = Number(initialParams.dropLat)
          const dg = Number(initialParams.dropLng)
          // call server-side Mapbox Directions to get driving distance
          fetch(`/api/map/directions?pickupLat=${encodeURIComponent(pl)}&pickupLng=${encodeURIComponent(pg)}&dropLat=${encodeURIComponent(dl)}&dropLng=${encodeURIComponent(dg)}`)
            .then((r) => r.json())
            .then((json) => {
              if (json?.ok && typeof json.distanceMeters === "number") {
                const km = json.distanceMeters / 1000
                setValues((v: any) => ({ ...v, distanceKm: Math.max(1, Math.round(km)) }))
              } else if (initialParams.distanceKm) {
                setValues((v: any) => ({ ...v, distanceKm: Number(initialParams.distanceKm) }))
              }
            })
            .catch(() => {
              if (initialParams.distanceKm) setValues((v: any) => ({ ...v, distanceKm: Number(initialParams.distanceKm) }))
            })
        } catch {}
      } else if (initialParams.distanceKm) {
        setValues((v: any) => ({ ...v, distanceKm: Number(initialParams.distanceKm) }))
      }
      setStep(initialParams.pickup && initialParams.drop ? 2 : 1)
      setInitialValuesLoaded(true)
      return
    }

    // Prefer cookie > sessionStorage (session-scoped) > localStorage
    try {
      const cookieMatch = typeof document !== "undefined" && document.cookie.match(/(?:^|; )angel_booking_draft=([^;]+)/)
      const cookieValue = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null
      const draftSession = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("angel_booking_draft") : null
      const draftLocal = typeof localStorage !== "undefined" ? localStorage.getItem("angel_booking_draft") : null
      const draft = cookieValue || draftSession || draftLocal
      if (draft) {
        try {
          setValues((v: any) => ({ ...v, ...JSON.parse(draft) }))
          toast.success("Prefilled booking fields from your previous session. Edit as needed.")
          setInitialValuesLoaded(true)
        } catch {
          // ignore malformed draft
        }
      }
    } catch {
      // ignore storage/cookie errors
    }
  }, [initialParams, initialValuesLoaded])

  // Fallback: ensure query params in the browser URL (client navigation) are applied
  useEffect(() => {
    if (typeof window === "undefined") return
    if (initialValuesLoaded) return

    const params = new URLSearchParams(window.location.search)
    const pickupParam = params.get("pickup")
    if (!pickupParam) return

    setValues((prev: any) => ({
      ...prev,
      tripType: params.get("tripType") || prev.tripType,
      pickup: params.get("pickup") || prev.pickup,
      drop: params.get("drop") || prev.drop,
      date: params.get("date") || prev.date,
      time: params.get("time") || prev.time,
      passengers: params.get("passengers") ? Number(params.get("passengers")) : prev.passengers,
      vehicle: params.get("vehicle") || prev.vehicle,
    }))

    if (params.get("pickup") && params.get("drop")) {
      setStep(2)
    }

    // if coords present in URL, compute distance
    const pLat = params.get("pickupLat")
    const pLng = params.get("pickupLng")
    const dLat = params.get("dropLat")
    const dLng = params.get("dropLng")
    if (pLat && pLng && dLat && dLng) {
      try {
        const pl = Number(pLat)
        const pg = Number(pLng)
        const dl = Number(dLat)
        const dg = Number(dLng)
        fetch(`/api/map/directions?pickupLat=${encodeURIComponent(pl)}&pickupLng=${encodeURIComponent(pg)}&dropLat=${encodeURIComponent(dl)}&dropLng=${encodeURIComponent(dg)}`)
          .then((r) => r.json())
          .then((json) => {
            if (json?.ok && typeof json.distanceMeters === "number") {
              update({ distanceKm: Math.max(1, Math.round(json.distanceMeters / 1000)) })
            }
          })
          .catch(() => {})
      } catch {}
    }

    toast.success("Prefilled booking fields from Home — you can edit them.")
    setInitialValuesLoaded(true)
  }, [initialValuesLoaded])

  const fare = useMemo(() => {
    return estimateFare({
      vehicleSlug: values.vehicle,
      distanceKm: values.distanceKm,
      tripType: values.tripType,
    })
  }, [values.vehicle, values.distanceKm, values.tripType])

  function update(changes: Record<string, any>) {
    setValues((v: any) => ({ ...v, ...changes }))
  }

  function submitBooking() {
    const id = generateBookingId()
    const selectedVehicle = vehicles.find((item) => item.slug === values.vehicle)
    const booking = {
      id,
      ...values,
      vehicleName: selectedVehicle?.name || values.vehicle,
      vehicleType: selectedVehicle?.type || "",
      fare: fare?.total || 0,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    }
    const all = JSON.parse(localStorage.getItem("angel_bookings") || "[]")
    all.unshift(booking)
    localStorage.setItem("angel_bookings", JSON.stringify(all))
    localStorage.removeItem("angel_booking_draft")
    router.push(`/booking/success?id=${encodeURIComponent(id)}`)
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Booking"
          title="Book your ride in minutes"
          description="A premium booking experience for airport transfers, local rides, outstation trips and more. Move through the steps, select a vehicle, and confirm with confidence."
          align="left"
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr,0.35fr]">
          <div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Trip details", active: step === 1 },
                { label: "Choose vehicle", active: step === 2 },
                { label: "Review & confirm", active: step === 3 },
              ].map((tab) => (
                <div
                  key={tab.label}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    tab.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-6">
              {step === 1 && (
                <Card className="border-border p-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setStep(2)
                    }}
                    className="space-y-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup location</Label>
                        <div>
                          <Input
                            id="pickup"
                            value={values.pickup}
                            onChange={(e) => update({ pickup: e.target.value })}
                            placeholder="Enter pickup location"
                          />

                          <div className="mt-2 flex flex-wrap gap-2">
                            {popularLocations.map((loc) => (
                              <button
                                key={`bf-pickup-${loc}`}
                                type="button"
                                onClick={() => update({ pickup: loc })}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") update({ pickup: loc })
                                }}
                                className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-pressed={values.pickup === loc}
                              >
                                {loc}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="drop">Drop location</Label>
                        <div>
                          <Input
                            id="drop"
                            value={values.drop}
                            onChange={(e) => update({ drop: e.target.value })}
                            placeholder="Enter drop location"
                          />

                          <div className="mt-2 flex flex-wrap gap-2">
                            {popularLocations.map((loc) => (
                              <button
                                key={`bf-drop-${loc}`}
                                type="button"
                                onClick={() => update({ drop: loc })}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") update({ drop: loc })
                                }}
                                className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-foreground hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-pressed={values.drop === loc}
                              >
                                {loc}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="date">Pickup date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={values.date}
                          onChange={(e) => update({ date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Pickup time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={values.time}
                          onChange={(e) => update({ time: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passengers</Label>
                        <select
                          id="passengers"
                          value={values.passengers}
                          onChange={(e) => update({ passengers: Number(e.target.value) })}
                          className="input"
                        >
                          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Passenger" : "Passengers"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="distanceKm">Approx distance (km)</Label>
                        <Input
                          id="distanceKm"
                          type="number"
                          min={1}
                          value={values.distanceKm}
                          onChange={(e) => update({ distanceKm: Number(e.target.value) })}
                          placeholder="e.g. 50"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Trip type</Label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {tripTypes.map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => update({ tripType: type.id })}
                              className={`rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                                values.tripType === type.id
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border bg-background text-foreground hover:border-primary"
                              }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {values.tripType === "round-trip" ? (
                      <div className="space-y-2">
                        <Label htmlFor="returnDate">Return date</Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={values.returnDate}
                          onChange={(e) => update({ returnDate: e.target.value })}
                        />
                      </div>
                    ) : null}

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" type="button" onClick={() => setStep(1)}>
                        Reset
                      </Button>
                      <Button type="submit">Next: Choose vehicle</Button>
                    </div>
                  </form>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-border p-6">
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-semibold">Choose your vehicle</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Pick the vehicle that fits your group size, luggage and journey type.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {vehicles.map((vehicle) => (
                        <label
                          key={vehicle.slug}
                          className={`block rounded-3xl border bg-background p-5 shadow-sm transition-all hover:border-primary hover:shadow-md ${
                            values.vehicle === vehicle.slug ? "border-primary bg-primary/10" : "border-border"
                          }`}
                        >
                          <input
                            type="radio"
                            name="vehicle"
                            value={vehicle.slug}
                            checked={values.vehicle === vehicle.slug}
                            onChange={() => update({ vehicle: vehicle.slug })}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-lg font-semibold">{vehicle.name}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{vehicle.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">₹{vehicle.baseFare}</p>
                              <p className="text-sm text-muted-foreground">{vehicle.perKm}/km</p>
                            </div>
                          </div>
                          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{vehicle.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {vehicle.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-muted px-2 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" type="button" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button type="button" onClick={() => setStep(3)}>
                        Next: Review booking
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {step === 3 && (
                <Card className="border-border p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold">Review & confirm</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Confirm your ride details and book with guaranteed service and transparent pricing.
                      </p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-4 rounded-3xl border border-border bg-muted p-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Route</p>
                          <p className="mt-2 font-semibold text-foreground">{values.pickup || "Pickup not set"}</p>
                          <p className="text-sm text-muted-foreground">to</p>
                          <p className="font-semibold text-foreground">{values.drop || "Drop not set"}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Schedule</p>
                          <p className="mt-2 font-semibold text-foreground">{values.date || "Date missing"}</p>
                          <p className="text-sm text-muted-foreground">{values.time || "Time missing"}</p>
                        </div>
                      </div>
                      <div className="space-y-4 rounded-3xl border border-border bg-muted p-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Vehicle</p>
                          <p className="mt-2 font-semibold text-foreground">{vehicles.find((v) => v.slug === values.vehicle)?.name}</p>
                          <p className="text-sm text-muted-foreground">{vehicles.find((v) => v.slug === values.vehicle)?.type}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estimate</p>
                          <p className="mt-2 text-2xl font-bold text-foreground">{fare ? formatINR(fare.total) : "Calculating…"}</p>
                          <p className="text-sm text-muted-foreground">Based on {values.distanceKm} km</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={values.name}
                          onChange={(e) => update({ name: e.target.value })}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={values.phone}
                          onChange={(e) => update({ phone: e.target.value })}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email">Email (optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={values.email}
                          onChange={(e) => update({ email: e.target.value })}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-foreground">Payment method</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "cash", label: "Cash" },
                          { id: "upi", label: "UPI" },
                          { id: "card", label: "Card" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => update({ payment: option.id })}
                            className={`rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                              values.payment === option.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-background text-foreground hover:border-primary"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button variant="outline" type="button" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button type="button" onClick={submitBooking}>
                        Confirm booking
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="border-border p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Quick summary</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Current trip type</span>
                  <span className="font-semibold text-foreground">{values.tripType}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Selected vehicle</span>
                  <span className="font-semibold text-foreground">{vehicles.find((v) => v.slug === values.vehicle)?.name}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Estimated fare</span>
                  <span className="font-semibold text-foreground">{fare ? formatINR(fare.total) : "—"}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">Distance</span>
                  <span className="font-semibold text-foreground">{values.distanceKm} km</span>
                </div>
              </div>
            </Card>

            <Card className="border-border p-6 bg-primary/5">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">Why book with us</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Instant booking confirmation with a reference ID</li>
                <li>Transparent fares and trusted local drivers</li>
                <li>Saved booking draft while you complete the form</li>
              </ul>
            </Card>
          </aside>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-muted p-6 text-sm leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Booking assistance</p>
          <p className="mt-2">
            Your booking progress is saved automatically. If you need help, call our support team at <a href="tel:+917984634461" className="font-semibold text-primary">+91 79846 34461</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

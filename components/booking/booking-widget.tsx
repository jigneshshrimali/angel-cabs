"use client"

import { useState } from "react"
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
  const [date, setDate] = useState(dt.date)
  const [time, setTime] = useState(dt.time)
  const [passengers, setPassengers] = useState(2)

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
    router.push(`/booking?${params.toString()}`)
  }

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

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Field icon={<MapPin className="h-4 w-4 text-primary" />} label="Pickup">
          <Input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup location"
            aria-label="Pickup location"
            className="border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </Field>
        <Field icon={<Navigation className="h-4 w-4 text-primary" />} label="Drop">
          <Input
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="Enter drop location"
            aria-label="Drop location"
            className="border-0 px-0 shadow-none focus-visible:ring-0"
          />
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

      <Button type="submit" size="lg" className="mt-4 h-12 w-full text-base font-semibold">
        <Search className="h-4 w-4" />
        Search Cabs
      </Button>
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

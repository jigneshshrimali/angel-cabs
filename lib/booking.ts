import { z } from "zod"
import { vehicles } from "@/lib/data"

export const tripTypes = [
  { id: "one-way", label: "One Way" },
  { id: "round-trip", label: "Round Trip" },
  { id: "hourly", label: "Hourly" },
  { id: "airport", label: "Airport" },
] as const

export type TripType = (typeof tripTypes)[number]["id"]

export const bookingSchema = z.object({
  tripType: z.enum(["one-way", "round-trip", "hourly", "airport"]),
  pickup: z.string().min(3, "Please enter a pickup location"),
  drop: z.string().min(3, "Please enter a drop location"),
  stops: z.array(z.string()).default([]),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  returnDate: z.string().optional(),
  vehicleSlug: z.string().min(1, "Select a vehicle"),
  passengers: z.number().int().min(1).max(20),
  luggage: z.number().int().min(0).max(20),
  distanceKm: z.number().min(1, "Enter approximate distance"),
  coupon: z.string().optional(),
  instructions: z.string().max(500).optional(),
  name: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  payment: z.enum(["cash", "upi", "card"]),
})

export type BookingValues = z.infer<typeof bookingSchema>

export const coupons: Record<string, { type: "percent" | "flat"; value: number }> = {
  ANGEL10: { type: "percent", value: 10 },
  ROUND15: { type: "percent", value: 15 },
  AIR199: { type: "flat", value: 199 },
  WEEKEND20: { type: "percent", value: 20 },
}

export type FareBreakdown = {
  baseFare: number
  distanceCharge: number
  taxesAndTolls: number
  discount: number
  total: number
  perKm: number
}

export function estimateFare(opts: {
  vehicleSlug: string
  distanceKm: number
  tripType: TripType
  coupon?: string
}): FareBreakdown | null {
  const vehicle = vehicles.find((v) => v.slug === opts.vehicleSlug)
  if (!vehicle) return null

  const roundMultiplier = opts.tripType === "round-trip" ? 2 : 1
  const distance = Math.max(1, opts.distanceKm) * roundMultiplier
  const baseFare = vehicle.baseFare
  const distanceCharge = Math.round(distance * vehicle.perKm)
  const subtotal = baseFare + distanceCharge
  const taxesAndTolls = Math.round(subtotal * 0.08)

  let discount = 0
  const code = opts.coupon?.trim().toUpperCase()
  if (code && coupons[code]) {
    const c = coupons[code]
    discount =
      c.type === "percent"
        ? Math.round((subtotal * c.value) / 100)
        : c.value
  }

  const total = Math.max(0, subtotal + taxesAndTolls - discount)
  return { baseFare, distanceCharge, taxesAndTolls, discount, total, perKm: vehicle.perKm }
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateBookingId() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `AC-${n}`
}

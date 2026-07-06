"use client"

import { useSearchParams } from "next/navigation"
import BookingFlow from "@/components/booking/booking-flow"

export default function BookingPage() {
  const params = useSearchParams()
  return <BookingFlow initialParams={Object.fromEntries(params.entries())} />
}

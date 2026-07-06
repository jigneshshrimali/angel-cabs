import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const params = useSearchParams()
  const id = params.get("id")

  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold">Booking Confirmed</h1>
        <p className="mt-4">Your booking ID: <strong>{id}</strong></p>
        <p className="mt-2">We've saved your booking. You can track it on the Track Booking page.</p>
        <div className="mt-6">
          <Link href="/booking/track" className="btn">Track Booking</Link>
        </div>
      </div>
    </div>
  )
}

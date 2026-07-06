"use client"

import { useMemo, useState } from "react"
import { SectionHeading } from "@/components/shared/section-heading"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { findBooking } from "@/lib/booking"

export default function TrackPage() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [otpMode, setOtpMode] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const searchLabel = useMemo(() => {
    if (query.startsWith("AC-")) return "Booking ID"
    if (/^[6-9]\d{9}$/.test(query)) return "Mobile number"
    if (query.includes("@")) return "Email"
    return "Booking ID, email or phone"
  }, [query])

  const onCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    if (otpMode && !otpSent) {
      setOtpSent(true)
      return
    }

    const found = findBooking({
      id: query.startsWith("AC-") ? query.trim() : undefined,
      email: query.includes("@") ? query.trim() : undefined,
      phone: /^[6-9]\d{9}$/.test(query) ? query.trim() : undefined,
    })

    setResult(found || { notFound: true })
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Track Booking"
          title="Check your booking status instantly"
          description="Enter your booking ID to view ride details, pickup location, drop location and confirmation status."
          align="left"
        />

        <Card className="border-border p-6">
          <form onSubmit={onCheck} className="grid gap-4 sm:grid-cols-[1.6fr,0.8fr]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter booking ID, email or 10-digit mobile"
              aria-label="Booking lookup"
            />
            <Button type="submit">Check status</Button>
          </form>
          {query && !otpMode && (
            <div className="mt-3 space-y-2 rounded-3xl border border-border bg-muted p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Need secure access?</p>
              <p>Tap below to verify your phone with OTP before you retrieve booking details.</p>
              <Button type="button" variant="outline" onClick={() => setOtpMode(true)}>
                Verify with OTP
              </Button>
            </div>
          )}
          {otpMode && (
            <div className="mt-3 rounded-3xl border border-border bg-muted p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">OTP verification</p>
              <p className="mt-2">Enter the 6-digit code sent to your phone number to continue.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1.5fr,0.8fr]">
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  aria-label="OTP code"
                />
                <Button type="button" variant="secondary" onClick={() => setOtpSent(true)}>
                  {otpSent ? "Resend code" : "Send code"}
                </Button>
              </div>
              <p className="mt-3 text-xs">This is a demo flow: OTP will not be actually delivered.</p>
            </div>
          )}
        </Card>

        {result && (
          <Card className="mt-6 border-border p-6">
            {result.notFound ? (
              <div className="space-y-3">
                <p className="text-lg font-semibold">Booking not found</p>
                <p className="text-sm text-muted-foreground">
                  Please verify your booking ID, email or phone number and try again. If you need help, reach out to support.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-semibold">Booking {result.id}</p>
                <p className="text-sm text-muted-foreground">
                  Status: <span className="font-semibold text-foreground">{result.status || "Confirmed"}</span>
                </p>
                <div className="grid gap-3 rounded-3xl border border-border bg-muted p-4 text-sm">
                  <div>
                    <p className="font-semibold">Passenger</p>
                    <p>{result.name} • {result.phone}{result.email ? ` • ${result.email}` : ""}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Route</p>
                    <p>{result.tripType} trip from {result.pickup} to {result.drop}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Schedule</p>
                    <p>{result.date} at {result.time}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Fare estimate</p>
                    <p>₹{result.fare}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

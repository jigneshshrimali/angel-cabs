"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatINR, findBooking, type StoredBooking } from "@/lib/booking"

type BookingConfirmationProps = {
  bookingId?: string
  recoveryPrefill?: string
}

export default function BookingConfirmation({ bookingId, recoveryPrefill }: BookingConfirmationProps) {
  const [booking, setBooking] = useState<StoredBooking | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [copyState, setCopyState] = useState("Copy booking ID")
  const [recoveryValue, setRecoveryValue] = useState("")
  const [recoveryMessage, setRecoveryMessage] = useState("")
  const [otpMode, setOtpMode] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpInput, setOtpInput] = useState("")
  const [otpSecondsLeft, setOtpSecondsLeft] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!bookingId) {
      setBooking(null)
      setLoaded(true)
      return
    }

    const found = findBooking({ id: bookingId })
    setBooking(found ?? null)
    setLoaded(true)
  }, [bookingId])

  useEffect(() => {
    if (!recoveryPrefill) return
    setRecoveryValue(recoveryPrefill)
    // auto-attempt recovery for convenience
    setTimeout(() => attemptRecovery(), 250)
  }, [recoveryPrefill])

  const shareMessage = useMemo(() => {
    if (!booking) return ""
    return `Angel Cabs booking confirmed: ${booking.id}. Pickup ${booking.pickup}, drop ${booking.drop}, ${booking.date} at ${booking.time}. Fare ${formatINR(booking.fare)}.`
  }, [booking])

  const copyBookingId = async () => {
    const idToCopy = booking?.id || bookingId
    if (!idToCopy) return
    await navigator.clipboard.writeText(idToCopy)
    setCopyState("Copied")
    window.setTimeout(() => setCopyState("Copy booking ID"), 2000)
  }

  const attemptRecovery = () => {
    if (!recoveryValue.trim()) return
    setRecoveryMessage("")
    const val = recoveryValue.trim()
    let found: StoredBooking | undefined
    if (val.includes("@")) {
      found = findBooking({ email: val })
    } else {
      // try as phone, then as id
      found = findBooking({ phone: val }) || findBooking({ id: val })
    }
    if (found) {
      setBooking(found)
      setRecoveryMessage("Booking found and loaded below.")
      toast.success("Booking recovered — loaded below.")
      setOtpMode(false)
      setOtpSent(false)
      // redirect to canonical success URL with id so the page shows the id param
      try {
        router.push(`/booking/success?id=${encodeURIComponent(found.id)}`)
      } catch {}
    } else {
      setRecoveryMessage("No booking found for this email/phone.")
    }
  }

  const sendOtp = () => {
    const val = recoveryValue.trim()
    if (!val) return
    // generate 6-digit code and store in sessionStorage keyed by value
    const code = String(Math.floor(100000 + Math.random() * 900000))
    try {
      sessionStorage.setItem(`angel_otp_${val}`, code)
      sessionStorage.setItem(`angel_otp_ts_${val}`, String(Date.now()))
      setOtpSent(true)
      setOtpMode(true)
      // set TTL (seconds) for demo OTP (5 minutes)
      const ttl = 300
      setOtpSecondsLeft(ttl)
      // start countdown
      const tick = setInterval(() => {
        setOtpSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(tick)
            // expire stored OTP
            try {
              sessionStorage.removeItem(`angel_otp_${val}`)
              sessionStorage.removeItem(`angel_otp_ts_${val}`)
            } catch {}
            setOtpMode(false)
            setOtpSent(false)
            toast.error("OTP expired. Please resend.")
            return 0
          }
          return s - 1
        })
      }, 1000)
      // show the code in a toast for demo (in real app send via SMS/Email)
      toast.success(`Demo OTP sent: ${code}`)
    } catch {
      setRecoveryMessage("Unable to send OTP in this browser.")
    }
  }

  const verifyOtp = () => {
    const val = recoveryValue.trim()
    if (!val || !otpInput.trim()) return
    const stored = sessionStorage.getItem(`angel_otp_${val}`)
    if (stored && stored === otpInput.trim()) {
      // OTP matches — recover booking by phone/email
      const found = val.includes("@") ? findBooking({ email: val }) : findBooking({ phone: val })
      if (found) {
        setBooking(found)
        setRecoveryMessage("Booking recovered via OTP.")
        toast.success("Booking recovered via OTP.")
        // redirect to canonical success URL with id
        try {
          router.push(`/booking/success?id=${encodeURIComponent(found.id)}`)
        } catch {}
      } else {
        setRecoveryMessage("OTP verified but no booking found for this contact.")
      }
    } else {
      setRecoveryMessage("Invalid OTP. Try again.")
    }
  }

  return (
    <Card className="mt-10 border-border p-8">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Booking details</p>
        {bookingId ? (
          booking ? (
            <>
              <p className="text-lg font-semibold text-foreground">Your ride is confirmed</p>
              <p className="text-3xl font-bold text-primary">{booking.id}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Passenger</p>
                  <p className="mt-2 font-semibold text-foreground">{booking.name}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
                  <p className="mt-2 text-sm text-foreground">{booking.phone}{booking.email ? ` • ${booking.email}` : ""}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Route</p>
                  <p className="mt-2 font-semibold text-foreground">{booking.pickup} to {booking.drop}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Schedule</p>
                  <p className="mt-2 text-sm text-foreground">
                    {booking.date} at {booking.time}
                    {booking.returnDate ? ` • Return ${booking.returnDate}` : ""}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Vehicle</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{booking.vehicleName}</p>
                  <p className="text-sm text-muted-foreground">{booking.vehicleType}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Fare</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{formatINR(booking.fare)}</p>
                  <p className="mt-3 text-sm text-muted-foreground">Status: {booking.status}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button type="button" onClick={copyBookingId} variant="outline">
                  {copyState}
                </Button>
                {booking.email ? (
                  <Button asChild variant="secondary">
                    <a
                      href={`mailto:${booking.email}?subject=${encodeURIComponent(
                        `Angel Cabs booking ${booking.id}`,
                      )}&body=${encodeURIComponent(shareMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Email booking details
                    </a>
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Email unavailable
                  </Button>
                )}
                <Button asChild variant="ghost">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Share via WhatsApp
                  </a>
                </Button>
                <Button type="button" variant="outline" onClick={() => window.print()}>
                  Print / Save PDF
                </Button>
              </div>
            </>
          ) : loaded ? (
            <>
                <p className="text-lg font-semibold text-foreground">Booking not found</p>
                <p className="mt-2 text-2xl font-bold text-primary">{bookingId}</p>
                <p className="text-sm text-muted-foreground">
                  We could not locate the booking details for this booking ID. Try tracking the ride or contact support.
                </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Loading your booking details…</p>
          )
        ) : (
          <>
            <p className="text-lg font-semibold text-foreground">Booking reference is missing</p>
            <p className="text-sm text-muted-foreground">
              Please return to the booking page and try again, or track your ride with an active booking ID.
            </p>
          </>
        )}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/booking/track">Track Booking</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/booking">Book another ride</Link>
          </Button>
        </div>

        {bookingId && !booking ? (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button type="button" onClick={copyBookingId} variant="outline">
                {copyState}
              </Button>
              <span className="text-sm text-muted-foreground">Copy reference or try recovery below.</span>
            </div>

            <div className="mx-auto mt-2 max-w-md space-y-2 text-center">
              <input
                value={recoveryValue}
                onChange={(e) => setRecoveryValue(e.target.value)}
                placeholder="Enter email or phone to find booking"
                className="w-full rounded-md border border-border p-2 text-sm"
              />
              <div className="flex items-center justify-center gap-2">
                <Button type="button" onClick={attemptRecovery}>
                  Find booking
                </Button>
                <Button type="button" variant="outline" onClick={() => setRecoveryValue("")}>Clear</Button>
              </div>
              {recoveryMessage ? <p className="text-sm text-muted-foreground">{recoveryMessage}</p> : null}

              {/* OTP demo flow */}
              {!booking && recoveryValue ? (
                <div className="mt-4 space-y-2">
                  {!otpMode ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button type="button" variant="outline" onClick={sendOtp}>
                        Send OTP
                      </Button>
                      <span className="text-sm text-muted-foreground">Verify via SMS/Email (demo)</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full rounded-md border border-border p-2 text-sm"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <Button type="button" onClick={verifyOtp}>
                          Verify OTP
                        </Button>
                        <Button type="button" variant="outline" onClick={() => { setOtpMode(false); setOtpSent(false); setOtpInput("") }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  )
}

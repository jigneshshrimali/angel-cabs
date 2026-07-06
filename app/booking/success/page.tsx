import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import BookingConfirmation from "@/components/booking/booking-confirmation"

interface SuccessPageProps {
  searchParams: { id?: string }
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const id = searchParams.id

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Success"
          title="Your Angel Cabs booking is confirmed"
          description="Thank you for booking with us. Your ride is now confirmed and backed by our reliable service guarantee."
          align="left"
        />

        <Card className="mt-10 border-border p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Confirmation received</p>
          <p className="mt-4 text-3xl font-bold text-foreground">Booking confirmed</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your booking has been successfully created. Use the reference below to track the ride and review trip details.
          </p>
          <p className="mt-6 rounded-3xl bg-secondary/5 px-5 py-4 text-2xl font-semibold text-foreground">
            {id ? id : "Reference unavailable"}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/booking/track">Track Booking</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/booking">Book another ride</Link>
            </Button>
          </div>
        </Card>

        <BookingConfirmation bookingId={id} />
      </div>
    </div>
  )
}

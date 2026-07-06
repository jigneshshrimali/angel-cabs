import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Plane, Repeat, ShieldCheck, Sparkles, Star } from "lucide-react"
import { siteConfig } from "@/lib/site"
import { BookingWidget } from "@/components/booking/booking-widget"

const trustPoints = [
  { icon: ShieldCheck, label: "Safe" },
  { icon: Star, label: "Reliable" },
  { icon: Sparkles, label: "Comfortable" },
  { icon: Clock, label: "On Time" },
]

const quickTrips = [
  {
    label: "One Way",
    description: "Point-to-point rides across the city or outstation.",
    href: "/booking?tripType=one-way",
    icon: MapPin,
  },
  {
    label: "Round Trip",
    description: "Return trips with flexible pickup and drop.",
    href: "/booking?tripType=round-trip",
    icon: Repeat,
  },
  {
    label: "Hourly",
    description: "Book by the hour for city travel and errands.",
    href: "/booking?tripType=hourly",
    icon: Clock,
  },
  {
    label: "Airport",
    description: "Flight-friendly transfers with tracking and wait time.",
    href: "/booking?tripType=airport",
    icon: Plane,
  },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-cars.png"
          alt="Angel Cabs white sedan and SUV parked at the Rajkot waterfront at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/20" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-14 sm:px-6 lg:grid-cols-[1fr,0.95fr] lg:items-start lg:gap-12 lg:pb-20 lg:pt-24">
        <div className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {siteConfig.tagline}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight text-background sm:text-5xl lg:text-6xl">
            Your Trusted Travel Partner in <span className="text-primary">Rajkot &amp; Gujarat</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-background/80 sm:text-lg">
            {siteConfig.hindiTagline} — fast booking, verified drivers, and transparent fares for local rides,
            airport transfers, hourly rentals and outstation journeys.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-3 rounded-3xl bg-background/10 px-4 py-3 text-sm text-background shadow-sm">
                <point.icon className="h-5 w-5 text-primary" aria-hidden />
                <span>{point.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-[2rem] border border-border bg-background/95 p-6 shadow-xl shadow-slate-950/10 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Book Your Ride</p>
                  <p className="mt-2 text-base font-semibold text-foreground">Start with pickup, drop and schedule information below.</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Quick booking
                </span>
              </div>
              <div className="mt-6">
                <BookingWidget />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pl-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-background">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
            Best fare, fastest booking
          </div>
          <div className="rounded-[1.75rem] border border-border bg-background/95 p-5 shadow-xl shadow-slate-950/10">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Need help choosing?</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Use the booking form above for custom trips, or explore our airport and hourly ride options here.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link href="/services/airport-transfer" className="rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
                Airport transfer
              </Link>
              <Link href="/services/local-taxi" className="rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
                Hourly rides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

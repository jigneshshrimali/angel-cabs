import Image from "next/image"
import { ShieldCheck, Clock, Sparkles, Star } from "lucide-react"
import { siteConfig } from "@/lib/site"
import { BookingWidget } from "@/components/booking/booking-widget"

const trustPoints = [
  { icon: ShieldCheck, label: "Safe" },
  { icon: Star, label: "Reliable" },
  { icon: Sparkles, label: "Comfortable" },
  { icon: Clock, label: "On Time" },
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

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-20 lg:pt-24">
        <div className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {siteConfig.tagline}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight text-background sm:text-5xl lg:text-6xl">
            Your Trusted Travel Partner in{" "}
            <span className="text-primary">Rajkot &amp; All Gujarat</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-background/80 sm:text-lg">
            {siteConfig.hindiTagline} — safe, reliable and comfortable cab service for local
            rides, outstation trips, airport transfers and curated tour packages.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {trustPoints.map((t) => (
              <li
                key={t.label}
                className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3.5 py-1.5 text-sm font-medium text-background backdrop-blur"
              >
                <t.icon className="h-4 w-4 text-primary" aria-hidden />
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-background">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" aria-hidden />
            Book Your Ride
          </div>
          <BookingWidget />
        </div>
      </div>
    </section>
  )
}

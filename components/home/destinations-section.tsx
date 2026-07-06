import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock } from "lucide-react"
import { destinations } from "@/lib/data"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

export function DestinationsSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Outstation Destinations"
          title="Popular routes from Rajkot"
          description="Ahmedabad, Dwarka, Somnath, Diu, Surat and all of Gujarat — one-way or round-trip."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.05}>
              <Link
                href={`/booking?drop=${encodeURIComponent(d.name)}&tripType=outstation`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={d.image || "/placeholder.svg"}
                    alt={d.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-background">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="mt-1 text-sm text-background/80">{d.blurb}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> {d.distanceKm} km
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" aria-hidden /> {d.duration}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

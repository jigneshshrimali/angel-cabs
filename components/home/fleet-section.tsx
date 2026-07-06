import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { vehicles } from "@/lib/data"
import { SectionHeading } from "@/components/shared/section-heading"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/shared/reveal"

export function FleetSection() {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Fleet"
          title="Clean, comfortable & well-maintained cars"
          description="Choose from sedans, SUVs and vans — every vehicle sanitized and driven by a verified professional."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle, i) => (
            <Reveal key={vehicle.slug} delay={i * 0.05}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/fleet">
              View Full Fleet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

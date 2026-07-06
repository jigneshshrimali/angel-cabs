import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { vehicles } from "@/lib/data"

export default function FleetPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Our Fleet"
            title="A car for every trip and every budget"
            description="Choose from sedans, SUVs, vans and premium rides — all well-maintained, sanitized and ready for Rajkot, airport transfers, outstation journeys and tours."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Our fleet includes comfortable sedans, spacious MPVs and large group vehicles with professional drivers. Every ride is designed for safety, reliability and comfort.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/booking">Book Your Vehicle</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  )
}

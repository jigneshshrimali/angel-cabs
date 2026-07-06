import Image from "next/image"
import Link from "next/link"
import { Users, Luggage, Snowflake, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Vehicle } from "@/lib/data"
import { formatINR } from "@/lib/booking"

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {vehicle.popular ? (
          <Badge className="absolute left-3 top-3 z-10">Popular</Badge>
        ) : null}
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{vehicle.type}</p>
          <h3 className="text-lg font-bold text-foreground">{vehicle.name}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> {vehicle.seats}</span>
          <span className="inline-flex items-center gap-1.5"><Luggage className="h-4 w-4 text-primary" /> {vehicle.luggage}</span>
          {vehicle.ac ? (
            <span className="inline-flex items-center gap-1.5"><Snowflake className="h-4 w-4 text-primary" /> AC</span>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-extrabold text-foreground">{formatINR(vehicle.perKm)}</span>
            <span className="text-sm text-muted-foreground">/km</span>
          </div>
          <Link
            href={`/booking?vehicle=${vehicle.slug}`}
            className={cn("inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline")}
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

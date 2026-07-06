import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/lib/data"
import { Card } from "@/components/ui/card"

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{service.short}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-foreground transition-colors hover:text-secondary"
        >
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </Card>
  )
}

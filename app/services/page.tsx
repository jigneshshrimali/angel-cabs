import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { services, features } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ServicesIndexPage() {
  return (
    <section className="bg-background">
      <div className="container-page mx-auto pt-16 sm:pt-20">
        <div className="rounded-[2rem] border border-border bg-primary/5 p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Services"
                title="Premium cab services for every journey in Gujarat"
                description="Find the right option for airport transfers, local rides, outstation trips, corporate travel, wedding transport, and curated tour packages."
                align="left"
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Angel Cabs brings premium vehicles, verified drivers and transparent pricing together in one easy booking experience.
                Choose your service, compare benefits and book the perfect ride with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/booking">Start booking</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact support</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-[2rem] border border-border bg-background p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">What makes Angel Cabs different</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.slice(0, 4).map((feature) => (
                  <div key={feature.title} className="rounded-3xl border border-border bg-muted p-5">
                    <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="group overflow-hidden border border-border p-0 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative overflow-hidden bg-muted">
                <img src={service.image} alt={service.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3 text-primary">
                  <service.icon className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.18em]">{service.short}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="sm">
                    <Link href={`/services/${service.slug}`}>Explore</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/booking">Book now</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-border bg-muted p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Service commitment</p>
              <h3 className="mt-3 text-3xl font-bold text-foreground">Fast, safe and reliable rides from local experts</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">What you get with every booking</p>
              <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>Verified drivers with local route knowledge</li>
                <li>Transparent pricing with no hidden fees</li>
                <li>Clean, sanitized vehicles and on-time pickups</li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">Ready for your next trip?</p>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/booking">Book a cab now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Request custom support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

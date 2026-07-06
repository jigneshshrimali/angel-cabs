import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { services } from "@/lib/data"
import { serviceNav } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Props = {
  params: { service: string }
}

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }))
}

export default function ServicePage({ params }: Props) {
  const service = services.find((item) => item.slug === params.service)
  if (!service) {
    notFound()
  }

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container-page mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.35fr,0.65fr]">
          <div className="space-y-10">
            <div className="rounded-[2rem] border border-border bg-primary/5 p-10 shadow-sm">
              <SectionHeading
                eyebrow="Service"
                title={service.title}
                description={service.short}
                align="left"
              />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/booking">Book this service</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact support</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {service.highlights.map((highlight) => (
                <Card key={highlight} className="rounded-3xl border border-border bg-muted p-6">
                  <p className="font-semibold text-foreground">{highlight}</p>
                </Card>
              ))}
            </div>

            <div className="rounded-[2rem] border border-border bg-muted p-10 shadow-sm">
              <div className="flex items-center gap-3 text-primary">
                <service.icon className="h-6 w-6" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em]">Why it works</p>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-foreground">Reliable service with every booking</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This service is built for travellers who want smooth, secure and efficient journeys across Gujarat.
                Enjoy flexible pickup, verified drivers, and a fast confirmation experience.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-background p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Service</p>
                  <p className="mt-3 text-xl font-semibold text-foreground">{service.title}</p>
                </div>
                <div className="rounded-3xl bg-background p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Best for</p>
                  <p className="mt-3 text-xl font-semibold text-foreground">{service.short}</p>
                </div>
                <div className="rounded-3xl bg-background p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Support</p>
                  <p className="mt-3 text-xl font-semibold text-foreground">24/7</p>
                </div>
              </div>
            </div>

            <Card className="rounded-[2rem] border border-border bg-background p-10 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">What’s included</h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  Reliable driver with local route knowledge
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  Clean, sanitized vehicle with comfortable seating
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  Transparent fare estimate and no hidden fees
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                  Easy booking with instant confirmation
                </li>
              </ul>
            </Card>
          </div>

          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="rounded-[2rem] border border-border bg-background p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Explore services</p>
                <div className="mt-4 space-y-2">
                  {serviceNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-primary/10 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[2rem] border border-border bg-primary/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Need help?</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">Book faster with expert support</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  If you have a special request or large group, our travel team is ready to assist.
                </p>
                <div className="mt-6 space-y-3">
                  <Button asChild size="sm">
                    <Link href="/booking">Book now</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/contact">Contact support</Link>
                  </Button>
                </div>
              </Card>

              <Card className="rounded-[2rem] border border-border bg-muted p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Quick facts</p>
                <div className="mt-4 grid gap-4">
                  <div className="rounded-3xl bg-background p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Available for</p>
                    <p className="mt-2">All city and intercity travel</p>
                  </div>
                  <div className="rounded-3xl bg-background p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Travel support</p>
                    <p className="mt-2">24/7 booking and roadside assistance</p>
                  </div>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

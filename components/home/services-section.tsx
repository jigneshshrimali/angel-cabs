import { services } from "@/lib/data"
import { SectionHeading } from "@/components/shared/section-heading"
import { ServiceCard } from "@/components/shared/service-card"
import { Reveal } from "@/components/shared/reveal"

export function ServicesSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything you need to get moving"
          description="From quick city hops to multi-day Gujarat tours, Angel Cabs has a service tailored to your journey."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

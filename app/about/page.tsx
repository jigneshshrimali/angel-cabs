import { SectionHeading } from "@/components/shared/section-heading"
import { CtaBanner } from "@/components/shared/cta-banner"

export default function AboutPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="About Us"
          title="Rajkot’s trusted cab service for local and outstation travel"
          description="Angel Cabs offers safe, reliable and comfortable rides across Gujarat with professional drivers and transparent pricing."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-start">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Founded in Rajkot, Angel Cabs provides premium cab services for airport transfers, hourly local rides, outstation trips and curated tour packages.
            </p>
            <p>
              Our team focuses on punctuality, clean vehicles and courteous drivers, so every journey is comfortable and stress-free.
            </p>
            <p>
              Whether you need a ride to the airport, a corporate shuttle, or a family tour vehicle, we offer flexible options and transparent fares.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-muted p-8 text-sm leading-relaxed text-foreground">
            <p className="font-semibold">Why choose Angel Cabs?</p>
            <ul className="mt-4 space-y-3">
              <li>24x7 availability across Rajkot and Gujarat</li>
              <li>Verified drivers with clean, sanitized cars</li>
              <li>No hidden charges, easy online booking</li>
              <li>Dedicated support via phone and WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>
      <CtaBanner />
    </section>
  )
}

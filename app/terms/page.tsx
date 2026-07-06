import { SectionHeading } from "@/components/shared/section-heading"

export default function TermsPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Terms & Conditions"
          title="Terms of service for Angel Cabs bookings"
          description="These terms govern your use of the booking platform, cab services and support from Angel Cabs."
          align="left"
        />

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>Bookings are subject to availability and confirmation by Angel Cabs.</p>
          <p>Fares displayed are estimates and may vary slightly based on actual route, tolls and waiting time.</p>
          <p>Cancellations and refunds are managed according to our cancellation policy and may incur a fee if requested within 2 hours of pickup.</p>
          <p>By using the website, you agree to provide accurate contact information and to comply with local traffic and safety regulations.</p>
        </div>
      </div>
    </section>
  )
}

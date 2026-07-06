import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { offers } from "@/lib/content"

export default function OffersPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Offers"
          title="Special discounts for your next ride"
          description="Save on your next cab booking with seasonal offers, first-ride discounts and airport transfer deals."
          align="left"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.code} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{offer.title}</p>
                  <p className="mt-3 text-3xl font-bold text-foreground">{offer.discount}</p>
                </div>
                <span className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  offer.color === "primary" ? "bg-primary text-primary-foreground" : offer.color === "success" ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"
                }`}>
                  {offer.code}
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
              <Button asChild className="mt-6 w-full justify-center">
                <Link href="/booking">Use Offer</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

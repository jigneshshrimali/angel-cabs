import { SectionHeading } from "@/components/shared/section-heading"
import { pricingRows } from "@/lib/content"
import { Card } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent rates for every ride"
          description="Choose the right vehicle for your trip. Our pricing is clear: local, outstation and airport transfer rates are shown up front with no hidden fees."
          align="left"
        />

        <Card className="mt-10 overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-muted text-sm text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Local</th>
                <th className="px-6 py-4">Outstation</th>
                <th className="px-6 py-4">Airport Transfer</th>
              </tr>
            </thead>
            <tbody>
              {pricingRows.map((row) => (
                <tr key={row.vehicle} className="border-t border-border">
                  <td className="px-6 py-5 font-semibold text-foreground">{row.vehicle}</td>
                  <td className="px-6 py-5 text-foreground">{row.local}</td>
                  <td className="px-6 py-5 text-foreground">{row.outstation}</td>
                  <td className="px-6 py-5 text-foreground">{row.airport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  )
}

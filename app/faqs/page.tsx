import { SectionHeading } from "@/components/shared/section-heading"
import { FaqJsonLd } from "@/components/seo/json-ld"
import { faqs } from "@/lib/content"
import { Card } from "@/components/ui/card"

export default function FaqsPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Find quick answers about booking, fares, payments, cancellations and our service coverage."
          align="left"
        />

        <div className="mt-10 grid gap-5">
          {faqs.map((faq) => (
            <Card key={faq.question} className="p-6">
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
      <FaqJsonLd faqs={faqs} />
    </section>
  )
}

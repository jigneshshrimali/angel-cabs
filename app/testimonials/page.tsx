import { SectionHeading } from "@/components/shared/section-heading"
import { testimonials } from "@/lib/data"
import { Card } from "@/components/ui/card"

export default function TestimonialsPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our customers say"
          description="Real reviews from travellers who trust Angel Cabs for safe, comfortable and reliable journeys."
          align="left"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  {testimonial.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">“{testimonial.quote}”</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

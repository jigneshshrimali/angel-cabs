import { Star, Quote } from "lucide-react"
import { testimonials } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

export function Testimonials({ compact = false }: { compact?: boolean }) {
  const items = compact ? testimonials.slice(0, 3) : testimonials
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our customers say"
          description="Real reviews from travellers who trust Angel Cabs for their journeys across Gujarat."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <Card className="flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-primary" aria-hidden />
                <div className="mt-3 flex" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={s < t.rating ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4 text-muted-foreground/30"}
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-pretty leading-relaxed text-foreground">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

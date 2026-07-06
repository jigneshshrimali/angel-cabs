import { MapPin, Car, ClipboardCheck, ThumbsUp } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

const steps = [
  { icon: MapPin, title: "Enter Trip Details", desc: "Add your pickup, drop, date, time and trip type." },
  { icon: Car, title: "Select Your Vehicle", desc: "Pick from sedans, SUVs or vans with a live fare estimate." },
  { icon: ClipboardCheck, title: "Confirm Booking", desc: "Review the fare breakdown and confirm in seconds." },
  { icon: ThumbsUp, title: "Enjoy the Ride", desc: "Track your driver and travel safe, comfortable & on time." },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary py-16 text-secondary-foreground sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Best UX Booking Flow"
          title="Book a cab in 4 easy steps"
          description="A fast, transparent booking experience — no hidden charges, no surprises."
          className="[&_h2]:text-background [&_p]:text-background/70"
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative rounded-2xl border border-background/10 bg-background/5 p-6">
                <span className="absolute right-5 top-5 text-4xl font-black text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <s.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold text-background">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-background/70">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

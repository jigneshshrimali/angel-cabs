import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { whyChooseUs, stats } from "@/lib/data"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

export function WhyChooseUs() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/services/corporate.png"
              alt="Professional Angel Cabs chauffeur with a premium car"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto h-5 w-5 text-secondary" aria-hidden />
                <p className="mt-1 text-xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-[11px] leading-tight text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="lg:pl-6">
          <SectionHeading
            align="left"
            eyebrow="Why Choose Us"
            title="Trusted by thousands of travellers"
            description="We combine local expertise with professional service to make every ride safe and hassle-free."
          />
          <ul className="mt-8 space-y-5">
            {whyChooseUs.map((item) => (
              <li key={item.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

import { features } from "@/lib/data"

export function FeatureStrip() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          {features.map((f) => (
            <li key={f.title} className="flex flex-col items-center gap-2 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-secondary">
                <f.icon className="h-6 w-6" aria-hidden />
              </span>
              <span className="text-sm font-semibold leading-tight text-foreground">{f.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

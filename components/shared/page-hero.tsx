import { Breadcrumbs, type Crumb } from "@/components/shared/breadcrumbs"

type Props = {
  title: string
  description?: string
  crumbs: Crumb[]
  eyebrow?: string
}

export function PageHero({ title, description, crumbs, eyebrow }: Props) {
  return (
    <section className="border-b border-border bg-secondary text-secondary-foreground">
      <div className="container-page py-12 sm:py-16">
        <div className="mb-4 [&_a]:text-secondary-foreground/70 [&_span]:text-primary">
          <Breadcrumbs items={crumbs} />
        </div>
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
        ) : null}
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-secondary-foreground/70">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}

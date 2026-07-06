import { cn } from "@/lib/utils"

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-2xl text-center items-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}

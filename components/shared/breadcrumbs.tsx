import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", href: "/" }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          {full.map((item, i) => {
            const last = i === full.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                )}
                {!last ? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" /> : null}
              </li>
            )
          })}
        </ol>
      </nav>
      <BreadcrumbJsonLd items={full} />
    </>
  )
}

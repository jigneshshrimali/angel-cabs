import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label={`${siteConfig.name} home`}>
      <Image
        src="/images/angel-cabs-logo.png"
        alt=""
        width={44}
        height={44}
        className="h-10 w-10 object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-extrabold tracking-tight",
            invert ? "text-background" : "text-foreground",
          )}
        >
          ANGEL CABS
        </span>
        <span className={cn("text-[10px] font-medium uppercase tracking-[0.18em]", invert ? "text-background/70" : "text-muted-foreground")}>
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  )
}

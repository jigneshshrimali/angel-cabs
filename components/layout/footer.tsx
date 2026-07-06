import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { footerNav } from "@/lib/navigation"
import { siteConfig, telLink, whatsappLink } from "@/lib/site"
import { Newsletter } from "@/components/layout/newsletter"

export function Footer() {
  return (
    <footer className="mt-20 bg-secondary text-secondary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo invert />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary-foreground/70">
            Rajkot based premium cab service providing safe, reliable and comfortable travel across
            Gujarat — local rides, outstation trips, airport transfers and tour packages.
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a href={telLink()} className="inline-flex items-center gap-2.5 text-secondary-foreground/80 transition-colors hover:text-primary">
              <Phone className="h-4 w-4 text-primary" /> {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2.5 text-secondary-foreground/80 transition-colors hover:text-primary">
              <Mail className="h-4 w-4 text-primary" /> {siteConfig.email}
            </a>
            <p className="inline-flex items-start gap-2.5 text-secondary-foreground/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </span>
            </p>
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{group.label}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page pb-10">
        <Newsletter />
      </div>

      <div className="border-t border-background/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-secondary-foreground/60 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-medium uppercase tracking-wider text-secondary-foreground/70">
            Angel Cabs — Your Trusted Travel Partner
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-primary">Terms</Link>
            <a href={whatsappLink("Hi Angel Cabs, I'd like to book a ride.")} className="transition-colors hover:text-primary">WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

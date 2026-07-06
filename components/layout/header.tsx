"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"
import { mainNav, serviceNav } from "@/lib/navigation"
import { siteConfig, telLink } from "@/lib/site"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        scrolled ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" : "border-transparent bg-background",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.slice(0, 2).map((item) => (
            <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
              {item.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith("/services") && "text-primary",
              )}
            >
              Services
              <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen ? (
              <div
                role="menu"
                className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-lg">
                  {serviceNav.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      role="menuitem"
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {mainNav.slice(2).map((item) => (
            <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/booking/track" className="hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground lg:inline-flex">
            Track Booking
          </Link>
          <a
            href={telLink()}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary md:inline-flex"
          >
            <Phone className="h-4 w-4 text-primary" />
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/booking" className={cn(buttonVariants({ size: "lg" }), "hidden font-semibold sm:inline-flex")}>
            Book Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent",
                  isActive(item.href) && "bg-accent text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <p className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </p>
            {serviceNav.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                {s.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a href={telLink()} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                <Phone className="h-4 w-4" /> Call {siteConfig.phoneDisplay}
              </a>
              <Link href="/booking" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
                Book Your Ride
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "text-primary",
      )}
    >
      {children}
    </Link>
  )
}

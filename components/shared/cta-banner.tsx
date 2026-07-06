import Link from "next/link"
import { Phone, MessageCircle } from "lucide-react"
import { siteConfig, whatsappLink, telLink } from "@/lib/site"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-10 text-secondary-foreground sm:px-12 sm:py-14">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-balance text-2xl font-bold text-background sm:text-3xl">
                Book your ride today with Angel Cabs
              </h2>
              <p className="mt-2 max-w-xl text-background/70">
                Available 24x7 for local rides, outstation trips and airport transfers across Gujarat.
                Call now or book online in under a minute.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12">
                <Link href="/booking">Book Online</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-background/30 bg-transparent text-background hover:bg-background hover:text-secondary">
                <a href={telLink()}>
                  <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
                </a>
              </Button>
              <Button asChild size="lg" className="h-12 bg-success text-background hover:bg-success/90">
                <a href={whatsappLink("Hi Angel Cabs, I'd like to book a ride.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

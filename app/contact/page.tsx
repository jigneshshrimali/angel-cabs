import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch with Angel Cabs"
          description="Need help with a booking or want to request a custom cab service? Send us a message and we’ll get back to you quickly."
          align="left"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="p-6">
            <form className="space-y-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" />
              </div>
              <Button type="submit">Send message</Button>
            </form>
          </Card>

          <Card className="space-y-5 border-border p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Phone</p>
              <p className="mt-2 text-foreground">+91 79846 34461</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Email</p>
              <p className="mt-2 text-foreground">info@angelcabs.in</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Address</p>
              <p className="mt-2 text-foreground">
                A-702, Shyamal Satva, Ambika Township Road
                <br />
                Nr. Gol Nest, Mavdi, Rajkot - 360004
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

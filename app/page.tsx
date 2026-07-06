import { Hero } from "@/components/home/hero"
import { FeatureStrip } from "@/components/home/feature-strip"
import { ServicesSection } from "@/components/home/services-section"
import { FleetSection } from "@/components/home/fleet-section"
import { DestinationsSection } from "@/components/home/destinations-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { Testimonials } from "@/components/shared/testimonials"
import { CtaBanner } from "@/components/shared/cta-banner"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <ServicesSection />
      <FleetSection />
      <DestinationsSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </>
  )
}

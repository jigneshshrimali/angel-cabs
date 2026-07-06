import { SectionHeading } from "@/components/shared/section-heading"

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Privacy Policy"
          title="Your privacy and personal data are protected"
          description="We collect only the details needed to process and confirm your cab booking — no unnecessary data, no sharing without consent."
          align="left"
        />

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>Angel Cabs only uses your contact and booking details to confirm rides, respond to queries and provide support.</p>
          <p>We do not share personal information with third parties except to fulfil your booking or comply with legal obligations.</p>
          <p>Payment details are processed securely through trusted payment providers.</p>
          <p>You can request deletion of your stored personal data by contacting us at info@angelcabs.in.</p>
        </div>
      </div>
    </section>
  )
}

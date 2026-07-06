import Image from "next/image"
import { SectionHeading } from "@/components/shared/section-heading"
import { galleryImages } from "@/lib/content"

export default function GalleryPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Explore Angel Cabs in action"
          description="Browse photos of our fleet, destinations and travel experiences across Gujarat."
          align="left"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div key={image.src} className="overflow-hidden rounded-3xl border border-border bg-muted">
              <Image src={image.src} alt={image.alt} width={720} height={480} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

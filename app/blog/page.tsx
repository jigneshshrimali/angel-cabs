import Link from "next/link"
import { SectionHeading } from "@/components/shared/section-heading"
import { blogPosts } from "@/lib/content"
import { Card } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blog"
          title="Travel tips, destination guides and cab service updates"
          description="Stay informed with guides, ride tips and local travel stories tailored for Angel Cabs customers."
          align="left"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden">
              <div className="relative h-48">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{post.category}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="font-semibold text-primary hover:underline">
                    Read more
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

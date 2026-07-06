import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/content"
import { SectionHeading } from "@/components/shared/section-heading"

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) {
    notFound()
  }

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container-page mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={post.category}
          title={post.title}
          description={post.excerpt}
          align="left"
        />
        <div className="mt-8 text-sm leading-relaxed text-muted-foreground">
          <p>Published on {post.date} · {post.readTime}</p>
          <p className="mt-6">This is a sample blog post page. Add rich content and images here to expand on the topic.</p>
        </div>
        <div className="mt-10">
          <Link href="/blog" className="text-primary font-semibold hover:underline">← Back to blog</Link>
        </div>
      </div>
    </section>
  )
}

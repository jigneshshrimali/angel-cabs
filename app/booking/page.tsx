import BookingFlow from "@/components/booking/booking-flow"

interface BookingPageProps {
  // searchParams may be a Promise in some Next.js runtime shapes — unwrap it.
  searchParams: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const resolved = await searchParams
  const initialParams: Record<string, string> = {}

  Object.entries(resolved || {}).forEach(([key, value]) => {
    if (typeof value === "string") {
      initialParams[key] = value
    }
  })

  return <BookingFlow initialParams={initialParams} />
}

import BookingFlow from "@/components/booking/booking-flow"

interface BookingPageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default function BookingPage({ searchParams }: BookingPageProps) {
  const initialParams: Record<string, string> = {}

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      initialParams[key] = value
    }
  })

  return <BookingFlow initialParams={initialParams} />
}

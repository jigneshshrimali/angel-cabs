import type { LucideIcon } from "lucide-react"
import {
  Plane,
  MapPin,
  Building2,
  Heart,
  Route,
  Car,
  ShieldCheck,
  Clock,
  BadgeIndianRupee,
  Sparkles,
  Users,
  Luggage,
  Snowflake,
} from "lucide-react"

export type Vehicle = {
  slug: string
  name: string
  type: string
  image: string
  seats: number
  luggage: number
  ac: boolean
  perKm: number
  baseFare: number
  tags: string[]
  popular?: boolean
  description: string
}

export const vehicles: Vehicle[] = [
  {
    slug: "toyota-etios",
    name: "Toyota Etios",
    type: "Sedan",
    image: "/images/fleet/sedan.png",
    seats: 4,
    luggage: 2,
    ac: true,
    perKm: 12,
    baseFare: 250,
    tags: ["Best Price", "City & Airport"],
    popular: true,
    description:
      "Comfortable sedan ideal for city rides, airport transfers and small family trips.",
  },
  {
    slug: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    type: "SUV / MPV",
    image: "/images/fleet/suv.png",
    seats: 7,
    luggage: 4,
    ac: true,
    perKm: 18,
    baseFare: 400,
    tags: ["Premium", "Outstation"],
    popular: true,
    description:
      "Spacious 7-seater premium MPV, perfect for outstation journeys and group travel.",
  },
  {
    slug: "maruti-ertiga",
    name: "Maruti Ertiga",
    type: "MPV",
    image: "/images/fleet/mpv.png",
    seats: 6,
    luggage: 3,
    ac: true,
    perKm: 15,
    baseFare: 320,
    tags: ["Value", "Family"],
    description:
      "Economical 6-seater MPV that balances comfort and cost for family outings.",
  },
  {
    slug: "tempo-traveller",
    name: "Tempo Traveller",
    type: "Van (12+1)",
    image: "/images/fleet/tempo.png",
    seats: 12,
    luggage: 8,
    ac: true,
    perKm: 24,
    baseFare: 800,
    tags: ["Group", "Tours"],
    description:
      "Large group carrier for tours, corporate events and pilgrimage trips across Gujarat.",
  },
]

export type Service = {
  slug: string
  title: string
  short: string
  description: string
  icon: LucideIcon
  image: string
  highlights: string[]
}

export const services: Service[] = [
  {
    slug: "airport-transfer",
    title: "Airport Transfer",
    short: "On-time airport pickup & drop",
    description:
      "Reliable airport pickup and drop with flight tracking, meet & greet and fixed transparent fares to and from Rajkot & Ahmedabad airports.",
    icon: Plane,
    image: "/images/services/airport.png",
    highlights: [
      "Flight tracking & waiting time included",
      "Meet & greet at arrivals",
      "Fixed, no-surge pricing",
      "24x7 availability",
    ],
  },
  {
    slug: "outstation-taxi",
    title: "Outstation Taxi",
    short: "One-way & round trips across Gujarat",
    description:
      "Travel from Rajkot to Ahmedabad, Dwarka, Somnath, Diu, Surat and all of Gujarat with experienced drivers and clean, well-maintained cars.",
    icon: Route,
    image: "/images/services/outstation.png",
    highlights: [
      "One-way & round-trip options",
      "Experienced highway drivers",
      "Multiple vehicle choices",
      "Transparent per-km pricing",
    ],
  },
  {
    slug: "local-taxi",
    title: "Local City Rides",
    short: "Hourly & point-to-point local trips",
    description:
      "Hourly rentals and point-to-point local cab rides within Rajkot for shopping, meetings, events and everyday travel.",
    icon: MapPin,
    image: "/images/services/local.png",
    highlights: [
      "Hourly packages (4hr/8hr)",
      "Point-to-point rides",
      "Clean & sanitized cars",
      "Instant booking",
    ],
  },
  {
    slug: "corporate",
    title: "Corporate Travel",
    short: "Business travel solutions",
    description:
      "Dedicated corporate travel solutions with monthly billing, priority support and professional chauffeurs for employees and clients.",
    icon: Building2,
    image: "/images/services/corporate.png",
    highlights: [
      "Monthly billing & GST invoices",
      "Priority dispatch",
      "Professional chauffeurs",
      "Dedicated account manager",
    ],
  },
  {
    slug: "wedding",
    title: "Wedding Transportation",
    short: "Decorated cars & guest fleet",
    description:
      "Make your big day seamless with decorated luxury cars for the couple and a coordinated fleet for guests and baraat logistics.",
    icon: Heart,
    image: "/images/services/wedding.png",
    highlights: [
      "Decorated luxury cars",
      "Guest & baraat fleet",
      "On-time coordination",
      "Custom packages",
    ],
  },
  {
    slug: "tour-packages",
    title: "Tour Packages",
    short: "Curated Gujarat tour packages",
    description:
      "Curated multi-day tour packages covering Dwarka, Somnath, Gir, Diu and more with flexible itineraries and all-inclusive pricing.",
    icon: Sparkles,
    image: "/images/services/tour.png",
    highlights: [
      "Curated Gujarat itineraries",
      "All-inclusive pricing",
      "Flexible customization",
      "Local guide on request",
    ],
  },
]

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    title: "Rajkot Based Cab Service",
    description: "Locally owned & operated with deep knowledge of Gujarat routes.",
    icon: MapPin,
  },
  {
    title: "Local & Outstation Trips",
    description: "From quick city rides to long outstation journeys across Gujarat.",
    icon: Car,
  },
  {
    title: "Airport Pickup & Drop",
    description: "Punctual airport transfers with flight tracking and fixed fares.",
    icon: Plane,
  },
  {
    title: "Clean Vehicles & Pro Drivers",
    description: "Sanitized, well-maintained cars driven by verified professionals.",
    icon: ShieldCheck,
  },
  {
    title: "Safe, Reliable & Comfortable",
    description: "Your safety and comfort are our top priority on every journey.",
    icon: Clock,
  },
]

export const whyChooseUs: Feature[] = [
  {
    title: "Professional & Verified Drivers",
    description: "Every driver is background-verified, licensed and courteous.",
    icon: ShieldCheck,
  },
  {
    title: "Clean, Sanitized & Well-Maintained Cars",
    description: "Regularly serviced and sanitized vehicles for a fresh ride.",
    icon: Sparkles,
  },
  {
    title: "Transparent Pricing — No Hidden Charges",
    description: "Upfront fare estimates with no surprise surge or hidden fees.",
    icon: BadgeIndianRupee,
  },
  {
    title: "24x7 Customer Support",
    description: "Round-the-clock booking and support on call & WhatsApp.",
    icon: Clock,
  },
]

export type Destination = {
  name: string
  distanceKm: number
  duration: string
  image: string
  blurb: string
}

export const destinations: Destination[] = [
  {
    name: "Ahmedabad",
    distanceKm: 215,
    duration: "3h 45m",
    image: "/images/destinations/ahmedabad.png",
    blurb: "Gujarat's largest city — business hubs, airport & heritage.",
  },
  {
    name: "Dwarka",
    distanceKm: 230,
    duration: "4h 15m",
    image: "/images/destinations/dwarka.png",
    blurb: "The sacred coastal temple town of Lord Krishna.",
  },
  {
    name: "Somnath",
    distanceKm: 190,
    duration: "3h 30m",
    image: "/images/destinations/somnath.png",
    blurb: "The first of the twelve Jyotirlinga shrines by the sea.",
  },
  {
    name: "Diu",
    distanceKm: 260,
    duration: "4h 45m",
    image: "/images/destinations/diu.png",
    blurb: "A serene island getaway with beaches and Portuguese forts.",
  },
  {
    name: "Surat",
    distanceKm: 400,
    duration: "6h 30m",
    image: "/images/destinations/surat.png",
    blurb: "The diamond and textile city of South Gujarat.",
  },
  {
    name: "Gir National Park",
    distanceKm: 160,
    duration: "3h 00m",
    image: "/images/destinations/gir.png",
    blurb: "Home of the majestic Asiatic lions.",
  },
]

export type Testimonial = {
  name: string
  role: string
  rating: number
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Mehta",
    role: "Corporate Client",
    rating: 5,
    quote:
      "Excellent service! On time, clean car and polite driver. Highly recommend Angel Cabs for business travel.",
  },
  {
    name: "Priya Shah",
    role: "Family Traveller",
    rating: 5,
    quote:
      "Booked an Innova for our Somnath–Dwarka trip. Comfortable ride and transparent pricing. Will book again!",
  },
  {
    name: "Amit Patel",
    role: "Frequent Flyer",
    rating: 5,
    quote:
      "Their airport transfers are always punctual. The driver tracked my flight and was waiting on arrival.",
  },
  {
    name: "Sneha Desai",
    role: "Wedding Planner",
    rating: 5,
    quote:
      "Handled our entire wedding fleet flawlessly. Decorated car and guest cabs all arrived on time.",
  },
  {
    name: "Vikram Joshi",
    role: "Tour Group Lead",
    rating: 5,
    quote:
      "The Tempo Traveller was spotless and the driver knew every route in Gujarat. Great tour experience.",
  },
  {
    name: "Kavita Rao",
    role: "Regular Commuter",
    rating: 4,
    quote:
      "Reliable local rides in Rajkot. Easy booking on WhatsApp and fair hourly rental rates.",
  },
]

export type Stat = {
  value: string
  label: string
  icon: LucideIcon
}

export const stats: Stat[] = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "50+", label: "Cars in Fleet", icon: Car },
  { value: "500+", label: "Cities Covered", icon: MapPin },
  { value: "5+", label: "Years of Service", icon: ShieldCheck },
]

export const vehicleSpecIcons = { seats: Users, luggage: Luggage, ac: Snowflake }

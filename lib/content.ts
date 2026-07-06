export type Faq = { question: string; answer: string }

export const faqs: Faq[] = [
  {
    question: "How do I book a cab with Angel Cabs?",
    answer:
      "You can book instantly through our online booking engine, call us at +91 79846 34461, or message us on WhatsApp. Choose your pickup, drop, date, time and vehicle, confirm the fare estimate, and you're set.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Bookings can be cancelled free of charge up to 2 hours before the scheduled pickup. Cancellations within 2 hours may attract a nominal fee to cover driver allocation.",
  },
  {
    question: "Do you provide airport pickup and drop?",
    answer:
      "Yes. We offer 24x7 airport transfers to and from Rajkot and Ahmedabad airports with flight tracking, waiting time included and fixed transparent fares.",
  },
  {
    question: "Is toll, tax and parking included in the fare?",
    answer:
      "Our fare estimate shows base fare and per-km charges. Tolls, state permits and parking (where applicable) are billed at actuals and shown transparently before you confirm.",
  },
  {
    question: "Are your drivers verified?",
    answer:
      "Absolutely. Every driver is background-verified, holds a valid commercial licence and is trained for courteous, safe driving.",
  },
  {
    question: "Which outstation destinations do you cover?",
    answer:
      "We cover all of Gujarat including Ahmedabad, Dwarka, Somnath, Diu, Surat, Gir and more — one-way or round-trip.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, cards, net banking and cash. Online payment options (Razorpay/Stripe) are available at checkout, and corporate clients can opt for monthly billing.",
  },
  {
    question: "Can I book a cab for multiple days?",
    answer:
      "Yes, we offer multi-day tour packages and outstation trips with driver stay and allowances included in the quoted package price.",
  },
]

export type Offer = {
  title: string
  code: string
  description: string
  discount: string
  color: "primary" | "success" | "dark"
}

export const offers: Offer[] = [
  {
    title: "First Ride Discount",
    code: "ANGEL10",
    description: "Get 10% off on your first booking with Angel Cabs. New customers only.",
    discount: "10% OFF",
    color: "primary",
  },
  {
    title: "Round Trip Savings",
    code: "ROUND15",
    description: "Save 15% on outstation round trips to Dwarka, Somnath & Diu.",
    discount: "15% OFF",
    color: "success",
  },
  {
    title: "Airport Flat Deal",
    code: "AIR199",
    description: "Flat ₹199 off on airport pickup & drop transfers.",
    discount: "₹199 OFF",
    color: "dark",
  },
  {
    title: "Weekend Getaway",
    code: "WEEKEND20",
    description: "20% off on weekend tour packages across Gujarat.",
    discount: "20% OFF",
    color: "primary",
  },
]

export type PricingRow = {
  vehicle: string
  local: string
  outstation: string
  airport: string
  popular?: boolean
}

export const pricingRows: PricingRow[] = [
  { vehicle: "Toyota Etios (Sedan)", local: "₹12/km", outstation: "₹11/km", airport: "₹799", popular: true },
  { vehicle: "Maruti Ertiga (MPV)", local: "₹15/km", outstation: "₹14/km", airport: "₹999" },
  { vehicle: "Innova Crysta (SUV)", local: "₹18/km", outstation: "₹17/km", airport: "₹1,299" },
  { vehicle: "Tempo Traveller (12+1)", local: "₹24/km", outstation: "₹22/km", airport: "On request" },
]

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "rajkot-to-dwarka-road-trip-guide",
    title: "Rajkot to Dwarka Road Trip: The Complete Travel Guide",
    excerpt:
      "Everything you need to know about the scenic drive from Rajkot to Dwarka — route, stops, best time to travel and cab options.",
    category: "Travel Guide",
    date: "2026-05-18",
    readTime: "6 min read",
    image: "/images/destinations/dwarka.png",
  },
  {
    slug: "top-5-somnath-diu-attractions",
    title: "Top 5 Attractions to Cover on a Somnath–Diu Trip",
    excerpt:
      "Planning a pilgrimage-plus-beach combo? Here are the must-visit spots and how to plan your cab itinerary.",
    category: "Destinations",
    date: "2026-04-30",
    readTime: "5 min read",
    image: "/images/destinations/somnath.png",
  },
  {
    slug: "airport-transfer-tips-rajkot",
    title: "7 Tips for a Stress-Free Airport Transfer in Rajkot",
    excerpt:
      "From booking ahead to flight tracking, learn how to make your next airport ride smooth and on time.",
    category: "Tips",
    date: "2026-04-12",
    readTime: "4 min read",
    image: "/images/services/airport.png",
  },
]

export const galleryImages: { src: string; alt: string }[] = [
  { src: "/images/hero-cars.png", alt: "Angel Cabs fleet at the waterfront" },
  { src: "/images/fleet/sedan.png", alt: "Toyota Etios sedan" },
  { src: "/images/fleet/suv.png", alt: "Toyota Innova Crysta SUV" },
  { src: "/images/fleet/mpv.png", alt: "Maruti Ertiga MPV" },
  { src: "/images/fleet/tempo.png", alt: "Tempo Traveller" },
  { src: "/images/destinations/dwarka.png", alt: "Dwarka temple" },
  { src: "/images/destinations/somnath.png", alt: "Somnath temple" },
  { src: "/images/destinations/gir.png", alt: "Gir National Park" },
]

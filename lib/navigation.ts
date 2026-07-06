export type NavItem = {
  label: string
  href: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fleet", href: "/fleet" },
  { label: "Pricing", href: "/pricing" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
]

export const serviceNav: NavItem[] = [
  { label: "Airport Transfer", href: "/services/airport-transfer" },
  { label: "Outstation Taxi", href: "/services/outstation-taxi" },
  { label: "Local Taxi", href: "/services/local-taxi" },
  { label: "Corporate Travel", href: "/services/corporate" },
  { label: "Wedding Transportation", href: "/services/wedding" },
  { label: "Tour Packages", href: "/services/tour-packages" },
]

export const footerNav: NavGroup[] = [
  {
    label: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    label: "Our Services",
    items: serviceNav,
  },
  {
    label: "Support",
    items: [
      { label: "FAQs", href: "/faqs" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Track Booking", href: "/booking/track" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
]

export const siteConfig = {
  name: "Angel Cabs",
  tagline: "Rajkot Based Cab Service",
  slogan: "Your Trusted Travel Partner in Rajkot & All Gujarat",
  hindiTagline: "सुरक्षित यात्रा, भरोसेमंद सेवा",
  description:
    "Angel Cabs is a Rajkot based premium cab service offering safe, reliable and comfortable travel across Gujarat — local rides, outstation trips, airport transfers, tour packages and 24x7 service.",
  url: "https://angelcabs.in",
  phone: "+917984634461",
  phoneDisplay: "+91 79846 34461",
  whatsapp: "917984634461",
  email: "info@angelcabs.in",
  address: {
    line1: "A-702, Shyamal Satva, Ambika Township Road",
    line2: "Nr. Gol Nest, Mavdi, Rajkot - 360004",
    city: "Rajkot",
    state: "Gujarat",
    country: "IN",
    postalCode: "360004",
    geo: { lat: 22.2734, lng: 70.7713 },
  },
  hours: "24x7 (Mon - Sun)",
} as const

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function telLink() {
  return `tel:${siteConfig.phone}`
}

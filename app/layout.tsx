import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import Script from "next/script"
import "./globals.css"

import { Providers } from "@/components/providers"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingActions } from "@/components/layout/floating-actions"
import { OrganizationJsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/site"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline} | Cab Booking in Rajkot`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Rajkot cab service",
    "Rajkot taxi",
    "outstation taxi Gujarat",
    "airport transfer Rajkot",
    "Rajkot to Dwarka taxi",
    "Rajkot to Somnath cab",
    "Innova on rent Rajkot",
    "Angel Cabs",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [{ url: "/images/hero-cars.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: ["/images/hero-cars.png"],
  },
  robots: { index: true, follow: true },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#FFC107",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} bg-background`}>
      <body className="min-h-dvh font-sans antialiased">
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
        <OrganizationJsonLd />
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </Providers>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

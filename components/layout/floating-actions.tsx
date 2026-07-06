"use client"

import { Phone } from "lucide-react"
import { siteConfig, telLink, whatsappLink } from "@/lib/site"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.5-4-3.5-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
      <path d="M20.5 3.5A11.9 11.9 0 0 0 3.3 18.9L2 22.5l3.7-1.2A12 12 0 1 0 20.5 3.5zM12 21.8c-1.7 0-3.4-.5-4.9-1.4l-.4-.2-2.9.9.9-2.8-.2-.4A9.8 9.8 0 1 1 12 21.8z" />
    </svg>
  )
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={telLink()}
        aria-label={`Call ${siteConfig.phoneDisplay}`}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg ring-4 ring-secondary/15 transition-transform hover:scale-105 sm:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={whatsappLink(`Hi ${siteConfig.name}, I'd like to book a cab.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#25D366]/20 transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" aria-hidden />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  )
}

export { WhatsAppIcon }

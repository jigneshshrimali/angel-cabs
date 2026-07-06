"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { CalendarClock, MapPin, Navigation, Search } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Compact sticky booking bar that slides up after the user scrolls past the hero. */
export function StickyBookingBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-30 hidden border-t border-border bg-background/95 backdrop-blur md:block"
        >
          <div className="container-page flex items-center gap-4 py-3">
            <p className="text-sm font-semibold text-foreground">Ready to ride?</p>
            <div className="flex flex-1 items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> Pickup</span>
              <span className="inline-flex items-center gap-1.5"><Navigation className="h-4 w-4 text-primary" /> Drop</span>
              <span className="inline-flex items-center gap-1.5"><CalendarClock className="h-4 w-4 text-primary" /> Date & time</span>
            </div>
            <Link href="/booking" className={cn(buttonVariants({ size: "lg" }), "font-semibold")}>
              <Search className="h-4 w-4" /> Book a Cab
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

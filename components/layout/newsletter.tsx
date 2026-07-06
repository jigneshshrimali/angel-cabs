"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    setEmail("")
    toast.success("Subscribed! You'll get our latest offers & travel updates.")
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-2xl bg-background/5 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-sm font-semibold text-secondary-foreground">Subscribe to our newsletter</p>
        <p className="text-xs text-secondary-foreground/60">Latest offers, deals and travel updates.</p>
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="sm:w-64"
        />
        <Button type="submit" size="lg" disabled={loading} className="shrink-0 font-semibold">
          {loading ? "..." : "Subscribe"}
        </Button>
      </div>
    </form>
  )
}

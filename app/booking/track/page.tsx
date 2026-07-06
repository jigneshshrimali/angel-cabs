"use client"

import { useState } from "react"

export default function TrackPage() {
  const [id, setId] = useState("")
  const [result, setResult] = useState<any>(null)

  const onCheck = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const all = JSON.parse(localStorage.getItem("angel_bookings") || "[]")
      const found = all.find((b: any) => b.id === id)
      setResult(found || { notFound: true })
    } catch (e) {
      setResult({ notFound: true })
    }
  }

  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">Track Booking</h1>
        <form onSubmit={onCheck} className="mt-4 flex gap-2">
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter booking ID (e.g. AC-123456)" className="input" />
          <button className="btn" type="submit">Check</button>
        </form>

        {result && (
          <div className="mt-6 rounded-md border border-border bg-card p-4">
            {result.notFound ? (
              <p>No booking found for <strong>{id}</strong>.</p>
            ) : (
              <div>
                <p className="font-medium">Booking {result.id} — {result.status || "Confirmed"}</p>
                <p>{result.name} • {result.phone}</p>
                <p className="mt-2">{result.tripType} from {result.pickup} to {result.drop}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

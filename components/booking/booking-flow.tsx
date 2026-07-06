"use client"

import { useEffect, useMemo, useState } from "react"
import { vehicles } from "@/lib/data"
import { estimateFare, generateBookingId } from "@/lib/booking"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BookingFlow({ initialParams = {} as Record<string,string> }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [values, setValues] = useState<any>({
    tripType: initialParams.tripType || "one-way",
    pickup: initialParams.pickup || "",
    drop: initialParams.drop || "",
    date: initialParams.date || "",
    time: initialParams.time || "",
    passengers: Number(initialParams.passengers || 2),
    vehicle: initialParams.vehicle || vehicles[0]?.slug,
    name: "",
    phone: "",
    payment: "cash",
  })

  useEffect(() => {
    // persist draft
    localStorage.setItem("angel_booking_draft", JSON.stringify(values))
  }, [values])

  useEffect(() => {
    const draft = localStorage.getItem("angel_booking_draft")
    if (draft) {
      try { setValues((v:any) => ({...v, ...JSON.parse(draft)})) } catch {}
    }
  }, [])

  const fare = useMemo(() => {
    const est = estimateFare({ vehicleSlug: values.vehicle, distanceKm: 50, tripType: values.tripType })
    return est
  }, [values.vehicle, values.tripType])

  function update(changes: Record<string, any>) {
    setValues((v:any) => ({ ...v, ...changes }))
  }

  function submitBooking() {
    const id = generateBookingId()
    const booking = { id, ...values, fare: fare?.total || 0, status: "Confirmed", createdAt: new Date().toISOString() }
    const all = JSON.parse(localStorage.getItem("angel_bookings") || "[]")
    all.unshift(booking)
    localStorage.setItem("angel_bookings", JSON.stringify(all))
    localStorage.removeItem("angel_booking_draft")
    router.push(`/booking/success?id=${encodeURIComponent(id)}`)
  }

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Book a Cab</h1>
          <div className="text-sm">Step {step} of 3</div>
        </div>

        {step === 1 && (
          <form onSubmit={(e)=>{e.preventDefault(); setStep(2)}} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Pickup</label>
              <input value={values.pickup} onChange={(e)=>update({pickup: e.target.value})} className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold">Drop</label>
              <input value={values.drop} onChange={(e)=>update({drop: e.target.value})} className="input" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-semibold">Date</label>
                <input type="date" value={values.date} onChange={(e)=>update({date: e.target.value})} className="input" />
              </div>
              <div>
                <label className="block text-sm font-semibold">Time</label>
                <input type="time" value={values.time} onChange={(e)=>update({time: e.target.value})} className="input" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold">Passengers</label>
              <select value={values.passengers} onChange={(e)=>update({passengers: Number(e.target.value)})} className="input">
                {Array.from({length:8},(_,i)=>i+1).map(n=> <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={()=>setStep(1)}>Cancel</button>
              <button className="btn btn-primary" type="submit">Next: Select Vehicle</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Choose a vehicle</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {vehicles.map(v=> (
                <label key={v.slug} className={`rounded-xl border p-4 ${values.vehicle===v.slug?"border-primary bg-primary/5":""}`}>
                  <input type="radio" name="vehicle" checked={values.vehicle===v.slug} onChange={()=>update({vehicle: v.slug})} className="sr-only" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{v.name}</div>
                      <div className="text-sm text-muted-foreground">{v.type} • {v.seats} seats</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{v.baseFare}</div>
                      <div className="text-sm text-muted-foreground">{v.perKm}/km</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={()=>setStep(1)}>Back</button>
              <button className="btn btn-primary" onClick={()=>setStep(3)}>Next: Review & Pay</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Review & Payment</h2>
            <div className="rounded-lg border border-border p-4">
              <p><strong>From:</strong> {values.pickup}</p>
              <p><strong>To:</strong> {values.drop}</p>
              <p><strong>Vehicle:</strong> {vehicles.find(v=>v.slug===values.vehicle)?.name}</p>
              <p><strong>Fare estimate:</strong> {fare ? `₹${fare.total}` : "—"}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold">Name</label>
              <input value={values.name} onChange={(e)=>update({name: e.target.value})} className="input" />
            </div>
            <div>
              <label className="block text-sm font-semibold">Phone</label>
              <input value={values.phone} onChange={(e)=>update({phone: e.target.value})} className="input" />
            </div>

            <div className="flex gap-2">
              <button className="btn" onClick={()=>setStep(2)}>Back</button>
              <button className="btn btn-primary" onClick={submitBooking}>Confirm Booking</button>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-muted-foreground">
          <Link href="/">Return to Home</Link>
        </div>
      </div>
    </div>
  )
}

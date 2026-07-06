import { NextResponse } from 'next/server'

// POST /api/otp/send
// body: { via: 'sms'|'email', to: string }
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { via, to } = body
    if (!via || !to) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Placeholder: check for environment variables. Integrate Twilio/SendGrid here.
    const TWILIO_SID = process.env.TWILIO_SID
    const TWILIO_TOKEN = process.env.TWILIO_TOKEN
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    if (!TWILIO_SID && !SENDGRID_API_KEY) {
      return NextResponse.json({ error: 'No provider configured. Set env vars.' }, { status: 501 })
    }

    // TODO: implement provider-specific logic
    return NextResponse.json({ ok: true, message: 'OTP send endpoint scaffolded. Configure a provider to enable.' })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

// POST /api/otp/verify
// body: { to: string, code: string }
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { to, code } = body
    if (!to || !code) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // For a real provider, this endpoint would verify server-side tokens or codes.
    // Here we return 501 when not configured.
    return NextResponse.json({ ok: true, message: 'OTP verify endpoint scaffolded.' })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

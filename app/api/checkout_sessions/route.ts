import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "@/lib/stripe"
import { PRO_PLAN } from "@/lib/payments/plans"
import getSession from "@/lib/core/server"

export async function POST() {
  const userSession = await getSession()
  try {
    const headersList = await headers()
    const origin = headersList.get("origin")

    // Inline price_data avoids depending on a Stripe Price ID that may not
    // exist in the account/mode behind the configured secret key.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: PRO_PLAN.name,
              description: PRO_PLAN.description,
            },
            unit_amount: PRO_PLAN.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userSession?.user?.email,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment`,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 }
      )
    }

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

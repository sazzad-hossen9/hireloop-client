export type CheckoutSession = {
  /** Stripe-hosted Checkout URL. `null` until Stripe is connected. */
  url: string | null
  /** Shown to the user when a session can't be created yet. */
  message?: string
}

/**
 * Starts a Stripe Checkout Session for the signed-in seeker.
 *
 * TODO(stripe): replace the stub with a server call that creates the session
 * and returns its hosted URL, e.g.
 *
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkout`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ plan: "pro-monthly" }),
 *   })
 *   return res.json()
 *
 * The pay button already redirects to `url` once one is returned, so only this
 * function has to change when the backend is ready.
 */
export async function createCheckoutSession(): Promise<CheckoutSession> {
  return {
    url: null,
    message: "Stripe Checkout is coming soon.",
  }
}

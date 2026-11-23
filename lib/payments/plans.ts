/**
 * Plans a seeker can pay for from `/dashboard/seeker/billing`.
 *
 * Stripe prices should eventually live on the server (or in the Stripe
 * dashboard); this file only holds what the UI needs to render the plan and
 * order summary. Keep the id in sync with the checkout request body.
 */
export const PRO_PLAN = {
  id: "pro-monthly",
  name: "HireLoop Pro",
  description: "Unlock unlimited applications and priority review.",
  price: 20,
  interval: "month",
  features: [
    "Unlimited job applications",
    "Priority review by hiring teams",
    "Early access to new job listings",
    "Application insights and analytics",
  ],
} as const

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

/** `19` → `"$19.00"`, used by the price and the pay button label. */
export function formatPlanPrice(plan: { price: number }) {
  return usd.format(plan.price)
}

"use client"

import * as React from "react"
import { Lock } from "lucide-react"
import { cn } from "cn"

import { toast } from "@/components/ui/toast"
import { createCheckoutSession } from "@/lib/actions/payments"

type CheckoutButtonProps = {
  /** Already formatted (`"$19.00"`), so the label matches the order summary. */
  amountLabel: string
  className?: string
}

/**
 * Primary CTA on the billing page.
 *
 * Once `createCheckoutSession` returns a Stripe URL this navigates there;
 * until then it explains that checkout isn't connected yet.
 */
export function CheckoutButton({
  amountLabel,
  className,
}: CheckoutButtonProps) {
  const [pending, setPending] = React.useState(false)

  async function handleCheckout() {
    setPending(true)

    try {
      const result = await createCheckoutSession()

      if (result.url) {
        // Stripe Checkout is a hosted page, so a full navigation is correct.
        window.location.assign(result.url)
        return
      }

      toast.add({
        type: "info",
        description: result.message ?? "Checkout is unavailable right now.",
      })
    } catch {
      toast.add({
        type: "error",
        description: "Could not start checkout. Try again.",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={pending}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      <Lock className="size-4" aria-hidden="true" />
      {pending ? "Redirecting…" : `Pay ${amountLabel}`}
    </button>
  )
}

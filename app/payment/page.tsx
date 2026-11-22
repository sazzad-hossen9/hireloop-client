import type { Metadata } from "next"
import { Check, CreditCard, Lock, ShieldCheck } from "lucide-react"

import { CheckoutButton } from "@/app/checkout/page"
import { SiteHeader } from "@/components/site-header"
import { PRO_PLAN, formatPlanPrice } from "@/lib/payments/plans"

export const metadata: Metadata = {
  title: "Payment — HireLoop",
}

export default function PaymentPage() {
  const price = formatPlanPrice(PRO_PLAN)

  return (
    <div className="min-h-svh bg-[#010103] text-[#ededef]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#c3c0ff] uppercase">
            Payment
          </p>
          <h1 className="mt-3 font-heading text-[32px] leading-tight font-medium text-white sm:text-[40px]">
            Complete your payment
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#a0a0ab]">
            Review your plan details below. You&apos;ll be redirected to Stripe
            to securely complete your payment.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section
            aria-labelledby="payment-details-heading"
            className="rounded-[16px] border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-8"
          >
            <h2
              id="payment-details-heading"
              className="text-lg font-medium text-white"
            >
              Payment information
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
              Simple plan summary before you pay.
            </p>

            <div className="mt-6 rounded-[12px] border border-white/[0.07] bg-[#1a1a1f] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-base font-medium text-white">
                    {PRO_PLAN.name}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
                    {PRO_PLAN.description}
                  </p>
                </div>
                <p className="shrink-0 text-right">
                  <span className="text-2xl font-semibold tracking-[-0.02em] text-white">
                    {price}
                  </span>
                  <span className="ml-1 text-[13px] text-[#a0a0ab]">
                    / {PRO_PLAN.interval}
                  </span>
                </p>
              </div>

              <ul className="mt-5 flex flex-col gap-3 border-t border-white/[0.07] pt-5">
                {PRO_PLAN.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] leading-5 text-[#d4d4d8]"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[#22c55e]"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-[12px] border border-[#232327] bg-[#1e1e21] p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                <CreditCard
                  className="size-4 text-[#c3c0ff]"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  Pay securely with Stripe
                </p>
                <p className="mt-0.5 text-[12px] leading-5 text-[#a0a0ab]">
                  Your card details are collected on Stripe&apos;s secure
                  checkout page. HireLoop does not store card information.
                </p>
              </div>
            </div>
          </section>

          <aside
            aria-labelledby="order-summary-heading"
            className="h-fit rounded-[16px] border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] lg:sticky lg:top-8"
          >
            <h2
              id="order-summary-heading"
              className="text-lg font-medium text-white"
            >
              Order summary
            </h2>

            <dl className="mt-5 flex flex-col gap-3 text-[13px] leading-5">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#a0a0ab]">Plan</dt>
                <dd className="text-[#ededef]">{PRO_PLAN.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#a0a0ab]">Billing</dt>
                <dd className="text-[#ededef]">Monthly</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#a0a0ab]">Tax</dt>
                <dd className="text-[#ededef]">Calculated at checkout</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
              <p className="text-sm font-medium text-white">Total due today</p>
              <p className="text-xl font-semibold text-white">{price}</p>
            </div>

            <CheckoutButton amountLabel={price} className="mt-6" />

            <div className="mt-4 flex items-center justify-center gap-2 text-[12px] leading-5 text-[#a0a0ab]">
              <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
              <span>Secure payment powered by Stripe</span>
            </div>

            <p className="mt-2 flex items-center justify-center gap-2 text-[12px] leading-5 text-[#a0a0ab]">
              <Lock className="size-3.5 shrink-0" aria-hidden="true" />
              <span>Cancel anytime</span>
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}

import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle2, Copy, ReceiptText } from "lucide-react"

import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

function formatDate(unixSeconds: number) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(unixSeconds * 1000))
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.07] py-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="text-[13px] leading-5 text-[#a0a0ab]">{label}</dt>
      <dd className="text-sm font-medium break-all text-[#ededef] sm:text-right">
        {value}
      </dd>
    </div>
  )
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    redirect("/payment")
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  if (session.status === "open") {
    redirect("/payment")
  }

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id

  if (session.status === "complete" && session.payment_status === "paid") {
    await checkoutVerify(session_id)
  }

  const customerEmail = session.customer_details?.email ?? "Not available"
  const customerName = session.customer_details?.name
  const amount =
    session.amount_total != null && session.currency
      ? formatAmount(session.amount_total, session.currency)
      : "Not available"
  const paidAt = session.created ? formatDate(session.created) : "Not available"
  const planName = session.line_items?.data[0]?.description ?? "HireLoop Pro"

  return (
    <div className="min-h-svh bg-[#010103] px-4 py-10 text-[#ededef] sm:px-6 lg:py-16">
      <main className="mx-auto w-full max-w-2xl">
        <div className="rounded-[20px] border border-white/[0.07] bg-[#141418] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-8">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-[#22c55e]/15 text-[#22c55e]">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <p className="mt-5 text-[13px] font-medium tracking-[0.08em] text-[#22c55e] uppercase">
              Payment successful
            </p>
            <h1 className="mt-2 font-heading text-[32px] leading-tight font-medium text-white">
              Thanks for your payment
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#a0a0ab]">
              Your payment was processed successfully. A confirmation email will
              be sent to <span className="text-[#ededef]">{customerEmail}</span>
              .
            </p>
          </div>

          <section
            aria-labelledby="payment-details"
            className="mt-8 rounded-[14px] border border-white/[0.07] bg-[#1a1a1f] p-5 sm:p-6"
          >
            <div className="flex items-center gap-2">
              <ReceiptText
                className="size-4 text-[#c3c0ff]"
                aria-hidden="true"
              />
              <h2
                id="payment-details"
                className="text-sm font-medium text-white"
              >
                Payment details
              </h2>
            </div>

            <dl className="mt-2">
              <DetailRow
                label="Transaction ID"
                value={paymentIntent ?? "Not available"}
              />
              <DetailRow label="Plan" value={planName} />
              <DetailRow label="Amount paid" value={amount} />
              <DetailRow
                label="Payment status"
                value={session.payment_status}
              />
              <DetailRow label="Date" value={paidAt} />
              {customerName ? (
                <DetailRow label="Name" value={customerName} />
              ) : null}
              <DetailRow label="Email" value={customerEmail} />
              <DetailRow label="Session ID" value={session.id} />
            </dl>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/seeker/applications"
              className="inline-flex h-11 items-center justify-center rounded-[10px] bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/85"
            >
              Go to dashboard
            </Link>
            <Link
              href="/browse-jobs"
              className="inline-flex h-11 items-center justify-center rounded-[10px] border border-white/10 bg-[#1e1e21] px-5 text-sm font-medium text-[#ededef] transition-colors hover:bg-[#25252b]"
            >
              Browse jobs
            </Link>
          </div>

          <p className="mt-6 flex items-start gap-2 text-[12px] leading-5 text-[#a0a0ab]">
            <Copy className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Save your Transaction ID for your records. If you need help, contact
            support with this ID.
          </p>
        </div>
      </main>
    </div>
  )
}

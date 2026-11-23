// import { redirect } from "next/navigation"

// import { stripe } from "../../lib/stripe"

// export default async function PaymentSuccessPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//   const { session_id } = await searchParams
//   const sessionId = Array.isArray(session_id) ? session_id[0] : session_id

//   if (!sessionId)
//     throw new Error("Please provide a valid session_id (`cs_test_...`)")

//   const { status, customer_details } = await stripe.checkout.sessions.retrieve(
//     sessionId,
//     {
//       expand: ["line_items", "payment_intent"],
//     }
//   )

//   if (status === "open") {
//     return redirect("/")
//   }

//   if (status === "complete") {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{" "}
//           {customer_details?.email}. If you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     )
//   }
// }
import React from 'react';

const PaymentSuccessPage = () => {
    return (
        <div>
            <h2>success</h2>
        </div>
    );
};

export default PaymentSuccessPage;
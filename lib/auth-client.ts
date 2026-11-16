import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

// Type-only import: erased at build time, so the Mongo/server code is never
// bundled into the browser. It gives the client the exact types of the server,
// including the `role` additional field.
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  // Same origin as the Next.js app, so no baseURL is needed
  // (BETTER_AUTH_URL is server-only and never reaches the browser).
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = authClient

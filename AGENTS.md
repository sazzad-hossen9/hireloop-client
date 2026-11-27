<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verify

- `npm run lint` (bare `eslint`, lints the cwd; warnings do not fail), `npm run typecheck` (`tsc --noEmit`). No test runner, test script, or CI workflows — these two commands are the whole verification loop.
- `npm run format` rewrites only `**/*.{ts,tsx}` with Prettier + Tailwind class sorting (`.prettierrc`).
- `CLAUDE.md` is just `@AGENTS.md`; edit this file only.

## Setup / external services

- `.env` (gitignored) is needed to run: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URI`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`. `lib/auth.ts` also reads `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` for Google sign-in (not present in the current `.env`).
- Jobs, applications, users, and payments come from the sibling `../hireloop-server` Express API (default `http://localhost:5000`). Reads are in `lib/api/*`, mutations in `lib/actions/*`; `lib/jobs/types.ts` and `lib/applications/types.ts` mirror backend documents, so change payloads in both repos together. The backend owns application `status`/`appliedAt`/`archived`/`updatedAt` and rejects duplicate active applications per job.
- Stripe is server-only: `lib/stripe.ts` (`import 'server-only'`), checkout session created in `app/api/checkout_sessions/route.ts` with inline price data, verified by backend `POST /payment/checkout-verify` via `lib/actions/payments.ts`.

## App structure / conventions

- Single package, App Router, no `src/`; `@/*` maps to the repo root. Route clusters: `app/(auth)`, `app/browse-jobs/[id]`, `app/dashboard/{seeker,recruiter,admin}`, `app/api/auth/[...all]` (Better Auth catch-all).
- Auth: Better Auth + MongoDB (`hireloopdb`) in `lib/auth.ts` — email/password, Google, admin plugin, `role` field (`seeker`/`recruiter`/`admin`). Server sessions via `lib/core/server.ts` (`headers()`), browser client via `lib/auth-client.ts`. `lib/dashboard-nav.ts` and `components/dashboardSidebar.tsx` pick the nav from the session role, defaulting to `seeker` client-side.
- There is no middleware/global route guard: dashboard pages check session and role individually, and redirect targets are inconsistent (`/sign-in?redirectTo=...` vs `/login`, which has no route). Keep this in mind when changing auth flows.
- UI is shadcn/ui (`components.json`, style `base-nova`, primitives in `components/ui/`); add primitives with `npx shadcn@latest add <name>`. Tailwind v4 is loaded through PostCSS and `cn` is re-exported from `lib/utils.ts`.

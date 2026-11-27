/**
 * Roles stored in Better Auth's `role` additional field (see lib/auth.ts).
 * Keeping the list here gives the admin UI and the role action one source of truth.
 */
export const USER_ROLES = ["seeker", "recruiter", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

/**
 * Serializable user shape passed from the admin page to client components.
 * Dates are ISO strings so they survive the Server/Client boundary.
 */
export type ManagedUser = {
  id: string
  name: string
  email: string
  role: UserRole
  image?: string | null
  createdAt?: string | null
}

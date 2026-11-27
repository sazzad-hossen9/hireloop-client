"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { USER_ROLES, type UserRole } from "@/lib/users/types"

export type SetUserRoleResult =
  { ok: true; role: UserRole } | { ok: false; message: string }

/**
 * Change one user's role through Better Auth's admin plugin.
 *
 * The UI only renders this for admins, but a Server Action is a public POST
 * endpoint, so authorization and input validation happen again here.
 */
export async function setUserRole(
  userId: string,
  role: UserRole
): Promise<SetUserRoleResult> {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({ headers: requestHeaders })

  if (!session?.user) {
    return { ok: false, message: "Your session has expired. Sign in again." }
  }

  if (session.user.role !== "admin") {
    return { ok: false, message: "Only admins can change user roles." }
  }

  if (!USER_ROLES.includes(role)) {
    return { ok: false, message: "Choose a valid role." }
  }

  // Prevent an admin from locking themselves (and everyone else) out.
  if (userId === session.user.id && role !== "admin") {
    return { ok: false, message: "You can't change your own admin role." }
  }

  try {
    await auth.api.setRole({
      body: { userId, role },
      headers: requestHeaders,
    })
  } catch (error) {
    console.error("Failed to set user role", error)
    return {
      ok: false,
      message: "Could not update the role. Please try again.",
    }
  }

  revalidatePath("/dashboard/admin/users")
  return { ok: true, role }
}

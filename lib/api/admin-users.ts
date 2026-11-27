import "server-only"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import {
  USER_ROLES,
  type ManagedUser,
  type UserRole,
} from "@/lib/users/types"

/** Admin-only list of Better Auth users, narrowed to the fields the UI needs. */
export const getUser = async (): Promise<ManagedUser[]> => {
  // This endpoint requires session cookies and the admin role.
  const result = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "desc",
    },
    headers: await headers(),
  })

  return result.users.map((user) => {
    const role: UserRole = USER_ROLES.includes(user.role as UserRole)
      ? (user.role as UserRole)
      : "seeker"

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      image: user.image ?? null,
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
    }
  })
}

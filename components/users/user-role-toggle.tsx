"use client"

import * as React from "react"
import { cn } from "cn"

import { setUserRole } from "@/app/dashboard/admin/users/actions"
import { USER_ROLE_META } from "@/lib/users/options"
import { USER_ROLES, type UserRole } from "@/lib/users/types"
import { toast } from "@/components/ui/toast"

type UserRoleToggleProps = {
  userId: string
  userName: string
  role: UserRole
  /** Signed-in admin's id; their own role cannot be demoted. */
  currentUserId: string
}

/**
 * Three-way role switch for one user row.
 *
 * Updates optimistically and rolls back with a toast if the Server Action
 * fails. Revalidation in the action keeps the server-rendered table in sync.
 */
export function UserRoleToggle({
  userId,
  userName,
  role,
  currentUserId,
}: UserRoleToggleProps) {
  const [value, setValue] = React.useState(role)
  const [pending, setPending] = React.useState(false)
  const isSelf = userId === currentUserId

  const handleSelect = async (nextRole: UserRole) => {
    if (nextRole === value || pending) return

    const previousRole = value
    setValue(nextRole)
    setPending(true)

    try {
      const result = await setUserRole(userId, nextRole)

      if (!result.ok) {
        setValue(previousRole)
        toast.add({ type: "error", description: result.message })
        return
      }

      toast.add({
        type: "success",
        description: `${userName} is now ${USER_ROLE_META[nextRole].label}.`,
      })
    } catch {
      setValue(previousRole)
      toast.add({
        type: "error",
        description: "Could not update the role. Try again.",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div
      role="group"
      aria-label={`Role for ${userName}`}
      className="inline-flex rounded-[8px] border border-white/[0.08] bg-[#1a1a1f] p-[3px]"
    >
      {USER_ROLES.map((option) => {
        const isActive = option === value
        const locked = isSelf && option !== "admin"

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            disabled={pending || locked}
            title={locked ? "You can't change your own admin role" : undefined}
            onClick={() => void handleSelect(option)}
            className={cn(
              "h-7 rounded-[6px] border px-2.5 text-[11px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50",
              isActive
                ? USER_ROLE_META[option].badgeClassName
                : "border-transparent text-[#8a8a94] hover:text-[#ededef]"
            )}
          >
            {USER_ROLE_META[option].label}
          </button>
        )
      })}
    </div>
  )
}

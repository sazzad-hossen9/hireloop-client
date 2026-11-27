import { cn } from "cn"

import { getUserInitials } from "@/lib/users/format"
import { USER_ROLE_META } from "@/lib/users/options"
import type { ManagedUser } from "@/lib/users/types"

/** Role-tinted initials avatar, shared by the table and mobile cards. */
export function UserAvatar({ user }: { user: ManagedUser }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ring-1",
        USER_ROLE_META[user.role].avatarClassName
      )}
    >
      {getUserInitials(user.name)}
    </span>
  )
}

export function UserIdentity({ user }: { user: ManagedUser }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <UserAvatar user={user} />
      <div className="min-w-0">
        <p className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
          {user.name}
        </p>
        <p className="truncate text-[12px] leading-4 text-[#a0a0ab]">
          {user.email}
        </p>
      </div>
    </div>
  )
}

import { UsersRound } from "lucide-react"

import { UserIdentity } from "@/components/users/user-cells"
import { UserRoleToggle } from "@/components/users/user-role-toggle"
import { formatJoinedAt } from "@/lib/users/format"
import type { ManagedUser } from "@/lib/users/types"

type UsersTableProps = {
  users: ManagedUser[]
  currentUserId: string
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-white/[0.07] bg-[#1a1a1f]">
        <UsersRound className="size-5 text-[#a0a0ab]" aria-hidden="true" />
      </span>
      <div>
        <p className="text-[15px] leading-6 font-medium text-[#ededef]">
          No users found
        </p>
        <p className="mt-1 text-[13px] leading-5 text-[#a0a0ab]">
          Try a different name or email address.
        </p>
      </div>
    </div>
  )
}

/** Admin user list: table on desktop, stacked role cards on mobile. */
export function UsersTable({ users, currentUserId }: UsersTableProps) {
  if (users.length === 0) return <EmptyState />

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[40%]" />
            <col className="w-[20%]" />
          </colgroup>

          <thead>
            <tr className="h-11 border-b border-white/[0.07] bg-[#1a1a1f]">
              <th
                scope="col"
                className="pr-4 pl-7 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                User
              </th>
              <th
                scope="col"
                className="px-4 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-4 text-[12px] leading-4 font-medium text-[#6e6e78]"
              >
                Joined
              </th>
            </tr>
          </thead>

          <tbody className="[&>tr+tr]:border-t [&>tr+tr]:border-white/[0.07]">
            {users.map((user) => (
              <tr
                key={user.id}
                className="h-16 transition-colors hover:bg-white/[0.02]"
              >
                <td className="pr-4 pl-7">
                  <UserIdentity user={user} />
                </td>
                <td className="px-4">
                  <UserRoleToggle
                    key={`${user.id}-${user.role}`}
                    userId={user.id}
                    userName={user.name}
                    role={user.role}
                    currentUserId={currentUserId}
                  />
                </td>
                <td className="px-4 text-[13px] leading-5 whitespace-nowrap text-[#a0a0ab]">
                  {formatJoinedAt(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-white/[0.07] md:hidden">
        {users.map((user) => (
          <li key={user.id} className="flex flex-col gap-4 p-4">
            <UserIdentity user={user} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <UserRoleToggle
                key={`${user.id}-${user.role}`}
                userId={user.id}
                userName={user.name}
                role={user.role}
                currentUserId={currentUserId}
              />
              <p className="text-[12px] text-[#6e6e78]">
                Joined {formatJoinedAt(user.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Search } from "lucide-react"

import { DashboardPage } from "@/components/dashboard/page-container"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { UsersTable } from "@/components/users/users-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getUser } from "@/lib/api/admin-users"
import getSession from "@/lib/core/server"

export const metadata: Metadata = {
  title: "User Management — HireLoop",
}

type AdminUsersPageProps = {
  searchParams: Promise<{ q?: string | string[] }>
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const session = await getSession()

  if (!session?.user) {
    redirect("/sign-in?redirectTo=/dashboard/admin/users")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard/admin")
  }

  const query = firstValue((await searchParams).q)?.trim() ?? ""
  const users = await getUser()
  const visible = query
    ? users.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase())
      )
    : users

  const counts = {
    seeker: users.filter((user) => user.role === "seeker").length,
    recruiter: users.filter((user) => user.role === "recruiter").length,
    admin: users.filter((user) => user.role === "admin").length,
  }

  return (
    <DashboardPage width="wide">
      <PageHeader
        breadcrumb={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "User Management" },
        ]}
        title="User Management"
        description="Review accounts and assign the right level of access for each member."
        action={
          <form role="search" className="flex w-full gap-2 sm:w-[320px]">
            <Input
              name="q"
              defaultValue={query}
              aria-label="Search users"
              placeholder="Search name or email"
              className="h-10 rounded-[10px] border-white/[0.08] bg-[#1a1a1f]"
            />
            <Button
              type="submit"
              aria-label="Search users"
              className="h-10 shrink-0 rounded-[10px] px-4"
            >
              <Search className="size-4" />
            </Button>
          </form>
        }
      />

      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        <StatCard label="Total Users" value={users.length} />
        <StatCard
          label="Admins"
          value={counts.admin}
          valueClassName="text-[#f59e0b]"
        />
        <StatCard
          label="Recruiters"
          value={counts.recruiter}
          valueClassName="text-[#c084fc]"
        />
        <StatCard
          label="Seekers"
          value={counts.seeker}
          valueClassName="text-[#60a5fa]"
        />
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#232327] bg-[#151516]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-[15px] leading-6 font-medium text-[#ededef]">
              All Users
            </h2>
            <p className="text-[12px] leading-5 text-[#a0a0ab]">
              Use the role buttons to update access for any account.
            </p>
          </div>
          <p className="text-[12px] text-[#6e6e78]">
            {visible.length} of {users.length}
          </p>
        </div>

        <UsersTable users={visible} currentUserId={session.user.id} />
      </div>
    </DashboardPage>
  )
}

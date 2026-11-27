import type { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { ApplicationsTable } from "@/components/applications/applications-table"
import { ExportPdfButton } from "@/components/applications/export-pdf-button"
import { DashboardPage } from "@/components/dashboard/page-container"
import { getApplications } from "@/lib/api/applications"
import { getApplicationStats } from "@/lib/applications/stats"
import { auth } from "@/lib/auth"
import { getUserPremiumById } from "@/lib/api/user"

export const metadata: Metadata = {
  title: "My Applications — HireLoop",
}

const PAGE_SIZE = 5

type ApplicationsTab = "active" | "archived"

type MyApplicationsPageProps = {
  searchParams: Promise<{
    tab?: string | string[]
    page?: string | string[]
  }>
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

/** One of the four 86px stats cards above the table. */
function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: number | string
  valueClassName?: string
}) {
  return (
    <div className="flex h-[86px] flex-col justify-center gap-2 rounded-[12px] border border-white/[0.07] bg-[#141418] px-6 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p className="text-[13px] leading-5 tracking-[-0.005em] text-[#a0a0ab]">
        {label}
      </p>
      <p
        className={cn(
          "text-[26px] leading-8 font-semibold tracking-[-0.02em] text-[#ededef]",
          valueClassName
        )}
      >
        {value}
      </p>
    </div>
  )
}

function PageArrow({
  href,
  label,
  icon: Icon,
  disabled,
}: {
  href: string
  label: string
  icon: LucideIcon
  disabled: boolean
}) {
  const className =
    "flex size-8 items-center justify-center rounded-[8px] border border-white/[0.08] text-[#a0a0ab] transition-colors"

  if (disabled) {
    return (
      <span aria-disabled="true" className={cn(className, "text-[#5a5a60]")}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
    )
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(className, "hover:bg-white/[0.06] hover:text-[#ededef]")}
    >
      <Icon className="size-4" aria-hidden="true" />
    </Link>
  )
}

function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number
  totalPages: number
  hrefFor: (page: number) => string
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      <PageArrow
        href={hrefFor(page - 1)}
        label="Previous page"
        icon={ChevronLeft}
        disabled={page === 1}
      />

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={hrefFor(pageNumber)}
          aria-current={pageNumber === page ? "page" : undefined}
          className={cn(
            "flex size-8 items-center justify-center rounded-[8px] text-[13px] leading-5 transition-colors",
            pageNumber === page
              ? "bg-white font-medium text-[#0b0b0c]"
              : "border border-white/[0.08] text-[#a0a0ab] hover:bg-white/[0.06] hover:text-[#ededef]"
          )}
        >
          {pageNumber}
        </Link>
      ))}

      <PageArrow
        href={hrefFor(page + 1)}
        label="Next page"
        icon={ChevronRight}
        disabled={page === totalPages}
      />
    </nav>
  )
}

export default async function MyApplicationsPage({
  searchParams,
}: MyApplicationsPageProps) {
  const params = await searchParams
  const tab: ApplicationsTab =
    firstValue(params.tab) === "archived" ? "archived" : "active"

  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect("/sign-in?redirectTo=/dashboard/seeker/applications")
  }

  // Recruiters/admins have no seeker applications; send them to their own home.
  if (session?.user?.role !== "seeker") {
    redirect(
      session.user.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/recruiter"
    )
  }
  const premiumResult =await getUserPremiumById(session?.user?.id)
  console.log("premiumResult", premiumResult)
  // Live rows from MongoDB, newest first. Archived filtering happens below so
  // the stats cards always reflect every application, not just the open tab.
  const applications = await getApplications({ applicantId: session.user.id })

  const visible = applications.filter(
    (application) => application.archived === (tab === "archived")
  )
  const stats = getApplicationStats(applications)

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const requestedPage = Number.parseInt(firstValue(params.page) ?? "1", 10)
  const page = Number.isFinite(requestedPage)
    ? Math.min(Math.max(1, requestedPage), totalPages)
    : 1

  const start = (page - 1) * PAGE_SIZE
  const pageItems = visible.slice(start, start + PAGE_SIZE)
  const showingFrom = visible.length === 0 ? 0 : start + 1
  const showingTo = Math.min(start + PAGE_SIZE, visible.length)

  const hrefFor = (nextTab: ApplicationsTab, nextPage = 1) => {
    const query = new URLSearchParams()

    if (nextTab === "archived") query.set("tab", "archived")
    if (nextPage > 1) query.set("page", String(nextPage))

    const search = query.toString()
    return search
      ? `/dashboard/seeker/applications?${search}`
      : "/dashboard/seeker/applications"
  }

  return (
    <DashboardPage width="wide">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-[22px] leading-7 font-semibold tracking-[-0.018em] text-[#ededef]">
            My Applications
          </h1>
          <p className="mt-2 text-[13px] leading-5 tracking-[-0.005em] text-[#ededef]">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex h-[42px] items-center rounded-[8px] border border-white/[0.07] bg-[#1a1a1f] p-[5px]">
            <Link
              href={hrefFor("active")}
              aria-current={tab === "active" ? "page" : undefined}
              className={cn(
                "flex h-8 items-center justify-center rounded-[6px] border px-4 text-[13px] leading-5 tracking-[-0.005em] transition-colors",
                tab === "active"
                  ? "border-white/10 bg-[#1a1a1f] text-[#ededef]"
                  : "border-transparent text-[#a0a0ab] hover:text-[#ededef]"
              )}
            >
              Active
            </Link>

            <Link
              href={hrefFor("archived")}
              aria-current={tab === "archived" ? "page" : undefined}
              className={cn(
                "flex h-8 items-center justify-center rounded-[6px] border px-4 text-[13px] leading-5 tracking-[-0.005em] transition-colors",
                tab === "archived"
                  ? "border-white/10 bg-[#1a1a1f] text-[#ededef]"
                  : "border-transparent text-[#a0a0ab] hover:text-[#ededef]"
              )}
            >
              Archived
            </Link>
          </div>

          <ExportPdfButton />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        <StatCard label="Total Applied" value={stats.total} />
        <StatCard label="Shortlisted" value={stats.shortlisted} />
        <StatCard
          label="Interviews"
          value={stats.interviews}
          valueClassName="text-[#f59e0b]"
        />
        <StatCard
          label="Success Rate"
          value={`${stats.successRate}%`}
          valueClassName="text-[#22c55e]"
        />
      </div>

      <div className="overflow-hidden rounded-[12px] border border-white/[0.07] bg-[#141418] shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <ApplicationsTable
          applications={pageItems}
          archived={tab === "archived"}
        />

        <div className="flex min-h-[65px] flex-col items-start justify-between gap-3 border-t border-white/[0.07] bg-[#1a1a1f] px-6 py-4 sm:flex-row sm:items-center sm:py-0">
          <p className="text-[13px] leading-5 text-[#a0a0ab]">
            Showing {showingFrom}-{showingTo} of {visible.length} applications
          </p>

          <Pagination
            page={page}
            totalPages={totalPages}
            hrefFor={(nextPage) => hrefFor(tab, nextPage)}
          />
        </div>
      </div>
    </DashboardPage>
  )
}

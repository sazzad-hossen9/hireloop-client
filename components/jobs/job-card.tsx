"use client"
import type { ReactNode } from "react"
import {
  Banknote,
  Bookmark,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"

import { cn } from "cn"
import { JobCategoryIcon } from "@/components/jobs/job-category-icon"
import {
  formatCompensation,
  formatLocation,
  isExpired,
} from "@/lib/jobs/format"
import { JOB_TYPE_LABELS } from "@/lib/jobs/options"
import type { JobPost } from "@/lib/jobs/types"
import { useRouter } from "next/navigation"

const CHIP_TONES = {
  default: "border-white/10 bg-[#1a1a1f] text-[#ededef]",
  success: "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]",
  muted: "border-white/10 bg-[#1a1a1f] text-[#6e6e78]",
}

function JobChip({
  icon: Icon,
  tone = "default",
  children,
}: {
  icon: LucideIcon
  tone?: keyof typeof CHIP_TONES
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[8px] border px-3 py-1.5 text-[13px] font-medium whitespace-nowrap",
        CHIP_TONES[tone]
      )}
    >
      <Icon className="size-3.5 shrink-0" />
      {children}
    </span>
  )
}

/**
 * Public job result card: category icon, title, company + location, and
 * salary / type / status chips. Salary comes from `formatCompensation`, so it
 * always matches the numbers shown in the dashboard.
 */
export function JobCard({ job }: { job: JobPost }) {
  const expired = isExpired(job.deadline)
  const router = useRouter()
  const HandleJobDetails = (id: string) => {
    router.push(`/browse-jobs/${id}`)
  }
  return (
    <article className="flex gap-4 rounded-[12px] border border-white/[0.07] bg-[#141418] p-4 transition-colors hover:border-white/15 sm:gap-5 sm:p-6">
      <JobCategoryIcon category={job.jobCategory} size="md" />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div
          className="flex items-start justify-between gap-3"
          onClick={() => HandleJobDetails(job._id)}
        >
          <div className="min-w-0">
            <h3 className="text-lg leading-snug font-semibold text-[#ededef] sm:text-[22px]">
              {job.jobTitle}
            </h3>
            <p className="mt-1 truncate text-sm font-semibold text-[#6e6e78] sm:text-base">
              {job.companyName} • {formatLocation(job)}
            </p>
          </div>

          {/* TODO: wire up saving/bookmarking a job. */}
          <button
            type="button"
            aria-label={`Save ${job.jobTitle}`}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] text-[#8e9192] transition-colors hover:bg-white/[0.04] hover:text-[#ededef]"
          >
            <Bookmark className="size-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <JobChip icon={Banknote}>{formatCompensation(job)}</JobChip>
          <JobChip icon={Briefcase}>{JOB_TYPE_LABELS[job.jobType]}</JobChip>
          <JobChip
            icon={expired ? CalendarClock : CheckCircle2}
            tone={expired ? "muted" : "success"}
          >
            {expired ? "Closed" : "Active"}
          </JobChip>
        </div>
      </div>
    </article>
  )
}

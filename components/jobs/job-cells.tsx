import Link from "next/link"
import { MapPin, Users } from "lucide-react"

import { cn } from "cn"
import {
  JobCategoryIcon,
  getCategoryStyle,
} from "@/components/jobs/job-category-icon"
import { formatDeadline, formatLocation, isExpired } from "@/lib/jobs/format"
import type { JobPost } from "@/lib/jobs/types"

/** Icon tile + job title + category label. */
export function JobTitleCell({ job }: { job: JobPost }) {
  const { className: accent } = getCategoryStyle(job.jobCategory)

  return (
    <div className="flex items-center gap-3">
      <JobCategoryIcon category={job.jobCategory} />
      <div className="min-w-0">
        <p className="max-w-[190px] truncate text-sm font-semibold text-white">
          {job.jobTitle}
        </p>
        <p className={cn("text-[11px] font-medium", accent)}>
          {job.jobCategory}
        </p>
      </div>
    </div>
  )
}

/** Company name + pin + location (prefixed with "Remote" when applicable). */
export function CompanyLocation({ job }: { job: JobPost }) {
  return (
    <>
      <p className="text-[13px] font-medium whitespace-nowrap text-white">
        {job.companyName}
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-xs text-[#a0a0ab]">
        <MapPin className="size-3.5 shrink-0" />
        {formatLocation(job)}
      </p>
    </>
  )
}

/** Applicant count; `withLabel` renders "34 Candidates" for the table. */
export function Applicants({
  count,
  withLabel = false,
  href,
}: {
  count: number
  withLabel?: boolean
  href?: string
}) {
  const content = (
    <>
      <Users className="size-4" aria-hidden="true" />
      {count}
      {withLabel && " Candidates"}
    </>
  )

  const className =
    "flex items-center gap-1 text-[13px] font-semibold whitespace-nowrap text-[#c3c0ff]"

  if (href) {
    return (
      <Link
        href={href}
        className={cn(className, "transition-colors hover:text-white")}
      >
        {content}
      </Link>
    )
  }

  return <span className={className}>{content}</span>
}

/** Formatted deadline + "Closed" (expired) or the posted label. */
export function Deadline({ job }: { job: JobPost }) {
  const expired = isExpired(job.deadline)

  return (
    <>
      <p
        className={cn(
          "text-[13px] font-medium whitespace-nowrap",
          expired ? "text-[#a0a0ab]" : "text-white"
        )}
      >
        {formatDeadline(job.deadline)}
      </p>
      <p className="text-[11px] text-[#5a5a60]">
        {expired ? "Closed" : job.postedLabel}
      </p>
    </>
  )
}

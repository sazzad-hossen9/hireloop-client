import { CalendarCheck2, ClipboardList, Star, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type {
  ApplicationStatus,
  JobApplication,
} from "@/lib/applications/types"

type Stat = {
  label: string
  value: number
  icon: LucideIcon
}

function countByStatus(
  applications: JobApplication[],
  status: ApplicationStatus
) {
  return applications.filter((application) => application.status === status)
    .length
}

/** Four compact counters above the recruiter applicant table. */
export function ApplicationStats({
  applications,
}: {
  applications: JobApplication[]
}) {
  const stats: Stat[] = [
    {
      label: "Total Applicants",
      value: applications.length,
      icon: Users,
    },
    {
      label: "In Review",
      value: countByStatus(applications, "review"),
      icon: ClipboardList,
    },
    {
      label: "Shortlisted",
      value: countByStatus(applications, "shortlisted"),
      icon: Star,
    },
    {
      label: "Interviewing",
      value: countByStatus(applications, "interview"),
      icon: CalendarCheck2,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-[12px] border border-[#232327] bg-[#141418] p-5"
        >
          <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#1e1e21] text-[#a0a0ab]">
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <p className="mt-4 text-[12px] leading-4 text-[#a0a0ab]">{label}</p>
          <p className="mt-1 font-heading text-[26px] leading-none font-medium text-white">
            {value.toLocaleString("en-US")}
          </p>
        </div>
      ))}
    </div>
  )
}

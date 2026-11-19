import { cn } from "cn"
import {
  Applicants,
  CompanyLocation,
  Deadline,
  JobTitleCell,
} from "@/components/jobs/job-cells"
import { JobActions } from "@/components/jobs/job-actions"
import { StatusPill, TypePill } from "@/components/jobs/job-badges"
import { formatCompensation, isExpired } from "@/lib/jobs/format"
import type { JobPost } from "@/lib/jobs/types"

const COLUMNS = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
] as const

const LAST_COLUMN = COLUMNS.length - 1

/** Edge columns keep the extra horizontal breathing room from the Figma table. */
function cellPadding(index: number) {
  return index === 0 || index === LAST_COLUMN ? "px-5" : "px-3"
}

/** Desktop posting list: 8-column table, horizontally scrollable mid-size. */
export function JobsTable({ jobs }: { jobs: JobPost[] }) {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full min-w-[1080px] border-collapse text-left">
        <thead>
          <tr className="bg-[#0b0b0c]">
            {COLUMNS.map((label, index) => (
              <th
                key={label}
                scope="col"
                className={cn(
                  "py-4 text-[11px] font-semibold tracking-wide whitespace-nowrap text-[#a0a0ab] uppercase",
                  cellPadding(index)
                )}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const expired = isExpired(job.deadline)

            return (
              <tr
                key={job._id}
                className="border-t border-[#232327] align-middle transition-colors hover:bg-white/[0.02]"
              >
                <td className={cn("py-4", cellPadding(0))}>
                  <JobTitleCell job={job} />
                </td>
                <td className={cn("py-4", cellPadding(1))}>
                  <CompanyLocation job={job} />
                </td>
                <td className={cn("py-4", cellPadding(2))}>
                  <TypePill jobType={job.jobType} />
                </td>
                <td
                  className={cn(
                    "py-4 text-[13px] font-medium whitespace-nowrap text-white",
                    cellPadding(3)
                  )}
                >
                  {formatCompensation(job)}
                </td>
                <td className={cn("py-4", cellPadding(4))}>
                  <Applicants count={job.applicants} withLabel />
                </td>
                <td className={cn("py-4", cellPadding(5))}>
                  <StatusPill expired={expired} />
                </td>
                <td className={cn("py-4", cellPadding(6))}>
                  <Deadline job={job} />
                </td>
                <td className={cn("py-4", cellPadding(7))}>
                  <JobActions job={job} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
